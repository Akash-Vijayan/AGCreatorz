import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  currentPage: string;
  onNavigate: (page: string, sectionId?: string) => void;
  onSelectService: (id: string) => void;
  showBack?: boolean;
  onBack?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isDarkMode,
  toggleTheme,
  currentPage,
  onNavigate
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, page: string, section?: string) => {
    e.preventDefault();
    setIsOpen(false);
    onNavigate(page, section);
  };

  const navLinks = [
    { name: 'Home', section: 'hero', page: 'home' },
    { name: 'Services', section: '', page: 'services-hub' },
    { name: 'Portfolio', section: '', page: 'portfolio-page' },
    { name: 'Pricing', section: '', page: 'pricing-page' },
    { name: 'About', section: '', page: 'about-page' },
    { name: 'Contact', section: '', page: 'contact-page' },
  ];

  const renderNavLink = (link: typeof navLinks[0]) => {
    const isActive = currentPage === link.page && (!link.section || currentPage === 'home');
    return (
      <a
        key={link.name}
        href="#"
        onClick={(e) => handleLinkClick(e, link.page, link.section)}
        className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all relative group ${isActive ? 'text-brandPrimary' : 'text-black/60 dark:text-white/60 hover:text-brandPrimary'
          }`}
      >
        {link.name}
        <span className={`absolute -bottom-1.5 left-0 h-[2px] bg-brandPrimary transition-all duration-500 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
      </a>
    );
  };

  return (
    <div className={`fixed w-full z-[120] left-0 right-0 transition-all duration-500 ease-out flex flex-col items-center ${
      scrolled 
        ? 'top-2 sm:top-4 px-4 sm:px-8' 
        : 'top-10 px-0' // Perfectly aligns underneath the 40px TopBar when at root scroll level!
    }`}>
      {/* Floating Center Liquid Capsule Navigation */}
      <nav
        className={`w-full transition-all duration-500 ease-out flex items-center justify-between ${
          scrolled 
            ? 'max-w-6xl rounded-full bg-brandCard-light/75 dark:bg-brandCard-dark/80 backdrop-blur-xl border border-brandPrimary/20 shadow-[0_10px_35px_rgba(130,77,105,0.08)] py-3 px-6 sm:px-10' 
            : 'max-w-full bg-brandSurface-light/35 dark:bg-brandSurface-dark/35 backdrop-blur-md border-b border-black/5 dark:border-white/5 py-4 md:py-5 px-6 md:px-12'
        }`}
      >
        {/* Logo and Brand Title */}
        <div className="flex items-center gap-4 md:gap-8">
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={(e) => handleLinkClick(e, 'home', 'hero')}
          >
            <div className="relative w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center shadow-md transition-all duration-500 group-hover:scale-105">
              <img 
                src="/logo/aglogo.PNG" 
                alt="AG Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-display font-black text-lg md:text-xl tracking-tight text-black dark:text-white uppercase leading-none">
              AG VIZTEK STUDIO<span className="text-brandPrimary">.</span>
            </span>
          </div>
        </div>

        {/* Desktop Navigation Link Row */}
        <div className="hidden lg:flex items-center space-x-10">
          <div className="flex items-center space-x-8">
            {navLinks.map(renderNavLink)}
          </div>

          <div className="flex items-center gap-6 pl-8 border-l border-black/10 dark:border-white/10">
            <button onClick={toggleTheme} className="text-black/60 dark:text-white/60 hover:text-brandPrimary transition-colors pt-1">
              {isDarkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <button
              onClick={(e) => handleLinkClick(e as any, 'contact-page')}
              className="px-6 py-2.5 bg-brandPrimary text-white rounded-full text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-md shadow-brandPrimary/20"
            >
              Hire Me
            </button>
          </div>
        </div>

        {/* Mobile burger toggle */}
        <div className="lg:hidden flex items-center gap-4">
          <button onClick={toggleTheme} className="text-black/75 dark:text-white/75">{isDarkMode ? <Sun size={18} /> : <Moon size={18} />}</button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-black/75 dark:text-white/75">{isOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-brandSurface-light dark:bg-brandSurface-dark z-[200] flex flex-col p-10 lg:hidden text-left"
          >
            <div className="flex justify-between items-center mb-16">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center shadow-md">
                  <img 
                    src="/logo/aglogo.PNG" 
                    alt="AG Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-display font-black text-lg tracking-tight text-black dark:text-white uppercase leading-none">
                  AG VIZTEK STUDIO<span className="text-brandPrimary">.</span>
                </span>
              </div>
              <X size={28} onClick={() => setIsOpen(false)} />
            </div>

            <div className="flex flex-col gap-8 overflow-y-auto">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href="#"
                  onClick={(e) => handleLinkClick(e, link.page, link.section)}
                  className="text-4xl font-display font-bold uppercase tracking-tighter hover:text-brandPrimary transition-colors"
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-8 border-t border-black/10 dark:border-white/10 mt-6">
                <button
                  onClick={(e) => handleLinkClick(e as any, 'contact-page')}
                  className="w-full py-5 bg-brandPrimary text-white rounded-[2rem] text-sm font-black uppercase tracking-[0.3em]"
                >
                  Hire Me
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
