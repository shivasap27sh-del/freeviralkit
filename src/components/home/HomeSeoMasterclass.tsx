import Image from 'next/image';

export function HomeSeoMasterclass() {
  return (
    <>
      {/* Why FreeViralKit Section */}
      <section className="mt-20 mb-12">
        <div
          aria-hidden="true"
          className="font-display text-2xl md:text-3xl font-extrabold text-center mb-3 text-slate-900 dark:text-white"
        >
          Why Choose <span className="text-gradient">FreeViralKit</span>?
        </div>
        <h2 className="sr-only">Why Choose FreeViralKit?</h2>
        <p className="text-slate-500 text-center mb-10 max-w-2xl mx-auto">
          Built for YouTubers who don&apos;t want to pay for expensive SEO tools.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-2">
              🚀 Grow Faster with AI-Powered SEO
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              YouTube is the second largest search engine in the world. To get discovered, your videos need
              optimized metadata — the right title, description, tags, and hashtags. FreeViralKit uses advanced AI to
              analyze what works on YouTube right now and generates SEO-optimized content tailored to your video topic.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-2">
              🎯 Complete SEO Package in One Click
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Most YouTube SEO tools only generate titles or tags. FreeViralKit gives you everything in a single workflow
              — 10 clickable titles, a keyword-rich description, trending hashtags, SEO tags under 500 characters, and
              a pinned comment to boost engagement.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-2">
              💡 Built for Every Creator
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Whether you are a beginner uploading your first video or a seasoned creator with thousands of subscribers,
              FreeViralKit adapts to your needs across gaming, tech, cooking, vlogs, education, fitness, and more.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-2">
              ⚡ 100% Free, No Limits
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              No signup required. No credit card. No usage limits. FreeViralKit is completely free to use and always will
              be. We believe every creator deserves professional-grade YouTube SEO tools.
            </p>
          </div>
        </div>
      </section>

      {/* Ultimate SEO Masterclass Section */}
      <section className="mt-20 mb-12">
        <div
          aria-hidden="true"
          className="font-display text-3xl md:text-4xl font-extrabold text-center mb-10 text-slate-900 dark:text-white"
        >
          The Ultimate Guide to <span className="text-gradient">YouTube SEO in 2026</span>
        </div>
        <h2 className="sr-only">The Ultimate Guide to YouTube SEO in 2026</h2>

        <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto space-y-8 text-slate-600 dark:text-slate-400">
          <p>
            If you are uploading videos to YouTube without optimizing your metadata, you are essentially burying your
            own content. YouTube is the second largest search engine in the world. To succeed, you must understand how
            the algorithm discovers, categorizes, and serves content to viewers.
          </p>

          <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-4">
            How the YouTube Algorithm Actually Works
          </h3>
          <p>
            Historically, YouTube relied heavily on tags and keyword stuffing. Today, the algorithm operates on a neural
            network designed to maximize user satisfaction and session time by analyzing two key metrics:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Click-Through Rate (CTR):</strong> Out of the people who saw your thumbnail and title, how many
              clicked?
            </li>
            <li>
              <strong>Average View Duration (AVD):</strong> Once they clicked, how long did they stay watching?
            </li>
          </ul>

          <div className="my-10 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl">
            <Image
              src="/images/seo_dashboard.webp"
              alt="YouTube Growth Analytics Dashboard"
              width={1200}
              height={630}
              className="w-full h-auto object-cover"
            />
          </div>

          <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-4">
            The &quot;Holy Trinity&quot; of Video Discovery
          </h3>
          <p>
            To trigger exponential growth, you need to master the Holy Trinity: your <strong>Title</strong> (Search +
            Psychology), your <strong>Thumbnail</strong> (Visual Disruption), and your <strong>Hook</strong> (Retention
            Optimization).
          </p>
        </div>
      </section>
    </>
  );
}
