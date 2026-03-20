import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

const AuthWrapper = () => {
  const [view, setView] = useState('login'); // 'login' | 'signup'

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b141a] via-[#111b21] to-[#202c33] flex items-center justify-center p-4">
      {view === 'login' ? (
        <Login onSwitchToSignup={() => setView('signup')} />
      ) : (
        <Signup onSwitchToLogin={() => setView('login')} />
      )}
    </div>
  );
};

export default AuthWrapper;

