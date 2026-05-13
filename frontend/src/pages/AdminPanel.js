import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu, X, Plus, Edit2, Trash2, Lock, Search, BarChart3, Users, Landmark, ShieldAlert, FileText, ChevronRight, CheckCircle, AlertTriangle, TrendingUp, Activity, PieChart, ShieldCheck, Download, Filter, ArrowUpRight, ArrowDownRight, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newBalance, setNewBalance] = useState('');
  const [newName, setNewName] = useState('');
  const navigate = useNavigate();

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('hofc_users');
    return saved ? JSON.parse(saved) : [
      { id: 1, userId: 'hdocuser', name: 'RAHUL KUMAR', email: 'rahul@example.com', balance: 254892.50, status: 'ACTIVE', acc: '50100451278964', joined: '15 Jan 2024' },
      { id: 2, userId: 'user2', name: 'PRIYA SHARMA', email: 'priya@example.com', balance: 175430.00, status: 'ACTIVE', acc: '50100451278965', joined: '10 Feb 2024' },
      { id: 3, userId: 'user3', name: 'AMIT PATEL', email: 'amit@example.com', balance: 425680.75, status: 'FROZEN', acc: '50100451278966', joined: '05 Mar 2024' },
    ];
  });

  const logs = [
    { id: 1, action: 'Balance Updated', user: 'RAHUL KUMAR', admin: 'SuperAdmin', time: '10 mins ago', status: 'Success' },
    { id: 2, action: 'Account Frozen', user: 'AMIT PATEL', admin: 'SuperAdmin', time: '2 hours ago', status: 'Warning' },
    { id: 3, action: 'New User Registered', user: 'PRIYA SHARMA', admin: 'System', time: '5 hours ago', status: 'Success' },
  ];

  const totalDeposits = users.reduce((s, u) => s + u.balance, 0);

  const stats = [
    { label: 'TOTAL CUSTOMERS', value: users.length, icon: Users, color: 'bg-blue-600', trend: '+12%' },
    { label: 'ACTIVE ACCOUNTS', value: users.filter(u => u.status === 'ACTIVE').length, icon: CheckCircle, color: 'bg-green-600', trend: 'Stable' },
    { label: 'FROZEN ACCOUNTS', value: users.filter(u => u.status === 'FROZEN').length, icon: ShieldAlert, color: 'bg-red-600', trend: '-2%' },
    { label: 'TOTAL DEPOSITS', value: `₹${(totalDeposits / 100000).toFixed(2)}L`, icon: Landmark, color: 'bg-[#004a89]', trend: '+8.4%' }
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

  const renderDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between group hover:shadow-md transition-all">
               <div className="flex justify-between items-start mb-4">
                  <div className={`p-2.5 rounded-lg text-white shadow-lg ${s.color}`}><s.icon size={20} /></div>
                  <span className={`text-[10px] font-black px-2 py-1 rounded-sm ${s.trend.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400'}`}>{s.trend}</span>
               </div>
               <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{s.label}</p>
                  <h3 className="text-2xl font-black text-gray-800 tracking-tighter">{s.value}</h3>
               </div>
            </div>
          ))}
       </div>

       <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
             <div className="flex justify-between items-center mb-8">
                <h3 className="text-[#004a89] font-black text-sm uppercase tracking-tight flex items-center gap-2"><TrendingUp size={18} /> Deposit Growth Trend</h3>
                <div className="flex gap-2"><button className="text-[9px] font-black bg-blue-50 text-[#004a89] px-3 py-1 rounded-sm uppercase tracking-widest">Monthly</button><button className="text-[9px] font-black text-gray-400 px-3 py-1 rounded-sm uppercase tracking-widest">Yearly</button></div>
             </div>
             <div className="h-64 flex items-end gap-3 px-4">
                {[40, 65, 50, 80, 55, 95, 75, 100].map((h, i) => (
                  <div key={i} className="flex-1 bg-blue-50 hover:bg-[#004a89] transition-all rounded-t-lg group relative">
                     <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 bg-[#004a89] text-white text-[8px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 uppercase transition-opacity">₹{h}k</div>
                     <div className="w-full bg-[#004a89]/20 group-hover:bg-[#004a89] rounded-t-lg transition-all" style={{ height: `${h}%` }}></div>
                  </div>
                ))}
             </div>
          </div>
          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
             <h3 className="text-[#004a89] font-black text-sm uppercase tracking-tight mb-8 self-start flex items-center gap-2"><PieChart size={18} /> Account Status</h3>
             <div className="relative w-48 h-48 mb-8">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#22c55e" strokeWidth="4.5" strokeDasharray="70 100" strokeDashoffset="0"></circle>
                  <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#ef4444" strokeWidth="4.5" strokeDasharray="30 100" strokeDashoffset="-70"></circle>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                   <p className="text-xl font-black text-gray-800">{users.length}</p>
                   <p className="text-[9px] font-black text-gray-400 uppercase">Users</p>
                </div>
             </div>
             <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div> Active</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div> Frozen</div>
             </div>
          </div>
       </div>

       <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center text-[#004a89]">
             <h3 className="font-black text-sm uppercase tracking-tight flex items-center gap-2"><Activity size={18} /> System Audit Logs</h3>
             <button className="text-[10px] font-black uppercase hover:underline">Download Report ›</button>
          </div>
          <div className="p-0">
             {logs.map(log => (
               <div key={log.id} className="p-6 border-b border-gray-50 flex justify-between items-center hover:bg-gray-50 transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                     <div className={`p-2 rounded-full ${log.status === 'Success' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}><ShieldCheck size={16} /></div>
                     <div><p className="text-xs font-black text-gray-800 uppercase tracking-tighter">{log.action}</p><p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Target: {log.user} | By: {log.admin}</p></div>
                  </div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{log.time}</span>
               </div>
             ))}
          </div>
       </div>
    </div>
  );

  const renderUsers = () => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 animate-in slide-in-from-right-4 duration-500">
      <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
        <h2 className="text-[#004a89] font-black text-lg uppercase tracking-tight">Customer Database</h2>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 group"><input type="text" placeholder="Filter by Name/ID..." className="w-full border border-gray-100 bg-gray-50 px-10 py-3 text-xs rounded-lg outline-none focus:border-[#004a89] focus:bg-white transition-all shadow-inner" /><Search className="absolute left-3 top-3 text-gray-300 group-focus-within:text-[#004a89] transition-colors" size={18} /></div>
          <button className="bg-[#004a89] text-white px-8 py-3 rounded-lg text-xs font-black uppercase flex items-center gap-2 shadow-xl hover:bg-blue-800 transition-all"><Plus size={18} /> Add User</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[11px] border-collapse">
          <thead className="bg-gray-50 text-gray-400 font-black uppercase tracking-[0.2em] border-y border-gray-100">
            <tr><th className="px-8 py-5">Full Details</th><th className="px-8 py-5">Acc Number</th><th className="px-8 py-5 text-right">Balance (₹)</th><th className="px-8 py-5 text-center">Status</th><th className="px-8 py-5 text-center">Action</th></tr>
          </thead>
          <tbody className="font-bold text-gray-700">
            {users.map(u => (
              <tr key={u.id} className="border-b border-gray-50 hover:bg-blue-50/20 transition-colors">
                <td className="px-8 py-5 flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-[#004a89] font-black text-sm uppercase">{u.name.charAt(0)}</div>
                  <div><p className="text-gray-900 font-black uppercase tracking-tighter">{u.name}</p><p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{u.userId}</p></div>
                </td>
                <td className="px-8 py-5 text-gray-500 font-mono text-[12px]">{u.acc}</td>
                <td className="px-8 py-5 text-right font-black text-gray-900 text-[13px]">₹ {u.balance.toLocaleString('en-IN')}</td>
                <td className="px-8 py-5 text-center"><span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${u.status === 'ACTIVE' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>{u.status}</span></td>
                <td className="px-8 py-5">
                  <div className="flex justify-center gap-2">
                    <button onClick={() => { setSelectedUser(u); setNewBalance(u.balance); setNewName(u.name); }} className="p-2 text-gray-400 hover:text-[#004a89] hover:bg-blue-50 rounded-lg transition-all"><Edit2 size={16} /></button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa]" style={{ fontFamily: 'Arial, sans-serif' }}>
      <header className="bg-[#004a89] px-8 py-4 text-white flex justify-between items-center shadow-xl sticky top-0 z-50">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-white p-1 rounded-sm"><div className="w-6 h-6 bg-[#004a89]"></div></div>
            <span className="font-black text-xl tracking-tighter">HOFC BANK</span>
          </div>
          <div className="hidden md:block h-6 w-[1px] bg-white/20"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">Admin Control Center v4.5</span>
        </div>
        <div className="flex items-center gap-6">
           <div className="hidden lg:flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-lg border border-white/10">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-[9px] font-black uppercase tracking-widest">Server: Fort Mumbai-Node-01</span>
           </div>
           <button onClick={logout} className="bg-red-600 px-6 py-2 rounded-lg text-[10px] font-black uppercase flex items-center gap-2 hover:bg-red-700 transition-all shadow-lg shadow-red-900/20">Sign Out <LogOut size={14} /></button>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto p-8 flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-72 space-y-2">
          {[{id:'users', icon:Users}, {id:'dashboard', icon:BarChart3}, {id:'audit', icon:FileText}, {id:'settings', icon:Settings}].map(tab => (
            <div key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-6 py-4 rounded-xl font-black text-[11px] uppercase cursor-pointer transition-all flex justify-between items-center group ${activeTab === tab.id ? 'bg-[#004a89] text-white shadow-xl translate-x-2' : 'bg-white text-gray-400 hover:bg-blue-50 border border-gray-100'}`}>
              <span className="flex items-center gap-3"><tab.icon size={16} /> {tab.id}</span> <ChevronRight size={14} className={`${activeTab === tab.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'} transition-opacity`} />
            </div>
          ))}
          <div className="mt-8 p-6 bg-gradient-to-br from-[#004a89] to-[#001a33] rounded-2xl text-white shadow-xl relative overflow-hidden">
             <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
             <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Access Level</p>
             <h4 className="text-lg font-black uppercase tracking-tighter">Root Admin</h4>
             <div className="mt-4 flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.2em] bg-white/10 px-2 py-1 rounded inline-flex"><ShieldCheck size={10} /> Certified Access</div>
          </div>
        </div>

        <div className="flex-1 space-y-8 min-h-[700px]">
          {activeTab === 'dashboard' ? renderDashboard() : renderUsers()}
        </div>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[1000] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300 border border-gray-200">
            <div className="bg-[#004a89] p-8 text-white flex justify-between items-center">
               <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-xl"><Edit2 size={24} /></div>
                  <div><h3 className="text-sm font-black uppercase tracking-widest">Identity Management</h3><p className="text-[10px] opacity-60 font-bold uppercase tracking-widest">Administrative Override</p></div>
               </div>
               <button onClick={() => setSelectedUser(null)} className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all"><X size={20} /></button>
            </div>
            <div className="p-12 space-y-10">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 relative group">
                <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-2">Subject Target</p>
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-[#004a89] rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg group-hover:scale-105 transition-transform">{selectedUser.name.charAt(0)}</div>
                   <div><p className="text-xl text-gray-800 font-black tracking-tighter uppercase">{selectedUser.name}</p><p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{selectedUser.acc}</p></div>
                </div>
              </div>
              
              <div className="grid gap-8">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase mb-3 block tracking-widest">Modify Customer Name</label>
                  <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full border border-gray-100 bg-gray-50 p-4 rounded-xl text-sm font-black outline-none focus:border-[#004a89] focus:bg-white shadow-inner" placeholder="Enter Full Legal Name" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase mb-3 block tracking-widest">Adjust Ledger Balance (₹)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-4 text-gray-400 font-black text-lg">₹</span>
                    <input type="number" value={newBalance} onChange={(e) => setNewBalance(e.target.value)} className="w-full border border-gray-100 bg-gray-50 p-4 pl-10 rounded-xl text-2xl font-black text-[#004a89] outline-none focus:border-[#004a89] focus:bg-white shadow-inner" placeholder="0.00" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={handleUpdateUser} className="flex-1 bg-[#004a89] text-white py-4 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:bg-blue-800 transition-all flex items-center justify-center gap-2">Commit Override <ArrowUpRight size={18} /></button>
                <button onClick={() => setSelectedUser(null)} className="px-10 bg-gray-100 text-gray-500 py-4 rounded-xl text-[11px] font-black uppercase hover:bg-gray-200 transition-all tracking-widest">Discard</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="p-8 text-center text-gray-400 text-[10px] font-black uppercase tracking-[0.5em] opacity-40">HOFC Centralized Administration & Monitoring System • v4.5.0</footer>
    </div>
  );
};

export default AdminPanel;
