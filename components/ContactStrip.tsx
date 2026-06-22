import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Send, Terminal, Sparkles, ArrowRight } from 'lucide-react';

interface ContactStripProps {
  onContact: () => void;
}

const ContactStrip: React.FC<ContactStripProps> = ({ onContact }) => {
  const [selectedProtocol, setSelectedProtocol] = useState<string>('Web Engineering');

  // Mouse tilt effect values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out tilt transition values using spring physics
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 95, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 95, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate relative cursor position from center
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="py-16 md:py-20 px-4 bg-brandSurface-light dark:bg-brandSurface-dark overflow-hidden relative transition-colors duration-1000 z-30">
      
      {/* Decorative premium grid layout background */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.01] pointer-events-none z-0" 
           style={{ 
             backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', 
             backgroundSize: '50px 50px' 
           }} 
      />

      {/* Ambient drifting glowing orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{
            x: [0, 20, -15, 0],
            y: [0, -30, 15, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-[250px] h-[250px] rounded-full bg-brandPrimary/10 blur-[90px]"
        />
      </div>
      
      <div className="max-w-[75rem] mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="bg-white/85 dark:bg-brandCard-dark/85 backdrop-blur-xl border border-black/5 dark:border-white/5 rounded-[2.5rem] p-6 sm:p-8 md:p-12 overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl"
        >
          {/* Inner glossy light gradient flare */}
          <div className="absolute -inset-x-20 -top-20 h-[150px] bg-gradient-to-b from-brandPrimary/5 to-transparent blur-[40px] pointer-events-none rounded-full" />
          
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left Column: Visual branding and selection */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="flex items-center gap-3">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandPrimary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brandPrimary"></span>
                </div>
                <span className="text-brandPrimary dark:text-brandPrimary-light text-[9px] font-black uppercase tracking-[0.4em] font-mono">
                  Uplink Channel // Established
                </span>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-black dark:text-white uppercase tracking-tighter leading-tight transition-all">
                  Ready to <span className="text-brandPrimary italic font-serif lowercase font-normal font-serif">engage?</span>
                </h2>
                <p className="text-black/60 dark:text-white/40 text-xs sm:text-sm font-light leading-relaxed max-w-xl">
                  Your vision, our architecture. Select a capability module below to configure your uplink protocol. Let's build your digital legacy.
                </p>
              </div>

              {/* Dynamic Capability Preselector */}
              <div className="space-y-2 pt-2">
                <div className="text-[9px] font-mono uppercase tracking-[0.2em] opacity-40">
                  Select Channel Protocol:
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Web Engineering', 'Brand Identity', 'Cinematic Motion'].map((protocol) => {
                    const isActive = selectedProtocol === protocol;
                    return (
                      <button
                        key={protocol}
                        onClick={() => setSelectedProtocol(protocol)}
                        className={`px-4 py-2 rounded-xl text-[9px] font-mono tracking-wider uppercase transition-all duration-300 border ${
                          isActive 
                            ? 'bg-brandPrimary text-white border-brandPrimary shadow-md scale-102 font-bold' 
                            : 'bg-black/5 dark:bg-white/[0.02] text-black/60 dark:text-white/50 border-black/5 dark:border-white/5 hover:border-brandPrimary/30 hover:text-black dark:hover:text-white'
                        }`}
                      >
                        {protocol}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Premium compact action cards */}
            <div className="lg:col-span-5 flex flex-col gap-4 w-full">
              
              {/* Main Uplink Action Button */}
              <motion.button
                onClick={onContact}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="group w-full p-5 rounded-2xl bg-brandPrimary text-white flex items-center justify-between shadow-lg shadow-brandPrimary/15 transition-all overflow-hidden relative border border-white/5"
              >
                {/* Gleam reflection shine animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/5 group-hover:rotate-[360deg] transition-transform duration-750">
                    <Terminal size={20} className="text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-[8px] font-mono uppercase tracking-[0.3em] text-white/50">
                      Uplink Protocol // {selectedProtocol.split(' ')[0].toUpperCase()}
                    </div>
                    <div className="text-base font-bold uppercase tracking-wider mt-0.5">
                      Initiate Inquiry
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 relative z-10">
                  <span className="text-[8px] font-mono uppercase tracking-wider opacity-0 group-hover:opacity-100 translate-x-1.5 group-hover:translate-x-0 transition-all duration-300">
                    Execute
                  </span>
                  <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors border border-white/5">
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-500" />
                  </div>
                </div>
              </motion.button>

              {/* Secondary Details Widgets Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Widget A: Studio Node */}
                <div className="p-4 rounded-2xl bg-black/[0.01] dark:bg-white/[0.01] border border-black/5 dark:border-white/5 flex items-center gap-3 group hover:border-brandPrimary/20 hover:bg-black/[0.02] transition-all duration-300 shadow-sm relative overflow-hidden">
                  <div className="w-8 h-8 rounded-lg bg-brandPrimary/5 text-brandPrimary flex items-center justify-center shrink-0">
                    <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
                  </div>
                  <div className="text-left">
                    <div className="text-[8px] font-mono uppercase opacity-45">Studio Node</div>
                    <div className="text-xs font-bold uppercase tracking-wider text-black dark:text-white mt-0.5 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                      Active
                    </div>
                  </div>
                </div>

                {/* Widget B: Global Delivery */}
                <div className="p-4 rounded-2xl bg-black/[0.01] dark:bg-white/[0.01] border border-black/5 dark:border-white/5 flex items-center gap-3 group hover:border-brandPrimary/20 hover:bg-black/[0.02] transition-all duration-300 shadow-sm relative overflow-hidden">
                  <div className="w-8 h-8 rounded-lg bg-brandPrimary/5 text-brandPrimary flex items-center justify-center shrink-0">
                    <Send size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <div className="text-left">
                    <div className="text-[8px] font-mono uppercase opacity-45">12ms Ping</div>
                    <div className="text-xs font-bold uppercase tracking-wider text-black dark:text-white mt-0.5">High Speed</div>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Panel Console Status Log */}
            <div className="lg:col-span-12 pt-4 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row justify-between items-center text-[8px] font-mono text-black/35 dark:text-white/30 gap-2 w-full">
              <div className="flex items-center gap-2">
                <span className="inline-block w-1 h-1 rounded-full bg-brandPrimary"></span>
                <span>SECURE UPLINK ACTIVE // AES-256</span>
              </div>
              <div className="flex items-center gap-3">
                <span>NODE: TAMIL NADU // IND</span>
                <span>STATUS: 200 OK</span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactStrip;
