import type { Metadata } from 'next';
import { buildAbsoluteUrl } from '@/lib/site';
import { Heart } from 'lucide-react';
import { gearCategories, gearFaqs } from '@/data/creatorGearData';
import { GearCategoryCard } from '@/components/gear/GearCategoryCard';
import { GearBuyersGuide } from '@/components/gear/GearBuyersGuide';
import { GearFaqSection } from '@/components/gear/GearFaqSection';

export const metadata: Metadata = {
  title: 'YouTube Creator Gear & Setup Guide (2026)',
  description: 'Best microphones, cameras, lighting, and software for YouTube creators. Tested gear for vlogging, streaming, and studio setups.',
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube Creator Gear & Setup Guide (2026)',
    description: 'Best microphones, cameras, lighting, and software for YouTube creators. Tested gear for vlogging, streaming, and studio setups.',
    images: [buildAbsoluteUrl('/banner.png')],
  },
  openGraph: {
    title: 'YouTube Creator Gear & Setup Guide (2026)',
    description: 'Best microphones, cameras, lighting, and software for YouTube creators. Tested gear for vlogging and streaming.',
    url: buildAbsoluteUrl('/creator-gear'),
    type: 'website',
    images: [
      {
        url: buildAbsoluteUrl('/banner.png'),
        width: 1200,
        height: 630,
        alt: 'FreeViralKit',
      },
    ],
  },
  alternates: {
    canonical: buildAbsoluteUrl('/creator-gear'),
  },
};

const pageJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FAQPage',
      mainEntity: gearFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function CreatorGearPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd).replace(/</g, '\\u003c') }}
      />
      <main className="container mx-auto px-6 py-12 max-w-5xl relative z-10 min-h-screen">
        {/* Hero */}
        <section className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-purple-400 bg-purple-400/10 border border-purple-400/20 mb-6 uppercase tracking-wider">
            <Heart className="w-4 h-4 text-purple-400" aria-hidden="true" /> Creator Gear & Resources
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4 text-slate-900 dark:text-white">
            Ultimate YouTube Creator Equipment & Tools
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            We test and recommend the best microphones, cameras, lighting, and software to help you elevate your content quality and optimize your workflow.
          </p>
        </section>

        {/* Buyer's Guide - E-E-A-T Section */}
        <GearBuyersGuide />

        {/* Categories Grid */}
        <div className="space-y-12">
          {gearCategories.map((cat, catIdx) => (
            <GearCategoryCard key={catIdx} category={cat} />
          ))}
        </div>

        {/* FAQ Section */}
        <GearFaqSection />
      </main>
    </>
  );
}
