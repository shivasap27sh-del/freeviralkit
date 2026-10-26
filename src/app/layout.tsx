import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import { ConsentProvider } from '@/components/ConsentProvider';
import ConsentGatedScripts from '@/components/ConsentGatedScripts';
import { buildAbsoluteUrl, getBaseUrl, siteConfig } from '@/lib/site';
import { ToastProvider } from '@/components/ToastProvider';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

export const metadata: Metadata = {
  metadataBase: getBaseUrl(),
  title: {
    default: 'FreeViralKit - YouTube SEO Optimizer & Metadata Engine',
    template: '%s | FreeViralKit',
  },
  description:
    'Free YouTube SEO generator. Generate viral titles, descriptions, hashtags, and Studio tags. Maximize video discoverability and search ranking.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
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
    title: 'FreeViralKit - YouTube SEO Optimizer & Metadata Engine',
    description:
      'Free YouTube SEO generator. Generate viral titles, descriptions, hashtags, and Studio tags. Maximize video discoverability and search ranking.',
    images: [
      {
        url: buildAbsoluteUrl('/banner.png'),
        width: 1200,
        height: 630,
        alt: 'FreeViralKit - YouTube SEO Optimizer & Metadata Engine',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FreeViralKit - YouTube SEO Optimizer & Metadata Engine',
    description:
      'Free YouTube SEO generator. Generate viral titles, descriptions, hashtags, and Studio tags. Maximize video discoverability and search ranking.',
    creator: siteConfig.xHandle || '@FreeViralKit',
    site: siteConfig.xHandle || '@FreeViralKit',
    images: [buildAbsoluteUrl('/banner.png')],
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
  // canonical is defined per-page in each page.tsx to avoid duplicate tags
  verification: siteConfig.googleVerificationCode
    ? {
        google: siteConfig.googleVerificationCode,
      }
    : undefined,
  other: {
    'google-adsense-account': 'ca-pub-7893678534155164',
    'saasrocket-verify': 'saasrocket-verify=4e67e032859b864899022b0f8f40d6b383fb0076564d557098ecbde1dda28006',
    'directree-verify': [
      'directree-verify=598ea56db92aa6d9e23bdb9895b408de',
      '598ea56db92aa6d9e23bdb9895b408de',
    ],
    'prodlaunchpad-verify': 'fcd3b3d3ccc5888c6602ab39f8f21a7b',
  },
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
        'Free AI YouTube SEO tool. Generate viral titles, descriptions, hashtags & tags. Boost your video views and rankings instantly.',
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
      description: 'Free AI YouTube SEO tool. Generate viral titles, descriptions, hashtags & tags. Boost your video views and rankings instantly.',
      logo: {
        '@type': 'ImageObject',
        url: buildAbsoluteUrl('/logo.png'),
        width: 512,
        height: 512,
      },
      sameAs: [
        'https://twitter.com/FreeViralKit',
        'https://github.com/shivasap27sh-del',
        'https://www.producthunt.com/products/freeviralkit',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        url: buildAbsoluteUrl('/contact'),
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head suppressHydrationWarning>
        {/* Google AdSense Official Site Verification & Auto-Ads Tag */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7893678534155164"
          crossOrigin="anonymous"
        />
        <script
          id="theme-initializer"
          type="text/javascript"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var localTheme = localStorage.getItem('theme');
                  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (localTheme === 'dark' || (!localTheme && systemDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        {/* Preconnect to external domains - saves 200-400ms on first load */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <script
          id="root-jsonld"
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      </head>
      <body className="antialiased overflow-x-hidden">
        {/* Accessible fallback when JavaScript is disabled */}
        <noscript>
          <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif', background: '#0f172a', color: '#f8fafc', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div>
              <h1>FreeViralKit</h1>
              <p>Please enable JavaScript in your browser to use FreeViralKit&apos;s AI-powered YouTube SEO tools.</p>
            </div>
          </div>
        </noscript>
        {/* Background ambient lighting removed - template-y aesthetic */}

        <ConsentProvider>
          <ToastProvider>
            <ConsentGatedScripts />
            <Navbar />
            {children}
            <CookieBanner />
            <Footer />
          </ToastProvider>
        </ConsentProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
