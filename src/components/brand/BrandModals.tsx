import React from 'react';
import { CheckIcon, ShieldCheckIcon } from '@/components/dashboard/icons';

interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: {
    title: string;
    category: string;
    budget: string;
    deliverables: string;
    objectives: string;
  };
  onFormChange: (updated: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function CreateCampaignModal({
  isOpen,
  onClose,
  form,
  onFormChange,
  onSubmit,
}: CreateCampaignModalProps) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid #E2E8F0',
          padding: '28px 32px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              Create New Brand Campaign Brief
            </h3>
            <p style={{ fontSize: '12.5px', color: '#64748B', margin: '3px 0 0 0' }}>
              Publish your brief to verified creators across India with TIA Payment Protection.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', fontSize: '20px', color: '#94A3B8', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
              Campaign Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Flagship ANC Headphones Product Launch"
              value={form.title}
              onChange={(e) => onFormChange({ ...form, title: e.target.value })}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                Niche Category
              </label>
              <select
                value={form.category}
                onChange={(e) => onFormChange({ ...form, category: e.target.value })}
                style={{ width: '100%', padding: '9px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12.5px', backgroundColor: '#FFFFFF' }}
              >
                <option value="Consumer Tech">Consumer Tech</option>
                <option value="Fitness & Athletics">Fitness & Athletics</option>
                <option value="Lifestyle & Wellness">Lifestyle & Wellness</option>
                <option value="Gaming & Esports">Gaming & Esports</option>
                <option value="Finance & SaaS">Finance & SaaS</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                Total Budget Allocation (₹) *
              </label>
              <input
                type="number"
                required
                value={form.budget}
                onChange={(e) => onFormChange({ ...form, budget: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
              Deliverables Required *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 1x Dedicated YouTube Review + 2x IG Reels"
              value={form.deliverables}
              onChange={(e) => onFormChange({ ...form, deliverables: e.target.value })}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
              Campaign Objectives & Guidelines
            </label>
            <textarea
              rows={3}
              value={form.objectives}
              onChange={(e) => onFormChange({ ...form, objectives: e.target.value })}
              placeholder="Describe your product launch, key talking points, and audience criteria..."
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{ padding: '9px 16px', backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', fontSize: '12.5px', fontWeight: 700, cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ padding: '9px 20px', backgroundColor: '#0052FF', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '12.5px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,82,255,0.25)' }}
            >
              Publish Campaign Brief →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface AddFundsModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: string;
  onAmountChange: (amt: string) => void;
  isSuccess: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export function AddFundsModal({
  isOpen,
  onClose,
  amount,
  onAmountChange,
  isSuccess,
  onSubmit,
}: AddFundsModalProps) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid #E2E8F0',
          padding: '28px 32px',
          maxWidth: '480px',
          width: '100%',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              Top-Up Payment Protection Wallet
            </h3>
            <p style={{ fontSize: '12.5px', color: '#64748B', margin: '3px 0 0 0' }}>
              Add funds via Instant UPI, GPay, PhonePe, QR or Corporate NetBanking.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', fontSize: '20px', color: '#94A3B8', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>

        {isSuccess ? (
          <div style={{ padding: '24px 16px', textAlign: 'center' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px auto' }}>
              <CheckIcon size={20} color="#059669" />
            </div>
            <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#059669', margin: '0 0 4px 0' }}>
              Funds Added Successfully!
            </h4>
            <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0 }}>
              ₹{parseInt(amount, 10).toLocaleString('en-IN')} has been credited to your TIA Escrow Wallet.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                Deposit Amount (₹)
              </label>
              <input
                type="number"
                required
                value={amount}
                onChange={(e) => onAmountChange(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '15px', fontWeight: 800, color: '#0F172A' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              {['50000', '100000', '250000', '500000'].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => onAmountChange(preset)}
                  style={{
                    flex: 1,
                    padding: '6px 4px',
                    backgroundColor: amount === preset ? '#EFF6FF' : '#FFFFFF',
                    border: amount === preset ? '1px solid #0052FF' : '1px solid #E2E8F0',
                    color: amount === preset ? '#0052FF' : '#475569',
                    borderRadius: '6px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  ₹{(parseInt(preset, 10) / 1000)}k
                </button>
              ))}
            </div>

            <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #F1F5F9', fontSize: '12px', color: '#64748B' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span>Platform Settlement:</span>
                <span style={{ fontWeight: 700, color: '#059669' }}>Instant Penny-Drop Verified</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>GST Credit Invoice:</span>
                <span style={{ fontWeight: 700, color: '#0F172A' }}>Automated (Sec 194J)</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
              <button
                type="button"
                onClick={onClose}
                style={{ padding: '9px 16px', backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', fontSize: '12.5px', fontWeight: 700, cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{ padding: '9px 20px', backgroundColor: '#0052FF', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '12.5px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,82,255,0.25)' }}
              >
                Authorize Deposit →
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

interface CreatorProfileDrawerProps {
  creator: any | null;
  onClose: () => void;
  onSendOffer: () => void;
}

export function CreatorProfileDrawer({
  creator,
  onClose,
  onSendOffer,
}: CreatorProfileDrawerProps) {
  if (!creator) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(3px)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          width: '100%',
          maxWidth: '480px',
          height: '100%',
          padding: '28px 24px',
          overflowY: 'auto',
          boxShadow: '-10px 0 40px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#0052FF', backgroundColor: '#EFF6FF', padding: '2px 8px', borderRadius: '4px' }}>
              CREATOR INTELLIGENCE DOSSIER
            </span>
            <button
              type="button"
              onClick={onClose}
              style={{ background: 'transparent', border: 'none', fontSize: '20px', color: '#94A3B8', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#0052FF', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 900 }}>
              {creator.avatarText}
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                {creator.name}
              </h3>
              <div style={{ fontSize: '13px', color: '#0052FF', fontWeight: 700 }}>
                {creator.handle}
              </div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>
                {creator.category} • {creator.location}
              </div>
            </div>
          </div>

          <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, marginBottom: '20px' }}>
            {creator.bio}
          </p>

          {/* BotShield Audit Box */}
          <div style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '12px', padding: '14px 16px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <ShieldCheckIcon size={18} color="#059669" />
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#059669' }}>
                BotShield Audit: {creator.botShieldScore} Real Audience
              </span>
            </div>
            <div style={{ fontSize: '12px', color: '#065F46' }}>
              Zero engagement pods or artificial follower anomalies detected across active channels.
            </div>
          </div>

          {/* Demographics & Channels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #F1F5F9' }}>
              <span style={{ color: '#64748B' }}>YouTube Channel</span>
              <span style={{ fontWeight: 800, color: '#0F172A' }}>{creator.youtubeFollowers} Subscribers</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #F1F5F9' }}>
              <span style={{ color: '#64748B' }}>Instagram Profile</span>
              <span style={{ fontWeight: 800, color: '#0F172A' }}>{creator.instagramFollowers} Followers</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #F1F5F9' }}>
              <span style={{ color: '#64748B' }}>Top Geographic Fit</span>
              <span style={{ fontWeight: 800, color: '#0052FF' }}>{creator.topGeo}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748B' }}>Starting Rate</span>
              <span style={{ fontWeight: 900, color: '#059669', fontSize: '15px' }}>₹{creator.startingRate.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', paddingTop: '16px', borderTop: '1px solid #F1F5F9' }}>
          <button
            type="button"
            onClick={onClose}
            style={{ flex: 1, padding: '10px', backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
          >
            Close Dossier
          </button>
          <button
            type="button"
            onClick={onSendOffer}
            style={{ flex: 1, padding: '10px', backgroundColor: '#0052FF', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,82,255,0.25)' }}
          >
            Send Direct Offer →
          </button>
        </div>
      </div>
    </div>
  );
}
