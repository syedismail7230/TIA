'use client';

// ===================================================
// TIA BRAND CRM - UPFLUENCE-STYLE KANBAN PIPELINE
// Interactive Drag & Drop Workflow for Creator Management
// ===================================================

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export type KanbanColumnId =
  | 'DISCOVERED'
  | 'APPLIED'
  | 'SHORTLISTED'
  | 'NEGOTIATING'
  | 'BUDGET_LOCKED'
  | 'CONTENT_REVIEW'
  | 'COMPLETED_PAID';

interface KanbanCard {
  id: string;
  creatorId: string;
  name: string;
  handle: string;
  avatarUrl: string;
  category: string;
  followers: number;
  engagementRate: number;
  authenticityScore: number;
  stage: KanbanColumnId;
  dealValue: number;
  campaignTitle: string;
  notes?: string;
}

const COLUMNS: { id: KanbanColumnId; label: string; color: string; badge: string }[] = [
  { id: 'APPLIED', label: '1. Applied / Leads', color: '#64748B', badge: 'Inbox' },
  { id: 'SHORTLISTED', label: '2. Shortlisted', color: '#3B82F6', badge: 'Review' },
  { id: 'NEGOTIATING', label: '3. Terms Negotiation', color: '#8B5CF6', badge: 'SLA' },
  { id: 'BUDGET_LOCKED', label: '4. Budget Secured', color: '#059669', badge: 'TIA Shield' },
  { id: 'CONTENT_REVIEW', label: '5. Draft Review', color: '#D97706', badge: 'QA' },
  { id: 'COMPLETED_PAID', label: '6. Approved & Paid', color: '#10B981', badge: 'Completed' },
];

export function CreatorKanbanCRM() {
  const [cards, setCards] = useState<KanbanCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [movingId, setMovingId] = useState<string | null>(null);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const res = await fetch('/api/campaigns/kanban');
      const data = await res.json();
      if (data.success && Array.isArray(data.cards)) {
        setCards(data.cards);
      }
    } catch (err) {
      console.error('Failed to load Kanban cards:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMoveStage = async (cardId: string, nextStage: KanbanColumnId) => {
    setMovingId(cardId);
    // Optimistic UI update
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, stage: nextStage } : c))
    );

    try {
      await fetch('/api/campaigns/kanban', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardId, targetStage: nextStage }),
      });
    } catch (err) {
      console.error('Failed to update stage:', err);
      fetchCards(); // Rollback on error
    } finally {
      setMovingId(null);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#64748B', fontSize: '14px' }}>
        Loading TIA Enterprise Creator CRM Pipeline...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* CRM Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#0052FF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Upfluence-Grade Influencer CRM
          </div>
          <h2 style={{ margin: '2px 0 0 0', fontSize: '20px', fontWeight: 800, color: '#0F172A' }}>
            Creator Pipeline & Deal Lifecycle
          </h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#059669', backgroundColor: '#ECFDF5', padding: '6px 12px', borderRadius: '20px', border: '1px solid #A7F3D0' }}>
            🔒 100% Protected Milestones
          </span>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>
            Total Pipeline Value: <strong style={{ color: '#0F172A' }}>₹{cards.reduce((sum, c) => sum + c.dealValue, 0).toLocaleString('en-IN')}</strong>
          </span>
        </div>
      </div>

      {/* 6-Column Kanban Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '14px', alignItems: 'start', overflowX: 'auto', paddingBottom: '16px' }}>
        {COLUMNS.map((col, colIdx) => {
          const colCards = cards.filter((c) => c.stage === col.id);

          return (
            <div
              key={col.id}
              style={{
                backgroundColor: '#F8FAFC',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                minWidth: '220px',
              }}
            >
              {/* Column Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '8px', borderBottom: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#1E293B' }}>{col.label}</span>
                <span style={{ fontSize: '11px', fontWeight: 700, backgroundColor: '#FFFFFF', color: col.color, padding: '2px 8px', borderRadius: '10px', border: '1px solid #CBD5E1' }}>
                  {colCards.length}
                </span>
              </div>

              {/* Cards List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minHeight: '180px' }}>
                {colCards.map((card) => (
                  <div
                    key={card.id}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '10px',
                      border: '1px solid #E2E8F0',
                      padding: '12px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      position: 'relative',
                    }}
                  >
                    {/* Creator Identity */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img
                        src={card.avatarUrl}
                        alt={card.name}
                        style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div style={{ overflow: 'hidden' }}>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                          {card.name}
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748B' }}>{card.handle}</div>
                      </div>
                    </div>

                    {/* Deal Value & Authenticity */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', paddingTop: '4px', borderTop: '1px solid #F1F5F9' }}>
                      <span style={{ fontWeight: 800, color: '#0052FF' }}>₹{card.dealValue.toLocaleString('en-IN')}</span>
                      <span style={{ fontWeight: 700, color: '#059669', backgroundColor: '#ECFDF5', padding: '1px 6px', borderRadius: '6px' }}>
                        🛡️ {card.authenticityScore}% Real
                      </span>
                    </div>

                    {/* Notes Snippet */}
                    {card.notes && (
                      <p style={{ margin: 0, fontSize: '11px', color: '#475569', lineHeight: 1.35, backgroundColor: '#F8FAFC', padding: '6px', borderRadius: '6px' }}>
                        &ldquo;{card.notes}&rdquo;
                      </p>
                    )}

                    {/* Pipeline Stage Transitions */}
                    <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                      {colIdx > 0 && (
                        <button
                          type="button"
                          onClick={() => handleMoveStage(card.id, COLUMNS[colIdx - 1].id)}
                          disabled={movingId === card.id}
                          style={{
                            flex: 1,
                            padding: '4px 0',
                            backgroundColor: '#F1F5F9',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: 700,
                            color: '#475569',
                            cursor: 'pointer',
                          }}
                        >
                          ← Move Back
                        </button>
                      )}
                      {colIdx < COLUMNS.length - 1 && (
                        <button
                          type="button"
                          onClick={() => handleMoveStage(card.id, COLUMNS[colIdx + 1].id)}
                          disabled={movingId === card.id}
                          style={{
                            flex: 1,
                            padding: '4px 0',
                            backgroundColor: '#EFF6FF',
                            border: '1px solid #BFDBFE',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: 800,
                            color: '#0052FF',
                            cursor: 'pointer',
                          }}
                        >
                          Advance →
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
