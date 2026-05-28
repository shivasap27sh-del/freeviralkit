'use client';

import { useState } from 'react';
import { Camera, Mic, Sparkles, Video, ExternalLink, Settings, BookOpen, Heart, Laptop } from 'lucide-react';
import { InContentAd } from '@/components/AdSense';
import { adSlots } from '@/lib/ad-slots';

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
  items: GearItem[];
};

export default function CreatorGearPage() {
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});

  const gearCategories: GearCategory[] = [
    {
      title: '🎙️ Audio & Microphones',
      icon: Mic,
      items: [
        {
          id: 'shure-sm7b',
          name: 'Shure SM7B Cardioid Dynamic Microphone',
          desc: 'The gold standard for YouTube commentary, podcasting, and voiceovers. Delivers warm, smooth audio.',
          link: 'https://www.amazon.com/s?k=Shure+SM7B',
          price: '$$$$',
          tag: 'Professional Choice',
          rating: '4.9/5',
          popular: true,
        },
        {
          id: 'rode-wireless-pro',
          name: 'Rode Wireless PRO Wireless Mic System',
          desc: 'Ultra-compact dual-channel wireless microphone system with 32-bit float on-board recording and high-quality lavaliers.',
          link: 'https://www.amazon.com/s?k=Rode+Wireless+PRO',
          price: '$$$$',
          tag: 'Best for Vlogging',
          rating: '4.8/5',
        },
        {
          id: 'focusrite-scarlett-2i2',
          name: 'Focusrite Scarlett 2i2 USB Audio Interface',
          desc: 'The most popular studio preamp interface. High-headroom inputs, clean converters, and Auto Gain/Clip Safe features.',
          link: 'https://www.amazon.com/s?k=Focusrite+Scarlett+2i2',
          price: '$$',
          tag: 'XLR Interface Standard',
          rating: '4.7/5',
        },
        {
          id: 'rode-videomic',
          name: 'Rode VideoMic Pro+ Camera-Mount Mic',
          desc: 'Best shotgun microphone for vlogging and run-and-gun videos. Superior directional audio capturing.',
          link: 'https://www.amazon.com/s?k=Rode+VideoMic+Pro+Plus',
          price: '$$$',
          tag: 'Best Camera Mounted',
          rating: '4.7/5',
        },
        {
          id: 'blue-yeti',
          name: 'Logitech G Blue Yeti USB Microphone',
          desc: 'Perfect plug-and-play USB microphone for beginners. Multiple pickup patterns and great software support.',
          link: 'https://www.amazon.com/s?k=Blue+Yeti+Microphone',
          price: '$$',
          tag: 'Beginner Friendly',
          rating: '4.6/5',
        },
      ],
    },
    {
      title: '📷 Cameras & Lenses',
      icon: Camera,
      items: [
        {
          id: 'sony-zv-e10',
          name: 'Sony ZV-E10 Mirrorless Vlog Camera',
          desc: 'Best value 4K camera for content creators. Interchangeable lenses, perfect autofocus, and product showcase modes.',
          link: 'https://www.amazon.com/s?k=Sony+ZV-E10',
          price: '$$$$',
          tag: 'Best Value 4K',
          rating: '4.8/5',
          popular: true,
        },
        {
          id: 'sony-a7iv',
          name: 'Sony Alpha 7 IV Full-Frame Mirrorless Camera',
          desc: 'The ultimate hybrid studio camera. 33MP sensor, incredible 10-bit 4K video, and top-tier real-time autofocus tracking.',
          link: 'https://www.amazon.com/s?k=Sony+A7+IV',
          price: '$$$$$',
          tag: 'Pro Studio Standard',
          rating: '4.9/5',
        },
        {
          id: 'dji-osmo-pocket3',
          name: 'DJI Osmo Pocket 3 Creator Combo',
          desc: 'Pocket-sized gimbal camera with 1-inch CMOS sensor. Perfect 4K120fps stabilization, face tracking, and wireless mic.',
          link: 'https://www.amazon.com/s?k=DJI+Osmo+Pocket+3',
          price: '$$$$',
          tag: 'Active Vlogger Pick',
          rating: '4.8/5',
        },
        {
          id: 'canon-m50',
          name: 'Canon EOS M50 Mark II Content Creator Kit',
          desc: 'Beginner-friendly mirrorless camera featuring legendary Dual Pixel autofocus and a flip-out screen.',
          link: 'https://www.amazon.com/s?k=Canon+EOS+M50+Mark+II',
          price: '$$$',
          tag: 'Classic Pick',
          rating: '4.7/5',
        },
        {
          id: 'elgato-facecam',
          name: 'Elgato Facecam Pro — True 4K60 Web Camera',
          desc: 'World\'s first 4K60 webcam. Premium studio-quality lens with professional manual settings control.',
          link: 'https://www.amazon.com/s?k=Elgato+Facecam+Pro',
          price: '$$',
          tag: 'Best for Streaming',
          rating: '4.5/5',
        },
      ],
    },
    {
      title: '💡 Lighting & Accessories',
      icon: Video,
      items: [
        {
          id: 'elgato-keylight',
          name: 'Elgato Key Light - Professional Studio Panel',
          desc: 'App-controlled desk mount lighting. 2800 lumens, fully dimmable, and adjustable color temperature.',
          link: 'https://www.amazon.com/s?k=Elgato+Key+Light',
          price: '$$$',
          tag: 'Studio Essential',
          rating: '4.8/5',
          popular: true,
        },
        {
          id: 'aputure-amaran',
          name: 'Amaran 60x Bi-Color LED Video Light',
          desc: 'Ultra-compact and powerful studio light. Bowens mount allows attaching giant softboxes for diffuse cinematic lighting.',
          link: 'https://www.amazon.com/s?k=Amaran+60x',
          price: '$$$$',
          tag: 'Cinematic Light',
          rating: '4.9/5',
        },
        {
          id: 'godox-sl60w',
          name: 'Godox SL60W 60W LED Video Light',
          desc: 'Extremely popular and affordable continuous LED light source. Perfect starting point for video studio lighting setups.',
          link: 'https://www.amazon.com/s?k=Godox+SL60W',
          price: '$$',
          tag: 'Best Budget Keylight',
          rating: '4.6/5',
        },
        {
          id: 'ring-light-kit',
          name: 'Neewer 18-inch Outer Dimmable LED Ring Light',
          desc: 'Affordable, shadowless lighting setup with stand and phone holder. Ideal for makeup, beauty, and tutorial channels.',
          link: 'https://www.amazon.com/s?k=Neewer+18-inch+Ring+Light',
          price: '$',
          tag: 'Budget Option',
          rating: '4.4/5',
        },
        {
          id: 'elgato-flex-arm',
          name: 'Elgato Multi Mount Flex Arm L',
          desc: 'Four-pole steel articulating arm system. Allows overhead mounts, high angles, and quick studio equipment adjustments.',
          link: 'https://www.amazon.com/s?k=Elgato+Flex+Arm',
          price: '$',
          tag: 'Modular Studio Mount',
          rating: '4.6/5',
        },
      ],
    },
    {
      title: '🖥️ Setup & Streaming Gear',
      icon: Laptop,
      items: [
        {
          id: 'elgato-stream-deck',
          name: 'Elgato Stream Deck MK.2 Control Console',
          desc: '15 customizable LCD keys to trigger studio actions, switch scenes, launch media, and automate creator workflows.',
          link: 'https://www.amazon.com/s?k=Elgato+Stream+Deck',
          price: '$$',
          tag: 'Control Console',
          rating: '4.8/5',
          popular: true,
        },
        {
          id: 'elgato-hd60x',
          name: 'Elgato HD60 X External Capture Card',
          desc: 'Capture console or camera footage in pristine 4K30 or 1080p60 HDR10 with ultra-low latency pass-through.',
          link: 'https://www.amazon.com/s?k=Elgato+HD60+X',
          price: '$$$',
          tag: 'Capture Card',
          rating: '4.7/5',
        },
        {
          id: 'audio-technica-athm50x',
          name: 'Audio-Technica ATH-M50x Monitor Headphones',
          desc: 'Critically acclaimed studio headphones offering precise, balanced monitoring for audio editing and mastering.',
          link: 'https://www.amazon.com/s?k=Audio-Technica+ATH-M50x',
          price: '$$',
          tag: 'Studio Monitor Audio',
          rating: '4.8/5',
        },
        {
          id: 'elgato-wave-arm-lp',
          name: 'Elgato Wave Mic Arm LP (Low Profile)',
          desc: 'All-metal premium low-profile boom arm that sits under your shoulder line for an unobstructed, clean camera view.',
          link: 'https://www.amazon.com/s?k=Elgato+Wave+Mic+Arm+LP',
          price: '$$',
          tag: 'Low-Profile Boom Arm',
          rating: '4.7/5',
        },
        {
          id: 'asus-proart-monitor',
          name: 'ASUS ProArt Display 27-inch PA278QV',
          desc: 'Factory-calibrated professional monitor. sRGB 100% color accuracy, perfect for editing video and designing thumbnails.',
          link: 'https://www.amazon.com/s?k=ASUS+ProArt+PA278QV',
          price: '$$$',
          tag: 'Thumbnails & Edit Screen',
          rating: '4.6/5',
        },
      ],
    },
    {
      title: '💻 Software & Creator Services',
      icon: Settings,
      items: [
        {
          id: 'epidemic-sound',
          name: 'Epidemic Sound - Royalty-Free Music Licensing',
          desc: 'Premium catalog of 40,000+ tracks and 90,000+ sound effects. Safe from copyright strikes across all platforms.',
          link: 'https://www.epidemicsound.com',
          price: 'Subscription',
          tag: 'Music License',
          rating: '4.9/5',
          popular: true,
        },
        {
          id: 'vidiq-pro',
          name: 'vidIQ Pro - YouTube Search & Competitor Analysis',
          desc: 'Advanced keyword tools, trend alerts, and channel auditing to discover competitive advantages.',
          link: 'https://vidiq.com',
          price: 'Subscription',
          tag: 'SEO Tool',
          rating: '4.7/5',
        },
        {
          id: 'canva-pro',
          name: 'Canva Pro — Thumbnail & Brand Assets Designer',
          desc: 'Visual editor with thousands of premium templates, automatic background remover, and collaborator tools.',
          link: 'https://www.canva.com',
          price: 'Subscription',
          tag: 'Graphic Design',
          rating: '4.8/5',
        },
        {
          id: 'descript',
          name: 'Descript - AI Audio & Video Text-Based Editor',
          desc: 'Edit videos by editing the transcribed text document. Instant filler word removal ("um", "uh") and AI voice cloning.',
          link: 'https://www.descript.com',
          price: 'Subscription',
          tag: 'AI Editing',
          rating: '4.8/5',
        },
        {
          id: 'adobe-premiere',
          name: 'Adobe Premiere Pro Video Editor Suite',
          desc: 'Industry standard non-linear video editing software with advanced Lumetri color tools and AI transcription features.',
          link: 'https://www.adobe.com/products/premiere.html',
          price: 'Subscription',
          tag: 'Professional Editing',
          rating: '4.7/5',
        },
      ],
    },
  ];


  return (
    <main className="container mx-auto px-6 py-12 max-w-5xl relative z-10 min-h-screen">
      {/* Hero */}
      <section className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-purple-400 bg-purple-400/10 border border-purple-400/20 mb-6 uppercase tracking-wider">
          <Heart className="w-4 h-4 text-purple-400" /> Creator Gear & Resources
        </div>
        <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
          Ultimate YouTube <span className="text-gradient">Creator Equipment & Tools</span>
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          We test and recommend the best microphones, cameras, lighting, and software to help you elevate your content quality.
        </p>
      </section>

      {/* Categories Grid */}
      <div className="space-y-12">
        {gearCategories.map((cat, catIdx) => {
          const Icon = cat.icon;
          return (
            <section key={catIdx} className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h2 className="font-display text-2xl font-bold text-slate-800 dark:text-slate-100">
                  {cat.title}
                </h2>
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
                      <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
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

      <div className="my-12">
        <InContentAd slot={adSlots.homeMid} />
      </div>

      {/* Affiliate Disclosure */}
      <section className="bg-slate-100 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800/60 rounded-2xl p-6 mt-12 text-center">
        <h4 className="font-display font-bold text-slate-700 dark:text-slate-300 mb-1">
          Disclosure & Support
        </h4>
        <p className="text-slate-500 text-xs leading-relaxed max-w-2xl mx-auto">
          Some of the links on this page are affiliate links. If you make a purchase through them, we may receive a small commission at no additional cost to you. This support helps keep FreeViralKit 100% free and running without monthly fees for everyone!
        </p>
      </section>
    </main>
  );
}
