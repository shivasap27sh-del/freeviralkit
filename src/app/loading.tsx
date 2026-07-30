/**
 * Global loading skeleton for Next.js App Router.
 * Displayed automatically during route transitions (client-side navigation).
 * Uses the existing shimmer animation from globals.css for consistency.
 */
export default function Loading() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full">
        {/* Animated loading indicator */}
        <div className="flex items-center justify-center gap-3 mb-10">
        <div className="flex gap-1.5" role="status" aria-label="Loading">
        </div>

        {/* Content skeleton */}
        <div className="glass-card rounded-3xl p-8 space-y-5">
          {/* Title skeleton */}
          <div className="skeleton-line w-3/4 h-8 rounded-lg" />

          {/* Subtitle skeleton */}
          <div className="skeleton-line w-1/2 h-5 rounded-lg" />

          {/* Content block skeletons */}
          <div className="space-y-3 pt-4">
            <div className="skeleton-line w-full" />
            <div className="skeleton-line w-full" />
            <div className="skeleton-line w-5/6" />
          </div>
        </div>
      </div>
    </main>
  );
}
