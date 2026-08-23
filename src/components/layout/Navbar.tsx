'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  GlobeIcon,
  ArrowRightIcon,
  MenuIcon,
  CloseIcon,
  ChevronDownIcon,
  SearchIcon,
  LockIcon,
  ShieldCheckIcon,
  ScaleIcon,
  DocumentIcon,
  CheckIcon,
  SparklesIcon,
  TagIcon,
  ShoppingBagIcon,
  MegaphoneIcon,
} from '@/components/ui/Icons';

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
  const [activeDropdown, setActiveDropdown] = useState<'product' | 'resources' | null>(null);

  const navContainerRef = useRef<HTMLElement>(null);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    router.push('/login');
    router.refresh();
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <>
      {/* Top Announcement Ribbon */}
      <div style={{
        backgroundColor: '#EFF6FF',
        borderBottom: '1px solid #DBEAFE',
        padding: '7px 16px',
        fontSize: '12px',
        color: '#1E40AF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontWeight: 500,
        textAlign: 'center',
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <span style={{
            fontSize: '10.5px',
            fontWeight: 800,
            backgroundColor: '#0052FF',
            color: '#FFFFFF',
            padding: '2px 6px',
            borderRadius: '3px',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}>
            New
          </span>
          <span style={{ fontWeight: 600, color: '#1E3A8A' }}>
            2026 Creator Intelligence & Milestone Protection Calculator is Live
          </span>
        </div>
        <span className="ribbon-divider" style={{ color: '#93C5FD' }}>•</span>
        <span className="ribbon-subtext" style={{ color: '#3B82F6' }}>Compare 5% Flat Ledger vs 25% Agency Markups</span>
        <Link
          href="/pricing"
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
            marginLeft: '4px',
            textDecoration: 'none',
            borderRadius: '2px',
          }}
        >
          <span>Calculate Savings</span>
          <ArrowRightIcon size={10} color="#FFFFFF" />
        </Link>
      </div>

      {/* Main Navbar */}
      <header
        ref={navContainerRef}
        style={{
          borderBottom: '1px solid #E2E8F0',
          backgroundColor: '#FFFFFF',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: activeDropdown ? '0 20px 48px rgba(0, 0, 0, 0.08)' : '0 2px 8px rgba(0, 0, 0, 0.02)',
          transition: 'box-shadow 0.2s ease',
        }}
      >
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 clamp(24px, 5vw, 72px)',
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Brand Logo & Main Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
            <Link href="/" onClick={closeMenu} style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src="/logo-cropped.png"
                alt="The Influencer's Agency"
                style={{
                  height: '38px',
                  width: 'auto',
                  maxWidth: '160px',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="desktop-nav-links" style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
              {/* 1. Product (Mega Menu Trigger) */}
              <div
                style={{ position: 'relative' }}
                onMouseEnter={() => setActiveDropdown('product')}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === 'product' ? null : 'product')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '14.5px',
                    fontWeight: 600,
                    color: activeDropdown === 'product' ? '#0052FF' : '#1E293B',
                    background: 'none',
                    border: 'none',
                    padding: '22px 0',
                    cursor: 'pointer',
                    transition: 'color 0.15s ease',
                  }}
                >
                  <span>Product</span>
                  <div style={{
                    transition: 'transform 0.2s ease',
                    transform: activeDropdown === 'product' ? 'rotate(180deg)' : 'rotate(0deg)',
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                    <ChevronDownIcon size={13} color={activeDropdown === 'product' ? '#0052FF' : '#64748B'} />
                  </div>
                </button>
              </div>

              {/* 2. Agency */}
              <Link
                href="/brand"
                onClick={closeMenu}
                style={{ fontSize: '14.5px', fontWeight: 600, color: '#1E293B', textDecoration: 'none' }}
              >
                Agency
              </Link>

              {/* 3. Pricing */}
              <Link
                href="/pricing"
                onClick={closeMenu}
                style={{ fontSize: '14.5px', fontWeight: 600, color: '#1E293B', textDecoration: 'none' }}
              >
                Pricing
              </Link>

              {/* 4. Resources (Mega Menu Trigger) */}
              <div
                style={{ position: 'relative' }}
                onMouseEnter={() => setActiveDropdown('resources')}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === 'resources' ? null : 'resources')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '14.5px',
                    fontWeight: 600,
                    color: activeDropdown === 'resources' ? '#0052FF' : '#1E293B',
                    background: 'none',
                    border: 'none',
                    padding: '22px 0',
                    cursor: 'pointer',
                    transition: 'color 0.15s ease',
                  }}
                >
                  <span>Resources</span>
                  <div style={{
                    transition: 'transform 0.2s ease',
                    transform: activeDropdown === 'resources' ? 'rotate(180deg)' : 'rotate(0deg)',
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                    <ChevronDownIcon size={13} color={activeDropdown === 'resources' ? '#0052FF' : '#64748B'} />
                  </div>
                </button>
              </div>

              {/* 5. For Creators */}
              <Link
                href="/creator"
                onClick={closeMenu}
                style={{ fontSize: '14.5px', fontWeight: 600, color: '#1E293B', textDecoration: 'none' }}
              >
                For Creators
              </Link>
            </nav>
          </div>

          {/* Desktop Right Actions */}
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
                    padding: '8px 18px',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    color: '#0F172A',
                    textDecoration: 'none',
                  }}
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  style={{
                    padding: '9px 20px',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    backgroundColor: '#0052FF',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    borderRadius: '4px',
                    boxShadow: '0 2px 8px rgba(0, 82, 255, 0.25)',
                  }}
                >
                  <span>Get Started</span>
                  <ArrowRightIcon size={13} color="#FFFFFF" />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="mobile-nav-header-actions" style={{ display: 'none', alignItems: 'center', gap: '10px' }}>
            {!user && (
              <Link
                href="/login"
                style={{
                  padding: '6px 14px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#0052FF',
                  border: '1px solid #0052FF',
                  backgroundColor: '#FFFFFF',
                }}
              >
                Login
              </Link>
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-hamburger-btn"
              aria-label="Toggle navigation menu"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '6px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
                color: '#334155',
                cursor: 'pointer',
              }}
            >
              {mobileMenuOpen ? <CloseIcon size={20} color="#0F172A" /> : <MenuIcon size={20} color="#0F172A" />}
            </button>
          </div>
        </div>

        {/* FULL-WIDTH PRODUCT MEGA MENU */}
        {activeDropdown === 'product' && (
          <div
            onMouseLeave={() => setActiveDropdown(null)}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              width: '100%',
              backgroundColor: '#FFFFFF',
              borderTop: '1px solid #F1F5F9',
              borderBottom: '1px solid #E2E8F0',
              boxShadow: '0 24px 48px rgba(0, 82, 255, 0.08)',
              zIndex: 999,
              padding: '28px clamp(24px, 5vw, 72px) 36px clamp(24px, 5vw, 72px)',
              animation: 'fadeInMotion 0.2s ease',
            }}
          >
            <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
              {/* Top Highlight Banner */}
              <div style={{ marginBottom: '20px' }}>
                <Link
                  href="/brand/creators"
                  onClick={closeMenu}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#0052FF',
                    textDecoration: 'none',
                  }}
                >
                  <SparklesIcon size={14} color="#0052FF" />
                  <span>The autonomous creator intelligence platform powered by TIA Engine</span>
                  <ArrowRightIcon size={11} color="#0052FF" />
                </Link>
              </div>

              {/* Mega Menu Grid: 4 Visual Cards + Right Use Cases Column */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr) 220px',
                gap: '20px',
                alignItems: 'stretch',
              }}>
                {/* Card 1: Find & Attract Creators */}
                <Link
                  href="/brand/creators"
                  onClick={closeMenu}
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '12px',
                    borderRadius: '8px',
                    transition: 'all 0.15s ease',
                  }}
                  className="mega-menu-card"
                >
                  {/* Card Visual Mockup */}
                  <div style={{
                    height: '110px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #EFF6FF 0%, #F5F3FF 100%)',
                    border: '1px solid #DBEAFE',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    marginBottom: '14px',
                  }}>
                    <div style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #BFDBFE',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 12px rgba(0, 82, 255, 0.12)',
                    }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#0052FF', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800 }}>
                        JT
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: 800, color: '#0F172A' }}>Jordan Tech</div>
                        <div style={{ fontSize: '9px', color: '#059669', fontWeight: 700 }}>A+ Authenticity (99%)</div>
                      </div>
                      <CheckIcon size={12} color="#0052FF" />
                    </div>
                  </div>

                  <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                    Find & attract creators
                  </h3>
                  <p style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.5 }}>
                    Discover and vet creators with audience authenticity & performance data.
                  </p>
                </Link>

                {/* Card 2: Manage Programs */}
                <Link
                  href="/brand"
                  onClick={closeMenu}
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '12px',
                    borderRadius: '8px',
                    transition: 'all 0.15s ease',
                  }}
                  className="mega-menu-card"
                >
                  <div style={{
                    height: '110px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #F0FDF4 0%, #EFF6FF 100%)',
                    border: '1px solid #DCFCE7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '14px',
                  }}>
                    <div style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #BBF7D0',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.12)',
                    }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#0F172A' }}>Brief Live</span>
                      <span style={{ fontSize: '9px', backgroundColor: '#ECFDF5', color: '#059669', padding: '2px 6px', fontWeight: 700, borderRadius: '3px' }}>
                        3 Approvals Pending
                      </span>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                    Manage campaigns
                  </h3>
                  <p style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.5 }}>
                    Scale and automate creator briefs, deliverables & frame-accurate review studio.
                  </p>
                </Link>

                {/* Card 3: Track & Pay (Milestone Vault) */}
                <Link
                  href="/escrow-policy"
                  onClick={closeMenu}
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '12px',
                    borderRadius: '8px',
                    transition: 'all 0.15s ease',
                  }}
                  className="mega-menu-card"
                >
                  <div style={{
                    height: '110px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #FAF5FF 0%, #EFF6FF 100%)',
                    border: '1px solid #F3E8FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '14px',
                  }}>
                    <div style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E9D5FF',
                      borderRadius: '6px',
                      padding: '8px 14px',
                      textAlign: 'center',
                      boxShadow: '0 4px 12px rgba(168, 85, 247, 0.12)',
                    }}>
                      <div style={{ fontSize: '10px', color: '#059669', fontWeight: 800 }}>✓ ₹250k Locked in Vault</div>
                      <div style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A' }}>5% Flat Ledger</div>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                    Track & Settle (Milestone Vault)
                  </h3>
                  <p style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.5 }}>
                    Monitor performance, lock funds upfront in milestone vaults, and pay creators instantly.
                  </p>
                </Link>

                {/* Card 4: Compliance & Whitelisting */}
                <Link
                  href="/ip-licensing"
                  onClick={closeMenu}
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '12px',
                    borderRadius: '8px',
                    transition: 'all 0.15s ease',
                  }}
                  className="mega-menu-card"
                >
                  <div style={{
                    height: '110px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #FFFBEB 0%, #EFF6FF 100%)',
                    border: '1px solid #FEF3C7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '14px',
                  }}>
                    <div style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #FDE68A',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 4px 12px rgba(217, 119, 6, 0.12)',
                    }}>
                      <ShieldCheckIcon size={14} color="#0052FF" />
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#0F172A' }}>90-Day Whitelisted</span>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                    Compliance & Licensing
                  </h3>
                  <p style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.5 }}>
                    Ad whitelisting rights, ASCI statutory labels, and audit-ready GST invoices.
                  </p>
                </Link>

                {/* Right Column: Use Cases */}
                <div style={{
                  borderLeft: '1px solid #F1F5F9',
                  paddingLeft: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Use Cases
                  </div>

                  <Link href="/brand" onClick={closeMenu} style={{ fontSize: '13px', fontWeight: 600, color: '#334155', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }} className="mega-link-hover">
                    <TagIcon size={14} color="#0052FF" />
                    <span>For E-Commerce & D2C</span>
                  </Link>

                  <Link href="/brand" onClick={closeMenu} style={{ fontSize: '13px', fontWeight: 600, color: '#334155', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }} className="mega-link-hover">
                    <ShoppingBagIcon size={14} color="#0052FF" />
                    <span>For Affiliate Programs</span>
                  </Link>

                  <Link href="/brand" onClick={closeMenu} style={{ fontSize: '13px', fontWeight: 600, color: '#334155', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }} className="mega-link-hover">
                    <MegaphoneIcon size={14} color="#0052FF" />
                    <span>For Marketing Agencies</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FULL-WIDTH RESOURCES MEGA MENU */}
        {activeDropdown === 'resources' && (
          <div
            onMouseLeave={() => setActiveDropdown(null)}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              width: '100%',
              backgroundColor: '#FFFFFF',
              borderTop: '1px solid #F1F5F9',
              borderBottom: '1px solid #E2E8F0',
              boxShadow: '0 24px 48px rgba(0, 82, 255, 0.08)',
              zIndex: 999,
              padding: '28px clamp(24px, 5vw, 72px) 36px clamp(24px, 5vw, 72px)',
              animation: 'fadeInMotion 0.2s ease',
            }}
          >
            <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr) 220px',
                gap: '20px',
                alignItems: 'stretch',
              }}>
                {/* Card 1: Legal Center Hub */}
                <Link
                  href="/legal"
                  onClick={closeMenu}
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '12px',
                    borderRadius: '8px',
                    transition: 'all 0.15s ease',
                  }}
                  className="mega-menu-card"
                >
                  <div style={{
                    height: '110px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #EFF6FF 0%, #EEF2FF 100%)',
                    border: '1px solid #DBEAFE',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '14px',
                  }}>
                    <div style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #BFDBFE',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 12px rgba(0, 82, 255, 0.12)',
                    }}>
                      <DocumentIcon size={14} color="#0052FF" />
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#0F172A' }}>6 Legal Policies</span>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                    Legal Center Hub
                  </h3>
                  <p style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.5 }}>
                    Master agreements, DPDP Act 2023 compliance, and intermediary safe harbor repository.
                  </p>
                </Link>

                {/* Card 2: Milestone Policy */}
                <Link
                  href="/escrow-policy"
                  onClick={closeMenu}
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '12px',
                    borderRadius: '8px',
                    transition: 'all 0.15s ease',
                  }}
                  className="mega-menu-card"
                >
                  <div style={{
                    height: '110px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #F0FDF4 0%, #EFF6FF 100%)',
                    border: '1px solid #DCFCE7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '14px',
                  }}>
                    <div style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #BBF7D0',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.12)',
                    }}>
                      <LockIcon size={14} color="#059669" />
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#0F172A' }}>72h Auto-Approval SLA</span>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                    Milestone & Settlement Policy
                  </h3>
                  <p style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.5 }}>
                    5% deterministic platform commission, review windows, and release irrevocability.
                  </p>
                </Link>

                {/* Card 3: Free Tools & Calculators */}
                <Link
                  href="/pricing"
                  onClick={closeMenu}
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '12px',
                    borderRadius: '8px',
                    transition: 'all 0.15s ease',
                  }}
                  className="mega-menu-card"
                >
                  <div style={{
                    height: '110px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #FAF5FF 0%, #EFF6FF 100%)',
                    border: '1px solid #F3E8FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '14px',
                  }}>
                    <div style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E9D5FF',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 4px 12px rgba(168, 85, 247, 0.12)',
                    }}>
                      <SparklesIcon size={14} color="#A855F7" />
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#0F172A' }}>Interactive Estimator</span>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                    Free Tools & Calculators
                  </h3>
                  <p style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.5 }}>
                    Creator pricing estimator, fake follower audit, and rate card simulator.
                  </p>
                </Link>

                {/* Card 4: ASCI & Advertising Compliance */}
                <Link
                  href="/influencer-compliance"
                  onClick={closeMenu}
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '12px',
                    borderRadius: '8px',
                    transition: 'all 0.15s ease',
                  }}
                  className="mega-menu-card"
                >
                  <div style={{
                    height: '110px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #FFFBEB 0%, #EFF6FF 100%)',
                    border: '1px solid #FEF3C7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '14px',
                  }}>
                    <div style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #FDE68A',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 4px 12px rgba(217, 119, 6, 0.12)',
                    }}>
                      <ScaleIcon size={14} color="#D97706" />
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#0F172A' }}>#Ad / #Collab Rules</span>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                    ASCI Compliance Guide
                  </h3>
                  <p style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.5 }}>
                    Statutory advertising disclosure standards, CCPA consumer protection rules.
                  </p>
                </Link>

                {/* Right Column: Company & Programs */}
                <div style={{
                  borderLeft: '1px solid #F1F5F9',
                  paddingLeft: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Company & Docs
                  </div>

                  <Link href="/terms" onClick={closeMenu} style={{ fontSize: '13px', fontWeight: 600, color: '#334155', textDecoration: 'none' }} className="mega-link-hover">
                    Terms of Service (MSA)
                  </Link>
                  <Link href="/privacy" onClick={closeMenu} style={{ fontSize: '13px', fontWeight: 600, color: '#334155', textDecoration: 'none' }} className="mega-link-hover">
                    Privacy & DPDP Policy
                  </Link>
                  <Link href="/dispute-policy" onClick={closeMenu} style={{ fontSize: '13px', fontWeight: 600, color: '#334155', textDecoration: 'none' }} className="mega-link-hover">
                    Dispute & Arbitration
                  </Link>
                  <Link href="/pricing" onClick={closeMenu} style={{ fontSize: '13px', fontWeight: 600, color: '#334155', textDecoration: 'none' }} className="mega-link-hover">
                    Transparent 5% Pricing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

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
                  <Link href="/brand/creators" onClick={closeMenu} style={{ fontSize: '14px', fontWeight: 600, padding: '6px 0' }}>Product: Creator Intelligence</Link>
                  <Link href="/brand" onClick={closeMenu} style={{ fontSize: '14px', fontWeight: 600, padding: '6px 0' }}>Agency</Link>
                  <Link href="/pricing" onClick={closeMenu} style={{ fontSize: '14px', fontWeight: 600, padding: '6px 0' }}>Pricing</Link>
                  <Link href="/legal" onClick={closeMenu} style={{ fontSize: '14px', fontWeight: 600, padding: '6px 0' }}>Resources: Legal Hub</Link>
                  <Link href="/creator" onClick={closeMenu} style={{ fontSize: '14px', fontWeight: 600, padding: '6px 0' }}>For Creators</Link>
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '12px', borderBottom: '1px solid #E2E8F0' }}>
                  <Link href="/brand/creators" onClick={closeMenu} style={{ fontSize: '14px', fontWeight: 600 }}>Product</Link>
                  <Link href="/brand" onClick={closeMenu} style={{ fontSize: '14px', fontWeight: 600 }}>Agency</Link>
                  <Link href="/pricing" onClick={closeMenu} style={{ fontSize: '14px', fontWeight: 600 }}>Pricing</Link>
                  <Link href="/legal" onClick={closeMenu} style={{ fontSize: '14px', fontWeight: 600 }}>Resources</Link>
                  <Link href="/creator" onClick={closeMenu} style={{ fontSize: '14px', fontWeight: 600 }}>For Creators</Link>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Link href="/login" onClick={closeMenu} className="tia-btn-secondary" style={{ textAlign: 'center', padding: '12px' }}>
                    Log In
                  </Link>
                  <Link href="/register" onClick={closeMenu} className="tia-btn-primary" style={{ textAlign: 'center', padding: '12px' }}>
                    Get Started
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </header>
    </>
  );
};
