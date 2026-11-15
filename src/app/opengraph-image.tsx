import { ImageResponse } from 'next/og';

export const alt = "The Influencer's Agency (TIA) — Global Creator Intelligence & Marketplace";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #090d16 0%, #0c1427 45%, #051937 100%)',
          padding: '64px 72px',
          fontFamily: 'sans-serif',
          color: '#ffffff',
          position: 'relative',
        }}
      >
        {/* Glow Accent Circles */}
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            right: '-10%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 82, 255, 0.35) 0%, rgba(0, 82, 255, 0) 70%)',
          }}
        />

        {/* Top Header / Branding */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              backgroundColor: '#0052FF',
              color: '#ffffff',
              fontSize: '26px',
              fontWeight: 800,
            }}
          >
            #
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>
              The Influencer&apos;s Agency
            </span>
            <span style={{ fontSize: '13px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
              Global Creator Intelligence
            </span>
          </div>
        </div>

        {/* Hero Title & Value Proposition */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '980px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '999px',
              backgroundColor: 'rgba(0, 82, 255, 0.18)',
              border: '1px solid rgba(0, 82, 255, 0.4)',
              color: '#60A5FA',
              fontSize: '15px',
              fontWeight: 600,
            }}
          >
            <span>Verified Creator Marketplace</span>
            <span>•</span>
            <span>5% Transparent Fee</span>
          </div>

          <h1
            style={{
              fontSize: '56px',
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              margin: 0,
              color: '#ffffff',
            }}
          >
            Effortless Creator Campaigns with Guaranteed Milestone Escrow
          </h1>

          <p
            style={{
              fontSize: '22px',
              color: '#94A3B8',
              lineHeight: 1.4,
              margin: 0,
              maxWidth: '850px',
            }}
          >
            Direct collaboration between world-class brands and verified talent. Eliminating 30% agency margins with deterministic ledger protection.
          </p>
        </div>

        {/* Feature Badges Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '26px', fontWeight: 800, color: '#38BDF8' }}>100%</span>
            <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>Milestone Protected</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '26px', fontWeight: 800, color: '#38BDF8' }}>5.00%</span>
            <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>Flat Platform Fee</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '26px', fontWeight: 800, color: '#38BDF8' }}>615K+</span>
            <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>Verified Reach</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 'auto' }}>
            <span style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF' }}>www.theinfluencers.agency</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
