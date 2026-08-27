'use client';

import React from 'react';

interface FullBrandLogo {
  name: string;
  src: string;
  height: number;
}

const FULL_BRAND_LOGOS: FullBrandLogo[] = [
  // Top Global Product Companies
  { name: 'Apple', src: '/logos/apple-full.svg', height: 28 },
  { name: 'Nike', src: '/logos/nike-full.svg', height: 28 },
  { name: 'Samsung', src: '/logos/samsung-full.svg', height: 30 },
  { name: 'Sony', src: '/logos/sony-full.svg', height: 26 },
  { name: 'Adidas', src: '/logos/adidas-full.svg', height: 28 },
  { name: 'Tesla', src: '/logos/tesla-full.svg', height: 26 },
  { name: 'Red Bull', src: '/logos/redbull-full.svg', height: 32 },
  { name: 'Starbucks', src: '/logos/starbucks-full.svg', height: 32 },
  { name: 'Coca-Cola', src: '/logos/cocacola-full.svg', height: 30 },
  { name: 'Zara', src: '/logos/zara-full.svg', height: 26 },
  { name: 'Bose', src: '/logos/bose-full.svg', height: 26 },
  { name: 'Puma', src: '/logos/puma-full.svg', height: 28 },

  // Top Tech & Creator Platforms
  { name: 'Spotify', src: '/logos/spotify-full.svg', height: 32 },
  { name: 'Stripe', src: '/logos/stripe-full.svg', height: 28 },
  { name: 'Shopify', src: '/logos/shopify-full.svg', height: 30 },
  { name: 'Canva', src: '/logos/canva-full.svg', height: 28 },
  { name: 'Figma', src: '/logos/figma-full.svg', height: 28 },
  { name: 'Discord', src: '/logos/discord-full.svg', height: 28 },
  { name: 'Airbnb', src: '/logos/airbnb-full.svg', height: 30 },
  { name: 'Google', src: '/logos/google-full.svg', height: 28 },
  { name: 'Amazon', src: '/logos/amazon-full.svg', height: 28 },
  { name: 'Netflix', src: '/logos/netflix-full.svg', height: 26 },
  { name: 'Uber', src: '/logos/uber-full.svg', height: 26 },
  { name: 'GitHub', src: '/logos/github-full.svg', height: 28 },
  { name: 'Notion', src: '/logos/notion-full.svg', height: 26 },
  { name: 'Duolingo', src: '/logos/duolingo-full.svg', height: 26 },
  { name: 'Twitch', src: '/logos/twitch-full.svg', height: 26 },
];

export const BrandLogos: React.FC = () => {
  // Duplicate array for seamless infinite marquee loop
  const marqueeItems = [...FULL_BRAND_LOGOS, ...FULL_BRAND_LOGOS];

  return (
    <section style={{
      borderTop: '1px solid #E2E8F0',
      borderBottom: '1px solid #E2E8F0',
      backgroundColor: '#F8FAFC',
      padding: '40px 0',
      width: '100%',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <div style={{ width: '100%', margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          fontSize: '12.5px',
          fontWeight: 600,
          color: '#64748B',
          letterSpacing: '0.04em',
          marginBottom: '24px',
          padding: '0 20px',
        }}>
          Trusted by the world’s most innovative consumer brands, product companies & creator teams
        </div>

        {/* Marquee Container with Gradient Edge Fades */}
        <div className="brand-marquee-container" style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
        }}>
          {/* Gradient Masks */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '160px',
            background: 'linear-gradient(to right, #F8FAFC 25%, rgba(248, 250, 252, 0) 100%)',
            zIndex: 2,
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '160px',
            background: 'linear-gradient(to left, #F8FAFC 25%, rgba(248, 250, 252, 0) 100%)',
            zIndex: 2,
            pointerEvents: 'none',
          }} />

          {/* Continuous Loop Track */}
          <div className="brand-marquee-track">
            {marqueeItems.map((brand, idx) => (
              <div
                key={`${brand.name}-${idx}`}
                className="brand-marquee-item"
              >
                <img
                  src={brand.src}
                  alt={`${brand.name} Official Logo`}
                  style={{
                    height: `${brand.height}px`,
                    width: 'auto',
                    maxHeight: '34px',
                    maxWidth: '160px',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
                {/* Subtle Vertical Separator Line */}
                <div className="brand-item-separator" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
