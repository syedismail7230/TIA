// ===================================================
// TIA BACKEND - VERIFY EMAIL API ROUTE
// Serverless-Safe Asynchronous Verification Handler
// ===================================================

import { NextResponse } from 'next/server';
import { EmailVerificationService } from '@/lib/services/email-verification.service';
import prisma from '@/lib/db/prisma';
import { FirestoreService } from '@/lib/services/firestore.service';
import { setSessionCookie } from '@/lib/auth/session';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  if (!token) {
    return NextResponse.json({ success: false, error: 'Token is required' }, { status: 400 });
  }

  const result = await EmailVerificationService.verifyToken(token, email || undefined);
  if (!result.success || !result.record) {
    return NextResponse.json({ success: false, error: result.error || 'Invalid or expired verification link.' }, { status: 400 });
  }

  const userEmail = result.record.email.toLowerCase().trim();

  try {
    // 1. Update Prisma User if exists
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (user) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: true },
      });

      if (user.role === 'CREATOR') {
        await prisma.creator.updateMany({
          where: { userId: user.id },
          data: { verificationStatus: 'EMAIL_VERIFIED' },
        });
      }

      await setSessionCookie({
        userId: user.id,
        email: user.email,
        role: user.role,
        name: user.name || undefined,
      });
    } else {
      // Set session cookie for verified user
      await setSessionCookie({
        userId: result.record.userId || `user_${Date.now()}`,
        email: userEmail,
        role: result.record.role,
      });
    }

    // 2. Update Firestore if user profile exists
    if (result.record.userId) {
      try {
        await FirestoreService.saveUser({
          id: result.record.userId,
          email: userEmail,
          displayName: user?.name || 'Verified TIA User',
          role: result.record.role,
          authProvider: 'password',
        });
      } catch {}
    }
  } catch (err) {
    console.warn('Database sync note in verify-email:', err);
  }

  return NextResponse.json({
    success: true,
    message: 'Email successfully verified!',
    email: userEmail,
    role: result.record.role,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, role = 'CREATOR', userId } = body;

    if (!email) {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
    }

    const sendRes = await EmailVerificationService.sendVerificationEmail({
      email,
      name,
      userId,
      role,
    });

    return NextResponse.json(sendRes);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
