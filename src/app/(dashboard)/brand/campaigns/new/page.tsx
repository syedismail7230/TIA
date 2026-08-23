'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewCampaignWizardPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [objective, setObjective] = useState('AWARENESS');
  const [category, setCategory] = useState('Technology & Software');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('50000');
  const [currency, setCurrency] = useState('INR');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['INSTAGRAM']);
  const [deliverables, setDeliverables] = useState<string[]>(['1x Instagram Reel', '2x Stories']);
  const [deliverableInput, setDeliverableInput] = useState('');
  const [targetGeographies, setTargetGeographies] = useState<string[]>(['India']);

  const togglePlatform = (p: string) => {
    if (selectedPlatforms.includes(p)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter((item) => item !== p));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, p]);
    }
  };

  const addDeliverable = () => {
    if (deliverableInput.trim()) {
      setDeliverables([...deliverables, deliverableInput.trim()]);
      setDeliverableInput('');
    }
  };

  const removeDeliverable = (index: number) => {
    setDeliverables(deliverables.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          objective,
          category,
          budget: Number(budget),
          currency,
          requiredPlatforms: selectedPlatforms,
          deliverables,
          targetGeographies,
          status: 'ACCEPTING_APPLICATIONS',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create campaign');
      }

      router.push(`/workspace/${data.campaign.id}`);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '840px', margin: '40px auto', padding: '0 24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Link href="/brand" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          ← Back to Dashboard
        </Link>
        <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.02em', marginTop: '8px' }}>
          CREATE ENTERPRISE CAMPAIGN
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          Structured multi-step workflow conforming strictly to PRD Section 26.
        </p>
      </div>

      {/* Step Indicator */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '8px',
        marginBottom: '32px',
      }}>
        {['1. Objective & Scope', '2. Deliverables & Platform', '3. Budget & Audience', '4. Review & Publish'].map((label, i) => (
          <div
            key={i}
            style={{
              borderTop: `3px solid ${step >= i + 1 ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
              paddingTop: '8px',
              fontSize: '11px',
              fontWeight: 700,
              color: step >= i + 1 ? 'var(--brand-primary)' : 'var(--text-muted)',
              textTransform: 'uppercase',
            }}
          >
            {label}
          </div>
        ))}
      </div>

      {error && (
        <div style={{
          padding: '10px 14px',
          backgroundColor: 'var(--semantic-error-bg)',
          border: '1px solid var(--semantic-error-border)',
          color: 'var(--semantic-error-text)',
          fontSize: '13px',
          marginBottom: '20px',
        }}>
          {error}
        </div>
      )}

      <div style={{ border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-primary)', padding: '32px' }}>
        {/* STEP 1: Objective & Scope */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Campaign Title
              </label>
              <input
                type="text"
                className="tia-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Q4 AI Developer Tooling Launch"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Campaign Objective
                </label>
                <select className="tia-input" value={objective} onChange={(e) => setObjective(e.target.value)}>
                  <option value="AWARENESS">Brand Awareness</option>
                  <option value="ENGAGEMENT">Audience Engagement</option>
                  <option value="TRAFFIC">Website Traffic</option>
                  <option value="LEAD_GEN">Lead Generation</option>
                  <option value="SALES">Direct Sales / Conversions</option>
                  <option value="PRODUCT_LAUNCH">Product Launch</option>
                  <option value="CONTENT_GEN">Content Generation</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Industry Category
                </label>
                <select className="tia-input" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="Technology & Software">Technology & Software</option>
                  <option value="Direct-to-Consumer & Retail">Direct-to-Consumer & Retail</option>
                  <option value="Fintech & Financial Services">Fintech & Financial Services</option>
                  <option value="Health & Fitness">Health & Fitness</option>
                  <option value="Gaming & Esports">Gaming & Esports</option>
                  <option value="Fashion & Lifestyle">Fashion & Lifestyle</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Campaign Brief / Description
              </label>
              <textarea
                rows={4}
                className="tia-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detailed deliverables requirements, brand positioning guidelines, talking points..."
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
              <button
                type="button"
                disabled={!title.trim() || !description.trim()}
                onClick={() => setStep(2)}
                className="tia-btn-primary"
              >
                Continue to Deliverables →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Platforms & Deliverables */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                Target Platforms
              </label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {['INSTAGRAM', 'YOUTUBE', 'LINKEDIN', 'X', 'FACEBOOK'].map((plat) => {
                  const isSel = selectedPlatforms.includes(plat);
                  return (
                    <button
                      key={plat}
                      type="button"
                      onClick={() => togglePlatform(plat)}
                      className={isSel ? 'tia-btn-primary' : 'tia-btn-secondary'}
                      style={{ padding: '8px 16px', fontSize: '12px' }}
                    >
                      {plat}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Required Deliverable Items
              </label>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <input
                  type="text"
                  className="tia-input"
                  value={deliverableInput}
                  onChange={(e) => setDeliverableInput(e.target.value)}
                  placeholder="e.g. 1x Dedicated YouTube Video (60s integration)"
                />
                <button type="button" onClick={addDeliverable} className="tia-btn-secondary">
                  Add Item
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      border: '1px solid var(--border-subtle)',
                      backgroundColor: 'var(--bg-secondary)',
                      fontSize: '13px',
                    }}
                  >
                    <span>{item}</span>
                    <button
                      type="button"
                      onClick={() => removeDeliverable(idx)}
                      style={{ color: '#DC2626', fontSize: '11px', fontWeight: 600 }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
              <button type="button" onClick={() => setStep(1)} className="tia-btn-secondary">
                ← Back
              </button>
              <button type="button" onClick={() => setStep(3)} className="tia-btn-primary">
                Continue to Budget →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Budget & Audience */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Campaign Budget Allocation
                </label>
                <input
                  type="number"
                  required
                  min="1000"
                  className="tia-input"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="50000"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Currency (ISO 4217)
                </label>
                <select className="tia-input" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
            </div>

            <div style={{
              padding: '12px 16px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              fontSize: '12px',
              color: 'var(--text-secondary)',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Deterministic Financial Breakdown:</div>
              <div>• Gross Campaign Value: {currency} {Number(budget).toLocaleString()}</div>
              <div>• TIA Platform Commission (5%): {currency} {(Number(budget) * 0.05).toLocaleString()}</div>
              <div>• Creator Net Allocation (95% held in Escrow): {currency} {(Number(budget) * 0.95).toLocaleString()}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
              <button type="button" onClick={() => setStep(2)} className="tia-btn-secondary">
                ← Back
              </button>
              <button type="button" onClick={() => setStep(4)} className="tia-btn-primary">
                Review & Summary →
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Review & Publish */}
        {step === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Confirm Campaign Brief</h3>

            <div className="tia-table-container">
              <table className="tia-table">
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 600, width: '200px' }}>Title</td>
                    <td>{title}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600 }}>Objective</td>
                    <td>{objective}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600 }}>Category</td>
                    <td>{category}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600 }}>Platforms</td>
                    <td>{selectedPlatforms.join(', ')}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600 }}>Deliverables</td>
                    <td>{deliverables.join(' • ')}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600 }}>Budget</td>
                    <td className="font-tabular" style={{ fontWeight: 700, color: 'var(--brand-primary)' }}>
                      {currency} {Number(budget).toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
              <button type="button" onClick={() => setStep(3)} className="tia-btn-secondary">
                ← Back
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={handleSubmit}
                className="tia-btn-primary"
                style={{ padding: '10px 24px', fontWeight: 700 }}
              >
                {loading ? 'Publishing Campaign...' : 'Publish to Marketplace'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
