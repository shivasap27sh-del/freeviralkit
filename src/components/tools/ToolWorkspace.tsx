import { ReactNode } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
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
            className="w-full bg-slate-100 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-lg"
          />
        </div>

        {/* Examples section */}
        {examples.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs text-slate-500 font-medium">Examples:</span>
            {examples.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => {
                  setTopic(ex);
                  onGenerate(ex);
                }}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-950 hover:bg-slate-200 transition-all cursor-pointer"
              >
                {ex}
              </button>
            ))}
          </div>
        )}

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

      {/* Render children/output slot */}
      {children}
    </>
  );
}
