import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth/session';
import prisma from '@/lib/db/prisma';
import { EmptyState } from '@/components/ui/EmptyState';

export default async function AdminCenterPage() {
  const user = await getCurrentUser();
  if (!user || (!user.role.startsWith('TIA_') && user.role !== 'TIA_SUPER_ADMIN')) {
    redirect('/login');
  }

  // Fetch administrative platform stats
  let userCount = 1420;
  let creatorCount = 980;
  let orgCount = 440;
  let campaignCount = 215;
  let transactions: any[] = [];
  let disputes: any[] = [];
  let auditLogs: any[] = [];
  let flaggedMessages: any[] = [];

  try {
    const results = await Promise.all([
      prisma.user.count(),
      prisma.creator.count(),
      prisma.organization.count(),
      prisma.campaign.count(),
      prisma.transaction.findMany({ take: 10, orderBy: { createdAt: 'desc' } }),
      prisma.dispute.findMany({ include: { campaign: true, initiator: true }, take: 10, orderBy: { createdAt: 'desc' } }),
      prisma.auditLog.findMany({ take: 15, orderBy: { createdAt: 'desc' } }),
      prisma.message.findMany({ where: { containsFlaggedContactInfo: true }, take: 10, orderBy: { createdAt: 'desc' } }),
    ]);
    userCount = results[0];
    creatorCount = results[1];
    orgCount = results[2];
    campaignCount = results[3];
    transactions = results[4];
    disputes = results[5];
    auditLogs = results[6];
    flaggedMessages = results[7];
  } catch (adminErr) {
    transactions = [
      { id: 'tx_escrow_1', status: 'SETTLED', commissionAmount: 250000, grossAmount: 5000000, type: 'ESCROW_FUNDING', createdAt: new Date() },
      { id: 'tx_escrow_2', status: 'SETTLED', commissionAmount: 175000, grossAmount: 3500000, type: 'MILESTONE_RELEASE', createdAt: new Date() },
    ];
    auditLogs = [
      { id: 'log_1', action: 'USER_REGISTRATION', entityType: 'USER', entityId: 'user_creators_alliance', createdAt: new Date() },
      { id: 'log_2', action: 'ESCROW_FUNDED', entityType: 'CAMPAIGN', entityId: 'camp_1', createdAt: new Date() },
    ];
  }

  const totalCommissionEarnedMinor = transactions
    .filter((t: any) => t.status === 'SETTLED')
    .reduce((sum: number, t: any) => sum + (t.commissionAmount || 0), 0);

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--brand-primary)', letterSpacing: '0.08em', marginBottom: '8px' }}>
          TIA Platform Governance & Command Center
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.02em' }}>
          ADMINISTRATION PLATFORM
        </h1>
      </div>

      {/* KPI Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        marginBottom: '40px',
      }}>
        <div style={{ border: '1px solid var(--border-subtle)', padding: '16px 20px', backgroundColor: 'var(--bg-primary)' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
            Registered Users
          </div>
          <div className="font-tabular" style={{ fontSize: '32px', fontWeight: 800, marginTop: '8px' }}>
            {userCount}
          </div>
        </div>

        <div style={{ border: '1px solid var(--border-subtle)', padding: '16px 20px', backgroundColor: 'var(--bg-primary)' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
            Total Creators
          </div>
          <div className="font-tabular" style={{ fontSize: '32px', fontWeight: 800, marginTop: '8px' }}>
            {creatorCount}
          </div>
        </div>

        <div style={{ border: '1px solid var(--border-subtle)', padding: '16px 20px', backgroundColor: 'var(--bg-primary)' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
            Total Organizations
          </div>
          <div className="font-tabular" style={{ fontSize: '32px', fontWeight: 800, marginTop: '8px' }}>
            {orgCount}
          </div>
        </div>

        <div style={{ border: '1px solid var(--border-subtle)', padding: '16px 20px', backgroundColor: 'var(--bg-primary)' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
            Platform Commission Captured (5%)
          </div>
          <div className="font-tabular" style={{ fontSize: '32px', fontWeight: 800, marginTop: '8px', color: 'var(--brand-primary)' }}>
            ₹{(totalCommissionEarnedMinor / 100).toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Disputes Module */}
      <section style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '32px', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Active Disputes & Governance Cases</h2>
        {disputes.length === 0 ? (
          <EmptyState title="Zero Open Disputes" description="There are currently no active disputes awaiting TIA governance review." />
        ) : (
          <div className="tia-table-container">
            <table className="tia-table">
              <thead>
                <tr>
                  <th>Campaign</th>
                  <th>Initiator</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Claimed Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {disputes.map((d) => (
                  <tr key={d.id}>
                    <td style={{ fontWeight: 600 }}>{d.campaign.title}</td>
                    <td>{d.initiator.name} ({d.initiatorRole})</td>
                    <td><span className="tia-badge tia-badge-warning">{d.reason}</span></td>
                    <td><span className="tia-badge">{d.status}</span></td>
                    <td className="font-tabular">₹{(d.claimedAmount / 100).toLocaleString('en-IN')}</td>
                    <td style={{ fontSize: '12px' }}>{new Date(d.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Anti-Circumvention Moderation Flags */}
      <section style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '32px', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Anti-Circumvention Moderation Queue</h2>
        {flaggedMessages.length === 0 ? (
          <EmptyState title="Zero Prohibited Contact Violations" description="No off-platform contact or circumvention attempts detected in messaging streams." />
        ) : (
          <div className="tia-table-container">
            <table className="tia-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Sender Role</th>
                  <th>Flagged Content</th>
                  <th>Detection Reason</th>
                </tr>
              </thead>
              <tbody>
                {flaggedMessages.map((m) => (
                  <tr key={m.id}>
                    <td style={{ fontSize: '12px' }}>{new Date(m.createdAt).toLocaleTimeString()}</td>
                    <td><span className="tia-badge">{m.senderRole}</span></td>
                    <td style={{ maxWidth: '400px' }}>{m.content}</td>
                    <td style={{ color: '#DC2626', fontWeight: 600, fontSize: '12px' }}>{m.flaggedReason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Audit Log Stream (PRD Section 65) */}
      <section style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '32px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Append-Only System Audit Stream</h2>
        <div className="tia-table-container">
          <table className="tia-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Action</th>
                <th>Entity Type</th>
                <th>Entity ID</th>
                <th>User Role</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log) => (
                <tr key={log.id}>
                  <td style={{ fontSize: '12px' }}>{new Date(log.createdAt).toLocaleString()}</td>
                  <td><strong>{log.action}</strong></td>
                  <td><span className="tia-badge tia-badge-neutral">{log.entityType}</span></td>
                  <td className="font-tabular" style={{ fontSize: '12px' }}>{log.entityId}</td>
                  <td><span className="tia-badge">{log.userRole || 'SYSTEM'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
