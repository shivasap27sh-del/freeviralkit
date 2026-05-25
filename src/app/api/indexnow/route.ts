import { NextResponse } from 'next/server';
import sitemap from '../../sitemap';

// IndexNow key — matches the BingSiteAuth.xml user ID and the .txt file in /public
const INDEXNOW_KEY = '1FA6B38A290761B175A968B85022B7A8';
const SITE_URL = 'https://freeviralkit.com';

export async function GET(request: Request) {
  // Simple secret check to prevent public abuse
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  if (secret !== process.env.INDEXNOW_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get the dynamic list of current published URLs from the sitemap
    const urls = sitemap().map((item) => item.url);

    const body = {
      host: 'freeviralkit.com',
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
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
        message: `✅ Submitted ${urls.length} URLs to Bing IndexNow`,
        urls: urls,
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

