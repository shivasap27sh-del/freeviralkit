'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Video, Menu, X } from 'lucide-react';
import { useState } from 'react';

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
  { href: '/tools/youtube-title-generator-for-gaming', label: 'Gaming Titles' },
  { href: '/tools/youtube-title-generator-for-vlogs', label: 'Vlog Titles' },
  { href: '/tools/youtube-description-generator-for-education', label: 'Education Descriptions' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 py-3 backdrop-blur-xl bg-white/80 border-b border-slate-200">
      <div className="container mx-auto px-6 max-w-6xl flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-[0_4px_15px_rgba(139,92,246,0.4)] group-hover:shadow-[0_4px_25px_rgba(139,92,246,0.6)] transition-shadow">
            <Video className="text-slate-900 w-5 h-5" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight">
            FreeViral<span className="text-transparent bg-clip-text bg-gradient-primary">Kit</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <div key={link.href} className="relative group" onMouseEnter={() => link.label === 'Tools' && setToolsOpen(true)} onMouseLeave={() => link.label === 'Tools' && setToolsOpen(false)}>
              <Link
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all inline-block ${
                  pathname === link.href || (link.label === 'Tools' && pathname.startsWith('/youtube-'))
                    ? 'text-slate-900 bg-slate-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </Link>
              {/* Dropdown Menu */}
              {link.label === 'Tools' && (
                <div className={`absolute top-full left-0 pt-2 w-56 transition-all duration-200 ${toolsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
                  <div className="bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden flex flex-col py-1">
                    {toolsDropdown.map(tool => (
                      <Link key={tool.href} href={tool.href} className="px-4 py-2.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors">
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
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-slate-200 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl">
          <nav className="container mx-auto px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <div key={link.href} className="flex flex-col">
                <Link
                  href={link.href}
                  onClick={() => link.label !== 'Tools' && setMobileOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    pathname === link.href
                      ? 'text-slate-900 bg-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </Link>
                {link.label === 'Tools' && (
                  <div className="flex flex-col ml-4 mt-1 border-l border-slate-200 pl-2">
                    {toolsDropdown.map(tool => (
                      <Link key={tool.href} href={tool.href} onClick={() => setMobileOpen(false)} className="px-4 py-2 text-sm text-slate-500 hover:text-slate-900 transition-colors">
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
