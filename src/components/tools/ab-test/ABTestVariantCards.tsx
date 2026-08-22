'use client';

import { Eye, Copy, Check } from 'lucide-react';
import { type ABTestVariant, VARIANT_CONFIGS } from './types';

interface ABTestVariantCardsProps {
  variants: ABTestVariant[];
  activeVariantId: 'A' | 'B' | 'C';
  setActiveVariantId: (id: 'A' | 'B' | 'C') => void;
  variantImages: { A?: string; B?: string; C?: string };
  copiedStates: { [key: string]: boolean };
  onCopyTitle: (title: string, key: string) => void;
}

export default function ABTestVariantCards({
  variants,
  activeVariantId,
  setActiveVariantId,
  variantImages,
  copiedStates,
  onCopyTitle,
}: ABTestVariantCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {variants.map((v) => {
        const config = VARIANT_CONFIGS[v.id] || VARIANT_CONFIGS.A;
        const isSelected = activeVariantId === v.id;
        const vImage = variantImages[v.id];

        return (
          <div
            key={v.id}
            onClick={() => setActiveVariantId(v.id)}
            className={`relative rounded-2xl p-5 border transition-all cursor-pointer flex flex-col justify-between ${
              isSelected
                ? 'border-purple-500 bg-purple-500/10 shadow-xl shadow-purple-500/10 ring-2 ring-purple-500/40'
                : 'glass-card border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700'
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

              {/* Mini Thumbnail Visual Card */}
              <div className="aspect-video w-full rounded-xl overflow-hidden mb-3 relative border border-slate-700 bg-slate-900 flex items-center justify-center">
                {vImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={vImage} alt={`Thumbnail ${v.id}`} className="w-full h-full object-cover" />
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-tr ${
                      v.id === 'A'
                        ? 'from-indigo-950 via-purple-900 to-slate-900'
                        : v.id === 'B'
                        ? 'from-rose-950 via-red-900 to-slate-900'
                        : 'from-emerald-950 via-teal-900 to-slate-900'
                    } flex flex-col items-center justify-center p-2 text-center`}
                  >
                    <span className="text-[11px] font-extrabold text-white tracking-wider uppercase px-2 py-0.5 rounded bg-black/50 border border-white/20">
                      {v.thumbnailText}
                    </span>
                  </div>
                )}
                <span className="absolute bottom-1 right-1 px-1 py-0.2 rounded text-[8px] font-mono font-bold bg-black/80 text-white">
                  Variant {v.id}
                </span>
              </div>

              <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                {v.title}
              </h3>

              <div className="mt-2 p-2 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 font-mono uppercase block mb-0.5">Overlay Text:</span>
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
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onCopyTitle(v.title, `variant-${v.id}`);
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
  );
}
