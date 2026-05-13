import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, User, AlertCircle, ArrowRight } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // --- MOCK ADMIN LOGIN LOGIC ---
    setTimeout(() => {
      if (username === 'admin' && password === 'Admin@HDOC') {
        localStorage.setItem('admin_token', 'mock_admin_token_123');
        localStorage.setItem('admin_id', 'admin_001');
        navigate('/admin');
      } else {
        setError('Invalid Admin Credentials. Please check Username/Password.');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center p-6" style={{ fontFamily: 'Arial, sans-serif' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="bg-[#ed1c24] w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-red-500/20">
            <ShieldCheck className="text-white" size={32} />
          </div>
          <h1 className="text-white text-2xl font-black uppercase tracking-[0.2em]">Administrator Access</h1>
          <p className="text-gray-500 text-[10px] font-bold mt-2 uppercase tracking-widest italic">HOFC Bank Secure Management Console</p>
        </div>

        <div className="bg-white p-10 rounded-sm shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#ed1c24]"></div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-100 p-4 rounded-sm flex items-center gap-3 text-red-600 animate-pulse">
                <AlertCircle size={18} />
                <span className="text-[10px] font-black uppercase tracking-tighter">{error}</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Admin Username</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 text-gray-300" size={18} />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border border-gray-200 py-4 pl-12 pr-4 text-sm font-bold uppercase tracking-tight outline-none focus:border-[#ed1c24] rounded-sm transition-all"
                    placeholder="Enter Username"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Secure Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 text-gray-300" size={18} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-200 py-4 pl-12 pr-4 text-sm font-bold outline-none focus:border-[#ed1c24] rounded-sm transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0a0c10] text-white py-4 rounded-sm font-black uppercase text-[11px] tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-black transition-all shadow-xl group"
            >
              {loading ? 'Authorizing...' : 'Authorize Access'} 
              {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100 flex justify-between items-center text-[9px] font-black text-gray-400 uppercase tracking-tighter">
            <span>v4.2.0-STABLE</span>
            <span className="flex items-center gap-1"><Lock size={10} /> 256-BIT ENCRYPTION</span>
          </div>
        </div>

        <button 
          onClick={() => navigate('/')}
          className="mt-8 w-full text-center text-gray-600 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors"
        >
          ‹ Exit Secure Portal
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
