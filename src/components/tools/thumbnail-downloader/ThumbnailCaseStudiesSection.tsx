import { Palette, Layers, Eye, ShieldAlert, Sparkles } from 'lucide-react';

export function ThumbnailCaseStudiesSection() {
  return (
    <section aria-labelledby="deep-guide-heading" className="glass-card rounded-3xl p-8 md:p-12 border border-blue-500/20 bg-slate-900/90 shadow-2xl space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/10 border border-blue-500/30 text-cyan-400">
          <Palette className="w-3.5 h-3.5" />
          <span>Packaging Psychology &amp; Color Theory</span>
        </div>
        <h2
          id="deep-guide-heading"
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight"
        >
          The Science of <span className="gradient-text">10M+ View Thumbnails</span>
        </h2>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          YouTube&apos;s recommendation engine tracks click-through rate (CTR) and initial 30-second hold. Your thumbnail is the single most important lever in the discovery equation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
        <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
            <Palette className="w-4 h-4" /> 1. Background Contrast &amp; Color Theory
          </div>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            YouTube&apos;s interface is predominantly pure black (#0F0F0F) in dark mode or pure white in light mode. Thumbnails with saturated warm colors (<strong>Sunflower Yellow, Electric Tangerine, Vivid Emerald</strong>) pop with 300% higher visual salience than muted dark-blue backgrounds that blend into the feed.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
            <ShieldAlert className="w-4 h-4 text-amber-400" /> 2. The 160×50px Timestamp Dead Zone
          </div>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            YouTube overlays the video duration timestamp (e.g. <code>12:45</code>) over the <strong>bottom-right corner</strong> across all mobile and desktop layouts. Never place logos, text, or focal faces in the lower-right 15% of your canvas to avoid obscured visual cues.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
            <Layers className="w-4 h-4" /> 3. Title-Thumbnail Complementarity
          </div>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Amateur creators put their video title directly on the thumbnail. Pro creators use the <strong>question &amp; consequence loop</strong>: if your title is <em>&quot;I Spent 100 Days in Hardcore Minecraft&quot;</em>, your thumbnail text should be <em>&quot;Day 99 Disaster...&quot;</em> to open an irresistible curiosity gap.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
            <Eye className="w-4 h-4" /> 4. Facial Expression &amp; Eye Gaze Direction
          </div>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Eye tracking studies reveal that viewers look first at human eyes in a thumbnail, then follow where those eyes are looking. Directing your gaze toward your focal object guides the viewer&apos;s attention naturally to your value proposition.
          </p>
        </div>
      </div>
    </section>
  );
}
