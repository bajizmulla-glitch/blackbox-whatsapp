import React, { useState, useEffect, useRef } from 'react';

const CallHistory = ({ onBack, currentUser, contacts = [], onStartChat, onStartCall }) => {
  const [showDialer, setShowDialer] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // ডায়ালারে নাম্বার টাইপ করার লজিক
  const handleDigitClick = (digit) => {
    if (phoneNumber.length < 15) setPhoneNumber(prev => prev + digit);
  };

  const handleBackspace = () => setPhoneNumber(prev => prev.slice(0, -1));

  // মেনুর বাইরের ক্লিক হ্যান্ডেল করা
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setIsMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // কন্টাক্ট ফিল্টারিং (সার্চের জন্য)
  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (c.email && c.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex flex-col h-full w-full bg-[#111b21] text-[#e9edef] relative font-sans">
      
      {/* Header */}
      <div className="h-[70px] bg-[#202c33] border-b border-[#2a3942] flex items-center px-4 gap-4 sticky top-0 z-10">
        {isSearching ? (
          <div className="flex items-center w-full gap-3">
            <button onClick={() => { setIsSearching(false); setSearchQuery(''); }} className="p-2 text-[#00a884]">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg>
            </button>
            <input 
              type="text" autoFocus placeholder="Search contact..." 
              className="bg-[#2a3942] text-[#e9edef] rounded-lg px-4 py-2 w-full focus:outline-none"
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        ) : (
          <>
            <h2 className="text-[22px] font-bold flex-1">{showDialer ? 'New Call' : 'Calls'}</h2>
            <div className="flex items-center gap-3">
              <button onClick={() => setIsSearching(true)} className="p-2 text-[#aebac1] hover:bg-[#37404a] rounded-full">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.254l.22.22v.635l4.004 3.999 1.194-1.195-3.997-4.009zm-4.808 0A3.605 3.605 0 0 1 6.606 10.2a3.605 3.605 0 0 1 3.605-3.606 3.605 3.605 0 0 1 3.605 3.606 3.605 3.605 0 0 1-3.605 3.605z"></path></svg>
              </button>
              
              <div className="relative" ref={menuRef}>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-[#aebac1] hover:bg-[#37404a] rounded-full">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path></svg>
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-[#233138] rounded-lg shadow-xl z-50 py-2 border border-[#111b21]">
                    <button className="w-full text-left px-4 py-2 hover:bg-[#111b21]">Clear Log</button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Main Body */}
      {!showDialer ? (
        <div className="flex-1 overflow-y-auto p-2">
          {filteredContacts.length > 0 ? (
            filteredContacts.map(contact => (
              <div key={contact._id || contact.id} className="flex items-center gap-4 p-3 hover:bg-[#202c33] rounded-xl cursor-pointer border-b border-[#2a3942]/30">
                <div className="w-12 h-12 rounded-full bg-[#6b7c85] flex items-center justify-center text-white font-bold">
                  {contact.name[0]}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{contact.name}</h3>
                  <p className="text-sm text-[#8696a0]">{contact.email || 'No number'}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => onStartCall(contact)} className="p-2 text-[#00a884] hover:bg-[#2a3942] rounded-full">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.49-5.15-3.8-6.62-6.63l1.97-1.57c.26-.29.35-.69.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3.3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .72-.63.72-1.19v-3.44c0-.54-.45-.99-.99-.99z"></path></svg>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center mt-10 text-[#8696a0]">No contacts available</div>
          )}
        </div>
      ) : (
        /* Dialer Section */
        <div className="flex-1 flex flex-col items-center p-6">
          <div className="w-full max-w-[300px] text-center text-3xl text-white mb-8 border-b border-[#2a3942] pb-4 min-h-[60px]">
            {phoneNumber || <span className="text-[#8696a0] text-xl">Enter number</span>}
          </div>
          <div className="grid grid-cols-3 gap-6 mb-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map(num => (
              <button key={num} onClick={() => handleDigitClick(num)} className="w-16 h-16 rounded-full bg-[#202c33] text-2xl hover:bg-[#2a3942] active:bg-[#00a884]">
                {num}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-10">
            <button onClick={handleBackspace} className="text-[#8696a0] text-2xl">⌫</button>
            <button className="w-16 h-16 rounded-full bg-[#00a884] flex items-center justify-center shadow-lg">
              <svg viewBox="0 0 24 24" width="30" height="30" fill="white"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.49-5.15-3.8-6.62-6.63l1.97-1.57c.26-.29.35-.69.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3.3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .72-.63.72-1.19v-3.44c0-.54-.45-.99-.99-.99z"></path></svg>
            </button>
            <button onClick={() => setShowDialer(false)} className="text-red-500 font-bold">Close</button>
          </div>
        </div>
      )}

      {/* FAB - ডায়ালার ওপেন করার বাটন */}
      {!showDialer && (
        <button onClick={() => setShowDialer(true)} className="absolute bottom-8 right-8 w-14 h-14 bg-[#00a884] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" /></svg>
        </button>
      )}
    </div>
  );
};

export default CallHistory;