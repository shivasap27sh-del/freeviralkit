'use client';

import { useEffect, useRef } from 'react';
import { useConsent } from '@/components/ConsentProvider';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-3301BDE5MC';

/**
 * Dynamically loads analytics and advertising scripts
 * ONLY when the user has granted the corresponding consent.
 * Replaces the old unconditional <Script> tags in layout.tsx.
 */
export default function ConsentGatedScripts() {
  const { consent } = useConsent();
  const gaLoaded = useRef(false);
  const adsenseLoaded = useRef(false);

  // Load Google Analytics when analytics consent is granted
  useEffect(() => {
    if (!consent?.analytics || gaLoaded.current) return;
    gaLoaded.current = true;

    // Load gtag.js
    const gtagScript = document.createElement('script');
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    gtagScript.async = true;
    document.head.appendChild(gtagScript);

    // Initialize gtag
    const initScript = document.createElement('script');
    initScript.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_ID}');
    `;
    document.head.appendChild(initScript);
  }, [consent?.analytics]);

  // Load AdSense when advertising consent is granted
  useEffect(() => {
    if (!consent?.advertising || adsenseLoaded.current) return;
    adsenseLoaded.current = true;

    const adsenseScript = document.createElement('script');
    adsenseScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7893678534155164';
    adsenseScript.async = true;
    adsenseScript.crossOrigin = 'anonymous';
    document.head.appendChild(adsenseScript);
  }, [consent?.advertising]);

  return null; // This component renders nothing — it only manages script loading
}
