import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mic, MicOff, Video, VideoOff, ChevronDown, Maximize2, SwitchCamera, Minimize2 } from 'lucide-react';

const CallInterface = ({ contact, onEndCall, getDefaultAvatar, isVideoCall, isMinimized, onToggleMinimize }) => {
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(isVideoCall || false);
  const [localStream, setLocalStream] = useState(null);
  const [facingMode, setFacingMode] = useState('user');
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [status, setStatus] = useState('Calling...');

  useEffect(() => {
    const timer1 = setTimeout(() => setStatus('Ringing...'), 1500);
    return () => { clearTimeout(timer1); };
  }, []);

  useEffect(() => {
    let interval;
    if (status === 'Connected') {
      interval = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status]);

  useEffect(() => {
    let stream = null;
    let isCancelled = false;

    const startCamera = async () => {
      if (isVideoOn) {
        try {
          if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
          }
          const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: facingMode }, audio: true });
          if (!isCancelled) {
            stream = s;
            setLocalStream(s);
          } else {
            s.getTracks().forEach(track => track.stop());
          }
        } catch (err) {
          console.error("Error accessing camera:", err);
          if (!isCancelled) setIsVideoOn(false);
        }
      } else {
        if (localStream) {
          localStream.getTracks().forEach(track => track.stop());
        }
        setLocalStream(null);
      }
    };
    startCamera();
    return () => {
      isCancelled = true;
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, [isVideoOn, facingMode]);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
    if (status === 'Connected' && remoteVideoRef.current && localStream) {
      remoteVideoRef.current.srcObject = localStream;
    }
  }, [localStream, status, isMinimized]); // isMinimized যোগ করা হয়েছে যাতে স্ক্রিন ছোট/বড় করলে ভিডিও আবার লোড হয়

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // --- MINIMIZED VIEW ---
  if (isMinimized) {
    return (
      <div className="w-full h-full relative bg-[#202c33] flex items-center justify-center overflow-hidden group">
        {/* Main Content (Video or Avatar) */}
        {status === 'Connected' && isVideoOn ? (
          <video 
            ref={remoteVideoRef} 
            autoPlay 
            playsInline 
            className="w-full h-full object-cover" 
          />
        ) : isVideoOn && localStream ? (
          <video 
            ref={localVideoRef} 
            autoPlay 
            muted 
            playsInline 
            className="w-full h-full object-cover transform -scale-x-100" 
          />
        ) : (
          <div className="flex flex-col items-center">
            <img 
              src={contact?.avatar || (getDefaultAvatar ? getDefaultAvatar(contact?.name || 'User') : '')} 
              alt={contact?.name} 
              className="w-16 h-16 rounded-full border-2 border-[#37404a] mb-2"
            />
            <p className="text-white text-xs font-medium">{status === 'Connected' ? formatTime(duration) : status}</p>
          </div>
        )}

        {/* Overlay Controls (Visible on Hover) */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
          <div className="flex justify-end">
            <button onClick={onToggleMinimize} className="p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
          <div className="flex justify-center gap-3">
             <button onClick={() => setIsMuted(!isMuted)} className={`p-2 rounded-full ${isMuted ? 'bg-white text-black' : 'bg-[#37404a] text-white'}`}>
               {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
             </button>
             <button onClick={() => onEndCall(formatTime(duration), status === 'Connected')} className="p-2 rounded-full bg-red-500 text-white">
               <Phone className="w-4 h-4 transform rotate-[135deg]" />
             </button>
          </div>
        </div>
      </div>
    );
  }

  // --- FULL SCREEN VIEW ---
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#0b141a] relative text-[#e9edef] h-full w-full animate-in fade-in duration-300">
      
      {/* Header Buttons */}
      <div className="absolute top-4 right-4 z-50 flex gap-4">
        <button onClick={onToggleMinimize} className="p-2 rounded-full bg-[#202c33]/60 hover:bg-[#202c33] transition-colors text-white border border-white/5" title="Minimize">
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>

      {status === 'Connected' && isVideoOn ? (
        /* Connected Video View */
        <div className="absolute inset-0 w-full h-full bg-black z-0">
          <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover opacity-80" />
          
          {/* PIP Local Video */}
          <div className="absolute bottom-32 right-6 w-40 h-60 bg-[#202c33] rounded-xl overflow-hidden shadow-2xl border-2 border-[#37404a] z-10">
             {localStream ? (
               <video ref={localVideoRef} autoPlay muted playsInline className="w-full h-full object-cover transform -scale-x-100" />
             ) : (
               <div className="w-full h-full flex items-center justify-center bg-[#37404a]"><VideoOff className="w-8 h-8 text-[#8696a0]" /></div>
             )}
             <button onClick={(e) => { e.stopPropagation(); setFacingMode(prev => prev === 'user' ? 'environment' : 'user'); }} className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white">
               <SwitchCamera className="w-4 h-4" />
             </button>
          </div>
        </div>
      ) : (
        /* Calling / No Video UI */
        <div className="flex flex-col items-center z-10 gap-6 mb-20">
          <div className={`overflow-hidden border-4 border-[#202c33] shadow-2xl relative transition-all duration-300 ${isVideoOn ? 'w-80 h-80 rounded-2xl' : 'w-32 h-32 rounded-full'}`}>
             {isVideoOn && localStream ? (
               <video ref={localVideoRef} autoPlay muted playsInline className="w-full h-full object-cover transform -scale-x-100" />
             ) : (
               <img src={contact?.avatar || (getDefaultAvatar ? getDefaultAvatar(contact?.name || 'User') : '')} alt={contact?.name} className="w-full h-full object-cover" />
             )}
             {isVideoOn && (
               <div className="absolute bottom-3 right-3 z-50">
                 <button onClick={() => setFacingMode(prev => prev === 'user' ? 'environment' : 'user')} className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white">
                   <SwitchCamera className="w-5 h-5" />
                 </button>
               </div>
             )}
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-semibold">{contact?.name || 'Unknown'}</h2>
            <p className="text-[#8696a0] text-lg font-medium">{status === 'Connected' ? formatTime(duration) : status}</p>
          </div>
        </div>
      )}

      {/* Main Controls */}
      <div className="absolute bottom-12 flex items-center gap-8 bg-[#202c33] px-8 py-4 rounded-3xl shadow-xl border border-[#2a3942] z-20">
        <button onClick={() => setIsMuted(!isMuted)} className={`p-4 rounded-full transition-all ${isMuted ? 'bg-[#e9edef] text-[#0b141a]' : 'bg-[#37404a] text-[#e9edef] hover:bg-[#455a64]'}`}>
          {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>
        <button onClick={() => setIsVideoOn(!isVideoOn)} className={`p-4 rounded-full transition-all ${isVideoOn ? 'bg-[#e9edef] text-[#0b141a]' : 'bg-[#37404a] text-[#e9edef] hover:bg-[#455a64]'}`}>
          {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
        </button>
        <button onClick={() => onEndCall(formatTime(duration), status === 'Connected')} className="p-4 rounded-full bg-[#ef4444] text-white hover:bg-[#dc2626] transform hover:scale-110 shadow-lg">
          <Phone className="w-8 h-8 transform rotate-[135deg]" />
        </button>
      </div>
    </div>
  );
};

export default CallInterface;
