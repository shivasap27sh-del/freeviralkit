'use client';

import React from 'react';
import Link from 'next/link';
import {
  Lightbulb,
  FileText,
  Layout,
  Tags,
  DollarSign,
  Check,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';

export type PipelineStep =
  | 'ideation'
  | 'scripting'
  | 'packaging'
  | 'metadata'
  | 'monetization';

export interface CreatorPipelineBarProps {
  currentStep: PipelineStep;
  currentTool?: string;
  topic?: string;
  className?: string;
}

export interface ToolRecommendation {
  slug: string;
  label: string;
}

interface PipelineStageConfig {
  id: PipelineStep;
  label: string;
  icon: LucideIcon;
}

const PIPELINE_STAGES: readonly PipelineStageConfig[] = [
  { id: 'ideation', label: 'Ideation', icon: Lightbulb },
  { id: 'scripting', label: 'Scripting', icon: FileText },
  { id: 'packaging', label: 'Packaging', icon: Layout },
  { id: 'metadata', label: 'Metadata', icon: Tags },
  { id: 'monetization', label: 'Monetization', icon: DollarSign },
] as const;

const TOOL_RECOMMENDATIONS: Record<string, ToolRecommendation[]> = {
  // Ideation
  'youtube-topic-researcher': [
    { slug: 'youtube-hook-generator', label: 'Generate Hooks' },
    { slug: 'youtube-script-generator', label: 'Write Script' },
  ],
  'youtube-shorts-idea-generator': [
    { slug: 'youtube-hook-generator', label: 'Generate Hooks' },
    { slug: 'youtube-script-generator', label: 'Write Script' },
  ],

  // Scripting
  'youtube-hook-generator': [
    { slug: 'youtube-script-generator', label: 'Write Script' },
  ],
  'youtube-script-generator': [
    { slug: 'youtube-title-generator', label: 'Generate Titles' },
    { slug: 'youtube-chapter-generator', label: 'Generate Chapters' },
  ],
  'youtube-chapter-generator': [
    { slug: 'youtube-title-generator', label: 'Generate Titles' },
    { slug: 'youtube-thumbnail-generator', label: 'Thumbnail Ideas' },
  ],

  // Packaging
  'youtube-title-generator': [
    { slug: 'youtube-tags-generator', label: 'Generate Tags' },
    { slug: 'youtube-description-generator', label: 'Write Description' },
  ],
  'youtube-ab-test-generator': [
    { slug: 'youtube-thumbnail-generator', label: 'Thumbnail Ideas' },
    { slug: 'youtube-tags-generator', label: 'Generate Tags' },
  ],
  'youtube-thumbnail-generator': [
    { slug: 'youtube-tags-generator', label: 'Generate Tags' },
    { slug: 'youtube-description-generator', label: 'Write Description' },
  ],

  // Metadata
  'youtube-tags-generator': [
    { slug: 'youtube-description-generator', label: 'Write Description' },
    { slug: 'youtube-seo-grader', label: 'Grade SEO' },
  ],
  'youtube-description-generator': [
    { slug: 'youtube-hashtag-generator', label: 'Generate Hashtags' },
    { slug: 'youtube-seo-grader', label: 'Grade SEO' },
  ],
  'youtube-hashtag-generator': [
    { slug: 'youtube-seo-grader', label: 'Grade SEO' },
    { slug: 'youtube-money-calculator', label: 'Calculate Revenue' },
  ],
  'youtube-seo-grader': [
    { slug: 'youtube-money-calculator', label: 'Calculate Revenue' },
    { slug: 'youtube-tags-generator', label: 'Generate Tags' },
  ],

  // Monetization
  'youtube-money-calculator': [
    { slug: 'youtube-topic-researcher', label: 'Research Topics' },
    { slug: 'youtube-title-generator', label: 'Generate Titles' },
  ],

  // Companion & Root routes
  'youtube-channel-name-generator': [
    { slug: 'youtube-topic-researcher', label: 'Research Topics' },
    { slug: 'youtube-title-generator', label: 'Generate Titles' },
  ],
  'youtube-thumbnail-downloader': [
    { slug: 'youtube-ab-test-generator', label: 'A/B Test Titles' },
    { slug: 'youtube-tags-generator', label: 'Generate Tags' },
  ],
  'youtube-realtime-title-generator': [
    { slug: 'youtube-tags-generator', label: 'Generate Tags' },
    { slug: 'youtube-description-generator', label: 'Write Description' },
  ],
  '/': [
    { slug: 'youtube-topic-researcher', label: 'Research Topics' },
  ],
};

const STAGE_FALLBACKS: Record<PipelineStep, ToolRecommendation[]> = {
  ideation: [
    { slug: 'youtube-hook-generator', label: 'Generate Hooks' },
    { slug: 'youtube-script-generator', label: 'Write Script' },
  ],
  scripting: [
    { slug: 'youtube-title-generator', label: 'Generate Titles' },
    { slug: 'youtube-chapter-generator', label: 'Generate Chapters' },
  ],
  packaging: [
    { slug: 'youtube-tags-generator', label: 'Generate Tags' },
    { slug: 'youtube-description-generator', label: 'Write Description' },
  ],
  metadata: [
    { slug: 'youtube-seo-grader', label: 'Grade SEO' },
    { slug: 'youtube-money-calculator', label: 'Calculate Revenue' },
  ],
  monetization: [
    { slug: 'youtube-topic-researcher', label: 'Research Topics' },
    { slug: 'youtube-title-generator', label: 'Generate Titles' },
  ],
};

export function buildToolUrl(slug: string, topic?: string): string {
  const normalized = slug.startsWith('/') ? slug : `/${slug}`;
  if (!topic || !topic.trim()) {
    return normalized;
  }
  return `${normalized}?topic=${encodeURIComponent(topic.trim())}`;
}

export function getNextRecommendations(
  currentTool?: string,
  currentStep?: PipelineStep
): ToolRecommendation[] {
  const normalized = (currentTool || '').replace(/^\/+|\/+$/g, '').trim();

  if (normalized && TOOL_RECOMMENDATIONS[normalized]) {
    return TOOL_RECOMMENDATIONS[normalized];
  }

  if (currentTool === '/' || normalized === '') {
    return (
      TOOL_RECOMMENDATIONS['/'] || [
        { slug: 'youtube-topic-researcher', label: 'Research Topics' },
      ]
    );
  }

  if (currentStep && STAGE_FALLBACKS[currentStep]) {
    return STAGE_FALLBACKS[currentStep];
  }

  return STAGE_FALLBACKS.ideation;
}

export function CreatorPipelineBar({
  currentStep,
  currentTool = '',
  topic = '',
  className = '',
}: CreatorPipelineBarProps) {
  const stepIndex = PIPELINE_STAGES.findIndex((s) => s.id === currentStep);
  const activeIndex = stepIndex >= 0 ? stepIndex : 0;
  const currentStage = PIPELINE_STAGES[activeIndex];

  const recommendations = getNextRecommendations(currentTool, currentStep);
  const primaryRec = recommendations[0];
  const secondaryRec = recommendations[1];

  return (
    <div
      className={`glass-card rounded-2xl p-4 sm:p-5 mt-8 mb-6 ${className}`.trim()}
      role="region"
      aria-label="Publishing workflow pipeline"
    >
      {/* Top Header Status */}
      <div className="flex items-center justify-between mb-3.5 sm:mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
          Publishing Pipeline
        </span>
        <div className="text-xs text-slate-500 dark:text-zinc-400">
          Step {activeIndex + 1} of 5 &middot;{' '}
          <span className="font-semibold text-red-500 dark:text-red-400">
            {currentStage.label}
          </span>
        </div>
      </div>

      {/* 5-Stage Pipeline */}
      <div className="relative py-1">
        <div className="flex items-start w-full">
          {PIPELINE_STAGES.map((stage, idx) => {
            const isCompleted = idx < activeIndex;
            const isCurrent = idx === activeIndex;
            const Icon = stage.icon;

            return (
              <React.Fragment key={stage.id}>
                {/* Stage Node */}
                <div className="w-8 sm:w-20 shrink-0 flex flex-col items-center">
                  <div
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400'
                        : isCurrent
                        ? 'bg-red-500/10 dark:bg-red-500/15 border-2 border-red-500 text-red-500 dark:text-red-400 ring-4 ring-red-500/15 shadow-sm shadow-red-500/20'
                        : 'bg-slate-100 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/60 text-slate-400 dark:text-zinc-500'
                    }`}
                    title={`${stage.label} (${
                      isCompleted ? 'Completed' : isCurrent ? 'Current' : 'Upcoming'
                    })`}
                    aria-current={isCurrent ? 'step' : undefined}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 stroke-[2.5]" />
                    ) : (
                      <Icon
                        className={`w-4 h-4 ${
                          isCurrent ? 'stroke-[2.5]' : 'stroke-2'
                        }`}
                      />
                    )}
                  </div>
                  <span
                    className={`hidden sm:block text-xs mt-2 text-center truncate w-full select-none transition-colors ${
                      isCurrent
                        ? 'font-bold text-red-600 dark:text-red-400'
                        : isCompleted
                        ? 'font-medium text-slate-700 dark:text-zinc-300'
                        : 'text-slate-400 dark:text-zinc-500'
                    }`}
                  >
                    {stage.label}
                  </span>
                </div>

                {/* Connecting Line Between Stages */}
                {idx < PIPELINE_STAGES.length - 1 && (
                  <div className="flex-1 mx-1 sm:mx-2 self-start mt-4 sm:mt-4.5">
                    <div
                      className={`h-0.5 w-full rounded-full transition-colors ${
                        idx < activeIndex
                          ? 'bg-emerald-500 dark:bg-emerald-400'
                          : 'bg-slate-200 dark:bg-zinc-800'
                      }`}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Contextual Next Step Action Buttons */}
      <div className="mt-4 pt-3.5 border-t border-slate-200/70 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
            Next Step
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5">
          {primaryRec && (
            <Link
              href={buildToolUrl(primaryRec.slug, topic)}
              className="btn-primary rounded-xl px-4 py-2 sm:px-5 sm:py-2.5 text-sm font-semibold inline-flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.98] transition-transform"
            >
              <span>{primaryRec.label}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          )}

          {secondaryRec && (
            <Link
              href={buildToolUrl(secondaryRec.slug, topic)}
              className="rounded-xl px-4 py-2 sm:px-5 sm:py-2.5 text-sm font-medium border border-slate-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800/80 hover:border-slate-300 dark:hover:border-zinc-700 hover:text-slate-900 dark:hover:text-white inline-flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
            >
              <span>{secondaryRec.label}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreatorPipelineBar;
