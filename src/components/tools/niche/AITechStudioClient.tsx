'use client';

import { useState, useRef } from 'react';
import { generateTitles } from '@/app/actions/titles';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wand2,
  Copy,
  CheckCircle2,
  Loader2,
  RotateCcw,
  Smartphone,
  Sun,
  Moon,
  Upload,
  Sparkles,
  Eye,
  Check,
  Cpu,
  Terminal,
  Layers,
  Zap,
  X,
} from 'lucide-react';
import ErrorBanner from '@/components/ErrorBanner';

const TECH_MODES = [
  { id: 'agents', label: '🤖 Autonomous AI Agents', prompt: 'I Built an Autonomous AI Agent in 10 Minutes (No Code)', overlay: 'AUTONOMOUS AI' },
  { id: 'benchmark', label: '🥊 Model Benchmark Gauntlet', prompt: 'Cursor AI vs Windsurf vs Claude 3.7: The Brutal Benchmark', overlay: 'CLAUDE VS CURSOR' },
  { id: 'solodev', label: '💻 10-Minute Code Build', prompt: 'How 1 Solo Developer Built a $20k/mo App in 48 Hours with AI', overlay: 'BUILT IN 48H' },
  { id: 'freetools', label: '🛠️ Top 7 Free AI Tools 2026', prompt: 'The 7 Free AI Tools You Should Actually Be Using in 2026', overlay: 'TOP 7 FREE' },
];

export default function AITechStudioClient() {
  const [topic, setTopic] = useState('I Built an Autonomous AI Agent in 10 Minutes (No Code)');
  const [activeMode, setActiveMode] = useState('agents');
  const [isGenerating, setIsGenerating] = useState(false);
  const [titles, setTitles] = useState<string[]>([
    'I Built an Autonomous AI Agent in 10 Minutes (No Code)',
    'Cursor AI vs Windsurf: The Brutal Coding Benchmark Test',
    'How 1 Developer Built a $20k/mo App Using AI in 48 Hours',
    'The 7 Free AI Tools You Should Actually Be Using in 2026',
    'Why Agentic AI Changes Software Engineering Forever in 2026',
  ]);
  const [selectedTitle, setSelectedTitle] = useState(titles[0] || '');
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<string | null>(null);
  const [feedTheme, setFeedTheme] = useState<'dark' | 'light'>('dark');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGenerate = async (isRegenerate = false) => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    setError(null);
    const excludeTitles = isRegenerate ? titles : [];

    const result = await generateTitles(topic, excludeTitles, 'ai-and-tech');
    if (result.success && result.titles) {
      setTitles(result.titles);
      setSelectedTitle(result.titles[0] || '');
    } else {
      setError(result.error || 'Failed to generate AI & tech titles');
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setUploadedImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const currentOverlay = TECH_MODES.find((m) => m.id === activeMode)?.overlay || 'AUTONOMOUS AI';
  const charLength = selectedTitle.length;
  const isMobileSafe = charLength >= 45 && charLength <= 65;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-10">
      {/* 1. Tech Cockpit & Form */}
      <section className="glass-card rounded-3xl p-6 md:p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-950/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-cyan-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleGenerate(false);
          }}
          className="space-y-5 relative z-10"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <label htmlFor="tech-topic" className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              Enter AI Tool, Model, or Coding Concept:
            </label>
            <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
              ⚡ High-Velocity AI Architecture
            </span>
          </div>

          <div className="relative">
            <input
              id="tech-topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. DeepSeek R1 vs Claude 3.7 coding benchmark test..."
              className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-cyan-500/30 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-base md:text-lg transition-all shadow-inner"
              maxLength={250}
            />
          </div>

          {/* AI Mode Selector Pills */}
          <div className="space-y-2">
            <span className="text-xs text-slate-400 font-mono uppercase tracking-wider font-semibold block">
              Trending Tech Archetypes:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {TECH_MODES.map((mode) => {
                const isActive = activeMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => {
                      setActiveMode(mode.id);
                      setTopic(mode.prompt);
                    }}
                    className={`px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all border cursor-pointer ${
                      isActive
                        ? 'bg-cyan-500/15 border-cyan-500 text-cyan-300 ring-1 ring-cyan-500/40 shadow-sm font-bold'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    {mode.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generate Button */}
          <button
            type="submit"
            disabled={!topic.trim() || isGenerating}
            className="w-full py-4 rounded-2xl font-extrabold text-base md:text-lg text-white bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99] disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Compiling High-Density Tech Titles...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                Generate AI &amp; Tech Titles ⚡
              </>
            )}
          </button>
        </form>
      </section>

      {/* Error Banner */}
      <ErrorBanner error={error} onClear={() => setError(null)} onRetry={() => handleGenerate(false)} />

      {/* 2. LIVE DEVELOPER YOUTUBE FEED SIMULATOR */}
      <section className="glass-card rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 mb-2 uppercase font-mono">
              <Smartphone className="w-3.5 h-3.5" /> Live Developer YouTube Feed Simulator
            </div>
            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
              Real-Time Mobile Search &amp; Suggested Preview
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Click any generated title below to preview it live in the simulated mobile feed.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 cursor-pointer shadow-sm"
            >
              <Upload className="w-3.5 h-3.5" />
              {uploadedImage ? 'Change Image' : 'Upload Thumbnail'}
            </button>

            {uploadedImage && (
              <button
                type="button"
                onClick={() => setUploadedImage(null)}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-500 dark:text-red-400 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" /> Remove Image
              </button>
            )}

            <div className="inline-flex rounded-xl p-1 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shadow-inner">
              <button
                type="button"
                onClick={() => setFeedTheme('light')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  feedTheme === 'light' ? 'bg-white text-slate-900 shadow-md font-extrabold' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <Sun className="w-3.5 h-3.5 text-amber-500 inline mr-1" /> Light
              </button>
              <button
                type="button"
                onClick={() => setFeedTheme('dark')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  feedTheme === 'dark' ? 'bg-slate-950 text-white shadow-md font-extrabold' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <Moon className="w-3.5 h-3.5 text-indigo-400 inline mr-1" /> Dark
              </button>
            </div>
          </div>
        </div>

        {/* Simulated Phone Chassis */}
        <div
          className={`max-w-md mx-auto rounded-[2.5rem] p-4 md:p-5 border-4 shadow-2xl transition-all duration-300 ${
            feedTheme === 'dark'
              ? 'bg-[#0f0f0f] border-slate-800 text-white shadow-cyan-950/20'
              : 'bg-[#f4f5f8] border-slate-300 text-slate-900 shadow-slate-400/30'
          }`}
        >
          {/* Phone Top Header */}
          <div className={`flex items-center justify-between text-[11px] font-mono mb-3 px-2 font-black ${feedTheme === 'dark' ? 'text-slate-400' : 'text-slate-800'}`}>
            <span>9:41</span>
            <div className={`w-16 h-3 rounded-full mx-auto ${feedTheme === 'dark' ? 'bg-slate-700/60' : 'bg-slate-300'}`} />
            <span>5G 🔋</span>
          </div>

          {/* YouTube Video Card */}
          <div className={`rounded-2xl overflow-hidden border transition-all duration-200 ${feedTheme === 'dark' ? 'bg-[#181818] border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-md'}`}>
            {/* 16:9 Tech Terminal Thumbnail */}
            <div className="relative aspect-video w-full bg-slate-800 overflow-hidden flex items-center justify-center group">
              {uploadedImage ? (
                <div className="relative w-full h-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={uploadedImage} alt="Tech Thumbnail" className="w-full h-full object-cover" />
                  
                  {/* Floating Remove Button On Image */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setUploadedImage(null);
                    }}
                    className="absolute top-2 right-2 z-20 p-1.5 rounded-full bg-black/80 hover:bg-red-600 text-white transition-colors cursor-pointer shadow-lg"
                    title="Remove Image"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-center p-3">
                    <h4 className="text-base md:text-xl font-black text-white tracking-wider drop-shadow-xl font-display uppercase px-3 py-1 rounded-lg bg-black/60 border border-cyan-500/40">
                      {currentOverlay}
                    </h4>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-cyan-950 via-slate-900 to-indigo-950 flex flex-col items-center justify-center p-4 text-center">
                  <span className="text-[10px] text-cyan-400/80 font-mono uppercase tracking-widest mb-1 font-bold">
                    Terminal Preview
                  </span>
                  <h4 className="text-2xl md:text-3xl font-black text-white tracking-wider drop-shadow-xl font-display uppercase px-4 py-2 rounded-xl bg-black/60 border border-cyan-500/40 shadow-lg">
                    {currentOverlay}
                  </h4>
                </div>
              )}
              <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-black/85 text-white">
                10:24
              </span>
            </div>

            {/* Video Meta */}
            <div className="p-3.5 flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-md">
                DEV
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-bold leading-snug line-clamp-2 ${feedTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {selectedTitle}
                </p>
                <p className={`text-xs mt-1 font-medium ${feedTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  AI Engineering Lab • 189K views • 1 day ago
                </p>
              </div>
            </div>
          </div>

          {/* High-Contrast Length & Retention Meter */}
          <div className={`mt-4 pt-3 border-t flex items-center justify-between text-xs font-mono ${feedTheme === 'dark' ? 'border-slate-800 text-slate-300' : 'border-slate-300 text-slate-900 font-bold'}`}>
            <span>
              Length:{' '}
              <span className={`px-1.5 py-0.5 rounded font-black ${feedTheme === 'dark' ? 'text-cyan-400 bg-slate-900' : 'text-slate-950 bg-slate-200 border border-slate-300'}`}>
                {charLength} / 65
              </span>{' '}
              chars
            </span>
            <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
              isMobileSafe
                ? feedTheme === 'dark'
                  ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30'
                  : 'text-cyan-950 bg-cyan-100 border border-cyan-300'
                : feedTheme === 'dark'
                ? 'text-amber-400 bg-amber-500/10 border border-amber-500/30'
                : 'text-amber-950 bg-amber-100 border border-amber-300'
            }`}>
              {isMobileSafe ? '🟢 Mobile Safe • 85% Retention Score' : '🟡 May Truncate'}
            </span>
          </div>
        </div>
      </section>

      {/* 3. Generated Titles Interactive Deck */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            Generated AI &amp; Tech Titles
          </h3>
          <button
            type="button"
            onClick={() => handleGenerate(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold border border-slate-700 bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Regenerate
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {titles.map((t, idx) => {
            const isSelected = selectedTitle === t;
            return (
              <div
                key={idx}
                onClick={() => setSelectedTitle(t)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                  isSelected
                    ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-950/20 ring-1 ring-cyan-500/40'
                    : 'glass-card border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <p className="font-display text-sm md:text-base font-bold text-slate-900 dark:text-white truncate">
                    {t}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono text-slate-500 hidden sm:inline">
                    {t.length} chars
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyText(t, `title-${idx}`);
                    }}
                    className="p-2 rounded-xl text-cyan-400 hover:bg-cyan-500/20 transition-colors"
                  >
                    {copiedStates[`title-${idx}`] ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
