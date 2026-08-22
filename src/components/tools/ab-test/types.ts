import { type ABTestVariant } from '@/app/actions/abTest';

export type { ABTestVariant };

export interface VariantConfig {
  badge: string;
  color: string;
  bgGradient: string;
  accentBorder: string;
  pill: string;
}

export const VARIANT_CONFIGS: Record<'A' | 'B' | 'C', VariantConfig> = {
  A: {
    badge: 'Variant A • Curiosity Gap',
    color: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-400',
    bgGradient: 'from-indigo-950 via-purple-900 to-slate-900',
    accentBorder: 'border-indigo-500/30',
    pill: 'bg-indigo-500',
  },
  B: {
    badge: 'Variant B • Contrarian & Shock',
    color: 'border-rose-500/40 bg-rose-500/10 text-rose-400',
    bgGradient: 'from-rose-950 via-red-900 to-slate-900',
    accentBorder: 'border-rose-500/30',
    pill: 'bg-rose-500',
  },
  C: {
    badge: 'Variant C • Proof & Numbers',
    color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
    bgGradient: 'from-emerald-950 via-teal-900 to-slate-900',
    accentBorder: 'border-emerald-500/30',
    pill: 'bg-emerald-500',
  },
};

export const QUICK_TOPICS = [
  { label: '🔥 Viral Tech Review', topic: 'M4 MacBook Pro vs M3 Max: Real World Truth' },
  { label: '🎮 Gaming Challenge', topic: 'I Survived 100 Days in Hardcore Minecraft (No Armor)' },
  { label: '💼 Faceless Business', topic: 'How Rolex Tricked the World into Buying Status' },
  { label: '📈 YouTube Growth', topic: 'How to Get Your First 1,000 Subscribers Fast in 2026' },
  { label: '🎧 ASMR Sleep', topic: 'ASMR 1 Hour of Rain and Whispers for Insomnia Relief' },
];
