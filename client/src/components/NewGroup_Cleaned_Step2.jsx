import React, { useState } from 'react';
import { ArrowLeft, Camera, Smile, X, Check } from 'lucide-react';

const GroupCreation = ({ selectedMembers, onBack, getDefaultAvatar }) => {
  const [groupName, setGroupName] = useState('');
  const [showIconMenu, setShowIconMenu] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null); // ইমোজি আইকন স্টোর করার জন্য

  const emojis = ['😀', '😂', '❤️', '⭐', '🔥', '🎉', '🌟', '⚡', '💎', '🎨', '🚀', '⚽'];

  const handleCreateGroup = () => {
    if (!groupName.trim()) {
      alert("Please enter a group name");
      return;
    }
    // আপনার এপিআই বা সকেট লজিক এখানে হবে
    const groupData = {
      name: groupName,
      icon: selectedIcon,
      members: selectedMembers.map(m => m.id)
    };
    console.log('Creating Group:', groupData);
    onBack(); // সফল হলে আগের পেজে ফেরত
  };

  return (
    <div className="flex flex-col h-full bg-[#0b141a]">
      
      {/* Step 2 Header */}
      <div className="flex items-center p-4 bg-[#202c33] shadow-md">
        <button onClick={onBack} className="p-2 hover:bg-[#37404a] rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-[#d9dedb]" />
        </button>
        <div className="ml-3">
          <span className="text-lg font-medium text-[#d9dedb] block">New group</span>
          <span className="text-xs text-[#8696a0]">Add subject</span>
        </div>
      </div>

      {/* Step 2 Content */}
      <div className="flex-1 px-6 py-4 overflow-y-auto custom-scrollbar">
        
        {/* Icon & Name Input */}
        <div className="flex items-center bg-[#202c33] rounded-xl p-4 mb-8 gap-4 shadow-inner">
          <div className="relative">
            <button 
              onClick={() => setShowIconMenu(!showIconMenu)}
              className="w-12 h-12 flex items-center justify-center bg-[#37404a] rounded-full text-[#8696a0] hover:bg-[#4a5a65] transition-all text-2xl border-2 border-transparent focus:border-[#00a884]"
            >
              {selectedIcon ? selectedIcon : <Camera className="w-6 h-6" />}
            </button>
          </div>

          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Group subject..."
            className="flex-1 bg-transparent text-[#d9dedb] placeholder-[#8696a0] focus:outline-none text-lg border-b border-transparent focus:border-[#00a884] pb-1 transition-all"
          />
          
          <button className="text-[#8696a0] hover:text-[#00a884]">
            <Smile className="w-6 h-6" />
          </button>
        </div>

        {/* Emoji Selector Popup (Inline or Absolute) */}
        {showIconMenu && (
          <div className="bg-[#202c33] border border-[#2a3942] rounded-xl p-4 mb-6 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-[#8696a0]">Choose an icon</span>
              <button onClick={() => setShowIconMenu(false)}><X size={16} className="text-[#8696a0]"/></button>
            </div>
            <div className="grid grid-cols-6 gap-3">
              {emojis.map(emoji => (
                <button 
                  key={emoji}
                  onClick={() => { setSelectedIcon(emoji); setShowIconMenu(false); }}
                  className="text-2xl p-2 hover:bg-[#2a3942] rounded-lg transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Selected Members Preview */}
        <div className="space-y-4">
          <p className="text-sm font-medium text-[#00a884] uppercase tracking-wider">
            Members: {selectedMembers.length}
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
            {selectedMembers.map(member => (
              <div key={member.id} className="flex flex-col items-center gap-1 group relative">
                <img 
                  src={member.avatar || (getDefaultAvatar ? getDefaultAvatar(member.name) : '')} 
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-transparent group-hover:ring-[#00a884] transition-all"
                  alt=""
                />
                <span className="text-[11px] text-[#8696a0] truncate w-full text-center">
                  {member.name.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Button (FAB) Style Create Button */}
      <div className="p-6 bg-transparent flex justify-end absolute bottom-0 right-0">
        <button 
          onClick={handleCreateGroup}
          disabled={!groupName.trim()}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all transform hover:scale-105 active:scale-95 ${
            groupName.trim() ? 'bg-[#00a884] text-white' : 'bg-[#37404a] text-[#8696a0] cursor-not-allowed'
          }`}
        >
          <Check className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default GroupCreation;