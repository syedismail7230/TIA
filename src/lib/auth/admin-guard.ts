import { getCurrentUser } from '@/lib/auth/session';
import { NextResponse } from 'next/server';

export async function requireAdminSession() {
  const user = await getCurrentUser();
  if (!user || (!user.role.startsWith('TIA_') && user.role !== 'TIA_SUPER_ADMIN')) {
    return {
      authorized: false as const,
      user: null,
      response: NextResponse.json(
        { error: 'Unauthorized: Administrative credentials required' },
        { status: 403 }
      ),
    };
  }

  return {
    authorized: true as const,
    user,
    response: null,
  };
}
