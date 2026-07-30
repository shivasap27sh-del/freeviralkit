/**
 * Blog-specific loading skeleton.
 * Unlike the root loading.tsx, this contains NO visible text like "Loading…".
 * This is critical for SEO: crawlers that don't wait for streaming would
 * otherwise index the fallback text instead of the actual blog content.
 *
 * With unstable_cache on the data layer, this fallback should rarely appear
 * (pages are prerendered via ISR). It exists as a safety net for cold starts.
 */
export default function BlogLoading() {
  return (
    <main className="container mx-auto px-6 py-12 max-w-6xl relative z-10 min-h-screen">
      {/* Hero skeleton */}
      <section className="text-center mb-16">
        <div className="skeleton-line w-48 h-6 rounded-full mx-auto mb-6" />
        <div className="skeleton-line w-96 h-10 rounded-lg mx-auto mb-6" />
        <div className="skeleton-line w-80 h-5 rounded-lg mx-auto" />
      </section>

      {/* Blog grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="skeleton-line w-24 h-5 rounded-full" />
              <div className="skeleton-line w-16 h-4 rounded" />
            </div>
            <div className="skeleton-line w-full h-6 rounded-lg mb-3" />
            <div className="skeleton-line w-5/6 h-6 rounded-lg mb-3" />
            <div className="space-y-2 mb-4">
              <div className="skeleton-line w-full h-4 rounded" />
              <div className="skeleton-line w-4/5 h-4 rounded" />
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="skeleton-line w-28 h-4 rounded" />
              <div className="skeleton-line w-20 h-4 rounded" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
