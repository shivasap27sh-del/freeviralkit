import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import { buildAbsoluteUrl, getBaseUrl, siteConfig } from '@/lib/site';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-3301BDE5MC';
const YANDEX_ID = process.env.NEXT_PUBLIC_YANDEX_ID || '109255325';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

export const metadata: Metadata = {
  metadataBase: getBaseUrl(),
  title: {
    default: 'FreeViralKit — Free AI YouTube SEO Optimizer',
    template: '%s | FreeViralKit',
  },
  description:
    'Free AI YouTube SEO tool. Generate viral titles, descriptions, hashtags & tags. Boost your video views and rankings instantly.',
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
      'Free AI YouTube SEO tool. Generate viral titles, descriptions, hashtags & tags. Boost your video views and rankings instantly.',
    images: [
      {
        url: buildAbsoluteUrl('/banner.png'),
        width: 1200,
        height: 630,
        alt: 'FreeViralKit — Free AI YouTube SEO Optimizer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FreeViralKit — Free AI YouTube SEO Optimizer',
    description:
      'Free AI YouTube SEO tool. Generate viral titles, descriptions, hashtags & tags. Boost your video views and rankings instantly.',
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
      <head>

        <script
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
        {/* Preconnect to external domains — saves 200-400ms on first load */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://mc.yandex.ru" />
        {/* AdSense loaded afterInteractive — NOT blocking LCP */}
        <Script
          id="adsense-script"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7893678534155164"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_ID}');
          `}
        </Script>

        {/* Yandex.Metrika counter */}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_ID}', 'ym');

            ym(${YANDEX_ID}, 'init', {
                ssr:true, 
                webvisor:true, 
                clickmap:true, 
                ecommerce:"dataLayer", 
                referrer: document.referrer, 
                url: location.href, 
                accurateTrackBounce:true, 
                trackLinks:true
            });
          `}
        </Script>
      </head>
      <body className="antialiased overflow-x-hidden">
        <noscript>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://mc.yandex.ru/watch/${YANDEX_ID}`} style={{ position: 'absolute', left: '-9999px' }} alt="Analytics tracking pixel" width="1" height="1" loading="lazy" />
          </div>
        </noscript>
        {/* Background animation */}
        <div className="bg-animation">
          <div className="bg-orb bg-orb-1" />
          <div className="bg-orb bg-orb-2" />
          <div className="bg-orb bg-orb-3" />
          <div className="bg-grid" />
        </div>

        <Navbar />
        {children}
        <CookieBanner />
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
