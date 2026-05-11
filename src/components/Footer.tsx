import Link from 'next/link';
import { Video } from 'lucide-react';

const footerLinks = {
  Product: [
    { href: '/', label: 'YouTube SEO Tool' },
    { href: '/tools', label: 'Tools by Niche' },
    { href: '/about', label: 'About Us' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ],
  Resources: [
    { href: '/blog/youtube-seo-guide', label: 'YouTube SEO Guide' },
    { href: '/blog/best-youtube-tags', label: 'Best YouTube Tags' },
    { href: '/blog/youtube-description-tips', label: 'Description Tips' },
    { href: '/blog/youtube-hashtag-strategy', label: 'Hashtag Strategy' },
  ],
  Legal: [
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-slate-200 mt-16">
      <div className="container mx-auto px-6 max-w-6xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Video className="text-slate-900 w-4 h-4" />
              </div>
              <span className="font-display text-lg font-bold">
                FreeViral<span className="text-transparent bg-clip-text bg-gradient-primary">Kit</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Free AI-powered YouTube SEO tool. Generate optimized titles, descriptions, hashtags, and tags to grow your channel faster.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-display text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
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
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-200 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} FreeViralKit. Built with ❤️ by{' '}
            <span className="text-purple-400 font-semibold">Shiva</span>
          </p>
          <p className="text-gray-600 text-xs">
            Powered by Groq AI • Not affiliated with YouTube or Google
          </p>
        </div>
      </div>
    </footer>
  );
}
