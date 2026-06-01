export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  /** Optional scheduled publish date (YYYY-MM-DD). If set and in the future, the post is hidden. */
  publishDate?: string;
  readTime: string;
  category: string;
  tags: string[];
}

import { post as youtubeSeoGuide } from './posts/youtube-seo-guide';
import { post as bestYoutubeTags } from './posts/best-youtube-tags';
import { post as youtubeDescriptionTips } from './posts/youtube-description-tips';
import { post as youtubeHashtagStrategy } from './posts/youtube-hashtag-strategy';
import { post as bestYoutubeTagsForGaming } from './posts/best-youtube-tags-for-gaming';
import { post as youtubeTitlesThatGetClicks } from './posts/youtube-titles-that-get-clicks';
import { post as doYoutubeHashtagsActuallyHelp } from './posts/do-youtube-hashtags-actually-help';
import { post as howToGrowYoutubeChannelFromZero } from './posts/how-to-grow-youtube-channel-from-zero';
import { post as youtubeShortsSeo } from './posts/youtube-shorts-seo';
import { post as youtubeCtrSecrets } from './posts/youtube-ctr-secrets';
import { post as aiForYoutubeSeo } from './posts/ai-for-youtube-seo';
import { post as howToPickYoutubeChannelName } from './posts/how-to-pick-youtube-channel-name';
import { post as highRpmYoutubeNiches2026 } from './posts/high-rpm-youtube-niches-2026';
import { post as youtubePinnedCommentFormula } from './posts/youtube-pinned-comment-formula';
import { post as youtubePlaylistStrategy } from './posts/youtube-playlist-strategy';
import { post as youtubeThumbnailDesignTips } from './posts/youtube-thumbnail-design-tips';
import { post as howYoutubeAlgorithmWorks } from './posts/how-youtube-algorithm-works';
import { post as youtubeMonetizationGuide2026 } from './posts/youtube-monetization-guide-2026';
import { post as youtubeAnalyticsGuide } from './posts/youtube-analytics-guide';
import { post as youtubeGamingChannelGrowthGuide } from './posts/youtube-gaming-channel-growth-guide';
import { post as howToStartAVlogChannel } from './posts/how-to-start-a-vlog-channel';
import { post as growEducationalYoutubeChannel } from './posts/grow-educational-youtube-channel';
import { post as youtubeShortsViralSecrets } from './posts/youtube-shorts-viral-secrets';
import { post as howToFindYoutubeNiche } from './posts/how-to-find-youtube-niche';
import { post as increaseYoutubeAudienceRetention } from './posts/increase-youtube-audience-retention';
import { post as howToPromoteYoutubeVideos } from './posts/how-to-promote-youtube-videos';
import { post as youtubeCookingChannelTips } from './posts/youtube-cooking-channel-tips';
import { post as bestYoutubeTagsForMusic } from './posts/best-youtube-tags-for-music';
import { post as youtubeShortsVsLongForm } from './posts/youtube-shorts-vs-long-form';
import { post as youtubeTechReviewSeo } from './posts/youtube-tech-review-seo';
import { post as howToGetYoutubeMonetizedFast } from './posts/how-to-get-youtube-monetized-fast';
import { post as youtubeFitnessChannelGuide } from './posts/youtube-fitness-channel-guide';
import { post as youtubeTravelVlogTips } from './posts/youtube-travel-vlog-tips';
import { post as freeviralkitVsVidiqVsTubebuddy } from './posts/freeviralkit-vs-vidiq-vs-tubebuddy';
import { post as youtubeBeautyChannelSeo } from './posts/youtube-beauty-channel-seo';
import { post as youtubeCollaborationStrategy } from './posts/youtube-collaboration-strategy';
import { post as youtubeShortsLoopStrategy } from './posts/youtube-shorts-loop-strategy';
import { post as bestYoutubeTagsForTech } from './posts/best-youtube-tags-for-tech';
import { post as youtubeSeoChecklist2026 } from './posts/youtube-seo-checklist-2026';
import { post as howToWriteYoutubeScriptsWithAi } from './posts/how-to-write-youtube-scripts-with-ai';
import { post as youtubeScriptOutlineFormula } from './posts/youtube-script-outline-formula';
import { post as youtubeTopicResearchStrategies } from './posts/youtube-topic-research-strategies';
import { post as lowCompetitionHighVolumeYoutubeIdeas } from './posts/low-competition-high-volume-youtube-ideas';
import { post as ultimateYoutubeEquipmentGuide2026 } from './posts/ultimate-youtube-equipment-guide-2026';
import { post as youtubeSponsorshipsSmallChannels } from './posts/youtube-sponsorships-small-channels';
import { post as facelessYoutubeChannelGuide } from './posts/faceless-youtube-channel-guide';
import { post as youtubeCommunityTabStrategy } from './posts/youtube-community-tab-strategy';
import { post as recoverDyingYoutubeChannel } from './posts/recover-dying-youtube-channel';
import { post as youtubeAudioOptimization } from './posts/youtube-audio-optimization';
import { post as youtubeTagGeneratorFree } from './posts/youtube-tag-generator-free';
import { post as facelessYoutubeChannelIdeas } from './posts/faceless-youtube-channel-ideas';
import { post as howToGet1000Subscribers } from './posts/how-to-get-1000-subscribers-in-a-week';
const rawBlogPosts: BlogPost[] = [
  howToGet1000Subscribers,
  facelessYoutubeChannelIdeas,
  youtubeSeoGuide,
  bestYoutubeTags,
  youtubeDescriptionTips,
  youtubeHashtagStrategy,
  bestYoutubeTagsForGaming,
  youtubeTitlesThatGetClicks,
  doYoutubeHashtagsActuallyHelp,
  howToGrowYoutubeChannelFromZero,
  youtubeShortsSeo,
  youtubeCtrSecrets,
  aiForYoutubeSeo,
  howToPickYoutubeChannelName,
  highRpmYoutubeNiches2026,
  youtubePinnedCommentFormula,
  youtubePlaylistStrategy,
  youtubeThumbnailDesignTips,
  howYoutubeAlgorithmWorks,
  youtubeMonetizationGuide2026,
  youtubeAnalyticsGuide,
  youtubeGamingChannelGrowthGuide,
  howToStartAVlogChannel,
  growEducationalYoutubeChannel,
  youtubeShortsViralSecrets,
  howToFindYoutubeNiche,
  increaseYoutubeAudienceRetention,
  howToPromoteYoutubeVideos,
  youtubeCookingChannelTips,
  bestYoutubeTagsForMusic,
  youtubeShortsVsLongForm,
  youtubeTechReviewSeo,
  howToGetYoutubeMonetizedFast,
  youtubeFitnessChannelGuide,
  youtubeTravelVlogTips,
  freeviralkitVsVidiqVsTubebuddy,
  youtubeBeautyChannelSeo,
  youtubeCollaborationStrategy,
  youtubeShortsLoopStrategy,
  bestYoutubeTagsForTech,
  youtubeSeoChecklist2026,
  howToWriteYoutubeScriptsWithAi,
  youtubeScriptOutlineFormula,
  youtubeTopicResearchStrategies,
  lowCompetitionHighVolumeYoutubeIdeas,
  ultimateYoutubeEquipmentGuide2026,
  youtubeSponsorshipsSmallChannels,
  facelessYoutubeChannelGuide,
  youtubeCommunityTabStrategy,
  recoverDyingYoutubeChannel,
  youtubeAudioOptimization,
  youtubeTagGeneratorFree,
];

const getTodayStr = () => {
  try {
    return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
  } catch (e) {
    return new Date().toISOString().split('T')[0];
  }
};

export const blogPosts: BlogPost[] = rawBlogPosts.map((post) => {
  const todayStr = getTodayStr();
  const date = post.date > todayStr ? todayStr : post.date;
  const publishDate = post.publishDate && post.publishDate > todayStr ? todayStr : post.publishDate;
  return {
    ...post,
    date,
    publishDate,
  };
});

/** Check if a post is currently published (all posts are live immediately for indexation and crawl error avoidance) */
function isPublished(post: BlogPost): boolean {
  return true;
}

/** Returns only posts whose publishDate has arrived (or have no publishDate) */
export function getPublishedPosts(): BlogPost[] {
  return blogPosts.filter(isPublished);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

/** Returns a published post by slug, or undefined if not found or not yet published */
export function getPublishedPostBySlug(slug: string): BlogPost | undefined {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return undefined;
  return isPublished(post) ? post : undefined;
}

export function getAllSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}

/** Returns slugs of only published posts */
export function getPublishedSlugs(): string[] {
  return getPublishedPosts().map((post) => post.slug);
}
