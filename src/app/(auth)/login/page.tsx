'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to sign in');
      }

      // Redirect based on role
      if (data.user.role === 'CREATOR') {
        router.push('/creator');
      } else if (data.user.role.startsWith('BRAND_')) {
        router.push('/brand');
      } else if (data.user.role.startsWith('TIA_')) {
        router.push('/admin');
      } else {
        router.push('/');
      }
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '440px', margin: '80px auto', padding: '0 24px' }}>
      <div style={{
        border: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-primary)',
        padding: '36px',
      }}>
        <div style={{ marginBottom: '28px', textAlign: 'center' }}>
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
            Secure Authentication
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.02em' }}>
            SIGN IN TO TIA
          </h1>
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

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px', textTransform: 'uppercase' }}>
              Work Email
            </label>
            <input
              type="email"
              required
              className="tia-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px', textTransform: 'uppercase' }}>
              Password
            </label>
            <input
              type="password"
              required
              className="tia-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="tia-btn-primary"
            style={{ width: '100%', padding: '10px', marginTop: '8px' }}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)', textAlign: 'center', fontSize: '13px', color: 'var(--text-secondary)' }}>
          Don&apos;t have an account?{' '}
          <Link href="/register" style={{ color: 'var(--brand-primary)', fontWeight: 600 }}>
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
