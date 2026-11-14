import { NextResponse } from 'next/server';
import { getImpersonatorSession, getCurrentUser } from '@/lib/auth/session';

export async function GET() {
  try {
    const adminSession = await getImpersonatorSession();
    if (!adminSession) {
      return NextResponse.json({ isImpersonating: false });
    }

    const currentUser = await getCurrentUser();

    return NextResponse.json({
      isImpersonating: true,
      admin: {
        email: adminSession.email,
        name: adminSession.name,
        role: adminSession.role,
      },
      currentUser: currentUser
        ? {
            id: currentUser.id,
            email: currentUser.email,
            name: currentUser.name,
            role: currentUser.role,
          }
        : null,
    });
  } catch {
    return NextResponse.json({ isImpersonating: false });
  }
}
