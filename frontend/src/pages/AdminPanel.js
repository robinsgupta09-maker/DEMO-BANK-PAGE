import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu, X, Plus, Edit2, Trash2, Lock, Search, BarChart3, Users, Landmark, ShieldAlert, FileText, ChevronRight, CheckCircle, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newBalance, setNewBalance] = useState('');
  const [newName, setNewName] = useState(''); // State for editing name
  const navigate = useNavigate();

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('hofc_users');
    return saved ? JSON.parse(saved) : [
      { id: 1, userId: 'hdocuser', name: 'RAHUL KUMAR', email: 'rahul@example.com', balance: 254892.50, status: 'ACTIVE', acc: '50100451278964', joined: '15 Jan 2024' },
      { id: 2, userId: 'user2', name: 'PRIYA SHARMA', email: 'priya@example.com', balance: 175430.00, status: 'ACTIVE', acc: '50100451278965', joined: '10 Feb 2024' },
      { id: 3, userId: 'user3', name: 'AMIT PATEL', email: 'amit@example.com', balance: 425680.75, status: 'FROZEN', acc: '50100451278966', joined: '05 Mar 2024' },
    ];
  });

  const stats = [
    { label: 'TOTAL CUSTOMERS', value: users.length, icon: Users, color: 'bg-blue-600' },
    { label: 'ACTIVE ACCOUNTS', value: users.filter(u => u.status === 'ACTIVE').length, icon: CheckCircle, color: 'bg-green-600' },
    { label: 'FROZEN ACCOUNTS', value: users.filter(u => u.status === 'FROZEN').length, icon: ShieldAlert, color: 'bg-red-600' },
    { label: 'TOTAL DEPOSITS', value: `₹${(users.reduce((s, u) => s + u.balance, 0) / 100000).toFixed(2)}L`, icon: Landmark, color: 'bg-[#004a89]' }
  ];

  const handleUpdateUser = () => {
    const updatedUsers = users.map(u => u.id === selectedUser.id ? { 
      ...u, 
      balance: newBalance ? parseFloat(newBalance) : u.balance,
      name: newName || u.name 
    } : u);
    setUsers(updatedUsers);
    localStorage.setItem('hofc_users', JSON.stringify(updatedUsers));
    setNewBalance('');
    setNewName('');
    setSelectedUser(null);
  };

  const logout = () => { navigate('/admin-login'); };

  return (
    <div className="min-h-screen bg-[#f1f4f8]" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* HEADER */}
      <header className="bg-[#004a89] px-8 py-4 text-white flex justify-between items-center shadow-lg sticky top-0 z-50">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <div className="bg-white p-1 rounded-sm"><div className="w-5 h-5 bg-[#004a89]"></div></div>
            <span className="font-black text-xl tracking-tighter">HOFC BANK</span>
          </div>
          <div className="hidden md:block h-6 w-[1px] bg-white/20"></div>
          <span className="text-xs font-black uppercase tracking-widest opacity-80">Admin Control Center</span>
        </div>
        <button onClick={logout} className="bg-red-600 px-6 py-2 rounded-sm text-[10px] font-black uppercase flex items-center gap-2 hover:bg-red-700 transition-all">Logout <LogOut size={14} /></button>
      </header>

      <div className="max-w-[1600px] mx-auto p-8 flex flex-col lg:flex-row gap-8">
        {/* SIDEBAR */}
        <div className="w-full lg:w-72 space-y-2">
          {['users', 'analytics', 'audit', 'compliance', 'settings'].map(tab => (
            <div key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-4 rounded-sm font-black text-[11px] uppercase cursor-pointer transition-all flex justify-between items-center ${activeTab === tab ? 'bg-[#004a89] text-white shadow-xl translate-x-2' : 'bg-white text-gray-500 hover:bg-gray-50'}`}>
              {tab} <ChevronRight size={14} />
            </div>
          ))}
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 space-y-8">
          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="bg-white p-8 rounded-sm shadow-sm flex flex-col relative overflow-hidden">
                <div className={`absolute right-[-10px] top-[-10px] w-20 h-20 opacity-5 rounded-full ${s.color}`}></div>
                <p className="text-[10px] font-black text-gray-400 mb-4 tracking-widest">{s.label}</p>
                <div className="flex justify-between items-end">
                   <h3 className="text-3xl font-black text-gray-800 tracking-tighter">{s.value}</h3>
                   <div className={`p-2 rounded-full text-white ${s.color}`}><s.icon size={18} /></div>
                </div>
              </div>
            ))}
          </div>

          {/* USER TABLE */}
          <div className="bg-white rounded-sm shadow-sm overflow-hidden border border-gray-100">
            <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
              <h2 className="text-[#004a89] font-black text-lg uppercase tracking-tight">Customer Management</h2>
              <div className="flex gap-4 w-full md:w-auto">
                <div className="relative flex-1"><input type="text" placeholder="Search User ID / Name..." className="w-full border border-gray-200 bg-gray-50 px-10 py-2.5 text-xs rounded-sm outline-none focus:border-[#004a89]" /><Search className="absolute left-3 top-2.5 text-gray-300" size={16} /></div>
                <button className="bg-[#004a89] text-white px-8 py-2.5 rounded-sm text-xs font-black uppercase flex items-center gap-2"><Plus size={16} /> New User</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] border-collapse">
                <thead className="bg-gray-50 text-gray-400 font-black uppercase tracking-widest border-y border-gray-100">
                  <tr><th className="px-8 py-5">Customer Details</th><th className="px-8 py-5">Account Number</th><th className="px-8 py-5">Balance (₹)</th><th className="px-8 py-5">Status</th><th className="px-8 py-5 text-center">Actions</th></tr>
                </thead>
                <tbody className="font-bold text-gray-700">
                  {users.map(u => (
                    <tr key={u.id} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors">
                      <td className="px-8 py-5"><div><p className="text-gray-900 font-black uppercase">{u.name}</p><p className="text-[9px] text-gray-400 tracking-tighter">{u.email}</p></div></td>
                      <td className="px-8 py-5 text-gray-500 font-mono">{u.acc}</td>
                      <td className="px-8 py-5 text-[#004a89] font-black">₹ {u.balance.toLocaleString()}</td>
                      <td className="px-8 py-5"><span className={`px-3 py-1 rounded-sm text-[9px] font-black ${u.status === 'ACTIVE' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>{u.status}</span></td>
                      <td className="px-8 py-5">
                        <div className="flex justify-center gap-3">
                          <button onClick={() => { setSelectedUser(u); setNewBalance(u.balance); setNewName(u.name); }} className="p-2 text-gray-400 hover:text-[#004a89] hover:bg-blue-50 rounded-sm transition-all"><Edit2 size={16} /></button>
                          <button className="p-2 text-gray-400 hover:text-[#004a89] hover:bg-blue-50 rounded-sm transition-all"><Lock size={16} /></button>
                          <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-sm transition-all"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-6 animate-in fade-in duration-300 uppercase font-black">
          <div className="bg-white w-full max-w-lg rounded-sm shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="bg-[#004a89] p-6 text-white flex justify-between items-center">
              <h3 className="text-sm tracking-widest">Administrative User Update</h3>
              <button onClick={() => setSelectedUser(null)}><X size={20} /></button>
            </div>
            <div className="p-10 space-y-8">
              <div className="bg-gray-50 p-6 border-l-4 border-[#004a89]">
                <p className="text-[10px] text-gray-400 mb-1">Target Account</p>
                <p className="text-lg text-gray-800 tracking-tighter">{selectedUser.name}</p>
                <p className="text-[9px] text-gray-400 mt-1">{selectedUser.acc} • {selectedUser.userId}</p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] text-gray-400 mb-2 block tracking-widest">Update Customer Name</label>
                  <input 
                    type="text" 
                    value={newName} 
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full border border-gray-200 bg-gray-50 p-4 rounded-sm text-sm outline-none focus:border-[#004a89]" 
                    placeholder="Enter New Name"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 mb-2 block tracking-widest">Manual Balance Update (₹)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-4 text-gray-400">₹</span>
                    <input 
                      type="number" 
                      value={newBalance} 
                      onChange={(e) => setNewBalance(e.target.value)}
                      className="w-full border border-gray-200 bg-gray-50 p-4 pl-10 rounded-sm text-lg outline-none focus:border-[#004a89]" 
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={handleUpdateUser} className="flex-1 bg-[#004a89] text-white py-4 rounded-sm text-[11px] shadow-xl hover:bg-blue-800 transition-all">Commit Changes</button>
                <button onClick={() => setSelectedUser(null)} className="flex-1 bg-gray-100 text-gray-500 py-4 rounded-sm text-[11px] hover:bg-gray-200 transition-all">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="p-8 text-center text-gray-400 text-[10px] font-black uppercase tracking-[0.4em]">Centralized Banking Administration System • v4.2.0</footer>
    </div>
  );
};

export default AdminPanel;
