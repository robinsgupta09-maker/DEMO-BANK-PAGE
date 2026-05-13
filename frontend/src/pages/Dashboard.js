import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Bell, Menu, X, Settings, Eye, EyeOff, Download, Send, Plus, CreditCard, Landmark, ShieldCheck, ChevronRight, PieChart as ChartIcon, FileText, ArrowRightLeft, DollarSign, Star, CheckCircle, Printer, FileDown, Search, ArrowUpRight, History, TrendingUp, ShoppingBag, Utensils, Zap as ZapIcon, Car, Clock, ShieldAlert, Shield, BadgeCheck, Lock, Unlock, Smartphone, MapPin, User, Zap, Droplets, Flame, Wifi, Tv, Phone, Receipt } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Accounts');
  const [showBalance, setShowBalance] = useState(true);
  const [modal, setModal] = useState(null); 
  const [balance, setBalance] = useState(254892.50);
  const [customerName, setCustomerName] = useState('RAHUL KUMAR');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(300);
  const [toast, setToast] = useState(null);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [cardFrozen, setCardFrozen] = useState(false);
  
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleLogout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  useEffect(() => {
    const saved = localStorage.getItem('hofc_users');
    if (saved) {
      const users = JSON.parse(saved);
      const user = users.find(u => u.userId === 'hdocuser');
      if (user) {
        setBalance(user.balance);
        setCustomerName(user.name);
      }
    }
  }, []);

  const handleTabChange = (tab) => {
    setLoading(true);
    setActiveTab(tab);
    setTimeout(() => setLoading(false), 800);
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const userData = {
    name: customerName,
    accountNumber: '50100451278964',
    accountType: 'Savings Account',
    branch: 'Fort, Mumbai Branch',
    lastLogin: '14 May 2024 | 11:20 AM',
    rewardPoints: '1,240',
    kycStatus: 'Verified'
  };

  const transactions = [
    { id: 1, type: 'CR', desc: 'Salary Credit - Google India', amount: 75000, date: '12 May 2024', status: 'Success', brand: 'google' },
    { id: 2, type: 'DR', desc: 'Amazon Pay / Merchant Payout', amount: 2499, date: '11 May 2024', status: 'Success', brand: 'amazon' },
    { id: 3, type: 'DR', desc: 'ATM Withdrawal - Mumbai 04', amount: 5000, date: '10 May 2024', status: 'Success', brand: 'atm' },
    { id: 4, type: 'CR', desc: 'Interest Credit - Q1 FY24', amount: 1540, date: '01 May 2024', status: 'Success', brand: 'bank' },
  ];

  const billers = [
    { id: 1, name: 'Tata Power', type: 'Electricity', icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { id: 2, name: 'Delhi Jal Board', type: 'Water', icon: Droplets, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 3, name: 'Indane Gas', type: 'Gas', icon: Flame, color: 'text-orange-600', bg: 'bg-orange-50' },
    { id: 4, name: 'Airtel Postpaid', type: 'Mobile', icon: Phone, color: 'text-red-600', bg: 'bg-red-50' },
    { id: 5, name: 'Jio Fiber', type: 'Broadband', icon: Wifi, color: 'text-blue-700', bg: 'bg-blue-50' },
    { id: 6, name: 'Tata Play', type: 'DTH', icon: Tv, color: 'text-pink-600', bg: 'bg-pink-50' },
  ];

  const getBrandLogo = (brand) => {
    switch(brand) {
      case 'google': return <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center border border-gray-100 font-black text-[#4285F4]">G</div>;
      case 'amazon': return <div className="w-8 h-8 rounded-full bg-[#232f3e] shadow-sm flex items-center justify-center text-white font-black text-[10px]">A</div>;
      case 'atm': return <div className="w-8 h-8 rounded-full bg-[#004a89] shadow-sm flex items-center justify-center text-white"><MapPin size={14} /></div>;
      default: return <div className="w-8 h-8 rounded-full bg-gray-50 shadow-sm flex items-center justify-center text-gray-400"><History size={14} /></div>;
    }
  };

  const handleLogout = () => { logout(); navigate('/'); };

  const tabs = ['Accounts', 'Transfers', 'BillPay', 'Cards', 'Loans', 'Investments'];

  const Shimmer = () => (
    <div className="flex-1 space-y-6 animate-pulse">
       <div className="h-64 bg-gray-200 rounded-xl"></div>
       <div className="grid grid-cols-2 gap-6">
          <div className="h-48 bg-gray-200 rounded-xl"></div>
          <div className="h-48 bg-gray-200 rounded-xl"></div>
       </div>
       <div className="h-96 bg-gray-200 rounded-xl"></div>
    </div>
  );

  const renderAccounts = () => (
    <div className="flex-1 space-y-6 animate-in fade-in duration-500">
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden group transition-all hover:shadow-md">
        <div className="bg-gradient-to-r from-[#004a89] to-[#002d5a] p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700"><Landmark size={120} /></div>
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">Savings Account</p>
              <h2 className="text-2xl font-black tracking-tight">{userData.accountNumber}</h2>
              <div className="flex items-center gap-2 mt-1">
                 <p className="text-[11px] font-bold opacity-70 uppercase tracking-tight">{userData.branch}</p>
                 <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                 <p className="text-[11px] font-bold opacity-70 uppercase tracking-tight">HOFB0001278</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-2">Available Balance</p>
              <div className="flex items-center justify-end gap-3">
                <h3 className="text-4xl font-black tracking-tighter">₹ {showBalance ? balance.toLocaleString('en-IN') : '•••••••'}</h3>
                <button onClick={() => setShowBalance(!showBalance)} className="hover:scale-110 transition-transform opacity-60 hover:opacity-100">
                  {showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>
          </div>
          <div className="mt-10 flex gap-4 relative z-10">
            <button onClick={() => handleTabChange('Transfers')} className="bg-white text-[#004a89] px-6 py-2 rounded-md text-[11px] font-black uppercase shadow-lg hover:bg-gray-50 transition-all flex items-center gap-2">Send Money <Send size={14} /></button>
            <button onClick={() => setModal('statement')} className="bg-blue-400/20 text-white border border-white/20 px-6 py-2 rounded-md text-[11px] font-black uppercase hover:bg-white/10 transition-all flex items-center gap-2">View Statement <FileText size={14} /></button>
          </div>
        </div>
        <div className="bg-[#f8f9fa] px-8 py-3 flex justify-between items-center text-[10px] font-black text-gray-500 uppercase tracking-widest">
           <div className="flex gap-8">
             <span className="flex items-center gap-1.5">Rewards: <b className="text-[#004a89] font-black">{userData.rewardPoints}</b> <Star size={10} fill="currentColor" /></span>
             <span className="flex items-center gap-1.5">KYC: <b className="text-green-600 font-black inline-flex items-center gap-1"><BadgeCheck size={12} /> VERIFIED</b></span>
           </div>
           <button onClick={() => setModal('cheque')} className="text-[#004a89] font-black hover:underline">Request Cheque Book ›</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
         <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-6 border-b border-gray-50 pb-4 text-[#004a89]">
               <div className="flex items-center gap-2"><TrendingUp size={18} /><h3 className="text-xs font-black uppercase tracking-tight">Spending Profile</h3></div>
               <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded-sm">Current Month</span>
            </div>
            <div className="flex items-center gap-8">
               <div className="relative w-32 h-32">
                  <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#f1f3f6" strokeWidth="4"></circle>
                    <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#004a89" strokeWidth="4" strokeDasharray="40 100" strokeDashoffset="0"></circle>
                    <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#ed1c24" strokeWidth="4" strokeDasharray="30 100" strokeDashoffset="-40"></circle>
                    <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#ffcc33" strokeWidth="4" strokeDasharray="30 100" strokeDashoffset="-70"></circle>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                     <p className="text-xs font-black text-[#004a89]">₹31.9k</p>
                  </div>
               </div>
               <div className="flex-1 space-y-3">
                  {[{c:'Shopping', a:'12.5k', cl:'#004a89'}, {c:'Food', a:'8.4k', cl:'#ed1c24'}, {c:'Utility', a:'11k', cl:'#ffcc33'}].map((s, i) => (
                    <div key={i} className="flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase">
                       <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.cl }}></div>{s.c}</div>
                       <span className="text-gray-800 font-black">₹{s.a}</span>
                    </div>
                  ))}
               </div>
            </div>
         </div>
         <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 hover:shadow-md transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4 border-b border-gray-50 pb-4 text-[#004a89]">
               <div className="flex items-center gap-2"><Smartphone size={18} /><h3 className="text-xs font-black uppercase tracking-tight">App Exclusives</h3></div>
               <span className="text-[9px] font-black text-red-600 bg-red-50 px-2 py-1 rounded-sm uppercase tracking-widest">Active</span>
            </div>
            <div className="text-center p-4">
               <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center text-[#004a89] mx-auto mb-4 border border-blue-100 shadow-sm"><Smartphone size={20} /></div>
               <p className="text-[11px] font-black text-gray-800 uppercase tracking-tighter">Bank on the go with HOFC App</p>
               <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">Get 5% Cashback on First Login</p>
            </div>
            <button className="w-full bg-[#f1f3f6] text-[#004a89] py-2.5 rounded-lg text-[10px] font-black uppercase hover:bg-[#004a89] hover:text-white transition-all shadow-sm">Download Now ›</button>
         </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center text-[#004a89]">
          <div className="flex items-center gap-2"><History size={18} /><h2 className="font-black text-sm uppercase tracking-tight">Recent Activity</h2></div>
          <button className="text-[11px] font-black uppercase hover:underline">Full Feed ›</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest"><tr className="border-b border-gray-100"><th className="px-8 py-4">Date</th><th className="px-8 py-4">Description</th><th className="px-8 py-4 text-center">Status</th><th className="px-8 py-4 text-right">Amount (₹)</th></tr></thead>
            <tbody className="text-[12px] font-bold text-gray-700">
              {transactions.map(tx => (
                <tr key={tx.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors group">
                  <td className="px-8 py-5 text-gray-400 font-black">{tx.date}</td>
                  <td className="px-8 py-5 flex items-center gap-4 uppercase tracking-tighter">
                     {getBrandLogo(tx.brand)}
                     <div><p className="text-gray-900 font-black">{tx.desc}</p><p className="text-[9px] text-gray-400">TXN: {Math.random().toString(36).toUpperCase().slice(2, 12)}</p></div>
                  </td>
                  <td className="px-8 py-5 text-center"><span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-[9px] font-black uppercase inline-flex items-center gap-1"><CheckCircle size={10} /> {tx.status}</span></td>
                  <td className={`px-8 py-5 text-right font-black ${tx.type === 'CR' ? 'text-green-600' : 'text-red-500'}`}>
                    {tx.type === 'CR' ? '+' : '-'} ₹ {tx.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderBillPay = () => (
    <div className="flex-1 space-y-8 animate-in slide-in-from-right-4 duration-500">
       <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-10">
          <div className="flex justify-between items-center mb-10 border-b border-gray-50 pb-6 text-[#004a89]">
             <h2 className="font-black text-2xl uppercase tracking-tighter flex items-center gap-3"><Receipt size={28} /> Utility Bill Payment</h2>
             <div className="bg-red-50 px-4 py-2 rounded-lg text-red-600 border border-red-100 flex items-center gap-2"><Clock size={16} /> <span className="text-[9px] font-black uppercase tracking-widest">Offers on Bills Live</span></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
             {billers.map(b => (
               <div key={b.id} onClick={() => showToast(`Connecting to ${b.name} Gateway...`)} className="bg-gray-50 border border-gray-100 p-8 rounded-2xl hover:bg-white hover:shadow-xl hover:border-[#004a89] transition-all cursor-pointer group text-center flex flex-col items-center">
                  <div className={`${b.bg} ${b.color} p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform shadow-sm`}><b.icon size={28} /></div>
                  <h4 className="text-gray-900 font-black uppercase text-xs tracking-tighter mb-1">{b.name}</h4>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{b.type}</p>
               </div>
             ))}
          </div>

          <div className="mt-12 bg-blue-50/50 p-8 rounded-2xl border border-blue-100 flex items-center justify-between">
             <div className="flex items-center gap-6">
                <div className="bg-[#004a89] text-white p-4 rounded-xl shadow-lg"><Phone size={24} /></div>
                <div><h4 className="text-[#004a89] font-black uppercase text-sm tracking-tight">Quick Mobile Recharge</h4><p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Recharge any prepaid number instantly</p></div>
             </div>
             <div className="flex gap-4">
                <input type="text" placeholder="MOBILE NUMBER" className="bg-white border border-gray-200 px-6 py-3 rounded-lg text-xs font-black outline-none focus:border-[#004a89] w-64 shadow-sm" />
                <button className="bg-[#004a89] text-white px-8 py-3 rounded-lg text-[10px] font-black uppercase shadow-xl hover:bg-blue-800 transition-all">Proceed ›</button>
             </div>
          </div>
       </div>
    </div>
  );

  const renderInvestments = () => (
    <div className="flex-1 space-y-8 animate-in slide-in-from-right-4 duration-500">
       <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm text-center">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Total Invested</p>
             <h3 className="text-3xl font-black text-[#004a89] tracking-tighter mb-2">₹12,45,000</h3>
             <p className="text-[10px] font-black text-green-600 uppercase tracking-widest flex items-center justify-center gap-1"><TrendingUp size={12} /> +12.4% Profit</p>
          </div>
          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm text-center">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Fixed Deposits</p>
             <h3 className="text-3xl font-black text-red-600 tracking-tighter mb-2">₹8,00,000</h3>
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">3 Active Deposits</p>
          </div>
          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm text-center">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Mutual Funds</p>
             <h3 className="text-3xl font-black text-[#004a89] tracking-tighter mb-2">₹4,45,000</h3>
             <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">Growth Profile</p>
          </div>
       </div>

       <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-10">
          <h3 className="text-[#004a89] font-black text-lg uppercase tracking-tight mb-8 border-b border-gray-50 pb-4">Portfolio Performance</h3>
          <div className="h-64 flex items-end justify-between gap-4 px-10">
             {[60, 45, 80, 55, 90, 70, 85].map((h, i) => (
               <div key={i} className="flex-1 group relative">
                  <div className="bg-blue-100 group-hover:bg-[#004a89] transition-all rounded-t-lg relative" style={{ height: `${h}%` }}>
                     <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 bg-[#004a89] text-white text-[8px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">₹{h}k</div>
                  </div>
                  <p className="text-[8px] font-black text-gray-400 mt-4 uppercase text-center tracking-widest">Month {i+1}</p>
               </div>
             ))}
          </div>
       </div>

       <div className="bg-[#004a89] p-10 rounded-2xl text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-[-40px] right-[-40px] w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="relative z-10">
             <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 leading-tight">Elite Wealth <br/>Management</h3>
             <p className="text-[11px] font-bold opacity-70 uppercase tracking-widest mb-8 max-w-sm">GET A DEDICATED PRIVATE BANKER AND EXCLUSIVE MARKET INSIGHTS TAILORED FOR YOUR PORTFOLIO.</p>
             <button className="bg-white text-[#004a89] px-10 py-3 rounded-lg font-black uppercase text-[10px] tracking-widest shadow-xl hover:bg-red-600 hover:text-white transition-all">Talk to Expert ›</button>
          </div>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f4f7f9]" style={{ fontFamily: 'Arial, sans-serif' }}>
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>

      {toast && (
        <div className="fixed top-24 right-8 z-[6000] bg-white border-l-8 border-[#004a89] shadow-2xl p-4 flex items-center gap-4 animate-in slide-in-from-right-10 border-r border-y border-gray-100">
           <div className="bg-blue-50 p-2 rounded-full text-[#004a89] shadow-sm"><Bell size={20} /></div>
           <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Alert System</p><p className="text-xs font-black text-gray-800 uppercase">{toast}</p></div>
           <button onClick={() => setToast(null)} className="ml-4 hover:bg-gray-100 p-1 rounded-full"><X size={16} /></button>
        </div>
      )}

      <header className="bg-white border-b border-gray-200 px-8 py-3 sticky top-0 z-[1000] shadow-sm">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-10">
            <div onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer group">
               <div className="w-8 h-8 bg-[#004a89] relative flex items-center justify-center text-white font-black text-xs group-hover:scale-105 transition-transform">H<div className="absolute top-0 right-0 w-2 h-2 bg-red-600"></div></div>
               <div className="flex flex-col"><span className="text-[#004a89] font-black text-xl tracking-tighter leading-none">HOFC BANK</span><span className="text-[9px] font-black text-gray-400 tracking-[0.3em] uppercase">NetBanking</span></div>
            </div>
            <nav className="hidden lg:flex gap-8">
              {tabs.map(tab => (
                <div key={tab} onClick={() => handleTabChange(tab)} className={`text-[11px] font-black uppercase tracking-widest cursor-pointer transition-all relative pb-2 ${activeTab === tab || (activeTab === 'BillPay & Recharge' && tab === 'BillPay') ? 'text-[#004a89]' : 'text-gray-400 hover:text-[#004a89]'}`}>
                  {tab}
                  {(activeTab === tab || (activeTab === 'BillPay & Recharge' && tab === 'BillPay')) && <div className="absolute bottom-[-14px] left-0 w-full h-[3px] bg-[#ed1c24] animate-in slide-in-from-left-2 duration-300"></div>}
                </div>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-6">
            <div className="bg-red-50 px-4 py-1.5 rounded-full flex items-center gap-2 text-red-600 border border-red-100 hidden md:flex">
               <Clock size={14} className="animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-widest">Time Out: {formatTime(timer)}</span>
            </div>
            <div className="flex gap-4 border-l border-gray-200 pl-6 items-center">
               <div className="relative cursor-pointer hover:bg-gray-100 p-2 rounded-full transition-all text-gray-400"><Bell size={20} /><div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full border-2 border-white"></div></div>
               <button onClick={handleLogout} className="bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 p-2 rounded-full transition-all"><LogOut size={20} /></button>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-gray-50 border-b border-gray-200 px-8 py-2">
         <div className="max-w-[1400px] mx-auto flex justify-between items-center text-[9px] font-black text-gray-400 uppercase tracking-widest">
            <p>Welcome, <span className="text-[#004a89] font-black">{userData.name}</span> | Last Login: {userData.lastLogin}</p>
            <div className="flex gap-6 items-center">
               <span className="flex items-center gap-1.5 text-green-600 font-bold"><ShieldCheck size={12} /> 256-Bit Secure Session Active</span>
               <span className="text-[#004a89] cursor-pointer hover:underline flex items-center gap-1">Manage Profile <ChevronRight size={12} /></span>
            </div>
         </div>
      </div>

      <main className="max-w-[1400px] mx-auto p-8 flex flex-col lg:flex-row gap-8 min-h-[650px]">
         {loading ? <Shimmer /> : (
           <>
            {activeTab === 'Accounts' && renderAccounts()}
            {activeTab === 'Transfers' && (
               <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm p-10 animate-in slide-in-from-right-4">
                  <div className="flex items-center justify-between mb-8 text-[#004a89]">
                     <h2 className="font-black text-2xl uppercase tracking-tighter flex items-center gap-3"><ArrowRightLeft size={28} /> Instant Fund Transfer</h2>
                     <div className="bg-blue-50 p-2 rounded-lg flex items-center gap-2"><ShieldCheck size={16} /> <span className="text-[9px] font-black uppercase tracking-widest tracking-tighter">SECURE CHANNEL</span></div>
                  </div>
                  <div className="max-w-2xl space-y-8">
                     <div className="bg-[#f8f9fa] p-6 rounded-xl border border-gray-100">
                        <label className="text-[10px] font-black text-gray-400 uppercase mb-3 block tracking-widest">Source Account</label>
                        <p className="text-sm font-black text-[#004a89] uppercase tracking-tighter">Savings Account - {userData.accountNumber}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Avail Balance: ₹ {balance.toLocaleString()}</p>
                     </div>
                     <div className="grid md:grid-cols-2 gap-8">
                        <div><label className="text-[10px] font-black text-gray-400 uppercase mb-3 block tracking-widest">Beneficiary Account</label><input type="text" placeholder="NUMBER" className="w-full border border-gray-100 bg-gray-50 p-4 rounded-lg font-black text-sm outline-none focus:border-[#004a89] shadow-inner" /></div>
                        <div><label className="text-[10px] font-black text-gray-400 uppercase mb-3 block tracking-widest">Bank IFSC Code</label><input type="text" placeholder="HOFB00..." className="w-full border border-gray-100 bg-gray-50 p-4 rounded-lg font-black text-sm outline-none focus:border-[#004a89] shadow-inner" /></div>
                     </div>
                     <div><label className="text-[10px] font-black text-gray-400 uppercase mb-3 block tracking-widest">Transfer Amount (₹)</label><input type="number" placeholder="0.00" className="w-full bg-[#f8f9fa] border-b-4 border-[#004a89] p-6 text-5xl font-black text-[#004a89] outline-none shadow-sm" /></div>
                     <button onClick={() => showToast('Transfer Processed Successfully!')} className="w-full bg-[#ed1c24] text-white py-4 rounded-xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-red-700 transition-all flex items-center justify-center gap-2">Authorize Payment <ArrowUpRight size={18} /></button>
                  </div>
               </div>
            )}
            {activeTab === 'BillPay' && renderBillPay()}
            {activeTab === 'Investments' && renderInvestments()}
            {activeTab === 'Cards' && (
              <div className="flex-1 space-y-8 animate-in slide-in-from-right-4">
                 <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-10">
                    <div className="flex justify-between items-center mb-10 text-[#004a89]">
                       <h2 className="font-black text-2xl uppercase tracking-tighter flex items-center gap-3"><CreditCard size={28} /> Card Management</h2>
                       <div className="flex gap-3">
                          <button onClick={() => { setCardFrozen(!cardFrozen); showToast(cardFrozen ? 'Card Unfrozen' : 'Card Frozen'); }} className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase flex items-center gap-2 transition-all ${cardFrozen ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-blue-50 text-[#004a89] border border-blue-200'}`}>
                             {cardFrozen ? <Unlock size={14} /> : <Lock size={14} />} {cardFrozen ? 'Unfreeze' : 'Freeze Card'}
                          </button>
                       </div>
                    </div>
                    <div className="perspective-1000 w-full md:w-[480px] h-[280px] group cursor-pointer mx-auto md:mx-0" onClick={() => setCardFlipped(!cardFlipped)}>
                       <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${cardFlipped ? 'rotate-y-180' : ''} ${cardFrozen ? 'grayscale opacity-80' : ''}`}>
                          <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-[#004a89] to-[#001a33] p-10 rounded-2xl text-white shadow-2xl flex flex-col justify-between">
                             <div className="flex justify-between items-start uppercase"><span className="font-black italic text-xl">HOFC BANK</span><span className="font-bold text-xs opacity-60">MILLENNIA PLATINUM</span></div>
                             <p className="font-mono text-3xl tracking-[0.3em] mb-4">•••• •••• •••• 4521</p>
                             <div className="flex justify-between items-end uppercase">
                                <div><p className="text-[10px] opacity-40 mb-1 tracking-widest font-black">Holder</p><p className="text-sm font-black tracking-widest">{userData.name}</p></div>
                                <span className="text-4xl italic font-black opacity-40">VISA</span>
                             </div>
                          </div>
                          <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-[#002d5a] to-[#000d1a] rounded-2xl text-white shadow-2xl rotate-y-180 flex flex-col justify-between py-10">
                             <div className="bg-black/40 h-14 w-full mt-4"></div>
                             <div className="px-10"><div className="bg-white/20 h-10 w-48 rounded flex items-center justify-end px-4 font-mono text-lg tracking-widest italic">CVV: 452</div></div>
                             <div className="px-10 flex justify-between items-center opacity-40 text-[9px] font-black uppercase"><span>24/7 Helpline: 1800 202 6161</span><span>HOFCBANK.COM</span></div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            )}
           </>
         )}
         
         <div className="w-full lg:w-80 space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
               <div className="flex items-center gap-3 mb-6 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                  <div className="bg-[#004a89] p-2 rounded-full text-white shadow-lg"><User size={20} /></div>
                  <div>
                     <p className="text-xs font-black text-[#004a89] uppercase tracking-tighter leading-none mb-1">{userData.name}</p>
                     <p className="text-[9px] text-green-600 font-black flex items-center gap-1 uppercase tracking-widest"><BadgeCheck size={12} /> {userData.kycStatus}</p>
                  </div>
               </div>
               <h3 className="text-[#004a89] font-black text-[10px] uppercase mb-6 tracking-[0.2em] border-l-4 border-red-600 pl-3">Smart Tools</h3>
               <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Send, label: 'Transfer', tab: 'Transfers' },
                    { icon: Receipt, label: 'BillPay', tab: 'BillPay' },
                    { icon: History, label: 'Statement', act: () => setModal('statement') },
                    { icon: Star, label: 'Invest', tab: 'Investments' },
                    { icon: CreditCard, label: 'Cards', tab: 'Cards' },
                    { icon: Settings, label: 'Settings' }
                  ].map((item, i) => (
                    <div key={i} onClick={() => { if(item.tab) handleTabChange(item.tab); if(item.act) item.act(); }} className="flex flex-col items-center justify-center p-4 border border-gray-50 hover:bg-blue-50 cursor-pointer transition-all gap-2 rounded-xl group border-2 border-transparent hover:border-blue-100">
                       <div className="bg-gray-100 p-2 rounded-full text-[#004a89] group-hover:bg-[#004a89] group-hover:text-white transition-all"><item.icon size={16} /></div>
                       <span className="text-[9px] font-black text-gray-500 text-center uppercase tracking-tighter group-hover:text-[#004a89]">{item.label}</span>
                    </div>
                  ))}
               </div>
            </div>
            <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm">
               <h3 className="text-[#004a89] font-black text-[10px] uppercase mb-6 tracking-[0.2em] border-l-4 border-green-500 pl-3">Trust Score</h3>
               <div className="text-center py-4">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                     <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90"><circle cx="18" cy="18" r="16" fill="none" stroke="#f1f3f6" strokeWidth="2.5"></circle><circle cx="18" cy="18" r="16" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeDasharray="85 100"></circle></svg>
                     <div className="absolute inset-0 flex items-center justify-center font-black text-green-600 text-lg">85%</div>
                  </div>
                  <p className="text-[10px] font-black text-gray-800 uppercase tracking-widest">High Integrity</p>
                  <p className="text-[8px] text-gray-400 font-bold uppercase mt-1">SECURED BY HOFC VIGIL</p>
               </div>
            </div>
         </div>

         {modal === 'statement' && (
           <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[5000] flex items-center justify-center p-6 uppercase font-black animate-in fade-in duration-300">
              <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
                 <div className="bg-[#004a89] p-6 text-white flex justify-between items-center">
                    <h3 className="text-lg tracking-widest flex items-center gap-2"><FileDown size={24} /> Electronic Statement</h3>
                    <button onClick={() => setModal(null)} className="hover:rotate-90 transition-transform bg-white/10 p-2 rounded-full"><X size={20} /></button>
                 </div>
                 <div className="p-10">
                    <div className="flex justify-between mb-10 text-[10px] text-gray-400 font-black">
                       <div><p className="mb-1 tracking-widest uppercase">Name: <span className="text-[#004a89]">{userData.name}</span></p><p className="tracking-widest uppercase">Account: <span className="text-[#004a89]">{userData.accountNumber}</span></p></div>
                       <div className="flex gap-4"><button className="flex items-center gap-2 text-[#004a89] bg-blue-50 px-6 py-2 rounded-lg hover:bg-blue-100 transition-all tracking-widest"><Printer size={16} /> PRINT</button><button onClick={() => { setModal(null); showToast('Statement Downloaded!'); }} className="flex items-center gap-2 bg-[#004a89] text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-all tracking-widest shadow-xl"><FileDown size={16} /> DOWNLOAD</button></div>
                    </div>
                    <table className="w-full text-left text-[11px] border-collapse">
                       <thead className="bg-gray-50 border-y border-gray-100 text-gray-400"><tr className="font-black"><th className="p-4 tracking-widest">DATE</th><th className="p-4 tracking-widest">DESCRIPTION</th><th className="p-4 text-right tracking-widest">VALUE (₹)</th></tr></thead>
                       <tbody>
                          {transactions.map(t => (
                            <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors font-black"><td className="p-4 text-gray-400">{t.date}</td><td className="p-4 text-gray-700">{t.desc}</td><td className={`p-4 text-right ${t.type === 'CR' ? 'text-green-600' : 'text-red-500'}`}>₹ {t.amount.toLocaleString()}</td></tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
           </div>
         )}
      </main>

      <footer className="max-w-[1440px] mx-auto px-8 py-16 text-center border-t border-gray-200 mt-12 opacity-50">
         <p className="text-[9px] text-gray-400 font-black uppercase tracking-[0.5em] flex items-center justify-center gap-2"><ShieldCheck size={14} /> HOFC BANK DIGITAL SECURE CHANNEL</p>
      </footer>
    </div>
  );
};

export default Dashboard;
