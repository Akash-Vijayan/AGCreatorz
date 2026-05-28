import { Service, PortfolioItem, Testimonial, FaqItem } from './types';

export const CONTACT_INFO = {
  email: "ag.creatorz.official@gmail.com",
  phone: "+91 89035 74460",
  phoneNote: "WhatsApp Call & Message Only",
  address: "Chunkankadai, Nagercoil - 629 003, Kanyakumari Dist, Tamil Nadu, India"
};

export const BRAND_QUOTES = [
  "We turn your ideas into beautiful websites. ✨",
  "Designs that make your brand stand out. 🎨",
  "Super fast websites built to work perfectly. 🚀",
  "Engaging videos that people love to watch. 💎",
  "Start building your online presence today. 📖",
  "Simple designs with a big impact. ⚡"
];

export const HERO_CONTENT = {
  headline: "We Build Websites, Designs, and Videos That Stand Out",
  subhead: "Simple, clean, and fast websites, logos, and videos. We help your brand grow and look amazing online.",
  primaryCta: "Let’s Work Together",
  secondaryCta: "See Our Work"
};

export const PROFILE_CONTENT = {
  name: "Akash",
  title: "Full-Stack Developer, Designer & Video Editor",
  intro: "I'm Akash, the founder of AG Viztek Studio. I write fast code, design clean graphics, and edit high-quality videos. My goal is to make things that look beautiful and work perfectly for your business.",
  button: "Curated Portfolio"
};

export const SERVICES: Service[] = [
  {
    id: 'web',
    title: "Web Development",
    description: "We build super fast websites that look great on phones and computers, and help you get found on Google.",
    price: "From ₹2,500",
    icon: 'web',
    details: {
      headline: "Beautiful & Fast Websites",
      subhead: "We don't just build websites. We create easy-to-use pages that load instantly and help your business get more customers.",
      features: [
        "Custom Websites",
        "One-Page Websites",
        "Google Search Setup",
        "Website Layout Drafts"
      ],
      process: [
        "Learning Your Needs",
        "Designing the Layout",
        "Coding the Website",
        "Testing & Launching"
      ],
      whyChooseUs: [
        "Super fast loading speed",
        "Works perfectly on mobile phones",
        "Clean and easy-to-update code",
        "SEO ready to get found on Google"
      ]
    }
  },
  {
    id: 'design',
    title: "Graphic & Logo Design",
    description: "We design outstanding logos, social media posts, and brand graphics that make your business look professional and unique.",
    price: "From ₹500",
    icon: 'design',
    details: {
      headline: "Professional Logo & Brand Design",
      subhead: "Good design tells your story. We create a beautiful and matching look for all your business graphics and social media.",
      features: [
        "Logos & Matching Styles",
        "Social Media Graphics",
        "Premium YouTube Thumbnails",
        "Brochures & Business Cards"
      ],
      process: [
        "Finding Style Ideas",
        "Drawing Initial Drafts",
        "Polishing Final Designs",
        "Delivering Final Image Files"
      ],
      whyChooseUs: [
        "100% custom, original designs",
        "Matching look for your brand",
        "Eye-catching design styles",
        "High-quality ready-to-use files"
      ]
    }
  },
  {
    id: 'video',
    title: "Cinematic Video Editing",
    description: "We edit your raw videos into clean, engaging stories for YouTube, Instagram Reels, or ads that grab attention.",
    price: "From ₹1,000",
    icon: 'video',
    details: {
      headline: "Engaging Video Editing",
      subhead: "We make your videos stand out. We use smooth cuts, beautiful colors, clear sound effects, and clean titles to keep viewers watching.",
      features: [
        "Instagram Reels & TikTok Videos",
        "High-Quality YouTube Videos",
        "Short Ads & Product Videos",
        "Animated Titles & Texts"
      ],
      process: [
        "Story & Speed Check",
        "First Draft Editing",
        "Adding Colors & Sound Effects",
        "Final Polish & Delivery"
      ],
      whyChooseUs: [
        "Engaging edits to hold viewers",
        "Beautiful video colors",
        "Custom sound effects & music",
        "Ready for YouTube and Instagram"
      ]
    }
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { id: '1', title: "Ethereal Aesthetic", category: "Brand Design", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600&h=800" },
  { id: '2', title: "Nova FinTech", category: "Web Platforms", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600&h=800" },
  { id: '3', title: "Urban Momentum", category: "Motion/Video", image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=600&h=800" },
  { id: '4', title: "Nexus Core", category: "Visual Identity", image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=600&h=800" },
  { id: '5', title: "Atlas Journey", category: "Web Design", image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=600&h=800" },
  { id: '6', title: "Velocity Reels", category: "Social Content", image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=600&h=800" },
  { id: '7', title: "Sphere Bio", category: "Modern UI", image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=600&h=800" },
  { id: '8', title: "Prism Logic", category: "Brand Design", image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=600&h=800" }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: "Vikram Malhotra",
    role: "Marketing Director",
    quote: "Akash is amazing at what he does. The website he built for us is super fast and helped us get a lot of new customers quickly.",
    image: "https://i.pravatar.cc/150?u=vikram"
  },
  {
    id: '2',
    name: "Sarah Jenkins",
    role: "Content Creator",
    quote: "The editing quality is top-notch. My YouTube video views and watch time increased a lot after working with them.",
    image: "https://i.pravatar.cc/150?u=sarah"
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  { id: '1', question: "What is your typical project timeline?", answer: "Timelines: Graphic Design takes 5-10 days, Web Development takes 15-30 days, and Video Editing takes 2-4 days. We work fast to deliver high-quality results." },
  { id: '2', question: "How do you handle revisions?", answer: "We offer 3 rounds of changes for each step. Our goal is to make sure you are 100% happy with the final result." },
  { id: '3', question: "Do you offer post-launch support?", answer: "Yes, we give you 30 days of free help and support after your website goes live, and we are always here for future updates." }
];

export const LOGO_PATH = "/mnt/data/A_logo_design_in_blac";
