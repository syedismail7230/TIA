'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRightIcon, CheckIcon } from '@/components/ui/Icons';

export const CreatorSpotlightSection: React.FC = () => {
  return (
    <section style={{
      width: '100%',
      backgroundColor: '#FFFFFF',
      borderTop: '1px solid #F1F5F9',
      borderBottom: '1px solid #F1F5F9',
      padding: '80px clamp(24px, 5vw, 96px)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '48px 64px',
      }}>
        {/* Left Column: Creator Image (Clean, No Card / No BG Box) */}
        <div style={{
          flex: '1 1 420px',
          maxWidth: '520px',
          minWidth: '280px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}>
          <img
            src="/influencer-home.png"
            alt="TIA Creator"
            style={{
              width: '100%',
              maxWidth: '480px',
              height: 'auto',
              maxHeight: '520px',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </div>

        {/* Right Column: Minimalist & Clean Editorial Copy */}
        <div style={{ flex: '1.1 1 460px', maxWidth: '580px' }}>
          <h2 style={{
            fontSize: 'clamp(32px, 4.5vw, 48px)',
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: '-0.025em',
            color: '#0F172A',
            marginBottom: '20px',
          }}>
            Create on your terms. <br />
            <span style={{ fontWeight: 600, color: '#0052FF' }}>Get paid without delay.</span>
          </h2>

          <p style={{
            fontSize: '16px',
            lineHeight: 1.7,
            color: '#64748B',
            fontWeight: 400,
            marginBottom: '32px',
          }}>
            TIA gives you complete control over your brand collaborations. Upfront escrow guarantees your payment before you begin, with standard 24-hour direct bank settlements upon delivery.
          </p>

          {/* Minimal 3-Point Checklist */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: '#EFF6FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <CheckIcon size={11} color="#0052FF" />
              </div>
              <span style={{ fontSize: '14.5px', color: '#334155', fontWeight: 500 }}>
                100% upfront escrow funding on every campaign
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: '#EFF6FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <CheckIcon size={11} color="#0052FF" />
              </div>
              <span style={{ fontSize: '14.5px', color: '#334155', fontWeight: 500 }}>
                Transparent 5% flat fee — you keep 95% of all earnings
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: '#EFF6FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <CheckIcon size={11} color="#0052FF" />
              </div>
              <span style={{ fontSize: '14.5px', color: '#334155', fontWeight: 500 }}>
                Direct bank payout released within 24 hours of approval
              </span>
            </div>
          </div>

          {/* Minimal Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <Link
              href="/register?role=CREATOR"
              className="tia-btn-primary"
              style={{
                padding: '14px 28px',
                fontSize: '14px',
                fontWeight: 600,
                backgroundColor: '#0052FF',
                borderColor: '#0052FF',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
              }}
            >
              <span>Join as Creator</span>
              <ArrowRightIcon size={14} color="#FFFFFF" />
            </Link>

            <Link
              href="/creator"
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#0052FF',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span>Explore creator tools</span>
              <span style={{ transition: 'transform 0.15s ease' }}>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
