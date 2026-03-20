import React, { useState, useEffect, useRef } from 'react';

const mockContacts = [
  { id: 'c1', name: "Felix", number: "+1 (555) 010-9991", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" },
  { id: 'c2', name: "Mom", number: "+1 (555) 012-3456", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mom" },
  { id: 'c3', name: "Work Team", number: "+1 (555) 019-8765", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Work" },
  { id: 'c4', name: "John Doe", number: "+1 (555) 011-2233", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John" },
  { id: 'c5', name: "Alice", number: "+1 (555) 014-5678", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice" },
  { id: 'c6', name: "Rasel", number: "+1 (555) 015-9988", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rasel" },
  { id: 'c7', name: "Nayem", number: "+1 (555) 016-7766", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nayem" },
  { id: 'c8', name: "Borsa", number: "+1 (555) 017-5544", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Borsa" },
  { id: 'c9', name: "Rahat", number: "+1 (555) 018-3322", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahat" },
  { id: 'c10', name: "Zihan", number: "+1 (555) 019-1100", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zihan" },
  { id: 'c11', name: "Mahin", number: "+1 (555) 020-2211", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mahin" },
  { id: 'c12', name: "Sami", number: "+1 (555) 021-3322", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sami" },
  { id: 'c13', name: "Rifat", number: "+1 (555) 022-4433", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rifat" },
  { id: 'c14', name: "Tania", number: "+1 (555) 023-5544", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tania" },
  { id: 'c15', name: "Nadia", number: "+1 (555) 024-6655", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nadia" },
  { id: 'c16', name: "Karim", number: "+1 (555) 025-7766", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karim" },
  { id: 'c17', name: "Farhan", number: "+1 (555) 026-8877", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Farhan" },
  { id: 'c18', name: "Simi", number: "+1 (555) 027-9988", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Simi" },
  { id: 'c19', name: "Tuhin", number: "+1 (555) 028-0099", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tuhin" },
  { id: 'c20', name: "Lina", number: "+1 (555) 029-1122", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lina" },
  { id: 'c21', name: "Milon", number: "+1 (555) 030-2211", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Milon" },
  { id: 'c22', name: "Parvez", number: "+1 (555) 031-3322", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Parvez" },
  { id: 'c23', name: "Sohag", number: "+1 (555) 032-4433", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sohag" },
  { id: 'c24', name: "Bulbul", number: "+1 (555) 033-5544", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bulbul" },
  { id: 'c25', name: "Shimul", number: "+1 (555) 034-6655", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shimul" },
  { id: 'c26', name: "Sumon", number: "+1 (555) 035-7766", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sumon" },
  { id: 'c27', name: "Sajib", number: "+1 (555) 036-8877", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sajib" },
  { id: 'c28', name: "Biplob", number: "+1 (555) 037-9988", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Biplob" },
  { id: 'c29', name: "Faisal", number: "+1 (555) 038-0099", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Faisal" },
  { id: 'c30', name: "Nabid", number: "+1 (555) 039-1122", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nabid" },
  { id: 'c31', name: "Al-Amin", number: "+1 (555) 040-2233", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlAmin" },
  { id: 'c32', name: "Tanvir", number: "+1 (555) 041-3344", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tanvir" },
  { id: 'c33', name: "Rakib", number: "+1 (555) 042-4455", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rakib" },
  { id: 'c34', name: "Fahim", number: "+1 (555) 043-5566", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fahim" },
  { id: 'c35', name: "Nayeem", number: "+1 (555) 044-6677", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nayeem" },
  { id: 'c36', name: "Imran", number: "+1 (555) 045-7788", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Imran" },
  { id: 'c37', name: "Sabbir", number: "+1 (555) 046-8899", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sabbir" },
  { id: 'c38', name: "Mehedi", number: "+1 (555) 047-9900", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mehedi" },
  { id: 'c39', name: "Tariq", number: "+1 (555) 048-1111", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tariq" },
  { id: 'c40', name: "Masud", number: "+1 (555) 049-2222", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Masud" },
  { id: 'c41', name: "Juel", number: "+1 (555) 050-3333", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juel" },
  { id: 'c42', name: "Akash", number: "+1 (555) 051-4444", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Akash" },
  { id: 'c43', name: "Siam", number: "+1 (555) 052-5555", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siam" },
  { id: 'c44', name: "Rimon", number: "+1 (555) 053-6666", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rimon" },
  { id: 'c45', name: "Emon", number: "+1 (555) 054-7777", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emon" },
  { id: 'c46', name: "Ripon", number: "+1 (555) 055-8888", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ripon" },
  { id: 'c47', name: "Jahid", number: "+1 (555) 056-9999", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jahid" },
  { id: 'c48', name: "Shakil", number: "+1 (555) 057-1122", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shakil" },
  { id: 'c49', name: "Hasan", number: "+1 (555) 058-2233", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hasan" },
  { id: 'c50', name: "Arif", number: "+1 (555) 059-3344", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arif" },
  { id: 'c51', name: "Sohel", number: "+1 (555) 060-4455", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sohel" },
  { id: 'c52', name: "Rana", number: "+1 (555) 061-5566", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rana" },
  { id: 'c53', name: "Titu", number: "+1 (555) 062-6677", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Titu" },
  { id: 'c54', name: "Babu", number: "+1 (555) 063-7788", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Babu" },
  { id: 'c55', name: "Liton", number: "+1 (555) 064-8899", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liton" },
  { id: 'c56', name: "Manik", number: "+1 (555) 065-9900", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Manik" },
  { id: 'c57', name: "Riaz", number: "+1 (555) 066-1111", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Riaz" },
  { id: 'c58', name: "Hannan", number: "+1 (555) 067-2222", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hannan" },
  { id: 'c59', name: "Kaiser", number: "+1 (555) 068-3333", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kaiser" },
  { id: 'c60', name: "Bachchu", number: "+1 (555) 069-4444", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bachchu" },
  { id: 'c61', name: "Pintu", number: "+1 (555) 070-5555", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pintu" },
  { id: 'c62', name: "Mintu", number: "+1 (555) 071-6666", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mintu" },
  { id: 'c63', name: "Shipon", number: "+1 (555) 072-7777", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shipon" },
  { id: 'c64', name: "Sujon", number: "+1 (555) 073-8888", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sujon" },
  { id: 'c65', name: "Helal", number: "+1 (555) 074-9999", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Helal" },
  { id: 'c66', name: "Mizan", number: "+1 (555) 075-1122", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mizan" },
  { id: 'c67', name: "Faruk", number: "+1 (555) 076-2233", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Faruk" },
  { id: 'c68', name: "Anis", number: "+1 (555) 077-3344", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anis" },
  { id: 'c69', name: "Bashar", number: "+1 (555) 078-4455", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bashar" },
  { id: 'c70', name: "Kader", number: "+1 (555) 079-5566", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kader" },
  { id: 'c71', name: "Latif", number: "+1 (555) 080-6677", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Latif" },
  { id: 'c72', name: "Shafiq", number: "+1 (555) 081-7788", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shafiq" },
];

const mockCallLogs = [
  { id: 1, name: "Felix", type: "incoming", status: "missed", time: "Today, 10:30 AM", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" },
  { id: 2, name: "Mom", type: "outgoing", status: "answered", time: "Yesterday, 8:45 PM", duration: "5:23", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mom" },
  { id: 3, name: "Work Team", type: "incoming", status: "answered", time: "Yesterday, 2:00 PM", duration: "12:04", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Work" },
  { id: 4, name: "John Doe", type: "missed", status: "missed", time: "Monday, 9:15 AM", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John" },
  { id: 5, name: "Alice", type: "outgoing", status: "answered", time: "Sunday, 11:20 AM", duration: "2:10", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice" },
  { id: 6, name: "Rahat", type: "incoming", status: "answered", time: "Last Week", duration: "1:30", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahat" },
  { id: 7, name: "Borsa", type: "missed", status: "missed", time: "Last Week", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Borsa" },
  { id: 8, name: "Nayem", type: "outgoing", status: "missed", time: "Last Week", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nayem" },
  { id: 9, name: "Felix", type: "incoming", status: "answered", time: "2 weeks ago", duration: "0:45", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" },
  { id: 10, name: "Mom", type: "incoming", status: "answered", time: "2 weeks ago", duration: "10:00", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mom" },
];

const CallHistory = ({ onBack, currentUser, getDefaultAvatar, onStartChat, onStartCall }) => {
  const [showDialer, setShowDialer] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleDigitClick = (digit) => {
    if (phoneNumber.length < 15) {
      setPhoneNumber(prev => prev + digit);
    }
  };

  const handleBackspace = () => {
    setPhoneNumber(prev => prev.slice(0, -1));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter contacts based on search query
  const filteredContacts = searchQuery 
    ? mockContacts.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.number.includes(searchQuery)
      ) 
    : mockContacts;

  return (
    <div className="flex flex-col h-full w-full bg-[#111b21] text-[#e9edef] relative">
      {/* Header */}
      <div className="h-[70px] py-0 bg-[#202c33] border-b border-[#2a3942] flex items-center px-4 gap-4 flex-shrink-0 sticky top-0 z-10">
        {isSearching ? (
          <div className="flex items-center w-full animate-fade-in gap-3">
            <button 
              onClick={() => { setIsSearching(false); setSearchQuery(''); }}
              className="p-2 rounded-full hover:bg-[#37404a] transition-colors text-[#00a884]"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
              </svg>
            </button>
            <input 
              type="text" 
              autoFocus
              placeholder="Search name or number..." 
              className="bg-[#2a3942] text-[#e9edef] text-base rounded-lg px-4 py-2 w-full focus:outline-none placeholder-[#8696a0]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        ) : (
          <>
            <h2 className="text-[22px] font-bold text-[#e9edef] flex-1">{showDialer ? 'New Call' : 'Calls'}</h2>

            <div className="flex items-center gap-3">
              <button onClick={() => setIsSearching(true)} className="p-2 rounded-full hover:bg-[#37404a] transition-colors duration-200" style={{ background: 'transparent', border: 'none', color: '#aebac1', cursor: 'pointer' }}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.254l.22.22v.635l4.004 3.999 1.194-1.195-3.997-4.009zm-4.808 0A3.605 3.605 0 0 1 6.606 10.2a3.605 3.605 0 0 1 3.605-3.606 3.605 3.605 0 0 1 3.605 3.606 3.605 3.605 0 0 1-3.605 3.605z"></path>
                </svg>
              </button>

              {/* 3-Dot Menu */}
              <div className="relative" ref={menuRef}>
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)} 
                  className={`p-2 rounded-full transition-colors duration-200 ${isMenuOpen ? 'bg-[#37404a]' : 'hover:bg-[#37404a]'}`}
                  style={{ background: isMenuOpen ? '#37404a' : 'transparent', border: 'none', color: '#aebac1', cursor: 'pointer' }}
                >
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path>
                  </svg>
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-[#233138] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.5)] z-50 py-2 border border-[#111b21] overflow-hidden origin-top-right">
                    <button className="w-full text-left px-4 py-2.5 text-[#d1d7db] hover:bg-[#111b21] text-[14.5px] transition-colors cursor-pointer block">
                      Clear call log
                    </button>
                    <button className="w-full text-left px-4 py-2.5 text-[#d1d7db] hover:bg-[#111b21] text-[14.5px] transition-colors cursor-pointer block">
                      Scheduled calls
                    </button>
                  </div>
                )}
              </div>

              {/* Profile Icon */}
              <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-[#6b7c85]">
                <img 
                    src={currentUser?.avatar || (getDefaultAvatar ? getDefaultAvatar(currentUser?.name || 'User') : `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser?.name || 'User')}&background=random&color=fff`)} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                />
              </div>
            </div>
          </>
        )}
      </div>

      {!showDialer ? (
        <>
          {/* Body */}
          {isSearching ? (
            /* Search Results (Contacts) */
            <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
              <div className="text-[#00a884] text-sm font-medium mb-4 px-2 uppercase">Contacts</div>
              <div className="space-y-1">
                {filteredContacts.map(contact => (
                  <div key={contact.id} className="flex items-center gap-4 p-3 hover:bg-[#202c33] rounded-xl cursor-pointer transition-colors group border-b border-[#2a3942]/30 last:border-0">
                    {/* Avatar */}
                    <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full ring-2 ring-[#2a3942] object-cover" />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[#e9edef] font-medium text-[17px] truncate">{contact.name}</h3>
                      <p className="text-[#8696a0] text-sm truncate">{contact.number}</p>
                    </div>
                    
                    {/* Actions: Message & Call */}
                    <div className="flex gap-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); onStartChat && onStartChat(contact); }}
                        className="p-2.5 rounded-full hover:bg-[#2a3942] text-[#00a884] transition-colors"
                        title="Message"
                      >
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                          <path d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821v11.026c0 1.028.641 1.646 1.674 1.646h1.338v5.315l5.465-5.315h7.528c1.032 0 1.674-.618 1.674-1.646V4.821c0-1.032-.641-1.646-1.674-1.646zm-6.4 11.371H7.528l-2.822 2.766v-2.766h-.032a.185.185 0 0 1-.18-.184V4.821c0-.1.08-.184.18-.184h14.332c.1 0 .18.084.18.184v11.026c0 .1-.08.184-.18.184h-6.401zM14 7h-4v3H7v4h3v3h4v-3h3v-4h-3V7z"></path>
                        </svg>
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); onStartCall && onStartCall(contact); }}
                        className="p-2.5 rounded-full hover:bg-[#2a3942] text-[#00a884] transition-colors"
                        title="Voice Call"
                      >
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                          <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.49-5.15-3.8-6.62-6.63l1.97-1.57c.26-.29.35-.69.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3.3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .72-.63.72-1.19v-3.44c0-.54-.45-.99-.99-.99z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
                {filteredContacts.length === 0 && (
                  <div className="p-8 text-center text-[#8696a0]">
                    No contacts found for "{searchQuery}"
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Default Call History View */
            <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
              <div className="text-[#e9edef] text-base font-medium mb-4 px-2">Recent</div>
              <div className="space-y-1">
                {mockCallLogs.map((call) => (
                  <div key={call.id} className="flex items-center gap-4 p-3 hover:bg-[#202c33] rounded-xl cursor-pointer transition-colors group border-b border-[#2a3942]/30 last:border-0">
                    <img src={call.avatar} alt={call.name} className="w-12 h-12 rounded-full ring-2 ring-[#2a3942] object-cover" />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[#e9edef] font-medium text-[17px] truncate">{call.name}</h3>
                      <div className="flex items-center gap-2 text-[14px] text-[#8696a0] mt-0.5">
                        {call.status === 'missed' ? (
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="#f15c6d" className="transform rotate-45"><path d="M16.5 3.5L16.5 16.5L3.5 16.5" fill="none" stroke="currentColor" strokeWidth="2"></path></svg>
                        ) : call.type === 'outgoing' ? (
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="#00a884"><path d="M16.5 3.5L16.5 16.5L3.5 16.5" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(180 10 10)"></path></svg>
                        ) : (
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="#00a884" className="transform rotate-45"><path d="M16.5 3.5L16.5 16.5L3.5 16.5" fill="none" stroke="currentColor" strokeWidth="2"></path></svg>
                        )}
                        <span className="flex items-center gap-1">
                          {call.status === 'missed' ? 'Missed' : call.type === 'outgoing' ? 'Outgoing' : 'Incoming'}
                          {call.duration && <span className="text-[#8696a0]/50 mx-1">• {call.duration}</span>}
                        </span>
                        <span className="text-[#8696a0]/50">•</span>
                        <span>{call.time}</span>
                      </div>
                    </div>

                    <button 
                      onClick={(e) => { e.stopPropagation(); onStartCall && onStartCall(call); }}
                      className="p-3 rounded-full hover:bg-[#2a3942] text-[#00a884] transition-colors"
                      title="Call back"
                    >
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.49-5.15-3.8-6.62-6.63l1.97-1.57c.26-.29.35-.69.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3.3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .72-.63.72-1.19v-3.44c0-.54-.45-.99-.99-.99z"></path></svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Floating Action Button (FAB) for Dialer */}
          <button 
            onClick={() => setShowDialer(true)}
            style={{
              position: 'absolute',
              bottom: '30px',
              right: '30px',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#00a884',
              border: 'none',
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10
            }}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
              <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 12h2v2h-2zm0-4h2v2h-2zm0-4h2v2h-2zm-4 0h2v2h-2z" />
            </svg>
          </button>
        </>
      ) : (
        /* Dialer Interface */
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px', alignItems: 'center' }}>
          {/* Display Number */}
          <div style={{ width: '100%', maxWidth: '300px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', color: 'white', marginBottom: '20px', borderBottom: '1px solid #2a3942' }}>
            {phoneNumber || <span style={{color: '#8696a0', fontSize: '20px'}}>Enter number</span>}
          </div>

          {/* Keypad */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', maxWidth: '300px' }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((item) => (
              <button 
                key={item}
                onClick={() => handleDigitClick(item)}
                style={{ 
                  width: '70px', height: '70px', borderRadius: '50%', backgroundColor: '#202c33', 
                  color: 'white', fontSize: '24px', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2a3942'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#202c33'}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Call Actions */}
          <div style={{ display: 'flex', gap: '30px', marginTop: '30px', alignItems: 'center' }}>
             {/* Backspace Button */}
             <button onClick={handleBackspace} style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'transparent', border: 'none', color: '#8696a0', cursor: 'pointer', fontSize: '20px' }}>
               ⌫
             </button>

             {/* Green Call Button */}
             <button style={{ 
               width: '70px', height: '70px', borderRadius: '50%', backgroundColor: '#00a884', 
               color: 'white', border: 'none', cursor: 'pointer',
               display: 'flex', alignItems: 'center', justifyContent: 'center',
               boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
             }}>
               <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
                 <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.49-5.15-3.8-6.62-6.63l1.97-1.57c.26-.29.35-.69.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3.3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .72-.63.72-1.19v-3.44c0-.54-.45-.99-.99-.99z"></path>
               </svg>
             </button>
             
             {/* Spacer to center call button relative to keypad */}
             <div style={{width: '50px'}}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CallHistory;