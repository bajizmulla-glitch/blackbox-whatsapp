import React, { useState } from 'react';
// এখানে খেয়াল করুন: আপনার ফাইল যদি 'login.jsx' হয় তবে ছোট হাতের 'login' লিখবেন
import Login from '../pages/Login'; 
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