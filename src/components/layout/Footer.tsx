'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRightIcon,
  CheckIcon,
} from '@/components/ui/Icons';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [cookieAccepted, setCookieAccepted] = useState(true);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer style={{
      backgroundColor: '#F8FAFC',
      padding: '40px clamp(16px, 3vw, 48px) 32px clamp(16px, 3vw, 48px)',
      width: '100%',
      position: 'relative',
    }}>
      {/* Main Upfluence-Style Royal Blue Container with Light Gradient & Glows */}
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        backgroundColor: '#0052FF',
        backgroundImage: 'radial-gradient(circle at 85% 15%, rgba(125, 211, 252, 0.28) 0%, rgba(0, 82, 255, 0) 55%), radial-gradient(circle at 15% 85%, rgba(96, 165, 250, 0.25) 0%, rgba(0, 82, 255, 0) 50%), linear-gradient(135deg, #1A64FF 0%, #0052FF 50%, #003BBD 100%)',
        borderRadius: '28px',
        padding: '64px clamp(24px, 4.5vw, 72px) 44px clamp(24px, 4.5vw, 72px)',
        color: '#FFFFFF',
        boxShadow: '0 24px 60px rgba(0, 82, 255, 0.22)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle Ambient Light Reflections */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0) 100%)',
        }} />

        {/* 4-Column Main Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '48px 36px',
          marginBottom: '56px',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* Column 1: Brand Logo, Badges, Newsletter & Real Social Vector Logos */}
          <div style={{ gridColumn: 'span 1' }}>
            {/* Official White Logo */}
            <div style={{ marginBottom: '24px' }}>
              <img
                src="/logo-white-cropped.png"
                alt="The Influencer's Agency"
                style={{
                  height: '40px',
                  width: 'auto',
                  maxWidth: '220px',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>



            {/* Newsletter Subscription Box */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF', marginBottom: '10px' }}>
                TIA Intelligence Newsletter
              </div>

              {subscribed ? (
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontSize: '12.5px',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <CheckIcon size={14} color="#FFFFFF" />
                  <span>You&apos;re subscribed to TIA updates!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} style={{ position: 'relative', maxWidth: '300px' }}>
                  <input
                    type="email"
                    required
                    placeholder="Work Email*"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      backgroundColor: '#FFFFFF',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '12px 42px 12px 16px',
                      fontSize: '13px',
                      color: '#0F172A',
                      outline: 'none',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
                    }}
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    style={{
                      position: 'absolute',
                      right: '6px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      backgroundColor: '#0052FF',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      width: '30px',
                      height: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <ArrowRightIcon size={14} color="#FFFFFF" />
                  </button>
                </form>
              )}
            </div>

            {/* Real Vector Brand Logos for Social Networks */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="social-icon-btn"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.18)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="social-icon-btn"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.18)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="social-icon-btn"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.18)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="social-icon-btn"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.18)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>



              {/* Discord */}
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                className="social-icon-btn"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.18)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Resources */}
          <div>
            <div style={{
              fontSize: '15px',
              fontWeight: 800,
              color: '#FFFFFF',
              marginBottom: '18px',
              letterSpacing: '-0.01em',
            }}>
              Resources
            </div>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              fontSize: '14px',
            }}>
              <li><Link href="/brand/creators" className="blue-footer-link">Creator Marketplace</Link></li>
              <li><Link href="/brand" className="blue-footer-link">Campaign Studio</Link></li>
              <li><Link href="/creator" className="blue-footer-link">Rate Card Lock</Link></li>
              <li><Link href="/register?role=CREATOR" className="blue-footer-link">I&apos;m a Creator</Link></li>
              <li><Link href="/register?role=BRAND_ADMIN" className="blue-footer-link">I&apos;m a Brand</Link></li>
              <li><Link href="/brand/campaigns" className="blue-footer-link">Agency Management</Link></li>
              <li><Link href="/creator/collaborations" className="blue-footer-link">Case Studies & Guides</Link></li>
            </ul>
          </div>

          {/* Column 3: Free Tools */}
          <div>
            <div style={{
              fontSize: '15px',
              fontWeight: 800,
              color: '#FFFFFF',
              marginBottom: '18px',
              letterSpacing: '-0.01em',
            }}>
              Free tools
            </div>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              fontSize: '14px',
            }}>
              <li><Link href="/brand/creators" className="blue-footer-link">Instagram Fake Follower Audit</Link></li>
              <li><Link href="/creator" className="blue-footer-link">Creator Pricing Calculator</Link></li>
              <li><Link href="/brand/creators" className="blue-footer-link">Engagement Rate Checker</Link></li>
              <li><Link href="/creator/rate-card" className="blue-footer-link">Deliverable Rate Lock</Link></li>
              <li><Link href="/pricing" className="blue-footer-link">5% Platform Fee Estimator</Link></li>
              <li><Link href="/brand/creators" className="blue-footer-link">Free Influencer Search Tool</Link></li>
              <li><Link href="/brand" className="blue-footer-link">More Tools</Link></li>
            </ul>
          </div>

          {/* Column 4: About & Governance */}
          <div>
            <div style={{
              fontSize: '15px',
              fontWeight: 800,
              color: '#FFFFFF',
              marginBottom: '18px',
              letterSpacing: '-0.01em',
            }}>
              About
            </div>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              fontSize: '14px',
            }}>
              <li><Link href="/about" className="blue-footer-link">Meet the Team</Link></li>
              <li><Link href="/careers" className="blue-footer-link">Careers</Link></li>
              <li><Link href="/affiliates" className="blue-footer-link">Affiliate Program</Link></li>
              <li><Link href="/partners" className="blue-footer-link">Partner Program</Link></li>
              <li><Link href="/press" className="blue-footer-link">Press Kit</Link></li>
              <li><Link href="/pricing" className="blue-footer-link">Transparent 5% Pricing</Link></li>
              <li><Link href="/contact" className="blue-footer-link">Contact Us</Link></li>
              <li><Link href="/privacy" className="blue-footer-link">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Line */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.15)',
          paddingTop: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '12.5px',
          color: 'rgba(255, 255, 255, 0.75)',
        }}>
          <div>
            © {new Date().getFullYear()} The Influencer&apos;s Agency (TIA). All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>Deterministic 5% Ledger</span>
            <span>•</span>
            <span>Zero Floating Point Math</span>
            <span>•</span>
            <span>Milestone Protected</span>
          </div>
        </div>
      </div>

      {/* Clean Cookie Banner at Bottom */}
      {cookieAccepted && (
        <div style={{
          maxWidth: '1440px',
          margin: '20px auto 0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '12.5px',
          color: '#64748B',
          padding: '8px 16px',
        }}>
          <div>
            We use cookies to ensure that we give you the best experience on our website. If you continue to use this site we will assume that you are happy with it.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => setCookieAccepted(false)}
              style={{
                backgroundColor: '#0052FF',
                color: '#FFFFFF',
                border: 'none',
                padding: '7px 18px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Accept
            </button>
            <Link
              href="/privacy"
              style={{
                backgroundColor: '#003FE0',
                color: '#FFFFFF',
                padding: '7px 18px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      )}
    </footer>
  );
};
