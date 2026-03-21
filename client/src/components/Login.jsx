import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';

const Login = ({ onLoginSuccess, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // আপনার ভেরসেল ব্যাকএন্ড লিঙ্ক
  const API_URL = 'https://blackbox-chat.vercel.app';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // সফল হলে ইউজারের তথ্য লোকাল স্টোরেজে সেভ হবে
        localStorage.setItem('user', JSON.stringify(data.user));
        onLoginSuccess(data.user);
      } else {
        setError(data.error || 'ইমেইল বা পাসওয়ার্ড ভুল।');
      }
    } catch (err) {
      setError('সার্ভারের সাথে কানেক্ট করা যাচ্ছে না।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b141a] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#111b21] p-8 rounded-2xl border border-[#2a3942] shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-[#00a884] rounded-full flex items-center justify-center text-3xl">
            💬
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">BlackBox Chat</h1>
          <p className="text-[#8696a0]">আপনার অ্যাকাউন্টে লগইন করুন</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-xl mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#8696a0] text-sm mb-2">ইমেইল এড্রেস</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8696a0] w-5 h-5" />
              <input
                type="email"
                placeholder="আপনার ইমেইল"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-[#202c33] border border-[#2a3942] rounded-xl pl-10 pr-4 py-3 text-white outline-none focus:border-[#00a884] transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[#8696a0] text-sm mb-2">পাসওয়ার্ড</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8696a0] w-5 h-5" />
              <input
                type="password"
                placeholder="আপনার পাসওয়ার্ড"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-[#202c33] border border-[#2a3942] rounded-xl pl-10 pr-4 py-3 text-white outline-none focus:border-[#00a884] transition-all"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00a884] hover:bg-[#06cf9c] text-[#111b21] font-bold py-3 rounded-xl transition-all disabled:opacity-50"
          >
            {loading ? 'প্রবেশ করা হচ্ছে...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-[#8696a0] text-sm">
            অ্যাকাউন্ট নেই?{' '}
            <button type="button" onClick={onSwitchToSignup} className="text-[#00a884] font-semibold hover:underline">
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;