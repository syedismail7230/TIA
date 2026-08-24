import { NextResponse } from 'next/server';
import { getSocialConnector } from '@/lib/connectors/social';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { platform: string } }
) {
  try {
    const platform = params.platform.toUpperCase();
    const connector = getSocialConnector(platform);

    const state = Buffer.from(
      JSON.stringify({
        platform,
        timestamp: Date.now(),
        nonce: Math.random().toString(36).substring(7),
      })
    ).toString('base64');

    const authUrl = connector.getAuthorizationUrl(state);
    return NextResponse.redirect(authUrl);
  } catch (error: any) {
    console.error('Connector Auth URL Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate authorization URL' },
      { status: 400 }
    );
  }
}
