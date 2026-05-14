import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, Search, Bell, User, Eye, EyeOff, Send, QrCode, 
  Smartphone, Receipt, CreditCard, Landmark, Briefcase, 
  MoreHorizontal, ArrowRightLeft, LayoutDashboard, Settings,
  ChevronRight, ArrowUpRight, History, HeartPulse, Zap, ShieldCheck,
  TrendingUp, Gift, MapPin, Shield, HelpCircle, MessageSquare, 
  AlertCircle, SmartphoneNfc, Percent, Activity, PieChart,
  Droplets, Wifi, Tv, Globe, LogOut, Info, Phone
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { useAuth } from '../context/AuthContext';

// DESIGN SYSTEM COLORS (From Reference Image)
const COLORS = {
  primary: '#0A3D91',
  gradBlue: '#1E6BFF',
  gradPurple: '#7A3CFF',
  success: '#12B76A',
  danger: '#F04438',
  orange: '#FA8C16',
  bg: '#F4F6FA',
  cardBg: '#FFFFFF',
  textPrimary: '#0F172A',
  textSecondary: '#64748B'
};

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const handleLogout = () => { logout(); navigate('/'); };

  const SectionTitle = ({ title }) => (
    <div className="flex justify-between items-center px-2 mb-4 mt-8 first:mt-2">
      <h4 style={{ color: COLORS.textSecondary }} className="text-[12px] font-semibold uppercase tracking-[1px]">{title}</h4>
      <ChevronRight size={14} style={{ color: COLORS.textSecondary }} className="opacity-40" />
    </div>
  );

  const ServiceItem = ({ i: Icon, label, color }) => (
    <motion.div whileTap={{ scale: 0.94 }} className="flex flex-col items-center gap-2 cursor-pointer">
      <div className={`w-[52px] h-[52px] rounded-2xl ${color} flex items-center justify-center shadow-md`}>
        <Icon className="text-white" size={24} />
      </div>
      <span style={{ color: COLORS.textSecondary }} className="text-[11px] font-medium uppercase tracking-tighter text-center leading-tight">{label}</span>
    </motion.div>
  );

  return (
    <div style={{ backgroundColor: COLORS.bg }} className="min-h-screen pb-28 font-sans select-none overflow-x-hidden max-w-[430px] mx-auto relative shadow-2xl">
      
      {/* 1. TOP HEADER (EXACT MATCH) */}
      <div style={{ backgroundColor: COLORS.primary }} className="text-white px-5 pt-12 pb-24 rounded-b-[40px] relative shadow-lg">
        <div className="flex justify-between items-center mb-10">
          <Menu size={24} className="opacity-90" />
          <h1 className="text-base font-bold tracking-tighter uppercase italic">HDOC <span className="text-blue-400 font-black">BANK</span></h1>
          <div className="flex items-center gap-4">
            <Search size={22} className="opacity-70" />
            <div className="relative">
              <Bell size={22} className="opacity-70" />
              <div className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full border border-[#0A3D91]"></div>
            </div>
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/5">
              <User size={20} />
            </div>
          </div>
        </div>
        <div className="px-1">
          <p className="text-blue-400 text-[10px] font-bold uppercase tracking-[1px] mb-1">GOOD MORNING,</p>
          <h2 className="text-[24px] font-bold tracking-tight uppercase leading-tight">{user?.name || 'SUPER ADMIN'}</h2>
          <p className="text-white/30 text-[10px] font-normal mt-2 uppercase tracking-widest">LAST LOGIN: TODAY, 11:20 AM</p>
        </div>
      </div>

      {/* 2. FLOATING BALANCE CARD (EXACT GRADIENT) */}
      <div className="px-5 -mt-16 relative z-10">
        <div style={{ background: `linear-gradient(135deg, ${COLORS.gradBlue}, ${COLORS.gradPurple})` }} className="rounded-[24px] p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
          <div className="flex justify-between items-start mb-10">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[1px] opacity-60 mb-1">SAVINGS ACCOUNT</p>
              <h3 className="text-base font-bold tracking-widest">{user?.acc || 'ADMIN-001'}</h3>
            </div>
            <div className="bg-white/20 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">FORT BRANCH</div>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[1px] opacity-60 mb-2">AVAILABLE BALANCE</p>
              <div className="flex items-center gap-4">
                <h2 className="text-[22px] font-bold tracking-tighter">₹ {showBalance ? (user?.balance || 254892.50).toLocaleString('en-IN') : '•••••••'}</h2>
                <button onClick={() => setShowBalance(!showBalance)} className="p-1.5 bg-white/10 rounded-full">
                  {showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>
            <p className="text-[10px] font-medium opacity-40 tracking-widest uppercase">HDFC0000127</p>
          </div>
        </div>
      </div>

      <div className="px-5 mt-6 space-y-8">
        
        {/* 3. QUICK ACTIONS GRID (2x4 EXACT) */}
        <div style={{ backgroundColor: COLORS.cardBg }} className="rounded-[24px] p-8 shadow-sm border border-gray-100 grid grid-cols-4 gap-y-10 gap-x-2">
          <ServiceItem i={Send} label="TRANSFER" color="bg-blue-600" />
          <ServiceItem i={ArrowRightLeft} label="UPI PAY" color="bg-purple-600" />
          <ServiceItem i={Receipt} label="BILLPAY" color="bg-orange-500" />
          <ServiceItem i={Smartphone} label="RECHARGE" color="bg-green-600" />
          <ServiceItem i={CreditCard} label="CARDS" color="bg-indigo-600" />
          <ServiceItem i={Landmark} label="LOANS" color="bg-red-500" />
          <ServiceItem i={Briefcase} label="INVEST" color="bg-cyan-600" />
          <ServiceItem i={HeartPulse} label="INSURANCE" color="bg-pink-600" />
        </div>

        {/* 4. RECENT ACTIVITY (COMPACT) */}
        <section>
          <SectionTitle title="RECENT ACTIVITY" />
          <div className="space-y-3">
            {[
              { n: 'AMAZON INDIA', d: 'TODAY, 02:30 PM', a: -2499, i: SmartphoneNfc, c: 'bg-gray-100 text-gray-500' },
              { n: 'SALARY CREDIT', d: '12 MAY, 10:00 AM', a: 75000, i: ArrowUpRight, c: 'bg-green-50 text-green-600' },
              { n: 'SWIGGY ORDER', d: '11 MAY, 09:15 PM', a: -450, i: History, c: 'bg-red-50 text-red-600' }
            ].map((tx, i) => (
              <div key={i} style={{ backgroundColor: COLORS.cardBg }} className="p-5 rounded-[20px] shadow-sm flex justify-between items-center border border-gray-50">
                <div className="flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-xl ${tx.c} flex items-center justify-center`}><tx.i size={20} /></div>
                  <div>
                    <h5 style={{ color: COLORS.textPrimary }} className="text-[11px] font-bold uppercase tracking-tighter">{tx.n}</h5>
                    <p style={{ color: COLORS.textSecondary }} className="text-[10px] font-normal uppercase tracking-widest">{tx.d}</p>
                  </div>
                </div>
                <p style={{ color: tx.a > 0 ? COLORS.success : COLORS.textPrimary }} className="text-[13px] font-bold">
                  {tx.a > 0 ? '+' : '-'} ₹ {Math.abs(tx.a).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. SPENDING ANALYSIS (EXACT CHART CARD) */}
        <section>
          <SectionTitle title="SPENDING ANALYSIS" />
          <div style={{ backgroundColor: COLORS.cardBg }} className="p-8 rounded-[24px] shadow-sm border border-gray-50">
             <div className="h-40 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={[{v:10},{v:25},{v:15},{v:40},{v:20},{v:60}]}>
                   <Area type="monotone" dataKey="v" stroke={COLORS.gradBlue} strokeWidth={3} fillOpacity={0.1} fill={COLORS.gradBlue} />
                 </AreaChart>
               </ResponsiveContainer>
             </div>
             <div className="flex justify-between items-center mt-6 text-[10px] font-bold uppercase tracking-widest">
                <span style={{ color: COLORS.textSecondary }}>WEEKLY LIMIT</span>
                <span style={{ color: COLORS.gradBlue }}>₹ 2,750 USED</span>
             </div>
          </div>
        </section>

        {/* 6. OFFERS BANNER */}
        <section>
          <div style={{ backgroundColor: COLORS.gradPurple }} className="rounded-[24px] p-6 text-white shadow-lg flex justify-between items-center">
             <div><h4 className="font-bold text-[12px] uppercase tracking-tighter">5% UNLIMITED CASHBACK</h4><p className="text-[10px] font-medium opacity-60 uppercase mt-1">ON ALL TRAVEL BOOKINGS</p></div>
             <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"><Gift size={22} /></div>
          </div>
        </section>

        {/* 7. WEALTH & 8. UTILITIES (TWO COLUMNS) */}
        <div className="grid grid-cols-2 gap-4">
           <div style={{ backgroundColor: COLORS.cardBg }} className="p-6 rounded-[24px] border border-gray-100 shadow-sm">
              <h5 style={{ color: COLORS.primary }} className="text-[10px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2"><TrendingUp size={14} /> WEALTH</h5>
              <div style={{ color: COLORS.textSecondary }} className="space-y-3 text-[9px] font-semibold uppercase">
                 {['MUTUAL FUNDS', 'FIXED DEPOSIT'].map(t => <div key={t} className="flex justify-between">{t} <ChevronRight size={10}/></div>)}
              </div>
           </div>
           <div style={{ backgroundColor: COLORS.cardBg }} className="p-6 rounded-[24px] border border-gray-100 shadow-sm">
              <h5 style={{ color: COLORS.orange }} className="text-[10px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2"><Zap size={14} /> UTILITIES</h5>
              <div className="flex gap-2">
                 <div style={{ backgroundColor: '#FFF7ED', color: COLORS.orange }} className="w-8 h-8 rounded-lg flex items-center justify-center"><Zap size={16} /></div>
                 <div style={{ backgroundColor: '#EFF6FF', color: COLORS.gradBlue }} className="w-8 h-8 rounded-lg flex items-center justify-center"><Wifi size={16} /></div>
              </div>
           </div>
        </div>

        {/* 9. INSURANCE (DARK CARD) */}
        <section>
          <SectionTitle title="INSURANCE" />
          <div style={{ backgroundColor: COLORS.primary }} className="p-8 rounded-[24px] text-white flex justify-between items-center shadow-lg">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-blue-400"><ShieldCheck size={24} /></div>
                <div><h4 className="text-[11px] font-bold uppercase tracking-widest">MEDICAL COVER</h4><p className="text-[10px] font-medium opacity-40 uppercase tracking-widest mt-1">PREMIUM DUE IN 12 DAYS</p></div>
             </div>
             <ChevronRight size={16} className="opacity-30" />
          </div>
        </section>

        {/* 11. SUPPORT */}
        <section>
          <SectionTitle title="SUPPORT" />
          <div style={{ backgroundColor: COLORS.cardBg }} className="rounded-[24px] p-6 shadow-sm space-y-4">
             {[
               { i: MessageSquare, l: 'CHAT SUPPORT' },
               { i: Phone, l: 'HELPLINE 24X7' }
             ].map((h, i) => (
               <div key={i} className="flex justify-between items-center text-[10px] font-bold uppercase" style={{ color: COLORS.textPrimary }}>
                  <div className="flex items-center gap-4"><h.i size={18} className="opacity-20" /> {h.l}</div>
                  <ChevronRight size={16} className="opacity-10" />
               </div>
             ))}
          </div>
        </section>

        {/* 12. FOOTER */}
        <div className="py-16 text-center opacity-10 flex flex-col items-center">
           <h1 className="text-3xl font-black italic tracking-tighter" style={{ color: COLORS.primary }}>HDOC BANK</h1>
           <div className="mt-4 flex flex-col items-center gap-2">
             <div className="w-8 h-1 bg-blue-400 rounded-full"></div>
             <span className="text-[10px] font-bold uppercase tracking-[4px]">CONTINUES FURTHER</span>
             <ChevronRight size={16} className="rotate-90" />
           </div>
        </div>

      </div>

      {/* --- GLASSMORPHIC BOTTOM NAV (EXACT PROPORTIONS) --- */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white/90 backdrop-blur-xl border-t border-gray-100 h-24 flex justify-between items-center px-10 z-[1000] rounded-t-[40px] shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col items-center gap-1" style={{ color: COLORS.gradBlue }}>
          <LayoutDashboard size={22} strokeWidth={3} />
          <span className="text-[9px] font-bold uppercase tracking-widest">HOME</span>
        </div>
        <div className="flex flex-col items-center gap-1" style={{ color: '#CBD5E1' }}>
          <ArrowRightLeft size={22} />
          <span className="text-[9px] font-bold uppercase tracking-widest">PAY</span>
        </div>
        
        {/* CENTER SCAN BUTTON */}
        <div className="flex flex-col items-center -mt-12">
          <div style={{ backgroundColor: COLORS.primary }} className="w-16 h-16 rounded-full flex items-center justify-center text-white border-[4px] border-white shadow-2xl active:scale-95 transition-transform">
            <QrCode size={28} />
          </div>
          <span className="text-[9px] font-bold uppercase tracking-widest text-gray-300 mt-2">SCAN</span>
        </div>

        <div className="flex flex-col items-center gap-1" style={{ color: '#CBD5E1' }}>
          <Landmark size={22} />
          <span className="text-[9px] font-bold uppercase tracking-widest">SAVE</span>
        </div>
        <div onClick={() => setActiveTab('more')} className="flex flex-col items-center gap-1 cursor-pointer" style={{ color: '#CBD5E1' }}>
          <MoreHorizontal size={22} />
          <span className="text-[9px] font-bold uppercase tracking-widest">MORE</span>
        </div>
      </div>

      {/* --- MORE OVERLAY --- */}
      {activeTab === 'more' && (
        <div className="fixed inset-0 max-w-[430px] mx-auto bg-black/70 backdrop-blur-sm z-[5000] flex items-end animate-in fade-in">
           <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} className="bg-white w-full rounded-t-[45px] p-10 pb-16">
              <div className="flex justify-between items-center mb-10"><h3 style={{ color: COLORS.primary }} className="text-base font-bold uppercase tracking-tighter">HDOC PROTOCOL</h3><button onClick={() => setActiveTab('home')} className="text-gray-300 font-bold text-xs">CLOSE</button></div>
              <div className="space-y-4">
                 <div className="p-6 bg-gray-50 rounded-3xl flex justify-between items-center text-[10px] font-bold uppercase" style={{ color: COLORS.textPrimary }}><span className="flex items-center gap-4"><Settings size={18} className="opacity-20" /> SECURITY SETTINGS</span><ChevronRight size={16} className="opacity-20" /></div>
                 <button onClick={handleLogout} style={{ backgroundColor: '#FEF2F2', color: COLORS.danger }} className="w-full py-5 rounded-[2rem] font-bold uppercase text-[10px] tracking-widest shadow-sm">SECURE SIGN OUT</button>
              </div>
           </motion.div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
