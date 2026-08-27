'use client';

import { useEffect, useRef } from 'react';
import { useConsent } from '@/components/ConsentProvider';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-3301BDE5MC';
const ADSENSE_PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID || 'ca-pub-7893678534155164';

/**
 * Dynamically loads analytics and advertising scripts.
 * Loads AdSense tag unconditionally on mount so Google AdSense review bots
 * can verify publisher site ownership on every request.
 */
export default function ConsentGatedScripts() {
  const { consent } = useConsent();
  const gaLoaded = useRef(false);

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

  return null;
}

