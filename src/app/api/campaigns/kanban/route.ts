// ===================================================
// TIA CAMPAIGN KANBAN CRM API ROUTE
// ===================================================

import { NextResponse } from 'next/server';
import { KanbanCRMService, KanbanColumnId } from '@/lib/services/kanban.service';
import { getCurrentUser } from '@/lib/auth/session';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const campaignId = searchParams.get('campaignId') || undefined;

    const cards = KanbanCRMService.getCards(campaignId);
    return NextResponse.json({ success: true, cards });
  } catch (error: any) {
    console.error('Fetch Kanban Cards Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to retrieve CRM cards' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { cardId, targetStage, notes } = body;

    if (!cardId || !targetStage) {
      return NextResponse.json(
        { success: false, error: 'cardId and targetStage are required' },
        { status: 400 }
      );
    }

    const updatedCard = KanbanCRMService.updateCardStage(
      cardId,
      targetStage as KanbanColumnId,
      notes
    );

    return NextResponse.json({
      success: true,
      card: updatedCard,
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

