import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

type CategoryType = 'web' | 'design' | 'video';

const Pricing: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('web');

  const categories = [
    { id: 'web', label: '💻 Web Development' },
    { id: 'design', label: '🎨 Design & Branding' },
    { id: 'video', label: '🎬 Video Production' }
  ] as const;

  const pricingData: Record<CategoryType, Array<{
    name: string;
    price: string;
    period: string;
    features: string[];
    highlight?: boolean;
    cta: string;
  }>> = {
    web: [
      {
        name: 'Basic Landing',
        price: '₹2,499',
        period: '',
        features: [
          '1 Premium Landing Page',
          'Modern Responsive Design',
          'Standard Lead Capture Form',
          'Google Search Console Setup',
          'Fast Loading Vite/HTML Code',
          '3 Revision Rounds'
        ],
        cta: 'Start Web Project'
      },
      {
        name: 'Pro Website',
        price: '₹9,999',
        period: '',
        features: [
          'Up to 5 Premium Pages',
          'Custom UI & Animations',
          'Dynamic Blog or Portfolio',
          'SEO Keywords Optimization',
          'Interactive Contact Forms',
          '30-Day Launch Support',
          'Unlimited Revision Rounds'
        ],
        highlight: true,
        cta: 'Go Pro Web'
      },
      {
        name: 'Enterprise Web',
        price: "Let's Talk",
        period: '',
        features: [
          'Unlimited Dynamic Pages',
          'Complex Web Applications',
          'Full Database Integration',
          'Secure E-Commerce Setup',
          'High-Performance Next.js',
          'Priority Developer Support',
          '1-on-1 Tech Consulting'
        ],
        cta: 'Get Custom Quote'
      }
    ],
    design: [
      {
        name: 'Starter Design',
        price: '₹499',
        period: '',
        features: [
          '1 Custom Minimalist Logo',
          'Transparent High-Res PNGs',
          'Standard Profile Avatars',
          '2 Revision Rounds',
          'Delivered in 3 Days'
        ],
        cta: 'Start Design Project'
      },
      {
        name: 'Brand Identity',
        price: '₹2,499',
        period: '',
        features: [
          '3 Creative Logo Concepts',
          'Complete Brand Style Guide',
          'Matching Vector Icon Assets',
          '5 Premium Social Media Posts',
          'Vector Master Files (AI/SVG)',
          'Priority Delivery Turnaround',
          'Unlimited Revision Rounds'
        ],
        highlight: true,
        cta: 'Go Pro Design'
      },
      {
        name: 'Custom Creative',
        price: "Let's Talk",
        period: '',
        features: [
          'Full Brand Rebranding Suite',
          'High-Converting YT Thumbnails',
          'Professional Business Cards',
          'Digital Stationery Package',
          'Vector Print-Ready PDFs',
          'Custom Presentation Slides',
          'Direct Design Consulting'
        ],
        cta: 'Consult Designer'
      }
    ],
    video: [
      {
        name: 'Short Form',
        price: '₹999',
        period: '/ video',
        features: [
          'Under 60 Seconds Edit',
          'Dynamic Captions & Subtitles',
          'Sound Effects & Audio Sync',
          'Cinematic Color Correction',
          '2 Revision Rounds',
          'Optimized for Reels & Shorts'
        ],
        cta: 'Start Short Video'
      },
      {
        name: 'Pro YouTube / Ads',
        price: '₹3,499',
        period: '/ video',
        features: [
          'Up to 10 Minutes Edit Length',
          'Sound Design & Foley FX',
          'Engaging Motion Titles',
          'Zoom Transitions & Dynamic Cuts',
          'Advanced Cinematic Color Grading',
          'High-Quality 4K Rendering',
          'Unlimited Revision Rounds'
        ],
        highlight: true,
        cta: 'Go Pro Video'
      },
      {
        name: 'Cinematic Story',
        price: "Let's Talk",
        period: '',
        features: [
          'Full-Length Promos & Ads',
          'Bespoke Background Score Sync',
          'Custom Graphic Asset Elements',
          'Advanced Special VFX Touches',
          'Multi-Camera Cuts & Mastering',
          'Soundtrack Licensing Help',
          'Full Video Brand Consulting'
        ],
        cta: 'Start Custom Story'
      }
    ]
  };

  const currentPlans = pricingData[activeCategory];

  return (
    <section id="pricing" className="py-12 bg-transparent transition-colors duration-300">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-black dark:text-white mb-6 uppercase tracking-tighter">
            Pricing
          </h2>
          <p className="text-xl text-black/50 dark:text-white/40 mb-10 max-w-xl mx-auto font-light">
            Simple and transparent Indian Rupee (INR) packages tailored to your exact project goals.
          </p>
          
          {/* Categories Tab Selector with layoutId indicator for pixel-perfect alignment */}
          <div className="inline-flex bg-black/5 dark:bg-white/5 p-1.5 rounded-full relative shadow-inner flex-wrap justify-center gap-1 sm:gap-0">
            {categories.map((cat) => (
              <button 
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-6 py-3 rounded-full text-xs sm:text-sm font-bold transition-colors duration-300 z-10 ${
                  activeCategory === cat.id 
                    ? 'text-black dark:text-white' 
                    : 'text-black/40 dark:text-white/40 hover:text-black/60 dark:hover:text-white/60'
                }`}
              >
                {activeCategory === cat.id && (
                  <motion.div 
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-white dark:bg-brandCard-dark rounded-full shadow-md border border-black/5 dark:border-white/5 -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto items-stretch">
          <AnimatePresence mode="wait">
            {currentPlans.map((plan, index) => (
              <motion.div 
                key={`${activeCategory}-${plan.name}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                className={`relative p-10 rounded-[2.5rem] flex flex-col justify-between transition-all duration-300 overflow-hidden ${
                  plan.highlight 
                    ? 'bg-brandCard-light dark:bg-brandCard-dark border-2 border-brandPrimary shadow-2xl scale-[1.02] md:scale-105 z-10 py-12' 
                    : 'bg-brandCard-light dark:bg-brandCard-dark border border-black/5 dark:border-white/5 hover:border-brandPrimary/30 shadow-md'
                }`}
              >
                {plan.highlight && (
                  <>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-brandPrimary text-white text-[9px] font-mono font-bold uppercase px-5 py-1.5 rounded-b-xl tracking-widest shadow-md z-20">
                      Most Popular
                    </div>
                    {/* Premium Shimmer effect */}
                    <motion.div
                      className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/5 dark:via-white/[0.03] to-transparent skew-x-12 pointer-events-none"
                      animate={{ left: ['-100%', '200%'] }}
                      transition={{ repeat: Infinity, duration: 3, repeatDelay: 4, ease: "easeInOut" }}
                    />
                  </>
                )}
                
                <div>
                  <h3 className="text-xl font-bold text-black dark:text-white mb-2 relative z-10 uppercase tracking-tighter text-left">
                    {plan.name}
                  </h3>
                  
                  {/* Price display section */}
                  <div className="flex items-baseline mb-8 h-16 relative z-10 justify-start">
                    <span className="text-4xl lg:text-5xl font-display font-black text-black dark:text-white tracking-tight">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-xs text-black/50 dark:text-white/40 ml-1.5 font-medium font-mono uppercase tracking-wider">
                        {plan.period}
                      </span>
                    )}
                  </div>

                  {/* List of details */}
                  <ul className="space-y-4 mb-10 text-left">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3">
                        <div className="bg-brandPrimary/5 p-1 rounded-lg shrink-0 mt-0.5 border border-brandPrimary/10">
                           <Check className="w-3 h-3 text-brandPrimary flex-shrink-0" />
                        </div>
                        <span className="text-sm text-black/70 dark:text-gray-300 leading-tight">
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Action button */}
                <button 
                  className={`w-full py-3.5 rounded-full font-bold text-sm text-center transition-all duration-300 transform active:scale-95 relative z-10 ${
                    plan.highlight 
                      ? 'bg-black dark:bg-white text-white dark:text-black hover:shadow-xl hover:bg-brandPrimary dark:hover:bg-brandPrimary dark:hover:text-white shadow-md' 
                      : 'bg-black/5 dark:bg-white/5 text-black dark:text-white hover:bg-brandPrimary hover:text-white hover:shadow-lg'
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
