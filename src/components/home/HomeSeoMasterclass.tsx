import Image from 'next/image';
import { Rocket, Target, Users, Zap, BookOpen } from 'lucide-react';

export function HomeSeoMasterclass() {
  return (
    <div className="space-y-16">
      {/* Why FreeViralKit Section */}
      <section aria-labelledby="why-choose-heading">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-300 mb-2">
            <Rocket className="w-3.5 h-3.5" />
            <span>Built for Creators</span>
          </div>
          <h2
            id="why-choose-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight"
          >
            Why Choose <span className="gradient-text">FreeViralKit</span>?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-2xl mx-auto">
            Everything you need to beat the YouTube algorithm without paying for overpriced monthly subscriptions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="glass-card rounded-3xl p-6 md:p-7 border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                <Rocket className="w-4 h-4" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Grow Faster with AI-Powered SEO
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              YouTube is the second largest search engine in the world. To get discovered, your videos need
              optimized metadata — the right title, description, tags, and hashtags. FreeViralKit uses multi-tier AI to
              analyze what works on YouTube right now and generates SEO-optimized content tailored to your niche.
            </p>
          </div>

          <div className="glass-card rounded-3xl p-6 md:p-7 border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-2xl bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20">
                <Target className="w-4 h-4" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Complete SEO Package in One Click
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              Most YouTube SEO tools only generate titles or tags in isolation. FreeViralKit gives you everything in a single workflow
              — 10 clickable titles, a keyword-rich description, trending hashtags, SEO tags under 500 characters, and
              a pinned comment to boost initial comment velocity.
            </p>
          </div>

          <div className="glass-card rounded-3xl p-6 md:p-7 border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Tailored for Every Creator Niche
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              Whether you are a beginner uploading your first video or a seasoned creator with thousands of subscribers,
              FreeViralKit adapts to your needs across gaming, tech, faceless channels, tutorials, vlogs, fitness, and finance.
            </p>
          </div>

          <div className="glass-card rounded-3xl p-6 md:p-7 border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                100% Free Forever, Zero Paywalls
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              No signup required. No credit card. No usage limits. FreeViralKit is completely free to use and always will
              be. We believe every creator deserves professional-grade YouTube SEO tools without paying expensive monthly fees.
            </p>
          </div>
        </div>
      </section>

      {/* Ultimate SEO Masterclass Section */}
      <section
        aria-labelledby="masterclass-heading"
        className="glass-card rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 shadow-2xl space-y-8"
      >
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-300">
            <BookOpen className="w-3.5 h-3.5" />
            <span>SEO Masterclass</span>
          </div>
          <h2
            id="masterclass-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight"
          >
            The Ultimate Guide to <span className="gradient-text">YouTube SEO in 2026</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
            Uploading videos without metadata optimization buries your content. Here is how the modern neural algorithm discovers, indexes, and promotes videos to viewers.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-white mb-2">
              1. How the YouTube Algorithm Actually Works
            </h3>
            <p>
              Historically, YouTube relied heavily on tags and keyword stuffing. Today, the algorithm operates on a deep neural network designed to achieve one primary goal: <strong>maximize user satisfaction and session watch time</strong>. When you publish a video, your metadata (Title, Description, and Tags) provides the initial context signals for YouTube to run a test audience cohort.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-4">
            <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/40">
              <span className="font-bold text-purple-700 dark:text-purple-300 text-sm block mb-1">
                🎯 Click-Through Rate (CTR)
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-400">
                Out of all users who saw your thumbnail and title on their feed, what percentage clicked through?
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800/40">
              <span className="font-bold text-indigo-700 dark:text-indigo-300 text-sm block mb-1">
                ⏱️ Average View Duration (AVD)
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-400">
                Once viewers clicked, did your hook hold their attention through the first 30 seconds and beyond?
              </span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl my-6">
            <Image
              src="/images/seo_dashboard.webp"
              alt="YouTube Growth Analytics Dashboard"
              width={1200}
              height={630}
              className="w-full h-auto object-cover"
            />
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-white mb-2">
              2. The Holy Trinity: Title, Thumbnail &amp; Hook
            </h3>
            <p>
              To trigger exponential suggested views, your video packaging must synchronize across three core elements:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>The Title (Search + Psychology):</strong> Includes ranking keywords front-loaded in the first 50 characters, paired with curiosity triggers.</li>
              <li><strong>The Thumbnail (Visual Contrast):</strong> Complements the title rather than repeating it word-for-word.</li>
              <li><strong>The Retention Hook (First 30 Seconds):</strong> Immediately validates the title promise without slow intros or filler talk.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
