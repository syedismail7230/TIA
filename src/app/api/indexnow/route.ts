import { NextResponse } from 'next/server';

/**
 * IndexNow API Protocol Handler
 * Allows instant URL indexing pings to Microsoft Bing, Yandex, Seznam, and participating search engines.
 * Specification: https://www.indexnow.org/documentation
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { urls } = body;

    const host = 'www.theinfluencers.agency';
    const key = 'tia-indexnow-key-2026';
    const keyLocation = `https://${host}/tia-indexnow-key-2026.txt`;

    const urlList: string[] = Array.isArray(urls) && urls.length > 0 
      ? urls 
      : [`https://${host}/`, `https://${host}/pricing`, `https://${host}/about`];

    const payload = {
      host,
      key,
      keyLocation,
      urlList,
    };

    // Ping the central IndexNow API endpoint (automatically replicates across Bing, Yandex, etc.)
    const response = await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({
      success: response.ok,
      status: response.status,
      submittedUrls: urlList,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'IndexNow submission failed', details: error.message },
      { status: 500 }
    );
  }
}
