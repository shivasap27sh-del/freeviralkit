'use client';

import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorBannerProps {
  error: string | null;
  onClear?: () => void;
}

export default function ErrorBanner({ error, onClear }: ErrorBannerProps) {
  const [showDebug, setShowDebug] = useState(false);

  if (!error) return null;

  return (
    <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5 mb-8">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-display font-semibold text-red-400 mb-1">AI Generation Error</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            The AI system encountered an issue while generating content. Please verify your connection or try again.
          </p>
          <div className="flex gap-4 items-center mt-3">
            <button
              onClick={() => setShowDebug(!showDebug)}
              className="text-xs text-red-400/80 hover:text-red-400 underline cursor-pointer"
            >
              {showDebug ? 'Hide Technical Details' : 'Show Technical Details'}
            </button>
            {onClear && (
              <button
                onClick={onClear}
                className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 underline cursor-pointer"
              >
                Dismiss
              </button>
            )}
          </div>
          {showDebug && (
            <pre className="mt-3 p-4 bg-slate-900 text-red-300 rounded-xl text-xs font-mono whitespace-pre-wrap leading-normal border border-slate-800">
              {error}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
