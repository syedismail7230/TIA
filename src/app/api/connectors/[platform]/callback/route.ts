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

    // If this is an onboarding / popup verification flow, return postMessage HTML and close window
    if (decodedState.flow === 'onboarding' || decodedState.flow === 'popup') {
      const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Account Verified • TIA Platform</title>
  <style>
    body { background: #07090e; color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; padding: 20px; text-align: center; box-sizing: border-box; }
    .card { background: #111827; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 32px; max-width: 380px; width: 100%; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
    .icon-badge { width: 56px; height: 56px; border-radius: 14px; background: rgba(16,185,129,0.12); color: #10b981; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-size: 24px; border: 1px solid rgba(16,185,129,0.25); }
    h2 { font-size: 20px; font-weight: 700; margin: 0 0 8px; color: #fff; }
    p { font-size: 13px; color: #9ca3af; line-height: 1.5; margin: 0 0 20px; }
    .metrics { background: #1a2234; border-radius: 10px; padding: 12px; font-size: 12px; color: #e5e7eb; margin-bottom: 20px; text-align: left; }
    .metric-row { display: flex; justify-content: space-between; margin-bottom: 6px; }
    .metric-row:last-child { margin-bottom: 0; }
    .status-tag { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; color: #10b981; font-weight: 600; }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon-badge">✓</div>
    <h2>${platform} Verified</h2>
    <p>Your official account <strong>@${profile.username}</strong> has been authenticated with live API access.</p>
    <div class="metrics">
      <div class="metric-row"><span>Handle:</span><strong style="color:#60a5fa">@${profile.username}</strong></div>
      <div class="metric-row"><span>Audience:</span><strong>${profile.audienceSize.toLocaleString()}</strong></div>
      <div class="metric-row"><span>Avg Views:</span><strong>${profile.averageViews.toLocaleString()}</strong></div>
      <div class="metric-row"><span>Status:</span><span class="status-tag">● Live Verified</span></div>
    </div>
  </div>
  <script>
    try {
      const payload = {
        type: 'TIA_SOCIAL_CONNECTED',
        platform: ${JSON.stringify(platform.toLowerCase())},
        profile: ${JSON.stringify(profile)}
      };
      if (window.opener && !window.opener.closed) {
        window.opener.postMessage(payload, '*');
        setTimeout(() => window.close(), 1000);
      } else {
        setTimeout(() => {
          window.location.href = '/register?step=4&connected=' + encodeURIComponent(${JSON.stringify(platform.toLowerCase())});
        }, 1200);
      }
    } catch(e) {
      console.error(e);
    }
  </script>
</body>
</html>`;

      return new NextResponse(html, {
        headers: { 'Content-Type': 'text/html' },
      });
    }

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
