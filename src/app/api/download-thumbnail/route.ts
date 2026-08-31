import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get('videoId')?.trim();
    const requestedQuality = searchParams.get('quality')?.trim() || 'maxresdefault';
    const resId = searchParams.get('resId')?.trim() || '4k';

    if (!videoId || !/^[\w-]{11}$/.test(videoId)) {
      return NextResponse.json({ error: 'Invalid YouTube Video ID' }, { status: 400 });
    }

    // Quality hierarchy starting from the highest master resolution
    const qualityHierarchy = requestedQuality === 'maxresdefault'
      ? ['maxresdefault', 'sddefault', 'hqdefault', 'mqdefault']
      : [requestedQuality, 'maxresdefault', 'hqdefault', 'mqdefault'];

    let imageBuffer: ArrayBuffer | null = null;
    let finalQuality = requestedQuality;

    // Fetch highest available uncompressed image from YouTube CDN
    for (const q of qualityHierarchy) {
      try {
        const youtubeImageUrl = `https://img.youtube.com/vi/${videoId}/${q}.jpg`;
        const imageRes = await fetch(youtubeImageUrl, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          },
          cache: 'no-store',
        });

        if (imageRes.ok) {
          const buffer = await imageRes.arrayBuffer();
          // YouTube returns a 1097-byte blank placeholder for missing maxresdefault
          if (buffer.byteLength > 2000 || q === qualityHierarchy[qualityHierarchy.length - 1]) {
            imageBuffer = buffer;
            finalQuality = q;
            break;
          }
        }
      } catch {
        // try next fallback in hierarchy
      }
    }

    if (!imageBuffer) {
      return NextResponse.json({ error: 'Thumbnail not available on YouTube CDN' }, { status: 404 });
    }

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Disposition': `attachment; filename="youtube-thumbnail-${videoId}-${resId}.jpg"`,
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to download thumbnail' }, { status: 500 });
  }
}
