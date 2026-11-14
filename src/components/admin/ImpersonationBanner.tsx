'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert, ArrowLeft, Loader2, UserCheck } from 'lucide-react';

interface ImpersonationMeta {
  adminEmail: string;
  targetEmail: string;
  targetName: string;
  targetRole: string;
}

export function ImpersonationBanner() {
  const router = useRouter();
  const [meta, setMeta] = useState<ImpersonationMeta | null>(null);
  const [reverting, setReverting] = useState(false);

  useEffect(() => {
    // 1. Check client cookie first for instant render
    const parseMetaCookie = () => {
      try {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
          const [key, val] = cookie.trim().split('=');
          if (key === 'tia_impersonation_meta' && val) {
            return JSON.parse(decodeURIComponent(val));
          }
        }
      } catch {}
      return null;
    };

    const localMeta = parseMetaCookie();
    if (localMeta) {
      setMeta(localMeta);
    }

    // 2. Validate with status endpoint
    fetch('/api/admin/impersonate/status')
      .then((res) => res.json())
      .then((data) => {
        if (data.isImpersonating && data.currentUser) {
          setMeta({
            adminEmail: data.admin?.email || 'admin@theinfluencers.agency',
            targetEmail: data.currentUser.email,
            targetName: data.currentUser.name || data.currentUser.email.split('@')[0],
            targetRole: data.currentUser.role,
          });
        } else if (!data.isImpersonating) {
          setMeta(null);
        }
      })
      .catch(() => {});
  }, []);

  const handleReturnToAdmin = async () => {
    setReverting(true);
    try {
      const res = await fetch('/api/admin/impersonate/revert', {
        method: 'POST',
      });
      const data = await res.json();
      if (res.ok) {
        window.location.href = data.redirectUrl || '/admin';
      } else {
        alert(data.error || 'Failed to revert session.');
        setReverting(false);
      }
    } catch {
      alert('Network error while reverting impersonation.');
      setReverting(false);
    }
  };

  if (!meta) return null;

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 99999,
        background: 'linear-gradient(90deg, #1e1b4b 0%, #311042 50%, #450a0a 100%)',
        color: '#ffffff',
        borderBottom: '2px solid #f59e0b',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.35)',
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '13px',
        fontWeight: 500,
        flexWrap: 'wrap',
        gap: '12px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#f59e0b',
            color: '#000000',
            fontWeight: 700,
            fontSize: '11px',
            padding: '4px 10px',
            borderRadius: '999px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          <ShieldAlert size={14} />
          Admin Impersonation Mode
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <UserCheck size={16} color="#fbbf24" />
          <span>
            Viewing dashboard as{' '}
            <strong style={{ color: '#ffffff', textDecoration: 'underline' }}>{meta.targetName}</strong>{' '}
            (<span style={{ color: '#93c5fd' }}>{meta.targetEmail}</span>)
          </span>
          <span
            style={{
              fontSize: '11px',
              padding: '2px 8px',
              borderRadius: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              color: '#e2e8f0',
              fontFamily: 'monospace',
            }}
          >
            {meta.targetRole}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          onClick={handleReturnToAdmin}
          disabled={reverting}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '7px 16px',
            borderRadius: '8px',
            backgroundColor: '#ffffff',
            color: '#0f172a',
            fontWeight: 600,
            fontSize: '12px',
            border: 'none',
            cursor: reverting ? 'wait' : 'pointer',
            transition: 'all 0.15s ease',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f1f5f9')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
        >
          {reverting ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Restoring Admin Session...
            </>
          ) : (
            <>
              <ArrowLeft size={14} />
              Return to Admin Dashboard
            </>
          )}
        </button>
      </div>
    </div>
  );
}
