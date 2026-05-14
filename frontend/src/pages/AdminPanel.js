import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Edit2, Trash2, Lock, Search, BarChart, Users, User, Landmark, ShieldAlert, FileText, ChevronRight, CheckCircle, TrendingUp, Activity, PieChart, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
  const { user: adminUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('users');
  const [selectedUser, setSelectedUser] = useState(null);
  const [newBalance, setNewBalance] = useState('');
  const [newName, setNewName] = useState('');
  const navigate = useNavigate();

  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('hofc_users');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });

  const totalDeposits = Array.isArray(users) ? users.reduce((s, u) => s + (Number(u.balance) || 0), 0) : 0;

  const stats = [
    { label: 'TOTAL CUSTOMERS', value: users.length, icon: Users, color: 'bg-blue-600' },
    { label: 'ACTIVE ACCOUNTS', value: users.filter(u => u.status === 'ACTIVE').length, icon: CheckCircle, color: 'bg-green-600' },
    { label: 'TOTAL DEPOSITS', value: `₹${(totalDeposits / 100000).toFixed(2)}L`, icon: Landmark, color: 'bg-[#004a89]' }
  ];

  const handleUpdateUser = () => {
    if (!selectedUser) return;
    const updatedUsers = users.map(u => u.id === selectedUser.id ? { 
      ...u, 
      balance: newBalance ? parseFloat(newBalance) : u.balance,
      name: newName || u.name 
    } : u);
    setUsers(updatedUsers);
    localStorage.setItem('hofc_users', JSON.stringify(updatedUsers));
    setSelectedUser(null);
    setNewBalance('');
    setNewName('');
  };

  const handleLogout = () => { logout(); navigate('/admin-login'); };

  return (
    <div className="min-h-screen bg-[#f8f9fa]" style={{ fontFamily: 'Arial, sans-serif' }}>
      <header className="bg-[#004a89] px-8 py-4 text-white flex justify-between items-center shadow-xl">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
             <div className="w-8 h-8 bg-white flex items-center justify-center text-[#004a89] font-black">H</div>
             <span className="font-black text-xl tracking-tighter">HOFC ADMIN</span>
          </div>
          <span className="text-[10px] font-black uppercase opacity-60">Management Console v4.5</span>
        </div>
        <div className="flex items-center gap-6">
           <div className="hidden lg:flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-lg border border-white/10">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-[9px] font-black uppercase tracking-widest">System Online</span>
           </div>
           <button onClick={handleLogout} className="bg-red-600 px-6 py-2 rounded-lg text-[10px] font-black uppercase shadow-lg shadow-red-900/20">Sign Out</button>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto p-8 flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-72 space-y-2">
          {[{id:'users', icon:Users}, {id:'dashboard', icon:BarChart}, {id:'audit', icon:FileText}].map(tab => (
            <div key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-6 py-4 rounded-xl font-black text-[11px] uppercase cursor-pointer transition-all flex justify-between items-center ${activeTab === tab.id ? 'bg-[#004a89] text-white shadow-xl translate-x-2' : 'bg-white text-gray-400 hover:bg-blue-50 border border-gray-100'}`}>
              <span className="flex items-center gap-3"><tab.icon size={16} /> {tab.id}</span> <ChevronRight size={14} className={`${activeTab === tab.id ? 'opacity-100' : 'opacity-0'} transition-opacity`} />
            </div>
          ))}
        </div>

        <div className="flex-1 space-y-8 min-h-[700px]">
          {activeTab === 'dashboard' ? (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((s, i) => (
                  <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between group hover:shadow-md transition-all">
                     <div className="flex justify-between items-start mb-4">
                        <div className={`p-2.5 rounded-lg text-white shadow-lg ${s.color}`}><s.icon size={20} /></div>
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{s.label}</p>
                        <h3 className="text-2xl font-black text-gray-800 tracking-tighter">{s.value}</h3>
                     </div>
                  </div>
                ))}
              </div>
              <div className="bg-white p-10 rounded-xl border border-gray-100 shadow-sm text-center">
                 <h3 className="text-[#004a89] font-black text-sm uppercase tracking-tight mb-8 self-start flex items-center gap-2"><PieChart size={18} /> User Growth</h3>
                 <div className="relative w-40 h-40 mx-auto mb-8">
                    <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                      <circle cx="18" cy="18" r="16" fill="transparent" stroke="#f1f3f6" strokeWidth="4"></circle>
                      <circle cx="18" cy="18" r="16" fill="transparent" stroke="#004a89" strokeWidth="4" strokeDasharray="75 100"></circle>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col"><p className="text-xl font-black">{users.length}</p></div>
                 </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 animate-in slide-in-from-right-4 duration-500">
              <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
                <h2 className="text-[#004a89] font-black text-lg uppercase tracking-tight">Customer Database</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px] border-collapse">
                  <thead className="bg-gray-50 text-gray-400 font-black uppercase tracking-[0.2em] border-y border-gray-100">
                    <tr><th className="px-8 py-5">Full Details</th><th className="px-8 py-5">Acc Number</th><th className="px-8 py-5 text-right">Balance (₹)</th><th className="px-8 py-5 text-center">Action</th></tr>
                  </thead>
                  <tbody className="font-bold text-gray-700">
                    {users.map(u => (
                      <tr key={u.id} className="border-b border-gray-50 hover:bg-blue-50/20 transition-colors">
                        <td className="px-8 py-5 flex items-center gap-4">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-[#004a89] font-black text-sm uppercase">{u.name?.charAt(0)}</div>
                          <div><p className="text-gray-900 font-black uppercase tracking-tighter">{u.name}</p><p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{u.userId}</p></div>
                        </td>
                        <td className="px-8 py-5 text-gray-500 font-mono text-[12px]">{u.acc}</td>
                        <td className="px-8 py-5 text-right font-black text-gray-900 text-[13px]">₹ {u.balance?.toLocaleString('en-IN')}</td>
                        <td className="px-8 py-5">
                          <div className="flex justify-center gap-2">
                            <button onClick={() => { setSelectedUser(u); setNewBalance(u.balance); setNewName(u.name); }} className="p-2 text-gray-400 hover:text-[#004a89] hover:bg-blue-50 rounded-lg transition-all"><Edit2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[1000] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300 border border-gray-200">
            <div className="bg-[#004a89] p-8 text-white flex justify-between items-center">
               <h3 className="text-sm font-black uppercase tracking-widest">Update User</h3>
               <button onClick={() => setSelectedUser(null)} className="p-2 rounded-full hover:bg-white/20 transition-all"><X size={20} /></button>
            </div>
            <div className="p-10 space-y-8">
              <div><label className="text-[10px] font-black text-gray-400 uppercase mb-3 block">Customer Name</label><input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full border border-gray-100 bg-gray-50 p-4 rounded-xl text-sm font-black outline-none focus:border-[#004a89]" /></div>
              <div><label className="text-[10px] font-black text-gray-400 uppercase mb-3 block">Balance (₹)</label><input type="number" value={newBalance} onChange={(e) => setNewBalance(e.target.value)} className="w-full border border-gray-100 bg-gray-50 p-4 rounded-xl text-2xl font-black text-[#004a89] outline-none focus:border-[#004a89]" /></div>
              <button onClick={handleUpdateUser} className="w-full bg-[#004a89] text-white py-4 rounded-xl font-black uppercase text-xs tracking-widest shadow-xl hover:bg-blue-800 transition-all">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
