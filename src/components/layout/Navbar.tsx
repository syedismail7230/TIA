'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  user?: {
    name: string;
    email: string;
    role: string;
  } | null;
}

export const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setMobileMenuOpen(false);
    router.push('/login');
    router.refresh();
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header style={{
      borderBottom: '1px solid var(--border-subtle)',
      backgroundColor: 'var(--bg-primary)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 20px',
        height: '76px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          <Link href="/" onClick={closeMenu} style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/logo-cropped.png"
              alt="The Influencer's Agency"
              style={{
                height: '48px',
                width: 'auto',
                maxWidth: '240px',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </Link>

          {/* Desktop Navigation Links */}
          {user && (
            <nav className="desktop-nav-links" style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
              {user.role === 'CREATOR' && (
                <>
                  <Link href="/creator" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Dashboard</Link>
                  <Link href="/creator" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Discover Campaigns</Link>
                  <Link href="/creator" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Intelligence Profile</Link>
                </>
              )}

              {(user.role === 'BRAND_ADMIN' || user.role === 'BRAND_USER') && (
                <>
                  <Link href="/brand" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Dashboard</Link>
                  <Link href="/brand/creators" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Creator Discovery</Link>
                  <Link href="/brand" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Campaigns</Link>
                </>
              )}

              {user.role.startsWith('TIA_') && (
                <>
                  <Link href="/admin" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Admin Center</Link>
                </>
              )}
            </nav>
          )}
        </div>

        {/* Right Desktop Actions */}
        <div className="desktop-nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>{user.name}</div>
                <div style={{ fontSize: '10px', color: 'var(--brand-primary)', fontWeight: 600, textTransform: 'uppercase' }}>{user.role.replace(/_/g, ' ')}</div>
              </div>
              <button
                onClick={handleLogout}
                className="tia-btn-secondary"
                style={{ padding: '6px 12px', fontSize: '12px' }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Link href="/login" className="tia-btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>
                Sign In
              </Link>
              <Link href="/register" className="tia-btn-primary" style={{ padding: '6px 12px', fontSize: '12px' }}>
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-hamburger-btn"
          aria-label="Toggle navigation menu"
          style={{
            display: 'none',
            padding: '8px 12px',
            border: '1px solid var(--border-medium)',
            backgroundColor: 'var(--bg-primary)',
            fontSize: '14px',
            fontWeight: 700,
          }}
        >
          {mobileMenuOpen ? '✕ CLOSE' : '☰ MENU'}
        </button>
      </div>

      {/* Mobile Drawer / Dropdown */}
      {mobileMenuOpen && (
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--bg-primary)',
          padding: '20px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          {user ? (
            <>
              <div style={{ paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '14px', fontWeight: 700 }}>{user.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--brand-primary)', fontWeight: 600 }}>{user.role.replace(/_/g, ' ')}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{user.email}</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {user.role === 'CREATOR' && (
                  <>
                    <Link href="/creator" onClick={closeMenu} style={{ fontSize: '14px', fontWeight: 600, padding: '6px 0' }}>Dashboard</Link>
                    <Link href="/creator" onClick={closeMenu} style={{ fontSize: '14px', fontWeight: 600, padding: '6px 0' }}>Discover Campaigns</Link>
                    <Link href="/creator" onClick={closeMenu} style={{ fontSize: '14px', fontWeight: 600, padding: '6px 0' }}>Intelligence Profile</Link>
                  </>
                )}

                {(user.role === 'BRAND_ADMIN' || user.role === 'BRAND_USER') && (
                  <>
                    <Link href="/brand" onClick={closeMenu} style={{ fontSize: '14px', fontWeight: 600, padding: '6px 0' }}>Dashboard</Link>
                    <Link href="/brand/creators" onClick={closeMenu} style={{ fontSize: '14px', fontWeight: 600, padding: '6px 0' }}>Creator Discovery</Link>
                    <Link href="/brand" onClick={closeMenu} style={{ fontSize: '14px', fontWeight: 600, padding: '6px 0' }}>Campaigns</Link>
                    <Link href="/brand/campaigns/new" onClick={closeMenu} style={{ fontSize: '14px', fontWeight: 600, color: 'var(--brand-primary)', padding: '6px 0' }}>+ Create Campaign</Link>
                  </>
                )}

                {user.role.startsWith('TIA_') && (
                  <>
                    <Link href="/admin" onClick={closeMenu} style={{ fontSize: '14px', fontWeight: 600, padding: '6px 0' }}>Admin Governance</Link>
                  </>
                )}
              </div>

              <button
                onClick={handleLogout}
                className="tia-btn-danger"
                style={{ marginTop: '8px', padding: '10px' }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link href="/login" onClick={closeMenu} className="tia-btn-secondary">
                Sign In
              </Link>
              <Link href="/register" onClick={closeMenu} className="tia-btn-primary">
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        @media (max-width: 900px) {
          .desktop-nav-links,
          .desktop-nav-actions {
            display: none !important;
          }
          .mobile-hamburger-btn {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
};
