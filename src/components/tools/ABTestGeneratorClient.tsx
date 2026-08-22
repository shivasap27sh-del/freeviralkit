'use client';

import { useState, useRef } from 'react';
import { generateABTestPack } from '@/app/actions/abTest';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Copy, CheckCircle2, RotateCcw } from 'lucide-react';
import ErrorBanner from '@/components/ErrorBanner';
import { type ABTestVariant } from './ab-test/types';
import ABTestForm from './ab-test/ABTestForm';
import ABTestVariantCards from './ab-test/ABTestVariantCards';
import MobileFeedSimulator from './ab-test/MobileFeedSimulator';

export default function ABTestGeneratorClient() {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [variants, setVariants] = useState<ABTestVariant[]>([]);
  const [activeVariantId, setActiveVariantId] = useState<'A' | 'B' | 'C'>('A');
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<string | null>(null);
  const [feedTheme, setFeedTheme] = useState<'dark' | 'light'>('dark');
  const [variantImages, setVariantImages] = useState<{ A?: string; B?: string; C?: string }>({});
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
        const dataUrl = event.target?.result as string;
        setVariantImages((prev) => ({ ...prev, [activeVariantId]: dataUrl }));
      };
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImageForVariant = (variantId: 'A' | 'B' | 'C') => {
    setVariantImages((prev) => {
      const next = { ...prev };
      delete next[variantId];
      return next;
    });
  };

  const activeVariant = variants.find((v) => v.id === activeVariantId) || variants[0];
  const activeImage = variantImages[activeVariantId];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-10">
      {/* 1. Search and Input Form */}
      <ABTestForm
        topic={topic}
        setTopic={setTopic}
        isGenerating={isGenerating}
        onGenerate={handleGenerate}
      />

      {/* 2. Error & System Status HUD */}
      <ErrorBanner
        error={error}
        onClear={() => setError(null)}
        onRetry={() => handleGenerate(false)}
      />

      {/* 3. Generated 3-Way Deck and Simulator */}
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
                  type="button"
                  onClick={copyFullStudioPack}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-600/25 cursor-pointer transition-all active:scale-95"
                >
                  {copiedStates['full-pack'] ? <CheckCircle2 className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  {copiedStates['full-pack'] ? 'Copied Full A/B Pack!' : '1-Click Copy All to Studio'}
                </button>

                <button
                  type="button"
                  onClick={() => handleGenerate(true)}
                  className="p-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Regenerate all 3 variants"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 3-Variant Selector Grid */}
            <ABTestVariantCards
              variants={variants}
              activeVariantId={activeVariantId}
              setActiveVariantId={setActiveVariantId}
              variantImages={variantImages}
              copiedStates={copiedStates}
              onCopyTitle={copyText}
            />

            {/* LIVE YOUTUBE MOBILE FEED SIMULATOR */}
            <MobileFeedSimulator
              activeVariant={activeVariant}
              activeVariantId={activeVariantId}
              activeImage={activeImage}
              topic={topic}
              feedTheme={feedTheme}
              setFeedTheme={setFeedTheme}
              fileInputRef={fileInputRef}
              onImageUpload={handleImageUpload}
              onRemoveImage={removeImageForVariant}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
