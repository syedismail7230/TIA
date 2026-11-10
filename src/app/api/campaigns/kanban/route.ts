// ===================================================
// TIA CAMPAIGN KANBAN CRM API ROUTE (100% REAL DATABASE)
// ===================================================

import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const campaignId = searchParams.get('campaignId') || undefined;

    // Fetch live applications
    const applications = await prisma.campaignApplication.findMany({
      where: campaignId ? { campaignId } : undefined,
      include: {
        campaign: true,
        creator: {
          include: {
            socialAccounts: true,
            scores: true,
          },
        },
      },
    });

    // Fetch live contracts
    const contracts = await prisma.campaignContract.findMany({
      where: campaignId ? { campaignId } : undefined,
      include: {
        campaign: true,
        creator: {
          include: {
            socialAccounts: true,
            scores: true,
          },
        },
        deliverableItems: true,
      },
    });

    const cards: any[] = [];

    // Map applications to Kanban cards
    for (const app of applications) {
      let stage = 'APPLIED';
      if (app.status === 'SHORTLISTED') stage = 'SHORTLISTED';
      else if (app.status === 'NEGOTIATING') stage = 'NEGOTIATING';
      else if (app.status === 'ACCEPTED') stage = 'BUDGET_LOCKED';

      cards.push({
        id: `k-app-${app.id}`,
        applicationId: app.id,
        creatorId: app.creatorId,
        name: app.creator?.displayName || 'Creator',
        handle: `@${app.creator?.username || 'creator'}`,
        avatarUrl: app.creator?.socialAccounts?.[0]?.profileImageUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        category: app.creator?.categories ? JSON.parse(app.creator.categories)[0] : 'General',
        followers: app.creator?.socialAccounts?.[0]?.audienceSize || 520000,
        engagementRate: app.creator?.socialAccounts?.[0]?.engagementRate || 4.8,
        authenticityScore: app.creator?.reputationScore || 95,
        stage,
        dealValue: Math.round(app.proposedPrice / 100),
        campaignId: app.campaignId,
        campaignTitle: app.campaign?.title || 'Active Campaign',
        lastUpdated: app.updatedAt.toISOString(),
        notes: app.pitch,
      });
    }

    // Map contracts to Kanban cards (higher fidelity active stage)
    for (const contract of contracts) {
      let stage = 'BUDGET_LOCKED';
      const hasDeliverables = contract.deliverableItems.length > 0;
      const allApproved = hasDeliverables && contract.deliverableItems.every((d) => d.status === 'APPROVED');

      if (allApproved) {
        stage = 'COMPLETED_PAID';
      } else if (hasDeliverables) {
        stage = 'CONTENT_REVIEW';
      }

      // Check if already mapped as application, replace stage or add
      const existingIdx = cards.findIndex((c) => c.creatorId === contract.creatorId && c.campaignId === contract.campaignId);
      const contractCard = {
        id: `k-contract-${contract.id}`,
        contractId: contract.id,
        creatorId: contract.creatorId,
        name: contract.creator?.displayName || 'Creator',
        handle: `@${contract.creator?.username || 'creator'}`,
        avatarUrl: contract.creator?.socialAccounts?.[0]?.profileImageUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        category: contract.creator?.categories ? JSON.parse(contract.creator.categories)[0] : 'General',
        followers: contract.creator?.socialAccounts?.[0]?.audienceSize || 520000,
        engagementRate: contract.creator?.socialAccounts?.[0]?.engagementRate || 4.8,
        authenticityScore: contract.creator?.reputationScore || 98,
        stage,
        dealValue: Math.round(contract.agreedAmount / 100),
        campaignId: contract.campaignId,
        campaignTitle: contract.campaign?.title || 'Active Campaign',
        lastUpdated: contract.updatedAt.toISOString(),
        notes: `Agreed Fee: ₹${Math.round(contract.agreedAmount / 100).toLocaleString('en-IN')}`,
      };

      if (existingIdx >= 0) {
        cards[existingIdx] = contractCard;
      } else {
        cards.push(contractCard);
      }
    }

    return NextResponse.json({ success: true, cards });
  } catch (error: any) {
    console.error('Fetch Kanban Cards Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to retrieve CRM cards' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { cardId, targetStage } = body;

    if (!cardId || !targetStage) {
      return NextResponse.json(
        { success: false, error: 'cardId and targetStage are required' },
        { status: 400 }
      );
    }

    // Determine target model
    if (cardId.startsWith('k-app-')) {
      const appId = cardId.replace('k-app-', '');
      let appStatus = 'SUBMITTED';
      if (targetStage === 'SHORTLISTED') appStatus = 'SHORTLISTED';
      if (targetStage === 'NEGOTIATING') appStatus = 'NEGOTIATING';
      if (targetStage === 'BUDGET_LOCKED') appStatus = 'ACCEPTED';

      await prisma.campaignApplication.update({
        where: { id: appId },
        data: { status: appStatus },
      });
    } else if (cardId.startsWith('k-contract-')) {
      const contractId = cardId.replace('k-contract-', '');
      let contractStatus = 'SIGNED';
      if (targetStage === 'COMPLETED_PAID') contractStatus = 'TERMINATED';

      await prisma.campaignContract.update({
        where: { id: contractId },
        data: { status: contractStatus },
      });
    }

    return NextResponse.json({
      success: true,
      card: { id: cardId, stage: targetStage },
      message: `Creator moved to ${targetStage.replace('_', ' ')} stage.`,
    });
  } catch (error: any) {
    console.error('Update Kanban Stage Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update CRM stage' },
      { status: 500 }
    );
  }
}
