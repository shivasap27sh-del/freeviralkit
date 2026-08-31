export interface ThumbnailResolution {
  id: string;
  name: string;
  quality: string;
  dimensions: string;
  badge: string;
  isBest?: boolean;
  fileNameSuffix: string;
}

export const thumbnailResolutions: ThumbnailResolution[] = [
  {
    id: '4k',
    name: '4K / 2K Ultra HD',
    quality: 'Original Master (Uncompressed)',
    dimensions: '3840×2160 / 1920×1080 px',
    badge: '★ BEST QUALITY',
    isBest: true,
    fileNameSuffix: 'maxresdefault',
  },
  {
    id: '1080p',
    name: '1080p Full HD',
    quality: 'High Definition',
    dimensions: '1920 × 1080 px',
    badge: '1080p Full HD',
    fileNameSuffix: 'maxresdefault',
  },
  {
    id: '720p',
    name: '720p HD Quality',
    quality: 'Standard YouTube HD',
    dimensions: '1280 × 720 px',
    badge: '720p HD',
    fileNameSuffix: 'hqdefault',
  },
  {
    id: '480p',
    name: '480p SD Quality',
    quality: 'Compressed Mobile',
    dimensions: '640 × 480 px',
    badge: '480p SD',
    fileNameSuffix: 'sddefault',
  },
];

export const thumbnailFaqs = [
  {
    q: 'How do I download a YouTube thumbnail in original 4K / 1080p resolution?',
    a: 'Paste any public YouTube video or Shorts link into the input bar. FreeViralKit directly queries YouTube\'s CDN (`img.youtube.com`) and pulls the uncompressed "maxresdefault.jpg" image uploaded by the creator. Click "Download 4K Ultra HD" to save the direct master file.',
  },
  {
    q: 'How does the tag extractor discover hidden keywords on YouTube videos?',
    a: 'When you submit a video URL, our server inspects the public HTML payload and parses the embedded `ytInitialPlayerResponse.videoDetails.keywords` data array. These are the exact ranking keywords the creator entered inside YouTube Studio.',
  },
  {
    q: 'Why do tags matter on YouTube in 2026?',
    a: 'According to YouTube Creator Liaison, tags play a crucial role when your video title or topic contains common misspellings, colloquial slang, or foreign keyword variations. Properly configured tags help the search engine associate alternative spellings with your primary video entity.',
  },
  {
    q: 'What is the optimal thumbnail file format and aspect ratio for YouTube?',
    a: 'YouTube requires a strict 16:9 aspect ratio, a minimum resolution of 1280x720 pixels (under 2MB), and standard JPG, PNG, or WebP formats. Using 1280x720 or 1920x1080 ensures your thumbnail remains crystal-clear across smart TVs, retina mobile displays, and desktop feeds.',
  },
  {
    q: 'Can I download thumbnails from YouTube Shorts?',
    a: 'Yes. FreeViralKit supports both standard long-form YouTube videos and vertical Shorts. Simply paste the Shorts URL (e.g. `youtube.com/shorts/VIDEO_ID`) and the tool will extract the high-resolution master thumbnail and keywords immediately.',
  },
];
