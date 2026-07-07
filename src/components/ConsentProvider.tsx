'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

export interface ConsentState {
  /** Essential cookies — always true, cannot be disabled */
  essential: true;
  /** Analytics: GA4, Vercel Analytics */
  analytics: boolean;
  /** Advertising: Google AdSense */
  advertising: boolean;
}

interface ConsentContextValue {
  consent: ConsentState | null; // null = not yet decided
  hasDecided: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  updateConsent: (state: Partial<Omit<ConsentState, 'essential'>>) => void;
  openBanner: () => void;
  isBannerOpen: boolean;
}

const CONSENT_COOKIE = 'fvk_consent';
const CONSENT_MAX_AGE = 365 * 24 * 60 * 60; // 1 year in seconds

const ConsentContext = createContext<ConsentContextValue | undefined>(undefined);

/** Parse consent cookie value */
function readConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null;

  // Try cookie first
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${CONSENT_COOKIE}=([^;]*)`));
  if (match) {
    try {
      const parsed = JSON.parse(decodeURIComponent(match[1]));
      return { essential: true, analytics: !!parsed.analytics, advertising: !!parsed.advertising };
    } catch { /* fall through */ }
  }

  // Fallback: legacy localStorage key from old banner
  const legacy = localStorage.getItem('cookie-consent');
  if (legacy === 'accepted') {
    // Migrate: old banner accepted = accept all
    const state: ConsentState = { essential: true, analytics: true, advertising: true };
    writeConsent(state);
    localStorage.removeItem('cookie-consent');
    return state;
  }
  if (legacy === 'declined') {
    const state: ConsentState = { essential: true, analytics: false, advertising: false };
    writeConsent(state);
    localStorage.removeItem('cookie-consent');
    return state;
  }

  return null;
}

/** Write consent to cookie + localStorage */
function writeConsent(state: ConsentState): void {
  const value = encodeURIComponent(JSON.stringify({ analytics: state.analytics, advertising: state.advertising }));
  document.cookie = `${CONSENT_COOKIE}=${value};path=/;max-age=${CONSENT_MAX_AGE};SameSite=Lax`;
  localStorage.setItem(CONSENT_COOKIE, JSON.stringify(state));
  // Emit event so ConsentGatedScripts can react
  window.dispatchEvent(new CustomEvent('consent-updated', { detail: state }));
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [hasDecided, setHasDecided] = useState(false);
  const [isBannerOpen, setIsBannerOpen] = useState(false);

  // Read consent on mount
  useEffect(() => {
    const stored = readConsent();
    if (stored) {
      setConsent(stored);
      setHasDecided(true);
    } else {
      // First visit — show banner after a short delay for UX
      const timer = setTimeout(() => setIsBannerOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = useCallback(() => {
    const state: ConsentState = { essential: true, analytics: true, advertising: true };
    writeConsent(state);
    setConsent(state);
    setHasDecided(true);
    setIsBannerOpen(false);
  }, []);

  const rejectNonEssential = useCallback(() => {
    const state: ConsentState = { essential: true, analytics: false, advertising: false };
    writeConsent(state);
    setConsent(state);
    setHasDecided(true);
    setIsBannerOpen(false);
  }, []);

  const updateConsent = useCallback((partial: Partial<Omit<ConsentState, 'essential'>>) => {
    setConsent((prev) => {
      const updated: ConsentState = {
        essential: true,
        analytics: partial.analytics ?? prev?.analytics ?? false,
        advertising: partial.advertising ?? prev?.advertising ?? false,
      };
      writeConsent(updated);
      setHasDecided(true);
      setIsBannerOpen(false);
      return updated;
    });
  }, []);

  const openBanner = useCallback(() => {
    setIsBannerOpen(true);
  }, []);

  return (
    <ConsentContext.Provider value={{ consent, hasDecided, acceptAll, rejectNonEssential, updateConsent, openBanner, isBannerOpen }}>
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error('useConsent must be used within <ConsentProvider>');
  return ctx;
}
