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
            <div className="flex items-center bg-[#202c33] rounded-lg py-5 px-4 mt-4 gap-3">
              <button 
                onClick={() => setShowIconMenu(true)}
                className="p-2 bg-[#37404a] rounded-full text-gray-400 hover:bg-[#3a4a55] transition-colors"
              >
                <Camera className="w-5 h-5" />
              </button>
              <input
                type="text"
                placeholder="Group name (optional)"
                className="flex-1 bg-transparent text-[#d9dedb] placeholder-[#8696a0] focus:outline-none text-base"
              />
              <button 
                onClick={() => console.log('Emoji clicked')}
                className="p-2 text-[#8696a0] hover:text-[#aebac1] transition-colors"
              >
                <Smile className="w-5 h-5" />
              </button>
            </div>

            {/* Group Icon Popup */}
            {showIconMenu && (
              <div ref={popupRef} className="fixed bottom-20 left-4 right-4 bg-[#202c33] border border-[#2a3942] rounded-lg p-4 z-50 max-h-96 overflow-y-auto shadow-2xl">
                <div className="flex items-center mb-4">
                  <button 
                    onClick={() => setShowIconMenu(false)}
                    className="p-2 rounded-full hover:bg-[#37404a] mr-3 transition-colors"
                  >
                    <X className="w-5 h-5 text-[#d9dedb]" />
                  </button>
                  <span className="text-lg font-medium text-[#d9dedb]">Group icon</span>
                </div>
                <div className="grid grid-cols-5 gap-2 text-2xl">
                  <button className="p-3 rounded-lg hover:bg-[#2a3942] transition-colors">😀</button>
                  <button className="p-3 rounded-lg hover:bg-[#2a3942] transition-colors">😂</button>
                  <button className="p-3 rounded-lg hover:bg-[#2a3942] transition-colors">❤️</button>
                  <button className="p-3 rounded-lg hover:bg-[#2a3942] transition-colors">⭐</button>
                  <button className="p-3 rounded-lg hover:bg-[#2a3942] transition-colors">🔥</button>
                  <button className="p-3 rounded-lg hover:bg-[#2a3942] transition-colors">🎉</button>
                  <button className="p-3 rounded-lg hover:bg-[#2a3942] transition-colors">🌟</button>
                  <button className="p-3 rounded-lg hover:bg-[#2a3942] transition-colors">⚡</button>
                  <button className="p-3 rounded-lg hover:bg-[#2a3942] transition-colors">💎</button>
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
                      <span className="text-xs text-[#d9dedb] max-w-20 truncate">{member.name}</span>
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

          {/* Step 2 Create Button */}
          {selectedMembers.length > 0 && (
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
        </div>
