import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ArrowLeft, Trash2, Copy, Phone, Search, X, Smile, Plus, CheckSquare, Video, MoreVertical, 
  Users, User, Image, MessageCircle, Bell, Palette, MoreHorizontal
} from 'lucide-react';

const Chat = ({ socket, currentRoom, chat, getDefaultAvatar, onCall, onNewGroup }) => {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem(`chat_messages_${currentRoom}`);
    const parsed = savedMessages ? JSON.parse(savedMessages) : [];
    // পুরনো মেসেজগুলোতে যদি id না থাকে, তবে একটি তৈরি করে দিচ্ছি
    return parsed.map((m, i) => ({
      ...m,
      id: m.id || `legacy_${Date.now()}_${i}`
    }));
  });
  const [message, setMessage] = useState('');
  const [typingStatus, setTypingStatus] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState(new Set());
  const [isCallMenuOpen, setIsCallMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const moreMenuRef = useRef(null);

  const messagesEndRef = useRef(null);
  const typingTimerRef = useRef(null);
  const callMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (callMenuRef.current && !callMenuRef.current.contains(event.target)) {
        setIsCallMenuOpen(false);
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setIsMoreMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(`chat_messages_${currentRoom}`, JSON.stringify(messages));
  }, [messages, currentRoom]);

  useEffect(() => {
    if (socket) {
      socket.emit('join_room', currentRoom);
    }
  }, [currentRoom, socket]);

  useEffect(() => {
    if (!socket) return;

    const receiveMessage = (data) => {
      if (data.roomId === currentRoom) {
        setMessages(prev => [...prev, data]);
      }
    };

    const typingUpdate = (data) => {
      if (data.roomId === currentRoom && data.senderId !== socket.id) {
        setTypingStatus(true);
        if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
        typingTimerRef.current = setTimeout(() => setTypingStatus(false), 3000);
      }
    };

    socket.on('receive_message', receiveMessage);
    socket.on('typing_update', typingUpdate);

    return () => {
      socket.off('receive_message', receiveMessage);
      socket.off('typing_update', typingUpdate);
    };
  }, [socket, currentRoom]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !socket) return;

    const messageData = {
      id: Date.now().toString() + Math.random().toString(), // মেসেজ ডিলিট করার জন্য ইউনিক ID
      roomId: currentRoom,
      message: message.trim(),
      senderId: socket.id,
      timestamp: new Date().toISOString()
    };

    // Optimistic update
    setMessages(prev => [...prev, messageData]);
    socket.emit('send_message', messageData);
    setMessage('');
  };

  const handleTyping = (e) => {
    const value = e.target.value;
    setMessage(value);

    if (socket && value.trim()) {
      socket.emit('typing', { roomId: currentRoom, isTyping: true, senderId: socket.id });
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      typingTimerRef.current = setTimeout(() => {
        socket.emit('typing', { roomId: currentRoom, isTyping: false, senderId: socket.id });
      }, 1500);
    }
  };

  const isOwnMessage = (msg) => msg.senderId === socket?.id;

  // মেসেজ সিলেক্ট করার ফাংশন
  const handleSelectMessage = (msgId) => {
    setSelectedMessages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(msgId)) {
        newSet.delete(msgId);
      } else {
        newSet.add(msgId);
      }
      return newSet;
    });
  };

  // সব মেসেজ একসাথে সিলেক্ট করার ফাংশন
  const handleSelectAll = () => {
    if (selectedMessages.size === messages.length) {
      clearSelection();
    } else {
      setSelectedMessages(new Set(messages.map(m => m.id)));
    }
  };

  // সিলেকশন বাতিল করা
  const clearSelection = () => {
    setSelectedMessages(new Set());
  };

  // মেসেজ ডিলিট করার ফাংশন
  const handleDeleteMessages = () => {
    if (window.confirm("Are you sure you want to delete selected messages?")) {
      setMessages(prev => prev.filter(msg => !selectedMessages.has(msg.id)));
      clearSelection();
    }
  };

  const filteredMessages = messages.filter((msg) =>
    msg.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const highlightSearchText = (text) => {
    if (!searchTerm.trim()) return text;

    const escapedSearch = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const parts = text.split(new RegExp(`(${escapedSearch})`, 'gi'));

    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <mark key={index} className="bg-yellow-400/80 text-black px-0.5 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="h-screen flex flex-col bg-[#0b141a]">
      {/* Header - সিলেকশন থাকলে ডিলিট অপশন আসবে, না থাকলে চ্যাট ইনফো */}
      {selectedMessages.size > 0 ? (
        <div className="h-[70px] py-0 bg-[#202c33] border-b border-[#2a3942] flex items-center px-4 gap-4 animate-in fade-in slide-in-from-top-2 duration-200 z-20">
          <button onClick={clearSelection} className="text-[#aebac1] hover:text-white p-2 rounded-full hover:bg-[#37404a] transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <span className="text-white font-medium text-lg flex-1">{selectedMessages.size} selected</span>
          
          <div className="flex items-center gap-2 text-[#aebac1]">
            <button onClick={handleSelectAll} className="hover:text-white p-2 rounded-full hover:bg-[#37404a] transition-colors" title="Select All">
              <CheckSquare className="w-5 h-5" />
            </button>
            <button onClick={handleDeleteMessages} className="hover:text-red-400 p-2 rounded-full hover:bg-[#37404a] transition-colors" title="Delete">
              <Trash2 className="w-5 h-5" />
            </button>
            <button className="hover:text-white p-2 rounded-full hover:bg-[#37404a] transition-colors" title="Copy">
              <Copy className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        /* Normal Header */
        chat && (
          <div className="min-h-[70px] py-0 bg-[#202c33] border-b border-[#2a3942] flex flex-col justify-center flex-shrink-0 px-4 z-20 relative">
            <div className="h-[70px] flex items-center space-x-4">
            <img 
              src={chat.avatar || (getDefaultAvatar ? getDefaultAvatar(chat.name) : '')} 
              alt={chat.name} 
              className="w-10 h-10 rounded-full ring-2 ring-[#00a884]/30 shadow-lg object-cover cursor-pointer" 
            />
            <div className="flex-1 min-w-0 cursor-pointer">
              <div className="font-semibold text-white truncate">{chat.name}</div>
              <div className="text-xs text-[#00a884]">Online</div>
            </div>
            <div className="flex items-center gap-1 text-[#aebac1]">
              <div className="relative" ref={callMenuRef}>
                <button
                  type="button"
                  title="Call options"
                  aria-label="Open call options"
                  onClick={() => setIsCallMenuOpen(!isCallMenuOpen)}
                  className={`p-2 rounded-full transition-colors ${isCallMenuOpen ? 'bg-[#37404a]' : 'hover:bg-[#37404a]'}`}
                >
                  <Phone className="w-5 h-5" />
                </button>
                {isCallMenuOpen && (
                  <div className="absolute top-12 right-0 w-48 bg-[#233138] rounded-md shadow-lg z-50 py-2 border border-[#2a3942] origin-top-right">
                    <button onClick={() => { if(onCall) onCall(false); setIsCallMenuOpen(false); }} className="flex items-center w-full px-4 py-3 text-sm text-[#e9edef] hover:bg-[#111b21] transition-colors gap-3">
                      <Phone className="w-5 h-5" />
                      <span>Voice call</span>
                    </button>
                    <button onClick={() => { if(onCall) onCall(true); setIsCallMenuOpen(false); }} className="flex items-center w-full px-4 py-3 text-sm text-[#e9edef] hover:bg-[#111b21] transition-colors gap-3">
                      <Video className="w-5 h-5" />
                      <span>Video call</span>
                    </button>
                  </div>
                )}
              </div>
              <button
                type="button"
                title="Search messages"
                aria-label="Search messages"
                onClick={() => setIsSearchOpen((prev) => !prev)}
                className={`p-2 rounded-full transition-colors ${isSearchOpen ? 'bg-[#37404a] text-white' : 'hover:bg-[#37404a]'}`}
              >
                <Search className="w-5 h-5" />
              </button>
              <div className="relative" ref={moreMenuRef}>
                <button 
                  className="p-2 rounded-full hover:bg-[#37404a] transition-colors"
                  onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                >
                  <MoreVertical className="w-5 h-5" />
                </button>
                {isMoreMenuOpen && (
                  <div className="absolute top-12 right-0 w-64 bg-[#233138] rounded-md shadow-lg z-50 py-2 border border-[#2a3942]">
                    <button 
                      onClick={() => { if(onNewGroup) onNewGroup(); setIsMoreMenuOpen(false); }}
                      className="flex items-center w-full px-4 py-2.5 text-sm text-[#e9edef] hover:bg-[#111b21] transition-colors"
                    >
                      <Users className="w-4 h-4 mr-3 text-[#8696a0]" />
                      New group
                    </button>
                    <button className="flex items-center w-full px-4 py-2.5 text-sm text-[#e9edef] hover:bg-[#111b21] transition-colors">
                      <User className="w-4 h-4 mr-3 text-[#8696a0]" />
                      View contact
                    </button>
                    <button className="flex items-center w-full px-4 py-2.5 text-sm text-[#e9edef] hover:bg-[#111b21] transition-colors">
                      <Image className="w-4 h-4 mr-3 text-[#8696a0]" />
                      Media, links and docs
                    </button>
                    <button className="flex items-center w-full px-4 py-2.5 text-sm text-[#e9edef] hover:bg-[#111b21] transition-colors">
                      <MessageCircle className="w-4 h-4 mr-3 text-[#8696a0]" />
                      Disappearing messages
                    </button>
                    <button className="flex items-center w-full px-4 py-2.5 text-sm text-[#e9edef] hover:bg-[#111b21] transition-colors">
                      <Bell className="w-4 h-4 mr-3 text-[#8696a0]" />
                      Mute notifications
                    </button>
                    <button className="flex items-center w-full px-4 py-2.5 text-sm text-[#e9edef] hover:bg-[#111b21] transition-colors">
                      <Palette className="w-4 h-4 mr-3 text-[#8696a0]" />
                      Chat theme
                    </button>
                    <div className="my-1 mx-4 h-px bg-[#2a3942]"></div>
                    <button className="flex items-center w-full px-4 py-2.5 text-sm text-[#e9edef] hover:bg-[#111b21] transition-colors">
                      <MoreHorizontal className="w-4 h-4 mr-3 text-[#8696a0]" />
                      More
                    </button>
                  </div>
                )}
              </div>
            </div>

            {isSearchOpen && (
              <div className="pb-3">
                <div className="flex items-center gap-2 bg-[#2a3942] rounded-lg px-3 py-2">
                  <Search className="w-4 h-4 text-[#8696a0]" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search messages..."
                    className="flex-1 bg-transparent text-[#d1d7db] placeholder-[#8696a0] focus:outline-none text-sm"
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => setSearchTerm('')}
                      className="p-1 rounded-full hover:bg-[#37404a] text-[#8696a0] hover:text-white transition-colors"
                      aria-label="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            )}
            </div>
          </div>
        )
      )}

      {/* Messages */}
      <div className={`flex-1 overflow-y-auto p-6 space-y-2 bg-[#0b141a] bg-[url('https://static.whatsapp.net/rsrc.php/v3/yl/r/gi_DckWL1_q.png')] bg-repeat opacity-95`}>
        <>
          {filteredMessages.map((msg) => (
              <div key={msg.id} className={`flex ${isOwnMessage(msg) ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`message ${isOwnMessage(msg) ? 'sent' : 'received'} cursor-pointer select-none transition-all duration-200 ${selectedMessages.has(msg.id) ? 'bg-[#00a884]/40 ring-2 ring-[#00a884]' : ''}`}
                onDoubleClick={() => handleSelectMessage(msg.id)}
                onClick={() => selectedMessages.size > 0 && handleSelectMessage(msg.id)}
              >
                <p className="text-[14.2px] leading-[19px] break-words">{highlightSearchText(msg.message)}</p>
                <div className={`text-xs mt-2 opacity-80 flex items-center gap-1 ${
                  isOwnMessage(msg) ? 'justify-end' : 'justify-start'
                }`}>
                  <span className="text-[11px] text-[#ffffff99]">{new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: true})}</span>
                  {isOwnMessage(msg) && <span className="text-gray-500">✓✓</span>}
                </div>
              </div>
            </div>
          ))}

          {typingStatus && (
            <div className="flex justify-start p-2">
              <div className="bg-facebook/card/80 backdrop-blur-md border border-facebook/borderLight p-3 px-4 rounded-2xl shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '100ms'}}></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '200ms'}}></div>
                  </div>
                  <span className="text-sm opacity-90">Typing...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </>
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="bg-[#202c33] px-4 py-3 flex items-center gap-2">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button type="button" className="p-2 text-[#8696a0] hover:text-[#aebac1] transition-colors">
            <Smile className="w-6 h-6" />
          </button>
          <button type="button" className="p-2 text-[#8696a0] hover:text-[#aebac1] transition-colors">
            <Plus className="w-6 h-6" />
          </button>

          <input
            value={message}
            onChange={handleTyping}
            placeholder="Type your message..."
            className="flex-1 bg-[#2a3942] rounded-lg px-4 py-2 h-10 max-h-10 resize-none text-[#d1d7db] placeholder-[#8696a0] focus:outline-none text-[15px] w-full min-w-[300px]"
          />

          <button
            type="submit"
            disabled={!message.trim()}
            className={`p-2 rounded-full transition-all flex items-center justify-center w-10 h-10 ${message.trim() ? 'text-[#00a884]' : 'text-[#8696a0] cursor-not-allowed'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
