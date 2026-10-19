import { ReactNode } from 'react';
import { Sparkles, Loader2, X, Zap } from 'lucide-react';
import ErrorBanner from '@/components/ErrorBanner';

interface ToolWorkspaceProps {
  topic: string;
  setTopic: (val: string) => void;
  placeholder: string;
  examples: string[];
  isGenerating: boolean;
  onGenerate: (val?: string) => void;
  error: string | null;
  onClearError: () => void;
  buttonText: string;
  generatingText: string;
  icon?: ReactNode;
  children?: ReactNode;
}

export default function ToolWorkspace({
  topic,
  setTopic,
  placeholder,
  examples,
  isGenerating,
  onGenerate,
  error,
  onClearError,
  buttonText,
  generatingText,
  icon = <Sparkles className="w-5 h-5" />,
  children,
}: ToolWorkspaceProps) {
  const handleTryDemo = () => {
    const demoTopic = examples.length > 0 ? examples[0] : 'How to Grow on YouTube in 2026';
    setTopic(demoTopic);
    onGenerate(demoTopic);
  };

  return (
    <>
      <form onSubmit={(e) => { e.preventDefault(); onGenerate(); }} className="glass-card rounded-2xl p-6 md:p-8 mb-8">
        <div className="relative mb-4">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={placeholder}
            aria-label="Enter your video topic"
            className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-5 pr-12 py-4 text-slate-900 dark:text-slate-50 placeholder:text-slate-500 focus:outline-none focus:border-red-500/60 focus:ring-2 focus:ring-red-500/30 transition-all text-lg"
          />
          {topic.trim() && (
            <button
              type="button"
              onClick={() => setTopic('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white bg-slate-200/60 dark:bg-zinc-700/80 transition-colors cursor-pointer"
              title="Clear input"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Examples & Demo section */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <button
            type="button"
            onClick={handleTryDemo}
            disabled={isGenerating}
            className="text-xs px-2.5 py-1.5 rounded-lg font-semibold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/25 hover:bg-red-500/20 transition-all cursor-pointer flex items-center gap-1 active:scale-[0.96] disabled:opacity-50"
          >
            <Zap className="w-3 h-3 fill-current" />
            <span>Try Demo</span>
          </button>

          {examples.length > 0 && (
            <>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium ml-1">Examples:</span>
              {examples.map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => {
                    setTopic(ex);
                    onGenerate(ex);
                  }}
                  className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer active:scale-[0.96]"
                >
                  {ex}
                </button>
              ))}
            </>
          )}
        </div>

        {/* Generate Button */}
        <button
          type="submit"
          onClick={() => onGenerate()}
          disabled={!topic.trim() || isGenerating}
          className="w-full btn-primary rounded-xl py-4 font-semibold text-lg flex items-center justify-center gap-2 cursor-pointer"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> {generatingText}
            </>
          ) : (
            <>
              {icon} {buttonText}
            </>
          )}
        </button>
      </form>

      <ErrorBanner error={error} onClear={onClearError} />

      {/* Render children/output slot with aria-live accessibility */}
      <div aria-live="polite" aria-busy={isGenerating}>
        {children}
      </div>
    </>
  );
}
