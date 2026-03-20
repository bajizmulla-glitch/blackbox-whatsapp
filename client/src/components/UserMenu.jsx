import React, { useState, useRef, useEffect } from 'react';
import { Download, Settings, LogOut, MoreVertical } from 'lucide-react';

const UserMenu = ({ currentUser, getDefaultAvatar, onLogout, onSettings }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  
  const handleWhatsAppDownload = () => {
    window.open('https://www.whatsapp.com/download', '_blank');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-[#111b21] border-t border-[#2a3942] p-3">
      {/* WhatsApp Download Section */}
      <div className="mb-3 p-3 bg-gradient-to-r from-[#25d366]/10 to-[#00a884]/10 rounded-lg border border-[#25d366]/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#25d366] rounded-full flex items-center justify-center">
              <Download className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-[#d9dedb] text-sm font-medium">WhatsApp for Desktop</p>
              <p className="text-[#8696a0] text-xs">Download & chat on PC/Mac</p>
            </div>
          </div>
          <button
            onClick={handleWhatsAppDownload}
            className="px-3 py-1.5 bg-[#25d366] hover:bg-[#20bd5a] text-white text-xs font-medium rounded-md transition-colors duration-200"
          >
            Download
          </button>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer hover:bg-[#2a3942] rounded-lg p-2 transition-colors duration-200"
          onClick={onSettings}
        >
          <img 
            src={currentUser?.avatar || getDefaultAvatar(currentUser?.name || 'User')}
            alt="Profile"
className="w-10 h-10 rounded-full object-cover border-2 border-[#25d366] flex items-center justify-center overflow-hidden font-semibold text-sm bg-gradient-to-br from-gray-600 to-gray-700 text-white relative z-10"
          />
          <div className="flex-1 min-w-0">
            <p className="text-[#d9dedb] text-sm font-medium truncate">
              {currentUser?.name || 'Your Name'}
            </p>
            <p className="text-[#8696a0] text-xs">Click to edit profile</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={onSettings}
            className="p-2 text-[#8696a0] hover:text-[#d9dedb] hover:bg-[#2a3942] rounded-lg transition-colors duration-200"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button 
            onClick={onLogout}
            className="p-2 text-[#8696a0] hover:text-[#ef5350] hover:bg-[#2a3942] rounded-lg transition-colors duration-200"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
          <div className="relative" ref={menuRef}>
            <button 
              onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
              className="p-2 text-[#8696a0] hover:text-[#d9dedb] hover:bg-[#2a3942] rounded-lg transition-colors duration-200"
              title="More"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
            {menuOpen && (
              <div className="absolute bottom-12 right-0 w-40 bg-[#233138] rounded-md shadow-lg z-50 py-2 border border-[#2a3942]">
                <div className="px-4 py-2 text-xs text-[#8696a0] border-b border-[#2a3942]">
                  More options
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
