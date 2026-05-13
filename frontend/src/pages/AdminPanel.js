import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu, X, Plus, Edit2, Trash2, Lock, Search, BarChart, Users, User, Landmark, ShieldAlert, FileText, ChevronRight, CheckCircle, AlertTriangle, TrendingUp, Activity, PieChart, ShieldCheck, Download, Filter, ArrowUpRight, ArrowDownRight, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newBalance, setNewBalance] = useState('');
  const [newName, setNewName] = useState('');
  const navigate = useNavigate();

  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('hofc_users');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) { console.error(e); }
    return [
      { id: 1, userId: 'hdocuser', name: 'RAHUL KUMAR', email: 'rahul@example.com', balance: 254892.50, status: 'ACTIVE', acc: '50100451278964', joined: '15 Jan 2024' },
      { id: 2, userId: 'user2', name: 'PRIYA SHARMA', email: 'priya@example.com', balance: 175430.00, status: 'ACTIVE', acc: '50100451278965', joined: '10 Feb 2024' },
      { id: 3, userId: 'user3', name: 'AMIT PATEL', email: 'amit@example.com', balance: 425680.75, status: 'FROZEN', acc: '50100451278966', joined: '05 Mar 2024' },
    ];
  });

  const totalDeposits = Array.isArray(users) ? users.reduce((s, u) => s + (Number(u.balance) || 0), 0) : 0;

  const stats = [
    { label: 'TOTAL CUSTOMERS', value: users.length, icon: Users, color: 'bg-blue-600', trend: '+12%' },
    { label: 'ACTIVE ACCOUNTS', value: users.filter(u => u.status === 'ACTIVE').length, icon: CheckCircle, color: 'bg-green-600', trend: 'Stable' },
    { label: 'FROZEN ACCOUNTS', value: users.filter(u => u.status === 'FROZEN').length, icon: ShieldAlert, color: 'bg-red-600', trend: '-2%' },
    { label: 'TOTAL DEPOSITS', value: `₹${(totalDeposits / 100000).toFixed(2)}L`, icon: Landmark, color: 'bg-[#004a89]', trend: '+8.4%' }
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
  };

  const logout = () => { 
    localStorage.removeItem('admin_token');
    navigate('/admin-login'); 
  };

  const renderDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between group">
               <div className="flex justify-between items-start mb-4">
                  <div className={`p-2.5 rounded-lg text-white ${s.color}`}><s.icon size={20} /></div>
                  <span className="text-[10px] font-black px-2 py-1 bg-gray-50 text-gray-400">{s.trend}</span>
               </div>
               <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{s.label}</p>
                  <h3 className="text-2xl font-black text-gray-800">{s.value}</h3>
               </div>
            </div>
          ))}
       </div>

       <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
             <h3 className="text-[#004a89] font-black text-sm uppercase mb-8 flex items-center gap-2"><TrendingUp size={18} /> Performance</h3>
             <div className="h-64 flex items-end gap-3 px-4">
                {[40, 65, 50, 80, 55, 95, 75, 100].map((h, i) => (
                  <div key={i} className="flex-1 bg-blue-50 hover:bg-[#004a89] transition-all rounded-t-lg group relative">
                     <div className="w-full bg-[#004a89]/20 group-hover:bg-[#004a89] rounded-t-lg transition-all" style={{ height: `${h}%` }}></div>
                  </div>
                ))}
             </div>
          </div>
          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm text-center">
             <h3 className="text-[#004a89] font-black text-sm uppercase mb-8 self-start flex items-center gap-2"><PieChart size={18} /> Accounts</h3>
             <div className="relative w-40 h-40 mx-auto mb-8">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  <circle cx="18" cy="18" r="16" fill="transparent" stroke="#f1f3f6" strokeWidth="4"></circle>
                  <circle cx="18" cy="18" r="16" fill="transparent" stroke="#004a89" strokeWidth="4" strokeDasharray="70 100"></circle>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                   <p className="text-xl font-black">{users.length}</p>
                </div>
             </div>
          </div>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa]" style={{ fontFamily: 'Arial, sans-serif' }}>
      <header className="bg-[#004a89] px-8 py-4 text-white flex justify-between items-center shadow-xl">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <span className="font-black text-xl">HOFC BANK</span>
          </div>
          <span className="text-[10px] font-black uppercase opacity-60">Admin Console</span>
        </div>
        <button onClick={logout} className="bg-red-600 px-6 py-2 rounded text-[10px] font-black uppercase">Sign Out</button>
      </header>

      <div className="max-w-[1600px] mx-auto p-8 flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-64 space-y-2">
          {[{id:'users', icon:Users}, {id:'dashboard', icon:BarChart}, {id:'audit', icon:FileText}, {id:'settings', icon:Settings}].map(tab => (
            <div key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-6 py-4 rounded font-black text-[11px] uppercase cursor-pointer transition-all flex items-center gap-3 ${activeTab === tab.id ? 'bg-[#004a89] text-white' : 'bg-white text-gray-400 border border-gray-100'}`}>
              <tab.icon size={16} /> {tab.id}
            </div>
          ))}
        </div>

        <div className="flex-1 space-y-8 min-h-[600px]">
          {activeTab === 'dashboard' ? renderDashboard() : (
            <div className="bg-white rounded shadow-sm overflow-hidden border border-gray-100 p-8">
               <h2 className="text-[#004a89] font-black text-lg uppercase mb-6">Customer Database</h2>
               <div className="overflow-x-auto">
                 <table className="w-full text-left text-[11px]">
                   <thead className="bg-gray-50 text-gray-400 font-black uppercase">
                     <tr><th className="p-4">Name</th><th className="p-4">Acc</th><th className="p-4 text-right">Balance</th><th className="p-4 text-center">Status</th></tr>
                   </thead>
                   <tbody className="font-bold">
                     {users.map(u => (
                       <tr key={u.id} className="border-b border-gray-50">
                         <td className="p-4 uppercase">{u.name}</td>
                         <td className="p-4 font-mono">{u.acc}</td>
                         <td className="p-4 text-right font-black">₹{u.balance?.toLocaleString()}</td>
                         <td className="p-4 text-center text-[9px] uppercase">{u.status}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
