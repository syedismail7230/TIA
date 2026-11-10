// ===================================================
// TIA BACKEND - REAL-TIME CREATOR SEARCH & DISCOVERY API
// ===================================================

import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const query = searchParams.get('q') || undefined;
    const verifiedOnly = searchParams.get('verified') === 'true';

    const whereClause: any = {};
    if (query) {
      whereClause.OR = [
        { displayName: { contains: query, mode: 'insensitive' } },
        { username: { contains: query, mode: 'insensitive' } },
        { bio: { contains: query, mode: 'insensitive' } },
      ];
    }

    if (category && category !== 'ALL') {
      whereClause.categories = { contains: category, mode: 'insensitive' };
    }

    if (verifiedOnly) {
      whereClause.verificationStatus = { in: ['VERIFIED_CREATOR', 'GOVERNMENT_ID_VERIFIED', 'IDENTITY_VERIFIED'] };
    }

    const creators = await prisma.creator.findMany({
      where: whereClause,
      include: {
        socialAccounts: true,
        rateCard: true,
        scores: { take: 1, orderBy: { calculatedAt: 'desc' } },
      },
      orderBy: { reputationScore: 'desc' },
      take: 50,
    });

    return NextResponse.json({ success: true, creators });
  } catch (error: any) {
    console.error('Creator Search API Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to search creators' }, { status: 500 });
  }
}
