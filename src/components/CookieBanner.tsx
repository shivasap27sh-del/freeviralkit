'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useConsent } from '@/components/ConsentProvider';

export default function CookieBanner() {
  const { isBannerOpen, openBanner, updateConsent, acceptAll, rejectNonEssential, hasDecided } = useConsent();
  const [showPreferences, setShowPreferences] = useState(false);
  const [prefs, setPrefs] = useState({ analytics: true, advertising: true });

  if (!isBannerOpen && hasDecided) return null;
  if (!isBannerOpen && !hasDecided) return null; // Wait for provider to open it

  const handleSavePreferences = () => {
    updateConsent(prefs);
    setShowPreferences(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 z-[100] transition-all duration-500 ease-out translate-y-0">
      <div className="container mx-auto max-w-4xl relative">
        <div className="glass-card bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden p-6">
          {!showPreferences ? (
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1 text-sm text-slate-600 dark:text-slate-400">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">We value your privacy</h3>
                <p className="mb-2">
                  We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies.
                </p>
                <div className="flex gap-4 text-xs font-medium">
                  <Link href="/privacy-policy" className="text-purple-500 hover:text-purple-600">Privacy Policy</Link>
                  <button onClick={() => setShowPreferences(true)} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">Manage Preferences</button>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch gap-3 shrink-0 w-full md:w-auto">
                <button
                  onClick={rejectNonEssential}
                  className="px-5 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors whitespace-nowrap"
                >
                  Reject All
                </button>
                <button
                  onClick={acceptAll}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors shadow-sm whitespace-nowrap"
                >
                  Accept All
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Cookie Preferences</h3>
                <button onClick={() => setShowPreferences(false)} className="text-slate-500 hover:text-slate-700 text-sm font-medium">Back</button>
              </div>
              
              <div className="space-y-4">
                {/* Essential */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white text-sm">Strictly Necessary Cookies</div>
                    <div className="text-xs text-slate-500 mt-1">Required for the website to function properly. Cannot be switched off.</div>
                  </div>
                  <div className="text-xs font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Always Active</div>
                </div>

                {/* Analytics */}
                <div className="flex items-start justify-between gap-4 border-t border-slate-100 dark:border-slate-800 pt-4">
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white text-sm">Analytics Cookies</div>
                    <div className="text-xs text-slate-500 mt-1">Help us understand how visitors interact with the website (Google Analytics).</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input type="checkbox" className="sr-only peer" checked={prefs.analytics} onChange={(e) => setPrefs(p => ({ ...p, analytics: e.target.checked }))} />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                {/* Advertising */}
                <div className="flex items-start justify-between gap-4 border-t border-slate-100 dark:border-slate-800 pt-4">
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white text-sm">Advertising Cookies</div>
                    <div className="text-xs text-slate-500 mt-1">Used to deliver relevant ads and track ad campaign performance (Google AdSense).</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input type="checkbox" className="sr-only peer" checked={prefs.advertising} onChange={(e) => setPrefs(p => ({ ...p, advertising: e.target.checked }))} />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={rejectNonEssential}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
                >
                  Reject All
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="px-4 py-2 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors shadow-sm"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
