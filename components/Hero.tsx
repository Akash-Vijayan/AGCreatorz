import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HERO_CONTENT } from '../constants';

interface HeroProps {
  onContact?: () => void;
  isInsideTear?: boolean;
}

const Hero: React.FC<HeroProps> = ({ onContact, isInsideTear = false }) => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  const yParallax = useTransform(scrollY, [0, 800], [0, isInsideTear ? 0 : -100]);
  const opacityText = useTransform(scrollY, [0, 500], [1, isInsideTear ? 1 : 0]);
  const scaleHero = useTransform(scrollY, [0, 500], [1, isInsideTear ? 1 : 0.98]);

  const splitText = (text: string, delayBase = 0) => text.split(" ").map((word, i) => (
    <motion.span
      key={i}
      initial={isInsideTear ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
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
    <section 
      ref={containerRef} 
      id="hero" 
      className="relative w-full min-h-[100svh] flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 pt-32 transition-colors duration-1000"
    >
      {/* Premium Office Background Image with light/dark adaptive CSS filters */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center -z-20 transition-all duration-700 pointer-events-none scale-105 filter grayscale contrast-[0.9] sepia-[20%] brightness-[1.35] opacity-[0.85] dark:grayscale dark:contrast-[1.1] dark:sepia-[45%] dark:brightness-[0.35] dark:opacity-60"
        style={{
          backgroundImage: `url('/hero_bg.png')`,
        }}
      />
      {/* Light Mode: Elegant cream overlay */}
      <div className="absolute inset-0 bg-brandSurface-light/85 dark:hidden -z-10" />

      {/* Dark Mode: Deep purple/dark gradient overlay */}
      <div className="absolute inset-0 hidden dark:block bg-gradient-to-b from-brandSurface-dark/95 via-brandSurface-dark/90 to-brandSurface-dark/98 -z-10" />
      <div className="absolute inset-0 hidden dark:block bg-brandPrimary-dark/15 mix-blend-color -z-10" />

      <motion.div 
        style={{ y: yParallax, opacity: opacityText, scale: scaleHero }}
        className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col items-center"
      >
        <motion.div 
          initial={isInsideTear ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3">
             <div className="w-1.5 h-1.5 rounded-full bg-brandPrimary animate-pulse" />
             <span className="text-brandPrimary text-[9px] font-black uppercase tracking-[0.5em] px-4 py-2 border border-brandPrimary/15 rounded-full bg-brandPrimary/5 backdrop-blur-md">
                BUILDING YOUR ONLINE PRESENCE
             </span>
          </div>
        </motion.div>

        <div className="text-center w-full px-2">
          <h1 className="font-display font-bold text-huge tracking-tighter text-black dark:text-white uppercase leading-[0.85] mb-4 text-center">
            <div className="overflow-hidden pb-1 sm:pb-2">
              {splitText("BUILDING BEAUTIFUL", isInsideTear ? 0 : 0.2)}
            </div>
            <div className="overflow-hidden flex flex-wrap justify-center items-baseline gap-y-2">
              <motion.span 
                initial={isInsideTear ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.6 }}
                className="font-script font-normal text-brandPrimary lowercase mr-4 text-[1.45em] tracking-normal inline-block select-none"
                style={{ verticalAlign: 'middle', transform: 'translateY(-0.1em)' }}
              >
                experiences
              </motion.span>
              <div className="inline-block">
                {splitText("FOR THE WEB", isInsideTear ? 0 : 0.8)}
              </div>
            </div>
          </h1>
          
          <motion.p 
            initial={isInsideTear ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1.2 }}
            className="mt-8 text-base sm:text-lg text-black/60 dark:text-white/40 font-light max-w-xl mx-auto leading-relaxed tracking-wide text-center"
          >
            {HERO_CONTENT.subhead}
          </motion.p>
        </div>

        <motion.div 
          initial={isInsideTear ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5 w-full px-6 sm:px-0"
        >
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(130, 77, 105, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onContact}
            className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-brandPrimary to-brandPrimary-dark text-white rounded-full font-black uppercase tracking-[0.2em] text-[11px] transition-all shadow-xl shadow-brandPrimary/10"
          >
            START TODAY
          </motion.button>
          <motion.a 
            whileHover={{ scale: 1.05, borderColor: '#824D69', color: '#824D69' }}
            whileTap={{ scale: 0.95 }}
            href="#portfolio" 
            className="w-full sm:w-auto px-10 py-4 border border-black/20 dark:border-white/20 text-black dark:text-white rounded-full font-black uppercase tracking-[0.2em] text-[11px] transition-all text-center backdrop-blur-sm"
          >
            SEE MY WORK
          </motion.a>
        </motion.div>
      </motion.div>
      
      {!isInsideTear && (
        <motion.div 
          animate={{ 
            opacity: [0.03, 0.08, 0.03],
            scale: [1, 1.15, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-15%] left-1/2 -translate-x-1/2 w-[90%] h-[60%] bg-brandPrimary/15 blur-[180px] rounded-full pointer-events-none -z-10"
        />
      )}
    </section>
  );
};

export default Hero;
