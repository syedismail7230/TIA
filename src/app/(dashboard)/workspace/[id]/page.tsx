'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ScoreDisplay } from '@/components/ui/ScoreDisplay';
import { EmptyState } from '@/components/ui/EmptyState';

export default function CampaignWorkspacePage() {
  const params = useParams();
  const campaignId = params.id as string;

  const [campaign, setCampaign] = useState<any | null>(null);
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'negotiation' | 'contract' | 'messages' | 'content' | 'finance' | 'disputes'>('overview');
  const [loading, setLoading] = useState(true);

  // Form states
  const [proposalPitch, setProposalPitch] = useState('');
  const [proposalPrice, setProposalPrice] = useState('25000');
  const [counterOfferAmount, setCounterOfferAmount] = useState('30000');
  const [messageInput, setMessageInput] = useState('');
  const [deliverableFileUrl, setDeliverableFileUrl] = useState('');
  const [revisionComment, setRevisionComment] = useState('');
  const [disputeReason, setDisputeReason] = useState('DELIVERABLES');
  const [disputeDesc, setDisputeDesc] = useState('');
  const [actionError, setActionError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  const fetchWorkspaceData = async () => {
    try {
      const [campRes, meRes] = await Promise.all([
        fetch(`/api/campaigns/${campaignId}`),
        fetch('/api/auth/me'),
      ]);

      const campData = await campRes.json();
      const meData = await meRes.json();

      setCampaign(campData.campaign);
      setCurrentUser(meData.user);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkspaceData();
  }, [campaignId]);

  if (loading) {
    return (
      <div style={{ maxWidth: '1440px', margin: '40px auto', padding: '0 16px', textAlign: 'center', color: 'var(--text-muted)' }}>
        Loading Campaign Workspace...
      </div>
    );
  }

  if (!campaign) {
    return (
      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 16px' }}>
        <EmptyState title="Campaign Not Found" description="The requested campaign workspace does not exist." />
      </div>
    );
  }

  const isCreator = currentUser?.role === 'CREATOR';
  const isBrand = currentUser?.role === 'BRAND_ADMIN' || currentUser?.role === 'BRAND_USER';
  const activeContract = campaign.contracts?.[0];
  const activeDeliverable = activeContract?.deliverableItems?.[0];

  // Submit Application
  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError('');
    setActionSuccess('');
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignId,
          proposedPrice: Number(proposalPrice),
          pitch: proposalPitch,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit application');
      setActionSuccess('Application submitted successfully!');
      fetchWorkspaceData();
    } catch (err: any) {
      setActionError(err.message);
    }
  };

  // Submit Counter-Offer / Accept Offer
  const handleNegotiation = async (action: 'OFFER' | 'ACCEPT') => {
    setActionError('');
    setActionSuccess('');
    try {
      const creatorId = isCreator
        ? currentUser.creatorProfile.id
        : campaign.applications[0]?.creatorId;

      const res = await fetch('/api/negotiations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignId,
          creatorId,
          offerAmount: action === 'OFFER' ? Number(counterOfferAmount) : undefined,
          action,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Negotiation failed');
      setActionSuccess(data.message);
      fetchWorkspaceData();
    } catch (err: any) {
      setActionError(err.message);
    }
  };

  // Sign Digital Contract
  const handleSignContract = async () => {
    if (!activeContract) return;
    setActionError('');
    setActionSuccess('');
    try {
      const res = await fetch('/api/contracts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contractId: activeContract.id, action: 'SIGN' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Signing failed');
      setActionSuccess(data.message);
      fetchWorkspaceData();
    } catch (err: any) {
      setActionError(err.message);
    }
  };

  // Escrow Deposit & Release
  const handleEscrow = async (action: 'DEPOSIT' | 'RELEASE') => {
    if (!activeContract) return;
    setActionError('');
    setActionSuccess('');
    try {
      const res = await fetch('/api/payments/escrow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contractId: activeContract.id, action }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Escrow mutation failed');
      setActionSuccess(data.message);
      fetchWorkspaceData();
    } catch (err: any) {
      setActionError(err.message);
    }
  };

  // Send Message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    setActionError('');
    try {
      const creatorId = isCreator
        ? currentUser.creatorProfile.id
        : campaign.applications[0]?.creatorId;

      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignId,
          creatorId,
          content: messageInput,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Message failed');
      if (data.scanResult?.isFlagged) {
        setActionError(`Flagged by Anti-Circumvention Filter: ${data.scanResult.reasons.join(', ')}`);
      }
      setMessageInput('');
      fetchWorkspaceData();
    } catch (err: any) {
      setActionError(err.message);
    }
  };

  // Submit Deliverable Draft
  const handleSubmitDeliverable = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeDeliverable) return;
    setActionError('');
    setActionSuccess('');
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deliverableId: activeDeliverable.id,
          fileUrl: deliverableFileUrl,
          action: 'SUBMIT',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');
      setActionSuccess('Content draft submitted for brand review');
      setDeliverableFileUrl('');
      fetchWorkspaceData();
    } catch (err: any) {
      setActionError(err.message);
    }
  };

  // Approve Deliverable / Request Revision
  const handleReviewSubmission = async (submissionId: string, action: 'APPROVE' | 'REQUEST_REVISION') => {
    setActionError('');
    setActionSuccess('');
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId,
          action,
          comment: action === 'REQUEST_REVISION' ? revisionComment : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Review failed');
      setActionSuccess(data.message);
      fetchWorkspaceData();
    } catch (err: any) {
      setActionError(err.message);
    }
  };

  // Open Dispute
  const handleOpenDispute = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError('');
    setActionSuccess('');
    try {
      const res = await fetch('/api/disputes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignId,
          contractId: activeContract?.id,
          reason: disputeReason,
          description: disputeDesc,
          action: 'OPEN',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Dispute submission failed');
      setActionSuccess('Dispute opened and routed to TIA Governance');
      fetchWorkspaceData();
    } catch (err: any) {
      setActionError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Breadcrumb & Top Summary */}
      <div style={{ marginBottom: '20px' }}>
        <Link href={isCreator ? '/creator' : '/brand'} style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          ← Back to Dashboard
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span className="tia-badge tia-badge-neutral" style={{ marginBottom: '6px' }}>{campaign.category}</span>
            <h1 style={{ fontSize: 'clamp(20px, 4vw, 26px)', fontWeight: 800, letterSpacing: '-0.02em' }}>{campaign.title}</h1>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Brand: <strong>{campaign.organization.name}</strong> • Objective: <strong>{campaign.objective}</strong>
            </div>
          </div>
          <div>
            <span className={`tia-badge ${campaign.status === 'COMPLETED' ? 'tia-badge-success' : campaign.status === 'DISPUTED' ? 'tia-badge-error' : 'tia-badge-blue'}`} style={{ fontSize: '12px', padding: '4px 8px' }}>
              {campaign.status.replace(/_/g, ' ')}
            </span>
          </div>
        </div>
      </div>

      {/* Global Alerts */}
      {actionError && (
        <div style={{ padding: '12px 14px', backgroundColor: 'var(--semantic-error-bg)', border: '1px solid var(--semantic-error-border)', color: 'var(--semantic-error-text)', fontSize: '13px', marginBottom: '16px' }}>
          {actionError}
        </div>
      )}
      {actionSuccess && (
        <div style={{ padding: '12px 14px', backgroundColor: 'var(--semantic-success-bg)', border: '1px solid var(--semantic-success-border)', color: 'var(--semantic-success-text)', fontSize: '13px', marginBottom: '16px' }}>
          {actionSuccess}
        </div>
      )}

      {/* Navigation Tabs - Touch scrollable */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--border-subtle)',
        marginBottom: '24px',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        gap: '4px',
      }}>
        {[
          { id: 'overview', label: 'Brief & Scope' },
          { id: 'negotiation', label: 'Proposals & Negotiation' },
          { id: 'contract', label: 'Digital Agreement' },
          { id: 'messages', label: 'In-Platform Messages' },
          { id: 'content', label: 'Content Submissions & Review' },
          { id: 'finance', label: 'Escrow & 5% Ledger' },
          { id: 'disputes', label: 'Dispute Center' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              padding: '10px 14px',
              fontSize: '12px',
              fontWeight: 600,
              color: activeTab === tab.id ? 'var(--brand-primary)' : 'var(--text-secondary)',
              borderBottom: `2px solid ${activeTab === tab.id ? 'var(--brand-primary)' : 'transparent'}`,
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: Overview & Brief */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <div>
            <div style={{ border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-primary)', padding: '20px', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '10px' }}>Campaign Description & Objectives</h2>
              <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'var(--text-primary)', whiteSpace: 'pre-line' }}>
                {campaign.description}
              </p>
            </div>

            <div style={{ border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-primary)', padding: '20px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '10px' }}>Deliverable Requirements</h2>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {campaign.deliverables && JSON.parse(campaign.deliverables).map((d: string, i: number) => (
                  <span key={i} className="tia-badge tia-badge-neutral" style={{ padding: '4px 8px', fontSize: '11px' }}>
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div style={{ border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-primary)', padding: '20px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Total Campaign Budget
              </div>
              <div className="font-tabular" style={{ fontSize: '28px', fontWeight: 800, color: 'var(--brand-primary)', marginBottom: '14px' }}>
                ₹{(campaign.budget / 100).toLocaleString('en-IN')}
              </div>

              {isCreator && (
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '14px' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '10px' }}>Submit Creator Proposal</h3>
                  <form onSubmit={handleApply} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                        Proposed Price (₹)
                      </label>
                      <input
                        type="number"
                        className="tia-input"
                        value={proposalPrice}
                        onChange={(e) => setProposalPrice(e.target.value)}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                        Pitch / Creative Concept
                      </label>
                      <textarea
                        rows={3}
                        required
                        className="tia-input"
                        value={proposalPitch}
                        onChange={(e) => setProposalPitch(e.target.value)}
                        placeholder="Explain your content concept..."
                      />
                    </div>
                    <button type="submit" className="tia-btn-primary" style={{ width: '100%', padding: '10px' }}>
                      Submit Proposal
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Proposals & Negotiation */}
      {activeTab === 'negotiation' && (
        <div style={{ maxWidth: '900px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '14px' }}>Commercial Negotiation History</h2>
          <div className="tia-table-container" style={{ marginBottom: '20px' }}>
            <table className="tia-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Initiator</th>
                  <th>Offer Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {campaign.negotiations.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>
                      No negotiation rounds recorded yet. Submit a counter-offer below.
                    </td>
                  </tr>
                ) : (
                  campaign.negotiations.map((neg: any) => (
                    <tr key={neg.id}>
                      <td style={{ fontSize: '11px' }}>{new Date(neg.createdAt).toLocaleTimeString()}</td>
                      <td><strong>{neg.initiatorRole}</strong></td>
                      <td className="font-tabular" style={{ fontWeight: 700 }}>₹{(neg.offerAmount / 100).toLocaleString('en-IN')}</td>
                      <td><span className="tia-badge">{neg.status}</span></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div style={{ border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-primary)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                Counter-Offer Amount (₹)
              </label>
              <input
                type="number"
                className="tia-input"
                value={counterOfferAmount}
                onChange={(e) => setCounterOfferAmount(e.target.value)}
              />
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button type="button" onClick={() => handleNegotiation('OFFER')} className="tia-btn-primary" style={{ padding: '10px 16px' }}>
                Submit Counter-Offer
              </button>
              {campaign.negotiations.length > 0 && (
                <button type="button" onClick={() => handleNegotiation('ACCEPT')} className="tia-btn-secondary" style={{ padding: '10px 16px', borderColor: '#059669', color: '#059669' }}>
                  ✓ Accept Terms & Generate Contract
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Digital Agreement */}
      {activeTab === 'contract' && (
        <div style={{ maxWidth: '840px' }}>
          {!activeContract ? (
            <EmptyState
              title="No Contract Generated Yet"
              description="A digital contract will be automatically generated once both parties accept negotiation terms."
            />
          ) : (
            <div style={{ border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-primary)', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <img
                    src="/logo-cropped.png"
                    alt="TIA Contract Header"
                    style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
                  />
                  <div>
                    <h2 style={{ fontSize: '17px', fontWeight: 800 }}>TIA DIGITAL CAMPAIGN AGREEMENT</h2>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Contract ID: {activeContract.id} • Version {activeContract.version}</div>
                  </div>
                </div>
                <span className={`tia-badge ${activeContract.status === 'SIGNED' ? 'tia-badge-success' : 'tia-badge-warning'}`}>
                  {activeContract.status}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', lineHeight: 1.6, marginBottom: '24px' }}>
                <div><strong>1. Commercial Consideration:</strong> Total fee of ₹{(activeContract.agreedAmount / 100).toLocaleString('en-IN')} (Creator Net: ₹{(activeContract.creatorAllocationAmount / 100).toLocaleString('en-IN')}, TIA Commission: ₹{(activeContract.commissionAmount / 100).toLocaleString('en-IN')}).</div>
                <div><strong>2. Deliverables:</strong> {activeContract.deliverables}.</div>
                <div><strong>3. Closed-Loop Clause:</strong> All communication, payments, and deliverables must remain exclusively inside TIA.</div>
              </div>

              {/* Signatures */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', marginBottom: '20px' }}>
                <div style={{ padding: '12px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>Brand Signature</div>
                  <div style={{ fontSize: '12px', marginTop: '4px', fontWeight: 600 }}>
                    {activeContract.brandSignedAt ? `✓ Signed` : 'Pending Brand Signature'}
                  </div>
                </div>
                <div style={{ padding: '12px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>Creator Signature</div>
                  <div style={{ fontSize: '12px', marginTop: '4px', fontWeight: 600 }}>
                    {activeContract.creatorSignedAt ? `✓ Signed` : 'Pending Creator Signature'}
                  </div>
                </div>
              </div>

              {activeContract.status !== 'SIGNED' && (
                <button type="button" onClick={handleSignContract} className="tia-btn-primary" style={{ width: '100%', padding: '12px', fontWeight: 700 }}>
                  Digitally Sign Agreement
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: In-Platform Messages */}
      {activeTab === 'messages' && (
        <div style={{ maxWidth: '840px' }}>
          <div style={{ border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-primary)', display: 'flex', flexDirection: 'column', height: '480px' }}>
            <div style={{ padding: '12px', borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-secondary)', fontSize: '11px', color: 'var(--text-secondary)' }}>
              🔒 Closed-Loop Secure Messaging Stream • Protected by Anti-Circumvention
            </div>

            {/* Message Stream */}
            <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {campaign.messageThreads?.[0]?.messages?.map((msg: any) => (
                <div
                  key={msg.id}
                  style={{
                    alignSelf: msg.senderRole === (isCreator ? 'CREATOR' : 'BRAND') ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    padding: '8px 12px',
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: msg.senderRole === (isCreator ? 'CREATOR' : 'BRAND') ? 'var(--brand-primary-subtle)' : 'var(--bg-secondary)',
                    fontSize: '13px',
                  }}
                >
                  <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '3px' }}>
                    {msg.sender?.name} ({msg.senderRole}) • {new Date(msg.createdAt).toLocaleTimeString()}
                  </div>
                  <div>{msg.content}</div>
                </div>
              ))}
            </div>

            {/* Message Input Form */}
            <form onSubmit={handleSendMessage} style={{ display: 'flex', borderTop: '1px solid var(--border-subtle)', padding: '8px' }}>
              <input
                type="text"
                className="tia-input"
                placeholder="Type a message within TIA..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                style={{ flex: 1, borderRight: 'none' }}
              />
              <button type="submit" className="tia-btn-primary" style={{ padding: '8px 16px' }}>
                Send
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 5: Content Submissions & Review */}
      {activeTab === 'content' && (
        <div style={{ maxWidth: '840px' }}>
          {!activeDeliverable ? (
            <EmptyState title="No Active Deliverable" description="Content deliverable tracking will activate once contract is executed." />
          ) : (
            <div>
              <div style={{ border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-primary)', padding: '20px', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>{activeDeliverable.title}</h3>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                  Platform: <strong>{activeDeliverable.platform}</strong> • Status: <strong>{activeDeliverable.status}</strong>
                </div>

                {isCreator && (
                  <form onSubmit={handleSubmitDeliverable} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>Deliverable File URL / Preview Link</label>
                    <input
                      type="url"
                      required
                      className="tia-input"
                      value={deliverableFileUrl}
                      onChange={(e) => setDeliverableFileUrl(e.target.value)}
                      placeholder="https://storage.provider.com/deliverable_v1.mp4"
                    />
                    <button type="submit" className="tia-btn-primary" style={{ alignSelf: 'flex-start', padding: '8px 16px' }}>
                      Submit Deliverable for Review
                    </button>
                  </form>
                )}
              </div>

              {/* Submissions List */}
              {activeDeliverable.submissions?.map((sub: any) => (
                <div key={sub.id} style={{ border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-primary)', padding: '16px', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <div style={{ fontWeight: 700 }}>Version {sub.version} ({sub.fileName})</div>
                    <span className="tia-badge">{sub.status}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--brand-primary)', marginBottom: '10px' }}>
                    <a href={sub.fileUrl} target="_blank" rel="noopener noreferrer">View Submitted Asset ↗</a>
                  </div>

                  {isBrand && sub.status === 'SUBMITTED' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
                      <button type="button" onClick={() => handleReviewSubmission(sub.id, 'APPROVE')} className="tia-btn-primary">
                        ✓ Approve Deliverable
                      </button>
                      <input
                        type="text"
                        className="tia-input"
                        placeholder="Reason for revision..."
                        value={revisionComment}
                        onChange={(e) => setRevisionComment(e.target.value)}
                      />
                      <button type="button" onClick={() => handleReviewSubmission(sub.id, 'REQUEST_REVISION')} className="tia-btn-secondary">
                        Request Revision
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 6: Escrow & Financial Ledger */}
      {activeTab === 'finance' && (
        <div style={{ maxWidth: '840px' }}>
          <div style={{ border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-primary)', padding: '20px', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '14px' }}>Campaign Financial Ledger & Escrow</h2>
            <div className="tia-table-container" style={{ marginBottom: '16px' }}>
              <table className="tia-table">
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 600 }}>Total Agreed Campaign Consideration</td>
                    <td className="font-tabular" style={{ fontWeight: 700 }}>₹{activeContract ? (activeContract.agreedAmount / 100).toLocaleString('en-IN') : '0'}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600 }}>TIA Platform Commission (5.00%)</td>
                    <td className="font-tabular" style={{ color: 'var(--brand-primary)', fontWeight: 700 }}>
                      ₹{activeContract ? (activeContract.commissionAmount / 100).toLocaleString('en-IN') : '0'}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600 }}>Creator Net Payout Allocation (95.00%)</td>
                    <td className="font-tabular" style={{ fontWeight: 700 }}>
                      ₹{activeContract ? (activeContract.creatorAllocationAmount / 100).toLocaleString('en-IN') : '0'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {isBrand && activeContract && activeContract.status === 'SIGNED' && campaign.status === 'CONTRACTED' && (
              <button type="button" onClick={() => handleEscrow('DEPOSIT')} className="tia-btn-primary" style={{ padding: '10px 20px', fontWeight: 700 }}>
                💳 Fund Campaign into Escrow (₹{(activeContract.agreedAmount / 100).toLocaleString('en-IN')})
              </button>
            )}

            {isBrand && activeContract && campaign.status === 'APPROVED' && (
              <button type="button" onClick={() => handleEscrow('RELEASE')} className="tia-btn-primary" style={{ padding: '10px 20px', fontWeight: 700, backgroundColor: '#059669', borderColor: '#059669' }}>
                ✓ Release Escrow Payout & Complete Campaign
              </button>
            )}
          </div>
        </div>
      )}

      {/* TAB 7: Disputes */}
      {activeTab === 'disputes' && (
        <div style={{ maxWidth: '840px' }}>
          <div style={{ border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-primary)', padding: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '10px' }}>Dispute Resolution Desk</h2>
            <form onSubmit={handleOpenDispute} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                  Dispute Reason
                </label>
                <select className="tia-input" value={disputeReason} onChange={(e) => setDisputeReason(e.target.value)}>
                  <option value="DELIVERABLES">Deliverables Non-compliance</option>
                  <option value="DEADLINES">Missed Deadlines</option>
                  <option value="QUALITY">Quality Deficiencies</option>
                  <option value="PAYMENT">Payment Dispute</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  className="tia-input"
                  value={disputeDesc}
                  onChange={(e) => setDisputeDesc(e.target.value)}
                  placeholder="Explain the dispute issue..."
                />
              </div>

              <button type="submit" className="tia-btn-danger" style={{ alignSelf: 'flex-start', padding: '8px 16px' }}>
                Open Dispute
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
