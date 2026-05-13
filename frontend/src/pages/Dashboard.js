import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Bell, Menu, X, Settings, Eye, EyeOff, Download, Send, Plus, CreditCard, Landmark, ShieldCheck, ChevronRight, PieChart as ChartIcon, FileText, ArrowRightLeft, DollarSign, Star, CheckCircle, Printer, FileDown, Search, ArrowUpRight, History } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Accounts');
  const [showBalance, setShowBalance] = useState(true);
  const [modal, setModal] = useState(null); 
  const [balance, setBalance] = useState(254892.50);
  const [customerName, setCustomerName] = useState('RAHUL KUMAR'); // State for Name
  const { logout } = useAuth();
  const navigate = useNavigate();

  // --- FETCH FRESH DATA ON MOUNT ---
  useEffect(() => {
    const saved = localStorage.getItem('hofc_users');
    if (saved) {
      const users = JSON.parse(saved);
      const user = users.find(u => u.userId === 'hdocuser');
      if (user) {
        setBalance(user.balance);
        setCustomerName(user.name); // Set the updated name
      }
    }
  }, []);

  const userData = {
    name: customerName, // Use state name
    accountNumber: '50100451278964',
    accountType: 'Savings Account',
    branch: 'Fort, Mumbai Branch',
    lastLogin: '13 May 2024 | 10:31 PM',
    rewardPoints: '1,240'
  };

  const transactions = [
    { id: 1, type: 'CR', desc: 'Salary Credit - Google India', amount: 75000, date: '12 May 2024', status: 'Success' },
    { id: 2, type: 'DR', desc: 'UPI / Amazon Pay / Merchant', amount: 2499, date: '11 May 2024', status: 'Success' },
    { id: 3, type: 'DR', desc: 'ATM Withdrawal - Mumbai 04', amount: 5000, date: '10 May 2024', status: 'Success' },
    { id: 4, type: 'CR', desc: 'Interest Credit - Q1 FY24', amount: 1540, date: '01 May 2024', status: 'Success' },
  ];

  const handleLogout = () => { logout(); navigate('/'); };

  const tabs = ['Accounts', 'Transfers', 'BillPay', 'Cards', 'Loans', 'Investments'];

  const renderAccounts = () => (
    <div className="flex-1 space-y-6 animate-in fade-in duration-500">
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-[#004a89] to-[#002d5a] p-8 text-white relative">
          <div className="absolute top-0 right-0 p-8 opacity-10"><Landmark size={120} /></div>
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">Savings Account</p>
              <h2 className="text-2xl font-black tracking-tight">{userData.accountNumber}</h2>
              <p className="text-[11px] font-bold opacity-70 mt-1 uppercase tracking-tight">{userData.branch}</p>
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
            <button onClick={() => setActiveTab('Transfers')} className="bg-white text-[#004a89] px-6 py-2 rounded-md text-[11px] font-black uppercase shadow-lg hover:bg-gray-50 transition-all flex items-center gap-2">Send Money <Send size={14} /></button>
            <button onClick={() => setModal('statement')} className="bg-blue-400/20 text-white border border-white/20 px-6 py-2 rounded-md text-[11px] font-black uppercase hover:bg-white/10 transition-all flex items-center gap-2">View Statement <FileText size={14} /></button>
          </div>
        </div>
        <div className="bg-[#f8f9fa] px-8 py-3 flex justify-between items-center text-[10px] font-black text-gray-500 uppercase tracking-widest">
           <div className="flex gap-8">
             <span>Reward Points: <b className="text-[#004a89]">{userData.rewardPoints}</b></span>
             <span>Status: <b className="text-green-600">Active</b></span>
           </div>
           <button onClick={() => setModal('cheque')} className="text-[#004a89] hover:underline">Request Cheque Book ›</button>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <div className="flex items-center gap-2"><History className="text-[#004a89]" size={18} /><h2 className="text-[#004a89] font-black text-sm uppercase tracking-tight">Recent Transactions</h2></div>
          <button className="text-[11px] font-black text-[#004a89] flex items-center gap-1 hover:underline uppercase">View All Activity <ChevronRight size={14} /></button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest"><th className="px-8 py-4">Date</th><th className="px-8 py-4">Description</th><th className="px-8 py-4">Status</th><th className="px-8 py-4 text-right">Amount (₹)</th></tr>
            </thead>
            <tbody className="text-[12px] font-bold text-gray-700">
              {transactions.map(tx => (
                <tr key={tx.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors group">
                  <td className="px-8 py-5 text-gray-400 group-hover:text-gray-600">{tx.date}</td>
                  <td className="px-8 py-5 uppercase tracking-tighter">{tx.desc}</td>
                  <td className="px-8 py-5"><span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-[9px] font-black uppercase">{tx.status}</span></td>
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

  return (
    <div className="min-h-screen bg-[#f1f3f6]" style={{ fontFamily: 'Arial, sans-serif' }}>
      <header className="bg-white border-b border-gray-200 px-8 py-3 sticky top-0 z-[1000] shadow-sm">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-10">
            <div onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer group">
               <div className="w-8 h-8 bg-[#004a89] relative flex items-center justify-center text-white font-black text-xs group-hover:scale-105 transition-transform">H<div className="absolute top-0 right-0 w-2 h-2 bg-red-600"></div></div>
               <div className="flex flex-col"><span className="text-[#004a89] font-black text-xl tracking-tighter leading-none">HOFC BANK</span><span className="text-[9px] font-black text-gray-400 tracking-[0.3em] uppercase">NetBanking</span></div>
            </div>
            <nav className="hidden lg:flex gap-8">
              {tabs.map(tab => (
                <div 
                  key={tab} 
                  onClick={() => setActiveTab(tab === 'BillPay' ? 'BillPay & Recharge' : tab)}
                  className={`text-[11px] font-black uppercase tracking-widest cursor-pointer transition-all relative pb-2 ${activeTab.includes(tab) ? 'text-[#004a89]' : 'text-gray-400 hover:text-[#004a89]'}`}
                >
                  {tab}
                  {activeTab.includes(tab) && <div className="absolute bottom-[-14px] left-0 w-full h-[3px] bg-[#ed1c24]"></div>}
                </div>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right hidden md:block">
               <p className="text-[10px] text-gray-400 font-black uppercase">Welcome Back</p>
               <p className="text-xs font-black text-[#004a89] uppercase tracking-tighter">{userData.name}</p>
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
            <p>Last Login: {userData.lastLogin}</p>
            <div className="flex gap-6 items-center">
               <span className="flex items-center gap-1.5 text-green-600"><ShieldCheck size={12} /> Secure Connection Established</span>
               <span className="text-[#004a89] cursor-pointer hover:underline flex items-center gap-1">Manage Profile <ChevronRight size={12} /></span>
            </div>
         </div>
      </div>

      <main className="max-w-[1400px] mx-auto p-8 flex flex-col lg:flex-row gap-8">
         {activeTab === 'Accounts' && renderAccounts()}
         {activeTab === 'Transfers' && (
            <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm p-10 animate-in slide-in-from-right-4">
               <h2 className="text-[#004a89] font-black text-2xl uppercase tracking-tighter mb-8 flex items-center gap-3"><ArrowRightLeft size={28} /> Fund Transfer</h2>
               <div className="max-w-2xl space-y-8">
                  <div><label className="text-[10px] font-black text-gray-400 uppercase mb-3 block">Debit From</label><select className="w-full border border-gray-100 bg-gray-50 p-4 rounded-lg font-black text-[#004a89] text-sm outline-none focus:border-[#004a89]"><option>{userData.accountNumber} - ₹ {balance.toLocaleString()}</option></select></div>
                  <div className="grid md:grid-cols-2 gap-8">
                     <div><label className="text-[10px] font-black text-gray-400 uppercase mb-3 block">To Beneficiary Account</label><input type="text" placeholder="ACCOUNT NUMBER" className="w-full border border-gray-100 bg-gray-50 p-4 rounded-lg font-black text-sm outline-none focus:border-[#004a89]" /></div>
                     <div><label className="text-[10px] font-black text-gray-400 uppercase mb-3 block">IFSC Code</label><input type="text" placeholder="IFSC CODE" className="w-full border border-gray-100 bg-gray-50 p-4 rounded-lg font-black text-sm outline-none focus:border-[#004a89]" /></div>
                  </div>
                  <div><label className="text-[10px] font-black text-gray-400 uppercase mb-3 block">Transfer Amount (₹)</label><input type="number" placeholder="0.00" className="w-full border-b-4 border-[#004a89] p-4 text-4xl font-black text-[#004a89] outline-none" /></div>
                  <button className="bg-[#ed1c24] text-white px-16 py-4 rounded-lg font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-red-700 transition-all flex items-center gap-2">Authorize Transfer <ArrowUpRight size={18} /></button>
               </div>
            </div>
         )}
         {activeTab === 'Cards' && (
           <div className="flex-1 space-y-6">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-10">
                 <h2 className="text-[#004a89] font-black text-2xl uppercase tracking-tighter mb-10 flex items-center gap-3"><CreditCard size={28} /> My Cards</h2>
                 <div className="bg-gradient-to-br from-[#004a89] to-[#001a33] p-10 rounded-2xl text-white shadow-2xl w-full md:w-[480px] relative overflow-hidden group transition-all hover:scale-[1.02]">
                    <div className="absolute top-[-40px] right-[-40px] w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                    <div className="flex justify-between items-start mb-16 uppercase"><span className="font-black italic text-xl">HOFC BANK</span><span className="font-bold text-xs opacity-60">MILLENNIA PLATINUM</span></div>
                    <p className="font-mono text-3xl tracking-[0.3em] mb-12">•••• •••• •••• 4521</p>
                    <div className="flex justify-between uppercase text-[10px] font-black opacity-80"><div><p className="opacity-40 mb-1">Card Holder</p><p className="text-sm opacity-100">{userData.name}</p></div><div><p className="opacity-40 mb-1">Expires</p><p className="text-sm opacity-100">12/28</p></div><span className="text-3xl italic opacity-100 self-end">VISA</span></div>
                 </div>
              </div>
           </div>
         )}
         
         <div className="w-full lg:w-80 space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
               <h3 className="text-[#004a89] font-black text-[10px] uppercase mb-6 tracking-[0.2em] border-l-4 border-red-600 pl-3">Quick Actions</h3>
               <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Send, label: 'Transfer', tab: 'Transfers' },
                    { icon: CreditCard, label: 'Cards', tab: 'Cards' },
                    { icon: History, label: 'Statement', act: () => setModal('statement') },
                    { icon: Landmark, label: 'Add FD' },
                    { icon: ShieldCheck, label: 'Limits' },
                    { icon: Settings, label: 'Settings' }
                  ].map((item, i) => (
                    <div key={i} onClick={() => { if(item.tab) setActiveTab(item.tab); if(item.act) item.act(); }} className="flex flex-col items-center justify-center p-4 border border-gray-50 hover:bg-blue-50 cursor-pointer transition-all gap-2 rounded-xl group border-2 border-transparent hover:border-blue-100">
                       <div className="bg-gray-100 p-2 rounded-full text-[#004a89] group-hover:bg-[#004a89] group-hover:text-white transition-all"><item.icon size={16} /></div>
                       <span className="text-[9px] font-black text-gray-500 text-center uppercase tracking-tighter group-hover:text-[#004a89]">{item.label}</span>
                    </div>
                  ))}
               </div>
            </div>
            <div className="bg-[#ed1c24] p-8 text-white rounded-xl shadow-xl relative overflow-hidden group cursor-pointer transition-all hover:scale-[1.02]">
               <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-all duration-700"></div>
               <h4 className="text-xl font-black uppercase mb-2 tracking-tighter leading-tight relative z-10">Premium <br/>Credit Cards</h4>
               <p className="text-[10px] font-bold text-white/70 uppercase mb-8 tracking-widest relative z-10">Pre-approved for you!</p>
               <button className="bg-white text-red-600 px-6 py-2 rounded-md text-[10px] font-black uppercase shadow-lg relative z-10">Check Eligibility</button>
            </div>
         </div>

         {modal === 'statement' && (
           <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[5000] flex items-center justify-center p-6 uppercase font-black animate-in fade-in duration-300">
              <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
                 <div className="bg-[#004a89] p-6 text-white flex justify-between items-center">
                    <h3 className="text-lg tracking-widest">Digital Account Statement</h3>
                    <button onClick={() => setModal(null)} className="hover:rotate-90 transition-transform bg-white/10 p-2 rounded-full"><X size={20} /></button>
                 </div>
                 <div className="p-10">
                    <div className="flex justify-between mb-10 text-[10px] text-gray-400">
                       <div><p className="mb-1">ACC: {userData.accountNumber}</p><p>HOLDER: {userData.name}</p></div>
                       <div className="flex gap-4"><button className="flex items-center gap-2 text-[#004a89] bg-blue-50 px-4 py-2 rounded-md hover:bg-blue-100 transition-all"><Printer size={16} /> PRINT</button><button className="flex items-center gap-2 bg-[#004a89] text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-all"><FileDown size={16} /> EXPORT PDF</button></div>
                    </div>
                    <table className="w-full text-left text-[11px] border-collapse">
                       <thead><tr className="bg-gray-50 border-y border-gray-100"><th className="p-4">DATE</th><th className="p-4">PARTICULARS</th><th className="p-4">DEBIT</th><th className="p-4">CREDIT</th><th className="p-4 text-right">BALANCE</th></tr></thead>
                       <tbody>
                          {transactions.map(t => (
                            <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors"><td className="p-4 text-gray-400">{t.date}</td><td className="p-4">{t.desc}</td><td className="p-4 text-red-500 font-black">{t.type === 'DR' ? `₹ ${t.amount.toLocaleString()}` : '-'}</td><td className="p-4 text-green-600 font-black">{t.type === 'CR' ? `₹ ${t.amount.toLocaleString()}` : '-'}</td><td className="p-4 text-right font-black">₹ {balance.toLocaleString()}</td></tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
           </div>
         )}

         {modal === 'cheque' && (
           <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[5000] flex items-center justify-center p-6 uppercase font-black animate-in fade-in duration-300">
              <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-12 text-center animate-in zoom-in duration-300">
                 <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 text-green-600 shadow-inner"><CheckCircle size={48} /></div>
                 <h3 className="text-[#004a89] text-2xl mb-4 tracking-tighter">Request Received!</h3>
                 <p className="text-[11px] text-gray-400 mb-10 tracking-widest leading-relaxed">YOUR NEW CHEQUE BOOK WILL BE DISPATCHED TO YOUR REGISTERED RESIDENTIAL ADDRESS WITHIN 5-7 BUSINESS DAYS.</p>
                 <button onClick={() => setModal(null)} className="bg-[#004a89] text-white w-full py-4 rounded-xl shadow-xl hover:bg-blue-800 transition-all uppercase tracking-[0.2em]">Close Window</button>
              </div>
           </div>
         )}
      </main>

      <footer className="max-w-[1440px] mx-auto px-8 py-16 text-center border-t border-gray-200 mt-12">
         <div className="flex justify-center gap-10 text-[10px] text-gray-400 font-black uppercase tracking-[0.3em] mb-6"><span className="hover:text-[#004a89] cursor-pointer transition-colors">Safety Tips</span><span className="hover:text-[#004a89] cursor-pointer transition-colors">Privacy Policy</span><span className="hover:text-[#004a89] cursor-pointer transition-colors">Customer Care</span></div>
         <p className="text-[9px] text-gray-400 font-black uppercase tracking-[0.5em] flex items-center justify-center gap-2 opacity-50"><ShieldCheck size={14} /> 256-Bit SSL Encrypted Secure Banking</p>
      </footer>
    </div>
  );
};

export default Dashboard;
