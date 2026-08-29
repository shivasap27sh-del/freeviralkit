import { Camera, Mic, Video, Laptop, Settings, type LucideIcon } from 'lucide-react';

export interface GearItem {
  id: string;
  name: string;
  desc: string;
  link: string;
  price: string;
  tag: string;
  rating: string;
  popular?: boolean;
}

export interface GearCategory {
  title: string;
  icon: LucideIcon;
  categoryDesc: string;
  items: GearItem[];
}

export const gearCategories: GearCategory[] = [
  {
    title: '🎙️ Audio & Microphones',
    icon: Mic,
    categoryDesc:
      'Audio is the most critical component of your YouTube setup. Studies show viewers tolerate poor video quality, but they will abandon a video within seconds if the audio is muffled, echoed, or distorted. We recommend dynamic microphones for untreated rooms to minimize background noise, and wireless lavaliers for vlogging and mobility.',
    items: [
      {
        id: 'shure-sm7b',
        name: 'Shure SM7B Cardioid Dynamic Microphone',
        desc: 'The gold standard for YouTube commentary, podcasting, and voiceovers. Delivers warm, smooth audio while heavily rejecting background room noise.',
        link: 'https://www.amazon.com/s?k=Shure+SM7B+Cardioid+Dynamic+Microphone',
        price: '$$$$',
        tag: 'Professional Choice',
        rating: '4.9/5',
        popular: true,
      },
      {
        id: 'rode-wireless-pro',
        name: 'Rode Wireless PRO Wireless Mic System',
        desc: 'Ultra-compact dual-channel wireless microphone system with 32-bit float on-board recording (meaning your audio will never clip) and high-quality lavaliers.',
        link: 'https://www.amazon.com/s?k=Rode+Wireless+PRO+Wireless+Mic+System',
        price: '$$$$',
        tag: 'Best for Vlogging',
        rating: '4.8/5',
      },
      {
        id: 'focusrite-scarlett-2i2',
        name: 'Focusrite Scarlett 2i2 USB Audio Interface',
        desc: 'The most popular studio preamp interface required for XLR microphones. High-headroom inputs, clean converters, and Auto Gain/Clip Safe features.',
        link: 'https://www.amazon.com/s?k=Focusrite+Scarlett+2i2+USB+Audio+Interface',
        price: '$$',
        tag: 'XLR Interface Standard',
        rating: '4.7/5',
      },
      {
        id: 'rode-videomic',
        name: 'Rode VideoMic Pro+ Camera-Mount Mic',
        desc: 'Best shotgun microphone for vlogging and run-and-gun videos. Superior directional audio capturing that rejects noise from the sides and rear.',
        link: 'https://www.amazon.com/s?k=Rode+VideoMic+Pro%2B+Camera-Mount+Mic',
        price: '$$$',
        tag: 'Best Camera Mounted',
        rating: '4.7/5',
      },
      {
        id: 'blue-yeti',
        name: 'Logitech G Blue Yeti USB Microphone',
        desc: 'Perfect plug-and-play USB microphone for beginners. Multiple pickup patterns and great software support make it extremely versatile.',
        link: 'https://www.amazon.com/s?k=Logitech+G+Blue+Yeti+USB+Microphone',
        price: '$$',
        tag: 'Beginner Friendly',
        rating: '4.6/5',
      },
    ],
  },
  {
    title: '📷 Cameras & Lenses',
    icon: Camera,
    categoryDesc:
      'When upgrading to a dedicated camera, you aren\'t just paying for resolution—you are paying for color science, depth of field (that blurry background effect), and autofocus reliability. For YouTube, continuous autofocus tracking is often more important than raw 4K resolution, ensuring you stay sharp even when moving.',
    items: [
      {
        id: 'sony-zv-e10',
        name: 'Sony ZV-E10 Mirrorless Vlog Camera',
        desc: 'Best value 4K camera for content creators. Features interchangeable lenses, perfect eye-autofocus, and a dedicated product showcase mode.',
        link: 'https://www.amazon.com/s?k=Sony+ZV-E10+Mirrorless+Vlog+Camera',
        price: '$$$$',
        tag: 'Best Value 4K',
        rating: '4.8/5',
        popular: true,
      },
      {
        id: 'sony-a7iv',
        name: 'Sony Alpha 7 IV Full-Frame Mirrorless Camera',
        desc: 'The ultimate hybrid studio camera. 33MP full-frame sensor, incredible 10-bit 4K video, and top-tier real-time autofocus tracking.',
        link: 'https://www.amazon.com/s?k=Sony+Alpha+7+IV+Full-Frame+Mirrorless+Camera',
        price: '$$$$$',
        tag: 'Pro Studio Standard',
        rating: '4.9/5',
      },
      {
        id: 'dji-osmo-pocket3',
        name: 'DJI Osmo Pocket 3 Creator Combo',
        desc: 'Pocket-sized gimbal camera with a 1-inch CMOS sensor. Perfect 4K120fps physical stabilization, active face tracking, and includes a wireless mic.',
        link: 'https://www.amazon.com/s?k=DJI+Osmo+Pocket+3+Creator+Combo',
        price: '$$$$',
        tag: 'Active Vlogger Pick',
        rating: '4.8/5',
      },
      {
        id: 'canon-m50',
        name: 'Canon EOS M50 Mark II Content Creator Kit',
        desc: 'Beginner-friendly mirrorless camera featuring Canon\'s legendary Dual Pixel autofocus, beautiful color science, and a fully articulating flip-out screen.',
        link: 'https://www.amazon.com/s?k=Canon+EOS+M50+Mark+II+Content+Creator+Kit',
        price: '$$$',
        tag: 'Classic Pick',
        rating: '4.7/5',
      },
      {
        id: 'elgato-facecam',
        name: 'Elgato Facecam Pro — True 4K60 Web Camera',
        desc: 'World\'s first 4K60 webcam. Premium studio-quality lens with professional manual settings control, eliminating the need for a DSLR capture card setup.',
        link: 'https://www.amazon.com/s?k=Elgato+Facecam+Pro+%E2%80%94+True+4K60+Web+Camera',
        price: '$$',
        tag: 'Best for Streaming',
        rating: '4.5/5',
      },
    ],
  },
  {
    title: '💡 Lighting & Accessories',
    icon: Video,
    categoryDesc:
      'Lighting is the secret to making a cheap camera look expensive. A smartphone camera in great lighting will out-perform a $3,000 cinema camera in a dark room. We strongly recommend investing in a large, soft "key light" before upgrading your camera body.',
    items: [
      {
        id: 'elgato-keylight',
        name: 'Elgato Key Light - Professional Studio Panel',
        desc: 'App-controlled desk mount lighting. 2800 lumens, fully dimmable, adjustable color temperature, and built-in diffusion for soft skin tones.',
        link: 'https://www.amazon.com/s?k=Elgato+Key+Light+-+Professional+Studio+Panel',
        price: '$$$',
        tag: 'Studio Essential',
        rating: '4.8/5',
        popular: true,
      },
      {
        id: 'aputure-amaran',
        name: 'Amaran 60x Bi-Color LED Video Light',
        desc: 'Ultra-compact and powerful studio point-source light. The Bowens mount allows attaching giant softboxes for incredibly diffuse, cinematic lighting.',
        link: 'https://www.amazon.com/s?k=Amaran+60x+Bi-Color+LED+Video+Light',
        price: '$$$$',
        tag: 'Cinematic Light',
        rating: '4.9/5',
      },
      {
        id: 'godox-sl60w',
        name: 'Godox SL60W 60W LED Video Light',
        desc: 'Extremely popular and affordable continuous LED light source. The perfect starting point for building out a dedicated video studio lighting setup.',
        link: 'https://www.amazon.com/s?k=Godox+SL60W+60W+LED+Video+Light',
        price: '$$',
        tag: 'Best Budget Keylight',
        rating: '4.6/5',
      },
      {
        id: 'ring-light-kit',
        name: 'Neewer 18-inch Outer Dimmable LED Ring Light',
        desc: 'Affordable, shadowless lighting setup with stand and phone holder. Creates a flat, flattering light ideal for makeup, beauty, and talking-head channels.',
        link: 'https://www.amazon.com/s?k=Neewer+18-inch+Outer+Dimmable+LED+Ring+Light',
        price: '$',
        tag: 'Budget Option',
        rating: '4.4/5',
      },
      {
        id: 'elgato-flex-arm',
        name: 'Elgato Multi Mount Flex Arm L',
        desc: 'Four-pole steel articulating arm system. Allows overhead camera mounts, high angles, and quick studio equipment adjustments without cluttering your desk.',
        link: 'https://www.amazon.com/s?k=Elgato+Multi+Mount+Flex+Arm+L',
        price: '$',
        tag: 'Modular Studio Mount',
        rating: '4.6/5',
      },
    ],
  },
  {
    title: '🖥️ Setup & Streaming Gear',
    icon: Laptop,
    categoryDesc:
      'Workflow optimization gear saves you hours of production time. Capture cards ensure lag-free game recording, monitor headphones guarantee your audio mix is accurate, and macro pads like the Stream Deck let you trigger complex scene changes instantly.',
    items: [
      {
        id: 'elgato-stream-deck',
        name: 'Elgato Stream Deck MK.2 Control Console',
        desc: '15 customizable LCD keys to trigger studio actions, switch scenes in OBS, launch media, and automate repetitive creator workflows.',
        link: 'https://www.amazon.com/s?k=Elgato+Stream+Deck+MK.2+Control+Console',
        price: '$$',
        tag: 'Control Console',
        rating: '4.8/5',
        popular: true,
      },
      {
        id: 'elgato-hd60x',
        name: 'Elgato HD60 X External Capture Card',
        desc: 'Capture console or camera footage in pristine 4K30 or 1080p60 HDR10 with ultra-low latency pass-through to your monitor.',
        link: 'https://www.amazon.com/s?k=Elgato+HD60+X+External+Capture+Card',
        price: '$$$',
        tag: 'Capture Card',
        rating: '4.7/5',
      },
      {
        id: 'audio-technica-athm50x',
        name: 'Audio-Technica ATH-M50x Monitor Headphones',
        desc: 'Critically acclaimed studio headphones offering precise, flat frequency response monitoring for accurate audio editing and mastering.',
        link: 'https://www.amazon.com/s?k=Audio-Technica+ATH-M50x+Monitor+Headphones',
        price: '$$',
        tag: 'Studio Monitor Audio',
        rating: '4.8/5',
      },
      {
        id: 'elgato-wave-arm-lp',
        name: 'Elgato Wave Mic Arm LP (Low Profile)',
        desc: 'All-metal premium low-profile boom arm that sits under your shoulder line for an unobstructed, clean camera view during streams.',
        link: 'https://www.amazon.com/s?k=Elgato+Wave+Mic+Arm+LP+(Low+Profile)',
        price: '$$',
        tag: 'Low-Profile Boom Arm',
        rating: '4.7/5',
      },
      {
        id: 'asus-proart-monitor',
        name: 'ASUS ProArt Display 27-inch PA278QV',
        desc: 'Factory-calibrated professional monitor. 100% sRGB color accuracy ensures the colors you see while editing thumbnails are what your audience sees.',
        link: 'https://www.amazon.com/s?k=ASUS+ProArt+Display+27-inch+PA278QV',
        price: '$$$',
        tag: 'Thumbnails & Edit Screen',
        rating: '4.6/5',
      },
    ],
  },
  {
    title: '💻 Software & Creator Services',
    icon: Settings,
    categoryDesc:
      'Hardware captures the content, but software shapes it into a compelling story. Utilizing modern AI-assisted editing tools and reliable asset libraries can halve your editing time and prevent devastating copyright strikes.',
    items: [
      {
        id: 'epidemic-sound',
        name: 'Epidemic Sound - Royalty-Free Music Licensing',
        desc: 'Premium catalog of 40,000+ tracks and 90,000+ sound effects. Safe from copyright strikes across all platforms. An essential investment for monetization.',
        link: 'https://www.epidemicsound.com',
        price: 'Subscription',
        tag: 'Music License',
        rating: '4.9/5',
        popular: true,
      },
      {
        id: 'vidiq-pro',
        name: 'vidIQ Pro - YouTube Search & Competitor Analysis',
        desc: 'Advanced keyword research tools, trend alerts, and channel auditing to discover competitive advantages and optimize your metadata.',
        link: 'https://vidiq.com',
        price: 'Subscription',
        tag: 'SEO Tool',
        rating: '4.7/5',
      },
      {
        id: 'canva-pro',
        name: 'Canva Pro — Thumbnail & Brand Assets Designer',
        desc: 'Visual editor with thousands of premium templates, automatic background remover, and cloud collaboration. The fastest way to design clickable thumbnails.',
        link: 'https://www.canva.com',
        price: 'Subscription',
        tag: 'Graphic Design',
        rating: '4.8/5',
      },
      {
        id: 'descript',
        name: 'Descript - AI Audio & Video Text-Based Editor',
        desc: 'Edit videos by editing the transcribed text document. Features instant filler word removal ("um", "uh") and incredibly realistic AI voice cloning (Overdub).',
        link: 'https://www.descript.com',
        price: 'Subscription',
        tag: 'AI Editing',
        rating: '4.8/5',
      },
      {
        id: 'adobe-premiere',
        name: 'Adobe Premiere Pro Video Editor Suite',
        desc: 'Industry standard non-linear video editing software with advanced Lumetri color tools, masking, and newly integrated AI transcription features.',
        link: 'https://www.adobe.com/products/premiere.html',
        price: 'Subscription',
        tag: 'Professional Editing',
        rating: '4.7/5',
      },
    ],
  },
];

export const gearFaqs = [
  {
    question: 'Should I upgrade my camera or my microphone first?',
    answer:
      'Always upgrade your audio first. Viewers will tolerate grainy 1080p footage if the audio is crisp and clear, but they will immediately click away from cinematic 4K footage if the audio is echoey, distorted, or hard to hear. A $100 microphone upgrade will improve your channel retention far more than a $1,000 camera upgrade.',
  },
  {
    question: 'Do I really need a 4K camera for YouTube?',
    answer:
      'No. While 4K gives you flexibility in post-production (allowing you to crop in without losing quality), the vast majority of YouTube viewers watch on mobile devices at 1080p or lower. Great lighting on a 1080p camera will always look better than bad lighting on a 4K camera.',
  },
  {
    question: 'What is the best lighting setup for beginners?',
    answer:
      'Start with a simple "Key Light" setup. Position a single, large, diffused light source at a 45-degree angle to your face. You don\'t need expensive studio lights immediately; a ring light or even a bright window with a sheer curtain can serve as an excellent starting point.',
  },
  {
    question: 'Are USB microphones good enough for YouTube?',
    answer:
      'Yes, modern USB microphones like the Blue Yeti or Elgato Wave:3 are excellent for most YouTube formats (gaming, commentary, vlogging). You only need to upgrade to an XLR setup (like the Shure SM7B + Audio Interface) if you are doing professional podcasting, voiceover work, or want maximum control over your audio processing.',
  },
  {
    question: 'How do I choose the right video editing software?',
    answer:
      'If you have a powerful PC/Mac and want industry-standard tools, Adobe Premiere Pro or DaVinci Resolve are best. If you prefer a simpler, faster workflow focused on social media and AI tools, CapCut or Descript are excellent choices for modern creators.',
  },
];
