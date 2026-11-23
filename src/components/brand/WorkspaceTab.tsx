import React from 'react';
import { ShieldCheckIcon, VideoCameraIcon, SendIcon } from '@/components/dashboard/icons';
import { BrandCollabThread } from './types';

interface WorkspaceTabProps {
  collabs: BrandCollabThread[];
  selectedCollabId: string;
  onSelectCollab: (id: string) => void;
  collabReplyInput: string;
  onCollabReplyChange: (val: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
  onApproveDeliverable: (collabId: string) => void;
}

export function WorkspaceTab({
  collabs,
  selectedCollabId,
  onSelectCollab,
  collabReplyInput,
  onCollabReplyChange,
  onSendMessage,
  onApproveDeliverable,
}: WorkspaceTabProps) {
  const activeCollab = collabs.find((c) => c.id === selectedCollabId) || collabs[0];

  return (
    <div className="brand-collab-split" style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '20px', alignItems: 'flex-start' }}>
      {/* Left Thread List */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
        <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', marginBottom: '12px' }}>
          Active Deals ({collabs.length})
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {collabs.map((c) => {
            const isSelected = c.id === selectedCollabId;
            return (
              <div
                key={c.id}
                onClick={() => onSelectCollab(c.id)}
                style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                  border: isSelected ? '1px solid #BFDBFE' : '1px solid #F1F5F9',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                  <span style={{ fontSize: '13.5px', fontWeight: 800, color: isSelected ? '#0052FF' : '#0F172A' }}>
                    {c.creatorName}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: c.status === 'SETTLED' ? '#059669' : '#0052FF' }}>
                    ₹{c.agreedAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                <div style={{ fontSize: '11.5px', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {c.campaignTitle}
                </div>
                <div style={{ fontSize: '10px', color: isSelected ? '#0052FF' : '#94A3B8', fontWeight: 700, marginTop: '4px' }}>
                  Stage {c.milestoneStage}/4: {c.milestoneName}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Chat & Review Workspace */}
      {activeCollab && (
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          {/* Header info */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9', marginBottom: '18px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                {activeCollab.creatorName} ({activeCollab.creatorHandle})
              </h3>
              <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                Campaign: <strong>{activeCollab.campaignTitle}</strong> • Deliverable: {activeCollab.deliverableSummary}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#059669', backgroundColor: '#ECFDF5', padding: '3px 8px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheckIcon size={13} color="#059669" />
                <span>Protected Amount: ₹{activeCollab.agreedAmount.toLocaleString('en-IN')}</span>
              </span>
            </div>
          </div>

          {/* Milestone Progress Bar */}
          <div style={{ backgroundColor: '#F8FAFC', padding: '12px 16px', borderRadius: '10px', border: '1px solid #F1F5F9', marginBottom: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>
              <span>Stage {activeCollab.milestoneStage}/4: {activeCollab.milestoneName}</span>
              <span style={{ color: '#0052FF' }}>{Math.round((activeCollab.milestoneStage / 4) * 100)}% Completed</span>
            </div>
            <div style={{ width: '100%', height: '6px', backgroundColor: '#E2E8F0', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{ width: `${(activeCollab.milestoneStage / 4) * 100}%`, height: '100%', backgroundColor: '#0052FF', borderRadius: '999px' }} />
            </div>
          </div>

          {/* Messages Feed */}
          <div style={{ minHeight: '260px', maxHeight: '380px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '18px', paddingRight: '6px' }}>
            {activeCollab.messages.map((msg) => {
              const isBrand = msg.sender === 'BRAND';
              const isSystem = msg.sender === 'SYSTEM';

              if (isSystem) {
                return (
                  <div key={msg.id} style={{ textAlign: 'center', padding: '8px 12px', backgroundColor: '#EFF6FF', borderRadius: '8px', fontSize: '11.5px', color: '#1E40AF', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <ShieldCheckIcon size={14} color="#0052FF" />
                    <span>{msg.text}</span>
                  </div>
                );
              }

              return (
                <div
                  key={msg.id}
                  style={{
                    alignSelf: isBrand ? 'flex-end' : 'flex-start',
                    maxWidth: '80%',
                    backgroundColor: isBrand ? '#0052FF' : '#F1F5F9',
                    color: isBrand ? '#FFFFFF' : '#0F172A',
                    padding: '12px 16px',
                    borderRadius: '14px',
                    borderBottomRightRadius: isBrand ? '2px' : '14px',
                    borderBottomLeftRadius: isBrand ? '14px' : '2px',
                  }}
                >
                  <div style={{ fontSize: '11px', fontWeight: 700, color: isBrand ? '#BFDBFE' : '#64748B', marginBottom: '4px' }}>
                    {msg.senderName} • {msg.date}
                  </div>
                  <div style={{ fontSize: '13px', lineHeight: 1.45 }}>{msg.text}</div>

                  {/* Deliverable Review Box if Attached */}
                  {msg.deliverableMeta && (
                    <div style={{ marginTop: '10px', padding: '12px', backgroundColor: isBrand ? 'rgba(255,255,255,0.1)' : '#FFFFFF', borderRadius: '8px', border: isBrand ? '1px solid rgba(255,255,255,0.2)' : '1px solid #E2E8F0' }}>
                      <div style={{ fontSize: '12px', fontWeight: 800, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <VideoCameraIcon size={14} color={isBrand ? '#FFFFFF' : '#0052FF'} />
                        <span>{msg.deliverableMeta.title}</span>
                      </div>
                      <div style={{ fontSize: '11.5px', opacity: 0.85, marginBottom: '8px' }}>
                        {msg.deliverableMeta.notes}
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <a
                          href={msg.deliverableMeta.url}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            padding: '5px 10px',
                            backgroundColor: isBrand ? '#FFFFFF' : '#0052FF',
                            color: isBrand ? '#0052FF' : '#FFFFFF',
                            borderRadius: '6px',
                            fontSize: '11.5px',
                            fontWeight: 700,
                            textDecoration: 'none',
                          }}
                        >
                          Open Deliverable Link ↗
                        </a>
                        {msg.deliverableMeta.status === 'PENDING_REVIEW' && (
                          <button
                            type="button"
                            onClick={() => onApproveDeliverable(activeCollab.id)}
                            style={{
                              padding: '5px 12px',
                              backgroundColor: '#059669',
                              color: '#FFFFFF',
                              border: 'none',
                              borderRadius: '6px',
                              fontSize: '11.5px',
                              fontWeight: 700,
                              cursor: 'pointer',
                            }}
                          >
                            ✓ Approve & Release Payout
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Send Reply Form */}
          <form onSubmit={onSendMessage} style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              placeholder="Type feedback, approve edits, or ask a question..."
              value={collabReplyInput}
              onChange={(e) => onCollabReplyChange(e.target.value)}
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '13px',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#0052FF',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <SendIcon size={14} color="#FFFFFF" />
              <span>Send</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
