import React, { useState } from 'react';
import { Mail, Lock, User, CheckCircle } from 'lucide-react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill all fields');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Store user
    localStorage.setItem('user', JSON.stringify({ name, email }));
    setSuccess(true);
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0b141a] via-[#111b21] to-[#202c33] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#111b21]/90 backdrop-blur-xl rounded-3xl border border-[#2a3942]/50 shadow-2xl p-10 text-center">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-[#00a884] to-[#25d366] rounded-2xl flex items-center justify-center mb-6 shadow-2xl">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-black text-white mb-4">Account Created!</h1>
            <p className="text-[#8696a0] text-lg">Redirecting to BlackBox Chat...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b141a] via-[#111b21] to-[#202c33] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#111b21]/90 backdrop-blur-xl rounded-3xl border border-[#2a3942]/50 shadow-2xl p-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="mb-6 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00a884]/30 to-[#25d366]/30 rounded-full opacity-50 blur transition duration-500"></div>
            <div className="h-20 w-20 mx-auto bg-gradient-to-r from-[#00a884] to-[#25d366] rounded-full flex items-center justify-center relative z-10 shadow-2xl">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17l-.59.59-.58.58V4h16v12z"/>
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-[#00a884] to-[#25d366] bg-clip-text text-transparent mb-2 tracking-tight">
            BlackBox Chat
          </h1>
          <p className="text-[#8696a0] text-lg">Create your account</p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-400 p-4 rounded-2xl mb-6 text-sm backdrop-blur-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8696a0] w-5 h-5" />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#202c33] border border-[#2a3942] rounded-2xl pl-12 pr-4 py-4 text-[#e9edef] placeholder-[#8696a0] focus:outline-none focus:border-[#00a884] focus:ring-2 focus:ring-[#00a884]/30 transition-all duration-300 text-base"
              required
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8696a0] w-5 h-5" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#202c33] border border-[#2a3942] rounded-2xl pl-12 pr-4 py-4 text-[#e9edef] placeholder-[#8696a0] focus:outline-none focus:border-[#00a884] focus:ring-2 focus:ring-[#00a884]/30 transition-all duration-300 text-base"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8696a0] w-5 h-5" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#202c33] border border-[#2a3942] rounded-2xl pl-12 pr-4 py-4 text-[#e9edef] placeholder-[#8696a0] focus:outline-none focus:border-[#00a884] focus:ring-2 focus:ring-[#00a884]/30 transition-all duration-300 text-base"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8696a0] w-5 h-5" />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-[#202c33] border border-[#2a3942] rounded-2xl pl-12 pr-4 py-4 text-[#e9edef] placeholder-[#8696a0] focus:outline-none focus:border-[#00a884] focus:ring-2 focus:ring-[#00a884]/30 transition-all duration-300 text-base"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#00a884] to-[#25d366] hover:from-[#008c6d] hover:to-[#1ebb7f] text-white font-semibold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-lg backdrop-blur-sm"
          >
            Create Account
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[#8696a0] text-sm">
            Already have an account?{' '}
            <a href="/login" onClick={(e) => {
              e.preventDefault();
              window.location.href = '#login';
            }} className="text-[#00a884] hover:text-[#25d366] font-semibold cursor-pointer">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

