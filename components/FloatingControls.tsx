import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const FloatingControls: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const openWhatsApp = () => {
    const phone = CONTACT_INFO.phone.replace(/[^0-9]/g, '');
    const message = encodeURIComponent("Hi AG Viztek Studio! I visited your website and would love to discuss a project with you.");
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-8 right-8 z-[150] flex flex-col gap-4">
      <AnimatePresence>
        {isVisible && (
          <>
            {/* WhatsApp Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={openWhatsApp}
              className="w-14 h-14 bg-brandCard-light dark:bg-brandCard-dark border border-brandPrimary/20 text-brandPrimary rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(130,77,105,0.2)] backdrop-blur-xl group transition-colors hover:border-brandPrimary/40"
              title="Contact on WhatsApp"
            >
              <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0, 0.3, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 bg-brandPrimary rounded-full"
              />
            </motion.button>

            {/* Scroll to Top Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="w-14 h-14 bg-brandPrimary text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(130,77,105,0.3)] group"
              title="Scroll to Top"
            >
              <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingControls;
