import type { Metadata } from 'next';
import { buildAbsoluteUrl } from '@/lib/site';
import HomePageClient from '@/components/tools/HomePageClient';
import { homepageFaqs } from '@/data/homeData';
import { HomeToolsQuickAccess } from '@/components/home/HomeToolsQuickAccess';
import { HomeSeoMasterclass } from '@/components/home/HomeSeoMasterclass';
import { HomeBlogShowcase } from '@/components/home/HomeBlogShowcase';
import { HomeFaqAccordion } from '@/components/home/HomeFaqAccordion';

export const revalidate = 3600; // Cache on Vercel Edge CDN for 1 hour with SWR background revalidation

export const metadata: Metadata = {
  title: 'Free AI YouTube SEO & Title Generator',
  description:
    'Free YouTube SEO tool. Generate viral titles, descriptions, hashtags, and tags instantly. No signup required to boost your channel.',
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI YouTube SEO & Title Generator',
    description:
      'Free YouTube SEO tool. Generate viral titles, descriptions, hashtags, and tags instantly. No signup required to boost your channel.',
    images: [buildAbsoluteUrl('/banner.png')],
  },
  openGraph: {
    title: 'FreeViralKit — Free AI YouTube SEO & Title Tool',
    description:
      'Free YouTube SEO tool. Generate viral titles, descriptions, hashtags, and tags instantly. No signup required to boost your channel.',
    url: buildAbsoluteUrl('/'),
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
    canonical: buildAbsoluteUrl('/'),
  },
};

export default function HomePage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homepageFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'FreeViralKit',
    operatingSystem: 'Any',
    applicationCategory: 'MultimediaApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Flagship Generator Client Interactive Cockpit */}
        <HomePageClient />

        {/* Tools Quick Access Directory */}
        <HomeToolsQuickAccess />

        {/* SEO Masterclass & Value Props */}
        <HomeSeoMasterclass />

        {/* Featured Editorial Blog Guides */}
        <HomeBlogShowcase />

        {/* Homepage SEO FAQ Accordion */}
        <HomeFaqAccordion />
      </main>
    </>
  );
}
