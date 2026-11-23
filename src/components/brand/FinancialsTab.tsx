import React from 'react';
import { DownloadIcon } from '@/components/dashboard/icons';
import { BrandTransaction } from './types';

interface FinancialsTabProps {
  walletBalance: number;
  transactionsLedger: BrandTransaction[];
  onOpenAddFunds: () => void;
  onDownloadInvoice: (txId: string) => void;
}

export function FinancialsTab({
  walletBalance,
  transactionsLedger,
  onOpenAddFunds,
  onDownloadInvoice,
}: FinancialsTabProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top 4 Financial KPI Stat Cards */}
      <div className="brand-kpi-grid">
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>
            Total Committed Budget
          </div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#0F172A', marginTop: '4px' }}>
            ₹7,80,000
          </div>
          <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '4px' }}>
            Across 3 Active Campaigns
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>
            Held in Payment Protection
          </div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#0052FF', marginTop: '4px' }}>
            ₹1,10,000
          </div>
          <div style={{ fontSize: '11.5px', color: '#059669', fontWeight: 700, marginTop: '4px' }}>
            100% Secured in TIA Escrow
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>
            Disbursed to Creators
          </div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#059669', marginTop: '4px' }}>
            ₹85,000
          </div>
          <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '4px' }}>
            Approved Milestone Payouts
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>
            Platform Commission
          </div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#0F172A', marginTop: '4px' }}>
            5.00%
          </div>
          <div style={{ fontSize: '11.5px', color: '#0052FF', fontWeight: 700, marginTop: '4px' }}>
            + 1% TDS Compliant (Sec 194J)
          </div>
        </div>
      </div>

      {/* Wallet Action & Policy Banner */}
      <div style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '14px', padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#1E40AF', margin: 0 }}>
            Available Wallet Balance: ₹{walletBalance.toLocaleString('en-IN')}.00
          </h4>
          <p style={{ fontSize: '12.5px', color: '#3B82F6', margin: '3px 0 0 0' }}>
            Funds are held in dedicated RBI-compliant accounts and released only when deliverables meet brief requirements.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenAddFunds}
          style={{
            padding: '9px 18px',
            backgroundColor: '#0052FF',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,82,255,0.25)',
          }}
        >
          + Add Funds to Wallet
        </button>
      </div>

      {/* Transactions Ledger Table */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
            Payment Protection Financial Ledger
          </h3>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontWeight: 700, fontSize: '11.5px', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 18px' }}>Tx ID & Date</th>
                <th style={{ padding: '12px 18px' }}>Campaign & Creator</th>
                <th style={{ padding: '12px 18px' }}>Gross Budget</th>
                <th style={{ padding: '12px 18px' }}>5% TIA Fee</th>
                <th style={{ padding: '12px 18px' }}>Net Creator</th>
                <th style={{ padding: '12px 18px' }}>Status</th>
                <th style={{ padding: '12px 18px' }}>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {transactionsLedger.map((tx) => (
                <tr key={tx.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ fontWeight: 800, color: '#0F172A' }}>{tx.id}</div>
                    <div style={{ fontSize: '11px', color: '#94A3B8' }}>{tx.date}</div>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ fontWeight: 700, color: '#0F172A' }}>{tx.campaign}</div>
                    <div style={{ fontSize: '11.5px', color: '#0052FF' }}>{tx.creator}</div>
                  </td>
                  <td style={{ padding: '14px 18px', fontWeight: 800, color: '#0F172A' }}>
                    ₹{tx.grossAmount.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '14px 18px', color: '#64748B' }}>
                    ₹{tx.tiaFee.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '14px 18px', fontWeight: 800, color: '#059669' }}>
                    ₹{tx.netCreator.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 800,
                        color: tx.status === 'DISBURSED' ? '#059669' : '#0052FF',
                        backgroundColor: tx.status === 'DISBURSED' ? '#ECFDF5' : '#EFF6FF',
                        padding: '3px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      {tx.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <button
                      type="button"
                      onClick={() => onDownloadInvoice(tx.id)}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#F1F5F9',
                        border: '1px solid #E2E8F0',
                        borderRadius: '6px',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        color: '#334155',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <DownloadIcon size={12} color="#475569" />
                      <span>Invoice</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
