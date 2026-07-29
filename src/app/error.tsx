'use client';

import { useEffect } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';

/**
 * Route-level error boundary for Next.js App Router.
 * Catches unhandled errors in any page/layout and displays
 * a branded recovery UI instead of the default Next.js error page.
 * This protects AdSense approval by never showing a raw crash screen.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error for debugging (visible in Vercel logs)
    console.error('[ErrorBoundary] Caught unhandled error:', error);
  }, [error]);

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="glass-card rounded-3xl p-8 sm:p-12 max-w-lg w-full text-center">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>

        {/* Heading */}
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
          Something went wrong
        </h1>

        {/* Description */}
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
          An unexpected error occurred while loading this page. This has been logged automatically. Please try again or return to the homepage.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
        </div>

        {/* Error digest for debugging (non-sensitive) */}
        {error.digest && (
          <p className="mt-8 text-xs text-slate-400 font-mono">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </main>
  );
}
