import React, { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';

const Signup = ({ onSwitchToLogin, onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // এখানে আমরা ডামি সিমুলেশন করছি, তবে রিয়েল টাইম ডাটা সেভ করছি
      setTimeout(() => {
        const user = {
          name: formData.name,
          email: formData.email,
          id: Date.now() // একটি ইউনিক আইডি জেনারেট করছি
        };

        // ব্রাউজারের মেমোরিতে ডাটা সেভ করা
        localStorage.setItem('user', JSON.stringify(user));
        
        // সফল মেসেজ দেখানো
        alert("Account Created Successfully! Please Sign In.");
        
        // সফল হওয়ার পর লগইন পেজে পাঠিয়ে দেওয়া
        onSwitchToLogin(); 
        
        setLoading(false);
      }, 1500);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center text-3xl">
            👤
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-slate-400">Join BlackBox Chat</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-500 p-3 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-400 text-sm mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-slate-700 border border-slate-600 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 text-sm mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
              <input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-slate-700 border border-slate-600 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 text-sm mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
              <input
                type="password"
                placeholder="Choose a password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-slate-700 border border-slate-600 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                minLength="6"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition-all ${
              loading ? 'bg-slate-600 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-green-400 hover:text-green-300 font-medium"
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