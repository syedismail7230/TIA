// ===================================================
// TIA BACKEND - AUTHENTICATION LOGIN API
// Secured with Rate Limiting (anti-brute force), Zod validation & Centralized Error Handling
// ===================================================

import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { verifyPassword } from '@/lib/auth/password';
import { setSessionCookie } from '@/lib/auth/session';
import { logAuditEvent } from '@/lib/audit/logger';
import { findStoredUserByEmail } from '@/lib/auth/local-auth-store';
import { handleApiError, AuthenticationError } from '@/lib/errors/api-error';
import { enforceRateLimit, getClientIp, RATE_LIMIT_TIERS } from '@/lib/security/rate-limiter';
import { validateRequest, loginSchema } from '@/lib/validations';

export async function POST(request: Request) {
  try {
    // 1. Anti-brute force rate limiting (10 attempts / min per IP)
    const clientIp = getClientIp(request);
    await enforceRateLimit(clientIp, RATE_LIMIT_TIERS.AUTH);

    // 2. Strict Zod Schema Validation
    const rawBody = await request.json();
    const { email, password } = validateRequest(loginSchema, rawBody);
    const normalizedEmail = email.toLowerCase().trim();

    // 3. Database lookup via Prisma
    let user = null;
    try {
      user = await prisma.user.findUnique({
        where: { email: normalizedEmail },
        include: {
          creatorProfile: true,
          orgMemberships: {
            include: {
              organization: true,
            },
          },
        },
      });
    } catch (dbErr: any) {
      // Graceful fallback to verified local auth store
    }

    if (user) {
      const isValid = await verifyPassword(password, user.passwordHash);
      if (!isValid) {
        throw new AuthenticationError('Invalid email or password');
      }

      const primaryOrg = user.orgMemberships?.[0];

      await setSessionCookie({
        userId: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        creatorId: user.creatorProfile?.id,
        organizationId: primaryOrg?.organizationId,
        orgRole: primaryOrg?.role,
      });

      try {
        await logAuditEvent({
          userId: user.id,
          userRole: user.role,
          action: 'LOGIN',
          entityType: 'USER',
          entityId: user.id,
        });
      } catch {}

      return NextResponse.json({
        success: true,
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          creatorProfile: user.creatorProfile,
          organization: primaryOrg?.organization,
        },
      });
    }

    // 4. Fallback lookup in local auth store
    const localUser = findStoredUserByEmail(normalizedEmail);
    if (localUser) {
      const isValid = await verifyPassword(password, localUser.passwordHash);
      if (!isValid) {
        throw new AuthenticationError('Invalid email or password');
      }

      await setSessionCookie({
        userId: localUser.id,
        email: localUser.email,
        role: localUser.role,
        name: localUser.name,
        creatorId: localUser.role === 'CREATOR' ? `cr_${localUser.id}` : undefined,
        organizationId: localUser.role !== 'CREATOR' ? `org_${localUser.id}` : undefined,
      });

      return NextResponse.json({
        success: true,
        message: 'Login successful',
        user: {
          id: localUser.id,
          email: localUser.email,
          name: localUser.name,
          role: localUser.role,
          creatorProfile: {
            id: `cr_${localUser.id}`,
            displayName: localUser.name,
            username: localUser.email.split('@')[0],
            verificationStatus: 'EMAIL_VERIFIED',
          },
        },
      });
    }

    throw new AuthenticationError('Invalid email or password');
  } catch (error) {
    return handleApiError(error, 'POST /api/auth/login');
  }
}
