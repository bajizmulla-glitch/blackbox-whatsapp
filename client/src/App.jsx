import React, { useState, useEffect, useCallback } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Cropper from 'react-easy-crop';
import Chat from './components/Chat';
import ChatList from './components/ChatList';
import Shorts from './components/Shorts';
import CallHistory from './components/CallHistory';
import CallInterface from './components/CallInterface';
import UserMenu from './components/UserMenu';
import NewGroup from './components/NewGroup';
import { MessageCircle, Megaphone, Users, Phone } from 'lucide-react';
import io from 'socket.io-client';
import './index.css';

const socket = io('http://localhost:3001');

const mockChats = [
  { id: 'general', name: 'General Chat', avatar: null, lastMessage: 'BlackBox Chate!', time: '10:30', unread: 2 },
  { id: 'friends', name: 'Friends Group', avatar: null, lastMessage: 'See you tomorrow!', time: '09:15', unread: 0 },
  { id: 'work', name: 'Work Team', avatar: null, lastMessage: 'My Fast Job', time: 'Yesterday', unread: 5 },
  { id: 'mahin', name: 'Mahin', avatar: null, lastMessage: 'Kire mama ki obostha?', time: '01:23 AM', unread: 1 },
  { id: 'zihan', name: 'Zihan', avatar: null, lastMessage: 'Project ta kobe submit korbi?', time: '12:08 AM', unread: 0 },
  { id: 'felix', name: 'Felix', avatar: null, lastMessage: 'Meeting postponed.', time: '12:07 AM', unread: 0 },
  { id: 'rasel', name: 'Rasel', avatar: null, lastMessage: 'Done.', time: '12:07 AM', unread: 0 },
  { id: 'rahat', name: 'Rahat', avatar: null, lastMessage: 'Okay, I will check.', time: '12:07 AM', unread: 0 },
  { id: 'mom', name: 'Mom', avatar: null, lastMessage: 'Call me when you are free.', time: '12:00 AM', unread: 3 },
  { id: 'c1', name: 'Alice', avatar: null, lastMessage: 'Hey there!', time: 'Yesterday', unread: 0 },
  { id: 'c2', name: 'Bob', avatar: null, lastMessage: 'Can we meet?', time: 'Yesterday', unread: 0 },
  { id: 'c3', name: 'Charlie', avatar: null, lastMessage: 'Files sent.', time: 'Monday', unread: 0 },
  { id: 'c4', name: 'Al-Amin', avatar: null, lastMessage: 'Kire?', time: 'Monday', unread: 0 },
  { id: 'c5', name: 'Tanvir', avatar: null, lastMessage: 'Assignment ta dis', time: 'Sunday', unread: 1 },
  { id: 'c6', name: 'Rakib', avatar: null, lastMessage: 'Match a birokto', time: 'Sunday', unread: 0 },
  { id: 'c7', name: 'Fahim', avatar: null, lastMessage: 'Good night', time: 'Saturday', unread: 0 },
  { id: 'c8', name: 'Nayeem', avatar: null, lastMessage: 'Koi tui?', time: 'Saturday', unread: 2 },
  { id: 'c9', name: 'Imran', avatar: null, lastMessage: 'Thik ache', time: 'Friday', unread: 0 },
  { id: 'c10', name: 'Sabbir', avatar: null, lastMessage: 'Call de', time: 'Friday', unread: 0 },
  { id: 'c11', name: 'Mehedi', avatar: null, lastMessage: 'Haa', time: 'Thursday', unread: 0 },
  { id: 'c12', name: 'Tariq', avatar: null, lastMessage: 'Na', time: 'Thursday', unread: 0 },
  { id: 'c13', name: 'Masud', avatar: null, lastMessage: 'Dekha hobe', time: 'Wednesday', unread: 0 },
  { id: 'c14', name: 'Juel', avatar: null, lastMessage: 'Tk patha', time: 'Wednesday', unread: 0 },
  { id: 'c15', name: 'Akash', avatar: null, lastMessage: 'Okk', time: 'Tuesday', unread: 0 },
  { id: 'c16', name: 'Siam', avatar: null, lastMessage: 'By', time: 'Tuesday', unread: 0 },
  { id: 'c17', name: 'Rimon', avatar: null, lastMessage: 'Ki obostha', time: 'Last Week', unread: 0 },
  { id: 'c18', name: 'Emon', avatar: null, lastMessage: 'Valo', time: 'Last Week', unread: 0 },
  { id: 'c19', name: 'Ripon', avatar: null, lastMessage: 'Bus a uthsi', time: 'Last Week', unread: 0 },
  { id: 'c20', name: 'Jahid', avatar: null, lastMessage: 'Office a', time: 'Last Week', unread: 0 },
  { id: 'c21', name: 'Milon', avatar: null, lastMessage: 'Hobe na', time: 'Last Week', unread: 0 },
  { id: 'c22', name: 'Parvez', avatar: null, lastMessage: 'Sure', time: 'Last Week', unread: 0 },
  { id: 'c23', name: 'Sohag', avatar: null, lastMessage: 'Wait', time: 'Last Week', unread: 0 },
  { id: 'c24', name: 'Bulbul', avatar: null, lastMessage: 'Done', time: 'Last Week', unread: 0 },
  { id: 'c25', name: 'Shimul', avatar: null, lastMessage: 'Thanks', time: 'Last Week', unread: 0 },
  { id: 'c26', name: 'Sumon', avatar: null, lastMessage: 'Ami asi', time: 'Last Week', unread: 0 },
  { id: 'c27', name: 'Sajib', avatar: null, lastMessage: 'Khabo na', time: 'Last Week', unread: 0 },
  { id: 'c28', name: 'Biplob', avatar: null, lastMessage: 'Ghumassi', time: 'Last Week', unread: 0 },
  { id: 'c29', name: 'Faisal', avatar: null, lastMessage: 'Okay', time: 'Last Week', unread: 0 },
  { id: 'c30', name: 'Nabid', avatar: null, lastMessage: 'Tata', time: 'Last Week', unread: 0 },
  { id: 'c31', name: 'Shakil', avatar: null, lastMessage: 'Khabar ready', time: 'Last Week', unread: 0 },
  { id: 'c32', name: 'Hasan', avatar: null, lastMessage: 'Bike niye ay', time: 'Last Week', unread: 1 },
  { id: 'c33', name: 'Arif', avatar: null, lastMessage: 'Cricket khelbi?', time: 'Last Week', unread: 0 },
  { id: 'c34', name: 'Sohel', avatar: null, lastMessage: 'Office a jassi', time: 'Last Week', unread: 0 },
  { id: 'c35', name: 'Rana', avatar: null, lastMessage: 'Taka pathiyechi', time: 'Last Week', unread: 0 },
  { id: 'c36', name: 'Titu', avatar: null, lastMessage: 'Dokan a ay', time: 'Last Week', unread: 0 },
  { id: 'c37', name: 'Babu', avatar: null, lastMessage: 'Movie dekhbi?', time: 'Last Week', unread: 0 },
  { id: 'c38', name: 'Liton', avatar: null, lastMessage: 'Cha khabi?', time: 'Last Week', unread: 0 },
  { id: 'c39', name: 'Manik', avatar: null, lastMessage: 'Class a ay', time: 'Last Week', unread: 0 },
  { id: 'c40', name: 'Riaz', avatar: null, lastMessage: 'Valo achis?', time: 'Last Week', unread: 0 },
  { id: 'c41', name: 'Hannan', avatar: null, lastMessage: 'Kaj shesh', time: 'Last Week', unread: 0 },
  { id: 'c42', name: 'Kaiser', avatar: null, lastMessage: 'Phone dhor', time: 'Last Week', unread: 2 },
  { id: 'c43', name: 'Bachchu', avatar: null, lastMessage: 'Gan shunbi?', time: 'Last Week', unread: 0 },
  { id: 'c44', name: 'Pintu', avatar: null, lastMessage: 'Market a jabo', time: 'Last Week', unread: 0 },
  { id: 'c45', name: 'Mintu', avatar: null, lastMessage: 'Ghum theke uth', time: 'Last Week', unread: 0 },
  { id: 'c46', name: 'Shipon', avatar: null, lastMessage: 'Laptop thik kor', time: 'Last Week', unread: 0 },
  { id: 'c47', name: 'Sujon', avatar: null, lastMessage: 'Bajar korbi na?', time: 'Last Week', unread: 0 },
  { id: 'c48', name: 'Helal', avatar: null, lastMessage: 'Rickshaw paichi', time: 'Last Week', unread: 0 },
  { id: 'c49', name: 'Mizan', avatar: null, lastMessage: 'Namaz por', time: 'Last Week', unread: 0 },
  { id: 'c50', name: 'Faruk', avatar: null, lastMessage: 'Dawat ache', time: 'Last Week', unread: 0 },
  { id: 'c51', name: 'Anis', avatar: null, lastMessage: 'Boita de', time: 'Last Week', unread: 0 },
  { id: 'c52', name: 'Bashar', avatar: null, lastMessage: 'Cricket match', time: 'Last Week', unread: 0 },
  { id: 'c53', name: 'Kader', avatar: null, lastMessage: 'Cha er dokan', time: 'Last Week', unread: 0 },
  { id: 'c54', name: 'Latif', avatar: null, lastMessage: 'Bari jabo', time: 'Last Week', unread: 0 },
  { id: 'c55', name: 'Shafiq', avatar: null, lastMessage: 'Result dise', time: 'Last Week', unread: 0 },
];

const getDefaultAvatar = (name) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;

function App() {
  // Check if user is logged in
  if (!localStorage.getItem('user')) {
    return <Login />;
  }

  const [activeTab, setActiveTab] = useState('chats');
  const [currentChat, setCurrentChat] = useState(null);
  const [chats, setChats] = useState(() => {
    const savedChats = localStorage.getItem('chats');
    if (!savedChats) return mockChats;
    
    // Merge saved chats with new mock chats (to ensure new users appear)
    const parsedSaved = JSON.parse(savedChats);
    const savedIds = new Set(parsedSaved.map(c => c.id));
    const newMockChats = mockChats.filter(c => !savedIds.has(c.id));
    return [...parsedSaved, ...newMockChats];
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [viewMode, setViewMode] = useState('chat');
  const [showNewGroup, setShowNewGroup] = useState(false);
  const [activeCall, setActiveCall] = useState(null);
  const [isCallMinimized, setIsCallMinimized] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const isDraggingRef = React.useRef(false);
  const dragStartRef = React.useRef({ x: 0, y: 0 });

  // Cropper states
  const [showCropper, setShowCropper] = useState(false);
  const [cropImage, setCropImage] = useState('');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
    setUserId(null);
    window.location.reload();
  };


  const handleSelectChat = (chat) => {
    setCurrentChat(chat);
    // যদি কোনো কল চালু থাকে:
    // ১. অন্য চ্যাটে গেলে কল স্ক্রিন ছোট (Minimize) হয়ে যাবে।
    // ২. কলের চ্যাটে ফিরে আসলে কল স্ক্রিন বড় (Maximize) হয়ে যাবে।
    if (activeCall) {
      setIsCallMinimized(activeCall.id !== chat.id);
    }
  };

  const handleStartChat = (contact) => {
    let existingChat = chats.find(c => c.name === contact.name);
    if (!existingChat) {
      existingChat = {
        id: contact.id,
        name: contact.name,
        avatar: contact.avatar,
        lastMessage: '',
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
        unread: 0
      };
      setChats(prev => [existingChat, ...prev]);
    }
    setCurrentChat(existingChat);
    setActiveTab('chats');
    setViewMode('chat');

    if (activeCall) {
      setIsCallMinimized(activeCall.id !== contact.id);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCropImage(event.target.result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropSave = useCallback(async () => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const image = await createImage(cropImage);

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      canvas.toBlob((blob) => {
        console.log('Image captured, ready for MongoDB:', blob);
        // Update local state immediately
        setCurrentUser(prev => ({ ...prev, avatar: URL.createObjectURL(blob) }));
      }, 'image/jpeg', 0.8);
    } catch (e) {
      console.error(e);
    }

    setShowCropper(false);
    setCropImage('');
    setCroppedAreaPixels(null);
  }, [cropImage, croppedAreaPixels]);

  function createImage(url) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', reject);
      image.src = url;
    });
  }

  useEffect(() => {
    // Load user from localStorage (already checked above, but for completeness)
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('chats', JSON.stringify(chats));
  }, [chats]);

  // Dragging logic for minimized call window
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDraggingRef.current) return;
      e.preventDefault();
      setDragOffset({
        x: e.clientX - dragStartRef.current.x,
        y: e.clientY - dragStartRef.current.y
      });
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    if (isCallMinimized) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isCallMinimized]);

  const handleDragStart = (e) => {
    if (!isCallMinimized) return;
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
    
    isDraggingRef.current = true;
    dragStartRef.current = {
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y
    };
  };

  const renderMainContent = () => {
    switch (activeTab) {
      case 'chats':
        if (showNewGroup) {
          return (
            <div className="flex-1 h-full w-full border-l border-[#2a3942] bg-[#0b141a] overflow-hidden">
              <NewGroup 
                onBack={() => setShowNewGroup(false)} 
                contacts={chats}
                getDefaultAvatar={getDefaultAvatar}
              />
            </div>
          );
        }
        if (!currentChat) {
          return (
            <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden ml-4 md:ml-0 h-full text-center p-10 bg-[#111b21]">
              {/* Animated Background Blobs */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] left-[20%] w-72 h-72 bg-[#00a884] rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob"></div>
                <div className="absolute top-[20%] right-[20%] w-72 h-72 bg-[#25d366] rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[20%] left-[30%] w-72 h-72 bg-[#005c4b] rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob animation-delay-4000"></div>
              </div>

              {/* Main Content Card */}
              <div className="relative z-10 max-w-[600px] bg-[#202c33]/40 backdrop-blur-lg p-10 rounded-[2rem] border border-[#2a3942]/50 shadow-[0_0_50px_-12px_rgba(0,168,132,0.2)] flex flex-col items-center">
                <div className="mb-6 relative group">
                   <div className="absolute -inset-1 bg-gradient-to-r from-[#00a884] to-[#25d366] rounded-full opacity-20 group-hover:opacity-40 blur transition duration-500"></div>
                   <img 
                     src="logo.png" 
                     alt="BlackBox Chat" 
                     className="h-24 w-auto object-contain relative z-10 drop-shadow-2xl transform transition duration-500 group-hover:scale-110"
                     onError={(e) => {e.target.style.display = 'none'; e.target.parentNode.innerHTML = '<span class="text-6xl animate-bounce">💬</span>';}} 
                   />
                </div>

                <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
                  BlackBox <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a884] to-[#25d366]">Chat</span>
                </h1>
                <h2 className="text-[#e9edef] text-3xl font-light mb-4">Message privately</h2>
                <p className="text-[#8696a0] text-sm mb-8 leading-relaxed max-w-md">Simple, reliable, private messaging and calling for free*, available all over the world.</p>
                <div className="flex items-center gap-2 px-5 py-2.5 bg-[#111b21]/80 rounded-full border border-[#2a3942] text-[#8696a0] text-sm font-medium shadow-inner"><span className="text-[#00a884]">🔒</span> End-to-end encrypted</div>
              </div>
              <div className="absolute bottom-0 w-full h-1.5 bg-gradient-to-r from-transparent via-[#00a884]/50 to-transparent blur-sm"></div>
            </div>
          );
        }
        return (
          <div className="flex-1 flex flex-col bg-[#202c33] min-w-0 ml-4 md:ml-0">
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              {viewMode === 'chat' ? (
                <Chat 
                  key={currentChat?.id || 'general'} 
                  socket={socket} 
                  currentRoom={currentChat?.id || 'general'} 
                  chat={currentChat}
                  getDefaultAvatar={getDefaultAvatar}
                  onCall={(isVideo) => setActiveCall({ ...currentChat, isVideo })}
                  onNewGroup={() => setShowNewGroup(true)}
                />
              ) : showNewGroup ? (
                <NewGroup 
                  onBack={() => setShowNewGroup(false)} 
                  contacts={chats}
                  getDefaultAvatar={getDefaultAvatar}
                />
              ) : (
                <CallHistory onBack={() => setViewMode('chat')} currentUser={currentUser} getDefaultAvatar={getDefaultAvatar} onStartChat={handleStartChat} />
              )}
            </div>
          </div>
        );
      case 'calls':
        return <CallHistory 
          onBack={() => setActiveTab('chats')} 
          currentUser={currentUser} 
          getDefaultAvatar={getDefaultAvatar} 
          onStartChat={handleStartChat} 
          onStartCall={(contact) => setActiveCall({ ...contact, isVideo: false })}
        />;
      case 'updates':
        return (
          <div className="flex items-center justify-center flex-1 text-gray-400 ml-4 md:ml-0">
            <div className="text-center">
              <Megaphone className="w-24 h-24 mx-auto mb-4 opacity-50 text-green-400" />
              <h2 className="text-xl font-semibold text-white mb-2">Updates</h2>
              <p>Status updates will appear here</p>
            </div>
          </div>
        );
      case 'communities':
        return (
          <div className="flex items-center justify-center flex-1 text-gray-400 ml-4 md:ml-0">
            <div className="text-center">
              <Users className="w-24 h-24 mx-auto mb-4 opacity-50 text-green-400" />
              <h2 className="text-xl font-semibold text-white mb-2">Communities</h2>
              <p>Group chats and communities</p>
            </div>
          </div>
        );
      case 'shorts':
        return (
          <div className="flex-1 ml-4 md:ml-0">
            <Shorts />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="h-screen flex bg-[#0f1419] overflow-hidden">
        {/* Left Nav Rail */}
        <div className="nav-rail md:block hidden">
          <button onClick={() => { setActiveTab('chats'); setCurrentChat(null); if(activeCall) setIsCallMinimized(true); }} className={`nav-rail-button ${activeTab === 'chats' ? 'nav-rail-button-active' : ''}`}>
            <MessageCircle className="w-6 h-6" />
          </button>
          <button onClick={() => { setActiveTab('calls'); if(activeCall) setIsCallMinimized(true); }} className={`nav-rail-button ${activeTab === 'calls' ? 'nav-rail-button-active' : ''}`}>
            <Phone className="w-6 h-6" />
          </button>
          <button onClick={() => { setActiveTab('updates'); if(activeCall) setIsCallMinimized(true); }} className={`nav-rail-button ${activeTab === 'updates' ? 'nav-rail-button-active' : ''}`}>
            <Megaphone className="w-6 h-6" />
          </button>
          <button onClick={() => { setActiveTab('communities'); if(activeCall) setIsCallMinimized(true); }} className={`nav-rail-button ${activeTab === 'communities' ? 'nav-rail-button-active' : ''}`}>
            <Users className="w-6 h-6" />
          </button>
          <button onClick={() => { setActiveTab('shorts'); if(activeCall) setIsCallMinimized(true); }} className={`nav-rail-button ${activeTab === 'shorts' ? 'nav-rail-button-active' : ''}`}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H3V6h18v12z"/>
            </svg>
          </button>
        </div>

        {/* Sidebar */}
        {activeTab === 'chats' && (
        <div className="chat-sidebar md:block hidden flex-shrink-0">
          <div 
            onClick={() => { setCurrentChat(null); setShowNewGroup(false); }}
            className="h-[70px] flex-shrink-0 border-b border-[#2a3942] bg-gradient-to-r from-black to-[#082f28] flex items-center justify-start relative z-30 px-4 shadow-sm cursor-pointer select-none"
            title="Go to Home"
          >
            <img 
              src="logo.png" 
              alt="BlackBox WhatsApp" 
              className="h-10 w-auto object-contain"
              onError={(e) => {e.target.onerror = null; e.target.style.display = 'none'; e.target.parentNode.innerHTML = '<span class="text-2xl font-extrabold tracking-wider bg-gradient-to-r from-[#00a884] to-[#25d366] bg-clip-text text-transparent drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">BlackBox Chat</span>';}} 
            />
          </div>

          <ChatList className="h-full flex-1" chats={chats} currentChat={currentChat} onSelect={handleSelectChat} getDefaultAvatar={getDefaultAvatar} />

          <UserMenu
            currentUser={currentUser} 
            getDefaultAvatar={getDefaultAvatar}
            onLogout={handleLogout}
            onSettings={() => {}} 
          /> 
        </div>
        )}

        {/* Main Content */}
        <div className="flex-1 min-w-0 flex flex-col md:flex-row relative">
          {renderMainContent()}

          {/* Call Interface Overlay */}
          {activeCall && (
            <div 
              onMouseDown={handleDragStart}
              style={isCallMinimized ? { transform: `translate(${dragOffset.x}px, ${dragOffset.y}px)`, cursor: 'move' } : {}}
              className={isCallMinimized 
              ? "absolute bottom-6 right-6 w-80 h-56 z-[100] shadow-2xl rounded-2xl overflow-hidden border border-[#2a3942] bg-[#0b141a]" 
              : "absolute inset-0 z-[100] bg-[#0b141a] transition-all duration-300 ease-in-out"}>
              <CallInterface 
                contact={activeCall} 
                onEndCall={(duration, wasConnected) => {
                  const messageText = wasConnected ? `📞 Voice Call · ${duration}` : `📞 Voice Call`;
                  const now = new Date();
                  const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

                  const callLog = { name: activeCall.name, type: 'outgoing', status: 'answered', time: timeString, duration: duration };
                  let finalChatId = activeCall.id;
                  const existingChat = chats.find(c => c.id === activeCall.id || c.name === activeCall.name);
                  if (existingChat) {
                    finalChatId = existingChat.id;

                    // Save call log to the chat
                    setChats(prevChats =>{
                      const otherChats = prevChats.filter(c => c.id !== finalChatId);
                      const updatedChat = {
                        ...existingChat,
                        messages: [
                          ...(existingChat.messages || []),
                          {
                            id: `call_${now.getTime()}`, // Unique ID for the call log
                            message: messageText,
                            timestamp: now.toISOString(),
                            type: 'call',
                            duration: duration,
                            wasConnected: wasConnected,
                            userId: currentUser.id
                          }
                        ]
                      };
                      return [updatedChat, ...otherChats];
                    });
                  }

                  // কল শেষে মেসেজ বক্সে সেভ করা হবে - শুধু চ্যাট লিস্ট আপডেট হবে (যদি আগে থেকে চ্যাট থাকে)
                  if (existingChat) {
                    setChats(prevChats => {
                      const otherChats = prevChats.filter(c => c.id !== finalChatId);
                      const updatedChat = {
                        ...existingChat,
                        time: timeString,
                        unread: 0
                      };
                      return [updatedChat, ...otherChats];
                    });
                  }

                  setActiveCall(null);
                  setIsCallMinimized(false);
                }}
                getDefaultAvatar={getDefaultAvatar}
                isVideoCall={activeCall.isVideo}
                isMinimized={isCallMinimized}
                onToggleMinimize={() => {
                  if (!isCallMinimized) setDragOffset({ x: 0, y: 0 }); // Reset position on minimize
                  setIsCallMinimized(!isCallMinimized);
                }}
              />
            </div>
          )}
        </div>

        {/* Mobile Nav */}
        <div className="mobile-nav md:hidden">
          <button onClick={() => { setActiveTab('chats'); setCurrentChat(null); if(activeCall) setIsCallMinimized(true); }} className={`py-2 px-3 rounded-lg font-medium transition-colors ${activeTab === 'chats' ? 'bg-[#00a884] text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-[#2a3942]'}`}>
            <MessageCircle className="w-6 h-6 mx-auto" />
            <span className="text-xs mt-1 block">Chats</span>
          </button>
          <button onClick={() => { setActiveTab('calls'); if(activeCall) setIsCallMinimized(true); }} className={`py-2 px-3 rounded-lg font-medium transition-colors ${activeTab === 'calls' ? 'bg-[#00a884] text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-[#2a3942]'}`}>
            <Phone className="w-6 h-6 mx-auto" />
            <span className="text-xs mt-1 block">Calls</span>
          </button>
          <button onClick={() => { setActiveTab('updates'); if(activeCall) setIsCallMinimized(true); }} className={`py-2 px-3 rounded-lg font-medium transition-colors ${activeTab === 'updates' ? 'bg-[#00a884] text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-[#2a3942]'}`}>
            <Megaphone className="w-6 h-6 mx-auto" />
            <span className="text-xs mt-1 block">Updates</span>
          </button>
          <button onClick={() => { setActiveTab('communities'); if(activeCall) setIsCallMinimized(true); }} className={`py-2 px-3 rounded-lg font-medium transition-colors ${activeTab === 'communities' ? 'bg-[#00a884] text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-[#2a3942]'}`}>
            <Users className="w-6 h-6 mx-auto" />
            <span className="text-xs mt-1 block">Communities</span>
          </button>
          <button onClick={() => { setActiveTab('shorts'); if(activeCall) setIsCallMinimized(true); }} className={`py-2 px-3 rounded-lg font-medium transition-colors ${activeTab === 'shorts' ? 'bg-[#00a884] text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-[#2a3942]'}`}>
            <svg className="w-6 h-6 mx-auto" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H3V6h18v12z"/>
            </svg>
            <span className="text-xs mt-1 block">Shorts</span>
          </button>
        </div>
      </div>

      {/* Cropper Modal - z-index 9999 */}
      {showCropper && (
        <div className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4">
          <div className="bg-[#111b21] rounded-2xl p-8 w-full max-w-md max-h-[90vh] shadow-2xl border border-[#2a3942]">
            <h3 className="text-white text-lg font-semibold mb-6 text-center">Crop Photo</h3>
            <div className="h-64 w-full relative mb-6 rounded-xl overflow-hidden border-2 border-[#2a3942]">
              <Cropper
                image={cropImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <div className="flex flex-col space-y-4">
              <label className="block text-sm text-gray-300 mb-2">Zoom:</label>
              <input
                type="range"
                min="1"
                max="3"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-[#00a884]"
              />
              <div className="flex gap-4 justify-end pt-4 border-t border-[#2a3942]">
                <button
                  onClick={() => {
                    setShowCropper(false);
                    setCropImage('');
                  }}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCropSave}
                  className="px-6 py-2 bg-[#00a884] hover:bg-[#008c6d] text-white rounded-lg font-medium transition-all shadow-lg"
                >
                  Save Photo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  ); 
}

export default App;
export { socket };
