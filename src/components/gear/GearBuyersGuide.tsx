import { BookOpen } from 'lucide-react';

export function GearBuyersGuide() {
  return (
    <section className="glass-card rounded-2xl p-8 md:p-10 mb-12" aria-labelledby="buyers-guide-heading">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="w-6 h-6 text-purple-500" aria-hidden="true" />
        <h2 id="buyers-guide-heading" className="font-display text-2xl font-bold text-slate-800 dark:text-slate-100">
          How to Choose Your Creator Gear (Buyer&apos;s Guide)
        </h2>
      </div>
      <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
        <p>
          Building a YouTube studio can be overwhelming, but understanding the <strong>hierarchy of production value</strong> will save you thousands of dollars. As experienced creators and technical reviewers, our philosophy is simple: prioritize upgrades that retain viewer attention.
        </p>
        <p>
          <strong className="text-slate-800 dark:text-slate-200">1. Audio is King:</strong> Viewers will watch a 720p video if the audio is excellent, but they will click away from a 4K video if the audio is echoed or distorted. Invest in a good dynamic or condenser microphone before buying a new camera lens.
        </p>
        <p>
          <strong className="text-slate-800 dark:text-slate-200">2. Lighting Beats Sensors:</strong> A $1,000 camera in bad lighting looks worse than a $300 camera in great lighting. Proper three-point lighting (Key, Fill, and Backlight) creates depth, separates you from the background, and lowers image noise.
        </p>
        <p>
          <strong className="text-slate-800 dark:text-slate-200">3. Avoid the &quot;Resolution Trap&quot;:</strong> While 4K is nice for cropping in post-production, 1080p is still the standard for consumption. Instead of chasing resolution, focus on cameras with reliable continuous autofocus (like Sony&apos;s Real-Time Eye AF) so you never ruin a take by being out of focus.
        </p>
      </div>
    </section>
  );
}
