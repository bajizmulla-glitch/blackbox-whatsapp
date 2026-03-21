import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Share2, MoreVertical, Play, Pause } from 'lucide-react';

const mockShorts = [
  { id: 1, user: 'creator1', likes: '1.2k', comments: 56, description: '#blackbox #neon #shorts Fire!', color: 'from-blue-600/20 to-purple-600/20' },
  { id: 2, user: 'neonvibes', likes: '2.8k', comments: 124, description: 'Glowing in the dark ✨ #whatsappclone', color: 'from-green-600/20 to-teal-600/20' },
  { id: 3, user: 'codewithgreen', likes: '4.5k', comments: 89, description: 'Neon green forever 💚 #coding', color: 'from-emerald-600/20 to-lime-600/20' },
  { id: 4, user: 'darkmodefan', likes: '1.9k', comments: 67, description: 'Dark theme appreciation post 🌑', color: 'from-gray-600/20 to-slate-900/20' },
];

const ShortItem = ({ short, isActive }) => {
  return (
    <div className="relative w-full h-screen snap-start bg-[#0b141a] flex flex-col items-center justify-center overflow-hidden">
      {/* Video Content Placeholder */}
      <div className={`w-full h-full bg-gradient-to-br ${short.color} flex items-center justify-center relative`}>
        {/* Play/Pause Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
           {isActive ? (
             <div className="animate-ping opacity-20"><Play size={80} /></div>
           ) : (
             <Pause size={40} className="text-white/20" />
           )}
        </div>

        {/* Floating Badges */}
        <div className="absolute top-10 left-6 flex items-center gap-2">
          <div className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">LIVE</div>
          <span className="text-white/70 text-sm backdrop-blur-md bg-black/20 px-2 py-0.5 rounded">
            {isActive ? 'Watching' : 'Paused'}
          </span>
        </div>
      </div>

      {/* Interaction Side Bar */}
      <div className="absolute right-4 bottom-32 flex flex-col items-center gap-6 z-10">
        <div className="flex flex-col items-center gap-1 group cursor-pointer">
          <div className="p-3 bg-white/10 backdrop-blur-lg rounded-full group-hover:bg-red-500/20 transition-all">
            <Heart size={28} className="text-white group-hover:fill-red-500 group-hover:text-red-500" />
          </div>
          <span className="text-xs text-white font-medium">{short.likes}</span>
        </div>

        <div className="flex flex-col items-center gap-1 group cursor-pointer">
          <div className="p-3 bg-white/10 backdrop-blur-lg rounded-full group-hover:bg-blue-500/20 transition-all">
            <MessageCircle size={28} className="text-white group-hover:text-blue-400" />
          </div>
          <span className="text-xs text-white font-medium">{short.comments}</span>
        </div>

        <div className="p-3 bg-white/10 backdrop-blur-lg rounded-full cursor-pointer hover:bg-white/20 transition-all">
          <Share2 size={28} className="text-white" />
        </div>

        <div className="p-3 bg-white/10 backdrop-blur-lg rounded-full cursor-pointer hover:bg-white/20 transition-all">
          <MoreVertical size={28} className="text-white" />
        </div>
      </div>

      {/* Bottom Info Section */}
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#00a884] to-blue-500 p-0.5">
            <div className="w-full h-full rounded-full bg-black border-2 border-black" />
          </div>
          <span className="font-bold text-white">@{short.user}</span>
          <button className="ml-2 border border-white/50 px-3 py-1 rounded-full text-xs font-bold text-white hover:bg-white hover:text-black transition-all">
            Follow
          </button>
        </div>
        <p className="text-sm text-gray-200 line-clamp-2 max-w-[80%] leading-relaxed">
          {short.description}
        </p>
      </div>
      
      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-[#00a884] transition-all duration-[5000ms] ease-linear" 
           style={{ width: isActive ? '100%' : '0%' }} />
    </div>
  );
};

const Shorts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  // Intersection Observer to detect current short
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index'));
            setCurrentIndex(index);
          }
        });
      },
      { threshold: 0.7 } // স্ক্রিনের ৭০% কাভার করলে একটিভ হবে
    );

    const elements = containerRef.current.querySelectorAll('.short-container');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide bg-black"
    >
      {mockShorts.map((short, index) => (
        <div 
          key={short.id} 
          data-index={index}
          className="short-container h-screen snap-start"
        >
          <ShortItem short={short} isActive={index === currentIndex} />
        </div>
      ))}
    </div>
  );
};

export default Shorts;