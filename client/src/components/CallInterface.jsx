import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mic, MicOff, Video, VideoOff, ChevronDown, Maximize2, SwitchCamera } from 'lucide-react';

const CallInterface = ({ contact, onEndCall, getDefaultAvatar, isVideoCall, isMinimized, onToggleMinimize }) => {
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(isVideoCall || false);
  const [localStream, setLocalStream] = useState(null);
  const [facingMode, setFacingMode] = useState('user');
  const [status, setStatus] = useState('Calling...');
  
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  // কল স্ট্যাটাস সিমুলেশন
  useEffect(() => {
    const timer = setTimeout(() => setStatus('Ringing...'), 1500);
    const connectTimer = setTimeout(() => setStatus('Connected'), 4000); // ৪ সেকেন্ড পর অটো কানেক্ট (টেস্টিং এর জন্য)
    return () => { clearTimeout(timer); clearTimeout(connectTimer); };
  }, []);

  // কল ডিউরেশন টাইমার
  useEffect(() => {
    let interval;
    if (status === 'Connected') {
      interval = setInterval(() => setDuration(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [status]);

  // ক্যামেরা এবং মাইক্রোফোন কন্ট্রোল
  useEffect(() => {
    let isCancelled = false;

    const manageMedia = async () => {
      try {
        if (isVideoOn) {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: facingMode }, 
            audio: !isMuted 
          });
          if (!isCancelled) setLocalStream(stream);
        } else {
          if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
            setLocalStream(null);
          }
        }
      } catch (err) {
        console.error("Media Access Denied:", err);
        setIsVideoOn(false);
      }
    };

    manageMedia();
    return () => { isCancelled = true; };
  }, [isVideoOn, facingMode]);

  // ভিডিও স্ট্রিম অ্যাসাইন করা
  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream, isMinimized]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // --- ছোট উইন্ডো ভিউ (Minimized) ---
  if (isMinimized) {
    return (
      <div className="w-full h-full relative bg-[#202c33] flex items-center justify-center overflow-hidden group rounded-xl shadow-2xl">
        {isVideoOn && localStream ? (
          <video ref={localVideoRef} autoPlay muted playsInline className="w-full h-full object-cover transform -scale-x-100" />
        ) : (
          <div className="flex flex-col items-center">
            <img 
              src={contact?.avatar || (getDefaultAvatar && getDefaultAvatar(contact?.name))} 
              className="w-12 h-12 rounded-full mb-1" alt=""
            />
            <p className="text-[10px]">{status === 'Connected' ? formatTime(duration) : status}</p>
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button onClick={onToggleMinimize} className="p-1 bg-white/20 rounded-full"><Maximize2 size={16}/></button>
          <button onClick={() => onEndCall()} className="p-1 bg-red-500 rounded-full"><Phone size={16} className="rotate-[135deg]"/></button>
        </div>
      </div>
    );
  }

  // --- ফুল স্ক্রিন ভিউ ---
  return (
    <div className="fixed inset-0 z-[999] bg-[#0b141a] flex flex-col items-center justify-between py-12 text-white font-sans">
      
      {/* মাইনোমাইজ বাটন */}
      <button onClick={onToggleMinimize} className="absolute top-6 left-6 p-2 hover:bg-white/10 rounded-full transition-colors">
        <ChevronDown size={32} />
      </button>

      {/* ইউজার ইনফো */}
      <div className="flex flex-col items-center gap-4">
        <div className={`relative transition-all duration-500 ${isVideoOn ? 'w-40 h-40' : 'w-32 h-32'}`}>
          {isVideoOn && localStream ? (
            <video ref={localVideoRef} autoPlay muted playsInline className="w-full h-full object-cover rounded-2xl border-2 border-white/10 transform -scale-x-100" />
          ) : (
            <img src={contact?.avatar || (getDefaultAvatar && getDefaultAvatar(contact?.name))} className="w-full h-full rounded-full border-4 border-[#202c33]" alt="" />
          )}
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold">{contact?.name || 'User'}</h2>
          <p className="text-[#8696a0] text-lg mt-1">{status === 'Connected' ? formatTime(duration) : status}</p>
        </div>
      </div>

      {/* মেইন কন্ট্রোল বার */}
      <div className="flex items-center gap-6 bg-[#202c33] p-6 rounded-full shadow-2xl border border-white/5">
        <button onClick={() => setIsMuted(!isMuted)} className={`p-4 rounded-full ${isMuted ? 'bg-white text-black' : 'bg-[#3b4a54]'}`}>
          {isMuted ? <MicOff /> : <Mic />}
        </button>
        
        <button onClick={() => onEndCall()} className="p-5 bg-red-500 rounded-full hover:bg-red-600 transition-transform active:scale-90">
          <Phone size={32} className="rotate-[135deg]" />
        </button>

        <button onClick={() => setIsVideoOn(!isVideoOn)} className={`p-4 rounded-full ${isVideoOn ? 'bg-white text-black' : 'bg-[#3b4a54]'}`}>
          {isVideoOn ? <Video /> : <VideoOff />}
        </button>

        {isVideoOn && (
          <button onClick={() => setFacingMode(f => f === 'user' ? 'environment' : 'user')} className="p-4 bg-[#3b4a54] rounded-full">
            <SwitchCamera />
          </button>
        )}
      </div>
    </div>
  );
};

export default CallInterface;