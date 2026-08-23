'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GlobeIcon, ArrowRightIcon } from '@/components/ui/Icons';

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
    <>
      {/* Top Announcement Ribbon - Ultra Responsive */}
      <div style={{
        backgroundColor: '#EFF6FF',
        borderBottom: '1px solid #DBEAFE',
        padding: '7px 16px',
        fontSize: '12px',
        color: '#1E40AF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        fontWeight: 500,
        textAlign: 'center',
        flexWrap: 'wrap',
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <GlobeIcon size={13} color="#1E40AF" />
          <span style={{ fontWeight: 600 }}>Zero Information Asymmetry</span>
        </div>
        <span className="ribbon-divider" style={{ color: '#93C5FD' }}>•</span>
        <span className="ribbon-subtext">Deterministic 5% Escrow Commission • Instant Settlements</span>
        <Link
          href="/register"
          style={{
            backgroundColor: '#1E3A8A',
            color: '#FFFFFF',
            padding: '3px 10px',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.02em',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <span>Explore TIA</span>
          <ArrowRightIcon size={11} color="#FFFFFF" />
        </Link>
      </div>

      {/* Main Navbar */}
      <header style={{
        borderBottom: '1px solid #E2E8F0',
        backgroundColor: '#FFFFFF',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
      }}>
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 16px',
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Brand Logo & Navigation Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <Link href="/" onClick={closeMenu} style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src="/logo-cropped.png"
                alt="The Influencer's Agency"
                style={{
                  height: '42px',
                  width: 'auto',
                  maxWidth: '180px',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="desktop-nav-links" style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
              <Link href="/brand/creators" style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>
                Creator Intelligence
              </Link>
              <Link href="/brand" style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>
                Campaign Marketplace
              </Link>
              <Link href="/creator" style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>
                Creator Suite
              </Link>
              <Link href="/admin" style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>
                5% Escrow & Ledger
              </Link>
            </nav>
          </div>

          {/* Right Desktop Actions */}
          <div className="desktop-nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748B', fontWeight: 600, borderRight: '1px solid #E2E8F0', paddingRight: '16px' }}>
              <GlobeIcon size={14} color="#64748B" />
              <span>INR</span>
            </div>

            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>{user.name}</div>
                  <div style={{ fontSize: '10px', color: '#0052FF', fontWeight: 700, textTransform: 'uppercase' }}>
                    {user.role.replace(/_/g, ' ')}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="tia-btn-secondary"
                  style={{ padding: '8px 14px', fontSize: '12px' }}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Link
                  href="/login"
                  style={{
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#0052FF',
                    border: '1px solid #BFDBFE',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  style={{
                    padding: '8px 18px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    backgroundColor: '#0052FF',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>Sign Up</span>
                  <ArrowRightIcon size={14} color="#FFFFFF" />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-hamburger-btn"
            aria-label="Toggle navigation menu"
            style={{
              display: 'none',
              padding: '6px 12px',
              border: '1px solid var(--border-medium)',
              backgroundColor: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.04em',
            }}
          >
            {mobileMenuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div style={{
            borderTop: '1px solid #E2E8F0',
            backgroundColor: '#FFFFFF',
            padding: '20px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}>
            {user ? (
              <>
                <div style={{ paddingBottom: '12px', borderBottom: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700 }}>{user.name}</div>
                  <div style={{ fontSize: '11px', color: '#0052FF', fontWeight: 600 }}>{user.role.replace(/_/g, ' ')}</div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>{user.email}</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <Link href="/brand/creators" onClick={closeMenu} style={{ fontSize: '14px', fontWeight: 600, padding: '6px 0' }}>Creator Intelligence</Link>
                  <Link href="/brand" onClick={closeMenu} style={{ fontSize: '14px', fontWeight: 600, padding: '6px 0' }}>Campaign Marketplace</Link>
                  <Link href="/creator" onClick={closeMenu} style={{ fontSize: '14px', fontWeight: 600, padding: '6px 0' }}>Creator Suite</Link>
                  <Link href="/admin" onClick={closeMenu} style={{ fontSize: '14px', fontWeight: 600, padding: '6px 0' }}>5% Escrow & Ledger</Link>
                </div>

                <button
                  onClick={handleLogout}
                  className="tia-btn-danger"
                  style={{ marginTop: '8px', padding: '10px', width: '100%' }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Link href="/login" onClick={closeMenu} className="tia-btn-secondary" style={{ textAlign: 'center', padding: '12px' }}>
                  Sign In
                </Link>
                <Link href="/register" onClick={closeMenu} className="tia-btn-primary" style={{ textAlign: 'center', padding: '12px' }}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </header>
    </>
  );
};
