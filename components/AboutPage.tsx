import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Target, ShieldCheck, Activity, Layers, Zap, 
  CheckCircle2, Info, Globe, Sparkles, Compass, Shuffle, 
  TrendingUp, Handshake, Award, ChevronDown, ArrowUpRight, 
  Search, Code2, Paintbrush, Clapperboard, Cpu, Check, Eye
} from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
}

type FaqCategory = 'all' | 'timeline' | 'process' | 'support';

const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaqCategory, setActiveFaqCategory] = useState<FaqCategory>('all');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const stats = [
    { label: "Stability Rate", val: "99.9%", desc: "Bulletproof deployments and structural integrity." },
    { label: "Asset Precision", val: "Pixel Perfect", desc: "No generic templates. Every visual is custom." },
    { label: "Delivery Grade", val: "Elite", desc: "Fast-track execution with minimal revision overhead." }
  ];

  const operatingIntent = [
    "Deliver professionally crafted digital solutions",
    "Maintain accuracy, consistency, and quality standards",
    "Communicate with clarity at every project stage",
    "Develop solutions aligned with practical business needs",
    "Support long-term digital growth for clients"
  ];

  const professionalStandards = [
    { 
      title: "Accuracy", 
      desc: "Work is executed with deep attention to clean layouts and technical structure.", 
      icon: Compass,
      gradient: "from-blue-500/20 via-indigo-500/5 to-transparent"
    },
    { 
      title: "Accountability", 
      desc: "Each project is handled with direct responsibility and clear developer ownership.", 
      icon: ShieldCheck,
      gradient: "from-emerald-500/20 via-teal-500/5 to-transparent"
    },
    { 
      title: "Clarity in Process", 
      desc: "Workflows are completely transparent, structured, and predictable from day one.", 
      icon: Shuffle,
      gradient: "from-brandPrimary/20 via-pink-500/5 to-transparent"
    },
    { 
      title: "Sustainable Growth", 
      desc: "Architectures are engineered for longevity, allowing seamless expansion as you scale.", 
      icon: TrendingUp,
      gradient: "from-amber-500/20 via-orange-500/5 to-transparent"
    },
    { 
      title: "Client Alignment", 
      desc: "Every design and line of code is structured explicitly to achieve your business goals.", 
      icon: Handshake,
      gradient: "from-purple-500/20 via-fuchsia-500/5 to-transparent"
    },
    { 
      title: "Execution Excellence", 
      desc: "We hold ourselves to world-class standards, refusing average or generic output.", 
      icon: Award,
      gradient: "from-red-500/20 via-rose-500/5 to-transparent"
    }
  ];

  const faqData = [
    { 
      q: "How long does a project typically take?", 
      a: "Graphic Design projects take 5–10 days, Web Development takes 15–30 days depending on complexity, and Cinematic Video Editing takes 2–4 days. Timelines are customized per scope and finalized before kick-off.",
      category: "timeline" 
    },
    { 
      q: "How are project revisions handled?", 
      a: "We offer 3 comprehensive review rounds during our development and design milestones. This structured feedback loop keeps us completely aligned and avoids out-of-scope delays.", 
      category: "process"
    },
    { 
      q: "Is ongoing support available after project delivery?", 
      a: "Yes, we provide 30 days of complimentary support after launch for any minor fixes. Long-term updates, hosting management, or content editing plans are available based on your operational needs.", 
      category: "support"
    },
    { 
      q: "Do we get ownership of the design assets and source files?", 
      a: "Absolutely. Upon final project settlement, full intellectual property and high-resolution master design/code assets are securely delivered directly to you.", 
      category: "support"
    },
    { 
      q: "What tools do you use for project coordination?", 
      a: "We favor ultra-clear communication. We use structured Figma draft files, staging links for live website review, and direct channels (WhatsApp/Email) to provide constant updates without meeting fatigue.", 
      category: "process"
    }
  ];

  const filteredFaqs = faqData.filter(faq => {
    const matchesSearch = faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeFaqCategory === 'all' || faq.category === activeFaqCategory;
    return matchesSearch && matchesCategory;
  });

  const splitText = (text: string, delayBase = 0) => text.split(" ").map((word, i) => (
    <motion.span
      key={i}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: delayBase + (i * 0.08), 
        ease: [0.23, 1, 0.32, 1] 
      }}
      className="inline-block mr-[0.25em]"
    >
      {word}
    </motion.span>
  ));

  return (
    <div className="min-h-screen bg-brandSurface-light dark:bg-brandSurface-dark text-black dark:text-white transition-colors duration-1000 overflow-x-hidden relative">
      
      {/* 1. Dynamic Background Mesh Auras */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10vw] right-[-10vw] w-[65vw] h-[65vh] bg-brandPrimary/10 dark:bg-brandPrimary/15 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-10vw] left-[-10vw] w-[50vw] h-[50vh] bg-blue-500/5 dark:bg-blue-500/10 blur-[130px] rounded-full" />
        
        {/* Subtle grid backdrop */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.015] transition-all" 
          style={{ 
            backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', 
            backgroundSize: '50px 50px' 
          }} 
        />
      </div>

      {/* 2. Cinematic Hero Section */}
      <section className="pt-36 pb-20 px-6 md:px-12 max-w-[95rem] mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-3 text-brandPrimary dark:text-brandPrimary-light font-black uppercase tracking-[0.4em] text-[10px] mb-12 hover:gap-5 transition-all group font-mono py-2 px-4 rounded-full bg-brandPrimary/5 border border-brandPrimary/10 hover:bg-brandPrimary hover:text-white"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Exit Protocol</span>
        </motion.button>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-6 items-end">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-px bg-brandPrimary" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.6em] text-brandPrimary/60 dark:text-brandPrimary-light/60">
                Registry Entry // System.About_v3.2
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-display font-extrabold uppercase tracking-tighter leading-[0.8] text-black dark:text-white">
              <div className="overflow-hidden block">
                {splitText("DIGITAL", 0.1)}
              </div>
              <div className="overflow-hidden flex flex-wrap items-baseline gap-x-3 mt-1 sm:mt-3">
                <span className="text-brandPrimary italic font-serif lowercase font-normal font-serif">alchemy</span>
                <span className="block">{splitText("STUDIO", 0.5)}</span>
              </div>
            </h1>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end text-left border-l-2 border-brandPrimary/20 pl-6 lg:pl-8 py-2">
            <p className="text-lg md:text-xl text-black/60 dark:text-white/40 leading-relaxed font-light">
              AG Viztek Studio is a premium digital design and engineering practice. We translate ambitious branding, structural code, and cinematic video concepts into <span className="text-black dark:text-white font-bold">high-impact visual assets</span>.
            </p>
          </div>
        </div>

        {/* Quick anchoring links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-20 pt-8 border-t border-black/5 dark:border-white/5">
          {[
            { label: "01 // Founder Spotlight", target: "founder" },
            { label: "02 // Standards Grid", target: "standards" },
            { label: "03 // FAQs & Inquiry", target: "faqs" }
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                const el = document.getElementById(item.target);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-left py-3 px-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] hover:bg-brandPrimary/5 border border-black/5 dark:border-white/5 hover:border-brandPrimary/20 transition-all group font-mono text-[9px] uppercase tracking-wider text-black/50 dark:text-white/40 hover:text-brandPrimary dark:hover:text-brandPrimary-light"
            >
              <div className="flex justify-between items-center">
                <span>{item.label}</span>
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Founder Spotlight (Akash) */}
      <section id="founder" className="py-28 px-6 md:px-12 border-y border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01]">
        <div className="max-w-[90rem] mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Interactive Technical ID Card */}
            <div className="lg:col-span-7 space-y-8">
              <div className="flex items-center gap-2">
                <Cpu size={16} className="text-brandPrimary" />
                <span className="text-[10px] font-mono tracking-widest uppercase opacity-50">SYSTEM_NODE // ARCHITECT_PROFILES</span>
              </div>
              
              <div className="p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-white/95 dark:bg-brandCard-dark/90 backdrop-blur-md border border-black/5 dark:border-white/5 shadow-2xl relative overflow-hidden group">
                {/* Background ID scanning line */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brandPrimary to-transparent opacity-30 group-hover:animate-pulse" />
                
                {/* Header Profile Badge */}
                <div className="flex items-center justify-between pb-6 border-b border-black/5 dark:border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brandPrimary/10 border border-brandPrimary/20 flex items-center justify-center font-display font-black text-brandPrimary text-lg">
                      AV
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl leading-tight">Akash</h3>
                      <p className="text-[10px] font-mono text-black/40 dark:text-white/40 tracking-wider uppercase">Lead Creator & Founder</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      <span className="text-[8px] font-mono text-emerald-500 font-bold uppercase tracking-widest">Active</span>
                    </div>
                  </div>
                </div>

                {/* Body Meta Details */}
                <div className="space-y-6 pt-6 font-mono text-xs">
                  <div className="grid grid-cols-3 gap-2 pb-4 border-b border-black/[0.03] dark:border-white/[0.03]">
                    <span className="text-black/40 dark:text-white/30 text-[10px] uppercase">Specialty</span>
                    <span className="col-span-2 text-black/80 dark:text-white/80 font-bold">Web Engineering, Brand Identity, Film Editing</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pb-4 border-b border-black/[0.03] dark:border-white/[0.03]">
                    <span className="text-black/40 dark:text-white/30 text-[10px] uppercase">Directives</span>
                    <span className="col-span-2 text-black/80 dark:text-white/80 font-bold">Structured layouts, fast page loads, high retention narratives</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-black/40 dark:text-white/30 text-[10px] uppercase">Current Node</span>
                    <span className="col-span-2 text-black/80 dark:text-white/80 font-bold">Nagercoil, TN, IN // Globetrotter ready</span>
                  </div>
                </div>

                {/* Personal Intro Text */}
                <p className="mt-8 text-base text-black/60 dark:text-white/40 font-light leading-relaxed italic border-l-2 border-brandPrimary/30 pl-4">
                  "I started AG Viztek Studio to bypass the friction of conventional agency structures. I build fast, clean web solutions, engineer original vector assets, and edit highly engaging visual stories myself—ensuring direct communication and uncompromising quality."
                </p>
                
                {/* Signature */}
                <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                  <span className="text-[9px] font-mono opacity-30">AUTHENTICATED CREDENTIAL // ARCH.01</span>
                  <span className="font-script text-2xl text-brandPrimary select-none rotate-[-5deg]">Akash</span>
                </div>
              </div>
            </div>

            {/* Right: Founder Stats Stacked Vertically */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <Activity size={16} className="text-brandPrimary" />
                <span className="text-[10px] font-mono tracking-widest uppercase opacity-50">SYSTEM_METRICS // PERFORMANCE_LOGS</span>
              </div>
              
              {stats.map((stat, i) => (
                <div 
                  key={i} 
                  className="p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] bg-white/95 dark:bg-brandCard-dark/80 backdrop-blur-md border border-black/5 dark:border-white/5 hover:border-brandPrimary/20 hover:bg-brandPrimary/[0.01] transition-all duration-300 relative group overflow-hidden shadow-xl"
                >
                  <div className="absolute inset-y-0 left-0 w-1 bg-brandPrimary opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex justify-between items-baseline mb-2">
                    <div className="text-4xl font-display font-black text-brandPrimary dark:text-brandPrimary-light">{stat.val}</div>
                    <span className="text-[9px] font-mono text-black/30 dark:text-white/30 tracking-widest uppercase">[ LOG.0{i + 1} ]</span>
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-widest font-bold text-black/70 dark:text-white/60">{stat.label}</div>
                  <p className="text-xs text-black/45 dark:text-white/30 font-light mt-2 leading-relaxed">{stat.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>



      {/* 5. Immersive Brand Philosophy / Mission Statement */}
      <section className="relative w-full py-32 bg-brandPrimary text-white overflow-hidden shadow-2xl">
        {/* Subtle decorative dot pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1.5px, transparent 1.5px)', backgroundSize: '35px 35px' }} />
        <div className="max-w-[85rem] mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center space-y-8">
            <motion.div 
              initial={{ scale: 0.85, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30"
            >
              <Target size={24} className="text-white animate-pulse" />
            </motion.div>
            <div className="space-y-4">
              <h2 className="text-[10px] font-mono font-black uppercase tracking-[0.8em] opacity-60">Architectural Directive</h2>
              <p className="text-3xl md:text-6xl font-display font-bold leading-[0.95] tracking-tighter uppercase max-w-4xl">
                To build high-performance <span className="italic font-serif lowercase font-normal opacity-85">digital structures</span> using strict modular blueprints and absolute design intent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Professional Standards Grid */}
      <section id="standards" className="py-32 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-[95rem] mx-auto relative z-10">
          <div className="text-center mb-20 space-y-4">
             <div className="inline-flex items-center gap-3 px-4 py-2 bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5 rounded-full text-[10px] font-mono tracking-wider uppercase font-bold text-black/50 dark:text-white/40">
               <Layers size={14} />
               <span>Standards Suite // System Architecture v3.5</span>
             </div>
             <h2 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter">
               Professional <span className="text-brandPrimary italic font-serif lowercase font-normal">standards</span>
             </h2>
             <p className="text-[10px] font-mono uppercase tracking-[0.5em] opacity-40">Absolute execution principles</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {professionalStandards.map((std, i) => {
              const IconComponent = std.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.06 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-white dark:bg-brandCard-dark/80 backdrop-blur-md border border-black/5 dark:border-white/5 flex flex-col gap-6 group hover:border-brandPrimary/30 transition-all duration-500 shadow-xl relative overflow-hidden"
                >
                  {/* Subtle inner card light aura on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-tr ${std.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                  {/* Serial Number */}
                  <div className="flex justify-between items-center text-[9px] font-mono text-black/40 dark:text-white/30 tracking-widest uppercase">
                    <span>[ Standard // 0{i + 1} ]</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-brandPrimary font-bold">Active</span>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-brandPrimary/5 text-brandPrimary flex items-center justify-center group-hover:bg-brandPrimary group-hover:text-white group-hover:scale-105 transition-all duration-500 shadow-sm shrink-0">
                    <IconComponent size={20} />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-display font-bold uppercase tracking-tight text-black dark:text-white group-hover:text-brandPrimary transition-colors duration-300">
                      {std.title}
                    </h3>
                    <p className="text-sm text-black/50 dark:text-white/30 font-light leading-relaxed italic">
                      {std.desc}
                    </p>
                  </div>

                  {/* Accent bottom hover line */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-brandPrimary/40 via-brandPrimary to-brandPrimary/40 group-hover:w-2/3 transition-all duration-500 rounded-full" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Searchable FAQ Engine */}
      <section id="faqs" className="py-32 px-6 md:px-12 max-w-[95rem] mx-auto border-t border-black/5 dark:border-white/5 bg-black/[0.005] dark:bg-white/[0.002]">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Visual Console & Inquiry Trigger */}
          <div className="lg:col-span-5 lg:sticky lg:top-40 space-y-8 text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-brandPrimary" />
              <span className="text-[10px] font-mono font-black uppercase tracking-[0.6em] text-brandPrimary/60 dark:text-brandPrimary-light/60">
                Registry Entry // 06
              </span>
            </div>
            
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-brandPrimary/10 border border-brandPrimary/15 flex items-center justify-center text-brandPrimary shadow-sm">
                <Info size={24} />
              </div>
              
              <h2 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter leading-none">
                Information <br/>
                <span className="text-brandPrimary italic font-serif lowercase font-normal block mt-2">
                  hub
                </span>
              </h2>
              
              <p className="text-base text-black/50 dark:text-white/40 leading-relaxed font-light max-w-md pt-2">
                Have a specialized technical inquiry or operational question? Use our searchable hub to instantly resolve questions, or exit directly to connection protocols.
              </p>
            </div>
            
            <div className="pt-4 flex flex-wrap gap-4">
              <button 
                onClick={onBack}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-black/5 dark:bg-white/[0.03] hover:bg-brandPrimary hover:text-white border border-black/5 dark:border-white/5 rounded-2xl text-[10px] font-mono tracking-widest uppercase font-bold transition-all duration-300 group"
              >
                <span>Initiate Connection</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
          
          {/* Right Column: Searchable Accordion Column */}
          <div className="lg:col-span-7 space-y-6 w-full">
            {/* Search and Category Filter Suite */}
            <div className="p-4 md:p-6 rounded-2xl md:rounded-[2rem] bg-white/80 dark:bg-brandCard-dark/80 backdrop-blur-md border border-black/5 dark:border-white/5 space-y-4">
              {/* Text Search Input */}
              <div className="relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30 dark:text-white/30" />
                <input 
                  type="text"
                  placeholder="Search protocols & FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 focus:border-brandPrimary/30 rounded-xl text-xs font-mono text-black dark:text-white focus:outline-none transition-colors"
                />
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-black/5 dark:border-white/5">
                {(['all', 'timeline', 'process', 'support'] as FaqCategory[]).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveFaqCategory(cat);
                      setOpenFaq(null);
                    }}
                    className={`px-4 py-2 rounded-lg text-[9px] font-mono uppercase tracking-wider transition-all ${
                      activeFaqCategory === cat 
                        ? 'bg-brandPrimary text-white shadow-sm'
                        : 'bg-black/[0.03] dark:bg-white/[0.03] hover:bg-black/5 dark:hover:bg-white/5 text-black/50 dark:text-white/40'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Accordion Stream */}
            <div className="space-y-4">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((item, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div 
                      key={i} 
                      className={`rounded-2xl md:rounded-[2.25rem] border transition-all duration-500 overflow-hidden ${
                        isOpen 
                          ? 'bg-white dark:bg-brandCard-dark border-brandPrimary/30 shadow-[0_30px_60px_rgba(130,77,105,0.06)]' 
                          : 'bg-black/[0.02] dark:bg-white/[0.02] border-black/5 dark:border-white/5 hover:border-brandPrimary/25'
                      }`}
                    >
                      <button 
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        className="w-full p-6 md:p-8 flex items-center justify-between text-left group gap-6"
                      >
                        <span className={`text-base md:text-lg font-bold transition-colors duration-300 leading-snug ${
                          isOpen ? 'text-brandPrimary' : 'text-black/85 dark:text-white/85'
                        }`}>
                          {item.q}
                        </span>
                        
                        {/* Concentric rotational indicator */}
                        <div className="relative shrink-0">
                          {isOpen && (
                            <motion.span 
                              layoutId={`pulsing-ring-${i}`}
                              className="absolute inset-0 rounded-full bg-brandPrimary/10 border border-brandPrimary/20 scale-[1.5]"
                              animate={{ scale: [1.3, 1.6, 1.3], opacity: [0.6, 1, 0.6] }}
                              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                            />
                          )}
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500 ${
                            isOpen 
                              ? 'bg-brandPrimary border-brandPrimary text-white shadow-md rotate-180' 
                              : 'bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 text-black/40 dark:text-white/40'
                          }`}>
                            <ChevronDown size={16} />
                          </div>
                        </div>
                      </button>
                      
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ 
                              height: 'auto', 
                              opacity: 1,
                              transition: {
                                height: { type: "spring", stiffness: 280, damping: 26 },
                                opacity: { duration: 0.35 }
                              }
                            }}
                            exit={{ 
                              height: 0, 
                              opacity: 0,
                              transition: {
                                height: { duration: 0.22, ease: "easeInOut" },
                                opacity: { duration: 0.15 }
                              }
                            }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 md:px-8 pb-6 md:pb-8 pt-1 text-left">
                              <div className="border-t border-black/5 dark:border-white/5 pt-5 flex flex-col gap-3">
                                <div className="text-[8px] font-mono text-brandPrimary tracking-widest uppercase font-bold">
                                  [ Registry category // {item.category.toUpperCase()} ]
                                </div>
                                <motion.p 
                                  initial={{ y: 6, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  transition={{ delay: 0.08, duration: 0.4 }}
                                  className="text-sm md:text-base text-black/60 dark:text-white/40 leading-relaxed font-light pl-4 border-l-2 border-brandPrimary/30"
                                >
                                  {item.a}
                                </motion.p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })
              ) : (
                <div className="py-12 text-center rounded-2xl md:rounded-[2.25rem] border border-dashed border-black/10 dark:border-white/10 space-y-3">
                  <div className="text-black/30 dark:text-white/30 text-sm font-mono">// NO APPLICABLE PROTOCOLS FOUND</div>
                  <button 
                    onClick={() => { setSearchQuery(''); setActiveFaqCategory('all'); }}
                    className="px-4 py-2 bg-brandPrimary text-white text-[10px] font-mono rounded-xl uppercase tracking-wider"
                  >
                    Reset Filter
                  </button>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </section>

      {/* 8. Studio Registry Footer / Blueprint CTA */}
      <section className="py-24 px-6 md:px-12 bg-black/[0.02] dark:bg-black/30 border-t border-black/5 dark:border-white/5 relative overflow-hidden">
        {/* Subtle grid engineering background overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.01] pointer-events-none" 
          style={{ 
            backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
          }} 
        />
        
        <div className="max-w-[90rem] mx-auto text-center space-y-10 relative z-10">
          <div className="space-y-4">
            <h3 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tight">READY TO FORGE BRAND VALUE?</h3>
            <p className="text-sm text-black/50 dark:text-white/40 max-w-xl mx-auto font-light">
              Skip traditional overhead and align directly with high-performance web engineering and original custom visual assets.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={onBack}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brandPrimary to-brandPrimary-dark text-white rounded-full font-mono text-[10px] font-bold tracking-widest uppercase transition-all shadow-xl shadow-brandPrimary/20 hover:scale-103"
            >
              EXECUTE HANDSHAKE
            </button>
          </div>

          <div className="pt-8 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono opacity-40">
            <span>AG VIZTEK STUDIO © 2026 // ALL ARCHITECT RIGHTS REGISTERED</span>
            <span>BUILD_NODE_HASH_77490F</span>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
