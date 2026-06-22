import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Loader2, Mail, MapPin, ArrowLeft, MessageCircle, ArrowRight, Zap, ShieldCheck, Clock, Shield, Terminal, Sparkles } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

interface ContactPageProps {
  onBack: () => void;
}

const Counter = ({ value, duration = 2, delay = 0 }: { value: string; duration?: number; delay?: number }) => {
  const count = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState("0");
  
  const numberMatch = value.match(/(\d+(\.\d+)?)/);
  const targetNumber = numberMatch ? parseFloat(numberMatch[0]) : 0;
  const suffix = value.replace(numberMatch ? numberMatch[0] : "", "");
  const prefix = value.startsWith(suffix) && suffix !== "" ? suffix : "";
  const actualSuffix = prefix ? "" : suffix;

  useEffect(() => {
    if (!numberMatch) {
      setDisplayValue(value);
      return;
    }

    const controls = animate(count, targetNumber, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        if (targetNumber % 1 === 0) {
          setDisplayValue(Math.floor(latest).toString());
        } else {
          setDisplayValue(latest.toFixed(1));
        }
      }
    });

    return () => controls.stop();
  }, [targetNumber, duration, delay, value]);

  return (
    <span>
      {prefix}{displayValue}{actualSuffix}
    </span>
  );
};

const SERVICES_LIST = [
  { id: 'web', label: '💻 Web Engineering' },
  { id: 'design', label: '🎨 Brand Identity' },
  { id: 'video', label: '🎬 Cinematic Motion' },
  { id: 'full', label: '💎 Full Digital Suite' }
];

const BUDGET_TIERS = [
  { id: 'starter', label: '< ₹5k', desc: 'Starter Tier' },
  { id: 'pro', label: '₹5k - ₹15k', desc: 'Growth Tier' },
  { id: 'enterprise', label: '₹15k+', desc: 'Elite Enterprise' }
];

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedService, setSelectedService] = useState('web');
  const [selectedBudget, setSelectedBudget] = useState('pro');
  const [projectBrief, setProjectBrief] = useState('');

  const [status, setStatus] = useState<'idle' | 'transmitting' | 'success'>('idle');
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    '[SYSTEM] Uplink channel initialized on SECURE_GATEWAY_NODE.',
    '[SYSTEM] Ready for transmission brief...'
  ]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setConsoleLogs(prev => {
      const next = [...prev, `[${timestamp}] ${msg}`];
      if (next.length > 5) return next.slice(next.length - 5);
      return next;
    });
  };

  // Triggers logs when state updates
  useEffect(() => {
    if (name.trim()) {
      addLog(`[STATE] Client identifier registered: "${name}"`);
    }
  }, [name]);

  useEffect(() => {
    if (email.trim()) {
      addLog(`[NETWORK] Uplink routing set: ${email}`);
    }
  }, [email]);

  useEffect(() => {
    const svc = SERVICES_LIST.find(s => s.id === selectedService);
    if (svc) {
      addLog(`[ROUTE] Target protocol selected: ${svc.label.split(' ')[1]}`);
    }
  }, [selectedService]);

  useEffect(() => {
    const bud = BUDGET_TIERS.find(b => b.id === selectedBudget);
    if (bud) {
      addLog(`[VALUATION] Budget parameters defined: ${bud.label}`);
    }
  }, [selectedBudget]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('transmitting');
    addLog('[NETWORK] Securing socket connection...');

    // Handshake animation simulation timeline
    setTimeout(() => addLog('[COMPILER] Packing client request payload...'), 350);
    setTimeout(() => addLog('[SECURITY] Encrypting with SHA-256 standard...'), 700);
    setTimeout(() => addLog('[GATEWAY] Routing node: Chunkankadai, TN, IN...'), 1100);
    setTimeout(() => addLog('[NETWORK] Completing digital handshake...'), 1450);
    setTimeout(() => {
      addLog('[SYSTEM] Transmission confirmed: 200 OK.');
      setStatus('success');
    }, 1800);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setSelectedService('web');
    setSelectedBudget('pro');
    setProjectBrief('');
    setStatus('idle');
    setConsoleLogs([
      '[SYSTEM] Socket refreshed.',
      '[SYSTEM] Ready for new transmission brief...'
    ]);
  };

  const stats = [
    { label: "Active Nodes", val: "24/7" },
    { label: "Completion Rate", val: "100%" },
    { label: "Global Reach", val: "Wide" },
    { label: "Trust Score", val: "A+" }
  ];

  return (
    <div className="min-h-screen bg-brandSurface-light dark:bg-brandSurface-dark text-black dark:text-white transition-colors duration-1000 pt-24 pb-12 overflow-x-hidden relative">
      
      {/* Immersive Floating Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
             style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '45px 45px' }} />
        <div className="absolute top-1/3 left-[-10%] w-[50vw] h-[50vh] bg-brandPrimary/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-[-10%] w-[45vw] h-[45vh] bg-brandPrimary/5 blur-[120px] rounded-full pointer-events-none" />
      </div>

      <div className="max-w-[85rem] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Dynamic Header Area */}
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-black/5 dark:border-white/5 pb-8">
          <div className="space-y-4 text-left">
            <motion.button 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={onBack}
              className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-brandPrimary hover:gap-5 transition-all group font-mono py-2 px-4 rounded-full bg-brandPrimary/5 border border-brandPrimary/10 hover:bg-brandPrimary hover:text-white"
            >
              <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
              Return Home
            </motion.button>
            
            <div className="flex items-center gap-3">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandPrimary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brandPrimary"></span>
              </div>
              <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em] opacity-40">Uplink Gateway Ready</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-extrabold uppercase tracking-tighter leading-none text-black dark:text-white">
              Configure <span className="text-brandPrimary italic font-serif lowercase font-normal font-serif">uplink</span>
            </h1>
          </div>
          
          <div className="flex flex-wrap gap-4">
             <div className="px-5 py-3 rounded-2xl bg-white/70 dark:bg-brandCard-dark/80 backdrop-blur-md border border-black/5 dark:border-white/5 flex items-center gap-3 shadow-sm hover:border-brandPrimary/20 transition-colors">
               <Clock size={14} className="text-brandPrimary" />
               <span className="text-[9px] font-mono font-black uppercase tracking-widest opacity-60">Handshake: ~4 Hours</span>
             </div>
             <div className="px-5 py-3 rounded-2xl bg-white/70 dark:bg-brandCard-dark/80 backdrop-blur-md border border-black/5 dark:border-white/5 flex items-center gap-3 shadow-sm hover:border-brandPrimary/20 transition-colors">
               <Shield size={14} className="text-brandPrimary" />
               <span className="text-[9px] font-mono font-black uppercase tracking-widest opacity-60">Direct Architect Access</span>
             </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Form Module - Primary Interaction */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/85 dark:bg-brandCard-dark/85 backdrop-blur-xl h-full p-8 md:p-12 rounded-[2.5rem] border border-black/5 dark:border-white/5 shadow-2xl relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute -inset-x-20 -top-20 h-[150px] bg-gradient-to-b from-brandPrimary/5 to-transparent blur-[40px] pointer-events-none rounded-full" />

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div 
                    key="success-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-8 py-16"
                  >
                    <div className="relative">
                      <motion.div 
                        className="absolute inset-[-15px] rounded-full bg-brandPrimary/20 border border-brandPrimary/30"
                        animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.2, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <div className="w-24 h-24 rounded-full bg-brandPrimary text-white flex items-center justify-center shadow-2xl relative z-10">
                        <CheckCircle size={42} className="animate-pulse" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h2 className="text-3xl sm:text-4xl font-display font-black uppercase tracking-tighter text-black dark:text-white">
                        Transmission Dispatched
                      </h2>
                      <p className="text-[10px] font-mono text-black/50 dark:text-white/40 uppercase tracking-[0.3em] max-w-sm mx-auto leading-relaxed">
                        Handshake payload compiled and locked. We will initiate connection protocols shortly.
                      </p>
                    </div>

                    <button 
                      onClick={handleReset} 
                      className="inline-flex items-center gap-2 px-6 py-3 border border-brandPrimary/20 hover:border-brandPrimary/50 text-brandPrimary text-[9px] font-black uppercase tracking-widest rounded-xl bg-brandPrimary/5 hover:bg-brandPrimary hover:text-white transition-all shadow-md active:scale-95"
                    >
                      New Blueprint Brief
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-10 flex-1 flex flex-col justify-between text-left">
                    <div className="space-y-8">
                      {/* Form inputs grid */}
                      <div className="grid sm:grid-cols-2 gap-8">
                        {/* Name input */}
                        <div className="relative w-full group/input">
                          <input 
                            required 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={status === 'transmitting'}
                            className="w-full bg-transparent border-b-2 border-black/10 dark:border-white/15 pb-2.5 outline-none focus:border-brandPrimary transition-all text-base font-bold peer text-black dark:text-white disabled:opacity-40" 
                            placeholder=" " 
                          />
                          <label className="absolute left-0 top-1 text-black/30 dark:text-white/30 text-xs uppercase tracking-widest pointer-events-none transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-1 peer-focus:-top-4 peer-focus:text-[8px] peer-focus:text-brandPrimary peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[8px] peer-[:not(:placeholder-shown)]:text-brandPrimary font-black">
                            Client Name
                          </label>
                        </div>
                        
                        {/* Email input */}
                        <div className="relative w-full group/input">
                          <input 
                            required 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={status === 'transmitting'}
                            className="w-full bg-transparent border-b-2 border-black/10 dark:border-white/15 pb-2.5 outline-none focus:border-brandPrimary transition-all text-base font-bold peer text-black dark:text-white disabled:opacity-40" 
                            placeholder=" " 
                          />
                          <label className="absolute left-0 top-1 text-black/30 dark:text-white/30 text-xs uppercase tracking-widest pointer-events-none transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-1 peer-focus:-top-4 peer-focus:text-[8px] peer-focus:text-brandPrimary peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[8px] peer-[:not(:placeholder-shown)]:text-brandPrimary font-black">
                            Email Address
                          </label>
                        </div>
                      </div>

                      {/* Interactive Service Selector Pills with framer motion indicator */}
                      <div className="space-y-3">
                        <label className="text-[8px] font-mono font-black uppercase tracking-widest opacity-40 block">
                          Capability Protocol:
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {SERVICES_LIST.map((svc) => {
                            const isSelected = selectedService === svc.id;
                            return (
                              <button
                                key={svc.id}
                                type="button"
                                disabled={status === 'transmitting'}
                                onClick={() => setSelectedService(svc.id)}
                                className={`relative p-3.5 rounded-2xl border text-center transition-all duration-300 text-[10px] font-bold uppercase tracking-wider ${
                                  isSelected
                                    ? 'text-white border-brandPrimary font-black'
                                    : 'bg-black/[0.02] dark:bg-white/[0.02] text-black/60 dark:text-white/50 border-black/5 dark:border-white/5 hover:border-brandPrimary/30 hover:text-black dark:hover:text-white'
                                }`}
                              >
                                {isSelected && (
                                  <motion.div
                                    layoutId="selectedSvcPill"
                                    className="absolute inset-0 bg-brandPrimary rounded-2xl -z-10 shadow-lg shadow-brandPrimary/20 border border-brandPrimary"
                                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                                  />
                                )}
                                <span className="relative z-10">{svc.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Interactive Budget Tier Selector Pills */}
                      <div className="space-y-3">
                        <label className="text-[8px] font-mono font-black uppercase tracking-widest opacity-40 block">
                          Valuation Tier Parameters:
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {BUDGET_TIERS.map((tier) => {
                            const isSelected = selectedBudget === tier.id;
                            return (
                              <button
                                key={tier.id}
                                type="button"
                                disabled={status === 'transmitting'}
                                onClick={() => setSelectedBudget(tier.id)}
                                className={`relative p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between ${
                                  isSelected
                                    ? 'text-white border-brandPrimary'
                                    : 'bg-black/[0.02] dark:bg-white/[0.02] text-black/75 dark:text-white/70 border-black/5 dark:border-white/5 hover:border-brandPrimary/30 hover:text-black dark:hover:text-white'
                                }`}
                              >
                                {isSelected && (
                                  <motion.div
                                    layoutId="selectedBudgetPill"
                                    className="absolute inset-0 bg-brandPrimary rounded-2xl -z-10 shadow-lg shadow-brandPrimary/20 border border-brandPrimary"
                                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                                  />
                                )}
                                <div className="relative z-10 text-xs font-bold uppercase tracking-wider">{tier.label}</div>
                                <div className={`relative z-10 text-[8px] font-mono mt-1 ${isSelected ? 'text-white/60' : 'opacity-40'}`}>{tier.desc}</div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Floating Textarea Brief */}
                      <div className="relative w-full group/input pt-2">
                        <textarea 
                          required 
                          rows={3}
                          value={projectBrief}
                          onChange={(e) => setProjectBrief(e.target.value)}
                          disabled={status === 'transmitting'}
                          className="w-full bg-transparent border-b-2 border-black/10 dark:border-white/15 pb-2 outline-none focus:border-brandPrimary transition-all text-sm font-light resize-none leading-relaxed text-black dark:text-white peer disabled:opacity-40" 
                          placeholder=" " 
                        />
                        <label className="absolute left-0 top-3 text-black/30 dark:text-white/30 text-xs uppercase tracking-widest pointer-events-none transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[8px] peer-focus:text-brandPrimary peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[8px] peer-[:not(:placeholder-shown)]:text-brandPrimary font-black">
                          Project Brief / Scope Parameters
                        </label>
                      </div>
                    </div>

                    <div className="pt-6 relative z-10">
                      <button 
                        type="submit"
                        disabled={status === 'transmitting'}
                        className="w-full py-5 bg-black dark:bg-brandPrimary text-white rounded-2xl font-black uppercase tracking-[0.4em] text-[10px] flex items-center justify-center gap-3 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50 group shadow-xl border border-white/5 cursor-pointer"
                      >
                        {status === 'transmitting' ? (
                          <>
                            Transmitting Payload <Loader2 className="animate-spin" size={14} />
                          </>
                        ) : (
                          <>
                            Establish Handshake <Zap size={14} className="group-hover:scale-125 transition-transform duration-300" />
                          </>
                        )}
                      </button>
                      <div className="flex justify-center mt-6">
                        <div className="flex items-center gap-4 text-[7px] font-mono opacity-25 uppercase tracking-[0.5em]">
                          <span>End-to-End Encryption</span>
                          <div className="w-1.5 h-1.5 rounded-full bg-brandPrimary" />
                          <span>AG.VIZTEK Secure Port</span>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
          
          {/* Cyberpunk System Log & Sidebar Info */}
          <div className="lg:col-span-4 flex flex-col gap-6 w-full">
            {/* 🖥 CYBERPUNK NETWORK TERMINAL LOGS CONSOLE */}
            <div className="bg-black text-[#10b981] font-mono text-[9px] p-6 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[190px] text-left">
              {/* Scanline CRT overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#10b981]/[0.015] to-transparent pointer-events-none" />
              
              <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-3">
                <div className="flex items-center gap-2">
                  <Terminal size={12} className="text-[#10b981] animate-pulse" />
                  <span className="font-bold tracking-widest text-[#10b981]">SYSTEM NETWORK LOGS</span>
                </div>
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
                </div>
              </div>

              <div className="space-y-1.5 flex-1 select-none font-mono">
                {consoleLogs.map((log, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="truncate whitespace-pre-wrap leading-relaxed text-[#10b981]/90"
                  >
                    {log}
                  </motion.div>
                ))}
              </div>

              <div className="text-[7px] text-white/20 uppercase tracking-widest text-right mt-3 border-t border-white/10 pt-2 flex justify-between items-center">
                <span>GATEWAY // SECURE</span>
                <span>ONLINE // 00_PING_OK</span>
              </div>
            </div>

            {/* Direct Channel Communication Pills */}
            <div className="flex flex-col gap-4">
              {[
                { icon: <Mail size={18} />, label: "Email Route", val: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
                { icon: <MessageCircle size={18} />, label: "WhatsApp Secure Uplink", val: CONTACT_INFO.phone, href: `https://wa.me/${CONTACT_INFO.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Hi AG Viztek Studio! I visited your website and would love to discuss a project with you.")}` }
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  target="_blank"
                  whileHover={{ y: -3, borderColor: 'rgba(130,77,105,0.3)' }}
                  className="flex items-center justify-between p-5 rounded-3xl bg-white/80 dark:bg-brandCard-dark/80 backdrop-blur-md border border-black/5 dark:border-white/5 group transition-all shadow-lg text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-brandPrimary/5 text-brandPrimary flex items-center justify-center group-hover:bg-brandPrimary group-hover:text-white transition-all shadow-md shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-[8px] font-mono text-black/40 dark:text-white/20 uppercase tracking-widest">{item.label}</div>
                      <div className="text-[11px] font-black tracking-tight text-black dark:text-white mt-0.5 break-all pr-1">{item.val}</div>
                    </div>
                  </div>
                  <ArrowRight size={14} className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all text-brandPrimary shrink-0" />
                </motion.a>
              ))}
            </div>

            {/* Map Mini-Widget with grayscale adaptiveness */}
            <div className="relative h-44 rounded-[2.5rem] overflow-hidden border border-black/5 dark:border-white/5 shadow-2xl group w-full">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15797.90483864195!2d77.38799445!3d8.18193005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b04f128be7c0c1b%3A0xc6c7d7e35496417b!2sChunkankadai%2C%20Nagercoil%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1716382900000!5m2!1sen!2sin" 
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" 
                className="grayscale-[1] group-hover:grayscale-0 transition-all duration-700 opacity-40 group-hover:opacity-100 scale-105 group-hover:scale-100 filter invert-[0.9] dark:invert-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-5 flex items-center gap-2">
                <MapPin size={12} className="text-brandPrimary animate-bounce" />
                <span className="text-[8px] font-mono font-black uppercase tracking-widest text-white/90">Tamil Nadu, IN // 12ms Ping</span>
              </div>
            </div>

          </div>
        </div>

        {/* Dynamic Counters Trust Metrics Bar */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
           {stats.map((stat, i) => (
             <motion.div 
               key={i} 
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 + i * 0.08 }}
               className="py-5 px-6 rounded-[2rem] bg-white/70 dark:bg-brandCard-dark/80 backdrop-blur-md border border-black/5 dark:border-white/5 text-center shadow-md hover:border-brandPrimary/20 transition-all"
             >
               <div className="text-lg font-display font-black text-brandPrimary mb-0.5">
                 <Counter value={stat.val} delay={0.4 + i * 0.08} />
               </div>
               <div className="text-[8px] font-mono uppercase tracking-widest opacity-35">{stat.label}</div>
             </motion.div>
           ))}
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
