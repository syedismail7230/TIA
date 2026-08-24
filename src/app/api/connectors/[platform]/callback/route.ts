import { NextResponse } from 'next/server';
import { getSocialConnector } from '@/lib/connectors/social';
import prisma from '@/lib/db/prisma';
import { getCurrentUser, setSessionCookie } from '@/lib/auth/session';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { platform: string } }
) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');
  const stateRaw = url.searchParams.get('state');
  const platform = params.platform.toUpperCase();

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  if (error || !code) {
    console.warn(`OAuth error from ${platform}:`, error);
    return NextResponse.redirect(`${baseUrl}/login?error=oauth_cancelled`);
  }

  let decodedState: any = {};
  if (stateRaw) {
    try {
      decodedState = JSON.parse(Buffer.from(stateRaw, 'base64').toString('utf-8'));
    } catch {
      decodedState = {};
    }
  }

  try {
    const connector = getSocialConnector(platform);
    const { accessToken, refreshToken, expiresAt } = await connector.exchangeCodeForToken(code);
    const profile = await connector.fetchProfile(accessToken);

    const session = await getCurrentUser();

    // 1. If user is already logged in, connect the platform account to their creator profile
    if (session?.id) {
      try {
        const creator = await prisma.creator.findFirst({
          where: { userId: session.id },
        });

        if (creator) {
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

      return NextResponse.redirect(`${baseUrl}/creator?connected=${platform.toLowerCase()}&account=${encodeURIComponent(profile.username)}`);
    }

    // 2. If user is NOT logged in, handle SSO Login / Registration
    const candidateEmail = (profile.rawMetadata?.email || `${profile.username.toLowerCase()}@${platform.toLowerCase()}.auth`).trim().toLowerCase();
    const candidateName = profile.displayName || profile.username || `${platform} User`;
    const targetRole = decodedState.role === 'BRAND_ADMIN' ? 'BRAND_ADMIN' : 'CREATOR';

    let user = await prisma.user.findUnique({
      where: { email: candidateEmail },
      include: { creatorProfile: true, orgMemberships: true },
    });

    if (!user) {
      // Create new user for social OAuth SSO
      const randomPassword = `Oauth_${Date.now()}_${Math.random().toString(36).substring(2)}`;
      const passwordHash = await bcrypt.hash(randomPassword, 10);

      user = await prisma.user.create({
        data: {
          email: candidateEmail,
          name: candidateName,
          passwordHash,
          role: targetRole,
          emailVerified: true,
          avatarUrl: profile.profileImageUrl,
          country: 'India',
        },
        include: { creatorProfile: true, orgMemberships: true },
      });

      if (targetRole === 'CREATOR') {
        const username = `${candidateName.toLowerCase().replace(/[^a-z0-9]/g, '')}_${Math.floor(Math.random() * 1000)}`;
        const newCreator = await prisma.creator.create({
          data: {
            userId: user.id,
            displayName: candidateName,
            username,
            country: 'India',
            verificationStatus: 'EMAIL_VERIFIED',
            bio: `${candidateName} • Verified via ${platform} SSO`,
          },
        });

        await prisma.creatorRateCard.create({
          data: {
            creatorId: newCreator.id,
            startingPrice: 2500000,
            currency: 'INR',
          },
        });

        await prisma.creatorAvailability.create({
          data: {
            creatorId: newCreator.id,
            status: 'AVAILABLE',
            leadTimeDays: 7,
            maxSimultaneousCampaigns: 3,
          },
        });
      } else if (targetRole === 'BRAND_ADMIN') {
        const newOrg = await prisma.organization.create({
          data: {
            name: `${candidateName}'s Organization`,
            verificationStatus: 'VERIFIED',
            country: 'India',
          },
        });

        await prisma.organizationMember.create({
          data: {
            organizationId: newOrg.id,
            userId: user.id,
            role: 'OWNER',
          },
        });

        await prisma.brandProfile.create({
          data: {
            organizationId: newOrg.id,
            companyName: `${candidateName}'s Brand`,
            industry: 'Direct-to-Consumer',
          },
        });
      }
    }

    // Set session cookie
    await setSessionCookie({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Redirect to respective dashboard
    if (user.role === 'CREATOR') {
      return NextResponse.redirect(`${baseUrl}/creator`);
    } else if (user.role.startsWith('BRAND_')) {
      return NextResponse.redirect(`${baseUrl}/brand`);
    } else if (user.role.startsWith('TIA_')) {
      return NextResponse.redirect(`${baseUrl}/admin`);
    }

    return NextResponse.redirect(`${baseUrl}/creator`);
  } catch (err: any) {
    console.error(`Error processing ${platform} callback:`, err);
    return NextResponse.redirect(`${baseUrl}/login?error=${encodeURIComponent(err.message || 'authentication_failed')}`);
  }
}
