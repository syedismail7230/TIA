import { NextResponse } from 'next/server';
import { clearSessionCookie, getCurrentUser } from '@/lib/auth/session';

export const dynamic = 'force-dynamic';

export async function POST() {
  clearSessionCookie();
  return NextResponse.json({ message: 'Logged out successfully' });
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, user });
}
