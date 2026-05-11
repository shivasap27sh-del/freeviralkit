import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AdSenseScript } from '@/components/AdSense';
import { buildAbsoluteUrl, getBaseUrl, siteConfig } from '@/lib/site';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

export const metadata: Metadata = {
  metadataBase: getBaseUrl(),
  title: {
    default: 'FreeViralKit — Free AI YouTube SEO Optimizer | Titles, Tags, Descriptions',
    template: '%s | FreeViralKit',
  },
  description:
    'Free AI-powered YouTube SEO tool. Generate viral titles, optimized descriptions, trending hashtags, and SEO tags for your YouTube videos. Boost views, subscribers, and rankings instantly.',
  keywords: [
    'youtube seo tool',
    'youtube title generator',
    'youtube tag generator',
    'youtube description generator',
    'youtube hashtag generator',
    'youtube seo optimizer',
    'free youtube tool',
    'ai youtube tool',
    'video seo',
    'youtube growth',
    'youtube ranking',
    'freeviralkit',
  ],
  authors: [{ name: 'Shiva' }],
  creator: 'Shiva',
  publisher: 'FreeViralKit',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: buildAbsoluteUrl('/'),
    siteName: 'FreeViralKit',
    title: 'FreeViralKit — Free AI YouTube SEO Optimizer',
    description:
      'Generate viral YouTube titles, descriptions, hashtags & tags with AI. 100% free YouTube SEO tool.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FreeViralKit — Free AI YouTube SEO Optimizer',
    description:
      'Generate viral YouTube titles, descriptions, hashtags & tags with AI. Free forever.',
    creator: siteConfig.xHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: buildAbsoluteUrl('/'),
  },
  verification: siteConfig.googleVerificationCode
    ? {
        google: siteConfig.googleVerificationCode,
      }
    : undefined,
};

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'FreeViralKit',
      url: buildAbsoluteUrl('/'),
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      description:
        'Free AI-powered YouTube SEO tool for generating optimized titles, descriptions, hashtags, and tags.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      author: {
        '@type': 'Person',
        name: 'Shiva',
      },
    },
    {
      '@type': 'Organization',
      name: 'FreeViralKit',
      url: buildAbsoluteUrl('/'),
      description: 'Free AI YouTube SEO optimization tool',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is FreeViralKit free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, FreeViralKit is 100% free. No signup, no credit card, no hidden fees.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does FreeViralKit generate YouTube titles?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'FreeViralKit uses Groq AI to analyze your video topic and generate 10 SEO-optimized titles with emojis and hashtags tailored to your niche.',
          },
        },
        {
          '@type': 'Question',
          name: 'What does FreeViralKit generate?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'FreeViralKit generates optimized video titles, descriptions, hashtags, tags, and pinned comments — everything you need for YouTube SEO.',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <AdSenseScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {/* Background animation */}
        <div className="bg-animation">
          <div className="bg-orb bg-orb-1" />
          <div className="bg-orb bg-orb-2" />
          <div className="bg-orb bg-orb-3" />
          <div className="bg-grid" />
        </div>

        <Navbar />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
