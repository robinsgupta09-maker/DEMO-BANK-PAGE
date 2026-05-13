import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, User, ShieldCheck, ArrowRight, Smartphone, RefreshCw, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [step, setStep] = useState('credentials'); // 'credentials' or 'otp'
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    if (!userId || !password) {
      setLoginError('Please enter both User ID and Password');
      return;
    }
    const success = await login(userId, password);
    if (success) {
      setStep('otp'); // Move to OTP step
    } else {
      setLoginError('Invalid User ID or Password. Demo: hdocuser / HOFC@123');
    }
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const finalOtp = otp.join('');
    if (finalOtp === '123456') { // Mock OTP
      navigate('/dashboard');
    } else {
      setOtpError('Invalid OTP. Please enter 123456 for Demo.');
      setOtp(['', '', '', '', '', '']);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f9] flex flex-col" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <header className="bg-white py-4 px-10 border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
           <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-8 h-8 bg-[#004a89] relative flex items-center justify-center text-white font-black text-xs">H<div className="absolute top-0 right-0 w-2 h-2 bg-red-600"></div></div>
              <span className="text-[#004a89] font-black text-xl tracking-tighter uppercase">HOFC BANK</span>
           </div>
           <button onClick={() => navigate('/')} className="text-[#004a89] text-xs font-black uppercase hover:underline">Exit Secure Area</button>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
         {/* Background Decor */}
         <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-50"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-red-50 rounded-full blur-3xl opacity-30"></div>

         <div className="w-full max-w-md bg-white border border-gray-200 shadow-2xl rounded-sm p-10 relative z-10 animate-in fade-in zoom-in duration-500">
            <div className="bg-[#ed1c24] absolute top-0 left-0 right-0 h-1"></div>
            
            {step === 'credentials' ? (
              <div className="space-y-8">
                 <div className="text-center">
                    <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-[#004a89]"><ShieldCheck size={32} /></div>
                    <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">Secure Login</h2>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2 italic">HOFC Bank NetBanking Access</p>
                 </div>

                 {loginError && (
                   <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-600 text-[11px] font-bold animate-in slide-in-from-top-2">
                      {loginError}
                   </div>
                 )}

                 <form onSubmit={handleLoginSubmit} className="space-y-6">
                    <div>
                       <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">User ID / Customer ID</label>
                       <div className="relative group">
                          <User className="absolute left-4 top-3.5 text-gray-300 group-focus-within:text-[#004a89] transition-colors" size={18} />
                          <input 
                            type="text" 
                            value={userId} 
                            onChange={(e) => setUserId(e.target.value)}
                            className="w-full border border-gray-100 bg-gray-50 py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#004a89] focus:bg-white font-bold transition-all"
                            placeholder="Enter Customer ID"
                          />
                       </div>
                    </div>

                    <div>
                       <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">IPIN (Password)</label>
                       <div className="relative group">
                          <Lock className="absolute left-4 top-3.5 text-gray-300 group-focus-within:text-[#004a89] transition-colors" size={18} />
                          <input 
                            type={showPassword ? 'text' : 'password'} 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-100 bg-gray-50 py-3.5 pl-12 pr-12 text-sm focus:outline-none focus:border-[#004a89] focus:bg-white font-bold transition-all"
                            placeholder="Enter IPIN"
                          />
                          <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-3.5 text-gray-300 hover:text-[#004a89]"
                          >
                             {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                       </div>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full bg-[#004a89] text-white py-4 rounded-sm font-black uppercase text-[11px] tracking-[0.3em] shadow-xl hover:bg-blue-800 transition-all flex items-center justify-center gap-2 group"
                    >
                       Continue to Authentication <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                 </form>

                 <div className="pt-8 border-t border-gray-50 flex justify-between items-center text-[9px] font-black text-gray-400 uppercase tracking-widest">
                    <span className="hover:text-[#004a89] cursor-pointer transition-colors">Forgot ID?</span>
                    <span className="hover:text-[#ed1c24] cursor-pointer transition-colors">First Time User?</span>
                 </div>
              </div>
            ) : (
              <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
                 <div className="text-center">
                    <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600"><Smartphone size={32} /></div>
                    <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">Verify Identity</h2>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2 leading-relaxed">WE HAVE SENT A 6-DIGIT OTP TO YOUR <br/>REGISTERED MOBILE ENDING IN •••• 8964</p>
                 </div>

                 {otpError && (
                   <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-600 text-[11px] font-bold text-center">
                      {otpError}
                   </div>
                 )}

                 <form onSubmit={handleOtpSubmit} className="space-y-10">
                    <div className="flex justify-between gap-2">
                       {otp.map((data, index) => (
                         <input
                           key={index}
                           type="text"
                           maxLength="1"
                           value={data}
                           onChange={(e) => handleOtpChange(e.target, index)}
                           onFocus={(e) => e.target.select()}
                           className="w-12 h-14 border-2 border-gray-100 bg-gray-50 text-center text-2xl font-black text-[#004a89] focus:border-[#ed1c24] focus:bg-white outline-none rounded-md transition-all shadow-sm"
                         />
                       ))}
                    </div>

                    <div className="text-center space-y-4">
                       <button 
                         type="submit" 
                         className="w-full bg-[#ed1c24] text-white py-4 rounded-sm font-black uppercase text-[11px] tracking-[0.3em] shadow-xl hover:bg-red-700 transition-all"
                       >
                          Verify & Secure Login
                       </button>
                       <button type="button" className="text-[9px] font-black text-[#004a89] uppercase tracking-widest flex items-center justify-center gap-2 mx-auto hover:underline opacity-60">
                          <RefreshCw size={12} /> Resend OTP in 00:54
                       </button>
                    </div>
                 </form>

                 <button onClick={() => setStep('credentials')} className="w-full text-[9px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-600 flex items-center justify-center gap-1">
                    <X size={12} /> Use different method
                 </button>
              </div>
            )}
         </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-8">
         <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] flex items-center justify-center gap-2 opacity-50"><ShieldCheck size={14} /> 256-Bit SSL Encrypted Secure Session</p>
      </footer>
    </div>
  );
};

export default LoginPage;
