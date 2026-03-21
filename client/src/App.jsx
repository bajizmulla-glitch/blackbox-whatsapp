import React, { useState, useEffect } from 'react';
import AuthWrapper from './components/AuthWrapper';
import './index.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <AuthWrapper onAuthSuccess={(userData) => {
      localStorage.setItem('user', JSON.stringify(userData));
      setCurrentUser(userData);
    }} />;
  }

  return (
    <div className="h-screen flex bg-[#0f1419]">
      {/* Sidebar */}
      <div className="w-80 bg-[#111b21] border-r border-[#2a3942] p-4 flex flex-col">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
            💬
          </div>
          <div>
            <div className="text-white font-semibold">{currentUser.name}</div>
            <div className="text-[#8696a0] text-sm">Online</div>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="p-3 bg-[#202c33] rounded-lg mb-4 cursor-pointer hover:bg-[#2a3942]">
            <div className="text-white font-semibold mb-1">General Chat</div>
            <div className="text-[#8696a0] text-sm">Welcome!</div>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="mt-auto p-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center text-white bg-gradient-to-br from-[#111b21] to-[#202c33]">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-8 bg-green-500 rounded-full flex items-center justify-center text-4xl">
            💬
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            BlackBox WhatsApp
          </h1>
          <p className="text-xl text-[#8696a0]">Select a chat to start messaging</p>
        </div>
      </div>
    </div>
  );
}

export default App;
