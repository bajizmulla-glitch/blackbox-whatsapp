import React, { useState, useRef, useMemo } from 'react';
import { ArrowUp, ArrowDown, Search, Plus } from 'lucide-react';

const ChatList = ({ chats = [], currentChat, onSelect, getDefaultAvatar }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const chatListRef = useRef(null);

  // ফিল্টার এবং সার্চ লজিক (useMemo ব্যবহার করা হয়েছে পারফরম্যান্সের জন্য)
  const filteredChats = useMemo(() => {
    return chats.filter(chat => {
      // সার্চ চেক
      const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            chat.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase());
      
      // ট্যাব ফিল্টার চেক
      if (activeFilter === 'All') return matchesSearch;
      if (activeFilter === 'Unread') return matchesSearch && chat.unread > 0;
      if (activeFilter === 'Groups') return matchesSearch && chat.isGroup;
      if (activeFilter === 'Favourites') return matchesSearch && chat.isFavourite;
      
      return matchesSearch;
    });
  }, [chats, activeFilter, searchQuery]);

  const handleScroll = (direction) => {
    if (chatListRef.current) {
      const scrollAmount = direction === 'up' ? -300 : 300;
      chatListRef.current.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#111b21] border-r border-[#2a3942]/50">
      
      {/* Search Bar */}
      <div className="p-3 bg-[#111b21] sticky top-0 z-20">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className={`h-4 w-4 ${searchQuery ? 'text-[#00a884]' : 'text-[#8696a0]'}`} />
          </div>
          <input 
            type="text" 
            placeholder="Search or start new chat" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#202c33] border-none rounded-lg pl-10 pr-4 py-1.5 text-[#d1d7db] placeholder-[#8696a0] focus:ring-0 text-sm transition-all" 
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar items-center px-3 pb-3 border-b border-[#2a3942]/30">
        {['All', 'Unread', 'Favourites', 'Groups'].map((filter) => (
          <button 
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-all whitespace-nowrap ${
              activeFilter === filter 
                ? 'bg-[#00a884] text-[#111b21]' 
                : 'bg-[#202c33] text-[#8696a0] hover:bg-[#2a3942]'
            }`}
          >
            {filter}
          </button>
        ))}
        <button className="bg-[#202c33] text-[#8696a0] p-1.5 rounded-full hover:bg-[#2a3942]">
          <Plus size={16} />
        </button>
      </div>

      {/* Chat List Area */}
      <div className="flex-1 relative overflow-hidden">
        
        {/* Scroll Buttons (Only on Hover) */}
        {showScrollButtons && (
          <>
            <button onClick={() => handleScroll('up')} className="absolute top-2 right-4 bg-[#00a884] text-white p-1.5 rounded-full shadow-lg z-30 opacity-80 hover:opacity-100">
              <ArrowUp size={16} />
            </button>
            <button onClick={() => handleScroll('down')} className="absolute bottom-2 right-4 bg-[#00a884] text-white p-1.5 rounded-full shadow-lg z-30 opacity-80 hover:opacity-100">
              <ArrowDown size={16} />
            </button>
          </>
        )}

        <div
          ref={chatListRef}
          className="h-full overflow-y-auto custom-scrollbar"
          onMouseEnter={() => setShowScrollButtons(true)}
          onMouseLeave={() => setShowScrollButtons(false)}
        >
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => onSelect(chat)}
                className={`flex items-center gap-3 p-3 px-4 cursor-pointer transition-all border-b border-[#2a3942]/20 ${
                  currentChat?.id === chat.id ? 'bg-[#2a3942]' : 'hover:bg-[#202c33]'
                }`}
              >
                <div className="relative flex-shrink-0">
                  <img 
                    src={chat.avatar || (getDefaultAvatar ? getDefaultAvatar(chat.name) : '')} 
                    alt="" 
                    className="w-12 h-12 rounded-full object-cover shadow-md" 
                  />
                  {chat.online && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#00a884] border-2 border-[#111b21] rounded-full"></div>}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex justify-between items-center mb-0.5">
                    <h3 className="font-medium text-[#e9edef] truncate text-base">{chat.name}</h3>
                    <span className={`text-[11px] ${chat.unread > 0 ? 'text-[#00a884] font-bold' : 'text-[#8696a0]'}`}>
                      {chat.time}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-[#8696a0] truncate flex-1">
                      {chat.typing ? <span className="text-[#00a884]">typing...</span> : chat.lastMessage}
                    </p>
                    {chat.unread > 0 && (
                      <span className="bg-[#00a884] text-[#111b21] text-[10px] font-extrabold min-w-[18px] h-[18px] rounded-full flex items-center justify-center ml-2">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-[#8696a0] px-6 text-center">
              <p className="text-sm">No chats found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatList;