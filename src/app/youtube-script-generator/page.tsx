'use client';

import { useState } from 'react';
import { generateScriptOutline } from '../actions/scripts';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Copy, CheckCircle2, Loader2, Sparkles, RotateCcw, Clock, Volume2, Video, ArrowRight, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import ErrorBanner from '@/components/ErrorBanner';

type ScriptOutline = {
  hook: string;
  body: string[];
  cta: string;
  outro: string;
};

export default function ScriptGeneratorPage() {
  const [title, setTitle] = useState('');
  const [tone, setTone] = useState('conversational');
  const [duration, setDuration] = useState('5 minutes');
  const [isGenerating, setIsGenerating] = useState(false);
  const [outline, setOutline] = useState<ScriptOutline | null>(null);
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (val?: string) => {
    const inputVal = val !== undefined ? val : title;
    if (!inputVal.trim()) return;
    setIsGenerating(true);
    setOutline(null);
    setError(null);
    const result = await generateScriptOutline(inputVal, tone, duration);
    if (result.success && result.outline) {
      setOutline(result.outline as ScriptOutline);
    } else {
      setError(result.error || 'Failed to generate script outline');
    }
    setIsGenerating(false);
  };

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(p => ({ ...p, [key]: true }));
      setTimeout(() => setCopiedStates(p => ({ ...p, [key]: false })), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const copyFullOutline = () => {
    if (!outline) return;
    const bodyStr = outline.body.join('\n\n');
    const full = `VIDEO TITLE: ${title}\nTONE: ${tone}\nDURATION: ${duration}\n\n[1. HOOK - FIRST 3S]\n${outline.hook}\n\n[2. BODY TIMELINE OUTLINE]\n${bodyStr}\n\n[3. CALL TO ACTION]\n${outline.cta}\n\n[4. OUTRO LOOP]\n${outline.outro}`;
    copy(full, 'full-outline');
  };

  const renderFormattedText = (text: string) => {
    if (!text) return null;
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index} className="font-bold text-slate-900 dark:text-white">{part}</strong>;
      }
      return part;
    });
  };

  const examples = [
    'How to Edit Videos 10x Faster',
    'iPhone 16 Pro Max First 48 Hours Review',
    '3 Side Hustles Anyone Can Start in 2026',
    'My 10-Minute Morning Productivity Routine',
  ];

  const tones = [
    { value: 'conversational', label: '🗣️ Conversational' },
    { value: 'energetic', label: '⚡ Energetic & Hype' },
    { value: 'professional', label: '💼 Educational/Authority' },
    { value: 'storyteller', label: '📖 Storyteller Narrative' },
    { value: 'casual', label: '☕ Chill & Casual' },
  ];

  const durations = ['1 minute (Shorts)', '3 minutes', '5 minutes', '10 minutes', '15 minutes'];

  return (
    <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
      {/* Hero */}
      <section className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-purple-400 bg-purple-400/10 border border-purple-400/20 mb-6 uppercase tracking-wider">
          <FileText className="w-4 h-4" /> AI Script Outline Writer
        </div>
        <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
          Free YouTube <span className="text-gradient">Video Script Outline Generator</span>
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Generate structured, high-retention script outlines for your videos. Complete with hook lines, B-roll recommendations, and loops.
        </p>
      </section>

      {/* Generator */}
      <div className="glass-card rounded-2xl p-6 md:p-8 mb-8">
        <div className="relative mb-4">
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter your video title or idea (e.g. how to start coding, morning routine, tech unboxing...)"
            className="w-full bg-slate-100 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-lg"
            onKeyDown={e => e.key === 'Enter' && handleGenerate()}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tone of Voice</label>
            <select
              value={tone}
              onChange={e => setTone(e.target.value)}
              className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-purple-500 transition-colors text-sm cursor-pointer"
            >
              {tones.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Target Duration</label>
            <select
              value={duration}
              onChange={e => setDuration(e.target.value)}
              className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-purple-500 transition-colors text-sm cursor-pointer"
            >
              {durations.map(d => (
                <option key={d} value={d}>⏰ {d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Clickable Examples */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs text-slate-500 font-medium">Examples:</span>
          {examples.map(ex => (
            <button
              key={ex}
              onClick={() => {
                setTitle(ex);
                handleGenerate(ex);
              }}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-950 hover:bg-slate-200 transition-all cursor-pointer"
            >
              {ex}
            </button>
          ))}
        </div>

        <button
          onClick={() => handleGenerate()}
          disabled={!title.trim() || isGenerating}
          className="w-full btn-primary rounded-xl py-4 font-semibold text-lg flex items-center justify-center gap-2 cursor-pointer"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Drafting Outline...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" /> Generate Script Outline
            </>
          )}
        </button>
      </div>

      <ErrorBanner error={error} onClear={() => setError(null)} />

      {/* Results */}
      <AnimatePresence>
        {outline && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 mb-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold">Your High-Retention Script Outline</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleGenerate()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-sm text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Re-Draft
                </button>
                <button
                  onClick={copyFullOutline}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-gradient-primary text-slate-900 text-sm font-semibold hover:opacity-90 transition-all shadow-[0_4px_15px_rgba(139,92,246,0.3)] cursor-pointer"
                >
                  {copiedStates['full-outline'] ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  {copiedStates['full-outline'] ? 'Copied Outline!' : 'Copy Full Outline'}
                </button>
              </div>
            </div>

            {/* Timeline Sections */}
            <div className="space-y-6">
              {/* Segment 1: Hook */}
              <div className="glass-card rounded-2xl p-6 relative border-l-4 border-l-purple-500">
                <div className="flex justify-between items-start gap-4 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/20 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> 0:00 - 0:15 | The Visual Hook
                  </span>
                  <button onClick={() => copy(outline.hook, 'hook')} className="text-xs text-slate-400 hover:text-slate-600 font-semibold cursor-pointer">
                    {copiedStates['hook'] ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex gap-3.5">
                  <MessageSquare className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Spoken Script (Hook)</h4>
                    <p className="text-sm font-bold text-slate-800 italic leading-relaxed">&ldquo;{renderFormattedText(outline.hook)}&rdquo;</p>
                  </div>
                </div>
              </div>

              {/* Segment 2: Body Outline Timeline */}
              <div className="glass-card rounded-2xl p-6 border-l-4 border-l-cyan-500">
                <h3 className="font-display font-bold text-slate-800 flex items-center gap-1.5 mb-6">
                  <Video className="w-5 h-5 text-cyan-400" /> Segment-by-Segment Video Storyboard
                </h3>

                <div className="relative pl-6 border-l border-slate-200 dark:border-slate-800 space-y-8">
                  {outline.body.map((item, idx) => (
                    <div key={idx} className="relative">
                      {/* Timeline dot */}
                      <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-cyan-500 border-4 border-white" />
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <h4 className="font-display font-semibold text-slate-800 dark:text-slate-100 text-sm">
                          Section #{idx + 1}
                        </h4>
                        <button onClick={() => copy(item, `body-${idx}`)} className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer">
                          {copiedStates[`body-${idx}`] ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-4 whitespace-pre-wrap">
                        {renderFormattedText(item)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Segment 3: CTA & Outro Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* CTA */}
                <div className="glass-card rounded-2xl p-6 border-l-4 border-l-green-500 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-green-500/15 text-green-400 border border-green-500/20">
                        💬 Mid-Roll CTA Prompts
                      </span>
                      <button onClick={() => copy(outline.cta, 'cta')} className="text-xs text-slate-400 hover:text-slate-600 font-semibold cursor-pointer">
                        {copiedStates['cta'] ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed italic bg-slate-50 border border-slate-100 rounded-xl p-4">
                      &ldquo;{renderFormattedText(outline.cta)}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Outro */}
                <div className="glass-card rounded-2xl p-6 border-l-4 border-l-amber-500 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20">
                        ⚡ Loop Playout / Endscreen Outro
                      </span>
                      <button onClick={() => copy(outline.outro, 'outro')} className="text-xs text-slate-400 hover:text-slate-600 font-semibold cursor-pointer">
                        {copiedStates['outro'] ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed italic bg-slate-50 border border-slate-100 rounded-xl p-4">
                      &ldquo;{renderFormattedText(outline.outro)}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pro Tip */}
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-5 mt-6">
              <h4 className="font-display font-semibold text-purple-400 mb-1 flex items-center gap-1.5">
                💡 Retaining Viewer Attention
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Aim to change B-roll clips, show on-screen text graphics, or change camera angles every **3 to 5 seconds** in the body segment. Front-load your main value proposition right after the hook to maximize retention before the first CTA marker.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>



      {/* SEO Content */}
      <section className="mt-12 space-y-8">
        <h2 className="font-display text-2xl font-bold">How to Write a High-Retention YouTube Video Script</h2>
        <div className="text-slate-600 leading-relaxed space-y-4">
          <p>Writing a video script is different from writing an essay or a blog. YouTube viewers have short attention spans, and the algorithm rewards watch-time. If your pacing drops or your intro takes 45 seconds to get to the point, people will swipe or click away.</p>
          <p>A winning script structure contains a **strong visual hook** (under 15s) stating the value of the video, structured segments with visual B-roll cues to keep the eye active, and a seamless outro loop designed to drive views to your next video.</p>
        </div>
      </section>
    </main>
  );
}
