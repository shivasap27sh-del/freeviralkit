'use client';

import { useEffect } from 'react';

// Replace with your actual AdSense Publisher ID
const ADSENSE_PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID || 'ca-pub-XXXXXXXXXXXXXXXXX';

/**
 * Google AdSense ad unit component.
 * Supports responsive, in-article, and display ad formats.
 */
export function AdUnit({
  slot,
  format = 'auto',
  responsive = true,
  className = '',
  style = {},
}: {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  useEffect(() => {
    try {
      // Push the ad after mount
      if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).adsbygoogle) {
        ((window as unknown as Record<string, unknown>).adsbygoogle as unknown[]).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className={`ad-container ${className}`} style={{ textAlign: 'center', overflow: 'hidden', ...style }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client={ADSENSE_PUB_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}

/**
 * In-content ad that blends between sections.
 */
export function InContentAd({ slot, className = '' }: { slot: string; className?: string }) {
  return (
    <div className={`my-8 ${className}`}>
      <p className="text-[10px] text-gray-600 text-center uppercase tracking-widest mb-1">Advertisement</p>
      <AdUnit slot={slot} format="fluid" />
    </div>
  );
}

/**
 * Banner ad for header/footer areas.
 */
export function BannerAd({ slot, className = '' }: { slot: string; className?: string }) {
  return (
    <div className={`w-full py-2 ${className}`}>
      <p className="text-[10px] text-gray-600 text-center uppercase tracking-widest mb-1">Advertisement</p>
      <AdUnit slot={slot} format="horizontal" style={{ minHeight: '90px' }} />
    </div>
  );
}

/**
 * AdSense head script — inject into layout.
 */
export function AdSenseScript() {
  if (ADSENSE_PUB_ID === 'ca-pub-XXXXXXXXXXXXXXXXX') {
    // Don't load AdSense script if no real pub ID is set
    return null;
  }

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`}
      crossOrigin="anonymous"
    />
  );
}
