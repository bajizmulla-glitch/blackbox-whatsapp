import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Search, Check, X, Camera, Smile, Image } from 'lucide-react';

const NewGroup = ({ onBack, contacts, getDefaultAvatar }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [isNumberPad, setIsNumberPad] = useState(false);
  const [step, setStep] = useState(1);
  const [showIconMenu, setShowIconMenu] = useState(false);
  const [showPhotoMenu, setShowPhotoMenu] = useState(false);
const popupRef = useRef(null);
  const photoMenuRef = useRef(null);

  console.log('Contacts:', contacts);

  const toggleNumberPad = () => setIsNumberPad(!isNumberPad);

  const filteredContacts = contacts && contacts.length > 0 
    ? contacts.filter(contact => 
        contact.name && contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const toggleMember = (contact) => {
    if (selectedMembers.find(m => m.id === contact.id)) {
      setSelectedMembers(selectedMembers.filter(m => m.id !== contact.id));
    } else {
      setSelectedMembers([...selectedMembers, contact]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowIconMenu(false);
      }
    };
    if (showIconMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showIconMenu]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (photoMenuRef.current && !photoMenuRef.current.contains(event.target)) {
        setShowPhotoMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#0b141a]">
      {step === 1 ? (
        <>
          {/* Step 1 Header */}
          <div className="flex items-center p-3 bg-[#202c33] border-b border-[#2a3942]">
            <button onClick={onBack} className="p-2 hover:bg-[#37404a] rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6 text-[#d9dedb]" />
            </button>
            <span className="ml-3 text-lg font-medium text-[#d9dedb]">New group</span>
          </div>

          {/* Step 1 Search Bar */}
          <div className="p-3 bg-[#202c33]">
            <div className="flex items-center bg-[#2a3942] rounded-lg px-3 py-3">
              <Search className="w-5 h-5 text-[#8696a0]" />
              <input
                type={isNumberPad ? "tel" : "text"}
                placeholder={isNumberPad ? 'Enter phone number...' : 'Search name or number'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 ml-3 bg-transparent text-[#d9dedb] placeholder-[#8696a0] focus:outline-none text-base"
              />
              <button onClick={toggleNumberPad} className="p-1 hover:bg-[#37404a] rounded-full transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[#8696a0]">
                  <circle cx="6" cy="6" r="1.5" />
                  <circle cx="12" cy="6" r="1.5" />
                  <circle cx="18" cy="6" r="1.5" />
                  <circle cx="6" cy="12" r="1.5" />
                  <circle cx="12" cy="12" r="1.5" />
                  <circle cx="18" cy="12" r="1.5" />
                  <circle cx="6" cy="18" r="1.5" />
                  <circle cx="12" cy="18" r="1.5" />
                  <circle cx="18" cy="18" r="1.5" />
                  <circle cx="12" cy="22" r="1.5" />
                </svg>
              </button>
            </div>
          </div>

          {/* Selected Members */}
          {selectedMembers.length > 0 && (
            <div className="px-4 py-3 bg-[#0b141a] border-b border-[#2a3942]">
              <p className="text-xs text-[#8696a0] mb-2">{selectedMembers.length} selected</p>
              <div className="flex flex-wrap gap-3">
                {selectedMembers.map(member => (
                  <div key={member.id} className="flex items-center gap-2 bg-[#005c4b] rounded-full pr-3 pl-1 py-1">
                    <img 
                      src={member.avatar || (getDefaultAvatar ? getDefaultAvatar(member.name) : '')} 
                      alt={member.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm text-[#d9dedb]">{member.name}</span>
                    <button 
                      onClick={() => toggleMember(member)}
                      className="text-[#d9dedb] hover:text-white ml-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact List */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-4 py-3 text-sm text-[#8696a0] bg-[#0b141a] font-medium">
              Frequently contacted
            </div>
            
            {filteredContacts.length === 0 ? (
              <div className="px-4 py-8 text-center text-[#8696a0]">
                <p>No contacts found</p>
                <p className="text-sm mt-2">Search: "{searchTerm}"</p>
                <p className="text-sm mt-2">Total contacts: {contacts ? contacts.length : 0}</p>
              </div>
            ) : (
              filteredContacts.map((contact) => (
                <div 
                  key={contact.id}
                  onClick={() => toggleMember(contact)}
                  className="flex items-center px-4 py-3 hover:bg-[#2a3942] cursor-pointer transition-colors"
                >
                  <div className="relative">
                    <img 
                      src={contact.avatar || (getDefaultAvatar ? getDefaultAvatar(contact.name) : '')} 
                      alt={contact.name}
                      className="w-16 h-16 rounded-full"
                    />
                    {selectedMembers.find(m => m.id === contact.id) && (
                      <div className="absolute inset-0 bg-[#00a884]/50 rounded-full flex items-center justify-center">
                        <Check className="w-7 h-7 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-[#d9dedb] text-lg font-normal">{contact.name}</p>
                  </div>
                  <div className="ml-4">
                    <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${
                      selectedMembers.find(m => m.id === contact.id) 
                        ? 'bg-[#00a884] border-[#00a884]' 
                        : 'border-[#8696a0]'
                    }`}>
                      {selectedMembers.find(m => m.id === contact.id) && (
                        <Check className="w-5 h-5 text-white" />
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* FAB */}
          {selectedMembers.length > 0 && (
            <button 
              onClick={() => setStep(2)}
              className="fixed bottom-6 right-6 w-14 h-14 bg-[#00a884] hover:bg-[#00c853] rounded-full shadow-2xl flex items-center justify-center z-50 transition-all"
            >
              <ArrowRight className="w-6 h-6 text-white" />
            </button>
          )}
        </>
      ) : (
        <div className="flex flex-col h-full">
          {/* Step 2 Header */}
          <div className="flex items-center p-3 bg-[#202c33]">
            <button onClick={() => setStep(1)} className="p-2 hover:bg-[#37404a] rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6 text-[#d9dedb]" />
            </button>
            <span className="ml-3 text-lg font-medium text-[#d9dedb]">New group</span>
          </div>

          {/* Step 2 Content */}
          <div className="flex-1 pt-0 px-4 overflow-y-auto bg-[#0b141a]">
            <div className="flex items-center bg-[#202c33] rounded-lg py-3 pl-4 pr-4 mt-4 gap-3 w-fit min-w-[300px] max-w-[400px]">
              <button 
                type="button"
                onClick={() => setShowPhotoMenu(!showPhotoMenu)}
                className="p-2 bg-[#37404a] rounded-full text-gray-400 hover:bg-[#3a4a55] transition-colors"
              >
                <Camera className="w-5 h-5" />
              </button>
{showPhotoMenu && (
                <div ref={photoMenuRef} className="absolute top-16 left-4 bg-[#202c33] rounded-lg shadow-2xl py-2 z-50 w-40 border border-[#2a3942]">
                  <button 
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#182229] transition-colors text-[#d9dedb]" 
                    onClick={() => document.getElementById('galleryInput').click()}
                  >
                    <Image className="w-5 h-5 text-[#00a884]" /> <span>Gallery</span>
                  </button>
                  <button 
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#182229] transition-colors text-[#d9dedb]" 
                    onClick={() => document.getElementById('cameraInput').click()}
                  >
                    <Camera className="w-5 h-5 text-[#00a884]" /> <span>Camera</span>
                  </button>
                </div>
              )}
              
              <input
                type="text"
                placeholder="Group name (optional)"
                className="flex-1 bg-transparent text-[#d9dedb] placeholder-[#8696a0] focus:outline-none text-base"
              />

              <button 
                type="button"
                onClick={() => setShowIconMenu(!showIconMenu)}
                className="p-2 text-[#8696a0] hover:text-[#aebac1] transition-colors"
              >
                <Smile className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Group Icon Popup */}
{showIconMenu && (
  <div ref={popupRef} className="absolute bottom-16 right-0 bg-[#233138] rounded-xl shadow-2xl p-4 z-50 w-72 border border-[#2a3942]">
    <div className="grid grid-cols-6 gap-2 text-2xl cursor-pointer">
      {['😀','😂','❤️','👍','🔥','🙌','✨','😊','😎','🤔','✅','⭐'].map(emoji => (
        <span key={emoji} className="hover:bg-[#182229] p-2 rounded text-center" onClick={() => {
          /* Logic to add emoji to input later */
          setShowIconMenu(false);
        }}>{emoji}</span>
      ))}
    </div>
  </div>
)}

          {/* Selected Members Preview */}
          {selectedMembers.length > 0 && (
            <div className="mb-6">
              <p className="text-sm text-[#8696a0] mb-3">{selectedMembers.length} members selected</p>
              <div className="flex flex-wrap gap-2">
                {selectedMembers.slice(0, 5).map(member => (
                  <div key={member.id} className="flex items-center gap-2 bg-[#005c4b] rounded-full px-3 py-1">
                    <img 
                      src={member.avatar || (getDefaultAvatar ? getDefaultAvatar(member.name) : '')} 
                      alt={member.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-xs text-[#d9dedb] max-w-[80px] truncate">{member.name}</span>
                  </div>
                ))}
                {selectedMembers.length > 5 && (
                  <div className="bg-[#2a3942] rounded-full px-3 py-1">
                    <span className="text-xs text-[#8696a0]">+{selectedMembers.length - 5} more</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 2 Create Button */}
      {step === 2 && selectedMembers.length > 0 && (
        <div className="p-4 bg-[#0b141a] border-t border-[#2a3942]">
          <button 
            className="w-full bg-[#00a884] hover:bg-[#00c853] text-white py-3.5 rounded-lg font-medium text-lg transition-colors"
            onClick={() => {
              alert(`Creating group with ${selectedMembers.length} members`);
              onBack();
            }}
          >
            Create group
          </button>
        </div>
      )}

  {/* HIDDEN INPUTS FOR MEDIA */}
  <div className="hidden">
    <input 
      type="file" 
      id="cameraInput" 
      accept="image/*" 
      capture="user" 
      onChange={(e) => console.log('Camera photo:', e.target.files[0])} 
    />
    <input 
      type="file" 
      id="galleryInput" 
      accept="image/*" 
      onChange={(e) => console.log('Gallery photo:', e.target.files[0])} 
    />
  </div>
</div>
  );
};

export default NewGroup;
