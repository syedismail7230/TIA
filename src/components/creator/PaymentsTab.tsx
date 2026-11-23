import React from 'react';
import { CreatorPayment, CreatorBankAccount } from './types';

interface PaymentsTabProps {
  showCreditsStoreView: boolean;
  setShowCreditsStoreView: (b: boolean) => void;
  credits: number;
  storeSliderCredits: number;
  setStoreSliderCredits: (n: number) => void;
  handleBuyCredits: (count: number, costInr: number) => Promise<void>;
  payments: any[];
  invoiceSearchQuery: string;
  setInvoiceSearchQuery: (q: string) => void;
  invoiceFilterDropdownOpen: boolean;
  setInvoiceFilterDropdownOpen: (b: boolean | ((prev: boolean) => boolean)) => void;
  invoiceStatusFilter: 'ALL' | 'PAID' | 'UNPAID';
  setInvoiceStatusFilter: (s: 'ALL' | 'PAID' | 'UNPAID') => void;
  selectedCheckboxIds: string[];
  setSelectedCheckboxIds: React.Dispatch<React.SetStateAction<string[]>>;
  selectedInvoiceId: string;
  setSelectedInvoiceId: (id: string) => void;
  invoiceDetailOpen: boolean;
  setInvoiceDetailOpen: (b: boolean) => void;
  bankAccount: any;
  setShowBankModal: (b: boolean) => void;
  setSelectedReceiptTx: (tx: any) => void;
  handleDownloadDisbursalSlip: (tx: any) => Promise<void>;
  handleClaimPayout: (txId: string) => void;
  currentUser: any;
  isClaimingPayoutId: string | null;
  applyCredits: number;
}

export function PaymentsTab({
  showCreditsStoreView,
  setShowCreditsStoreView,
  credits,
  storeSliderCredits,
  setStoreSliderCredits,
  handleBuyCredits,
  payments,
  invoiceSearchQuery,
  setInvoiceSearchQuery,
  invoiceFilterDropdownOpen,
  setInvoiceFilterDropdownOpen,
  invoiceStatusFilter,
  setInvoiceStatusFilter,
  selectedCheckboxIds,
  setSelectedCheckboxIds,
  selectedInvoiceId,
  setSelectedInvoiceId,
  invoiceDetailOpen,
  setInvoiceDetailOpen,
  bankAccount,
  setShowBankModal,
  setSelectedReceiptTx,
  handleDownloadDisbursalSlip,
  handleClaimPayout,
  currentUser,
  isClaimingPayoutId,
  applyCredits,
}: PaymentsTabProps) {
  const selectedInvoice = payments.find((p) => p.id === selectedInvoiceId) || payments[0];
          const filteredInvoices = payments.filter((p) => {
            const matchesSearch =
              p.mediaName.toLowerCase().includes(invoiceSearchQuery.toLowerCase()) ||
              p.invoiceCode?.toLowerCase().includes(invoiceSearchQuery.toLowerCase()) ||
              p.campaign?.toLowerCase().includes(invoiceSearchQuery.toLowerCase());
            if (invoiceStatusFilter === 'PAID') return matchesSearch && p.status === 'PAID';
            if (invoiceStatusFilter === 'UNPAID') return matchesSearch && p.status === 'UNCLAIMED';
            return matchesSearch;
          });

          // Dynamic metric totals
          const totalInvoicedGross = payments.reduce((acc, curr) => acc + (curr.grossAmount || 0), 0);
          const totalPaidGross = payments.filter((p) => p.status === 'PAID').reduce((acc, curr) => acc + (curr.grossAmount || 0), 0);
          const totalUnpaidGross = payments.filter((p) => p.status === 'UNCLAIMED').reduce((acc, curr) => acc + (curr.grossAmount || 0), 0);
          const paidCount = payments.filter((p) => p.status === 'PAID').length;
          const unpaidCount = payments.filter((p) => p.status === 'UNCLAIMED').length;

          // Pricing calculation helper for Buy Credits view
          const getCreditPricing = (qty: number) => {
            const baseUnitRate = 99;
            const baseTotal = qty * baseUnitRate;
            let discountPct = 0;
            if (qty >= 50) discountPct = 0.35;
            else if (qty >= 25) discountPct = 0.25;
            else if (qty >= 10) discountPct = 0.15;
            else if (qty >= 5) discountPct = 0.10;

            const discountAmount = Math.round(baseTotal * discountPct);
            const finalAmount = baseTotal - discountAmount;
            return {
              qty,
              baseTotal,
              discountPct: Math.round(discountPct * 100),
              discountAmount,
              finalAmount,
            };
          };

          const activePricing = getCreditPricing(storeSliderCredits);

          return showCreditsStoreView ? (
            /* ==================================================================== */
            /* VIEW 2: BUY CREDITS STUDIO (ALIGNED WITH TIA WEBSITE THEME)          */
            /* ==================================================================== */
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '20px',
                padding: '32px 36px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
              }}
            >
              {/* Back Nav Link */}
              <div style={{ marginBottom: '22px' }}>
                <button
                  type="button"
                  onClick={() => setShowCreditsStoreView(false)}
                  style={{
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '20px',
                    padding: '6px 14px',
                    color: '#475569',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#EFF6FF';
                    e.currentTarget.style.color = '#0052FF';
                    e.currentTarget.style.borderColor = '#BFDBFE';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#F8FAFC';
                    e.currentTarget.style.color = '#475569';
                    e.currentTarget.style.borderColor = '#E2E8F0';
                  }}
                >
                  <span style={{ fontSize: '14px' }}>←</span>
                  <span>Back to Invoices</span>
                </button>
              </div>

              {/* Split Content: Left (Slider & Packages), Right (Recap Order Summary) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.8fr) minmax(280px, 1fr)', gap: '40px', alignItems: 'flex-start' }}>
                {/* Left Column */}
                <div>
                  <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0F172A', margin: '0 0 4px 0', letterSpacing: '-0.02em' }}>
                    Buy Credits
                  </h2>
                  <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 28px 0' }}>
                    Select the amount of credits you want to buy for pitching and campaign applications
                  </p>

                  {/* Big Dynamic Price */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '24px' }}>
                    <span style={{ fontSize: '36px', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em' }}>
                      ₹{activePricing.finalAmount.toLocaleString('en-IN')}
                    </span>
                    {activePricing.discountAmount > 0 && (
                      <span style={{ fontSize: '16px', color: '#94A3B8', textDecoration: 'line-through' }}>
                        ₹{activePricing.baseTotal.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  {/* Custom Dynamic Interactive Slider Track matching Inspiration UI */}
                  <div style={{ position: 'relative', marginBottom: '42px', maxWidth: '580px', paddingTop: '16px', paddingBottom: '10px' }}>
                    {/* Background Track */}
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '10px',
                        backgroundColor: '#F1F5F9',
                        borderRadius: '999px',
                        border: '1px solid #E2E8F0',
                        overflow: 'visible',
                      }}
                    >
                      {/* Active Blue Filled Track */}
                      <div
                        style={{
                          height: '100%',
                          width: `${((storeSliderCredits - 1) / 99) * 100}%`,
                          backgroundColor: '#0052FF',
                          borderRadius: '999px',
                          transition: 'width 0.05s ease',
                        }}
                      />

                      {/* Custom Floating Thumb Knob Pill */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: `${((storeSliderCredits - 1) / 99) * 100}%`,
                          transform: 'translate(-50%, -50%)',
                          backgroundColor: '#FFFFFF',
                          border: '2px solid #0052FF',
                          borderRadius: '24px',
                          padding: '4px 12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          boxShadow: '0 4px 14px rgba(0, 82, 255, 0.28), 0 2px 6px rgba(0,0,0,0.06)',
                          pointerEvents: 'none',
                          userSelect: 'none',
                          zIndex: 2,
                          whiteSpace: 'nowrap',
                          transition: 'left 0.05s ease',
                        }}
                      >
                        <span style={{ fontSize: '11px', color: '#0052FF' }}>⚡</span>
                        <span style={{ fontSize: '13px', fontWeight: 900, color: '#0F172A' }}>{storeSliderCredits}</span>
                      </div>
                    </div>

                    {/* Invisible full-interactive native range overlay */}
                    <input
                      type="range"
                      min="1"
                      max="100"
                      step="1"
                      value={storeSliderCredits}
                      onChange={(e) => setStoreSliderCredits(parseInt(e.target.value, 10))}
                      style={{
                        position: 'absolute',
                        top: '6px',
                        left: 0,
                        width: '100%',
                        height: '32px',
                        opacity: 0,
                        cursor: 'pointer',
                        zIndex: 4,
                        margin: 0,
                      }}
                    />

                    {/* Min / Max Labels below slider */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '18px', fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>
                      <span style={{ cursor: 'pointer' }} onClick={() => setStoreSliderCredits(1)}>1 Credit</span>
                      {activePricing.discountPct > 0 ? (
                        <span
                          style={{
                            backgroundColor: '#ECFDF5',
                            color: '#059669',
                            border: '1px solid #A7F3D0',
                            padding: '3px 10px',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: 700,
                          }}
                        >
                          🎉 {activePricing.discountPct}% Bulk Discount Applied
                        </span>
                      ) : (
                        <span style={{ fontSize: '11px', color: '#64748B' }}>Drag to customize</span>
                      )}
                      <span style={{ cursor: 'pointer' }} onClick={() => setStoreSliderCredits(100)}>100 Credits</span>
                    </div>
                  </div>

                  {/* Section Heading */}
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginBottom: '14px' }}>
                    Or select our packages
                  </div>

                  {/* 4 Sleek White/Blue Package Cards matching TIA theme */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 125px), 1fr))', gap: '12px' }}>
                    {/* Package 1: 5 Credits */}
                    <div
                      onClick={() => setStoreSliderCredits(5)}
                      style={{
                        backgroundColor: storeSliderCredits === 5 ? '#F8FAFC' : '#FFFFFF',
                        borderRadius: '16px',
                        padding: '16px 14px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        border: storeSliderCredits === 5 ? '2px solid #0052FF' : '1px solid #E2E8F0',
                        boxShadow: storeSliderCredits === 5 ? '0 4px 16px rgba(0, 82, 255, 0.08)' : '0 1px 3px rgba(0,0,0,0.02)',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div>
                        <div style={{ backgroundColor: '#EFF6FF', color: '#0052FF', border: '1px solid #BFDBFE', borderRadius: '20px', padding: '3px 8px', fontSize: '11px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
                          <span>⚡</span>
                          <span>5</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px', marginBottom: '3px' }}>
                          <span style={{ fontSize: '19px', fontWeight: 900, color: '#0F172A' }}>₹445</span>
                          <span style={{ fontSize: '11px', color: '#94A3B8', textDecoration: 'line-through' }}>₹495</span>
                        </div>
                        <div style={{ fontSize: '10.5px', color: '#059669', fontWeight: 700, marginBottom: '14px' }}>
                          10% discount
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBuyCredits(5, 445);
                          setShowCreditsStoreView(false);
                        }}
                        style={{
                          width: '100%',
                          backgroundColor: storeSliderCredits === 5 ? '#0052FF' : '#F1F5F9',
                          color: storeSliderCredits === 5 ? '#FFFFFF' : '#0F172A',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '7px',
                          fontSize: '11.5px',
                          fontWeight: 800,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        Buy now
                      </button>
                    </div>

                    {/* Package 2: 15 Credits */}
                    <div
                      onClick={() => setStoreSliderCredits(15)}
                      style={{
                        backgroundColor: storeSliderCredits === 15 ? '#F8FAFC' : '#FFFFFF',
                        borderRadius: '16px',
                        padding: '16px 14px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        border: storeSliderCredits === 15 ? '2px solid #0052FF' : '1px solid #E2E8F0',
                        boxShadow: storeSliderCredits === 15 ? '0 4px 16px rgba(0, 82, 255, 0.08)' : '0 1px 3px rgba(0,0,0,0.02)',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div>
                        <div style={{ backgroundColor: '#EFF6FF', color: '#0052FF', border: '1px solid #BFDBFE', borderRadius: '20px', padding: '3px 8px', fontSize: '11px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
                          <span>⚡</span>
                          <span>15</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px', marginBottom: '3px' }}>
                          <span style={{ fontSize: '19px', fontWeight: 900, color: '#0F172A' }}>₹1,260</span>
                          <span style={{ fontSize: '11px', color: '#94A3B8', textDecoration: 'line-through' }}>₹1,485</span>
                        </div>
                        <div style={{ fontSize: '10.5px', color: '#059669', fontWeight: 700, marginBottom: '14px' }}>
                          15% discount
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBuyCredits(15, 1260);
                          setShowCreditsStoreView(false);
                        }}
                        style={{
                          width: '100%',
                          backgroundColor: storeSliderCredits === 15 ? '#0052FF' : '#F1F5F9',
                          color: storeSliderCredits === 15 ? '#FFFFFF' : '#0F172A',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '7px',
                          fontSize: '11.5px',
                          fontWeight: 800,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        Buy now
                      </button>
                    </div>

                    {/* Package 3: 35 Credits (People's Choice - green badge!) */}
                    <div
                      onClick={() => setStoreSliderCredits(35)}
                      style={{
                        backgroundColor: storeSliderCredits === 35 ? '#F8FAFC' : '#FFFFFF',
                        borderRadius: '16px',
                        padding: '16px 14px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        border: storeSliderCredits === 35 ? '2px solid #0052FF' : '1px solid #E2E8F0',
                        boxShadow: storeSliderCredits === 35 ? '0 6px 20px rgba(0, 82, 255, 0.12)' : '0 1px 3px rgba(0,0,0,0.02)',
                        transition: 'all 0.15s ease',
                        position: 'relative',
                      }}
                    >
                      {/* Green People Choice Tag */}
                      <span
                        style={{
                          position: 'absolute',
                          top: '-9px',
                          right: '8px',
                          backgroundColor: '#0052FF',
                          color: '#FFFFFF',
                          fontSize: '8px',
                          fontWeight: 800,
                          padding: '2px 7px',
                          borderRadius: '6px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.02em',
                          boxShadow: '0 2px 4px rgba(0, 82, 255, 0.25)',
                        }}
                      >
                        People Choice
                      </span>

                      <div>
                        <div style={{ backgroundColor: '#EFF6FF', color: '#0052FF', border: '1px solid #BFDBFE', borderRadius: '20px', padding: '3px 8px', fontSize: '11px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
                          <span>⚡</span>
                          <span>35</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px', marginBottom: '3px' }}>
                          <span style={{ fontSize: '19px', fontWeight: 900, color: '#0F172A' }}>₹2,590</span>
                          <span style={{ fontSize: '11px', color: '#94A3B8', textDecoration: 'line-through' }}>₹3,465</span>
                        </div>
                        <div style={{ fontSize: '10.5px', color: '#059669', fontWeight: 700, marginBottom: '14px' }}>
                          25% discount
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBuyCredits(35, 2590);
                          setShowCreditsStoreView(false);
                        }}
                        style={{
                          width: '100%',
                          backgroundColor: storeSliderCredits === 35 ? '#0052FF' : '#F1F5F9',
                          color: storeSliderCredits === 35 ? '#FFFFFF' : '#0F172A',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '7px',
                          fontSize: '11.5px',
                          fontWeight: 800,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        Buy now
                      </button>
                    </div>

                    {/* Package 4: 75 Credits */}
                    <div
                      onClick={() => setStoreSliderCredits(75)}
                      style={{
                        backgroundColor: storeSliderCredits === 75 ? '#F8FAFC' : '#FFFFFF',
                        borderRadius: '16px',
                        padding: '16px 14px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        border: storeSliderCredits === 75 ? '2px solid #0052FF' : '1px solid #E2E8F0',
                        boxShadow: storeSliderCredits === 75 ? '0 4px 16px rgba(0, 82, 255, 0.08)' : '0 1px 3px rgba(0,0,0,0.02)',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div>
                        <div style={{ backgroundColor: '#EFF6FF', color: '#0052FF', border: '1px solid #BFDBFE', borderRadius: '20px', padding: '3px 8px', fontSize: '11px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
                          <span>⚡</span>
                          <span>75</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px', marginBottom: '3px' }}>
                          <span style={{ fontSize: '19px', fontWeight: 900, color: '#0F172A' }}>₹4,820</span>
                          <span style={{ fontSize: '11px', color: '#94A3B8', textDecoration: 'line-through' }}>₹7,425</span>
                        </div>
                        <div style={{ fontSize: '10.5px', color: '#059669', fontWeight: 700, marginBottom: '14px' }}>
                          35% discount
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBuyCredits(75, 4820);
                          setShowCreditsStoreView(false);
                        }}
                        style={{
                          width: '100%',
                          backgroundColor: storeSliderCredits === 75 ? '#0052FF' : '#F1F5F9',
                          color: storeSliderCredits === 75 ? '#FFFFFF' : '#0F172A',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '7px',
                          fontSize: '11.5px',
                          fontWeight: 800,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        Buy now
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column: Recap Order Summary Panel */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '16px',
                    padding: '24px 22px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '360px',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '12.5px', color: '#64748B', fontWeight: 700, marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Order Summary
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F1F5F9', paddingBottom: '10px' }}>
                        <span style={{ color: '#475569', fontWeight: 600 }}>{storeSliderCredits} Application Credits</span>
                        <span style={{ fontWeight: 700, color: '#0F172A' }}>₹{activePricing.baseTotal.toLocaleString('en-IN')}</span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F1F5F9', paddingBottom: '10px' }}>
                        <span style={{ color: '#475569', fontWeight: 600 }}>Platform Processing</span>
                        <span style={{ fontWeight: 700, color: '#059669' }}>Free</span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F1F5F9', paddingBottom: '10px' }}>
                        <span style={{ color: '#475569', fontWeight: 600 }}>GST / Taxes</span>
                        <span style={{ fontWeight: 700, color: '#64748B' }}>Included</span>
                      </div>

                      {activePricing.discountAmount > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F1F5F9', paddingBottom: '10px' }}>
                          <span style={{ color: '#059669', fontWeight: 600 }}>Bundle Savings ({activePricing.discountPct}%)</span>
                          <span style={{ fontWeight: 700, color: '#059669' }}>-₹{activePricing.discountAmount.toLocaleString('en-IN')}</span>
                        </div>
                      )}

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px' }}>
                        <span style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>Total</span>
                        <span style={{ fontSize: '22px', fontWeight: 900, color: '#0052FF' }}>₹{activePricing.finalAmount.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      handleBuyCredits(storeSliderCredits, activePricing.finalAmount);
                      setShowCreditsStoreView(false);
                    }}
                    style={{
                      width: '100%',
                      backgroundColor: '#0052FF',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '13px',
                      fontSize: '13px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      marginTop: '24px',
                      boxShadow: '0 4px 14px rgba(0, 82, 255, 0.25)',
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0040D6')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0052FF')}
                  >
                    <span>⚡</span>
                    <span>Buy now • ₹{activePricing.finalAmount.toLocaleString('en-IN')}</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ==================================================================== */
            /* VIEW 1: INVOICES & PAYOUTS STUDIO (4-CARD SPLIT VIEW)                */
            /* ==================================================================== */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* TOP ROW: 4 STATS CARDS (Mobile 2x2 Grid, Desktop 4-Col Grid) */}
              <div className="payments-stats-grid">
                {/* Card 1: Total Earnings */}
                <div
                  className="payments-stat-card"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '16px',
                    padding: '20px 22px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '7px',
                          backgroundColor: '#F1F5F9',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#334155',
                          flexShrink: 0,
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="1" x2="12" y2="23" />
                          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                      </div>
                      <span className="payments-stat-label" style={{ fontSize: '13px', color: '#64748B', fontWeight: 700 }}>Total Earnings</span>
                    </div>
                  </div>
                  <div className="payments-stat-value" style={{ fontSize: '26px', fontWeight: 900, color: '#0F172A', margin: '12px 0 8px 0', letterSpacing: '-0.02em' }}>
                    ₹{totalInvoicedGross.toLocaleString('en-IN')}.00
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="payments-stat-subtext" style={{ fontSize: '11.5px', color: '#94A3B8' }}>Gross earnings</span>
                    <span
                      className="payments-stat-badge"
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#059669',
                        backgroundColor: '#ECFDF5',
                        border: '1px solid #A7F3D0',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px',
                      }}
                    >
                      <span>6%</span>
                      <span>↗</span>
                    </span>
                  </div>
                </div>

                {/* Card 2: Paid Earnings */}
                <div
                  className="payments-stat-card"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '16px',
                    padding: '20px 22px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '7px',
                          backgroundColor: '#ECFDF5',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#059669',
                          flexShrink: 0,
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                      </div>
                      <span className="payments-stat-label" style={{ fontSize: '13px', color: '#64748B', fontWeight: 700 }}>Paid Earnings</span>
                    </div>
                  </div>
                  <div className="payments-stat-value" style={{ fontSize: '26px', fontWeight: 900, color: '#0F172A', margin: '12px 0 8px 0', letterSpacing: '-0.02em' }}>
                    ₹{totalPaidGross.toLocaleString('en-IN')}.00
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="payments-stat-subtext" style={{ fontSize: '11.5px', color: '#94A3B8' }}>{paidCount} brand payouts</span>
                    <span
                      className="payments-stat-badge"
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#059669',
                        backgroundColor: '#ECFDF5',
                        border: '1px solid #A7F3D0',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px',
                      }}
                    >
                      <span>8%</span>
                      <span>↗</span>
                    </span>
                  </div>
                </div>

                {/* Card 3: Pending Earnings */}
                <div
                  className="payments-stat-card"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '16px',
                    padding: '20px 22px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '7px',
                          backgroundColor: '#FFF7ED',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#EA580C',
                          flexShrink: 0,
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                      </div>
                      <span className="payments-stat-label" style={{ fontSize: '13px', color: '#64748B', fontWeight: 700 }}>Pending Earnings</span>
                    </div>
                  </div>
                  <div className="payments-stat-value" style={{ fontSize: '26px', fontWeight: 900, color: '#0F172A', margin: '12px 0 8px 0', letterSpacing: '-0.02em' }}>
                    ₹{totalUnpaidGross.toLocaleString('en-IN')}.00
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="payments-stat-subtext" style={{ fontSize: '11.5px', color: '#94A3B8' }}>{unpaidCount} ready to claim</span>
                    <span
                      className="payments-stat-badge"
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#059669',
                        backgroundColor: '#ECFDF5',
                        border: '1px solid #A7F3D0',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px',
                      }}
                    >
                      <span>6%</span>
                      <span>↗</span>
                    </span>
                  </div>
                </div>

                {/* Card 4: Credits Wallet (Clicking Transforms Page!) */}
                <div
                  onClick={() => setShowCreditsStoreView(true)}
                  className="payments-stat-card"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid #BFDBFE',
                    borderRadius: '16px',
                    padding: '20px 22px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 8px rgba(0, 82, 255, 0.04)',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '7px',
                          backgroundColor: '#EFF6FF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#0052FF',
                          flexShrink: 0,
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                        </svg>
                      </div>
                      <span className="payments-stat-label" style={{ fontSize: '13px', color: '#1E40AF', fontWeight: 700 }}>Credits Wallet</span>
                    </div>
                  </div>
                  <div className="payments-stat-value" style={{ fontSize: '26px', fontWeight: 900, color: '#0052FF', margin: '12px 0 8px 0', letterSpacing: '-0.02em' }}>
                    {applyCredits} {applyCredits === 1 ? 'Credit' : 'Credits'}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="payments-stat-subtext" style={{ fontSize: '11.5px', color: '#64748B' }}>Available Balance</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowCreditsStoreView(true);
                      }}
                      style={{
                        backgroundColor: '#0052FF',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '4px 10px',
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(0, 82, 255, 0.2)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <span>Top Up</span>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* SPLIT TRANSACTIONS WORKSPACE (TABLE ON LEFT, DETAILS INSPECTOR ON RIGHT / BOTTOM SHEET ON MOBILE) */}
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                {/* LEFT: TRANSACTIONS HISTORY (DESKTOP TABLE & MOBILE FEED) */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '16px',
                    padding: '20px',
                    flex: '1 1 540px',
                    minWidth: 0,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                  }}
                >
                  {/* Table Header Toolbar */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                      Transactions History
                    </h3>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      {/* Search Input */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          backgroundColor: '#F8FAFC',
                          border: '1px solid #E2E8F0',
                          borderRadius: '20px',
                          padding: '6px 12px',
                          fontSize: '12px',
                          color: '#64748B',
                        }}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                          type="text"
                          value={invoiceSearchQuery}
                          onChange={(e) => setInvoiceSearchQuery(e.target.value)}
                          placeholder="Search transactions..."
                          style={{
                            border: 'none',
                            backgroundColor: 'transparent',
                            outline: 'none',
                            fontSize: '12px',
                            color: '#0F172A',
                            width: '140px',
                          }}
                        />
                      </div>

                      {/* Filter Button */}
                      <div style={{ position: 'relative' }}>
                        <button
                          type="button"
                          onClick={() => setInvoiceFilterDropdownOpen(!invoiceFilterDropdownOpen)}
                          style={{
                            backgroundColor: invoiceStatusFilter !== 'ALL' ? '#EFF6FF' : '#FFFFFF',
                            border: '1px solid',
                            borderColor: invoiceStatusFilter !== 'ALL' ? '#0052FF' : '#E2E8F0',
                            borderRadius: '8px',
                            padding: '6px 12px',
                            fontSize: '12px',
                            fontWeight: 600,
                            color: invoiceStatusFilter !== 'ALL' ? '#0052FF' : '#64748B',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                          }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                          </svg>
                          <span>{invoiceStatusFilter === 'ALL' ? 'Filter' : invoiceStatusFilter === 'PAID' ? 'Paid' : 'Unpaid'}</span>
                        </button>

                        {invoiceFilterDropdownOpen && (
                          <div
                            style={{
                              position: 'absolute',
                              top: '100%',
                              right: 0,
                              marginTop: '6px',
                              backgroundColor: '#FFFFFF',
                              border: '1px solid #E2E8F0',
                              borderRadius: '10px',
                              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                              padding: '6px',
                              zIndex: 20,
                              minWidth: '140px',
                            }}
                          >
                            {(['ALL', 'PAID', 'UNPAID'] as const).map((filterOpt) => (
                              <button
                                key={filterOpt}
                                type="button"
                                onClick={() => {
                                  setInvoiceStatusFilter(filterOpt);
                                  setInvoiceFilterDropdownOpen(false);
                                }}
                                style={{
                                  width: '100%',
                                  padding: '6px 10px',
                                  textAlign: 'left',
                                  fontSize: '12px',
                                  fontWeight: 600,
                                  backgroundColor: invoiceStatusFilter === filterOpt ? '#EFF6FF' : 'transparent',
                                  color: invoiceStatusFilter === filterOpt ? '#0052FF' : '#334155',
                                  border: 'none',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                }}
                              >
                                {filterOpt === 'ALL' ? 'All Transactions' : filterOpt === 'PAID' ? 'Paid Only' : 'Unpaid Only'}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* DESKTOP TABLE VIEW (> 768px) */}
                  <div className="desktop-table-view" style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', minWidth: '500px', borderCollapse: 'collapse', textAlign: 'left' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid #F1F5F9', fontSize: '11.5px', color: '#94A3B8', fontWeight: 600 }}>
                          <th style={{ padding: '10px 12px', width: '32px' }}>
                            <input
                              type="checkbox"
                              checked={selectedCheckboxIds.length === filteredInvoices.length && filteredInvoices.length > 0}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedCheckboxIds(filteredInvoices.map((inv) => inv.id));
                                } else {
                                  setSelectedCheckboxIds([]);
                                }
                              }}
                              style={{ accentColor: '#0052FF', cursor: 'pointer' }}
                            />
                          </th>
                          <th style={{ padding: '10px 12px' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                              <span>Txn ID</span>
                              <span style={{ fontSize: '9px' }}>↕</span>
                            </div>
                          </th>
                          <th style={{ padding: '10px 12px' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                              <span>Description</span>
                              <span style={{ fontSize: '9px' }}>↕</span>
                            </div>
                          </th>
                          <th style={{ padding: '10px 12px' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                              <span>Date</span>
                              <span style={{ fontSize: '9px' }}>↕</span>
                            </div>
                          </th>
                          <th style={{ padding: '10px 12px' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                              <span>Status</span>
                              <span style={{ fontSize: '9px' }}>↕</span>
                            </div>
                          </th>
                          <th style={{ padding: '10px 12px', textAlign: 'right' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer', justifyContent: 'flex-end', width: '100%' }}>
                              <span>Amount</span>
                              <span style={{ fontSize: '9px' }}>↕</span>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredInvoices.length === 0 ? (
                          <tr>
                            <td colSpan={6} style={{ textAlign: 'center', padding: '48px 20px', color: '#94A3B8' }}>
                              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px auto', color: '#64748B' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="12" cy="12" r="10" />
                                  <line x1="12" y1="8" x2="12" y2="12" />
                                  <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                              </div>
                              <div style={{ fontSize: '14px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>No Transactions Found</div>
                              <div style={{ fontSize: '12px' }}>Complete brand collaborations to earn payouts and track disbursements here.</div>
                            </td>
                          </tr>
                        ) : (
                          filteredInvoices.map((invoice) => {
                            const isSelected = selectedInvoice?.id === invoice.id;
                            const isChecked = selectedCheckboxIds.includes(invoice.id);
                            const isPaid = invoice.status === 'PAID';

                            return (
                              <tr
                                key={invoice.id}
                                onClick={() => {
                                  setSelectedInvoiceId(invoice.id);
                                  setInvoiceDetailOpen(true);
                                }}
                                style={{
                                  borderBottom: '1px solid #F8FAFC',
                                  fontSize: '12.5px',
                                  backgroundColor: isSelected ? '#F0F7FF' : 'transparent',
                                  cursor: 'pointer',
                                  transition: 'background-color 0.12s ease',
                                }}
                                onMouseEnter={(e) => {
                                  if (!isSelected) e.currentTarget.style.backgroundColor = '#F8FAFC';
                                }}
                                onMouseLeave={(e) => {
                                  if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                              >
                                <td style={{ padding: '12px', width: '32px' }} onClick={(e) => e.stopPropagation()}>
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setSelectedCheckboxIds([...selectedCheckboxIds, invoice.id]);
                                      } else {
                                        setSelectedCheckboxIds(selectedCheckboxIds.filter((id) => id !== invoice.id));
                                      }
                                    }}
                                    style={{ accentColor: '#0052FF', cursor: 'pointer' }}
                                  />
                                </td>
                                <td style={{ padding: '12px', fontWeight: 600, color: '#334155' }}>
                                  {invoice.invoiceCode || invoice.invoiceNumber?.slice(-7) || 'INV-PHA-0192'}
                                </td>
                                <td style={{ padding: '12px', fontWeight: 700, color: '#0F172A' }}>
                                  {invoice.mediaName}
                                </td>
                                <td style={{ padding: '12px', color: '#64748B' }}>
                                  {invoice.authorizedAt}
                                </td>
                                <td style={{ padding: '12px' }}>
                                  <span
                                    style={{
                                      fontSize: '11px',
                                      fontWeight: 700,
                                      padding: '3px 10px',
                                      borderRadius: '6px',
                                      backgroundColor: isPaid ? '#ECFDF5' : '#FFF7ED',
                                      color: isPaid ? '#059669' : '#EA580C',
                                      border: isPaid ? '1px solid #D1FAE5' : '1px solid #FFEDD5',
                                    }}
                                  >
                                    {isPaid ? 'Paid' : 'Unpaid'}
                                  </span>
                                </td>
                                <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#0F172A' }}>
                                  {invoice.priceFormatted || invoice.amount}
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* NATIVE MOBILE TRANSACTIONS FEED (<= 768px) */}
                  <div className="mobile-list-view">
                    {filteredInvoices.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '36px 16px', color: '#94A3B8', fontSize: '12.5px' }}>
                        No transactions yet. Complete brand deals to track payouts.
                      </div>
                    ) : (
                      filteredInvoices.map((invoice) => {
                      const isSelected = selectedInvoice?.id === invoice.id;
                      const isPaid = invoice.status === 'PAID';
                      const isCredit = invoice.id?.includes('cred');

                      return (
                        <div
                          key={invoice.id}
                          onClick={() => {
                            setSelectedInvoiceId(invoice.id);
                            setInvoiceDetailOpen(true);
                          }}
                          style={{
                            backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                            border: isSelected ? '1.5px solid #0052FF' : '1px solid #E2E8F0',
                            borderRadius: '14px',
                            padding: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '12px',
                            cursor: 'pointer',
                            boxShadow: isSelected ? '0 4px 12px rgba(0, 82, 255, 0.08)' : '0 1px 3px rgba(0, 0, 0, 0.02)',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          {/* Left Avatar + Details */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
                            <div
                              style={{
                                width: '38px',
                                height: '38px',
                                borderRadius: '10px',
                                backgroundColor: isCredit ? '#0052FF' : (invoice.logoBg || '#2563EB'),
                                color: '#FFFFFF',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '12px',
                                fontWeight: 900,
                                flexShrink: 0,
                              }}
                            >
                              {isCredit ? '⚡' : (invoice.initials || 'PH')}
                            </div>
                            <div style={{ minWidth: 0, flex: 1, overflow: 'hidden' }}>
                              <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {invoice.mediaName}
                              </div>
                              <div style={{ fontSize: '11px', color: '#64748B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '1px' }}>
                                {invoice.campaign}
                              </div>
                              <div style={{ fontSize: '10px', color: '#94A3B8', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span>{invoice.authorizedAt}</span>
                                <span>•</span>
                                <span style={{ fontFamily: 'monospace' }}>{invoice.invoiceCode || 'TXN-0192'}</span>
                              </div>
                            </div>
                          </div>

                          {/* Right Amount + Status Badge */}
                          <div style={{ textAlign: 'right', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                            <div style={{ fontSize: '14px', fontWeight: 900, color: '#0F172A' }}>
                              {invoice.priceFormatted || invoice.amount}
                            </div>
                            <span
                              style={{
                                fontSize: '10.5px',
                                fontWeight: 700,
                                padding: '2px 8px',
                                borderRadius: '6px',
                                backgroundColor: isPaid ? '#ECFDF5' : '#FFF7ED',
                                color: isPaid ? '#059669' : '#EA580C',
                                border: isPaid ? '1px solid #D1FAE5' : '1px solid #FFEDD5',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px',
                              }}
                            >
                              {isPaid ? '✓ Paid' : '⏳ Unpaid'}
                            </span>
                          </div>
                        </div>
                      );
                    }))}
                  </div>
                </div>

                {/* RIGHT COLUMN: TRANSACTION DETAILS INSPECTOR PANEL (DESKTOP RIGHT / MOBILE BOTTOM SHEET) */}
                {invoiceDetailOpen && selectedInvoice && (() => {
                  const isCreditPurchase = selectedInvoice.id?.includes('cred');
                  const isPaid = selectedInvoice.status === 'PAID';
                  const creatorName = currentUser?.name || 'Creator';
                  const creatorEmail = currentUser?.email || 'creator@example.com';

                  return (
                    <div
                      className="payments-inspector-wrapper"
                      onClick={(e) => {
                        if (e.target === e.currentTarget) setInvoiceDetailOpen(false);
                      }}
                    >
                      <div className="payments-inspector-sheet">
                        {/* Mobile Drag Handle Indicator */}
                        <div className="payments-sheet-drag-handle" />

                        {/* Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                          <div>
                            <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: '0 0 2px 0' }}>
                              Transaction Details
                            </h4>
                            <span style={{ fontSize: '11px', color: '#64748B' }}>
                              {selectedInvoice.invoiceCode || 'TXN-PHA-0192'}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setInvoiceDetailOpen(false)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#94A3B8',
                              fontSize: '15px',
                              cursor: 'pointer',
                              padding: '4px 6px',
                            }}
                          >
                            ✕
                          </button>
                        </div>

                        {/* From & To Entity Cards */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '12px', marginBottom: '18px' }}>
                          {/* From Entity */}
                          <div style={{ minWidth: 0, overflow: 'hidden' }}>
                            <div style={{ fontSize: '10.5px', color: '#94A3B8', fontWeight: 700, marginBottom: '6px', textTransform: 'uppercase' }}>
                              {isCreditPurchase ? 'From (You)' : 'From (Brand)'}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                              <div
                                style={{
                                  width: '32px',
                                  height: '32px',
                                  borderRadius: '8px',
                                  backgroundColor: isCreditPurchase ? '#0052FF' : (selectedInvoice.logoBg || '#2563EB'),
                                  color: '#FFFFFF',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '11px',
                                  fontWeight: 900,
                                  flexShrink: 0,
                                }}
                              >
                                {isCreditPurchase ? '⚡' : (selectedInvoice.initials || 'PH')}
                              </div>
                              <div style={{ minWidth: 0, overflow: 'hidden' }}>
                                <div style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {isCreditPurchase ? creatorName : (selectedInvoice.billedTo || selectedInvoice.mediaName)}
                                </div>
                                <div style={{ fontSize: '10.5px', color: '#94A3B8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {isCreditPurchase ? creatorEmail : selectedInvoice.city || 'India'}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* To Entity */}
                          <div style={{ minWidth: 0, overflow: 'hidden' }}>
                            <div style={{ fontSize: '10.5px', color: '#94A3B8', fontWeight: 700, marginBottom: '6px', textTransform: 'uppercase' }}>
                              {isCreditPurchase ? 'To (TIA)' : 'To (You / Creator)'}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                              <div
                                style={{
                                  width: '32px',
                                  height: '32px',
                                  borderRadius: '8px',
                                  backgroundColor: isCreditPurchase ? '#0F172A' : '#0052FF',
                                  color: '#FFFFFF',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '11px',
                                  fontWeight: 900,
                                  flexShrink: 0,
                                }}
                              >
                                {isCreditPurchase ? 'TIA' : 'YOU'}
                              </div>
                              <div style={{ minWidth: 0, overflow: 'hidden' }}>
                                <div style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {isCreditPurchase ? 'The Influencers Agency' : creatorName}
                                </div>
                                <div style={{ fontSize: '10.5px', color: '#94A3B8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {isCreditPurchase ? 'billing@theinfluencersagency.com' : creatorEmail}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Metadata Rows */}
                        <div
                          style={{
                            borderTop: '1px solid #F1F5F9',
                            borderBottom: '1px solid #F1F5F9',
                            padding: '12px 0',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                            marginBottom: '16px',
                            fontSize: '11.5px',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                            <span style={{ color: '#94A3B8', fontSize: '11px', fontWeight: 600 }}>Date</span>
                            <span style={{ fontWeight: 700, color: '#0F172A' }}>
                              {selectedInvoice.dueDate || selectedInvoice.authorizedAt}
                            </span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                            <span style={{ color: '#94A3B8', fontSize: '11px', fontWeight: 600, flexShrink: 0 }}>Subject</span>
                            <span style={{ fontWeight: 700, color: '#0F172A', textAlign: 'right', lineHeight: 1.35, maxWidth: '210px' }}>
                              {selectedInvoice.campaign}
                            </span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                            <span style={{ color: '#94A3B8', fontSize: '11px', fontWeight: 600, flexShrink: 0 }}>Entity</span>
                            <span style={{ fontWeight: 700, color: '#0F172A', textAlign: 'right', lineHeight: 1.35, maxWidth: '210px' }}>
                              {selectedInvoice.billedTo || selectedInvoice.mediaName}
                            </span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                            <span style={{ color: '#94A3B8', fontSize: '11px', fontWeight: 600 }}>Currency</span>
                            <span style={{ fontWeight: 700, color: '#0F172A' }}>
                              {selectedInvoice.currency || 'INR (₹ Indian Rupee)'}
                            </span>
                          </div>
                        </div>

                        {/* Itemized Table Card */}
                        <div
                          style={{
                            backgroundColor: '#F8FAFC',
                            borderRadius: '12px',
                            padding: '14px',
                            marginBottom: '18px',
                          }}
                        >
                          {/* Items Header */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', color: '#94A3B8', fontWeight: 600, borderBottom: '1px solid #E2E8F0', paddingBottom: '6px', marginBottom: '8px' }}>
                            <span>Description</span>
                            <span>Amount</span>
                          </div>

                          {/* Line Item */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', fontSize: '11.5px', color: '#334155', marginBottom: '12px', gap: '10px' }}>
                            <span style={{ fontWeight: 600, lineHeight: 1.4 }}>
                              {selectedInvoice.deliverableDesc || selectedInvoice.campaign}
                            </span>
                            <span style={{ fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap' }}>
                              {selectedInvoice.priceFormatted || selectedInvoice.amount}
                            </span>
                          </div>

                          {/* Summary Lines */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid #E2E8F0', paddingTop: '10px', fontSize: '11.5px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                              <span>Gross Contract Total</span>
                              <span style={{ fontWeight: 600, color: '#0F172A' }}>{selectedInvoice.priceFormatted || selectedInvoice.amount}</span>
                            </div>
                            {!isCreditPurchase && (
                              <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                                  <span>TIA Platform Fee (5% Commission)</span>
                                  <span style={{ fontWeight: 600, color: '#EA580C' }}>
                                    -₹{(selectedInvoice.platformFee || ((selectedInvoice.grossAmount || 0) * 0.05) || 1250).toLocaleString('en-IN')}.00
                                  </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                                  <span>TDS Deducted (1% Sec 194J)</span>
                                  <span style={{ fontWeight: 600, color: '#DC2626' }}>
                                    -₹{(selectedInvoice.tdsDeduction || ((selectedInvoice.grossAmount || 0) * 0.01) || 250).toLocaleString('en-IN')}.00
                                  </span>
                                </div>
                              </>
                            )}
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E2E8F0', paddingTop: '8px', marginTop: '2px', fontSize: '13px' }}>
                              <div>
                                <span style={{ fontWeight: 800, color: '#0F172A' }}>
                                  {isCreditPurchase ? 'Total Paid' : 'Net Disbursed by TIA'}
                                </span>
                                {!isCreditPurchase && (
                                  <div style={{ fontSize: '10.5px', color: '#64748B', fontWeight: 500 }}>Direct to Bank Account</div>
                                )}
                              </div>
                              <span style={{ fontWeight: 900, color: '#0052FF' }}>
                                ₹{(selectedInvoice.netAmount || 23500).toLocaleString('en-IN')}.00
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Verified Banner for Paid Tx */}
                        {isPaid && (
                          <div
                            style={{
                              backgroundColor: '#ECFDF5',
                              border: '1px solid #A7F3D0',
                              borderRadius: '12px',
                              padding: '12px 14px',
                              marginBottom: '14px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                            }}
                          >
                            <div
                              style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                backgroundColor: '#059669',
                                color: '#FFFFFF',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 900,
                                fontSize: '13px',
                                flexShrink: 0,
                              }}
                            >
                              ✓
                            </div>
                            <div>
                              <div style={{ fontSize: '12px', fontWeight: 800, color: '#065F46' }}>
                                Claim Verified & Disbursed
                              </div>
                              <div style={{ fontSize: '10.5px', color: '#047857', marginTop: '1px' }}>
                                Credited to {bankAccount?.bankName || 'HDFC Bank'} (•••• {bankAccount?.accountNumber ? bankAccount.accountNumber.slice(-4) : '0482'}) • UTR: {selectedInvoice.utrNumber || 'HDFC9821049219'}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Bottom Primary Action Button */}
                        {!isPaid ? (
                          <button
                            type="button"
                            disabled={isClaimingPayoutId === selectedInvoice.id}
                            onClick={() => handleClaimPayout(selectedInvoice.id)}
                            style={{
                              width: '100%',
                              padding: '13px',
                              backgroundColor: isClaimingPayoutId === selectedInvoice.id ? '#94A3B8' : '#0052FF',
                              color: '#FFFFFF',
                              border: 'none',
                              borderRadius: '12px',
                              fontSize: '13px',
                              fontWeight: 800,
                              cursor: isClaimingPayoutId === selectedInvoice.id ? 'wait' : 'pointer',
                              transition: 'all 0.15s ease',
                              boxShadow: isClaimingPayoutId === selectedInvoice.id ? 'none' : '0 4px 14px rgba(0, 82, 255, 0.25)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '8px',
                            }}
                            onMouseEnter={(e) => {
                              if (isClaimingPayoutId !== selectedInvoice.id) e.currentTarget.style.backgroundColor = '#0040D6';
                            }}
                            onMouseLeave={(e) => {
                              if (isClaimingPayoutId !== selectedInvoice.id) e.currentTarget.style.backgroundColor = '#0052FF';
                            }}
                          >
                            {isClaimingPayoutId === selectedInvoice.id ? (
                              <>
                                <div
                                  style={{
                                    width: '14px',
                                    height: '14px',
                                    border: '2px solid #FFFFFF',
                                    borderTopColor: 'transparent',
                                    borderRadius: '50%',
                                    animation: 'spin 0.8s linear infinite',
                                  }}
                                />
                                <span>Verifying & Disbursing Funds...</span>
                              </>
                            ) : (
                              <>
                                <span>⚡</span>
                                <span>Claim Payout to Bank (₹{(selectedInvoice.netAmount || 24750).toLocaleString('en-IN')})</span>
                              </>
                            )}
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setSelectedReceiptTx(selectedInvoice)}
                            style={{
                              width: '100%',
                              padding: '12px',
                              backgroundColor: '#F8FAFC',
                              color: '#0F172A',
                              border: '1px solid #CBD5E1',
                              borderRadius: '10px',
                              fontSize: '12.5px',
                              fontWeight: 800,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px',
                              transition: 'all 0.15s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#EFF6FF';
                              e.currentTarget.style.borderColor = '#BFDBFE';
                              e.currentTarget.style.color = '#0052FF';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#F8FAFC';
                              e.currentTarget.style.borderColor = '#CBD5E1';
                              e.currentTarget.style.color = '#0F172A';
                            }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="6 9 6 2 18 2 18 9" />
                              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                              <rect x="6" y="14" width="12" height="8" />
                            </svg>
                            <span>View Disbursal Slip / Voucher</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          );
}
