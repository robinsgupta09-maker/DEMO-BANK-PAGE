import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Search, Bell, MessageCircle, User, CreditCard, Landmark, ShieldCheck, Zap, Star, ChevronRight, Smartphone, Send, Accessibility, ArrowLeft, ArrowRight, ArrowUp, X, Globe, Tablet, Phone, ShieldAlert, Award, Newspaper, ExternalLink, Shield, FileText, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [loginDropdown, setLoginDropdown] = useState(false);
  const [activeNavMenu, setActiveNavMenu] = useState(null);
  const [activeTopMenu, setActiveTopMenu] = useState(null);
  const [personaDropdown, setPersonaDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('Trending');
  
  // Hero Widget State
  const [categoryType, setCategoryType] = useState('Products');
  const [selectedCat, setSelectedCat] = useState('');
  const [selectedProd, setSelectedProd] = useState('');

  // EMI Calculator State
  const [amount, setAmount] = useState(1000000);
  const [tenure, setTenure] = useState(5);
  const [rate, setRate] = useState(8.5);
  const [emi, setEmi] = useState(0);

  useEffect(() => {
    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;
    const emiVal = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    setEmi(Math.round(emiVal));
  }, [amount, tenure, rate]);

  const topMenus = {
    'About Us': ['Overview', 'Board of Directors', 'Investor Relations', 'CSR', 'Careers'],
    'English': ['Hindi', 'Marathi', 'Tamil', 'Gujarati', 'Bengali']
  };

  const navMenus = {
    'Discover Products': ['Cards', 'Loans', 'Accounts', 'Investments', 'Insurance', 'Deposits'],
    'Need Help': ['Customer Care', 'Locate Us', 'Security Tips', 'Grievance Redressal', 'Download Forms'],
    'Better Money Choices': ['SmartBuy', 'Diners Club', 'PayZapp', 'HOFC Life'],
    'Offers': ['Festive Treats', 'Credit Card Offers', 'Debit Card Offers', 'Partner Offers']
  };

  const widgetData = {
    'Products': {
      'Accounts': ['Savings Account', 'Current Account', 'Salary Account', 'Fixed Deposit'],
      'Loans': ['Home Loan', 'Personal Loan', 'Car Loan', 'Gold Loan'],
      'Cards': ['Credit Card', 'Debit Card', 'Prepaid Card']
    },
    'Services': {
      'Digital Banking': ['NetBanking', 'MobileBanking', 'WhatsApp Banking'],
      'Customer Care': ['Register Complaint', 'Track Application']
    }
  };

  const handleApply = () => {
    if (selectedProd) navigate('/login');
    else alert('Please select a product');
  };

  const tabs = ['Trending', 'Accounts', 'Deposits', 'Cards', 'Loans', 'Insurance', 'Investments'];

  const solutionsData = {
    'Trending': [
      { title: 'Personal Loan', desc: 'Instant approval for all your dreams.', type: 'blue', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400', btn: 'Apply online' },
      { title: 'Digital Arrest Awareness', desc: 'Stay safe from online fraud.', type: 'white', isVigil: true, img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400', btn: 'Know More' },
      { title: 'Cardless EASYEMI', desc: 'Summer upgrades made easy.', type: 'white', isOffer: true, img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400', btn: 'Check Offer' }
    ]
  };

  const currentData = solutionsData[activeTab] || solutionsData['Trending'];

  const serviceCategories = [
    { title: 'Top Online Services', links: ['Update KYC', 'Mobile Update', 'PAN Update', 'Address Change', 'Account Transfer', 'Debit Card PIN', 'Cheque Book Request', 'FD Advice'] },
    { title: 'Account Services', links: ['Nomination', 'AePS Update', 'Account Grouping', 'Change Type', 'Stop Payment'] },
    { title: 'Deposits Services', links: ['FD Liquidation', 'RD Advice', 'Form 15 G/H', 'Break Deposit'] },
    { title: 'Card Services', links: ['Email Update', 'Mobile No Update', 'Manage Limits', 'Block Card'] },
  ];

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
      
      {/* --- HEADER --- */}
      <header className="bg-[#004a89] py-1.5 px-6 relative z-[3000]">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div onClick={() => navigate('/')} className="bg-white px-2 py-0.5 rounded-sm flex items-center gap-1 border border-white cursor-pointer shadow-sm">
               <div className="w-5 h-5 bg-[#004a89] relative"><div className="absolute top-0 right-0 w-1.5 h-1.5 bg-red-600"></div><div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-red-600"></div></div>
               <span className="text-[#004a89] font-black text-lg tracking-tighter uppercase">HOFC BANK</span>
            </div>
            <div className="hidden md:block">
               <button onClick={() => setPersonaDropdown(!personaDropdown)} className="bg-white/10 hover:bg-white/20 text-white rounded-sm px-3 py-1 items-center gap-2 text-[10px] font-bold flex uppercase transition-all tracking-tight border border-white/10">You are in Personal Banking <ChevronDown size={12} className={`transition-transform ${personaDropdown ? 'rotate-180' : ''}`} /></button>
            </div>
          </div>
          <div className="flex items-center gap-6 text-white text-[10px] font-black uppercase tracking-tight">
             {Object.keys(topMenus).map(menu => (
               <div key={menu} className="relative group">
                  <div onClick={() => setActiveTopMenu(activeTopMenu === menu ? null : menu)} className="flex items-center gap-1 cursor-pointer hover:opacity-70">{menu} <ChevronDown size={10} /></div>
                  {activeTopMenu === menu && (
                    <div className="absolute top-full right-0 mt-2 w-40 bg-white shadow-xl border border-gray-100 py-1 text-[#004a89] animate-in fade-in duration-200">
                       {topMenus[menu].map(item => (<div key={item} className="px-4 py-2 hover:bg-gray-50 cursor-pointer font-bold border-b border-gray-50 last:border-0">{item}</div>))}
                    </div>
                  )}
               </div>
             ))}
             <Accessibility size={16} className="cursor-pointer" />
             <div className="relative"><Bell size={16} className="cursor-pointer" /><div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full"></div></div>
          </div>
        </div>
      </header>

      <nav className="bg-white py-2 px-6 shadow-sm sticky top-0 z-[2000] border-b border-gray-100">
         <div className="max-w-[1400px] mx-auto flex justify-between items-center">
            <div className="hidden lg:flex gap-6 text-[#333] font-black text-[11px] uppercase tracking-tighter">
               {Object.keys(navMenus).map(menu => (
                 <div key={menu} className={`flex items-center gap-1 cursor-pointer hover:text-[#004a89] relative ${activeNavMenu === menu ? 'text-[#004a89]' : ''}`} onClick={() => setActiveNavMenu(activeNavMenu === menu ? null : menu)}>
                    {menu} <ChevronDown size={12} className={`transition-transform ${activeNavMenu === menu ? 'rotate-180' : ''}`} />
                    {activeNavMenu === menu && (
                      <div className="absolute top-full left-0 mt-3 w-56 bg-white shadow-2xl border border-gray-100 py-2 flex flex-col gap-0 animate-in slide-in-from-top-1 duration-200">
                         {navMenus[menu].map(item => (<div key={item} className="px-4 py-2 hover:bg-blue-50 text-[#004a89] text-[10px] font-black border-b border-gray-50 last:border-0">{item} ›</div>))}
                      </div>
                    )}
                 </div>
               ))}
            </div>
            <div className="flex items-center gap-4">
               <div className="relative w-56"><input type="text" placeholder="Search..." className="w-full bg-gray-50 border border-gray-100 py-1.5 pl-8 pr-4 rounded-sm text-[11px] focus:outline-none focus:border-[#004a89]" /><Search size={14} className="absolute left-2.5 top-2 text-gray-300" /></div>
               <div className="relative">
                  <button onClick={() => setLoginDropdown(!loginDropdown)} className="bg-[#ed1c24] text-white font-black py-2 px-6 rounded-sm text-xs flex items-center gap-2 hover:bg-red-700 uppercase shadow-md">LOGIN <ChevronDown size={16} /></button>
                  {loginDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-2xl border border-gray-100 z-[2500] rounded-sm overflow-hidden animate-in zoom-in duration-150">
                       <Link to="/login" className="block px-4 py-3 text-[10px] font-black border-b border-gray-100 hover:bg-gray-50 text-[#004a89] uppercase">NetBanking Login ›</Link>
                       <Link to="/admin-login" className="block px-4 py-3 text-[10px] font-black hover:bg-gray-50 text-[#004a89] uppercase">Admin Portal ›</Link>
                    </div>
                  )}
               </div>
            </div>
         </div>
      </nav>

      {/* --- HERO --- */}
      <section className="relative h-[440px] bg-[#f8f9fa] overflow-hidden">
         <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1920" alt="HOFC Hero" className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
         <div className="absolute inset-0 max-w-[1400px] mx-auto px-10 flex flex-col md:flex-row items-center justify-between">
            <div className="max-w-lg">
               <h1 className="text-white text-5xl font-black leading-tight mb-4 tracking-tighter uppercase">Experience <br/>HOFC Bank Differently</h1>
               <p className="text-white font-bold text-sm mb-8 uppercase tracking-[0.2em] opacity-80">NetBanking | MobileApp | WhatsApp</p>
               <div className="flex gap-3">
                  <button className="bg-white text-[#004a89] px-6 py-2.5 rounded-sm font-black text-[10px] uppercase shadow-xl hover:scale-105 transition-transform flex items-center gap-1">MobileApp <ChevronRight size={14} className="text-red-600" /></button>
                  <button className="bg-white text-[#004a89] px-6 py-2.5 rounded-sm font-black text-[10px] uppercase shadow-xl hover:scale-105 transition-transform flex items-center gap-1">NetBanking <ChevronRight size={14} className="text-red-600" /></button>
               </div>
            </div>
            <div className="bg-white p-6 rounded-sm shadow-2xl w-[400px] border-t-4 border-[#004a89]">
               <div className="flex gap-6 mb-6 uppercase font-black text-[10px] tracking-widest text-gray-400">
                  <label className={`flex items-center gap-2 cursor-pointer ${categoryType === 'Products' ? 'text-[#004a89]' : ''}`} onClick={() => setCategoryType('Products')}><div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${categoryType === 'Products' ? 'border-[#004a89]' : 'border-gray-200'}`}>{categoryType === 'Products' && <div className="w-2 h-2 bg-[#004a89] rounded-full"></div>}</div> Products</label>
                  <label className={`flex items-center gap-2 cursor-pointer ${categoryType === 'Services' ? 'text-[#004a89]' : ''}`} onClick={() => setCategoryType('Services')}><div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${categoryType === 'Services' ? 'border-[#004a89]' : 'border-gray-200'}`}>{categoryType === 'Services' && <div className="w-2.5 h-2.5 bg-[#004a89] rounded-full"></div>}</div> Services</label>
               </div>
               <div className="space-y-3 mb-8">
                  <div className="relative"><select className="w-full bg-[#f0f3f6] border border-gray-100 p-3.5 rounded-sm text-[11px] font-black appearance-none uppercase outline-none focus:border-[#004a89]" value={selectedCat} onChange={(e) => setSelectedCat(e.target.value)}><option value="">Select Category ...</option>{Object.keys(widgetData[categoryType]).map(cat => <option key={cat} value={cat}>{cat}</option>)}</select><ChevronDown className="absolute right-4 top-3.5 text-gray-300" size={16} /></div>
                  <div className="relative"><select className="w-full bg-[#f0f3f6] border border-gray-100 p-3.5 rounded-sm text-[11px] font-black appearance-none uppercase outline-none focus:border-[#004a89]" value={selectedProd} onChange={(e) => setSelectedProd(e.target.value)} disabled={!selectedCat}><option value="">Select Product ...</option>{selectedCat && widgetData[categoryType][selectedCat].map(prod => <option key={prod} value={prod}>{prod}</option>)}</select><ChevronDown className="absolute right-4 top-3.5 text-gray-300" size={16} /></div>
               </div>
               <div className="flex items-center justify-between"><button onClick={handleApply} className="bg-[#004a89] text-white px-10 py-2.5 rounded-sm font-black text-[10px] uppercase shadow-lg hover:bg-blue-800 transition-all">Apply Now</button><span className="text-[#004a89] font-black text-[10px] cursor-pointer hover:underline uppercase tracking-tight">Know More ›</span></div>
            </div>
         </div>
      </section>

      {/* --- SOLUTIONS --- */}
      <section className="py-16 px-10 bg-white">
        <div className="max-w-[1400px] mx-auto">
           <h2 className="text-3xl font-black text-[#004a89] text-center mb-8 tracking-tighter uppercase">Solutions tailor-made for you</h2>
           <div className="flex justify-center border-b border-gray-100 mb-10 font-black text-[12px] uppercase tracking-widest text-gray-400">
              <div className="flex gap-8">
                 {tabs.map(tab => (
                   <div key={tab} onClick={() => setActiveTab(tab)} className={`pb-3 cursor-pointer transition-all border-b-2 ${activeTab === tab ? 'text-[#004a89] border-[#ed1c24]' : 'border-transparent hover:text-[#004a89]'}`}>{tab}</div>
                 ))}
              </div>
           </div>
           <div className="grid md:grid-cols-3 gap-6">
              {currentData.map((item, idx) => (
                <div key={idx} className={`${item.type === 'blue' ? 'bg-[#e6f2ff] border-blue-50' : 'bg-white border-gray-100'} rounded-sm p-8 relative overflow-hidden flex flex-col justify-between border uppercase h-[300px] hover:shadow-lg transition-all`}>
                   <div className="relative z-10"><h3 className="text-xl font-black text-[#004a89] mb-2 tracking-tighter leading-tight">{item.title}</h3><p className={`${item.type === 'blue' ? 'text-[#004a89]' : 'text-gray-400'} text-[10px] font-black leading-tight max-w-[160px] tracking-tight`}>{item.desc}</p></div>
                   <img src={item.img} alt={item.title} className="absolute bottom-0 right-[-10px] w-[180px] h-auto object-contain z-0" />
                   <div className="mt-8 relative z-10"><button className="bg-[#004a89] text-white px-8 py-2 rounded-sm font-black text-[10px] uppercase shadow-md">Get Started ›</button></div>
                   {item.isVigil && <div className="absolute bottom-0 left-0 w-full h-10 bg-[#004a89] flex items-center px-6 gap-2 z-10"><ShieldAlert className="text-red-500" size={16} /><span className="text-white text-[9px] font-black uppercase tracking-widest">Vigil Aunty Tips</span></div>}
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* --- APP PROMO --- */}
      <section className="py-20 px-10 bg-[#003a6d] relative overflow-hidden text-white">
         <div className="max-w-[1400px] mx-auto flex items-center gap-16 relative z-10">
            <div className="flex-1">
               <h2 className="text-4xl font-black mb-6 tracking-tighter uppercase leading-tight">Bank in Your Pocket. <br/>Fast. Secure. Smart.</h2>
               <p className="text-sm opacity-60 mb-8 font-bold uppercase tracking-widest leading-relaxed">Manage accounts, pay bills, and invest on the go with our top-rated app.</p>
               <div className="flex gap-4">
                  <div className="bg-white/10 hover:bg-white/20 border border-white/10 p-3 px-6 rounded-sm flex items-center gap-3 cursor-pointer transition-all"><Smartphone size={24} /><div><p className="text-[8px] font-black opacity-60">App Store</p><p className="text-xs font-black uppercase">iOS Download</p></div></div>
                  <div className="bg-white/10 hover:bg-white/20 border border-white/10 p-3 px-6 rounded-sm flex items-center gap-3 cursor-pointer transition-all"><Tablet size={24} /><div><p className="text-[8px] font-black opacity-60">Play Store</p><p className="text-xs font-black uppercase">Android APK</p></div></div>
               </div>
            </div>
            <div className="hidden md:block w-96 relative"><img src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=800" alt="App" className="rounded-2xl shadow-2xl" /></div>
         </div>
      </section>

      {/* --- EMI & YELLOW GRID --- */}
      <section className="bg-[#ffcc33] py-20 px-10">
        <div className="max-w-[1400px] mx-auto">
           <div className="bg-white rounded-sm shadow-xl mb-12 flex flex-col md:flex-row overflow-hidden border-b-8 border-[#004a89]">
              <div className="p-12 flex-1 border-r border-gray-50">
                 <h2 className="text-2xl font-black text-[#004a89] mb-8 uppercase tracking-tighter">EMI Calculator</h2>
                 <div className="space-y-8">
                    <div className="space-y-4"><div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest"><span>Amount</span><span className="text-[#004a89] text-base">₹{amount.toLocaleString()}</span></div><input type="range" min="100000" max="10000000" step="100000" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#004a89]" /></div>
                    <div className="space-y-4"><div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest"><span>Tenure</span><span className="text-[#004a89] text-base">{tenure} Years</span></div><input type="range" min="1" max="30" step="1" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#ed1c24]" /></div>
                 </div>
              </div>
              <div className="bg-[#004a89] p-12 w-full md:w-80 text-white text-center flex flex-col justify-center">
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-50">Monthly EMI</p>
                 <div className="text-4xl font-black mb-8 tracking-tighter">₹ {emi.toLocaleString()}</div>
                 <button onClick={() => navigate('/login')} className="bg-[#ed1c24] text-white py-3 rounded-sm font-black uppercase text-[10px] tracking-widest">Apply Now ›</button>
              </div>
           </div>
           <div className="grid md:grid-cols-4 gap-4">
              {serviceCategories.map((cat, i) => (
                <div key={i} className="bg-white/40 p-6 border border-white/50 rounded-sm hover:bg-white transition-all group">
                   <h3 className="text-sm font-black text-[#004a89] mb-6 border-b-2 border-[#004a89] pb-2 uppercase tracking-tighter">{cat.title}</h3>
                   <ul className="space-y-3 mb-8 text-[11px] font-bold text-gray-700 uppercase tracking-tight">
                      {cat.links.map((link, j) => (<li key={j} className="hover:text-red-600 cursor-pointer flex items-center gap-2 group-hover:translate-x-1 transition-transform">› {link}</li>))}
                   </ul>
                   <button className="text-red-600 font-black text-[9px] uppercase tracking-widest hover:underline">View More</button>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* --- WEALTH & NEWS --- */}
      <section className="py-16 px-10 bg-white">
         <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-[#f8f9fa] p-10 rounded-sm border-l-4 border-[#004a89] hover:shadow-lg transition-all">
               <div className="bg-[#004a89] w-10 h-10 rounded-sm flex items-center justify-center text-white mb-6"><Award size={20} /></div>
               <h3 className="text-2xl font-black text-[#004a89] mb-4 uppercase tracking-tighter">Wealth Management</h3>
               <p className="text-[11px] font-black text-gray-400 uppercase leading-relaxed mb-8 tracking-tight">Expert advisory for elite portfolio management and high-yield wealth strategies.</p>
               <button className="text-[#004a89] font-black text-[10px] uppercase tracking-widest flex items-center gap-1 hover:underline">Explore ›</button>
            </div>
            <div className="bg-[#f8f9fa] p-10 rounded-sm border-l-4 border-red-600 hover:shadow-lg transition-all">
               <div className="bg-red-600 w-10 h-10 rounded-sm flex items-center justify-center text-white mb-6"><Newspaper size={20} /></div>
               <h3 className="text-2xl font-black text-[#004a89] mb-4 uppercase tracking-tighter">News Center</h3>
               <p className="text-[11px] font-black text-gray-400 uppercase leading-relaxed mb-8 tracking-tight">Latest updates on results, partnerships, and product launches across the country.</p>
               <button className="text-[#004a89] font-black text-[10px] uppercase tracking-widest flex items-center gap-1 hover:underline">Read News ›</button>
            </div>
         </div>
      </section>

      {/* --- WAYS TO BANK (MOVED TO BOTTOM) --- */}
      <section className="py-16 px-10 bg-[#f4f7f9] border-y border-gray-100">
         <div className="max-w-[1400px] mx-auto">
            <h2 className="text-3xl font-black text-[#004a89] mb-10 tracking-tighter uppercase text-center">Ways to Bank with Us</h2>
            <div className="grid md:grid-cols-4 gap-4">
               {[
                 { icon: Globe, title: 'NetBanking', desc: 'Secure online banking 24/7.' },
                 { icon: Smartphone, title: 'Mobile App', desc: 'Smart banking on your phone.' },
                 { icon: MessageCircle, title: 'WhatsApp', desc: 'Instant chat-based support.' },
                 { icon: Phone, title: 'Phone Banking', desc: 'Expert call-based support.' }
               ].map((item, i) => (
                 <div key={i} className="bg-white p-6 rounded-sm shadow-sm hover:shadow-md border border-gray-100 group cursor-pointer transition-all flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-[#004a89] mb-4 group-hover:bg-[#004a89] group-hover:text-white transition-all"><item.icon size={20} /></div>
                    <h3 className="text-[13px] font-black text-[#333] mb-2 uppercase tracking-tight">{item.title}</h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight mb-4">{item.desc}</p>
                    <div className="text-[#004a89] font-black text-[9px] uppercase tracking-widest flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">Learn More <ChevronRight size={10} /></div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#0a0c10] pt-20 pb-10 px-10 border-t-8 border-red-600 text-white">
        <div className="max-w-[1400px] mx-auto">
           <div className="grid md:grid-cols-4 gap-12 mb-16">
              <div className="space-y-6">
                 <div className="bg-white px-2 py-0.5 rounded-sm inline-flex items-center gap-1 border border-white"><div className="w-4 h-4 bg-[#004a89] relative"><div className="absolute top-0 right-0 w-1 h-1 bg-red-600"></div><div className="absolute bottom-0 left-0 w-1 h-1 bg-red-600"></div></div><span className="text-[#004a89] font-black text-sm tracking-tighter uppercase">HOFC BANK</span></div>
                 <p className="text-[10px] font-bold text-gray-500 uppercase leading-relaxed tracking-widest opacity-60">India's leading private sector bank providing a wide range of financial services.</p>
              </div>
              {['Useful Links', 'Support', 'Legal', 'Connect'].map((title, i) => (
                <div key={i} className="space-y-6">
                   <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40">{title}</h4>
                   <ul className="space-y-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                      {['Security Tips', 'Grievance Redressal', 'Privacy Policy', 'Fair Practices', 'Investor Relations'].map(link => (<li key={link} className="hover:text-red-500 cursor-pointer flex items-center gap-2 transition-all">› {link}</li>))}
                   </ul>
                </div>
              ))}
           </div>
           <div className="pt-10 border-t border-white/5 flex justify-between items-center text-[9px] font-black text-gray-600 uppercase tracking-[0.4em]">
              <p>© 2024 HOFC BANK. CIN: L65920MH1994PLC080618</p>
              <div className="flex gap-6"><Globe size={14} className="hover:text-white transition-colors" /><MessageCircle size={14} className="hover:text-white transition-colors" /><Shield size={14} className="hover:text-white transition-colors" /></div>
           </div>
        </div>
        <div onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="fixed bottom-10 right-10 w-10 h-10 bg-red-600 text-white flex items-center justify-center rounded-sm cursor-pointer shadow-xl hover:bg-red-700 transition-all z-[4000]"><ArrowUp size={20} /></div>
      </footer>
    </div>
  );
};

export default LandingPage;
