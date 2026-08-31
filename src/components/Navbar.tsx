'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Sun,
  Moon,
  ArrowRight,
  Sparkles,
  Zap,
  Compass,
  Wand2,
  Tag,
  Hash,
  AlignLeft,
  DollarSign,
  Image as ImageIcon,
  Clapperboard,
  Gamepad2,
  Cpu,
  User,
  Activity,
  Layers,
  type LucideIcon,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/Logo';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/tools', label: 'Tools' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

interface MegaMenuItem {
  href: string;
  label: string;
  desc?: string;
  icon: LucideIcon;
  badge?: string;
}

interface MegaMenuGroup {
  category: string;
  icon: LucideIcon;
  color: string;
  tools: MegaMenuItem[];
}

const toolsMegaMenu: Record<string, MegaMenuGroup> = {
  flagship: {
    category: '⚡ Flagship & SEO',
    icon: Sparkles,
    color: 'text-cyan-400',
    tools: [
      { href: '/youtube-thumbnail-downloader', label: 'Thumbnail Downloader', desc: '4K Ultra HD & hidden tag extractor', icon: ImageIcon, badge: '500k+' },
      { href: '/youtube-money-calculator', label: 'Money / RPM Calculator', desc: 'Real 2026 niche revenue simulator', icon: DollarSign, badge: '300k+' },
      { href: '/youtube-ab-test-generator', label: '3-Way A/B Test Pack', desc: 'YouTube Studio test & compare variants', icon: Wand2, badge: 'PRO' },
      { href: '/youtube-realtime-title-generator', label: 'Real-Time Movie & Live AI', desc: 'Verified live facts & cast data', icon: Clapperboard, badge: 'LIVE' },
      { href: '/youtube-title-generator', label: 'Title Generator', desc: '10 viral high-CTR titles', icon: Wand2 },
      { href: '/youtube-tags-generator', label: 'Tags Generator', desc: 'Under 500 characters limit', icon: Tag },
      { href: '/youtube-description-generator', label: 'Description Generator', desc: 'SEO templates with timestamps', icon: AlignLeft },
      { href: '/youtube-hashtag-generator', label: 'Hashtag Generator', desc: 'Trending search hashtags', icon: Hash },
    ],
  },
  retention: {
    category: '🎬 Retention & Production',
    icon: Zap,
    color: 'text-indigo-400',
    tools: [
      { href: '/youtube-hook-generator', label: 'Retention Hook Cockpit', desc: '4-beat 30s retention script hooks', icon: Zap },
      { href: '/youtube-shorts-idea-generator', label: 'Shorts Idea Generator', desc: 'Viral 9:16 vertical video outlines', icon: Sparkles },
      { href: '/youtube-script-generator', label: 'Script Outline Writer', desc: 'Full spoken copy & B-roll cues', icon: AlignLeft },
      { href: '/youtube-chapter-generator', label: 'Chapter Timestamps', desc: 'Searchable video chapters', icon: Layers },
      { href: '/youtube-seo-grader', label: 'SEO Score Grader', desc: '100-point optimization audit', icon: Activity },
      { href: '/youtube-topic-researcher', label: 'AI Niche Researcher', desc: 'Search volume & competition', icon: Compass },
      { href: '/youtube-channel-name-generator', label: 'Channel Name Generator', desc: 'Brandable niche creator names', icon: User },
      { href: '/creator-gear', label: 'Creator Gear Setup', desc: 'Tested cameras, mics & studio gear', icon: Cpu },
    ],
  },
  niches: {
    category: '🎯 Niche AI Studios',
    icon: Compass,
    color: 'text-purple-400',
    tools: [
      { href: '/tools/youtube-title-generator-for-finance', label: 'Finance & Wealth', desc: 'Investing & crypto titles', icon: DollarSign },
      { href: '/tools/youtube-title-generator-for-ai-and-tech', label: 'AI & Tech Tools', desc: 'Software & gadget titles', icon: Cpu },
      { href: '/tools/youtube-title-generator-for-gaming', label: 'Gaming Titles', desc: 'Let’s plays & esports hooks', icon: Gamepad2 },
      { href: '/tools/youtube-title-generator-for-faceless-channels', label: 'Faceless Channels', desc: 'Automation niche ideas', icon: User },
      { href: '/tools/youtube-title-generator-for-anime', label: 'Anime Titles', desc: 'Episodes & theory breakdowns', icon: Sparkles },
      { href: '/tools/youtube-title-generator-for-asmr', label: 'ASMR Titles', desc: 'Triggers & sensory titles', icon: Activity },
      { href: '/tools/youtube-title-generator-for-fitness', label: 'Fitness Titles', desc: 'Workouts & diet routines', icon: Activity },
      { href: '/tools/youtube-title-generator-for-vlogs', label: 'Vlog Titles', desc: 'Lifestyle & daily vlogging', icon: User },
    ],
  },
};

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className="sticky top-0 z-50 py-3 backdrop-blur-xl bg-white/90 dark:bg-[#030712]/95 border-b border-slate-200 dark:border-slate-800 shadow-md">
      <div className="container mx-auto px-6 max-w-6xl flex justify-between items-center relative">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group active:scale-[0.96] transition-transform duration-75 ease-out" aria-label="FreeViralKit Home">
          <Logo size="md" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <div
              key={link.href}
              className="relative group"
              onMouseEnter={() => link.label === 'Tools' && setToolsOpen(true)}
              onMouseLeave={() => link.label === 'Tools' && setToolsOpen(false)}
            >
              <Link
                href={link.href}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all inline-block active:scale-[0.96] duration-75 ease-out ${
                  pathname === link.href || (link.label === 'Tools' && (pathname.startsWith('/youtube-') || pathname.startsWith('/tools/')))
                    ? 'text-slate-900 dark:text-white bg-slate-200/80 dark:bg-slate-800'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80'
                }`}
              >
                {link.label}
              </Link>

              {/* Spacious Solid Opaque Mega-Menu */}
              {link.label === 'Tools' && (
                <AnimatePresence>
                  {toolsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ type: 'spring', bounce: 0, duration: 0.25 }}
                      className="absolute top-full -left-48 pt-3 w-[840px] z-50 pointer-events-auto"
                    >
                      {/* Solid Opaque Container (Zero Background Bleed) */}
                      <div className="bg-white dark:bg-[#0B0F19] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl shadow-black/80 ring-1 ring-slate-800/80 overflow-hidden flex flex-col max-h-[82vh]">
                        {/* 3 Spacious Columns */}
                        <div className="p-6 grid grid-cols-3 gap-6 overflow-y-auto">
                          {Object.entries(toolsMegaMenu).map(([key, group]) => {
                            const GroupIcon = group.icon;
                            return (
                              <div key={key} className="space-y-3">
                                <div className="px-2 pb-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800">
                                  <GroupIcon className={`w-4 h-4 ${group.color}`} />
                                  <span>{group.category}</span>
                                </div>

                                <div className="space-y-1">
                                  {group.tools.map((t) => {
                                    const ToolIcon = t.icon;
                                    return (
                                      <Link
                                        key={t.href}
                                        href={t.href}
                                        className="p-2.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-900/90 active:scale-[0.98] transition-all flex items-start gap-3 group/item cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-800"
                                      >
                                        <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-950 text-slate-500 dark:text-slate-400 group-hover/item:text-cyan-400 group-hover/item:bg-blue-500/10 transition-colors shrink-0 mt-0.5 border border-slate-200/50 dark:border-slate-800">
                                          <ToolIcon className="w-3.5 h-3.5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center justify-between gap-1">
                                            <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 group-hover/item:text-cyan-400 transition-colors truncate">
                                              {t.label}
                                            </span>
                                            {t.badge && (
                                              <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shrink-0">
                                                {t.badge}
                                              </span>
                                            )}
                                          </div>
                                          {t.desc && (
                                            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5 font-normal">
                                              {t.desc}
                                            </p>
                                          )}
                                        </div>
                                      </Link>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Mega-Menu Bottom Action Bar */}
                        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs px-6">
                          <span className="text-slate-500 dark:text-slate-400 font-medium">
                            ⚡ 100% Free Multi-AI YouTube Creator Tools
                          </span>
                          <Link
                            href="/tools"
                            className="font-bold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1.5"
                          >
                            Explore All 30+ Tools <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}

          <span className="ml-3 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-purple-500/10 border border-purple-500/20 text-purple-400">
            Groq AI
          </span>

          <a
            href="https://www.producthunt.com/products/freeviralkit?utm_source=badge-follow&utm_medium=badge&utm_campaign=badge-freeviralkit"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 hover:scale-105 active:scale-[0.96] transition-transform duration-150 inline-flex items-center shrink-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://api.producthunt.com/widgets/embed-image/v1/follow.svg?product_id=1223625&theme=${theme === 'dark' ? 'dark' : 'light'}&size=small`}
              alt="FreeViralKit - Product Hunt"
              width="86"
              height="32"
              loading="lazy"
              className="w-[86px] h-[32px]"
            />
          </a>

          <button
            onClick={toggleTheme}
            className="ml-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-[0.92] transition-all duration-75 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center cursor-pointer"
            aria-label="Toggle Theme"
          >
            {!mounted ? (
              <div className="w-5 h-5" />
            ) : theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600" />
            )}
          </button>
        </nav>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="https://www.producthunt.com/products/freeviralkit?utm_source=badge-follow&utm_medium=badge&utm_campaign=badge-freeviralkit"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-105 active:scale-[0.96] transition-transform duration-150 inline-flex items-center shrink-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://api.producthunt.com/widgets/embed-image/v1/follow.svg?product_id=1223625&theme=${theme === 'dark' ? 'dark' : 'light'}&size=small`}
              alt="FreeViralKit - Product Hunt"
              width="86"
              height="32"
              loading="lazy"
              className="w-[86px] h-[32px]"
            />
          </a>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-[0.92] transition-all duration-75 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center cursor-pointer"
            aria-label="Toggle Theme"
          >
            {!mounted ? (
              <div className="w-5 h-5" />
            ) : theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600" />
            )}
          </button>
          <button
            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 active:scale-[0.92] transition-all duration-75 text-slate-700 dark:text-slate-300 flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
            className="md:hidden overflow-hidden border-t border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-[#0B0F19] backdrop-blur-xl"
          >
            <nav className="container mx-auto px-6 py-4 flex flex-col gap-1 max-h-[80vh] overflow-y-auto">
              {navLinks.map((link) => (
                <div key={link.href} className="flex flex-col">
                  <Link
                    href={link.href}
                    onClick={() => link.label !== 'Tools' && setMobileOpen(false)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all active:scale-[0.98] ${
                      pathname === link.href
                        ? 'text-slate-900 dark:text-white bg-slate-200 dark:bg-slate-800'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {link.label}
                  </Link>
                  {link.label === 'Tools' && (
                    <div className="flex flex-col ml-4 mt-1 border-l border-slate-200 dark:border-slate-700 pl-2 space-y-1">
                      {Object.values(toolsMegaMenu).flatMap((g) => g.tools).map((tool) => (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          onClick={() => setMobileOpen(false)}
                          className="px-4 py-2 text-xs text-slate-500 dark:text-slate-400 hover:text-cyan-400 active:scale-[0.98] transition-all flex items-center justify-between"
                        >
                          <span>{tool.label}</span>
                          {tool.badge && (
                            <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                              {tool.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
