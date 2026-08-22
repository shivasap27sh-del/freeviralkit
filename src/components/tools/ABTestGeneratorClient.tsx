'use client';

import { useState, useRef } from 'react';
import { generateABTestPack, type ABTestVariant } from '@/app/actions/abTest';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wand2,
  Copy,
  CheckCircle2,
  Loader2,
  Sparkles,
  RotateCcw,
  Smartphone,
  Sun,
  Moon,
  Upload,
  Layers,
  Flame,
  GraduationCap,
  Zap,
  HelpCircle,
  Eye,
  Check,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import ErrorBanner from '@/components/ErrorBanner';

const QUICK_TOPICS = [
  { label: '🔥 Viral Tech Review', topic: 'M4 MacBook Pro vs M3 Max: Real World Truth' },
  { label: '🎮 Gaming Challenge', topic: 'I Survived 100 Days in Hardcore Minecraft (No Armor)' },
  { label: '💼 Faceless Business', topic: 'How Rolex Tricked the World into Buying Status' },
  { label: '📈 YouTube Growth', topic: 'How to Get Your First 1,000 Subscribers Fast in 2026' },
  { label: '🎧 ASMR Sleep', topic: 'ASMR 1 Hour of Rain and Whispers for Insomnia Relief' },
];

const VARIANT_CONFIGS = {
  A: {
    badge: 'Variant A • Curiosity Gap',
    color: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-400',
    bgGradient: 'from-indigo-900/60 via-slate-900 to-purple-950/40',
    accentBorder: 'border-indigo-500/30',
    pill: 'bg-indigo-500',
  },
  B: {
    badge: 'Variant B • Contrarian & Shock',
    color: 'border-rose-500/40 bg-rose-500/10 text-rose-400',
    bgGradient: 'from-rose-900/60 via-slate-900 to-amber-950/40',
    accentBorder: 'border-rose-500/30',
    pill: 'bg-rose-500',
  },
  C: {
    badge: 'Variant C • Proof & Numbers',
    color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
    bgGradient: 'from-emerald-900/60 via-slate-900 to-cyan-950/40',
    accentBorder: 'border-emerald-500/30',
    pill: 'bg-emerald-500',
  },
};

export default function ABTestGeneratorClient() {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [variants, setVariants] = useState<ABTestVariant[]>([]);
  const [activeVariantId, setActiveVariantId] = useState<'A' | 'B' | 'C'>('A');
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<string | null>(null);
  const [feedTheme, setFeedTheme] = useState<'dark' | 'light'>('dark');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGenerate = async (isRegenerate = false) => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    setError(null);
    const excludeTitles = isRegenerate ? variants.map((v) => v.title) : [];
    
    const result = await generateABTestPack(topic, excludeTitles);
    if (result.success && result.variants) {
      setVariants(result.variants);
      setActiveVariantId('A');
    } else {
      setError(result.error || 'Failed to generate A/B test pack');
    }
    setIsGenerating(false);
  };

  const copyText = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates((prev) => ({ ...prev, [key]: true }));
      setTimeout(() => setCopiedStates((prev) => ({ ...prev, [key]: false })), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const copyFullStudioPack = () => {
    if (variants.length === 0) return;
    const text = `=== YOUTUBE STUDIO 3-WAY A/B TEST PACK ===
Topic: ${topic}

[VARIANT A - CURIOSITY GAP]
Title: ${variants[0]?.title}
Thumbnail Text: ${variants[0]?.thumbnailText}
Visual Scene: ${variants[0]?.visualConcept}

[VARIANT B - CONTRARIAN / SHOCK]
Title: ${variants[1]?.title}
Thumbnail Text: ${variants[1]?.thumbnailText}
Visual Scene: ${variants[1]?.visualConcept}

[VARIANT C - METRIC PROOF & TRANSFORMATION]
Title: ${variants[2]?.title}
Thumbnail Text: ${variants[2]?.thumbnailText}
Visual Scene: ${variants[2]?.visualConcept}

Generated with FreeViralKit.com (100% Free YouTube SEO)`;
    copyText(text, 'full-pack');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const activeVariant = variants.find((v) => v.id === activeVariantId) || variants[0];
  const charLength = activeVariant ? activeVariant.title.length : 0;
  const isMobileSafe = charLength >= 45 && charLength <= 65;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-10">
      {/* Search and Input Form */}
      <section className="glass-card rounded-3xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-500/10 via-pink-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleGenerate(false);
          }}
          className="space-y-4 relative z-10"
        >
          <div className="flex items-center justify-between">
            <label htmlFor="ab-topic" className="block text-sm font-semibold text-slate-800 dark:text-slate-200">
              Enter Your Video Topic, Concept, or Draft Title:
            </label>
            <span className="text-xs text-purple-600 dark:text-purple-400 font-mono font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> 3-Way YouTube Studio Test &amp; Compare Format
            </span>
          </div>

          <div className="relative">
            <input
              id="ab-topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. How to get more views on YouTube Shorts in 2026..."
              className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-base md:text-lg transition-all shadow-inner"
              maxLength={250}
            />
          </div>

          {/* Quick Tone & Topic Selectors */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-slate-500 font-medium">Quick Ideas:</span>
            {QUICK_TOPICS.map((t, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setTopic(t.topic)}
                className="text-xs px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-300 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!topic.trim() || isGenerating}
            className="w-full btn-primary rounded-2xl py-4 font-bold text-base md:text-lg flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-500/25 active:scale-[0.99] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Engineering 3-Way A/B Packaging Pack...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                Generate 3-Way A/B Test Pack ⚡
              </>
            )}
          </button>
        </form>
      </section>

      {/* Error & Feedback HUD */}
      <ErrorBanner
        error={error}
        onClear={() => setError(null)}
        onRetry={() => handleGenerate(false)}
      />

      {/* Generated 3-Way Deck and Simulator */}
      <AnimatePresence>
        {variants.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="space-y-10"
          >
            {/* Header & 1-Click Studio Exporter */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/40 p-5 rounded-2xl border border-slate-800">
              <div>
                <h2 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-6 h-6 text-purple-400" />
                  Your 3-Way YouTube Studio A/B Test Pack
                </h2>
                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Three mathematically distinct angles ready to upload into YouTube Studio&apos;s &ldquo;Test &amp; Compare&rdquo; modal.
                </p>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={copyFullStudioPack}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-600/25 cursor-pointer transition-all active:scale-95"
                >
                  {copiedStates['full-pack'] ? <CheckCircle2 className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  {copiedStates['full-pack'] ? 'Copied Full A/B Pack!' : '1-Click Copy All to Studio'}
                </button>

                <button
                  onClick={() => handleGenerate(true)}
                  className="p-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Regenerate all 3 variants"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 3-Variant Selector Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {variants.map((v) => {
                const config = VARIANT_CONFIGS[v.id] || VARIANT_CONFIGS.A;
                const isSelected = activeVariantId === v.id;

                return (
                  <div
                    key={v.id}
                    onClick={() => setActiveVariantId(v.id)}
                    className={`relative rounded-2xl p-5 border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? `border-purple-500 bg-purple-500/10 shadow-xl shadow-purple-500/10 ring-2 ring-purple-500/40`
                        : `glass-card border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700`
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-[11px] font-mono uppercase font-bold px-2.5 py-1 rounded-full border ${config.color}`}>
                          {config.badge}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] uppercase font-bold text-purple-400 flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" /> Previewing
                          </span>
                        )}
                      </div>

                      <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                        {v.title}
                      </h3>

                      <div className="mt-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                        <span className="text-[10px] text-slate-400 font-mono uppercase block mb-1">Thumbnail Text Overlay:</span>
                        <span className="text-xs font-mono font-extrabold text-amber-400 tracking-wider">
                          &ldquo;{v.thumbnailText}&rdquo;
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-500">
                        {v.title.length} chars
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyText(v.title, `variant-${v.id}`);
                        }}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        {copiedStates[`variant-${v.id}`] ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedStates[`variant-${v.id}`] ? 'Copied' : 'Copy Title'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* LIVE YOUTUBE MOBILE FEED SIMULATOR */}
            <section className="glass-card rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl relative">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-pink-400 bg-pink-500/10 border border-pink-500/20 mb-2 uppercase font-mono">
                    <Smartphone className="w-3.5 h-3.5" /> Live YouTube Mobile App Feed Simulator
                  </div>
                  <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                    Simulated YouTube Search &amp; Suggested Preview
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Test how Variant {activeVariant?.id} appears to real mobile users before publishing.
                  </p>
                </div>

                {/* Feed Controls: Dark/Light Mode + Upload Thumbnail */}
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    {uploadedImage ? 'Change Image' : 'Upload Thumbnail'}
                  </button>

                  <button
                    onClick={() => setFeedTheme((p) => (p === 'dark' ? 'light' : 'dark'))}
                    className="p-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                    title="Toggle Feed Theme"
                  >
                    {feedTheme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
                  </button>
                </div>
              </div>

              {/* SIMULATED MOBILE PHONE CARD */}
              <div className="max-w-md mx-auto rounded-3xl p-4 md:p-5 border border-slate-700 shadow-2xl transition-colors bg-slate-950 text-white">
                {/* Phone Top Status Header */}
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-3 px-1">
                  <span>9:41</span>
                  <div className="flex items-center gap-1.5">
                    <span>5G</span>
                    <div className="w-4 h-2 rounded-sm border border-slate-400 bg-slate-300" />
                  </div>
                </div>

                {/* Video Card Container inside simulated feed */}
                <div
                  className={`rounded-2xl overflow-hidden border transition-colors ${
                    feedTheme === 'dark'
                      ? 'bg-slate-900/90 border-slate-800 text-white'
                      : 'bg-white border-slate-200 text-slate-900 shadow-md'
                  }`}
                >
                  {/* 16:9 Thumbnail Box */}
                  <div className="relative aspect-video w-full bg-slate-800 overflow-hidden flex items-center justify-center group">
                    {uploadedImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={uploadedImage}
                        alt="Uploaded Thumbnail Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className={`w-full h-full bg-gradient-to-tr ${
                          activeVariantId === 'A'
                            ? 'from-indigo-950 via-purple-900 to-slate-900'
                            : activeVariantId === 'B'
                            ? 'from-rose-950 via-red-900 to-slate-900'
                            : 'from-emerald-950 via-teal-900 to-slate-900'
                        } flex flex-col items-center justify-center p-4 text-center`}
                      >
                        <span className="text-[10px] text-white/60 font-mono uppercase tracking-widest mb-1">
                          Generated Mockup
                        </span>
                        <h4 className="text-xl md:text-2xl font-extrabold text-white tracking-wider drop-shadow-md font-display uppercase px-2 py-1 rounded bg-black/40 border border-white/20">
                          {activeVariant?.thumbnailText || 'WATCH THIS'}
                        </h4>
                      </div>
                    )}

                    {/* Duration Badge */}
                    <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-black/80 text-white backdrop-blur-sm">
                      12:48
                    </span>
                  </div>

                  {/* Video Metadata in Feed */}
                  <div className="p-3.5 flex items-start gap-3">
                    {/* Simulated Creator Avatar */}
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-md">
                      FK
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Title with Character Length Inspection */}
                      <p className={`text-sm font-semibold leading-snug line-clamp-2 ${feedTheme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
                        {activeVariant?.title}
                      </p>

                      {/* Channel Name & Stats */}
                      <p className={`text-xs mt-1 ${feedTheme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                        FreeViralKit Creator • 248K views • 2 days ago
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mobile Truncation & Health Gauge */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">
                    Length: <span className="text-white font-bold">{charLength} / 65</span> chars
                  </span>
                  <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${isMobileSafe ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-amber-400 bg-amber-500/10 border border-amber-500/20'}`}>
                    {isMobileSafe ? '🟢 100% Mobile Feed Safe' : '🟡 May Truncate on Small Screens'}
                  </span>
                </div>
              </div>

              {/* Visual Scene Concept Prompt */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold block mb-1">
                  🎬 AI Visual Scene Prompt for Variant {activeVariant?.id}:
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {activeVariant?.visualConcept}
                </p>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
