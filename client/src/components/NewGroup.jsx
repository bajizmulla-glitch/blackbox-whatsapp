import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Search, Check, X, Camera, Smile, Image as ImageIcon } from 'lucide-react';

const NewGroup = ({ onBack, contacts = [], getDefaultAvatar }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [groupName, setGroupName] = useState(''); // গ্রুপ নামের জন্য স্টেট
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [isNumberPad, setIsNumberPad] = useState(false);
  const [step, setStep] = useState(1);
  const [showIconMenu, setShowIconMenu] = useState(false);
  const [showPhotoMenu, setShowPhotoMenu] = useState(false);
  
  const popupRef = useRef(null);
  const photoMenuRef = useRef(null);

  const toggleNumberPad = () => setIsNumberPad(!isNumberPad);

  const filteredContacts = contacts.filter(contact => 
    contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone?.includes(searchTerm)
  );

  const toggleMember = (contact) => {
    setSelectedMembers(prev => 
      prev.find(m => m.id === contact.id)
        ? prev.filter(m => m.id !== contact.id)
        : [...prev, contact]
    );
  };

  // ইমোজি হ্যান্ডলার
  const addEmoji = (emoji) => {
    setGroupName(prev => prev + emoji);
    setShowIconMenu(false);
  };

  // পপআপের বাইরে ক্লিক করলে বন্ধ হওয়ার লজিক
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) setShowIconMenu(false);
      if (photoMenuRef.current && !photoMenuRef.current.contains(event.target)) setShowPhotoMenu(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#0b141a] text-[#d9dedb]">
      {step === 1 ? (
        <>
          {/* Header */}
          <div className="flex items-center p-3 bg-[#202c33]">
            <button onClick={onBack} className="p-2 hover:bg-[#37404a] rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="ml-3">
              <h1 className="text-lg font-medium leading-tight">New group</h1>
              <p className="text-xs text-[#8696a0]">Add members</p>
            </div>
          </div>

          {/* Search */}
          <div className="p-3 bg-[#0b141a]">
            <div className="flex items-center bg-[#202c33] rounded-lg px-4 py-2 border-b border-transparent focus-within:border-[#00a884] transition-all">
              <Search className="w-5 h-5 text-[#8696a0]" />
              <input
                type={isNumberPad ? "tel" : "text"}
                placeholder="Search name or number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 ml-4 bg-transparent focus:outline-none text-sm py-1"
              />
              <button onClick={toggleNumberPad} className="text-[#8696a0] hover:text-[#00a884]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="6" cy="6" r="1.5" /><circle cx="12" cy="6" r="1.5" /><circle cx="18" cy="6" r="1.5" /><circle cx="6" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="18" cy="12" r="1.5" /><circle cx="6" cy="18" r="1.5" /><circle cx="12" cy="18" r="1.5" /><circle cx="18" cy="18" r="1.5" /></svg>
              </button>
            </div>
          </div>

          {/* Selected Preview */}
          {selectedMembers.length > 0 && (
            <div className="px-4 py-2 flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-1">
              {selectedMembers.map(member => (
                <div key={member.id} className="flex items-center gap-1.5 bg-[#202c33] border border-[#2a3942] rounded-full pl-1 pr-2 py-1 group">
                  <img src={member.avatar || getDefaultAvatar(member.name)} className="w-6 h-6 rounded-full" alt="" />
                  <span className="text-xs max-w-[80px] truncate">{member.name}</span>
                  <X size={14} className="cursor-pointer hover:text-red-400" onClick={() => toggleMember(member)} />
                </div>
              ))}
            </div>
          )}

          {/* List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {filteredContacts.map(contact => {
              const isSelected = selectedMembers.find(m => m.id === contact.id);
              return (
                <div key={contact.id} onClick={() => toggleMember(contact)} className="flex items-center px-4 py-3 hover:bg-[#202c33] cursor-pointer group">
                  <div className="relative">
                    <img src={contact.avatar || getDefaultAvatar(contact.name)} className="w-12 h-12 rounded-full" alt="" />
                    {isSelected && (
                      <div className="absolute -bottom-1 -right-1 bg-[#00a884] rounded-full p-1 border-2 border-[#0b141a]">
                        <Check size={12} className="text-white" />
                      </div>
                    )}
                  </div>
                  <div className="ml-4 flex-1 border-b border-[#2a3942]/50 pb-3 group-last:border-none">
                    <p className="text-[#e9edef] font-medium">{contact.name}</p>
                    <p className="text-xs text-[#8696a0]">{contact.status || 'Available'}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* FAB */}
          {selectedMembers.length > 0 && (
            <button onClick={() => setStep(2)} className="fixed bottom-8 right-8 w-14 h-14 bg-[#00a884] rounded-full shadow-xl flex items-center justify-center hover:scale-105 transition-transform animate-in zoom-in">
              <ArrowRight className="text-white" />
            </button>
          )}
        </>
      ) : (
        <div className="flex flex-col h-full">
          {/* Step 2 Header */}
          <div className="flex items-center p-3 bg-[#202c33]">
            <button onClick={() => setStep(1)} className="p-2 hover:bg-[#37404a] rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <span className="ml-3 text-lg font-medium">New group</span>
          </div>

          <div className="flex-1 p-6 bg-[#0b141a]">
            {/* Group Subject Area */}
            <div className="flex items-center gap-4 bg-[#202c33] p-4 rounded-xl relative shadow-lg">
              <div className="relative">
                <button 
                  onClick={() => setShowPhotoMenu(!showPhotoMenu)}
                  className="w-12 h-12 bg-[#37404a] rounded-full flex items-center justify-center text-[#8696a0] hover:text-[#d1d7db]"
                >
                  <Camera size={24} />
                </button>
                {showPhotoMenu && (
                  <div ref={photoMenuRef} className="absolute top-14 left-0 bg-[#233138] border border-[#2a3942] rounded-lg py-2 w-40 z-50 shadow-2xl">
                    <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-[#182229]" onClick={() => document.getElementById('galleryInput').click()}>
                      <ImageIcon size={18} className="text-[#00a884]" /> Gallery
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-[#182229]" onClick={() => document.getElementById('cameraInput').click()}>
                      <Camera size={18} className="text-[#00a884]" /> Camera
                    </button>
                  </div>
                )}
              </div>

              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Group name (optional)"
                className="flex-1 bg-transparent border-b border-[#00a884] pb-1 focus:outline-none text-lg"
              />

              <button onClick={() => setShowIconMenu(!showIconMenu)} className="text-[#8696a0] hover:text-[#00a884]">
                <Smile size={24} />
              </button>

              {/* Emoji Menu */}
              {showIconMenu && (
                <div ref={popupRef} className="absolute top-16 right-0 bg-[#233138] border border-[#2a3942] rounded-xl p-3 grid grid-cols-6 gap-2 z-50 shadow-2xl">
                  {['😀','😂','❤️','🔥','👍','✨','🎉','🚀','✅','⭐'].map(emoji => (
                    <span key={emoji} className="text-xl p-1 hover:bg-[#182229] rounded cursor-pointer" onClick={() => addEmoji(emoji)}>{emoji}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Members Mini Grid */}
            <div className="mt-8">
              <p className="text-sm text-[#8696a0] mb-4">Participants: {selectedMembers.length}</p>
              <div className="grid grid-cols-4 gap-4">
                {selectedMembers.map(m => (
                  <div key={m.id} className="flex flex-col items-center gap-1">
                    <img src={m.avatar || getDefaultAvatar(m.name)} className="w-14 h-14 rounded-full" alt="" />
                    <span className="text-[10px] text-[#8696a0] truncate w-full text-center">{m.name.split(' ')[0]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Create Button */}
          <div className="p-6 bg-[#0b141a]">
            <button 
              className={`w-full py-3 rounded-lg font-bold transition-all ${groupName.trim() ? 'bg-[#00a884] text-white hover:bg-[#06cf9c]' : 'bg-[#37404a] text-[#8696a0] cursor-not-allowed'}`}
              onClick={() => groupName.trim() && alert(`Group "${groupName}" Created!`)}
            >
              CREATE GROUP
            </button>
          </div>
        </div>
      )}

      {/* Inputs */}
      <input type="file" id="cameraInput" hidden accept="image/*" capture="user" />
      <input type="file" id="galleryInput" hidden accept="image/*" />
    </div>
  );
};

export default NewGroup;