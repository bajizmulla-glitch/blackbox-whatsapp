import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';

// এখানে আপনার Vercel-এর ব্যাকএন্ড বা মেইন সাইটের লিঙ্কটি দিন
const API_URL = 'https://blackbox-whatsapp-ursx.vercel.app'; 

const Login = ({ onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('সবগুলো ঘর পূরণ করুন');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error || 'Login failed');
      } else {
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.reload(); // লগইন সফল হলে পেজ রিলোড হবে
      }
    } catch (err) {
      setError('সার্ভারের সাথে কানেক্ট করা যাচ্ছে না। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b141a] p-4">
      <div className="w-full max-w-md bg-[#111b21] p-8 rounded-2xl border border-[#2a3942]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">BlackBox Chat</h1>
          <p className="text-[#8696a0]">লগইন করে চ্যাট শুরু করুন</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8696a0] w-5 h-5" />
            <input
              type="email"
              placeholder="ইমেইল দিন"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#202c33] border border-[#2a3942] text-white rounded-xl pl-12 pr-4 py-3 outline-none focus:border-[#00a884]"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8696a0] w-5 h-5" />
            <input
              type="password"
              placeholder="পাসওয়ার্ড দিন"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#202c33] border border-[#2a3942] text-white rounded-xl pl-12 pr-4 py-3 outline-none focus:border-[#00a884]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00a884] hover:bg-[#06cf9c] text-[#111b21] font-bold py-3 rounded-xl transition-all disabled:opacity-50"
          >
            {loading ? 'অপেক্ষা করুন...' : 'লগইন করুন'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-[#8696a0] text-sm">
            অ্যাকাউন্ট নেই?{' '}
            <button onClick={onSwitchToSignup} className="text-[#00a884] font-semibold">
              সাইন-আপ করুন
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;