// ===================================================
// TIA BACKEND - CREATOR SEARCH & DISCOVERY API
// ===================================================

import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { CreatorService } from '@/lib/services/creator.service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const query = searchParams.get('q') || undefined;
    const minFollowers = searchParams.get('minFollowers') ? parseInt(searchParams.get('minFollowers')!, 10) : undefined;
    const maxRate = searchParams.get('maxRate') ? parseInt(searchParams.get('maxRate')!, 10) : undefined;
    const verifiedOnly = searchParams.get('verified') === 'true';

    // Try Prisma DB first
    try {
      const whereClause: any = {};
      if (query) {
        whereClause.OR = [
          { displayName: { contains: query, mode: 'insensitive' } },
          { username: { contains: query, mode: 'insensitive' } },
        ];
      }

      const creators = await prisma.creator.findMany({
        where: whereClause,
        include: {
          socialAccounts: true,
          rateCard: true,
          scores: { take: 1, orderBy: { calculatedAt: 'desc' } },
        },
        take: 50,
      });

      if (creators && creators.length > 0) {
        return NextResponse.json({ success: true, creators });
      }
    } catch {
      // Fallback to CreatorService
    }

    const localCreators = await CreatorService.search({
      search: query,
      category,
      minFollowers,
      maxRate,
      verifiedOnly,
    });

    return NextResponse.json({ success: true, creators: localCreators });
  } catch (error: any) {
    console.error('Creator Search API Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to search creators' }, { status: 500 });
  }
}
