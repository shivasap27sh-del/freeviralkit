import { Metadata } from 'next';
import Link from 'next/link';
import { Home, Search, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist. Explore our free AI YouTube SEO tools instead.',
  robots: { index: false, follow: true },
};

/**
 * Custom 404 page for FreeViralKit.
 * Keeps users on the site by suggesting popular tools
 * instead of showing a dead-end error. This lowers bounce rate
 * which directly improves AdSense RPM.
 */

const popularTools = [
  { name: 'YouTube Title Generator', href: '/youtube-title-generator', emoji: '🎯' },
  { name: 'YouTube Tags Generator', href: '/youtube-tags-generator', emoji: '🏷️' },
  { name: 'YouTube Description Generator', href: '/youtube-description-generator', emoji: '📝' },
  { name: 'YouTube Hashtag Generator', href: '/youtube-hashtag-generator', emoji: '#️⃣' },
];

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        {/* 404 number with gradient */}
        <h1
          className="text-gradient font-display font-black text-8xl sm:text-9xl leading-none mb-4 select-none"
          aria-label="404 error"
        >
          404
        </h1>

        {/* Heading */}
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
          Page not found
        </h2>

        {/* Description */}
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Try one of our popular tools below.
        </p>

        {/* Home button */}
        <Link
          href="/"
          className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold mb-10"
        >
          <Home className="w-4 h-4" />
          Back to Homepage
        </Link>

        {/* Popular tools section */}
        <div className="glass-card rounded-2xl p-6 text-left">
          <div className="flex items-center gap-2 mb-4">
            <Search className="w-4 h-4 text-purple-400" />
            <h3 className="font-display font-semibold text-slate-900 text-sm">
              Popular Tools
            </h3>
          </div>
          <div className="space-y-2">
            {popularTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors group"
              >
                <span className="flex items-center gap-3">
                  <span className="text-lg" role="img" aria-hidden="true">{tool.emoji}</span>
                  <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                    {tool.name}
                  </span>
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
