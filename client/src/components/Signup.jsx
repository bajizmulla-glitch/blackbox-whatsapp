import React, { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';

const Signup = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // এখানে আমরা শুধু /api ব্যবহার করব যাতে ভেরসেল নিজের সার্ভারকেই চিনে নেয়
  const API_URL = '/api'; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account Created Successfully! Please Sign In.");
        onSwitchToLogin(); 
      } else {
        // সার্ভার থেকে আসা ভুল মেসেজটি দেখাবে
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error("Signup Error:", err);
      setError('সার্ভারের সাথে কানেক্ট করা যাচ্ছে না। আপনার ইন্টারনেট বা ডাটাবেজ চেক করুন।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b141a] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#111b21] p-8 rounded-2xl border border-[#2a3942]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-[#8696a0]">BlackBox Chat-এ যোগ দিন</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8696a0] w-5 h-5" />
              <input
                type="text"
                placeholder="আপনার নাম"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-[#202c33] border border-[#2a3942] text-white rounded-xl pl-10 pr-4 py-3 outline-none focus:border-[#00a884] transition-all"
                required
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8696a0] w-5 h-5" />
              <input
                type="email"
                placeholder="ইমেইল এড্রেস"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-[#202c33] border border-[#2a3942] text-white rounded-xl pl-10 pr-4 py-3 outline-none focus:border-[#00a884] transition-all"
                required
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8696a0] w-5 h-5" />
              <input
                type="password"
                placeholder="পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর)"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-[#202c33] border border-[#2a3942] text-white rounded-xl pl-10 pr-4 py-3 outline-none focus:border-[#00a884] transition-all"
                minLength="6"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00a884] hover:bg-[#06cf9c] text-[#111b21] font-bold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'অ্যাকাউন্ট তৈরি হচ্ছে...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-[#8696a0] text-sm">
            অ্যাকাউন্ট আছে?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-[#00a884] font-semibold hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;