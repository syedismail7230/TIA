import { NextResponse } from 'next/server';
import { getSocialConnector } from '@/lib/connectors/social';
import prisma from '@/lib/db/prisma';
import { getCurrentUser } from '@/lib/auth/session';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { platform: string } }
) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');
  const platform = params.platform.toUpperCase();

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  if (error || !code) {
    console.warn(`OAuth error from ${platform}:`, error);
    return NextResponse.redirect(`${baseUrl}/creator?error=oauth_cancelled`);
  }

  try {
    const connector = getSocialConnector(platform);
    const { accessToken, refreshToken, expiresAt } = await connector.exchangeCodeForToken(code);
    const profile = await connector.fetchProfile(accessToken);

    const session = await getCurrentUser();
    if (session?.id) {
      try {
        const creator = await prisma.creator.findFirst({
          where: { userId: session.id },
        });

        if (creator) {
          // Find or create social account
          const existing = await prisma.socialAccount.findUnique({
            where: {
              platform_platformAccountId: {
                platform: profile.platform,
                platformAccountId: profile.platformAccountId,
              },
            },
          });

          if (existing) {
            await prisma.socialAccount.update({
              where: { id: existing.id },
              data: {
                username: profile.username,
                profileUrl: profile.profileUrl,
                profileImageUrl: profile.profileImageUrl,
                audienceSize: profile.audienceSize,
                engagementRate: profile.engagementRate,
                averageViews: profile.averageViews,
                contentCount: profile.contentCount,
                connectionStatus: 'CONNECTED',
                lastSyncedAt: new Date(),
              },
            });

            await prisma.socialToken.upsert({
              where: { socialAccountId: existing.id },
              update: {
                accessToken,
                refreshToken,
                expiresAt,
              },
              create: {
                socialAccountId: existing.id,
                accessToken,
                refreshToken,
                expiresAt,
              },
            });
          } else {
            const newAccount = await prisma.socialAccount.create({
              data: {
                creatorId: creator.id,
                platform: profile.platform,
                platformAccountId: profile.platformAccountId,
                username: profile.username,
                profileUrl: profile.profileUrl,
                profileImageUrl: profile.profileImageUrl,
                audienceSize: profile.audienceSize,
                engagementRate: profile.engagementRate,
                averageViews: profile.averageViews,
                contentCount: profile.contentCount,
                connectionStatus: 'CONNECTED',
                lastSyncedAt: new Date(),
              },
            });

            await prisma.socialToken.create({
              data: {
                socialAccountId: newAccount.id,
                accessToken,
                refreshToken,
                expiresAt,
              },
            });
          }
        }
      } catch (dbErr: any) {
        console.warn('Database social account sync note:', dbErr.message);
      }
    }

    return NextResponse.redirect(`${baseUrl}/creator?connected=${platform.toLowerCase()}&account=${encodeURIComponent(profile.username)}`);
  } catch (err: any) {
    console.error(`Error processing ${platform} callback:`, err);
    return NextResponse.redirect(`${baseUrl}/creator?error=${encodeURIComponent(err.message || 'connection_failed')}`);
  }
}
