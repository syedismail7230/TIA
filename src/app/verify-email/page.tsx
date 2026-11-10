'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2, AlertCircle, RefreshCw, ArrowRight, ShieldCheck } from 'lucide-react';

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const emailParam = searchParams.get('email');

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verifiedEmail, setVerifiedEmail] = useState<string>(emailParam || '');
  const [targetRole, setTargetRole] = useState<string>('CREATOR');

  useEffect(() => {
    if (!token) {
      setError('No verification token provided in link.');
      setLoading(false);
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(`/api/auth/verify-email?token=${encodeURIComponent(token)}${emailParam ? `&email=${encodeURIComponent(emailParam)}` : ''}`);
        const data = await res.json();

        if (data.success) {
          setSuccess(true);
          setVerifiedEmail(data.email || emailParam || '');
          setTargetRole(data.role || 'CREATOR');
        } else {
          setError(data.error || 'Invalid or expired verification link.');
        }
      } catch (err: any) {
        setError('Failed to reach verification server.');
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token, emailParam]);

  const handleContinueToDashboard = () => {
    if (targetRole === 'CREATOR') {
      router.push('/creator');
    } else {
      router.push('/brand');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#F8FAFC',
      padding: '24px',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      <div style={{
        width: '100%',
        maxWidth: '460px',
        background: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid #E2E8F0',
        padding: '40px 32px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
        textAlign: 'center',
      }}>
        <div style={{ marginBottom: '24px' }}>
          <img
            src="/logo-cropped.png"
            alt="The Influencer's Agency"
            style={{ height: '36px', width: 'auto', display: 'inline-block' }}
          />
        </div>

        {loading && (
          <div>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#EFF6FF',
              color: '#0052FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
            }}>
              <RefreshCw style={{ width: '28px', height: '28px', animation: 'spin 1s linear infinite' }} />
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', margin: '0 0 8px 0' }}>
              Verifying your email...
            </h2>
            <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
              Please wait while we confirm your credentials.
            </p>
          </div>
        )}

        {!loading && success && (
          <div>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#EFF6FF',
              border: '2px solid #BFDBFE',
              color: '#0052FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
            }}>
              <ShieldCheck style={{ width: '34px', height: '34px' }} />
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
              Email Verified Successfully!
            </h2>
            <p style={{ fontSize: '14px', color: '#64748B', margin: '0 0 24px 0', lineHeight: 1.5 }}>
              Your email <strong style={{ color: '#0F172A' }}>{verifiedEmail}</strong> has been officially verified on TIA.
            </p>

            <button
              onClick={handleContinueToDashboard}
              style={{
                width: '100%',
                padding: '14px 20px',
                background: '#0F172A',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 600,
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(15, 23, 42, 0.2)',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#0052FF')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#0F172A')}
            >
              <span>Go to {targetRole === 'CREATOR' ? 'Creator' : 'Brand'} Dashboard</span>
              <ArrowRight style={{ width: '16px', height: '16px' }} />
            </button>
          </div>
        )}

        {!loading && error && (
          <div>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#FEF2F2',
              border: '2px solid #FECACA',
              color: '#EF4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
            }}>
              <AlertCircle style={{ width: '32px', height: '32px' }} />
            </div>

            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', margin: '0 0 8px 0' }}>
              Verification Failed
            </h2>
            <p style={{ fontSize: '14px', color: '#64748B', margin: '0 0 24px 0', lineHeight: 1.5 }}>
              {error}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link
                href="/login"
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  background: '#0F172A',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: 600,
                  borderRadius: '12px',
                  textDecoration: 'none',
                  display: 'inline-block',
                  boxSizing: 'border-box',
                }}
              >
                Sign In to TIA
              </Link>
              <Link
                href="/register"
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  background: '#F8FAFC',
                  color: '#475569',
                  border: '1px solid #E2E8F0',
                  fontSize: '14px',
                  fontWeight: 600,
                  borderRadius: '12px',
                  textDecoration: 'none',
                  display: 'inline-block',
                  boxSizing: 'border-box',
                }}
              >
                Create New Account
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
