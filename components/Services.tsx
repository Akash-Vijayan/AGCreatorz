import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES } from '../constants';
import { ArrowRight, Globe, Box, PlayCircle, Shield, Search, Share2 } from 'lucide-react';

interface ServicesProps {
  onSelectService: (serviceId: string) => void;
  isFullPage?: boolean;
  onNavigate?: (page: string) => void;
}

// Extended Services List specifically for the dedicated Services Hub Page
const ALL_SERVICES = [
  ...SERVICES,
  {
    id: 'seo',
    title: "SEO & Search Strategy",
    description: "We optimize your website to help you rank higher on Google search, get more organic clicks, and reach a larger audience.",
    price: "From ₹1,500",
    icon: 'seo',
    details: {
      features: [
        "Google Search Optimizations",
        "Keywords Selection & Audits",
        "Speed & Core Web Vitals Test",
        "Search Console Setup"
      ]
    }
  },
  {
    id: 'consult',
    title: "IT Support & Consulting",
    description: "We help you pick the right tech stack, configure secure cloud hosting, and secure your digital systems from threats.",
    price: "From ₹3,000",
    icon: 'consult',
    details: {
      features: [
        "Tech Stack Recommendations",
        "Cloud & Host Setups",
        "SSL & Security Certificates",
        "30-Day Systems Support"
      ]
    }
  },
  {
    id: 'social',
    title: "Social Media & Brand Growth",
    description: "We design high-converting YouTube thumbnails, structure viral short-form scripts, and manage your social channels to build a massive loyal audience.",
    price: "From ₹1,200",
    icon: 'social',
    details: {
      features: [
        "YouTube Channel Strategy",
        "Viral Thumbnail Design",
        "Instagram & Reel Scripts",
        "Audience Growth Loops"
      ]
    }
  }
];

// Shared Framer Motion Variants for high-performance decoupled spring card hover animations
const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 35 
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: index * 0.1,
      ease: [0.215, 0.61, 0.355, 1] // modern easeOutCubic
    }
  }),
  hover: {
    y: -10,
    scale: 1.015,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 24,
      mass: 0.8
    }
  }
};

// --- SUB-ELEMENT FRAMER MOTION VARIANTS FOR INSIDE COMING & HOVER ANIMATIONS ---

// 1. Web Code Preview Variants
const codeTerminalVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1, 
    transition: { type: "spring", stiffness: 100, damping: 15, delay: 0.1 } 
  },
  hover: { 
    scale: 1.01, 
    borderColor: "rgba(16, 185, 129, 0.3)", 
    boxShadow: "0 0 25px rgba(16, 185, 129, 0.12)",
    transition: { duration: 0.3 }
  }
};

const codeLineVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: (idx: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.2 + idx * 0.05, duration: 0.3 }
  }),
  hover: {
    color: "#34d399",
    x: 2,
    transition: { duration: 0.2 }
  }
};

const laserScanVariants = {
  hidden: { top: "-10%", opacity: 0 },
  visible: { opacity: 0 },
  hover: {
    top: ["0%", "100%", "0%"],
    opacity: [0, 0.3, 0],
    transition: { repeat: Infinity, duration: 3, ease: "linear" }
  }
};

// 2. Design Canvas Preview Variants
const designCanvasVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1, 
    transition: { type: "spring", stiffness: 100, damping: 15, delay: 0.1 } 
  },
  hover: { 
    scale: 1.01, 
    borderColor: "rgba(130, 77, 105, 0.3)", 
    boxShadow: "0 0 25px rgba(130, 77, 105, 0.12)",
    transition: { duration: 0.3 }
  }
};

const outerCircleVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 360,
    transition: {
      type: "spring", 
      stiffness: 80, 
      damping: 15,
      rotate: { repeat: Infinity, duration: 16, ease: "linear" }
    }
  },
  hover: {
    scale: 1.06,
    rotate: 360 * 3,
    borderColor: "rgba(130, 77, 105, 0.6)",
    transition: {
      rotate: { repeat: Infinity, duration: 4, ease: "linear" }
    }
  }
};

const innerCircleVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: -360,
    transition: {
      type: "spring", 
      stiffness: 100, 
      damping: 15,
      rotate: { repeat: Infinity, duration: 12, ease: "linear" }
    }
  },
  hover: {
    scale: 1.08,
    rotate: -360 * 4,
    borderColor: "rgba(130, 77, 105, 0.8)",
    transition: {
      rotate: { repeat: Infinity, duration: 2.5, ease: "linear" }
    }
  }
};

const diamondVariants = {
  hidden: { scale: 0, rotate: 0 },
  visible: {
    scale: 1,
    rotate: 45,
    transition: { type: "spring", stiffness: 150, damping: 12, delay: 0.3 }
  },
  hover: {
    scale: 1.25,
    rotate: 225,
    backgroundColor: "#824D69",
    transition: { type: "spring", stiffness: 300, damping: 15 }
  }
};

const splinePathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 0.25,
    transition: { duration: 1.5, ease: "easeInOut", delay: 0.2 }
  },
  hover: {
    pathLength: 1,
    opacity: 0.8,
    stroke: "#824D69",
    strokeWidth: 1.5,
    transition: { duration: 0.3 }
  }
};

// 3. Video Timeline Variants
const videoTimelineVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1, 
    transition: { type: "spring", stiffness: 100, damping: 15, delay: 0.1 } 
  },
  hover: { 
    scale: 1.01, 
    borderColor: "rgba(130, 77, 105, 0.3)", 
    boxShadow: "0 0 25px rgba(130, 77, 105, 0.12)",
    transition: { duration: 0.3 }
  }
};

const videoTrackVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 14, delay: 0.25 }
  },
  hover: {
    scale: 1.015,
    borderColor: "rgba(130, 77, 105, 0.4)",
    backgroundColor: "rgba(130, 77, 105, 0.15)",
    transition: { duration: 0.2 }
  }
};

const audioBarVariants = {
  hidden: { scaleY: 0.2, opacity: 0.3 },
  visible: (idx: number) => ({
    scaleY: 1,
    opacity: 0.75,
    transition: { type: "spring", stiffness: 150, damping: 15, delay: 0.2 + idx * 0.015 }
  }),
  hover: {
    opacity: 1,
    backgroundColor: "#824D69",
    transition: { duration: 0.2 }
  }
};

const playheadVariants = {
  hidden: { left: "0%", opacity: 0 },
  visible: { opacity: 0 },
  hover: {
    left: ["0%", "100%", "0%"],
    opacity: [0, 0.7, 0],
    transition: { repeat: Infinity, duration: 4, ease: "easeInOut" }
  }
};


// 💻 Mock Web Code IDE Element for Web Card (Synchronized with parent variant state)
const WebCodePreview: React.FC<{ isHovered: boolean }> = ({ isHovered }) => {
  const codeLines = [
    "const App = () => {",
    "  const [fast, setFast] = useState(true);",
    "  return (",
    "    <div className=\"seo-ready\">",
    "      <GoogleScore value={100} />",
    "    </div>",
    "  );",
    "};"
  ];

  return (
    <motion.div 
      variants={codeTerminalVariants}
      className="w-full bg-black/90 rounded-[1.5rem] p-5 font-mono text-[9px] text-emerald-400 border border-white/10 shadow-2xl relative overflow-hidden h-[180px] flex flex-col justify-between text-left"
    >
      <div className="flex gap-1.5 border-b border-white/5 pb-2">
        <div className={`w-1.5 h-1.5 rounded-full bg-red-500 transition-transform duration-300 ${isHovered ? 'scale-110 shadow-[0_0_6px_#ef4444]' : ''}`} />
        <div className={`w-1.5 h-1.5 rounded-full bg-yellow-500 transition-transform duration-300 ${isHovered ? 'scale-110 shadow-[0_0_6px_#eab308]' : ''}`} />
        <div className={`w-1.5 h-1.5 rounded-full bg-green-500 transition-transform duration-300 ${isHovered ? 'scale-110 shadow-[0_0_6px_#22c55e]' : ''}`} />
        <span className="text-white/20 text-[6px] ml-2 tracking-widest uppercase">WebsiteEngine.tsx</span>
      </div>
      
      {/* Code Text Block with laser scan line */}
      <div className="space-y-1.5 flex-1 pt-2 overflow-hidden text-left relative">
        <motion.div 
          variants={laserScanVariants}
          className="absolute left-0 right-0 h-[1px] bg-emerald-400/80 shadow-[0_0_8px_#34d399] z-20 pointer-events-none"
        />
        
        {codeLines.map((line, idx) => (
          <motion.div
            key={idx}
            custom={idx}
            variants={codeLineVariants}
            className="font-mono text-[9px] leading-relaxed whitespace-pre"
          >
            {line}
          </motion.div>
        ))}
      </div>
      
      <div className="text-[7px] text-white/20 uppercase tracking-widest text-right flex justify-between items-center border-t border-white/5 pt-1.5">
        <span>{isHovered ? "ACCELERATED COMPILE ACTIVE" : "IDLE // READY"}</span>
        <span>SYSTEM ONLINE // 0 ERRORS</span>
      </div>
    </motion.div>
  );
};

// 🎨 Mock Design Canvas Board for Brand Card (Synchronized with parent variant state)
const DesignPreview: React.FC<{ isHovered: boolean }> = ({ isHovered }) => (
  <motion.div 
    variants={designCanvasVariants}
    className="w-full bg-brandSurface-light dark:bg-brandSurface-dark border border-black/5 dark:border-white/5 rounded-[1.5rem] p-5 shadow-2xl relative h-[180px] overflow-hidden flex flex-col justify-between text-left"
  >
    <div className="flex justify-between items-center border-b border-black/5 dark:border-white/5 pb-2">
      <span className="text-[7px] font-mono text-black/40 dark:text-white/30 uppercase tracking-widest">Canvas // Shape Anchor Grid</span>
      <div className="flex gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-brandPrimary shadow-[0_0_8px_#824D69]" />
        <span className="w-1.5 h-1.5 rounded-full bg-black/10 dark:bg-white/10 animate-ping" />
      </div>
    </div>
    <div className="my-auto flex justify-center items-center relative py-2 w-full h-[80px]">
      {/* Crease canvas lines drawing dynamically */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 100 60">
        <motion.path 
          d="M 10 30 Q 30 10 50 30 T 90 30" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="0.75"
          variants={splinePathVariants}
        />
        <circle cx="50" cy="30" r="1.5" fill="#824D69" className="animate-pulse" />
      </svg>
      
      {/* Dual Rotating dashed rings around central vector shape */}
      <motion.div 
        variants={outerCircleVariants}
        className="w-14 h-14 border border-dashed border-brandPrimary/30 rounded-full flex items-center justify-center relative z-10"
      >
        <motion.div 
          variants={innerCircleVariants}
          className="w-8 h-8 border border-dashed border-brandPrimary/50 rounded-full flex items-center justify-center"
        >
          <motion.div 
            variants={diamondVariants}
            className="w-2.5 h-2.5 bg-brandPrimary rounded-sm rotate-45 shadow-[0_0_10px_#824D69]"
          />
        </motion.div>
      </motion.div>
      <div className="absolute right-6 flex flex-col gap-1 z-10">
        <div className={`w-2.5 h-2.5 rounded-full bg-brandPrimary border border-white/20 transition-all duration-300 ${isHovered ? 'animate-ping' : 'animate-pulse'}`} />
        <div className="w-2.5 h-2.5 rounded-full bg-brandPrimary-light border border-white/20" />
      </div>
    </div>
    <div className="text-[7px] font-mono text-black/30 dark:text-white/20 uppercase tracking-widest text-center">Vector layout curves balanced // 100% Custom</div>
  </motion.div>
);

// 🎬 Mock Video Timeline Track for Video Card (Synchronized with parent variant state)
const VideoPreview: React.FC<{ isHovered: boolean }> = ({ isHovered }) => {
  const [heights, setHeights] = useState([20, 50, 30, 70, 90, 30, 60, 20, 80, 40, 60, 20, 50, 80, 90, 40, 70, 30, 50]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeights(prev => prev.map(() => Math.floor(Math.random() * 85) + 15));
    }, isHovered ? 75 : 150); // Speed up spectrum frequency updates when hovered
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <motion.div 
      variants={videoTimelineVariants}
      className="w-full bg-black/90 rounded-[1.5rem] p-5 font-mono text-[8px] text-white/50 border border-white/10 shadow-2xl relative h-[180px] overflow-hidden flex flex-col justify-between text-left"
    >
      <div className="flex justify-between items-center border-b border-white/5 pb-2">
        <div className="flex items-center gap-1.5">
          <div className={`w-2 h-2 rounded-full bg-red-600 ${isHovered ? 'animate-[ping_1s_infinite]' : 'animate-pulse'}`} />
          <span className="text-[7px] uppercase tracking-widest text-red-500 font-black">TIMELINE TRACKS</span>
        </div>
        <span className="text-[7px] text-white/30">00:04:12 // 00:15:00</span>
      </div>
      <div className="space-y-2 my-auto relative">
        {/* Sliding scrubbing playhead overlay */}
        <motion.div 
          variants={playheadVariants}
          className="absolute top-0 bottom-0 w-[1px] bg-red-500 shadow-[0_0_8px_#ef4444] z-20 pointer-events-none"
        />

        <motion.div 
          variants={videoTrackVariants}
          className="h-6 bg-brandPrimary/10 border border-brandPrimary/20 rounded-lg flex items-center px-2.5 justify-between border"
        >
          <span className="text-brandPrimary text-[6px] font-black">MAIN_SEQUENCE_EDITS.MP4</span>
          <span className="text-[5px] text-white/30">{isHovered ? "60 FPS // RENDER SCAN" : "60 FPS"}</span>
        </motion.div>
        
        <div className="h-6 bg-brandCard-dark/80 border border-white/5 rounded-lg flex items-center px-2.5 gap-0.5 relative z-10">
          {heights.map((h, idx) => (
            <motion.div 
              key={idx} 
              custom={idx}
              variants={audioBarVariants}
              className="bg-brandPrimary-light/75 rounded-full flex-1 transition-all duration-150"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
      <div className="text-[7px] text-brandPrimary uppercase tracking-widest text-center">SOUND EFFECTS & SMOOTH CUTS ACTIVE</div>
    </motion.div>
  );
};

// 🔍 Mock Google SERP / Analytics Panel for SEO Card (Synchronized with parent variant state)
const SeoPreview: React.FC<{ isHovered: boolean }> = ({ isHovered }) => (
  <motion.div 
    variants={designCanvasVariants}
    className="w-full bg-brandSurface-light dark:bg-brandSurface-dark/80 border border-black/5 dark:border-white/10 rounded-[1.5rem] p-5 shadow-2xl relative h-[180px] overflow-hidden flex flex-col justify-between font-mono text-[9px]"
  >
    <div className="flex justify-between items-center border-b border-black/5 dark:border-white/5 pb-2">
      <span className="text-[7px] text-black/40 dark:text-white/30 uppercase tracking-widest font-bold">Search Console Core</span>
      <div className="flex gap-1.5 items-center">
        <div className={`w-1.5 h-1.5 rounded-full bg-emerald-500 ${isHovered ? 'animate-ping' : 'animate-pulse'}`} />
        <span className="text-[6px] text-emerald-500 uppercase font-black">OPTIMIZED</span>
      </div>
    </div>

    <div className="my-auto grid grid-cols-12 gap-4 py-2">
      {/* Progress Dial */}
      <div className="col-span-5 flex flex-col items-center justify-center relative">
        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-black/5 dark:text-white/5"
            strokeWidth="2.5"
            stroke="currentColor"
            fill="transparent"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <motion.path
            className="text-brandPrimary"
            strokeWidth="2.5"
            strokeDasharray="99, 100"
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            initial={{ strokeDasharray: "0, 100" }}
            animate={isHovered ? { strokeDasharray: "99, 100" } : { strokeDasharray: "72, 100" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-[10px] font-black text-black dark:text-white transition-all duration-300">
            {isHovered ? "99%" : "72%"}
          </span>
          <span className="text-[4px] text-black/40 dark:text-white/30 uppercase tracking-widest">Score</span>
        </div>
      </div>

      {/* Stats and keywords */}
      <div className="col-span-7 space-y-1.5 flex flex-col justify-center text-left">
        <div className="flex justify-between items-center">
          <span className="text-black/40 dark:text-white/30 text-[7px] uppercase">Keywords #1</span>
          <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded font-black text-[7px] animate-pulse">+140%</span>
        </div>
        <div className="space-y-1 font-mono text-[7px]">
          <div className="flex items-center gap-1.5 text-black/60 dark:text-white/60">
            <div className={`w-1 h-1 rounded-full transition-all duration-300 ${isHovered ? 'bg-emerald-500 scale-125 shadow-[0_0_6px_#10b981]' : 'bg-brandPrimary'}`} />
            <span>"AG Creatorz" <b className="text-emerald-500 font-bold ml-1">#1 Rank</b></span>
          </div>
          <div className="flex items-center gap-1.5 text-black/60 dark:text-white/60">
            <div className={`w-1 h-1 rounded-full transition-all duration-300 ${isHovered ? 'bg-emerald-500 scale-125 shadow-[0_0_6px_#10b981]' : 'bg-brandPrimary'}`} />
            <span>"Premium Editor" <b className="text-emerald-500 font-bold ml-1">#1 Rank</b></span>
          </div>
        </div>
      </div>
    </div>

    {/* Sparkline Graph */}
    <div className="h-6 w-full flex items-end gap-[2px] opacity-75 group-hover:opacity-100 transition-opacity">
      {[20, 25, 18, 30, 45, 38, 55, 60, 52, 68, 85, 75, 95].map((val, idx) => (
        <motion.div
          key={idx}
          className="bg-brandPrimary/30 rounded-t-[1px] flex-1"
          initial={{ height: "10%" }}
          animate={isHovered ? { height: `${val}%`, backgroundColor: "#824D69" } : { height: `${val * 0.7}%`, backgroundColor: "rgba(130, 77, 105, 0.3)" }}
          transition={{ type: "spring", stiffness: 120, delay: idx * 0.02 }}
        />
      ))}
    </div>
  </motion.div>
);

// 💻 Cloud Virtual Server Panel for IT/Consulting Card (Synchronized with parent variant state)
const ConsultPreview: React.FC<{ isHovered: boolean }> = ({ isHovered }) => (
  <motion.div 
    variants={designCanvasVariants}
    className="w-full bg-brandSurface-light dark:bg-brandSurface-dark/80 border border-black/5 dark:border-white/10 rounded-[1.5rem] p-5 shadow-2xl relative h-[180px] overflow-hidden flex flex-col justify-between font-mono text-[9px]"
  >
    <div className="flex justify-between items-center border-b border-black/5 dark:border-white/5 pb-2">
      <span className="text-[7px] text-black/40 dark:text-white/30 uppercase tracking-widest font-bold">SysAdmin Console</span>
      <div className="flex items-center gap-1">
        <span className={`w-1.5 h-1.5 rounded-full bg-cyan-400 ${isHovered ? 'animate-ping' : 'animate-pulse'}`} />
        <span className="text-[6px] text-cyan-400 font-black">99.99% UPTIME</span>
      </div>
    </div>

    <div className="my-auto space-y-2 py-1">
      {/* Servers status */}
      <div className="flex justify-between items-center gap-2">
        {["Node-Alpha", "Node-Beta", "Host-Secure"].map((name, i) => (
          <div key={i} className={`flex-1 p-2 rounded-lg border transition-all duration-300 flex flex-col gap-1 items-center ${
            isHovered ? 'bg-cyan-500/5 border-cyan-500/20' : 'bg-black/[0.02] dark:bg-white/[0.02] border-black/5 dark:border-white/5'
          }`}>
            <span className="text-[5px] text-black/40 dark:text-white/20 uppercase tracking-tighter">{name}</span>
            <div className="flex items-center gap-1">
              <motion.div 
                className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                animate={isHovered ? { scale: [1, 1.5, 1] } : {}}
                transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
              />
              <span className="text-[6px] font-black text-black/70 dark:text-white/70">OK</span>
            </div>
          </div>
        ))}
      </div>

      {/* Resources pulse */}
      <div className="space-y-1">
        <div className="flex justify-between text-[6px] text-black/40 dark:text-white/30 uppercase">
          <span>CPU Load</span>
          <span className="font-bold text-black dark:text-white transition-all duration-300">{isHovered ? "82%" : "38%"}</span>
        </div>
        <div className="h-1 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-cyan-500 rounded-full" 
            initial={{ width: "38%" }}
            animate={isHovered ? { width: "82%" } : { width: "38%" }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          />
        </div>
      </div>
    </div>

    <div className={`text-[6px] font-black border px-2 py-1 rounded-lg flex items-center justify-between transition-all duration-300 ${
      isHovered ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.1)]' : 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5'
    }`}>
      <span>SSL SECURE HTTPS</span>
      <span>SECURE SHIELD</span>
    </div>
  </motion.div>
);

// 📈 Simulated Audience Analytics Loop for Social Growth Card (Synchronized with parent variant state)
const SocialPreview: React.FC<{ isHovered: boolean }> = ({ isHovered }) => {
  const [subCount, setSubCount] = useState(14240);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered) {
      interval = setInterval(() => {
        setSubCount(prev => {
          if (prev >= 14890) return 14240;
          return prev + Math.floor(Math.random() * 30) + 15;
        });
      }, 80);
    } else {
      setSubCount(14240);
    }
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <motion.div 
      variants={designCanvasVariants}
      className="w-full bg-brandSurface-light dark:bg-brandSurface-dark/80 border border-black/5 dark:border-white/10 rounded-[1.5rem] p-5 shadow-2xl relative h-[180px] overflow-hidden flex flex-col justify-between font-mono text-[9px]"
    >
      <div className="flex justify-between items-center border-b border-black/5 dark:border-white/5 pb-2">
        <span className="text-[7px] text-black/40 dark:text-white/30 uppercase tracking-widest font-bold">Viral Metrics Hub</span>
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full bg-rose-500 ${isHovered ? 'animate-ping' : 'animate-pulse'}`} />
          <span className="text-[6px] text-rose-500 font-black">AUDIENCE GAIN</span>
        </div>
      </div>

      <div className="my-auto space-y-2 py-1">
        {/* Followers Counter */}
        <div className={`text-center p-2 rounded-xl border transition-all duration-300 ${
          isHovered ? 'bg-rose-500/10 border-rose-500/25 shadow-[0_0_15px_rgba(244,63,94,0.1)] scale-105' : 'bg-rose-500/5 border-rose-500/10'
        }`}>
          <span className="text-[6px] text-black/40 dark:text-white/20 uppercase tracking-widest block mb-0.5">Audience Engine</span>
          <span className="text-base font-black text-rose-500 tracking-tight">
            {subCount.toLocaleString()} SUBS
          </span>
        </div>

        {/* Engagement stats */}
        <div className="grid grid-cols-2 gap-2 text-[6px]">
          <div className={`p-1.5 rounded border transition-all duration-300 flex flex-col items-center ${
            isHovered ? 'bg-black/10 dark:bg-white/10 border-black/10 dark:border-white/10' : 'bg-black/5 dark:bg-white/5 border-transparent'
          }`}>
            <span className="opacity-40 uppercase text-[5px]">CTR Ratio</span>
            <span className="text-[8px] font-black text-black dark:text-white mt-0.5">12.8%</span>
          </div>
          <div className={`p-1.5 rounded border transition-all duration-300 flex flex-col items-center ${
            isHovered ? 'bg-black/10 dark:bg-white/10 border-black/10 dark:border-white/10' : 'bg-black/5 dark:bg-white/5 border-transparent'
          }`}>
            <span className="opacity-40 uppercase text-[5px]">Multiplier</span>
            <span className="text-[8px] font-black text-black dark:text-white mt-0.5">9.4x</span>
          </div>
        </div>
      </div>

      <div className="text-[6px] text-black/30 dark:text-white/20 uppercase tracking-widest text-center">
        content loop active // viral growth logs
      </div>
    </motion.div>
  );
};

// 💎 Interactive Custom Bento Card Wrapper
const BentoCard: React.FC<{
  service: typeof ALL_SERVICES[0];
  index: number;
  onSelect: (id: string) => void;
}> = ({ service, index, onSelect }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const isInteractive = service.id === 'web' || service.id === 'design' || service.id === 'video';

  const renderPreview = () => {
    switch (service.id) {
      case 'web':
        return <WebCodePreview isHovered={isHovered} />;
      case 'design':
        return <DesignPreview isHovered={isHovered} />;
      case 'video':
        return <VideoPreview isHovered={isHovered} />;
      case 'seo':
        return <SeoPreview isHovered={isHovered} />;
      case 'consult':
        return <ConsultPreview isHovered={isHovered} />;
      case 'social':
        return <SocialPreview isHovered={isHovered} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => isInteractive && onSelect(service.id)}
      className={`p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] bg-brandCard-light dark:bg-brandCard-dark border border-black/5 dark:border-white/5 hover:border-brandPrimary/30 transition-colors duration-500 flex flex-col justify-between min-h-[380px] lg:min-h-[420px] relative group overflow-hidden shadow-md hover:shadow-2xl z-10 ${
        isInteractive ? 'cursor-pointer' : 'cursor-default'
      } ${
        service.id === 'web' || service.id === 'seo' || service.id === 'consult'
          ? 'lg:col-span-2'
          : 'lg:col-span-1'
      }`}
    >
      {/* Spotlight Glow Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(130, 77, 105, 0.08), transparent 80%)`
        }}
      />

      {/* Visual Number */}
      <div className="absolute top-6 right-8 text-7xl font-display font-black text-black/[0.02] dark:text-white/[0.01] pointer-events-none select-none z-0">
        0{index + 1}
      </div>

      <div className="space-y-6 relative z-10 flex-1 flex flex-col">
        {/* Icon & Category Row */}
        <div className="flex justify-between items-center w-full">
          <div className="w-12 h-12 rounded-2xl bg-brandPrimary/5 text-brandPrimary flex items-center justify-center group-hover:bg-brandPrimary group-hover:text-white transition-all duration-500 shadow-md shrink-0">
            {service.icon === 'web' ? <Globe className="w-6 h-6" /> : null}
            {service.icon === 'design' ? <Box className="w-6 h-6" /> : null}
            {service.icon === 'video' ? <PlayCircle className="w-6 h-6" /> : null}
            {service.icon === 'seo' ? <Search className="w-6 h-6" /> : null}
            {service.icon === 'consult' ? <Shield className="w-6 h-6" /> : null}
            {service.icon === 'social' ? <Share2 className="w-6 h-6" /> : null}
          </div>
          <span className="text-[8px] font-mono text-black/40 dark:text-white/20 uppercase tracking-widest bg-black/[0.03] dark:bg-white/[0.03] px-2.5 py-1 rounded-full">
            {service.id === 'web' || service.id === 'design' || service.id === 'video' ? 'Core Service' : 'Growth Stack'}
          </span>
        </div>

        {/* Title and Description */}
        <div className="space-y-3 text-left">
          <h3 className="text-2xl sm:text-3xl font-display font-bold uppercase text-black dark:text-white group-hover:text-brandPrimary transition-colors tracking-tight">
            {service.title}
          </h3>
          <p className="text-xs sm:text-sm text-black/50 dark:text-white/40 leading-relaxed font-light">
            {service.description}
          </p>
        </div>

        {/* Embedded Interactive Widget Area */}
        <div className="mt-4 flex-1 flex items-center justify-center w-full">
          {renderPreview()}
        </div>
      </div>

      {/* Card Footer Details */}
      <div className="border-t border-black/5 dark:border-white/5 pt-6 flex justify-between items-center mt-6 relative z-10">
        <div className="text-left">
          <span className="text-[7px] font-mono text-black/30 dark:text-white/20 uppercase tracking-widest block mb-1">Pricing</span>
          <span className="text-xl font-mono font-bold text-black dark:text-white">{service.price}</span>
        </div>
        
        {isInteractive ? (
          <div className="w-9 h-9 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:bg-brandPrimary group-hover:text-white group-hover:border-brandPrimary transition-all duration-300 shadow-md">
            <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
          </div>
        ) : (
          <span className="text-[7px] font-mono text-brandPrimary uppercase tracking-widest border border-brandPrimary/20 bg-brandPrimary/5 px-3 py-1.5 rounded-full font-bold">
            Scalable Add-on
          </span>
        )}
      </div>
    </motion.div>
  );
};

// 💎 Interactive Custom Homepage Card Wrapper (Horizontal Deck)
const HomepageCard: React.FC<{
  service: typeof SERVICES[0];
  index: number;
  onSelect: (id: string) => void;
}> = ({ service, index, onSelect }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const renderPreview = () => {
    switch (service.id) {
      case 'web':
        return <WebCodePreview isHovered={isHovered} />;
      case 'design':
        return <DesignPreview isHovered={isHovered} />;
      case 'video':
        return <VideoPreview isHovered={isHovered} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(service.id)}
      className="p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] bg-brandCard-light dark:bg-brandCard-dark border border-black/5 dark:border-white/5 hover:border-brandPrimary/30 transition-colors duration-500 flex flex-col justify-between min-h-[420px] relative group overflow-hidden shadow-md hover:shadow-2xl cursor-pointer z-10"
    >
      {/* Spotlight Glow Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(130, 77, 105, 0.08), transparent 80%)`
        }}
      />

      {/* Visual Number */}
      <div className="absolute top-6 right-8 text-7xl font-display font-black text-black/[0.02] dark:text-white/[0.01] pointer-events-none select-none z-0">
        0{index + 1}
      </div>

      <div className="space-y-6 relative z-10 flex-1 flex flex-col">
        {/* Icon & Category Row */}
        <div className="flex justify-between items-center w-full">
          <div className="w-12 h-12 rounded-2xl bg-brandPrimary/5 text-brandPrimary flex items-center justify-center group-hover:bg-brandPrimary group-hover:text-white transition-all duration-500 shadow-md shrink-0">
            {service.icon === 'web' ? <Globe className="w-6 h-6" /> : null}
            {service.icon === 'design' ? <Box className="w-6 h-6" /> : null}
            {service.icon === 'video' ? <PlayCircle className="w-6 h-6" /> : null}
          </div>
          <span className="text-[8px] font-mono text-black/40 dark:text-white/20 uppercase tracking-widest bg-black/[0.03] dark:bg-white/[0.03] px-2.5 py-1 rounded-full">
            Core Service
          </span>
        </div>

        {/* Title and Description */}
        <div className="space-y-3 text-left">
          <h3 className="text-2xl sm:text-3xl font-display font-bold uppercase text-black dark:text-white group-hover:text-brandPrimary transition-colors tracking-tight">
            {service.title}
          </h3>
          <p className="text-xs sm:text-sm text-black/50 dark:text-white/40 leading-relaxed font-light min-h-[60px]">
            {service.description}
          </p>
        </div>

        {/* Embedded Interactive Widget Area */}
        <div className="mt-4 flex-1 flex items-center justify-center w-full">
          {renderPreview()}
        </div>
      </div>

      {/* Card Footer Details */}
      <div className="border-t border-black/5 dark:border-white/5 pt-6 flex justify-between items-center mt-6 relative z-10">
        <div className="text-left">
          <span className="text-[7px] font-mono text-black/30 dark:text-white/20 uppercase tracking-widest block mb-1">Pricing</span>
          <span className="text-xl font-mono font-bold text-black dark:text-white">{service.price}</span>
        </div>
        
        <div className="w-9 h-9 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:bg-brandPrimary group-hover:text-white group-hover:border-brandPrimary transition-all duration-300 shadow-md">
          <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

const Services: React.FC<ServicesProps> = ({ onSelectService, isFullPage = false }) => {

  // --- RENDERING ROUTE: DEDICATED SERVICES ARCHIVE PAGE (Bento Grid Dashboard) ---
  if (isFullPage) {
    return (
      <section className="relative py-12 bg-transparent overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.02] sm:opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="max-w-[90rem] mx-auto relative z-10 px-4 sm:px-6">
          <div className="text-left mb-16 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-brandPrimary" />
              <span className="text-[9px] sm:text-[10px] font-mono font-black uppercase tracking-[0.5em] text-brandPrimary">Capability Catalog</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-black dark:text-white uppercase tracking-tighter">
              All Services
            </h2>
            <p className="text-lg text-black/50 dark:text-white/40 font-light max-w-xl">
              Explore our complete suite of custom web development, brand design, video production, and digital growth systems.
            </p>
          </div>

          {/* Premium Bento Grid Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ALL_SERVICES.map((service, i) => (
              <BentoCard key={service.id} service={service} index={i} onSelect={onSelectService} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // --- RENDERING ROUTE: HOMEPAGE VIEW (Horizontal Interactive Card Deck) ---
  return (
    <section 
      id="services" 
      className="relative py-20 sm:py-32 bg-brandSurface-light dark:bg-brandSurface-dark transition-colors duration-1000 overflow-hidden"
    >
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.02] sm:opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-[90rem] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 sm:mb-24 border-b border-black/5 dark:border-white/5 pb-8 sm:pb-12 text-left">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 sm:w-8 h-[1px] bg-brandPrimary" />
              <span className="text-[9px] sm:text-[10px] font-mono font-black uppercase tracking-[0.4em] sm:tracking-[0.5em] text-brandPrimary">Capability Archive</span>
            </div>
            <h2 className="text-4xl sm:text-7xl font-display font-bold uppercase tracking-tighter leading-tight">
              OUR <span className="text-brandPrimary italic font-serif lowercase font-normal tracking-normal pl-1 inline-block">Expertise</span>
            </h2>
          </div>
          <div className="hidden md:block max-w-[240px] text-right">
             <p className="text-black/40 dark:text-white/20 text-[10px] font-mono uppercase tracking-widest leading-relaxed">
               Hover on a service to initiate its interactive preview dashboard.
             </p>
          </div>
        </div>

        {/* GORGEOUS HORIZONTAL CARD DECK */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {SERVICES.map((service, i) => (
            <HomepageCard 
              key={service.id} 
              service={service} 
              index={i} 
              onSelect={onSelectService}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
