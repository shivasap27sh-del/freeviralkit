export interface ThumbnailResolution {
  id: string;
  name: string;
  quality: string;
  dimensions: string;
  badge: string;
  fileNameSuffix: string;
}

export const thumbnailResolutions: ThumbnailResolution[] = [
  {
    id: 'maxres',
    name: 'Maximum Resolution (4K / 1080p)',
    quality: 'Ultra HD 1080p / 4K',
    dimensions: '1280 × 720 px',
    badge: '4K Ultra HD',
    fileNameSuffix: 'maxresdefault',
  },
  {
    id: 'hq',
    name: 'High Quality (HQ 720p)',
    quality: 'Standard YouTube HD',
    dimensions: '480 × 360 px',
    badge: '720p HD',
    fileNameSuffix: 'hqdefault',
  },
  {
    id: 'mq',
    name: 'Medium Quality (480p)',
    quality: 'Compressed Web View',
    dimensions: '320 × 180 px',
    badge: '480p Web',
    fileNameSuffix: 'mqdefault',
  },
  {
    id: 'sd',
    name: 'Standard Definition (SD)',
    quality: 'Mobile Thumbnail',
    dimensions: '640 × 480 px',
    badge: 'SD Mobile',
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
    q: 'Is it legal to download and inspect competitor thumbnails?',
    a: 'Yes. Downloading public video thumbnails for competitor analysis, graphic design inspiration, storyboard mockups, and academic research falls under Fair Use. However, directly re-uploading another creator\'s copyrighted artwork to your channel is prohibited.',
  },
];
