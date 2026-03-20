import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

const ChatList = ({ chats, currentChat, onSelect, getDefaultAvatar }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const chatListRef = useRef(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  return (
    <div className="flex flex-col flex-1 min-h-0 bg-[#111b21]">
      {/* Fixed Search Bar Area */}
      <div className="p-3 pb-2 bg-[#111b21] z-20 flex-shrink-0 shadow-md border-b border-[#2a3942]/30 relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
            <svg className="h-5 w-5 text-[#8696a0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            type="text" 
            placeholder="Search on BlackBox Chat" 
            className="w-full bg-[#202c33] border border-[#2a3942] rounded-lg pl-10 pr-4 py-2 text-[#d1d7db] placeholder-[#8696a0] focus:outline-none focus:border-[#00a884] focus:ring-1 focus:ring-[#00a884] transition-all duration-200 text-sm" 
          />
        </div>
      </div>

      {/* Scrollable Area: Filters + Chat List */}
      <div className="flex-1 relative">
        {/* Filter Tags (Now scrolls with content) */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide items-center px-3 pb-2 pt-3">
          {['All', 'Unread', 'Favourites', 'Groups'].map((filter) => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                activeFilter === filter 
                  ? 'bg-[#00a884]/20 text-[#00a884]' 
                  : 'bg-[#202c33] text-[#8696a0] hover:bg-[#2a3942] hover:text-[#d1d7db]'
              }`}
            >
              {filter}
            </button>
          ))}
          <button 
            onClick={() => setActiveFilter('+')}
            className={`rounded-full p-1.5 transition-colors flex-shrink-0 ${
              activeFilter === '+' 
                ? 'bg-[#00a884]/20 text-[#00a884]' 
                : 'bg-[#202c33] text-[#8696a0] hover:bg-[#2a3942] hover:text-[#d1d7db]'
            }`}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
            </svg>
          </button>
        </div>

        {/* Scroll Up Button */}
        {showScrollButtons && (
          <button
            onClick={() => {
              chatListRef.current.scrollBy({ top: -200, behavior: 'smooth' });
            }}
            className="absolute top-2 right-2 bg-[#202c33]/80 text-[#d1d7db] hover:text-white p-2 rounded-full shadow-md z-10 transition-colors duration-200"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* Scroll Down Button */}
        {showScrollButtons && (
          <button
            onClick={() => {
              chatListRef.current.scrollBy({ top: 200, behavior: 'smooth' });
            }}
            className="absolute bottom-2 right-2 bg-[#202c33]/80 text-[#d1d7db] hover:text-white p-2 rounded-full shadow-md z-10 transition-colors duration-200"
          >
            <ArrowDown className="w-5 h-5" />
          </button>
        )}

        {/* Chat List Items */}
        <div
          ref={chatListRef}
          className="pb-2 flex-1 overflow-y-auto custom-scrollbar hover:custom-scrollbar scrollbar-hide"
          onMouseEnter={() => setShowScrollButtons(true)}
          onMouseLeave={() => setShowScrollButtons(false)}
          style={{ maxHeight: 'calc(100% - 80px)' }} // Adjust 80px based on the height of your search/filter area
        >

          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => onSelect(chat)}
              className={`flex items-center gap-3 p-3 px-4 cursor-pointer hover:bg-[#202c33] transition-colors border-b border-[#2a3942]/50 ${
                currentChat?.id === chat.id ? 'bg-[#202c33]' : ''
              }`}
            >
              <img 
                src={chat.avatar || (getDefaultAvatar ? getDefaultAvatar(chat.name) : '')} 
                alt={chat.name} 
                className="w-12 h-12 rounded-full object-cover ring-2 ring-[#00a884]/30 shadow-lg flex-shrink-0" 
              />
              <div className="min-w-0 flex-1">
                <div className="flex justify-between items-center mb-1">
                  <div className="font-semibold text-[#e9edef] truncate text-[17px]">{chat.name}</div>
                  <div className="text-xs text-[#8696a0]">{chat.time}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-[#8696a0] truncate flex-1 pr-2">
                    {chat.lastMessage}
                  </div>
                  {chat.unread > 0 && (
                    <div className="bg-[#00a884] text-[#111b21] text-[10px] font-bold min-w-[20px] h-[20px] rounded-full flex items-center justify-center flex-shrink-0">
                      {chat.unread}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}        
        </div>
      </div>
    </div>
  );
};

export default ChatList;
