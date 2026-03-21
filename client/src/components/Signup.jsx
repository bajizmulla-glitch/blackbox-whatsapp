import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Loader2, ShieldCheck } from 'lucide-react';

const Signup = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) return setError('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের দিন।');
    
    setLoading(true);
    setError('');

    try {
      // লোকাল হোস্ট বাদ দিয়ে এখন রিলেটিভ পাথ ব্যবহার করছি
      const res = await fetch('/api/signup', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Success! Data saved to MongoDB.");
        onSwitchToLogin();
      } else {
        setError(data.message || 'রেজিস্ট্রেশন ব্যর্থ হয়েছে।');
      }
    } catch (err) {
      setError('সার্ভারের সাথে কানেক্ট করা যাচ্ছে না। আপনার ইন্টারনেট বা Vercel সেটিংস চেক করুন।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b141a] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#111b21] p-8 rounded-2xl border border-[#2a3942] shadow-2xl relative">
        <div className="text-center mb-8">
          <ShieldCheck className="text-[#00a884] w-12 h-12 mx-auto mb-2" />
          <h1 className="text-2xl font-bold text-white">Create Account</h1>
          <p className="text-[#8696a0] text-sm">Join BlackBox Securely</p>
        </div>

        {error && <div className="bg-red-500/10 text-red-500 p-3 text-xs mb-4 rounded border-l-4 border-red-500">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8696a0] w-5 h-5" />
            <input type="text" placeholder="Full Name" required className="w-full bg-[#202c33] border border-[#2a3942] text-white rounded-xl pl-11 py-3 focus:border-[#00a884] outline-none" onChange={(e) => setFormData({...formData, name: e.target.value})} />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8696a0] w-5 h-5" />
            <input type="email" placeholder="Email" required className="w-full bg-[#202c33] border border-[#2a3942] text-white rounded-xl pl-11 py-3 focus:border-[#00a884] outline-none" onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8696a0] w-5 h-5" />
            <input type={showPass ? "text" : "password"} placeholder="Password" required className="w-full bg-[#202c33] border border-[#2a3942] text-white rounded-xl pl-11 pr-11 py-3 focus:border-[#00a884] outline-none" onChange={(e) => setFormData({...formData, password: e.target.value})} />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8696a0]">
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-[#00a884] hover:bg-[#06cf9c] text-[#111b21] font-bold py-3.5 rounded-xl transition-all flex items-center justify-center">
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Register in BlackBox'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;