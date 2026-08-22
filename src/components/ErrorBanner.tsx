'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  RotateCcw,
  ShieldAlert,
  Clock,
  WifiOff,
  ChevronDown,
  ChevronUp,
  X,
  Sparkles,
  CheckCircle2,
  Copy,
  Activity,
} from 'lucide-react';

interface ErrorBannerProps {
  error: string | null;
  onClear?: () => void;
  onRetry?: () => void;
  retryAfter?: number;
}

type ErrorType = 'RATE_LIMIT' | 'SAFETY' | 'NETWORK' | 'PROVIDER_OVERLOAD' | 'GENERIC';

function categorizeError(errMsg: string): { type: ErrorType; title: string; explanation: string; icon: typeof AlertTriangle; badge: string; badgeColor: string } {
  const lower = errMsg.toLowerCase();

  if (lower.includes('rate limit') || lower.includes('too many requests') || lower.includes('429') || lower.includes('wait')) {
    return {
      type: 'RATE_LIMIT',
      title: 'High Demand — Speed Limit Active',
      explanation: 'To keep FreeViralKit 100% free for everyone, we briefly pause requests during traffic spikes. Your spot is reserved.',
      icon: Clock,
      badge: 'Speed Limit',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    };
  }

  if (lower.includes('content safety') || lower.includes('policy') || lower.includes('violat')) {
    return {
      type: 'SAFETY',
      title: 'Content Safety Guidance',
      explanation: 'Your topic triggered an automated platform filter. Please rephrase using creator-friendly, standard YouTube vocabulary.',
      icon: ShieldAlert,
      badge: 'Safety Filter',
      badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    };
  }

  if (lower.includes('network') || lower.includes('timeout') || lower.includes('fetch') || lower.includes('failed to fetch')) {
    return {
      type: 'NETWORK',
      title: 'Connection Hiccup Detected',
      explanation: 'We encountered a momentary network blip connecting to the AI cluster. Our auto-failover is standing by.',
      icon: WifiOff,
      badge: 'Connection Blip',
      badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    };
  }

  if (lower.includes('all ai providers failed') || lower.includes('overload') || lower.includes('quota')) {
    return {
      type: 'PROVIDER_OVERLOAD',
      title: 'AI Cluster High-Traffic Surge',
      explanation: 'Multiple upstream AI providers are experiencing heavy worldwide traffic. Our Multi-AI circuit breaker is cycling to the next available backup.',
      icon: Activity,
      badge: 'Failover Active',
      badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    };
  }

  return {
    type: 'GENERIC',
    title: 'Generation Pause',
    explanation: 'The AI model paused while formatting the response. A single quick retry usually resolves this instantly.',
    icon: AlertTriangle,
    badge: 'System Notice',
    badgeColor: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
  };
}

export default function ErrorBanner({ error, onClear, onRetry, retryAfter = 5 }: ErrorBannerProps) {
  const [showDebug, setShowDebug] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!error) return;
    const lower = error.toLowerCase();
    if (lower.includes('rate limit') || lower.includes('wait')) {
      const match = error.match(/(\d+)\s*second/i);
      const seconds = match ? parseInt(match[1], 10) : retryAfter;
      setCountdown(seconds);
    } else {
      setCountdown(null);
    }
  }, [error, retryAfter]);

  useEffect(() => {
    if (countdown === null || countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => (prev && prev > 1 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  if (!error) return null;

  const info = categorizeError(error);
  const IconComponent = info.icon;

  const copyDiagnostic = () => {
    navigator.clipboard.writeText(`Error: ${error}\nTimestamp: ${new Date().toISOString()}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.98 }}
        transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
        className="relative overflow-hidden rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-950/40 via-slate-900/90 to-purple-950/20 backdrop-blur-xl p-5 md:p-6 mb-8 shadow-2xl shadow-red-950/20 text-slate-100"
      >
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            {/* Pulsing Icon Badge */}
            <div className="relative shrink-0 mt-0.5">
              <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 shadow-inner">
                <IconComponent className="w-5 h-5 animate-pulse" />
              </div>
            </div>

            {/* Error Content */}
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-base font-bold text-white tracking-tight">
                  {info.title}
                </h3>
                <span className={`text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full border ${info.badgeColor}`}>
                  {info.badge}
                </span>
              </div>

              <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-2xl">
                {info.explanation}
              </p>

              {/* Countdown or Status Indicator */}
              {countdown !== null && countdown > 0 ? (
                <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-300 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20 mt-1">
                  <Clock className="w-3.5 h-3.5 animate-spin" />
                  Auto-cooldown: Ready in <span className="font-bold">{countdown}s</span>
                </div>
              ) : countdown === 0 ? (
                <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20 mt-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  System ready for instant retry!
                </div>
              ) : null}
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center w-full md:w-auto justify-end pt-2 md:pt-0 border-t md:border-t-0 border-slate-800/60">
            {onRetry && (
              <button
                onClick={onRetry}
                disabled={countdown !== null && countdown > 0}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg cursor-pointer active:scale-95 ${
                  countdown !== null && countdown > 0
                    ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                    : 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500 text-white shadow-red-500/20'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Retry Now
              </button>
            )}

            {onClear && (
              <button
                onClick={onClear}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
                title="Dismiss Notice"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Diagnostic Toggle */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <button
            onClick={() => setShowDebug(!showDebug)}
            className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors font-mono cursor-pointer"
          >
            {showDebug ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            {showDebug ? 'Hide Diagnostic Data' : 'View Diagnostic Insights'}
          </button>

          {showDebug && (
            <button
              onClick={copyDiagnostic}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-purple-300 transition-colors font-mono cursor-pointer"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy Log'}
            </button>
          )}
        </div>

        {/* Expandable Diagnostic Code Output */}
        {showDebug && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 p-3.5 bg-black/60 rounded-xl border border-red-500/20 text-[11px] font-mono text-red-300/90 whitespace-pre-wrap break-all leading-relaxed select-all"
          >
            {error}
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
