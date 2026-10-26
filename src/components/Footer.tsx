'use client';

import Link from 'next/link';
import Logo from '@/components/Logo';
import { useState, useEffect } from 'react';
import { useConsent } from '@/components/ConsentProvider';

const footerLinks = {
  Product: [
    { href: '/', label: 'YouTube SEO Tool' },
    { href: '/tools', label: 'Tools Directory' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ],
  'Metadata Generators': [
    { href: '/youtube-thumbnail-downloader', label: 'Thumbnail Downloader' },
    { href: '/youtube-money-calculator', label: 'YouTube Money Calculator' },
    { href: '/youtube-ab-test-generator', label: '3-Way A/B Test Pack' },
    { href: '/youtube-title-generator', label: 'Title Generator' },
    { href: '/youtube-description-generator', label: 'Description Generator' },
    { href: '/youtube-tags-generator', label: 'Tags Generator' },
    { href: '/youtube-hashtag-generator', label: 'Hashtag Generator' },
    { href: '/youtube-seo-grader', label: 'SEO Score Grader' },
  ],
  'Niche Studios': [
    { href: '/tools/youtube-title-generator-for-finance', label: 'Finance & Wealth' },
    { href: '/tools/youtube-title-generator-for-ai-and-tech', label: 'AI & Tech Tools' },
    { href: '/tools/youtube-title-generator-for-anime', label: 'Anime Title Generator' },
    { href: '/tools/youtube-title-generator-for-asmr', label: 'ASMR Title Generator' },
    { href: '/tools/youtube-title-generator-for-faceless-channels', label: 'Faceless Automation' },
    { href: '/tools/youtube-title-generator-for-gaming', label: 'Gaming Title Generator' },
  ],
};

export default function Footer() {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setCurrentTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  }, []);

  return (
    <footer className="relative z-10 border-t border-slate-200 dark:border-slate-800 mt-16">
      <div className="container mx-auto px-6 max-w-6xl py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="mb-4 inline-flex" aria-label="FreeViralKit Home">
              <Logo size="md" />
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Free YouTube SEO and metadata optimization suite. Generate high-CTR titles, structured descriptions, hashtags, and tags to grow your channel faster.
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
                      className="text-sm text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
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
              Stay Updated
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Follow us on social media for weekly YouTube growth tips, algorithm updates, and creator strategies.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/shivasap27sh-del" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors" aria-label="GitHub">
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

        {/* Directory badges - uniform compact row */}
        <div className="mt-12 mb-4">
          <p className="text-xs text-slate-400 dark:text-slate-500 text-center mb-4 uppercase tracking-widest font-medium">As Seen On</p>
          <div className="flex flex-row flex-wrap justify-center items-center gap-4 opacity-60 hover:opacity-90 transition-opacity duration-300">
            <a href="https://www.producthunt.com/products/freeviralkit?utm_source=badge-follow&utm_medium=badge&utm_campaign=badge-freeviralkit" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://api.producthunt.com/widgets/embed-image/v1/follow.svg?product_id=1223625&theme=${currentTheme}&size=small`} alt="Product Hunt" width="86" height="28" loading="lazy" className="h-7 w-auto" />
            </a>
            <a href="https://codetrendy.com/listing/freeviralkit?utm_source=freeviralkit.com&utm_medium=badge" target="_blank" rel="nofollow noopener noreferrer" className="hover:scale-105 transition-transform">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://codetrendy.com/api/badge?style=classic" alt="CodeTrendy" height="28" loading="lazy" className="h-7 w-auto" />
            </a>
            <a href="https://sitepatent.com/?utm_source=freeviralkit.com&utm_medium=badge" target="_blank" rel="nofollow noopener noreferrer" className="hover:scale-105 transition-transform">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://sitepatent.com/api/badge?style=classic" alt="SitePatent" height="28" loading="lazy" className="h-7 w-auto" />
            </a>
            <a href="https://mediapronet.com/?utm_source=freeviralkit.com&utm_medium=badge" target="_blank" rel="nofollow noopener noreferrer" className="hover:scale-105 transition-transform">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://mediapronet.com/api/badge?style=classic" alt="MediaProNet" height="28" loading="lazy" className="h-7 w-auto" />
            </a>
            <a href="https://twelve.tools" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://twelve.tools/badge0-white.svg" alt="Twelve Tools" width="120" height="28" loading="lazy" className="h-7 w-auto" />
            </a>
            <a href="https://tools.launchllama.co/products/freeviralkit?utm_source=badge&utm_medium=referral" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://tools.launchllama.co/featured-badge.png?v=2" alt="Featured on Launch Llama Tools" width="200" height="52" loading="lazy" className="h-7 w-auto" />
            </a>
            <a href="https://racoondr.com/freeviralkit.com" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://racoondr.com/badge/freeviralkit.com?style=default&theme=dark&shape=rounded" alt="Domain Rating of freeviralkit.com" width="185" height="44" loading="lazy" className="h-7 w-auto" />
            </a>
            <a href="https://www.directree.io" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://www.directree.io/badge/directree-badge-lightmode.svg" alt="Verified on directree" width="200" height="37" loading="lazy" className="h-7 w-auto" />
            </a>
            <a href="https://toolroots.com/p/freeviralkit" target="_blank" rel="noopener noreferrer" title="Featured on ToolRoots" className="hover:scale-105 transition-transform">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://toolroots.com/badge.svg" alt="Featured on ToolRoots" width="181" height="32" loading="lazy" className="h-7 w-auto" />
            </a>
            <a href="https://launched.tools/tools/freeviralkit" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform shrink-0 inline-flex items-center gap-2 rounded-[10px] px-2.5 py-1 text-decoration-none" style={{ background: '#15170F', border: '1px solid #D4D7C9', fontFamily: 'sans-serif' }}>
              <span className="inline-flex items-center justify-center shrink-0 rounded-[6px]" style={{ width: '20px', height: '20px', background: '#C6F94E' }}>
                <svg width="12" height="12" viewBox="128 120 264 264" aria-hidden="true"><path d="M214 120 L392 120 L392 298 Z" fill="#15170F" /><path d="M156 356 L322 190" stroke="#15170F" strokeWidth="78" fill="none" /></svg>
              </span>
              <span className="flex flex-col leading-tight text-left">
                <span style={{ fontWeight: 700, fontSize: '11px', color: '#F5F6F0' }}>Featured on launched.tools</span>
                <span style={{ fontSize: '9px', color: '#878C79' }}>REVIEWED ✓</span>
              </span>
            </a>
            <a href="https://launchator.com" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://launchator.com/badge/light" alt="Featured on Launchator" width="200" height="54" loading="lazy" className="h-7 w-auto" />
            </a>
            <a href="https://www.tinystartups.com/startup/freeviralkit" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
              Tiny Startups ↗
            </a>
            <a href="https://launchaf.com/" target="_blank" rel="noopener noreferrer" data-launchaf-badge="true" className="hover:scale-105 transition-transform">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://launchaf.com/api/badge/light?v=launchaf-blue-2026-2" alt="Featured on LaunchAF" width="200" height="56" loading="lazy" className="h-7 w-auto" />
            </a>
            <a href="https://prodlaunchpad.com/product/freeviralkit" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://prodlaunchpad.com/badges/prodlaunchpad-badge-dark.svg" alt="Featured on ProdLaunchPad" width="200" height="54" loading="lazy" className="h-7 w-auto" />
            </a>
            <a href="https://dodolaunch.com/p/freeviralkit?ref=badge" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://dodolaunch.com/badge/freeviralkit?theme=light" alt="Freeviralkit on DodoLaunch" width="200" height="54" loading="lazy" className="h-7 w-auto" />
            </a>
            <a href="https://bunny.directory/product/free-ai-youtube-seo-and-title-generat" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://bunny.directory/product/free-ai-youtube-seo-and-title-generat/badge.svg?theme=dark" alt="Free AI YouTube SEO and Title Generator on Bunny Directory" width="200" height="50" loading="lazy" className="h-7 w-auto" />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-200 dark:border-slate-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-slate-500 dark:text-slate-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} FreeViralKit. Built for YouTube Creators Worldwide.
            </p>
            <span className="hidden md:inline text-slate-300 dark:text-slate-700">|</span>
            <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400 justify-center">
              <Link href="/privacy-policy" className="hover:text-red-500 dark:hover:text-red-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-red-500 dark:hover:text-red-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/disclaimer" className="hover:text-red-500 dark:hover:text-red-400 transition-colors">
                Disclaimer
              </Link>
              <FooterCookieSettings />
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-500 text-xs text-center md:text-right">
            Independent creator utility. Not affiliated with YouTube or Google Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCookieSettings() {
  const { openBanner } = useConsent();
  return (
    <button onClick={openBanner} className="hover:text-red-500 dark:hover:text-red-400 transition-colors bg-transparent border-none p-0 cursor-pointer text-sm">
      Cookie Settings
    </button>
  );
}
