import React, { useState, useEffect } from 'react';
import AuthWrapper from './components/AuthWrapper';
import Chat from './components/Chat';
import { Search, UserPlus, MessageSquare } from 'lucide-react';
import './index.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  // অ্যাপ ওপেন হলেই চেক করবে আগে থেকে লগইন করা আছে কি না
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem('user'); // ভুল ডাটা থাকলে ডিলিট করে দেবে
      }
    }
    setLoading(false);
  }, []);

  // লগআউট ফাংশন
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // যদি টোকেন থাকে তাও মুছে দেবে
    setCurrentUser(null);
  };

  // ডাটা লোড হওয়া পর্যন্ত অপেক্ষা করবে
  if (loading) {
    return (
      <div className="h-screen bg-[#0b141a] flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  // যদি ইউজার লগইন করা না থাকে, তবে লগইন/সাইনআপ পেজ দেখাবে
  if (!currentUser) {
    return (
      <AuthWrapper 
        onAuthSuccess={(userData) => {
          localStorage.setItem('user', JSON.stringify(userData));
          setCurrentUser(userData);
        }} 
      />
    );
  }

  // লগইন করা থাকলে মেইন চ্যাট ইন্টারফেস
  return (
    <div className="h-screen flex bg-[#0b141a]">
      {/* Sidebar - বাম পাশের অংশ */}
      <div className="w-80 bg-[#111b21] border-r border-[#2a3942] p-4 flex flex-col">
        <div className="flex items-center mb-8 p-2 bg-[#202c33] rounded-xl">
          <div className="w-12 h-12 bg-[#00a884] rounded-full flex items-center justify-center mr-4 text-2xl shadow-lg">
            👤
          </div>
          <div className="overflow-hidden">
            <div className="text-white font-semibold truncate">
              {currentUser.name || "User"}
            </div>
            <div className="text-[#8696a0] text-xs flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Online
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {/* Search Bar */}
          <div className="mb-4 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-[#8696a0]" />
            </div>
            <input
              type="text"
              placeholder="Search users to chat..."
              className="w-full bg-[#202c33] text-white text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#00a884] border border-[#2a3942]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <h2 className="text-[#8696a0] text-xs font-bold uppercase tracking-wider mb-4 px-2">Chats & Friends</h2>
          
          {/* Mock User List for Design */}
          <div 
            onClick={() => setSelectedChat({ id: '1', name: 'General Chat', avatar: '🌐' })}
            className={`p-3 rounded-lg mb-2 cursor-pointer transition-all flex items-center gap-3 ${selectedChat?.id === '1' ? 'bg-[#2a3942] border-l-4 border-[#00a884]' : 'bg-[#202c33] hover:bg-[#2a3942]'}`}
          >
            <div className="w-10 h-10 bg-[#00a884] rounded-full flex items-center justify-center text-xl">🌐</div>
            <div>
              <div className="text-white font-semibold text-sm">General Chat</div>
              <div className="text-[#8696a0] text-xs">Welcome to BlackBox!</div>
            </div>
          </div>

          {/* Example of a searched user */}
          {searchQuery && (
            <div className="mt-4">
              <h2 className="text-[#8696a0] text-xs font-bold uppercase tracking-wider mb-2 px-2">Search Results</h2>
              <div 
                onClick={() => setSelectedChat({ id: '2', name: searchQuery, avatar: '👤' })}
                className="p-3 bg-[#202c33] rounded-lg mb-2 cursor-pointer hover:bg-[#2a3942] transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-xl">👤</div>
                  <div className="text-white font-semibold text-sm">{searchQuery}</div>
                </div>
                <UserPlus className="h-5 w-5 text-[#00a884]" />
              </div>
            </div>
          )}
        </div>

        <button 
          onClick={handleLogout}
          className="mt-auto p-3 bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white rounded-xl font-semibold transition-all border border-red-600/50"
        >
          Logout
        </button>
      </div>

      {/* Main Content - ডান পাশের অংশ */}
      <div className="flex-1 flex flex-col bg-[#0b141a] relative overflow-hidden">
        {selectedChat ? (
          <Chat 
            chat={selectedChat} 
            currentRoom={selectedChat.id} 
            socket={null} // Socket will be added later
            onCall={() => alert('Call feature coming soon!')}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-white relative">
            {/* ব্যাকগ্রাউন্ডে হালকা ডিজাইন */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#00a884] rounded-full blur-[120px]"></div>
              <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#00a884] rounded-full blur-[120px]"></div>
            </div>

            <div className="text-center z-10">
              <div className="w-32 h-32 mx-auto mb-8 bg-[#00a884] rounded-full flex items-center justify-center text-6xl shadow-[0_0_50px_rgba(0,168,132,0.2)] animate-pulse">
                <MessageSquare size={48} className="text-white" />
              </div>
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-[#8696a0] bg-clip-text text-transparent">
                BlackBox Chat
              </h1>
              <p className="text-xl text-[#8696a0]">Search for a user or select a chat to start messaging</p>
              <div className="mt-8 px-6 py-2 bg-[#202c33] rounded-full text-sm text-[#00a884] inline-block border border-[#2a3942]">
                 End-to-end encrypted
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;