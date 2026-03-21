import React, { useState } from 'react';
import Login from '../pages/Login'; // পাথ ঠিক আছে কি না চেক করে নিন
import Signup from '../pages/Signup';

const AuthWrapper = ({ onAuthSuccess }) => {
  const [view, setView] = useState('login'); // 'login' | 'signup'

  return (
    <div className="min-h-screen bg-[#0b141a]">
      {view === 'login' ? (
        <Login 
          onLoginSuccess={onAuthSuccess} 
          onSwitchToSignup={() => setView('signup')} 
        />
      ) : (
        <Signup 
          onSwitchToLogin={() => setView('login')} 
        />
      )}
    </div>
  );
};

export default AuthWrapper;