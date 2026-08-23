'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get('role') === 'CREATOR' ? 'CREATOR' : 'BRAND_ADMIN';

  const [role, setRole] = useState<'CREATOR' | 'BRAND_ADMIN'>(initialRole as any);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [businessCategory, setBusinessCategory] = useState('Technology & Software');
  const [country, setCountry] = useState('India');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          country,
          organizationName: role === 'BRAND_ADMIN' ? organizationName : undefined,
          businessCategory: role === 'BRAND_ADMIN' ? businessCategory : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create account');
      }

      if (role === 'CREATOR') {
        router.push('/creator');
      } else {
        router.push('/brand');
      }
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '520px', margin: '60px auto', padding: '0 24px' }}>
      <div style={{
        border: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-primary)',
        padding: '36px',
      }}>
        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
          <img
            src="/logo-cropped.png"
            alt="The Influencer's Agency"
            style={{
              height: '52px',
              width: 'auto',
              maxWidth: '220px',
              margin: '0 auto 18px auto',
              display: 'block',
              objectFit: 'contain',
            }}
          />
          <div style={{
            fontSize: '11px',
            fontWeight: 700,
            color: 'var(--brand-primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '8px',
          }}>
            Account Registration
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.02em' }}>
            JOIN THE INFLUENCER&apos;S AGENCY
          </h1>
        </div>

        {/* Role Toggle */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '24px' }}>
          <button
            type="button"
            onClick={() => setRole('BRAND_ADMIN')}
            className={role === 'BRAND_ADMIN' ? 'tia-btn-primary' : 'tia-btn-secondary'}
            style={{ padding: '8px', fontSize: '12px' }}
          >
            Brand / Enterprise
          </button>
          <button
            type="button"
            onClick={() => setRole('CREATOR')}
            className={role === 'CREATOR' ? 'tia-btn-primary' : 'tia-btn-secondary'}
            style={{ padding: '8px', fontSize: '12px' }}
          >
            Creator / Talent
          </button>
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

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px', textTransform: 'uppercase' }}>
              Full Name
            </label>
            <input
              type="text"
              required
              className="tia-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={role === 'CREATOR' ? 'e.g. Alex Rivera' : 'e.g. Sarah Jenkins'}
            />
          </div>

          {role === 'BRAND_ADMIN' && (
            <>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px', textTransform: 'uppercase' }}>
                  Company / Organization Name
                </label>
                <input
                  type="text"
                  required
                  className="tia-input"
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  placeholder="e.g. Acme Corp Inc."
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px', textTransform: 'uppercase' }}>
                  Industry / Business Category
                </label>
                <select
                  className="tia-input"
                  value={businessCategory}
                  onChange={(e) => setBusinessCategory(e.target.value)}
                >
                  <option value="Technology & Software">Technology & Software</option>
                  <option value="Direct-to-Consumer & Retail">Direct-to-Consumer & Retail</option>
                  <option value="Fintech & Financial Services">Fintech & Financial Services</option>
                  <option value="Health, Fitness & Wellness">Health, Fitness & Wellness</option>
                  <option value="Gaming & Esports">Gaming & Esports</option>
                  <option value="Fashion & Apparel">Fashion & Apparel</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px', textTransform: 'uppercase' }}>
              Email Address
            </label>
            <input
              type="email"
              required
              className="tia-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@domain.com"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px', textTransform: 'uppercase' }}>
              Password
            </label>
            <input
              type="password"
              required
              minLength={8}
              className="tia-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px', textTransform: 'uppercase' }}>
              Operating Country (ISO Standard)
            </label>
            <select
              className="tia-input"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="India">India</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Singapore">Singapore</option>
              <option value="United Arab Emirates">United Arab Emirates</option>
              <option value="Germany">Germany</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="tia-btn-primary"
            style={{ width: '100%', padding: '10px', marginTop: '12px' }}
          >
            {loading ? 'Creating Account...' : 'Complete Registration'}
          </button>
        </form>

        <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)', textAlign: 'center', fontSize: '13px', color: 'var(--text-secondary)' }}>
          Already registered?{' '}
          <Link href="/login" style={{ color: 'var(--brand-primary)', fontWeight: 600 }}>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div style={{ padding: '60px', textAlign: 'center' }}>Loading registration...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
