'use client';

import React from 'react';

interface FullBrandLogo {
  name: string;
  src: string;
  height: number;
}

const FULL_BRAND_LOGOS: FullBrandLogo[] = [
  // Top Global Product Companies
  { name: 'Apple', src: '/logos/apple-full.svg', height: 48 },
  { name: 'Nike', src: '/logos/nike-full.svg', height: 48 },
  { name: 'Samsung', src: '/logos/samsung-full.svg', height: 50 },
  { name: 'Sony', src: '/logos/sony-full.svg', height: 46 },
  { name: 'Adidas', src: '/logos/adidas-full.svg', height: 48 },
  { name: 'Tesla', src: '/logos/tesla-full.svg', height: 46 },
  { name: 'Red Bull', src: '/logos/redbull-full.svg', height: 52 },
  { name: 'Starbucks', src: '/logos/starbucks-full.svg', height: 52 },
  { name: 'Coca-Cola', src: '/logos/cocacola-full.svg', height: 50 },
  { name: 'Zara', src: '/logos/zara-full.svg', height: 46 },
  { name: 'Bose', src: '/logos/bose-full.svg', height: 46 },
  { name: 'Puma', src: '/logos/puma-full.svg', height: 48 },

  // Top Tech & Creator Platforms
  { name: 'Spotify', src: '/logos/spotify-full.svg', height: 56 },
  { name: 'Stripe', src: '/logos/stripe-full.svg', height: 50 },
  { name: 'Shopify', src: '/logos/shopify-full.svg', height: 52 },
  { name: 'Canva', src: '/logos/canva-full.svg', height: 50 },
  { name: 'Figma', src: '/logos/figma-full.svg', height: 48 },
  { name: 'Discord', src: '/logos/discord-full.svg', height: 48 },
  { name: 'Airbnb', src: '/logos/airbnb-full.svg', height: 52 },
  { name: 'Google', src: '/logos/google-full.svg', height: 50 },
  { name: 'Amazon', src: '/logos/amazon-full.svg', height: 48 },
  { name: 'Netflix', src: '/logos/netflix-full.svg', height: 44 },
  { name: 'Uber', src: '/logos/uber-full.svg', height: 44 },
  { name: 'GitHub', src: '/logos/github-full.svg', height: 50 },
  { name: 'Notion', src: '/logos/notion-full.svg', height: 46 },
  { name: 'Duolingo', src: '/logos/duolingo-full.svg', height: 46 },
  { name: 'Twitch', src: '/logos/twitch-full.svg', height: 46 },
];

export const BrandLogos: React.FC = () => {
  // Duplicate array for seamless infinite marquee loop
  const marqueeItems = [...FULL_BRAND_LOGOS, ...FULL_BRAND_LOGOS];

  return (
    <section style={{
      borderTop: '1px solid #E2E8F0',
      borderBottom: '1px solid #E2E8F0',
      backgroundColor: '#F8FAFC',
      padding: '52px 0',
      width: '100%',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <div style={{ width: '100%', margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          fontSize: '13px',
          fontWeight: 600,
          color: '#64748B',
          letterSpacing: '0.04em',
          marginBottom: '32px',
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
                    maxHeight: '64px',
                    maxWidth: '220px',
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
