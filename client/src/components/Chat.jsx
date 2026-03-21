import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ArrowLeft, Trash2, Copy, Phone, Search, X, Smile, Plus, CheckSquare, Video, MoreVertical, 
  Users, User, Image, MessageCircle, Bell, Palette, MoreHorizontal
} from 'lucide-react';

const Chat = ({ socket, currentRoom, chat, getDefaultAvatar, onCall, onNewGroup }) => {
  const [messages, setMessages] = useState([]);
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

  // লোকাল স্টোরেজ থেকে আগের মেসেজ লোড করা
  useEffect(() => {
    const savedMessages = localStorage.getItem(`chat_messages_${currentRoom}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages([]); // নতুন রুম হলে ফাঁকা করে দেওয়া
    }
  }, [currentRoom]);

  // মেসেজ আপডেট হলে লোকাল স্টোরেজে সেভ করা
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(`chat_messages_${currentRoom}`, JSON.stringify(messages));
    }
  }, [messages, currentRoom]);

  // মাউস ক্লিক আউটসাইড ডিটেকশন
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (callMenuRef.current && !callMenuRef.current.contains(event.target)) setIsCallMenuOpen(false);
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) setIsMoreMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingStatus, scrollToBottom]);

  // সকেট লজিক
  useEffect(() => {
    if (!socket) return;

    socket.emit('join_room', currentRoom);

    const receiveMessage = (data) => {
      if (data.roomId === currentRoom) {
        setMessages(prev => [...prev, data]);
      }
    };

    const typingUpdate = (data) => {
      if (data.roomId === currentRoom && data.senderId !== socket.id) {
        setTypingStatus(data.isTyping);
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
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      roomId: currentRoom,
      message: message.trim(),
      senderId: socket.id,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, messageData]);
    socket.emit('send_message', messageData);
    setMessage('');
    
    // টাইপিং বন্ধ করা
    socket.emit('typing', { roomId: currentRoom, isTyping: false, senderId: socket.id });
  };

  const handleTyping = (e) => {
    const value = e.target.value;
    setMessage(value);

    if (socket) {
      socket.emit('typing', { roomId: currentRoom, isTyping: value.trim().length > 0, senderId: socket.id });
      
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      typingTimerRef.current = setTimeout(() => {
        socket.emit('typing', { roomId: currentRoom, isTyping: false, senderId: socket.id });
      }, 2000);
    }
  };

  const isOwnMessage = (msg) => msg.senderId === socket?.id;

  const handleSelectMessage = (msgId) => {
    setSelectedMessages(prev => {
      const newSet = new Set(prev);
      newSet.has(msgId) ? newSet.delete(msgId) : newSet.add(msgId);
      return newSet;
    });
  };

  const handleDeleteMessages = () => {
    if (window.confirm("Delete selected messages?")) {
      setMessages(prev => prev.filter(msg => !selectedMessages.has(msg.id)));
      setSelectedMessages(new Set());
    }
  };

  const filteredMessages = messages.filter(msg =>
    msg.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-[#0b141a] overflow-hidden">
      
      {/* Dynamic Header */}
      <div className="h-[70px] bg-[#202c33] border-b border-[#2a3942] flex items-center px-4 gap-4 z-20">
        {selectedMessages.size > 0 ? (
          <>
            <button onClick={() => setSelectedMessages(new Set())} className="text-[#aebac1] hover:text-white"><ArrowLeft /></button>
            <span className="text-white font-medium flex-1">{selectedMessages.size} selected</span>
            <button onClick={handleDeleteMessages} className="text-[#aebac1] hover:text-red-400 p-2"><Trash2 size={20}/></button>
            <button onClick={() => {
              const texts = messages.filter(m => selectedMessages.has(m.id)).map(m => m.message).join('\n');
              navigator.clipboard.writeText(texts);
              setSelectedMessages(new Set());
            }} className="text-[#aebac1] hover:text-white p-2"><Copy size={20}/></button>
          </>
        ) : (
          chat && (
            <>
              <img 
                src={chat.avatar || (getDefaultAvatar ? getDefaultAvatar(chat.name) : '')} 
                className="w-10 h-10 rounded-full object-cover" alt="" 
              />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white truncate">{chat.name}</div>
                <div className="text-xs text-[#00a884]">{typingStatus ? 'typing...' : 'online'}</div>
              </div>
              <div className="flex items-center gap-1 text-[#aebac1]">
                <button onClick={() => setIsCallMenuOpen(!isCallMenuOpen)} className="p-2 hover:bg-[#37404a] rounded-full relative" ref={callMenuRef}>
                  <Phone size={20} />
                  {isCallMenuOpen && (
                    <div className="absolute top-12 right-0 w-48 bg-[#233138] rounded shadow-xl py-2 border border-[#2a3942]">
                       <button onClick={() => onCall(false)} className="w-full text-left px-4 py-2 hover:bg-[#111b21] flex items-center gap-3"><Phone size={16}/> Voice Call</button>
                       <button onClick={() => onCall(true)} className="w-full text-left px-4 py-2 hover:bg-[#111b21] flex items-center gap-3"><Video size={16}/> Video Call</button>
                    </div>
                  )}
                </button>
                <button onClick={() => setIsSearchOpen(!isSearchOpen)} className={`p-2 rounded-full ${isSearchOpen ? 'text-[#00a884]' : ''}`}><Search size={20}/></button>
              </div>
            </>
          )
        )}
      </div>

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="bg-[#111b21] p-2 border-b border-[#2a3942] flex items-center gap-2">
          <input 
            type="text" placeholder="Search messages..." 
            className="flex-1 bg-[#2a3942] text-white px-4 py-1 rounded-md outline-none"
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={() => {setSearchTerm(''); setIsSearchOpen(false)}}><X size={20} className="text-[#8696a0]"/></button>
        </div>
      )}

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-opacity-5">
        {filteredMessages.map((msg) => (
          <div key={msg.id} className={`flex ${isOwnMessage(msg) ? 'justify-end' : 'justify-start'}`}>
            <div 
              onClick={() => selectedMessages.size > 0 && handleSelectMessage(msg.id)}
              onDoubleClick={() => handleSelectMessage(msg.id)}
              className={`max-w-[70%] px-3 py-1.5 rounded-lg text-[14.5px] shadow-sm cursor-pointer relative ${
                isOwnMessage(msg) ? 'bg-[#005c4b] text-white rounded-tr-none' : 'bg-[#202c33] text-[#e9edef] rounded-tl-none'
              } ${selectedMessages.has(msg.id) ? 'ring-2 ring-[#00a884] bg-opacity-50' : ''}`}
            >
              <p className="break-words">{msg.message}</p>
              <div className="flex items-center justify-end gap-1 mt-1">
                <span className="text-[10px] opacity-60">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {isOwnMessage(msg) && <span className="text-[10px] text-[#53bdeb]">✓✓</span>}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={sendMessage} className="bg-[#202c33] p-3 flex items-center gap-3">
        <button type="button" className="text-[#8696a0]"><Smile /></button>
        <button type="button" className="text-[#8696a0]"><Plus /></button>
        <input 
          type="text" value={message} onChange={handleTyping}
          placeholder="Type a message" 
          className="flex-1 bg-[#2a3942] text-white px-4 py-2 rounded-lg outline-none"
        />
        <button type="submit" disabled={!message.trim()} className={`${message.trim() ? 'text-[#00a884]' : 'text-[#8696a0]'}`}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path></svg>
        </button>
      </form>
    </div>
  );
};

export default Chat;