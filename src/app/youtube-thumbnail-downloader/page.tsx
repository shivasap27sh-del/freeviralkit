import type { Metadata } from 'next';
import { buildAbsoluteUrl } from '@/lib/site';
import { ThumbnailDownloaderClient } from '@/components/tools/thumbnail-downloader/ThumbnailDownloaderClient';
import { ThumbnailCuringChecklist } from '@/components/tools/thumbnail-downloader/ThumbnailCuringChecklist';
import { ThumbnailResolutionSpecsTable } from '@/components/tools/thumbnail-downloader/ThumbnailResolutionSpecsTable';
import { ThumbnailCaseStudiesSection } from '@/components/tools/thumbnail-downloader/ThumbnailCaseStudiesSection';
import { ThumbnailMasterclassSection } from '@/components/tools/thumbnail-downloader/ThumbnailMasterclassSection';
import { ThumbnailFaqSection } from '@/components/tools/thumbnail-downloader/ThumbnailFaqSection';
import { thumbnailFaqs } from '@/data/thumbnailDownloaderData';
import { Sparkles } from 'lucide-react';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Free YouTube Thumbnail Downloader & Tag Extractor (4K HD)',
  description:
    'Download YouTube thumbnails in full 4K, 1080p, and 720p HD. Extract hidden video ranking tags and keywords in 0.05 seconds. 100% free, no login required.',
  twitter: {
    card: 'summary_large_image',
    title: 'Free YouTube Thumbnail Downloader & Tag Extractor (4K HD)',
    description:
      'Download YouTube thumbnails in full 4K, 1080p, and 720p HD. Extract hidden video ranking tags and keywords in 0.05 seconds. 100% free, no login required.',
    images: [buildAbsoluteUrl('/banner.png')],
  },
  openGraph: {
    title: 'YouTube Thumbnail Downloader & Hidden Tag Extractor (4K HD)',
    description:
      'Download full-resolution YouTube video and Shorts thumbnails (MaxRes 1080p/4K). Inspect and copy hidden video ranking tags.',
    url: buildAbsoluteUrl('/youtube-thumbnail-downloader'),
    type: 'website',
  },
  alternates: {
    canonical: buildAbsoluteUrl('/youtube-thumbnail-downloader'),
  },
};

export default function YouTubeThumbnailDownloaderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'YouTube Thumbnail Downloader & Tag Extractor',
    operatingSystem: 'Any',
    applicationCategory: 'MultimediaApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: thumbnailFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="container mx-auto px-4 py-8 max-w-5xl space-y-20">
        {/* Gamer Hero Section */}
        <section className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-blue-500/10 border border-blue-500/30 text-cyan-400">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>High-Speed 4K Master Thumbnail &amp; Tag Extractor</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            YouTube Thumbnail Downloader &amp; <span className="gradient-text">Tag Extractor</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
            Download full-resolution 4K, 1080p, and 720p thumbnails instantly. Extract hidden video ranking tags and keywords with zero API wait time.
          </p>
        </section>

        {/* 1. Main Client Tool Cockpit */}
        <ThumbnailDownloaderClient />

        {/* 2. Interactive 5-Point CTR Audit Engine */}
        <ThumbnailCuringChecklist />

        {/* 3. Technical Resolution Specs Table */}
        <ThumbnailResolutionSpecsTable />

        {/* 4. Packaging Psychology & Color Theory Masterclass */}
        <ThumbnailCaseStudiesSection />

        {/* 5. Reverse-Engineering Masterclass Guide */}
        <ThumbnailMasterclassSection />

        {/* 6. Structured FAQs Accordion (AT THE VERY BOTTOM) */}
        <ThumbnailFaqSection />
      </main>
    </>
  );
}
