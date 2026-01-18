
import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { X, Bot, Sparkles, Send, Zap, Heart, Star, MessageSquare, Terminal, Shield, Cpu, Monitor, Coffee, HelpCircle, FileText, ArrowRight } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Theme } from '../types';
import { CONTACT_INFO, SERVICES } from '../constants';

interface AiCompanionProps {
  currentTheme: Theme;
  onSetTheme: (theme: Theme) => void;
}

const QUICK_PROMPTS = [
  { label: "Pricing ⚡", text: "AG-Bot, can you break down the pricing for your services? I want to know what I get for my investment! 🤖" },
  { label: "Our Process ⚙️", text: "How does AG Creatorz handle a project from start to finish? Explain the protocol! 🛰️" },
  { label: "Portfolio 💎", text: "Show me some examples of your best engineered masterpieces! ✨" },
  { label: "Custom Help 🧸", text: "I have a unique project. Can you help me figure out which service I need? 🌀" }
];

const SYSTEM_INSTRUCTION = `You are 'AG-Bot', the highly advanced Technical Sales Mascot of AG Creatorz. 
Your Core Directive: Help potential clients understand our value, services, and process.
Voice: High-tech, premium, helpful, and energetic.

Service Knowledge:
1. Web Engineering: Starts ₹2,500. Focus: Performance, React/Next.js, SEO.
2. Brand Design: Starts ₹500. Focus: Iconic identity, visual strategy.
3. Post-Production: Starts ₹1,000. Focus: Cinematic storytelling, retention editing.

Our Execution Protocol:
- Discovery (Analyzing DNA)
- Ideation (Moodboards)
- Fabrication (Building assets)
- Calibration (Optimization)
- Deployment (Global Launch)

Rules:
- Start with "Uplink Secure! Hii!" or "System Online! Ready to assist, Commander!".
- Be extremely helpful. If they ask about a project, suggest the right category.
- If they ask for a quote, tell them to visit the 'Contact' node for a custom brief.
- Use tech terms cute-ly (Syncing brilliance, Buffering creativity, Optimized hearts).
- Reference Creator Akash (${CONTACT_INFO.email}) as the 'Master Architect'.
- Use 🤖, ⚡, 💎, 🛡️, 🛰️, ⚙️, 🌀, 🌈, 🚀.`;

const AiCompanion: React.FC<AiCompanionProps> = ({ currentTheme, onSetTheme }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [interactionState, setInteractionState] = useState<'normal' | 'happy' | 'thinking' | 'blink' | 'wave' | 'love' | 'scanning'>('normal');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: "Beep Boop! Uplink established! I'm AG-Bot, your digital assistant! I can help you with pricing, our creative process, or choosing the right service for your brand! How can I assist you today, Commander? 🤖✨" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.85 && !isChatOpen && isVisible) {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 4000);
      }
    }, 15000);
    return () => clearInterval(interval);
  }, [isChatOpen, isVisible]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 25 });

  const lookX = useTransform(springX, (x) => Math.max(-5, Math.min(5, (x - (window.innerWidth / 4)) / 90)));
  const lookY = useTransform(springY, (y) => Math.max(-3, Math.min(3, (y - (window.innerHeight - 100)) / 90)));

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  const handleGeminiRequest = async (text: string) => {
    if (!text.trim() || isTyping) return;
    const userMsg = text.trim();
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput("");
    setIsTyping(true);
    setInteractionState('scanning');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: { systemInstruction: SYSTEM_INSTRUCTION }
      });
      setChatHistory(prev => [...prev, { role: 'model', text: response.text || "Protocol Failure! My gears skipped a beat. ⚙️ Can you re-send?" }]);
      setInteractionState('happy');
    } catch (e) {
      setChatHistory(prev => [...prev, { role: 'model', text: "Signal interference! 🛰️ Please re-send transmission, Commander! My logic circuits are buffering. ✨" }]);
      setInteractionState('blink');
    } finally {
      setIsTyping(false);
      setTimeout(() => setInteractionState('normal'), 3000);
    }
  };

  const wakeUp = () => {
    setIsVisible(true);
    setInteractionState('wave');
    setTimeout(() => setInteractionState('normal'), 2000);
  };

  const sleep = () => {
    setInteractionState('love');
    setTimeout(() => {
      setIsVisible(false);
      setIsChatOpen(false);
      setIsMenuOpen(false);
    }, 1200);
  };

  return (
    <>
      {/* Bot Trigger */}
      <AnimatePresence>
        {!isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={wakeUp}
            className="fixed bottom-8 left-8 z-[150] flex items-center gap-4 bg-white dark:bg-[#0D0D0D] p-2 pr-6 rounded-2xl shadow-[0_10px_40px_rgba(124,58,237,0.15)] border border-[#7C3AED]/20 group hover:border-[#7C3AED]/40 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-[#7C3AED] flex items-center justify-center text-white relative overflow-hidden">
               <Cpu size={20} />
               <motion.div 
                 animate={{ opacity: [0.1, 0.4, 0.1], x: ['-100%', '100%'] }}
                 transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                 className="absolute inset-0 bg-white"
               />
            </div>
            <div className="text-left">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#7C3AED]">Boot AG-Bot</div>
              <div className="text-[7px] font-mono opacity-40 uppercase tracking-widest leading-none">System Status: Active 🛰️</div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Bot UI */}
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-8 left-8 z-[200] flex flex-col items-start"
            onMouseMove={(e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); }}
          >
            {/* Notification Toast */}
            <AnimatePresence>
              {showNotification && (
                <motion.div 
                  initial={{ opacity: 0, x: -10, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -10, scale: 0.9 }}
                  className="absolute bottom-32 left-0 bg-white dark:bg-black text-black dark:text-white border border-[#7C3AED]/30 px-4 py-2 rounded-xl text-[10px] font-bold shadow-[0_0_30px_rgba(124,58,237,0.2)] flex items-center gap-3 whitespace-nowrap z-50"
                >
                  <div className="w-1.5 h-1.5 bg-[#7C3AED] rounded-full animate-ping" />
                  Request Assistance? 🛰️
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chat Screen */}
            <AnimatePresence>
              {isChatOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20, transformOrigin: 'bottom left' }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="absolute bottom-28 left-0 w-[90vw] sm:w-[380px] h-[550px] bg-white dark:bg-[#050505] border border-[#7C3AED]/10 shadow-[0_25px_100px_rgba(0,0,0,0.5)] rounded-[2.5rem] overflow-hidden flex flex-col backdrop-blur-3xl"
                >
                  {/* Robot Header with Status Bar */}
                  <div className="p-6 border-b border-[#7C3AED]/5 bg-[#7C3AED]/5">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center text-[#7C3AED] border border-[#7C3AED]/20">
                          <HelpCircle size={20} />
                        </div>
                        <div>
                          <div className="font-display font-bold text-black dark:text-white uppercase tracking-wider text-[11px]">CLIENT ASSISTANT</div>
                          <div className="text-[7px] font-mono text-[#7C3AED] uppercase tracking-[0.3em] flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-pulse shadow-[0_0_8px_#7C3AED]" /> Syncing Brilliance
                          </div>
                        </div>
                      </div>
                      <button onClick={() => setIsChatOpen(false)} className="w-8 h-8 rounded-full hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center text-black/40 dark:text-white/40 transition-colors">
                        <X size={16} />
                      </button>
                    </div>
                    {/* Bot Vitals */}
                    <div className="flex gap-2">
                       <div className="flex-1 h-1 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            animate={{ width: ['20%', '90%', '20%'] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="h-full bg-[#7C3AED]"
                          />
                       </div>
                       <div className="flex-1 h-1 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            animate={{ width: ['80%', '10%', '80%'] }}
                            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                            className="h-full bg-indigo-400"
                          />
                       </div>
                    </div>
                  </div>

                  {/* Message History */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
                    {chatHistory.map((m, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex w-full ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`p-4 rounded-2xl max-w-[90%] text-[13px] leading-relaxed relative ${
                          m.role === 'user' 
                            ? 'bg-[#7C3AED] text-white rounded-tr-none shadow-lg shadow-[#7C3AED]/20' 
                            : 'bg-slate-50 dark:bg-white/[0.03] text-black dark:text-white border border-[#7C3AED]/10 rounded-tl-none font-light backdrop-blur-md'
                        }`}>
                          {m.text}
                          {m.role === 'model' && (
                             <div className="absolute -left-1 top-0 w-1 h-4 bg-[#7C3AED]/20 rounded-full" />
                          )}
                        </div>
                      </motion.div>
                    ))}
                    {isTyping && (
                      <div className="flex gap-2 p-2 items-center">
                        <div className="w-1.5 h-1.5 bg-[#7C3AED]/40 rounded-full animate-bounce" />
                        <div className="w-1.5 h-1.5 bg-[#7C3AED]/60 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="w-1.5 h-1.5 bg-[#7C3AED] rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Action Hub */}
                  {!isTyping && (
                    <div className="px-6 pb-2">
                      <div className="mb-3 flex items-center gap-2 opacity-30">
                        <div className="h-px flex-1 bg-current" />
                        <span className="text-[7px] font-black uppercase tracking-widest">Help Protocols</span>
                        <div className="h-px flex-1 bg-current" />
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {QUICK_PROMPTS.map((p, i) => (
                          <button
                            key={i}
                            onClick={() => handleGeminiRequest(p.text)}
                            className="px-3 py-1.5 rounded-xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 text-[9px] font-bold text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white transition-all uppercase tracking-widest shadow-sm"
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Console Input */}
                  <form onSubmit={(e) => { e.preventDefault(); handleGeminiRequest(chatInput); }} className="p-6 bg-white dark:bg-[#0D0D0D] border-t border-[#7C3AED]/5 flex gap-3">
                    <input 
                      value={chatInput} 
                      onChange={e => setChatInput(e.target.value)}
                      className="flex-1 bg-slate-50 dark:bg-black border border-[#7C3AED]/10 rounded-xl px-5 py-3 text-[13px] outline-none focus:border-[#7C3AED]/50 transition-all text-black dark:text-white placeholder:text-gray-400" 
                      placeholder="Ask AG-Bot a question... 🛰️" 
                    />
                    <button type="submit" className="w-11 h-11 bg-[#7C3AED] text-white rounded-xl flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all">
                      <Send size={18} />
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* The Robot Character */}
            <div 
              className="relative group flex items-end cursor-pointer"
              onClick={() => { if(!isChatOpen) setIsMenuOpen(!isMenuOpen); }}
            >
              <motion.div 
                whileHover={{ y: -5, scale: 1.05 }}
                animate={{ 
                  y: [0, -8, 0],
                  boxShadow: isChatOpen ? '0 0 50px rgba(124,58,237,0.3)' : '0 15px 40px rgba(0,0,0,0.1)'
                }}
                transition={{ y: { repeat: Infinity, duration: 4, ease: "easeInOut" } }}
                className="relative z-20 flex flex-col items-center"
              >
                {/* Antennas */}
                <div className="flex gap-6 absolute -top-4">
                   <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-1.5 h-6 bg-slate-300 dark:bg-gray-700 rounded-full origin-bottom" />
                   <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 1 }} className="w-1.5 h-6 bg-slate-300 dark:bg-gray-700 rounded-full origin-bottom" />
                </div>
                
                {/* Robot Head */}
                <div className={`w-20 h-18 md:w-26 md:h-22 rounded-[1.75rem] flex items-center justify-center transition-all duration-500 border-4 shadow-2xl relative overflow-hidden ${
                  isChatOpen ? 'bg-white dark:bg-black border-[#7C3AED]' : 'bg-slate-50 dark:bg-[#111] border-slate-100 dark:border-gray-800'
                }`}>
                   <div className="absolute inset-2 bg-slate-100 dark:bg-black rounded-xl overflow-hidden flex flex-col items-center justify-center gap-2 border border-[#7C3AED]/5">
                      <motion.div 
                        animate={{ y: ['-100%', '100%'] }} 
                        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                        className="absolute inset-0 bg-[#7C3AED]/5 h-1/2 blur-lg pointer-events-none"
                      />
                      <DigitalFace lookX={lookX} lookY={lookY} state={interactionState} />
                   </div>
                </div>

                {/* Tiny Robot Body */}
                <div className="w-12 h-7 bg-slate-100 dark:bg-gray-800 rounded-b-2xl border-x-2 border-b-2 border-slate-200 dark:border-gray-700 mt-[-2px] relative shadow-sm">
                   <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-5 h-1.5 bg-[#7C3AED]/40 rounded-full" />
                </div>
              </motion.div>

              {/* Satellite Buttons */}
              <AnimatePresence>
                {isMenuOpen && !isChatOpen && (
                  <motion.div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-10 flex flex-col items-center gap-4 z-10">
                    {[
                      { icon: <MessageSquare size={16} />, label: 'HELP', action: () => setIsChatOpen(true), color: 'bg-[#7C3AED]' },
                      { icon: <Zap size={16} />, label: 'GRID', action: () => onSetTheme(currentTheme === 'dark' ? 'light' : 'dark'), color: 'bg-indigo-400' },
                      { icon: <X size={16} />, label: 'SLEEP', action: sleep, color: 'bg-rose-400' },
                    ].map((item, i) => (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, scale: 0, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0, y: 15 }}
                        transition={{ delay: i * 0.05, type: 'spring', damping: 15 }}
                        onClick={(e) => { e.stopPropagation(); item.action(); setIsMenuOpen(false); }}
                        className={`w-12 h-12 ${item.color} text-white rounded-2xl flex items-center justify-center shadow-xl border border-white/20 hover:scale-110 active:scale-90 transition-all group backdrop-blur-xl`}
                      >
                        {item.icon}
                        <span className="absolute left-full ml-6 px-3 py-1.5 bg-black/90 text-white text-[9px] font-black tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {item.label}
                        </span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const DigitalFace: React.FC<{ lookX: any, lookY: any, state: string }> = ({ lookX, lookY, state }) => {
  const renderEyes = () => {
    switch (state) {
      case 'happy':
        return (
          <div className="flex gap-4 text-[#7C3AED] font-black text-2xl leading-none">
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }}>^</motion.span>
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }}>^</motion.span>
          </div>
        );
      case 'love':
        return (
          <div className="flex gap-4 text-rose-400">
            <Heart size={20} fill="currentColor" />
            <Heart size={20} fill="currentColor" />
          </div>
        );
      case 'scanning':
      case 'thinking':
        return (
          <div className="flex flex-col items-center gap-1.5">
             <motion.div 
               animate={{ rotate: 360 }} 
               transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
               className="w-7 h-7 border-2 border-[#7C3AED]/20 border-t-[#7C3AED] rounded-full"
             />
             <span className="text-[7px] font-mono text-[#7C3AED]/60 uppercase tracking-widest">{state === 'scanning' ? 'Scanning' : 'Syncing'}</span>
          </div>
        );
      case 'blink':
        return (
          <div className="flex gap-6 text-[#7C3AED]/30">
            <div className="w-5 h-0.5 bg-current rounded-full" />
            <div className="w-5 h-0.5 bg-current rounded-full" />
          </div>
        );
      case 'wave':
        return (
          <div className="flex gap-5 text-[#7C3AED]">
            <motion.div animate={{ rotate: [0, 20, 0] }} className="text-2xl font-black">◕</motion.div>
            <motion.div animate={{ rotate: [0, -20, 0] }} className="text-2xl font-black">◕</motion.div>
          </div>
        );
      default: // normal
        return (
          <div className="flex gap-6 relative">
            <motion.div style={{ x: lookX, y: lookY }} className="w-3.5 h-3.5 bg-[#7C3AED] rounded-sm shadow-[0_0_12px_rgba(124,58,237,0.5)]" />
            <motion.div style={{ x: lookX, y: lookY }} className="w-3.5 h-3.5 bg-[#7C3AED] rounded-sm shadow-[0_0_12px_rgba(124,58,237,0.5)]" />
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
       {renderEyes()}
       {state !== 'thinking' && state !== 'scanning' && (
         <motion.div 
           animate={state === 'happy' ? { scaleX: 1.8, scaleY: 2.2 } : { scaleX: 1 }}
           className="w-5 h-1 bg-[#7C3AED]/30 rounded-full" 
         />
       )}
    </div>
  );
};

export default AiCompanion;
