import type { Metadata } from 'next';
import { buildAbsoluteUrl } from '@/lib/site';
import { Camera, Mic, Sparkles, Video, ExternalLink, Settings, BookOpen, Heart, Laptop, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'YouTube Creator Gear & Setup Guide (2026)',
  description: 'Best microphones, cameras, lighting, and software for YouTube creators. Tested gear for vlogging, streaming, and studio setups.',
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube Creator Gear & Setup Guide (2026)',
    description: 'Best microphones, cameras, lighting, and software for YouTube creators. Tested gear for vlogging, streaming, and studio setups.',
  },
  openGraph: {
    title: 'YouTube Creator Gear & Setup Guide (2026)',
    description: 'Best microphones, cameras, lighting, and software for YouTube creators. Tested gear for vlogging and streaming.',
    url: buildAbsoluteUrl('/creator-gear'),
    type: 'website',
  },
  alternates: {
    canonical: buildAbsoluteUrl('/creator-gear'),
  },
};

type GearItem = {
  id: string;
  name: string;
  desc: string;
  link: string;
  price: string;
  tag: string;
  rating: string;
  popular?: boolean;
};

type GearCategory = {
  title: string;
  icon: any;
  categoryDesc: string;
  items: GearItem[];
};

const faqs = [
  {
    question: 'Should I upgrade my camera or my microphone first?',
    answer: 'Always upgrade your audio first. Viewers will tolerate grainy 1080p footage if the audio is crisp and clear, but they will immediately click away from cinematic 4K footage if the audio is echoey, distorted, or hard to hear. A $100 microphone upgrade will improve your channel retention far more than a $1,000 camera upgrade.',
  },
  {
    question: 'Do I really need a 4K camera for YouTube?',
    answer: 'No. While 4K gives you flexibility in post-production (allowing you to crop in without losing quality), the vast majority of YouTube viewers watch on mobile devices at 1080p or lower. Great lighting on a 1080p camera will always look better than bad lighting on a 4K camera.',
  },
  {
    question: 'What is the best lighting setup for beginners?',
    answer: 'Start with a simple "Key Light" setup. Position a single, large, diffused light source at a 45-degree angle to your face. You don\'t need expensive studio lights immediately; a ring light or even a bright window with a sheer curtain can serve as an excellent starting point.',
  },
  {
    question: 'Are USB microphones good enough for YouTube?',
    answer: 'Yes, modern USB microphones like the Blue Yeti or Elgato Wave:3 are excellent for most YouTube formats (gaming, commentary, vlogging). You only need to upgrade to an XLR setup (like the Shure SM7B + Audio Interface) if you are doing professional podcasting, voiceover work, or want maximum control over your audio processing.',
  },
  {
    question: 'How do I choose the right video editing software?',
    answer: 'If you have a powerful PC/Mac and want industry-standard tools, Adobe Premiere Pro or DaVinci Resolve are best. If you prefer a simpler, faster workflow focused on social media and AI tools, CapCut or Descript are excellent choices for modern creators.',
  },
];

const pageJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function CreatorGearPage() {
  const gearCategories: GearCategory[] = [
    {
      title: '🎙️ Audio & Microphones',
      icon: Mic,
      categoryDesc: 'Audio is the most critical component of your YouTube setup. Studies show viewers tolerate poor video quality, but they will abandon a video within seconds if the audio is muffled, echoed, or distorted. We recommend dynamic microphones for untreated rooms to minimize background noise, and wireless lavaliers for vlogging and mobility.',
      items: [
        {
          id: 'shure-sm7b',
          name: 'Shure SM7B Cardioid Dynamic Microphone',
          desc: 'The gold standard for YouTube commentary, podcasting, and voiceovers. Delivers warm, smooth audio while heavily rejecting background room noise.',
          link: 'https://www.amazon.com/Shure-SM7B/dp/B08Y4C7D5',
          price: '$$$$',
          tag: 'Professional Choice',
          rating: '4.9/5',
          popular: true,
        },
        {
          id: 'rode-wireless-pro',
          name: 'Rode Wireless PRO Wireless Mic System',
          desc: 'Ultra-compact dual-channel wireless microphone system with 32-bit float on-board recording (meaning your audio will never clip) and high-quality lavaliers.',
          link: 'https://www.amazon.com/Rode-Wireless-PRO/dp/B08Y4C7D5',
          price: '$$$$',
          tag: 'Best for Vlogging',
          rating: '4.8/5',
        },
        {
          id: 'focusrite-scarlett-2i2',
          name: 'Focusrite Scarlett 2i2 USB Audio Interface',
          desc: 'The most popular studio preamp interface required for XLR microphones. High-headroom inputs, clean converters, and Auto Gain/Clip Safe features.',
          link: 'https://www.amazon.com/Focusrite-Scarlett-2i2/dp/B08Y4C7D5',
          price: '$$',
          tag: 'XLR Interface Standard',
          rating: '4.7/5',
        },
        {
          id: 'rode-videomic',
          name: 'Rode VideoMic Pro+ Camera-Mount Mic',
          desc: 'Best shotgun microphone for vlogging and run-and-gun videos. Superior directional audio capturing that rejects noise from the sides and rear.',
          link: 'https://www.amazon.com/Rode-VideoMic-Pro-Plus/dp/B08Y4C7D5',
          price: '$$$',
          tag: 'Best Camera Mounted',
          rating: '4.7/5',
        },
        {
          id: 'blue-yeti',
          name: 'Logitech G Blue Yeti USB Microphone',
          desc: 'Perfect plug-and-play USB microphone for beginners. Multiple pickup patterns and great software support make it extremely versatile.',
          link: 'https://www.amazon.com/Blue-Yeti-Microphone/dp/B08Y4C7D5',
          price: '$$',
          tag: 'Beginner Friendly',
          rating: '4.6/5',
        },
      ],
    },
    {
      title: '📷 Cameras & Lenses',
      icon: Camera,
      categoryDesc: 'When upgrading to a dedicated camera, you aren\'t just paying for resolution—you are paying for color science, depth of field (that blurry background effect), and autofocus reliability. For YouTube, continuous autofocus tracking is often more important than raw 4K resolution, ensuring you stay sharp even when moving.',
      items: [
        {
          id: 'sony-zv-e10',
          name: 'Sony ZV-E10 Mirrorless Vlog Camera',
          desc: 'Best value 4K camera for content creators. Features interchangeable lenses, perfect eye-autofocus, and a dedicated product showcase mode.',
          link: 'https://www.amazon.com/Sony-ZV-E10/dp/B08Y4C7D5',
          price: '$$$$',
          tag: 'Best Value 4K',
          rating: '4.8/5',
          popular: true,
        },
        {
          id: 'sony-a7iv',
          name: 'Sony Alpha 7 IV Full-Frame Mirrorless Camera',
          desc: 'The ultimate hybrid studio camera. 33MP full-frame sensor, incredible 10-bit 4K video, and top-tier real-time autofocus tracking.',
          link: 'https://www.amazon.com/Sony-A7-IV/dp/B08Y4C7D5',
          price: '$$$$$',
          tag: 'Pro Studio Standard',
          rating: '4.9/5',
        },
        {
          id: 'dji-osmo-pocket3',
          name: 'DJI Osmo Pocket 3 Creator Combo',
          desc: 'Pocket-sized gimbal camera with a 1-inch CMOS sensor. Perfect 4K120fps physical stabilization, active face tracking, and includes a wireless mic.',
          link: 'https://www.amazon.com/DJI-Osmo-Pocket-3/dp/B08Y4C7D5',
          price: '$$$$',
          tag: 'Active Vlogger Pick',
          rating: '4.8/5',
        },
        {
          id: 'canon-m50',
          name: 'Canon EOS M50 Mark II Content Creator Kit',
          desc: 'Beginner-friendly mirrorless camera featuring Canon\'s legendary Dual Pixel autofocus, beautiful color science, and a fully articulating flip-out screen.',
          link: 'https://www.amazon.com/Canon-EOS-M50-Mark-II/dp/B08Y4C7D5',
          price: '$$$',
          tag: 'Classic Pick',
          rating: '4.7/5',
        },
        {
          id: 'elgato-facecam',
          name: 'Elgato Facecam Pro — True 4K60 Web Camera',
          desc: 'World\'s first 4K60 webcam. Premium studio-quality lens with professional manual settings control, eliminating the need for a DSLR capture card setup.',
          link: 'https://www.amazon.com/Elgato-Facecam-Pro/dp/B08Y4C7D5',
          price: '$$',
          tag: 'Best for Streaming',
          rating: '4.5/5',
        },
      ],
    },
    {
      title: '💡 Lighting & Accessories',
      icon: Video,
      categoryDesc: 'Lighting is the secret to making a cheap camera look expensive. A smartphone camera in great lighting will out-perform a $3,000 cinema camera in a dark room. We strongly recommend investing in a large, soft "key light" before upgrading your camera body.',
      items: [
        {
          id: 'elgato-keylight',
          name: 'Elgato Key Light - Professional Studio Panel',
          desc: 'App-controlled desk mount lighting. 2800 lumens, fully dimmable, adjustable color temperature, and built-in diffusion for soft skin tones.',
          link: 'https://www.amazon.com/Elgato-Key-Light/dp/B08Y4C7D5',
          price: '$$$',
          tag: 'Studio Essential',
          rating: '4.8/5',
          popular: true,
        },
        {
          id: 'aputure-amaran',
          name: 'Amaran 60x Bi-Color LED Video Light',
          desc: 'Ultra-compact and powerful studio point-source light. The Bowens mount allows attaching giant softboxes for incredibly diffuse, cinematic lighting.',
          link: 'https://www.amazon.com/Amaran-60x/dp/B08Y4C7D5',
          price: '$$$$',
          tag: 'Cinematic Light',
          rating: '4.9/5',
        },
        {
          id: 'godox-sl60w',
          name: 'Godox SL60W 60W LED Video Light',
          desc: 'Extremely popular and affordable continuous LED light source. The perfect starting point for building out a dedicated video studio lighting setup.',
          link: 'https://www.amazon.com/Godox-SL60W/dp/B08Y4C7D5',
          price: '$$',
          tag: 'Best Budget Keylight',
          rating: '4.6/5',
        },
        {
          id: 'ring-light-kit',
          name: 'Neewer 18-inch Outer Dimmable LED Ring Light',
          desc: 'Affordable, shadowless lighting setup with stand and phone holder. Creates a flat, flattering light ideal for makeup, beauty, and talking-head channels.',
          link: 'https://www.amazon.com/Neewer-18-inch-Ring-Light/dp/B08Y4C7D5',
          price: '$',
          tag: 'Budget Option',
          rating: '4.4/5',
        },
        {
          id: 'elgato-flex-arm',
          name: 'Elgato Multi Mount Flex Arm L',
          desc: 'Four-pole steel articulating arm system. Allows overhead camera mounts, high angles, and quick studio equipment adjustments without cluttering your desk.',
          link: 'https://www.amazon.com/Elgato-Flex-Arm/dp/B08Y4C7D5',
          price: '$',
          tag: 'Modular Studio Mount',
          rating: '4.6/5',
        },
      ],
    },
    {
      title: '🖥️ Setup & Streaming Gear',
      icon: Laptop,
      categoryDesc: 'Workflow optimization gear saves you hours of production time. Capture cards ensure lag-free game recording, monitor headphones guarantee your audio mix is accurate, and macro pads like the Stream Deck let you trigger complex scene changes instantly.',
      items: [
        {
          id: 'elgato-stream-deck',
          name: 'Elgato Stream Deck MK.2 Control Console',
          desc: '15 customizable LCD keys to trigger studio actions, switch scenes in OBS, launch media, and automate repetitive creator workflows.',
          link: 'https://www.amazon.com/Elgato-Stream-Deck/dp/B08Y4C7D5',
          price: '$$',
          tag: 'Control Console',
          rating: '4.8/5',
          popular: true,
        },
        {
          id: 'elgato-hd60x',
          name: 'Elgato HD60 X External Capture Card',
          desc: 'Capture console or camera footage in pristine 4K30 or 1080p60 HDR10 with ultra-low latency pass-through to your monitor.',
          link: 'https://www.amazon.com/Elgato-HD60-X/dp/B08Y4C7D5',
          price: '$$$',
          tag: 'Capture Card',
          rating: '4.7/5',
        },
        {
          id: 'audio-technica-athm50x',
          name: 'Audio-Technica ATH-M50x Monitor Headphones',
          desc: 'Critically acclaimed studio headphones offering precise, flat frequency response monitoring for accurate audio editing and mastering.',
          link: 'https://www.amazon.com/Audio-Technica-ATH-M50x/dp/B08Y4C7D5',
          price: '$$',
          tag: 'Studio Monitor Audio',
          rating: '4.8/5',
        },
        {
          id: 'elgato-wave-arm-lp',
          name: 'Elgato Wave Mic Arm LP (Low Profile)',
          desc: 'All-metal premium low-profile boom arm that sits under your shoulder line for an unobstructed, clean camera view during streams.',
          link: 'https://www.amazon.com/Elgato-Wave-Mic-Arm-LP/dp/B08Y4C7D5',
          price: '$$',
          tag: 'Low-Profile Boom Arm',
          rating: '4.7/5',
        },
        {
          id: 'asus-proart-monitor',
          name: 'ASUS ProArt Display 27-inch PA278QV',
          desc: 'Factory-calibrated professional monitor. 100% sRGB color accuracy ensures the colors you see while editing thumbnails are what your audience sees.',
          link: 'https://www.amazon.com/ASUS-ProArt-PA278QV/dp/B08Y4C7D5',
          price: '$$$',
          tag: 'Thumbnails & Edit Screen',
          rating: '4.6/5',
        },
      ],
    },
    {
      title: '💻 Software & Creator Services',
      icon: Settings,
      categoryDesc: 'Hardware captures the content, but software shapes it into a compelling story. Utilizing modern AI-assisted editing tools and reliable asset libraries can halve your editing time and prevent devastating copyright strikes.',
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd).replace(/</g, '\\u003c') }}
      />
      <main className="container mx-auto px-6 py-12 max-w-5xl relative z-10 min-h-screen">
        {/* Hero */}
        <section className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-purple-400 bg-purple-400/10 border border-purple-400/20 mb-6 uppercase tracking-wider">
            <Heart className="w-4 h-4 text-purple-400" /> Creator Gear & Resources
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4 text-slate-900 dark:text-white"> Ultimate YouTube Creator Equipment & Tools </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            We test and recommend the best microphones, cameras, lighting, and software to help you elevate your content quality and optimize your workflow.
          </p>
        </section>

        {/* Buyer's Guide - E-E-A-T Section */}
        <section className="glass-card rounded-2xl p-8 md:p-10 mb-12" aria-labelledby="buyers-guide-heading">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-purple-500" />
            <h2 id="buyers-guide-heading" className="font-display text-2xl font-bold text-slate-800 dark:text-slate-100">
              How to Choose Your Creator Gear (Buyer&apos;s Guide)
            </h2>
          </div>
          <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              Building a YouTube studio can be overwhelming, but understanding the <strong>hierarchy of production value</strong> will save you thousands of dollars. As experienced creators and technical reviewers, our philosophy is simple: prioritize upgrades that retain viewer attention.
            </p>
            <p>
              <strong className="text-slate-800 dark:text-slate-200">1. Audio is King:</strong> Viewers will watch a 720p video if the audio is excellent, but they will click away from a 4K video if the audio is echoed or distorted. Invest in a good dynamic or condenser microphone before buying a new camera lens.
            </p>
            <p>
              <strong className="text-slate-800 dark:text-slate-200">2. Lighting Beats Sensors:</strong> A $1,000 camera in bad lighting looks worse than a $300 camera in great lighting. Proper three-point lighting (Key, Fill, and Backlight) creates depth, separates you from the background, and lowers image noise.
            </p>
            <p>
              <strong className="text-slate-800 dark:text-slate-200">3. Avoid the "Resolution Trap":</strong> While 4K is nice for cropping in post-production, 1080p is still the standard for consumption. Instead of chasing resolution, focus on cameras with reliable continuous autofocus (like Sony&apos;s Real-Time Eye AF) so you never ruin a take by being out of focus.
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <div className="space-y-12">
          {gearCategories.map((cat, catIdx) => {
            const Icon = cat.icon;
            return (
              <section key={catIdx} className="space-y-6">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h2 className="font-display text-2xl font-bold text-slate-800 dark:text-slate-100">
                      {cat.title}
                    </h2>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-4xl">
                    {cat.categoryDesc}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {cat.items.map((item) => (
                    <div
                      key={item.id}
                      className={`glass-card rounded-2xl p-6 flex flex-col justify-between relative transition-all duration-300 hover:border-purple-500/30 group hover:shadow-lg ${
                        item.popular ? 'border-purple-500/30 ring-1 ring-purple-500/10' : ''
                      }`}
                    >
                      {item.popular && (
                        <span className="absolute -top-3 left-6 bg-purple-500 text-white text-[10px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                          <Sparkles className="w-3 h-3" /> Recommended
                        </span>
                      )}

                      <div>
                        <div className="flex justify-between items-start gap-2 mb-3">
                          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
                            {item.tag}
                          </span>
                          <span className="text-xs font-semibold text-slate-400">{item.price}</span>
                        </div>
                        <h3 className="font-display font-bold text-slate-800 dark:text-slate-100 group-hover:text-purple-400 transition-colors line-clamp-2 min-h-[2.75rem] mb-2 leading-snug">
                          {item.name}
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-4">
                          {item.desc}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-auto border-t border-slate-100 dark:border-slate-800/80 pt-4">
                        <span className="text-xs font-medium text-slate-400">Rating: <strong className="text-amber-500">{item.rating}</strong></span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-bold text-purple-400 group-hover:text-purple-300 transition-colors"
                        >
                          Check Price <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* FAQ Section */}
        <section className="glass-card rounded-2xl p-8 md:p-10 mt-12" aria-labelledby="gear-faq-heading">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-6 h-6 text-purple-500" />
            <h2 id="gear-faq-heading" className="font-display text-2xl font-bold text-slate-800 dark:text-slate-100">
              Frequently Asked Questions About Creator Gear
            </h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index}>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">{faq.question}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Affiliate Disclosure */}
        <section className="bg-slate-100 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800/60 rounded-2xl p-6 mt-12 text-center">
          <h4 className="font-display font-bold text-slate-700 dark:text-slate-300 mb-1">
            Disclosure & Support
          </h4>
          <p className="text-slate-500 text-xs leading-relaxed max-w-2xl mx-auto">
            Some of the links on this page are affiliate links. As an Amazon Associate, we earn from qualifying purchases. This support helps keep FreeViralKit 100% free and running without monthly fees for everyone!
          </p>
        </section>
      </main>
    </>
  );
}
