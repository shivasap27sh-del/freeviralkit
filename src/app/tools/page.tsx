import type { Metadata } from 'next';
import Link from 'next/link';
import { buildAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'YouTube SEO Tools by Niche | FreeViralKit',
  description:
    'Explore niche-specific YouTube SEO tools and guides for gaming, vlogs, education, and more. Find templates that improve reach and search traffic.',
  alternates: {
    canonical: buildAbsoluteUrl('/tools'),
  },
  openGraph: {
    title: 'YouTube SEO Tools by Niche | FreeViralKit',
    description:
      'Niche-ready YouTube SEO tools for creators who want more search traffic and views.',
    type: 'website',
    url: buildAbsoluteUrl('/tools'),
  },
};

const pages = [
  {
    href: '/tools/youtube-title-generator-for-gaming',
    title: 'YouTube Title Generator for Gaming',
    description:
      'Generate gaming titles designed for walkthroughs, tips, and challenge videos.',
  },
  {
    href: '/tools/youtube-title-generator-for-vlogs',
    title: 'YouTube Title Generator for Vlogs',
    description:
      'Create vlog titles that boost clicks for daily life, travel, and personal stories.',
  },
  {
    href: '/tools/youtube-description-generator-for-education',
    title: 'YouTube Description Generator for Education',
    description:
      'Write clear educational descriptions with structured learning outcomes and CTAs.',
  },
];

export default function ToolsPage() {
  return (
    <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
      <section className="text-center mb-10">
        <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
          YouTube SEO <span className="text-gradient">Tools by Niche</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Use these niche pages to get more specific results and better rankings in Google.
        </p>
      </section>

      <section className="space-y-4">
        {pages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="glass-card rounded-2xl p-6 block hover:border-purple-500/30 transition-all"
          >
            <h2 className="font-display text-xl font-semibold mb-2">{page.title}</h2>
            <p className="text-gray-400">{page.description}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
