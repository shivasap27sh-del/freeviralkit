export interface HookTimelineBeat {
  timestamp: string; // e.g. "0:00 - 0:05", "0:05 - 0:15", "0:15 - 0:25", "0:25 - 0:30"
  label: string; // "Visual Shockwave", "The Stakes & Proof", "Open Curiosity Loop", "Content Bridge"
  spokenText: string;
  visualCue: string;
  sfxCue: string;
}

export interface HookPackage {
  id: string;
  archetype: string;
  badge: string;
  summary: string;
  fullScript: string;
  brollCue: string;
  sfxCue: string;
  predictedRetention: number; // 85 - 96%
  timeline: HookTimelineBeat[];
}

export interface HookArchetypeConfig {
  id: string;
  label: string;
  prompt: string;
  badge: string;
}

export const HOOK_ARCHETYPES: HookArchetypeConfig[] = [
  {
    id: 'shock',
    label: '💥 Visual Shockwave & Broken Assumption',
    prompt: 'Show a staggering result, failed test, or contrarian premise immediately in the first 3 seconds.',
    badge: '95% Peak Retention',
  },
  {
    id: 'contrarian',
    label: '🚫 The Fatal Lie 99% Believe',
    prompt: 'Expose common advice that is actively harming the viewer, backed by instant proof.',
    badge: 'Viral Debate Trigger',
  },
  {
    id: 'in-media-res',
    label: '⚡ High-Stakes Story In-Media-Res',
    prompt: 'Drop the viewer directly into the climax of a tense moment with an open question loop.',
    badge: 'Zero Drop-off Anchor',
  },
  {
    id: 'transformation',
    label: '📊 60-Second Direct Promise',
    prompt: 'Clear, high-conviction transformation with zero fluff or introductory filler.',
    badge: 'Search & Browse Safe',
  },
];
