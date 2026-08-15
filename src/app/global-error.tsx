'use client';

import { useEffect } from 'react';
import Link from 'next/link';

/**
 * Root-level error boundary for Next.js App Router.
 * This catches errors in the ROOT LAYOUT itself (layout.tsx).
 * It must render its own <html> and <body> since the layout has crashed.
 * Uses inline styles because globals.css / Tailwind may not be available.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[GlobalError] Root layout crashed:', error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          background: 'linear-gradient(135deg, #090d16 0%, #1e1b4b 100%)',
          color: '#f8fafc',
          padding: '1.5rem',
        }}
      >
        <div
          style={{
            maxWidth: '28rem',
            width: '100%',
            textAlign: 'center',
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '1.5rem',
            padding: '3rem 2rem',
          }}
        >
          {/* Error icon */}
          <div
            style={{
              width: '4rem',
              height: '4rem',
              borderRadius: '1rem',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              fontSize: '1.75rem',
            }}
          >
            ⚠️
          </div>

          <h1
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              marginBottom: '0.75rem',
              lineHeight: 1.3,
            }}
          >
            Something went wrong
          </h1>

          <p
            style={{
              color: '#94a3b8',
              fontSize: '0.875rem',
              lineHeight: 1.6,
              marginBottom: '2rem',
            }}
          >
            FreeViralKit encountered a critical error. Please try refreshing the page.
          </p>

          {/* Retry button */}
          <button
            onClick={reset}
            style={{
              background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 2rem',
              borderRadius: '0.75rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              marginRight: '0.75rem',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Try Again
          </button>

          {/* Home link */}
          <Link
            href="/"
            style={{
              color: '#94a3b8',
              fontSize: '0.875rem',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            }}
          >
            Go to Homepage
          </Link>

          {error.digest && (
            <p
              style={{
                marginTop: '2rem',
                color: '#475569',
                fontSize: '0.75rem',
                fontFamily: 'monospace',
              }}
            >
              Error ID: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
