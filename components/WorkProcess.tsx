
import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Target, Activity, Send, ArrowRight, Shield } from 'lucide-react';

const steps = [
  { id: 1, title: 'Discovery', desc: 'Analyzing brand DNA and architecture to define a roadmap.', code: 'SYS_INIT', icon: <Activity />, status: 'Ready' },
  { id: 2, title: 'Ideation', desc: 'Crafting visual narratives through moodboards and concepts.', code: 'VIS_AUTH', icon: <Zap />, status: 'Buffered' },
  { id: 3, title: 'Fabrication', desc: 'High-precision engineering of assets and motion sequences.', code: 'FAB_CORE', icon: <Cpu />, status: 'In-Process' },
  { id: 4, title: 'Calibration', desc: 'Frame-by-frame optimization for maximum performance.', code: 'OPT_SYNC', icon: <Target />, status: 'Optimizing' },
  { id: 5, title: 'Deployment', desc: 'Executing final launch and scaling globally.', code: 'EXE_LIVE', icon: <Send />, status: 'Finalizing' },
];

const WorkProcess: React.FC = () => {
  return (
    <section 
      id="process" 
      className="relative py-32 bg-brandSurface-dark text-white overflow-hidden transition-colors duration-1000"
    >
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(to right, #7C3AED 1px, transparent 1px), linear-gradient(to bottom, #7C3AED 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="max-w-[85rem] mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-brandPrimary" />
              <span className="text-brandPrimary font-black text-[10px] tracking-[0.6em] uppercase">Pipeline // 03</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-display font-bold uppercase tracking-tighter leading-[0.85]">
              Execution <br/>
              <span className="text-brandPrimary italic font-serif font-normal lowercase">protocol</span>
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-sm text-left md:text-right"
          >
             <p className="text-white/30 text-lg font-light leading-relaxed">
               A structured methodology designed for high-precision digital output. From initial discovery to global deployment.
             </p>
             <div className="mt-6 flex items-center md:justify-end gap-3 text-[9px] font-mono uppercase tracking-widest text-brandPrimary">
                <Shield size={12} /> Registry Active v3.0
             </div>
          </motion.div>
        </div>

        {/* Vertical Process Steps */}
        <div className="relative">
          {/* Vertical Connecting Line */}
          <div className="absolute left-[39px] top-0 bottom-0 w-px bg-white/5 md:left-1/2 md:-translate-x-1/2">
             <motion.div 
               initial={{ scaleY: 0 }}
               whileInView={{ scaleY: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 2, ease: "easeInOut" }}
               className="absolute inset-0 bg-gradient-to-b from-brandPrimary via-brandPrimary-light to-brandPrimary shadow-[0_0_15px_#7C3AED] origin-top"
             />
          </div>

          <div className="space-y-20 md:space-y-32">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Content Side */}
                <div className="flex-1 w-full text-left md:text-right group">
                  <div className={`p-8 md:p-12 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl hover:border-brandPrimary/30 transition-all duration-500 relative ${index % 2 !== 0 ? 'md:text-left' : ''}`}>
                    <div className="text-brandPrimary font-mono font-black text-[10px] tracking-[0.5em] mb-4 uppercase">
                      Phase Node // 0{step.id}
                    </div>
                    <h3 className="text-3xl md:text-5xl font-display font-bold text-white uppercase tracking-tighter mb-6 group-hover:text-brandPrimary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-white/40 text-lg font-light leading-relaxed max-w-md ml-auto mr-0 md:max-w-lg">
                      {step.desc}
                    </p>
                    <div className="mt-8 flex items-center gap-4 justify-start md:justify-end">
                      <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{step.code}</span>
                      <div className="px-4 py-1.5 rounded-full bg-brandPrimary/10 border border-brandPrimary/20 text-brandPrimary text-[8px] font-black uppercase tracking-widest">
                        {step.status}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Icon Circle (Center) */}
                <div className="relative z-20 shrink-0">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-20 h-20 rounded-[2rem] bg-brandSurface-dark border-4 border-brandPrimary/20 flex items-center justify-center text-brandPrimary shadow-[0_0_30px_rgba(124,58,237,0.3)] group-hover:bg-brandPrimary group-hover:text-white transition-all duration-500"
                  >
                    {React.cloneElement(step.icon, { size: 32 })}
                  </motion.div>
                </div>

                {/* Empty Side (For Layout Balance) */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 flex flex-col items-center text-center space-y-8"
        >
          <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brandPrimary animate-bounce">
            <ArrowRight size={24} className="rotate-90" />
          </div>
          <p className="text-[11px] font-mono uppercase tracking-[0.5em] text-white/20">Protocol End // Scroll for Reflections</p>
        </motion.div>

      </div>
    </section>
  );
};

export default WorkProcess;
