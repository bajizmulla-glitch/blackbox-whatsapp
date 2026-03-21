import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';

// যদি ফ্রন্টএন্ড ও ব্যাকএন্ড একই ডোমেইনে থাকে, তবে সরাসরি '/api' ব্যবহার করা ভালো
// অন্যথায় আপনার লিঙ্কটি ঠিক আছে
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
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email: email.trim(), password: password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        // পেজ রিলোড হওয়ার আগে সামান্য সময় দেয়া ভালো যাতে স্টেট আপডেট হতে পারে
        window.location.href = '/'; 
      } else {
        // সার্ভার থেকে আসা সঠিক এরর মেসেজ দেখানো
        setError(data.message || data.error || 'লগইন ব্যর্থ হয়েছে! আবার চেষ্টা করুন।');
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError('সার্ভারের সাথে কানেক্ট করা যাচ্ছে না। আপনার ইন্টারনেট চেক করুন।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b141a] p-4">
      <div className="w-full max-w-md bg-[#111b21] p-8 rounded-2xl border border-[#2a3942] shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-[#00a884] mb-2">BlackBox</h1>
          <p className="text-[#8696a0]">আপনার অ্যাকাউন্টে লগইন করুন</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border-l-4 border-red-500 text-red-500 p-3 rounded mb-6 text-sm">
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
              className="w-full bg-[#202c33] border border-[#2a3942] text-white rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-[#00a884] transition-all"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8696a0] w-5 h-5" />
            <input
              type="password"
              placeholder="পাসওয়ার্ড দিন"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#202c33] border border-[#2a3942] text-white rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-[#00a884] transition-all"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#00a884] hover:bg-[#06cf9c] text-[#111b21] font-bold py-3.5 rounded-xl transition-all shadow-lg ${loading ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-[#111b21] border-t-transparent rounded-full animate-spin"></div>
                অপেক্ষা করুন...
              </span>
            ) : 'লগইন করুন'}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-[#2a3942] pt-6">
          <p className="text-[#8696a0] text-sm">
            অ্যাকাউন্ট নেই?{' '}
            <button onClick={onSwitchToSignup} className="text-[#00a884] font-bold hover:underline">
              নতুন অ্যাকাউন্ট খুলুন
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;