
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import TopBar from './components/TopBar';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import PortfolioPage from './components/PortfolioPage';
import ContactStrip from './components/ContactStrip';
import TearSection from './components/TearSection';
import ServiceDetail from './components/ServiceDetail';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import AiCompanion from './components/AiCompanion';
import FloatingControls from './components/FloatingControls';
import { SERVICES } from './constants';
import { ViewState, Theme } from './types';
import { ArrowLeft } from 'lucide-react';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'dark';
    }
    return 'dark';
  });
  
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      let shouldBeDark = false;
      if (theme === 'system') {
        shouldBeDark = mediaQuery.matches;
      } else {
        shouldBeDark = theme === 'dark';
      }
      
      setIsDarkMode(shouldBeDark);
      if (shouldBeDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
    };

    applyTheme();
    
    const listener = () => {
      if (theme === 'system') applyTheme();
    };
    
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [theme]);

  const handleNavigate = (page: string, sectionId?: string) => {
    if (page === 'home') {
      setCurrentView('home');
      setSelectedServiceId(null);
      if (sectionId) {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      setCurrentView(page as ViewState);
      setSelectedServiceId(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectService = (id: string) => {
    setSelectedServiceId(id);
    setCurrentView('service-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeService = SERVICES.find(s => s.id === selectedServiceId) || null;

  return (
    <div className="bg-brandSurface-light dark:bg-brandSurface-dark min-h-screen text-black dark:text-white transition-colors duration-700">
      <TopBar />
      <Navbar 
        isDarkMode={isDarkMode} 
        toggleTheme={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')} 
        currentPage={currentView} 
        onNavigate={handleNavigate}
        onSelectService={handleSelectService}
        showBack={currentView !== 'home'}
        onBack={() => handleNavigate('home')}
      />
      
      {/* <AiCompanion currentTheme={theme} onSetTheme={setTheme} /> */}
      <FloatingControls />

      <main className="relative">
        <AnimatePresence mode="wait">
          {currentView === 'home' ? (
            <motion.div
              key="home-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <TearSection onContact={() => handleNavigate('contact-page')} />
              <div className="relative z-20 -mt-[100vh]">
                <Services onSelectService={handleSelectService} onNavigate={(page) => handleNavigate(page)} />
                <Portfolio onViewAll={() => handleNavigate('portfolio-page')} />
                <Testimonials />
                <ContactStrip onContact={() => handleNavigate('contact-page')} />
              </div>
            </motion.div>
          ) : currentView === 'about-page' ? (
            <AboutPage key="about-view" onBack={() => handleNavigate('home')} />
          ) : currentView === 'contact-page' ? (
            <ContactPage key="contact-view" onBack={() => handleNavigate('home')} />
          ) : currentView === 'portfolio-page' ? (
            <PortfolioPage key="portfolio-view" onBack={() => handleNavigate('home')} />
          ) : (currentView === 'service-detail' && activeService) ? (
            <ServiceDetail 
              key="service-detail"
              service={activeService} 
              onBack={() => handleNavigate('home')}
              onContact={() => handleNavigate('contact-page')}
            />
          ) : currentView === 'pricing-page' ? (
            <motion.div
              key="pricing-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-32 bg-brandSurface-light dark:bg-brandSurface-dark transition-colors duration-1000 min-h-screen text-black dark:text-white"
            >
              <div className="max-w-[85rem] mx-auto px-6">
                <button
                  onClick={() => handleNavigate('home')}
                  className="mb-12 flex items-center gap-2 text-black/40 dark:text-white/40 hover:text-brandPrimary transition-colors group/back font-mono text-[10px] uppercase tracking-widest"
                >
                  <ArrowLeft size={16} className="group-hover/back:-translate-x-1.5 transition-transform" />
                  Return Home
                </button>
                <Pricing />
              </div>
            </motion.div>
          ) : currentView === 'services-hub' ? (
            <motion.div
              key="services-hub"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-32 bg-brandSurface-light dark:bg-brandSurface-dark transition-colors duration-1000 min-h-screen text-black dark:text-white"
            >
              <div className="max-w-[90rem] mx-auto px-6 md:px-12">
                <button
                  onClick={() => handleNavigate('home')}
                  className="mb-12 flex items-center gap-2 text-black/40 dark:text-white/40 hover:text-brandPrimary transition-colors group/back font-mono text-[10px] uppercase tracking-widest"
                >
                  <ArrowLeft size={16} className="group-hover/back:-translate-x-1.5 transition-transform" />
                  Return Home
                </button>
                <Services onSelectService={handleSelectService} isFullPage={true} />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>
      
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
