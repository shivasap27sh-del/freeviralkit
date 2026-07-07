'use client';

import Link from 'next/link';
import Logo from '@/components/Logo';

const footerLinks = {
  Product: [
    { href: '/', label: 'YouTube SEO Tool' },
    { href: '/tools', label: 'Tools Directory' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ],
  'Metadata Generators': [
    { href: '/youtube-title-generator', label: 'Title Generator' },
    { href: '/youtube-description-generator', label: 'Description Generator' },
    { href: '/youtube-tags-generator', label: 'Tags Generator' },
    { href: '/youtube-hashtag-generator', label: 'Hashtag Generator' },
    { href: '/youtube-seo-grader', label: 'SEO Score Grader' },
  ],
  'Advanced AI Tools': [
    { href: '/youtube-script-generator', label: 'AI Script Outline' },
    { href: '/youtube-topic-researcher', label: 'AI Niche Researcher' },
    { href: '/youtube-hook-generator', label: 'Video Hook Generator' },
    { href: '/youtube-chapter-generator', label: 'Chapter Generator' },
    { href: '/youtube-thumbnail-generator', label: 'Thumbnail Ideas' },
    { href: '/creator-gear', label: 'Creator Gear & Tools' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-slate-200 dark:border-slate-800 mt-16">
      <div className="container mx-auto px-6 max-w-6xl py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="mb-4 inline-flex" aria-label="FreeViralKit Home">
              <Logo size="md" />
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              Free AI-powered YouTube SEO tool. Generate optimized titles, descriptions, hashtags, and tags to grow your channel faster.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-display text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-purple-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Stay Updated */}
          <div className="md:col-span-1">
            <h3 className="font-display text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">
              💡 Stay Updated
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Follow us on social media for weekly YouTube growth tips, algorithm updates, and creator strategies.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/shivasap27sh-del" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-purple-400 transition-colors" aria-label="GitHub">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://linkedin.com/in/shiva-srivastava" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-purple-400 transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://twitter.com/FreeViralKit" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-purple-400 transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-row flex-wrap justify-center items-center gap-6 mt-12 mb-4">
          <div className="hover:scale-105 transition-transform duration-200 inline-flex">
            <a
              href="https://www.producthunt.com/products/freeviralkit?utm_source=badge-follow&utm_medium=badge&utm_campaign=badge-freeviralkit"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/follow.svg?product_id=1223625&theme=light&size=small"
                alt="FreeViralKit - 10x your YouTube views with AI-generated titles &amp; SEO | Product Hunt"
                width="86"
                height="32"
                loading="lazy"
                className="w-[86px] h-[32px]"
              />
            </a>
          </div>
          <div className="hover:scale-105 transition-transform duration-200 inline-flex">
            <a href="https://twelve.tools" target="_blank" rel="noopener noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://twelve.tools/badge0-white.svg" alt="Featured on Twelve Tools" width="200" height="54" loading="lazy" />
            </a>
          </div>
          <div className="hover:scale-105 transition-transform duration-200 inline-flex">
            <a
              href="https://www.tinystartups.com/startup/freeviralkit"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '14px',
                padding: '14px 22px 14px 18px',
                borderRadius: '14px',
                textDecoration: 'none',
                fontFamily: "'Inter',system-ui,sans-serif",
                background: 'linear-gradient(#fff,#fff) padding-box,linear-gradient(90deg,#3525E6,#D81FE0,#22B8F0) border-box',
                border: '2px solid transparent',
                color: '#0E0B1F'
              }}
            >
              <svg width="56" height="56" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="tsg" x1=".1" y1="0" x2=".9" y2="1">
                    <stop offset="0%" stopColor="#3525E6" />
                    <stop offset="55%" stopColor="#D81FE0" />
                    <stop offset="100%" stopColor="#22B8F0" />
                  </linearGradient>
                </defs>
                <path d="M50 6C52 32 68 48 94 50C68 52 52 68 50 94C48 68 32 52 6 50C32 48 48 32 50 6Z" fill="url(#tsg)" />
              </svg>
              <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
                <span style={{ fontFamily: 'monospace', fontSize: '9px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#6A6585' }}>Launched on</span>
                <span style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.025em' }}>Tiny Startups</span>
                <span style={{ fontSize: '11px', color: '#6A6585', marginTop: '4px' }}>tinystartups.com</span>
              </span>
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-200 dark:border-slate-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-slate-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} FreeViralKit. Built with ❤️ by{' '}
              <span className="text-purple-400 font-semibold">Shiva</span>
            </p>
            <span className="hidden md:inline text-slate-300 dark:text-slate-700">|</span>
            <div className="flex flex-wrap gap-4 text-sm text-slate-500 justify-center">
              <Link href="/privacy-policy" className="hover:text-purple-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-purple-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/disclaimer" className="hover:text-purple-400 transition-colors">
                Disclaimer
              </Link>
              <FooterCookieSettings />
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-500 text-xs text-center md:text-right">
            Powered by Groq AI • Not affiliated with YouTube or Google
          </p>
        </div>
      </div>
    </footer>
  );
}

import { useConsent } from '@/components/ConsentProvider';
function FooterCookieSettings() {
  const { openBanner } = useConsent();
  return (
    <button onClick={openBanner} className="hover:text-purple-400 transition-colors bg-transparent border-none p-0 cursor-pointer text-sm">
      Cookie Settings
    </button>
  );
}
