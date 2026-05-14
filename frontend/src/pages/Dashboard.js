import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Bell, Menu, X, Settings, Eye, EyeOff, Download, Send, Plus, CreditCard, Landmark, ShieldCheck, ChevronRight, PieChart as ChartIcon, FileText, ArrowRightLeft, DollarSign, Star, CheckCircle, Printer, FileDown, Search, ArrowUpRight, History, TrendingUp, ShoppingBag, Utensils, Zap as ZapIcon, Car, Clock, ShieldAlert, Shield, BadgeCheck, Lock, Unlock, Smartphone, MapPin, User, Zap, Droplets, Flame, Wifi, Tv, Phone, Receipt } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user: authUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('Accounts');
  const [showBalance, setShowBalance] = useState(true);
  const [modal, setModal] = useState(null); 
  const [balance, setBalance] = useState(authUser?.balance || 254892.50);
  const [customerName, setCustomerName] = useState(authUser?.name || 'RAHUL KUMAR');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(300);
  const [toast, setToast] = useState(null);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [cardFrozen, setCardFrozen] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      setBalance(authUser.balance);
      setCustomerName(authUser.name);
    }
  }, [authUser]);

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
    accountNumber: authUser?.acc || '50100451278964',
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
    <div className="flex-1 space-y-6 animate-pulse p-8">
       <div className="h-64 bg-gray-200 rounded-xl"></div>
       <div className="grid grid-cols-2 gap-6">
          <div className="h-48 bg-gray-200 rounded-xl"></div>
          <div className="h-48 bg-gray-200 rounded-xl"></div>
       </div>
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
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
         <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6 border-b border-gray-50 pb-4 text-[#004a89]">
               <div className="flex items-center gap-2"><TrendingUp size={18} /><h3 className="text-xs font-black uppercase tracking-tight">Spending Profile</h3></div>
            </div>
            <div className="flex items-center gap-8">
               <div className="relative w-24 h-24">
                  <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                    <circle cx="18" cy="18" r="16" fill="none" stroke="#f1f3f6" strokeWidth="4"></circle>
                    <circle cx="18" cy="18" r="16" fill="none" stroke="#004a89" strokeWidth="4" strokeDasharray="60 100"></circle>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col"><p className="text-[10px] font-black text-[#004a89]">60%</p></div>
               </div>
               <div className="flex-1 space-y-2">
                  {[{c:'Shopping', a:'₹12,450'}, {c:'Utilities', a:'₹8,200'}].map((s, i) => (
                    <div key={i} className="flex items-center justify-between text-[9px] font-black text-gray-400 uppercase">
                       <span>{s.c}</span><span className="text-gray-800">{s.a}</span>
                    </div>
                  ))}
               </div>
            </div>
         </div>
         <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4 border-b border-gray-50 pb-4 text-[#004a89]">
               <div className="flex items-center gap-2"><Smartphone size={18} /><h3 className="text-xs font-black uppercase tracking-tight">Mobile Banking</h3></div>
            </div>
            <p className="text-[10px] font-bold text-gray-500 uppercase leading-relaxed">Secure, fast and effortless banking with our mobile application.</p>
            <button className="mt-4 w-full bg-[#f1f3f6] text-[#004a89] py-2 rounded text-[9px] font-black uppercase hover:bg-[#004a89] hover:text-white transition-all">Get App ›</button>
         </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center text-[#004a89]">
          <h2 className="font-black text-sm uppercase tracking-tight">Recent Activity</h2>
          <button className="text-[10px] font-black uppercase hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-[9px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100"><tr ><th className="px-8 py-4">Date</th><th className="px-8 py-4">Description</th><th className="px-8 py-4 text-right">Amount (₹)</th></tr></thead>
            <tbody className="text-[11px] font-bold text-gray-700">
              {transactions.map(tx => (
                <tr key={tx.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-8 py-4 text-gray-400">{tx.date}</td>
                  <td className="px-8 py-4 uppercase tracking-tighter">{tx.desc}</td>
                  <td className={`px-8 py-4 text-right font-black ${tx.type === 'CR' ? 'text-green-600' : 'text-red-500'}`}>
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
          <h2 className="font-black text-2xl uppercase tracking-tighter mb-10 text-[#004a89] flex items-center gap-3"><Receipt size={28} /> Utility Bill Payment</h2>
          <div className="grid md:grid-cols-3 gap-6">
             {billers.map(b => (
               <div key={b.id} onClick={() => showToast(`Connecting to ${b.name}...`)} className="bg-gray-50 border border-gray-100 p-8 rounded-2xl hover:bg-white hover:shadow-xl hover:border-[#004a89] transition-all cursor-pointer text-center flex flex-col items-center">
                  <div className={`${b.bg} ${b.color} p-4 rounded-2xl mb-4 shadow-sm`}><b.icon size={28} /></div>
                  <h4 className="text-gray-900 font-black uppercase text-xs tracking-tighter mb-1">{b.name}</h4>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{b.type}</p>
               </div>
             ))}
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
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Mutual Funds</p>
             <h3 className="text-3xl font-black text-[#004a89] tracking-tighter mb-2">₹4,45,000</h3>
             <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">Growth Profile</p>
          </div>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f4f7f9]" style={{ fontFamily: 'Arial, sans-serif' }}>
      <header className="bg-white border-b border-gray-200 px-8 py-3 sticky top-0 z-[1000] shadow-sm">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-10">
            <div onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer group">
               <div className="w-8 h-8 bg-[#004a89] relative flex items-center justify-center text-white font-black text-xs">H<div className="absolute top-0 right-0 w-2 h-2 bg-red-600"></div></div>
               <div className="flex flex-col"><span className="text-[#004a89] font-black text-xl tracking-tighter leading-none">HOFC BANK</span><span className="text-[9px] font-black text-gray-400 tracking-[0.3em] uppercase">NetBanking</span></div>
            </div>
            <nav className="hidden lg:flex gap-8">
              {tabs.map(tab => (
                <div key={tab} onClick={() => handleTabChange(tab)} className={`text-[11px] font-black uppercase tracking-widest cursor-pointer transition-all relative pb-2 ${activeTab === tab ? 'text-[#004a89]' : 'text-gray-400 hover:text-[#004a89]'}`}>
                  {tab}
                  {activeTab === tab && <div className="absolute bottom-[-14px] left-0 w-full h-[3px] bg-[#ed1c24]"></div>}
                </div>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-6">
            <div className="bg-red-50 px-4 py-1.5 rounded-full flex items-center gap-2 text-red-600 border border-red-100 hidden md:flex">
               <Clock size={14} className="animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-widest">Time Out: {formatTime(timer)}</span>
            </div>
            <button onClick={handleLogout} className="bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 p-2 rounded-full transition-all"><LogOut size={20} /></button>
          </div>
        </div>
      </header>

      <div className="bg-gray-50 border-b border-gray-200 px-8 py-2">
         <div className="max-w-[1400px] mx-auto flex justify-between items-center text-[9px] font-black text-gray-400 uppercase tracking-widest">
            <p>Welcome, <span className="text-[#004a89] font-black">{customerName}</span> | Last Login: {userData.lastLogin}</p>
         </div>
      </div>

      <main className="max-w-[1400px] mx-auto p-8 flex flex-col lg:flex-row gap-8 min-h-[600px]">
         {loading ? <Shimmer /> : (
           <>
            {activeTab === 'Accounts' && renderAccounts()}
            {activeTab === 'BillPay' && renderBillPay()}
            {activeTab === 'Investments' && renderInvestments()}
            {activeTab === 'Cards' && (
              <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm p-10">
                 <h2 className="font-black text-2xl uppercase tracking-tighter mb-10 text-[#004a89] flex items-center gap-3"><CreditCard size={28} /> My Cards</h2>
                 <div className="bg-gradient-to-br from-[#004a89] to-[#001a33] w-full md:w-[450px] h-[260px] rounded-2xl p-10 text-white shadow-2xl flex flex-col justify-between relative overflow-hidden">
                    <div className="flex justify-between items-start"><span className="font-black italic text-xl">HOFC BANK</span><span className="font-bold text-xs opacity-60 uppercase">Millennia</span></div>
                    <p className="font-mono text-2xl tracking-[0.3em]">•••• •••• •••• 4521</p>
                    <div className="flex justify-between items-end"><div className="uppercase"><p className="text-[9px] opacity-40 font-black mb-1">Holder</p><p className="text-sm font-black">{customerName}</p></div><span className="text-4xl italic font-black opacity-30">VISA</span></div>
                 </div>
              </div>
            )}
           </>
         )}
         
         <div className="w-full lg:w-80 space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-center">
               <div className="w-16 h-16 bg-[#004a89] rounded-full flex items-center justify-center text-white font-black text-xl mx-auto mb-4">{customerName.charAt(0)}</div>
               <h3 className="text-sm font-black text-[#004a89] uppercase">{customerName}</h3>
               <p className="text-[9px] text-green-600 font-black uppercase mt-1">Verified Member</p>
            </div>
            <div className="bg-[#004a89] p-6 rounded-xl text-white shadow-xl">
               <h4 className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-4">Quick Links</h4>
               <div className="space-y-4">
                  <button onClick={() => setModal('statement')} className="w-full text-left text-[11px] font-black uppercase flex items-center gap-3 hover:translate-x-1 transition-all"><FileDown size={16} /> Download Statement</button>
                  <button onClick={() => handleTabChange('Cards')} className="w-full text-left text-[11px] font-black uppercase flex items-center gap-3 hover:translate-x-1 transition-all"><CreditCard size={16} /> Manage Cards</button>
               </div>
            </div>
         </div>
      </main>

      {modal === 'statement' && (
           <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[5000] flex items-center justify-center p-6 animate-in fade-in">
              <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden p-10 relative">
                 <button onClick={() => setModal(null)} className="absolute top-6 right-6 text-gray-400 hover:text-black"><X size={24} /></button>
                 <h3 className="text-2xl font-black text-[#004a89] uppercase tracking-tighter mb-8">Account Statement</h3>
                 <p className="text-xs text-gray-500 font-bold mb-10">Your statement for the current period is being generated. Please wait...</p>
                 <button onClick={() => { setModal(null); showToast('Statement Downloaded!'); }} className="w-full bg-[#004a89] text-white py-4 rounded-xl font-black uppercase text-xs tracking-widest">Download PDF</button>
              </div>
           </div>
      )}

      {toast && (
        <div className="fixed bottom-10 right-10 z-[6000] bg-white border-l-8 border-[#004a89] shadow-2xl p-5 flex items-center gap-4 animate-in slide-in-from-bottom-10">
           <CheckCircle className="text-green-600" size={24} />
           <p className="text-xs font-black text-gray-800 uppercase">{toast}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
