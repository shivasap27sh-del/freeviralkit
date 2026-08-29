import type { Metadata } from 'next';
import { buildAbsoluteUrl } from '@/lib/site';
import { coreTools, nicheTools } from '@/data/toolsCatalog';
import { ToolsCategoryGrid } from '@/components/tools-hub/ToolsCategoryGrid';
import { ToolsFaqAccordion } from '@/components/tools-hub/ToolsFaqAccordion';

export const revalidate = 3600; // Cache on Vercel Edge CDN for 1 hour with SWR background revalidation

export const metadata: Metadata = {
  twitter: {
    card: 'summary_large_image',
    title: 'Free YouTube SEO Tools & Niche Generators',
    description:
      'Free YouTube SEO tools: generate viral titles, hashtags, tags, descriptions, and channel names. Boost your channel growth instantly.',
    images: [buildAbsoluteUrl('/banner.png')],
  },
  title: 'Free YouTube SEO Tools & Niche Generators',
  description:
    'Free YouTube SEO tools: generate viral titles, hashtags, tags, descriptions, and channel names. Boost your channel growth instantly.',
  alternates: {
    canonical: buildAbsoluteUrl('/tools'),
  },
  openGraph: {
    title: 'Free YouTube SEO Tools & Niche Generators',
    description:
      'Free YouTube SEO generators and niche-specific tools to optimize your videos and rank higher.',
    type: 'website',
    url: buildAbsoluteUrl('/tools'),
    images: [
      {
        url: buildAbsoluteUrl('/banner.png'),
        width: 1200,
        height: 630,
        alt: 'FreeViralKit',
      },
    ],
  },
};

export default function ToolsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Free YouTube SEO Tools & Generators',
    description: 'Comprehensive suite of free AI-powered YouTube optimization tools.',
    itemListElement: [...coreTools, ...nicheTools].map((tool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: tool.title,
      description: tool.description,
      url: buildAbsoluteUrl(tool.href),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto space-y-16 py-8">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Free YouTube <span className="gradient-text">SEO Tools</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
            Everything you need to optimize, package, and rank your YouTube videos for free with zero sign-up.
          </p>
        </div>

        {/* Core Flagship Tools Grid */}
        <ToolsCategoryGrid
          title="Flagship YouTube Growth Tools"
          description="High-velocity AI engines for titles, tags, script hooks, and real-time movie SEO."
          tools={coreTools}
        />

        {/* Niche-Specific Tools Grid */}
        <ToolsCategoryGrid
          title="Niche-Specific SEO Generators"
          description="Tailored algorithms trained on specific audience behaviors across gaming, tech, finance, and vlogs."
          tools={nicheTools}
        />

        {/* FAQ Section */}
        <ToolsFaqAccordion />
      </div>
    </>
  );
}
