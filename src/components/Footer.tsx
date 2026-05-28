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
  'AI Generators': [
    { href: '/youtube-title-generator', label: 'Title Generator' },
    { href: '/youtube-description-generator', label: 'Description Generator' },
    { href: '/youtube-tags-generator', label: 'Tags Generator' },
    { href: '/youtube-hashtag-generator', label: 'Hashtag Generator' },
  ],
  'Next-Gen AI': [
    { href: '/youtube-script-generator', label: 'AI Script Outline' },
    { href: '/youtube-topic-researcher', label: 'AI Niche Researcher' },
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
            <div className="hover:scale-105 transition-transform duration-200 inline-block">
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
                  className="w-[86px] h-[32px]"
                />
              </a>
            </div>
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

          {/* Audience Building: Newsletter */}
          <div className="md:col-span-1">
            <h3 className="font-display text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">
              💡 Algorithm Tips
            </h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Get weekly YouTube growth hacks, monetization guides, and video SEO strategies directly to your inbox.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thanks for subscribing! Welcome to the creator academy.');
                (e.target as HTMLFormElement).reset();
              }}
              className="flex flex-col gap-2"
            >
              <input
                type="email"
                required
                placeholder="Your email address"
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-purple-500 transition-colors"
              />
              <button
                type="submit"
                className="btn-primary rounded-xl py-2 text-xs font-semibold text-white cursor-pointer"
              >
                Join Free Academy
              </button>
            </form>
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
            <div className="flex gap-4 text-sm text-slate-500">
              <Link href="/privacy-policy" className="hover:text-purple-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-purple-400 transition-colors">
                Terms of Service
              </Link>
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
