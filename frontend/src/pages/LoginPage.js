import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    if (!userId || !password) {
      setLoginError('Please enter both User ID and Password');
      return;
    }
    const success = await login(userId, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setLoginError('Invalid User ID or Password. Demo: hdocuser / HOFC@123');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header */}
      <header className="bg-[#004a89] py-4 px-10 shadow-lg">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
           <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-sm">
              <div className="hofc-box"><div className="hofc-box-inner"></div></div>
              <span className="text-[#004a89] font-black text-xl tracking-tighter uppercase">HOFC BANK</span>
           </div>
           <button onClick={() => navigate('/')} className="text-white text-sm font-bold hover:underline">Back to Home</button>
        </div>
      </header>

      {/* Main Login Area */}
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-center gap-20 py-20 px-10">
         {/* Left Side: Info */}
         <div className="hidden lg:block max-w-md">
            <h1 className="text-4xl font-black text-[#004a89] mb-6 uppercase tracking-tighter">Welcome to <br/>Secure NetBanking</h1>
            <p className="text-gray-600 mb-8 font-bold">Manage your accounts, pay bills, and transfer funds with ease using our advanced digital banking platform.</p>
            <div className="space-y-4">
               {['Safe & Secure', '24/7 Access', 'Instant Transfers'].map(i => (
                 <div key={i} className="flex items-center gap-3 text-[#004a89] font-black uppercase text-xs tracking-widest">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div> {i}
                 </div>
               ))}
            </div>
         </div>

         {/* Right Side: Form */}
         <div className="w-full max-w-md bg-white border border-gray-200 shadow-2xl p-8 rounded-sm relative">
            <div className="bg-[#004a89] absolute top-0 left-0 right-0 h-1"></div>
            <h2 className="text-2xl font-black text-gray-800 mb-8 uppercase tracking-tighter">NetBanking Login</h2>
            
            {loginError && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-[12px] font-bold">
                 ⚠️ {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
               <div>
                  <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">User ID / Customer ID</label>
                  <div className="relative">
                     <User className="absolute left-3 top-3 text-gray-400" size={18} />
                     <input 
                       type="text" 
                       value={userId} 
                       onChange={(e) => setUserId(e.target.value)}
                       className="w-full border border-gray-300 py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-[#004a89] font-bold"
                       placeholder="Enter User ID"
                     />
                  </div>
               </div>

               <div>
                  <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">IPIN (Password)</label>
                  <div className="relative">
                     <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                     <input 
                       type={showPassword ? 'text' : 'password'} 
                       value={password} 
                       onChange={(e) => setPassword(e.target.value)}
                       className="w-full border border-gray-300 py-2.5 pl-10 pr-12 text-sm focus:outline-none focus:border-[#004a89] font-bold"
                       placeholder="Enter IPIN"
                     />
                     <button 
                       type="button"
                       onClick={() => setShowPassword(!showPassword)}
                       className="absolute right-3 top-3 text-gray-400 hover:text-[#004a89]"
                     >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                     </button>
                  </div>
               </div>

               <button 
                 type="submit" 
                 disabled={loading}
                 className="w-full bg-[#ed1c24] text-white py-3 rounded-sm font-black uppercase text-xs tracking-widest hover:bg-red-700 transition-colors shadow-lg"
               >
                  {loading ? 'Authenticating...' : 'LOGIN ›'}
               </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
               <p className="text-[10px] font-bold text-gray-400 uppercase mb-4 tracking-widest">Don't have an ID?</p>
               <button className="text-[#004a89] font-black text-xs uppercase hover:underline">Register for NetBanking</button>
            </div>
         </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-10">
         <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">© 2024 HOFC Bank. 256-bit Secure Encryption.</p>
      </footer>
    </div>
  );
};

export default LoginPage;
