import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Share2, MoreVertical, Play } from 'lucide-react';

const mockShorts = [
  { id: 1, user: 'creator1', likes: '1.2k', comments: 56, description: '#blackbox #neon #shorts Fire!', color: 'from-blue-600/20 to-purple-600/20' },
  { id: 2, user: 'neonvibes', likes: '2.8k', comments: 124, description: 'Glowing in the dark ✨ #react', color: 'from-green-600/20 to-teal-600/20' },
  { id: 3, user: 'codewithgreen', likes: '4.5k', comments: 89, description: 'Neon green 💚 #coding', color: 'from-emerald-600/20 to-lime-600/20' },
];

const ShortItem = ({ short, isActive }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="relative w-full h-screen snap-start bg-[#0b141a] flex flex-col overflow-hidden border-b border-[#2a3942]">
      <div className={`flex-1 w-full bg-gradient-to-br ${short.color} flex items-center justify-center relative group`}>
        {isActive && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Play size={60} className="text-white/10 animate-ping" />
          </div>
        )}
        
        {/* Interaction Side Bar */}
        <div className="absolute right-4 bottom-28 flex flex-col gap-6 z-20">
          <div className="flex flex-col items-center gap-1 cursor-pointer group" onClick={() => setLiked(!liked)}>
            <div className={`p-3 rounded-full backdrop-blur-md transition-all ${liked ? 'bg-red-500/20 scale-110' : 'bg-white/10 group-hover:bg-white/20'}`}>
              <Heart size={28} className={liked ? 'fill-red-500 text-red-500' : 'text-white'} />
            </div>
            <span className="text-xs text-white font-bold">{short.likes}</span>
          </div>

          <div className="flex flex-col items-center gap-1 cursor-pointer group">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-full group-hover:bg-white/20 transition-all">
              <MessageCircle size={28} className="text-white" />
            </div>
            <span className="text-xs text-white font-bold">{short.comments}</span>
          </div>

          <div className="p-3 bg-white/10 backdrop-blur-md rounded-full cursor-pointer hover:bg-white/20 transition-all">
            <Share2 size={28} className="text-white" />
          </div>

          <div className="p-3 bg-white/10 backdrop-blur-md rounded-full cursor-pointer hover:bg-white/20 transition-all">
            <MoreVertical size={28} className="text-white" />
          </div>
        </div>

        {/* Info Section */}
        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#00a884] to-blue-500 p-0.5 shadow-lg">
               <div className="w-full h-full rounded-full bg-black border-2 border-black" />
            </div>
            <span className="font-bold text-white text-lg">@{short.user}</span>
            <button className="ml-2 bg-[#00a884] text-[#111b21] px-4 py-1 rounded-full text-xs font-bold hover:bg-[#06cf9c] transition-all active:scale-95">Follow</button>
          </div>
          <p className="text-sm text-gray-200 max-w-[85%] leading-relaxed line-clamp-2">{short.description}</p>
        </div>
      </div>
      
      {/* Visual Progress Bar */}
      <div className="h-[3px] bg-[#2a3942] w-full overflow-hidden">
        <div 
          className="h-full bg-[#00a884] transition-all linear shadow-[0_0_10px_#00a884]" 
          style={{ 
            width: isActive ? '100%' : '0%',
            transitionDuration: isActive ? '5000ms' : '0ms' 
          }} 
        />
      </div>
    </div>
  );
};

const Shorts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentIndex(parseInt(entry.target.getAttribute('data-index')));
          }
        });
      },
      { threshold: 0.7 }
    );

    const cards = containerRef.current.querySelectorAll('.short-card');
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide bg-black">
      {mockShorts.map((short, index) => (
        <div key={short.id} data-index={index} className="short-card h-screen snap-start">
          <ShortItem short={short} isActive={index === currentIndex} />
        </div>
      ))}
    </div>
  );
};

export default Shorts;