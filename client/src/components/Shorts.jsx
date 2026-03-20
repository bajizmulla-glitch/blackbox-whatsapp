import { useState, useEffect, useRef } from 'react';

const mockShorts = [
  {
    id: 1,
    url: '',
    user: 'creator1',
    likes: 1234,
    comments: 56,
    description: '#blackbox #neon #shorts Fire!',
  },
  {
    id: 2,
    url: '',
    user: 'neonvibes',
    likes: 2890,
    comments: 124,
    description: 'Glowing in the dark ✨ #whatsappclone #react',
  },
  {
    id: 3,
    url: '',
    user: 'codewithgreen',
    likes: 4567,
    comments: 89,
    description: 'Neon green forever 💚 #coding #javascript',
  },
  {
    id: 4,
    url: '',
    user: 'darkmodefan',
    likes: 1987,
    comments: 67,
    description: 'Dark theme appreciation post 🌑',
  },
  {
    id: 5,
    url: '',
    user: 'shortsaddict',
    likes: 3345,
    comments: 102,
    description: 'Can\'t stop scrolling... #addict #tiktokclone',
  },
];

const Shorts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const shortsRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockShorts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    shortsRef.current?.scrollTo({
      top: currentIndex * window.innerHeight,
      behavior: 'smooth',
    });
  }, [currentIndex]);

  const ShortItem = ({ short, isActive }) => (
    <div className="w-full h-screen flex flex-col justify-between p-8 relative overflow-hidden group">
      {/* Mock Video - Animated gradient */}
      <div className="flex-1 w-full rounded-2xl bg-gradient-to-br from-facebook/primary/20 via-blue-500/20 to-indigo-500/20 animate-pulse-wave shadow-2xl shadow-facebook/primary/25 group-hover:animate-[pulse_2s_ease-in-out_infinite] relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute top-8 left-8 bg-facebook/primary/90 text-facebook/card px-4 py-2 rounded-full font-bold text-sm">
          ▶ {isActive ? 'PAUSED' : 'PLAYING'}
        </div>
      </div>

      {/* Bottom Content */}
      <div className="space-y-4 pt-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              className="w-12 h-12 rounded-full bg-gradient-to-r from-facebook/primary to-facebook/primaryDark border-4 border-facebook/card/50"
              alt="Creator"
            />
            <div>
              <div className="font-bold text-white text-lg">{short.user}</div>
              <div className="text-gray-400 text-sm">{short.description}</div>
            </div>
          </div>
        </div>

        {/* Interactions */}
        <div className="flex space-x-6">
          <button className="group relative p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all">
            <svg className="w-8 h-8 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157h-.008z"/>
            </svg>
            <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/90 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all">
              {short.likes.toLocaleString()}
            </span>
          </button>
          
          <button className="p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
          
          <button className="p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-1 1z" />
            </svg>
            <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/90 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all">
              {short.comments}
            </span>
          </button>

          <button className="p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all ml-auto">
            <svg className="w-8 h-8 text-facebook/primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Active indicator */}
      {isActive && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-facebook/primary text-facebook/card px-6 py-2 rounded-full font-bold shadow-2xl shadow-facebook/primary/50 animate-bounce">
          👀 NOW PLAYING
        </div>
      )}
    </div>
  );

  return (
    <div 
      ref={shortsRef}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth scrollbar-hide"
      style={{ scrollSnapType: 'y mandatory' }}
    >
      {mockShorts.map((short, index) => (
        <div key={short.id} className="snap-start h-screen flex-shrink-0">
          <ShortItem short={short} isActive={index === currentIndex} />
        </div>
      ))}
    </div>
  );
};

export default Shorts;
