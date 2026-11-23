import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { getCurrentUser } from '@/lib/auth/session';
import { AppShell } from '@/components/layout/AppShell';
import { JsonLd } from '@/components/seo/JsonLd';

const SITE_URL = 'https://www.theinfluencers.agency';

export const viewport: Viewport = {
  themeColor: '#0052FF',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Influencer's Agency (TIA) — Global Creator Intelligence, Influencer Marketplace & Escrow",
    template: "%s | The Influencer's Agency (TIA)",
  },
  description:
    'The premier global creator intelligence platform and influencer marketing marketplace. Connect with verified creators across YouTube, Instagram & LinkedIn with upfront milestone escrow protection, BotShield™ trust scoring, and transparent 5% platform fees.',
  keywords: [
    // Core Platform Keywords
    'influencer marketing',
    'creator marketplace',
    'creator intelligence platform',
    'influencer agency',
    'verified influencers',
    'The Influencers Agency',
    'TIA',
    'theinfluencers.agency',
    // Financial & Escrow Keywords
    'influencer escrow',
    'escrow payments for creators',
    'milestone escrow marketing',
    'transparent influencer fees',
    '5 percent influencer agency',
    'secure creator payouts',
    'instant creator payouts UPI',
    'TDS compliance 194J influencer',
    // Verification & Fraud Detection (BotShield)
    'BotShield creator analytics',
    'fake follower checker',
    'influencer fraud detection',
    'authentic engagement score',
    'creator audience demographics',
    'verified YouTube creators',
    'verified Instagram influencers',
    'LinkedIn thought leaders',
    // High-Intent B2B / Brand Hiring Queries
    'hire influencers with escrow',
    'hire YouTube creators',
    'hire Instagram creators India',
    'hire micro influencers',
    'hire tech influencers',
    'D2C influencer marketing platform',
    'enterprise creator management',
    'influencer ROI tracking',
    // Legal & Contracting
    'influencer contract generator',
    'influencer master services agreement',
    'digital ad whitelisting rights',
    'dark posting licensing agreement',
    'ASCI influencer guidelines compliance',
    'FTC endorsement disclosure compliance',
    // Geographic Targeting (India + Global Hubs)
    'influencer marketing agency India',
    'influencer agency Mumbai',
    'influencer marketing Bengaluru',
    'influencer platform Delhi NCR',
    'creator economy India',
    'global influencer agency',
    'influencer marketing platform USA',
    'influencer marketing platform UK',
    'influencer marketing UAE Dubai',
  ],
  authors: [{ name: "The Influencer's Agency", url: 'https://www.theinfluencers.agency' }],
  creator: "The Influencer's Agency (TIA)",
  publisher: "The Influencer's Agency (TIA)",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://www.theinfluencers.agency',
    languages: {
      'en-US': 'https://www.theinfluencers.agency',
      'en-IN': 'https://www.theinfluencers.agency',
      'en-GB': 'https://www.theinfluencers.agency',
      'x-default': 'https://www.theinfluencers.agency',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['en_IN', 'en_GB'],
    url: 'https://www.theinfluencers.agency',
    siteName: "The Influencer's Agency (TIA)",
    title: "The Influencer's Agency (TIA) — Global Creator Intelligence, Escrow & Marketplace",
    description:
      'Eliminating information asymmetry between brands and creators. Guaranteed 100% milestone escrow protection, BotShield™ verified audience authenticity, and transparent 5% platform fees.',
    images: [
      {
        url: 'https://www.theinfluencers.agency/main-logo-cropped.png',
        width: 1200,
        height: 630,
        alt: "The Influencer's Agency - Creator Intelligence Platform",
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "The Influencer's Agency (TIA) — Global Creator Intelligence & Escrow",
    description:
      'Effortless creator campaigns with upfront milestone escrow, verified audience reach, and transparent 5% fee ledger.',
    site: '@theinfluencersagency',
    creator: '@theinfluencersagency',
    images: ['https://www.theinfluencers.agency/main-logo-cropped.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/main-logo-cropped.png' },
      { url: '/main-logo-cropped.png', sizes: '32x32', type: 'image/png' },
      { url: '/main-logo-cropped.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/main-logo-cropped.png',
    apple: [
      { url: '/main-logo-cropped.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  category: 'business',
  other: {
    // Generative Engine Optimization (GEO) & LLM context pointers
    'llms-txt': 'https://www.theinfluencers.agency/llms.txt',
    'llms-full-txt': 'https://www.theinfluencers.agency/llms-full.txt',
    // Geographic Search Engine Optimization (GEO) Tags
    'geo.region': 'IN',
    'geo.placename': 'India',
    'geo.position': '19.0760;72.8777',
    'ICBM': '19.0760, 72.8777',
    'DC.title': "The Influencer's Agency (TIA)",
    'DC.creator': "The Influencer's Agency",
    'DC.description': 'Global Creator Intelligence and Milestone Escrow Marketplace',
    'DC.language': 'en',
    // Search Engine Verification Placeholders (ready for Google Search Console, Bing, Yandex)
    'google-site-verification': 'google4c1a5b4869877b0b',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {/* Generative Engine Optimization (GEO) standard links */}
        <link rel="help" type="text/plain" href="/llms.txt" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="Full LLM Specification" />
        <script src="https://checkout.razorpay.com/v1/checkout.js" async />
        <JsonLd />
      </head>
      <body suppressHydrationWarning style={{ minHeight: '100vh', margin: 0, padding: 0 }}>
        <AppShell user={user}>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
