import { NextResponse } from 'next/server';

// IndexNow key — matches the BingSiteAuth.xml user ID and the .txt file in /public
const INDEXNOW_KEY = '1FA6B38A290761B175A968B85022B7A8';
const SITE_URL = 'https://freeviralkit.com';

// All URLs to submit to Bing via IndexNow
const ALL_URLS = [
  '/',
  '/youtube-title-generator',
  '/youtube-hashtag-generator',
  '/youtube-tags-generator',
  '/youtube-description-generator',
  '/tools',
  '/tools/youtube-title-generator-for-gaming',
  '/tools/youtube-title-generator-for-vlogs',
  '/tools/youtube-description-generator-for-education',
  '/about',
  '/blog',
  '/contact',
  '/privacy-policy',
  '/terms',
].map(path => `${SITE_URL}${path}`);

export async function GET(request: Request) {
  // Simple secret check to prevent public abuse
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  if (secret !== process.env.INDEXNOW_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = {
      host: 'freeviralkit.com',
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: ALL_URLS,
    };

    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });

    // 200 = OK, 202 = Accepted (both are success)
    if (response.ok || response.status === 202) {
      return NextResponse.json({
        success: true,
        message: `✅ Submitted ${ALL_URLS.length} URLs to Bing IndexNow`,
        urls: ALL_URLS,
        status: response.status,
      });
    }

    const errorText = await response.text().catch(() => 'Unknown error');
    return NextResponse.json({
      success: false,
      error: `Bing returned ${response.status}: ${errorText}`,
    }, { status: 500 });

  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
