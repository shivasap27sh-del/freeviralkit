'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import Logo from '@/components/Logo';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/tools', label: 'Tools' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

const toolsDropdown = [
  { href: '/youtube-title-generator', label: 'Title Generator' },
  { href: '/youtube-hashtag-generator', label: 'Hashtag Generator' },
  { href: '/youtube-tags-generator', label: 'Tags Generator' },
  { href: '/youtube-description-generator', label: 'Description Generator' },
  { href: '/youtube-channel-name-generator', label: 'Channel Name Generator' },
  { href: '/youtube-shorts-idea-generator', label: 'Shorts Idea Generator' },
  { href: '/youtube-script-generator', label: 'Script Outline Writer' },
  { href: '/youtube-topic-researcher', label: 'AI Niche Researcher' },
  { href: '/youtube-hook-generator', label: 'Video Hook Generator' },
  { href: '/youtube-chapter-generator', label: 'Chapter/Timestamp Generator' },
  { href: '/youtube-thumbnail-generator', label: 'Thumbnail Idea Generator' },
  { href: '/youtube-seo-grader', label: 'SEO Score Grader' },
  { href: '/creator-gear', label: 'Creator Gear & Tools' },
  { href: '/tools/youtube-title-generator-for-gaming', label: 'Gaming Titles' },
  { href: '/tools/youtube-title-generator-for-vlogs', label: 'Vlog Titles' },
  { href: '/tools/youtube-title-generator-for-tech', label: 'Tech Titles' },
  { href: '/tools/youtube-title-generator-for-beauty', label: 'Beauty Titles' },
  { href: '/tools/youtube-title-generator-for-cooking', label: 'Cooking Titles' },
  { href: '/tools/youtube-title-generator-for-fitness', label: 'Fitness Titles' },
  { href: '/tools/youtube-title-generator-for-travel', label: 'Travel Titles' },
  { href: '/tools/youtube-title-generator-for-music', label: 'Music Titles' },
  { href: '/tools/youtube-description-generator-for-education', label: 'Education Descriptions' },
  { href: '/tools/youtube-description-generator-for-tech', label: 'Tech Descriptions' },
  { href: '/tools/youtube-tags-generator-for-gaming', label: 'Gaming Tags' },
  { href: '/tools/youtube-hashtag-generator-for-shorts', label: 'Shorts Hashtags' },
  { href: '/tools/youtube-channel-name-generator-for-gaming', label: 'Gaming Channel Names' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const localTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (localTheme === 'dark' || (!localTheme && systemPrefersDark)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme('light');
      document.documentElement.classList.remove('dark');
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
    <header className="sticky top-0 z-50 py-3 backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-6 max-w-6xl flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" aria-label="FreeViralKit Home">
          <Logo size="md" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <div key={link.href} className="relative group" onMouseEnter={() => link.label === 'Tools' && setToolsOpen(true)} onMouseLeave={() => link.label === 'Tools' && setToolsOpen(false)}>
              <Link
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all inline-block ${
                  pathname === link.href || (link.label === 'Tools' && pathname.startsWith('/youtube-'))
                    ? 'text-slate-900 dark:text-white bg-slate-200 dark:bg-slate-800'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {link.label}
              </Link>
              {/* Dropdown Menu */}
              {link.label === 'Tools' && (
                <div className={`absolute top-full left-0 pt-2 w-[480px] transition-all duration-200 ${toolsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden grid grid-cols-2 p-2 gap-1">
                    {toolsDropdown.map(tool => (
                      <Link key={tool.href} href={tool.href} className="px-3 py-2.5 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors rounded-lg line-clamp-1" title={tool.label}>
                        {tool.label}
                      </Link>
                    ))}
                  </div>
                </div>
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
            className="ml-3 hover:scale-105 transition-transform duration-200 inline-flex items-center shrink-0"
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
            className="ml-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center cursor-pointer"
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
            className="hover:scale-105 transition-transform duration-200 inline-flex items-center shrink-0"
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
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center cursor-pointer"
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
            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300 flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl">
          <nav className="container mx-auto px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <div key={link.href} className="flex flex-col">
                <Link
                  href={link.href}
                  onClick={() => link.label !== 'Tools' && setMobileOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    pathname === link.href
                      ? 'text-slate-900 dark:text-white bg-slate-200 dark:bg-slate-800'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.label}
                </Link>
                {link.label === 'Tools' && (
                  <div className="flex flex-col ml-4 mt-1 border-l border-slate-200 dark:border-slate-700 pl-2">
                    {toolsDropdown.map(tool => (
                      <Link key={tool.href} href={tool.href} onClick={() => setMobileOpen(false)} className="px-4 py-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                        {tool.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
