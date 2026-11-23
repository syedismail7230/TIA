import React from 'react';

// ============================================================================
// VECTOR SVG BRAND & NAVIGATION ICONS
// ============================================================================

export function MarketplaceIcon({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

export function CollabsIcon({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export function PaymentsIcon({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );
}

export function SocialsIcon({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

export function SettingsIcon({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

export function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <defs>
        <radialGradient id="ig-g" cx="20%" cy="100%" r="130%">
          <stop offset="0%" stopColor="#FFDD55" />
          <stop offset="25%" stopColor="#FF543E" />
          <stop offset="50%" stopColor="#C837AB" />
          <stop offset="100%" stopColor="#377424" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ig-l" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#405DE6" />
          <stop offset="30%" stopColor="#5851DB" />
          <stop offset="50%" stopColor="#833AB4" />
          <stop offset="70%" stopColor="#C13584" />
          <stop offset="85%" stopColor="#E1306C" />
          <stop offset="100%" stopColor="#FD1D1D" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#ig-l)" />
      <rect width="24" height="24" rx="6" fill="url(#ig-g)" />
      <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" stroke="#FFFFFF" strokeWidth="1.75" fill="none" />
      <circle cx="12" cy="12" r="3.25" stroke="#FFFFFF" strokeWidth="1.75" fill="none" />
      <circle cx="15.5" cy="8.5" r="0.85" fill="#FFFFFF" />
    </svg>
  );
}

export function YouTubeIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#FF0000" />
      <path d="M9.5 8.5L16 12L9.5 15.5V8.5Z" fill="#FFFFFF" />
    </svg>
  );
}

export function TikTokIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#000000" />
      <path
        d="M14.5 6C15.2 7.2 16.3 8 17.8 8.1V10.5C16.6 10.5 15.5 10.1 14.5 9.4V14.3C14.5 16.8 12.5 18.8 10 18.8C7.5 18.8 5.5 16.8 5.5 14.3C5.5 11.8 7.5 9.8 10 9.8C10.4 9.8 10.8 9.9 11.2 10V12.4C10.8 12.2 10.4 12.1 10 12.1C8.8 12.1 7.8 13.1 7.8 14.3C7.8 15.5 8.8 16.5 10 16.5C11.2 16.5 12.2 15.5 12.2 14.3V6H14.5Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function XIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#0F172A" />
      <path
        d="M15.8 6.5H17.6L13.7 10.9L18.3 17.5H14.7L11.8 13.7L8.6 17.5H6.8L11 12.7L6.5 6.5H10.2L12.8 10.1L15.8 6.5ZM15.2 16.4H16.2L9.7 7.5H8.6L15.2 16.4Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function PinterestIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#E60023" />
      <path
        d="M12 5.5C8.4 5.5 5.5 8.4 5.5 12C5.5 14.8 7.2 17.1 9.7 18C9.6 17.5 9.6 16.6 9.7 16.1C9.8 15.6 10.6 12.2 10.6 12.2C10.6 12.2 10.4 11.7 10.4 11C10.4 9.9 11 9.1 11.8 9.1C12.5 9.1 12.8 9.6 12.8 10.2C12.8 10.9 12.3 11.9 12.1 12.9C11.9 13.8 12.6 14.5 13.5 14.5C15.1 14.5 16.4 12.8 16.4 10.4C16.4 8.3 14.9 6.8 12.2 6.8C9.1 6.8 7.3 9.1 7.3 11.7C7.3 12.6 7.7 13.6 8.1 14.1C8.2 14.2 8.2 14.3 8.1 14.5C8 14.8 7.8 15.6 7.7 15.8C7.6 16 7.4 16.1 7.2 16C5.8 15.4 4.9 13.4 4.9 11.6C4.9 8.1 7.5 5 12.3 5C16.2 5 19.1 7.8 19.1 11.5C19.1 15.3 16.7 18.3 13.3 18.3C12.2 18.3 11.2 17.7 10.8 17C10.8 17 10.1 19.7 10 20.2C9.8 20.9 9.3 21.8 8.9 22.4C9.9 22.7 10.9 22.9 12 22.9C17.5 22.9 22 18.4 22 12.9C22 7.4 17.5 5.5 12 5.5Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function PercentBadgeIcon({ size = 12, color = '#7C3AED' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="9" y1="15" x2="15" y2="9" />
      <circle cx="9.5" cy="9.5" r="1" fill={color} />
      <circle cx="14.5" cy="14.5" r="1" fill={color} />
    </svg>
  );
}

export function SparklesIcon({ size = 13, color = '#0052FF' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6l2.1 2.1M5.6 18.4l2.1-2.1m8.6-8.6l2.1-2.1" />
    </svg>
  );
}

export function SlidersIcon({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  );
}

export function InfoCircleIcon({ size = 13, color = '#D97706' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

export function CountryFlag({ code, size = 18 }: { code: string; size?: number }) {
  if (!code || code.toUpperCase() === 'ALL') return null;
  const width = size;
  const height = Math.round((size * 3) / 4);

  return (
    <img
      src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
      srcSet={`https://flagcdn.com/w80/${code.toLowerCase()}.png 2x`}
      width={width}
      height={height}
      alt={code}
      style={{
        borderRadius: '2px',
        objectFit: 'cover',
        display: 'inline-block',
        flexShrink: 0,
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
        verticalAlign: 'middle',
      }}
      loading="lazy"
    />
  );
}


