import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Linkedin } from 'lucide-react';
import { BRAND_QUOTES } from '../constants';

const XLogo = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-3 h-3 fill-current">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TopBar: React.FC = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % BRAND_QUOTES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {!scrolled && (
        <motion.div 
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed top-0 left-0 w-full z-[130] bg-brandSurface-light dark:bg-brandSurface-dark border-b border-black/5 dark:border-white/5 h-10 flex items-center transition-colors duration-400"
        >
          <div className="max-w-[95rem] mx-auto w-full px-6 md:px-12 flex justify-between items-center">
            
            {/* Left Side: Rotating Quotes */}
            <div className="flex items-center gap-4 text-left">
              <motion.div 
                animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-brandPrimary shadow-[0_0_10px_#824D69]"
              />
              <AnimatePresence mode="wait">
                <motion.p
                  key={quoteIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.6, ease: "circOut" }}
                  className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em] text-black/70 dark:text-white/70 whitespace-nowrap"
                >
                  {BRAND_QUOTES[quoteIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Right Side: Social Media & Phone Contact Info */}
            <div className="hidden sm:flex items-center gap-5 text-left">
              <div className="flex items-center gap-4 border-r border-black/10 dark:border-white/10 pr-5">
                <a href="#" className="text-black/40 dark:text-white/30 hover:text-brandPrimary transition-all duration-300 transform hover:scale-110">
                  <Instagram size={13} />
                </a>
                <a href="#" className="text-black/40 dark:text-white/30 hover:text-brandPrimary transition-all duration-300 transform hover:scale-110">
                  <XLogo />
                </a>
                <a href="#" className="text-black/40 dark:text-white/30 hover:text-brandPrimary transition-all duration-300 transform hover:scale-110">
                  <Linkedin size={13} />
                </a>
              </div>
              <a 
                href="tel:+918903574460" 
                className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] text-black/70 dark:text-brandPrimary hover:text-brandPrimary transition-all"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-[2.5] stroke-current" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +91 89035 74460
              </a>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TopBar;
