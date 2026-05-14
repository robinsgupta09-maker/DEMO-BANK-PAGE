import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LogOut, Plus, Edit2, Trash2, Lock, Search, BarChart2, 
  Users, User, Landmark, ShieldAlert, FileText, ChevronRight, 
  CheckCircle, TrendingUp, Activity, PieChart, ShieldCheck, 
  ArrowUpRight, Settings, RefreshCcw, X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('users');
  const [selectedUser, setSelectedUser] = useState(null);
  const [newBalance, setNewBalance] = useState('');
  const [newName, setNewName] = useState('');
  const navigate = useNavigate();

  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('hdoc_users'); // Standardized Key
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });

  const totalDeposits = users.reduce((s, u) => s + (Number(u.balance) || 0), 0);

  const handleUpdateUser = () => {
    if (!selectedUser) return;
    const updatedUsers = users.map(u => u.id === selectedUser.id ? { 
      ...u, 
      balance: newBalance ? parseFloat(newBalance) : u.balance,
      name: newName || u.name 
    } : u);
    setUsers(updatedUsers);
    localStorage.setItem('hdoc_users', JSON.stringify(updatedUsers));
    setSelectedUser(null);
    setNewBalance('');
    setNewName('');
  };

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-gray-400 font-sans">
      <div className="fixed left-0 top-0 bottom-0 w-72 bg-[#0e1117] border-r border-white/5 p-8 flex flex-col justify-between z-50">
        <div>
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-[#ed1c24] rounded-xl flex items-center justify-center text-white shadow-lg">
              <ShieldCheck size={24} />
            </div>
            <h1 className="text-white font-black tracking-tighter uppercase text-xl italic">HDOC <span className="text-red-500">CORE</span></h1>
          </div>

          <nav className="space-y-2">
            {[{ id: 'users', label: 'Users', icon: Users }, { id: 'dashboard', label: 'Stats', icon: BarChart2 }].map(tab => (
              <div key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${activeTab === tab.id ? 'bg-[#ed1c24] text-white shadow-2xl' : 'hover:bg-white/5'}`}>
                <div className="flex items-center gap-4"><tab.icon size={18} /> <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span></div>
              </div>
            ))}
          </nav>
        </div>
        <button onClick={handleLogout} className="w-full bg-red-500/10 text-red-500 py-4 rounded-xl text-[10px] font-black uppercase">Emergency Exit</button>
      </div>

      <main className="ml-72 p-12">
        <header className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">{activeTab} <span className="text-red-500">Node</span></h2>
          <div className="bg-green-500/10 text-green-500 px-4 py-2 rounded-xl border border-green-500/20 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[9px] font-black uppercase tracking-widest">Protocol: Secure</span>
          </div>
        </header>

        {activeTab === 'dashboard' ? (
          <div className="grid grid-cols-3 gap-8">
            <div className="bg-[#0e1117] p-10 rounded-[2rem] border border-white/5">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Total Ledger Funds</p>
              <h3 className="text-4xl font-black text-white tracking-tighter">₹ {(totalDeposits/100000).toFixed(2)}L</h3>
            </div>
          </div>
        ) : (
          <div className="bg-[#0e1117] rounded-[2rem] border border-white/5 overflow-hidden">
            <table className="w-full text-left">
              <thead className="text-[9px] font-black text-gray-600 uppercase tracking-widest bg-black/20">
                <tr><th className="px-10 py-6">User Identity</th><th className="px-10 py-6">Balance</th><th className="px-10 py-6 text-right">Action</th></tr>
              </thead>
              <tbody className="text-xs font-bold text-white">
                {users.map(u => (
                  <tr key={u.id} className="border-b border-white/5 hover:bg-white/[0.01]">
                    <td className="px-10 py-8 uppercase font-black">{u.name} ({u.userId})</td>
                    <td className="px-10 py-8">₹ {u.balance?.toLocaleString()}</td>
                    <td className="px-10 py-8 text-right">
                      <button onClick={() => { setSelectedUser(u); setNewBalance(u.balance); setNewName(u.name); }} className="p-3 bg-white/5 rounded-xl hover:bg-red-500 transition-all"><Edit2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {selectedUser && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[1000] flex items-center justify-center p-6">
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-[#0e1117] w-full max-w-xl rounded-[3rem] border border-white/10 overflow-hidden">
            <div className="bg-red-500 p-10 text-white flex justify-between items-center">
              <h3 className="text-sm font-black uppercase tracking-widest">Administrative Override</h3>
              <button onClick={() => setSelectedUser(null)}><X size={24} /></button>
            </div>
            <div className="p-12 space-y-8">
               <div><label className="text-[9px] font-black text-gray-500 uppercase mb-3 block">Modify Name</label><input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-black" /></div>
               <div><label className="text-[9px] font-black text-gray-500 uppercase mb-3 block">Adjust Balance</label><input type="number" value={newBalance} onChange={(e) => setNewBalance(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-2xl text-white font-black" /></div>
               <button onClick={handleUpdateUser} className="w-full bg-red-500 text-white py-4 rounded-[2rem] font-black uppercase text-xs">Commit Changes</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
