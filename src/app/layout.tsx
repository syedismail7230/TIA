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
    'influencer marketing',
    'creator marketplace',
    'creator intelligence',
    'influencer agency',
    'verified influencers',
    'escrow payments for creators',
    'influencer contracts',
    'Instagram influencer marketing',
    'YouTube creator sponsorship',
    'LinkedIn thought leaders',
    'BotShield creator analytics',
    'influencer ROI tracking',
    'transparent influencer fees',
    'creator economy platform',
    'The Influencers Agency',
    'TIA',
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
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.theinfluencers.agency',
    siteName: "The Influencer's Agency (TIA)",
    title: "The Influencer's Agency (TIA) — Global Creator Intelligence & Marketplace",
    description:
      'Eliminating information asymmetry between brands and creators. Guaranteed milestone escrow protection, verified audience demographics, and transparent 5% platform fees.',
    images: [
      {
        url: 'https://www.theinfluencers.agency/main-logo-cropped.png',
        width: 1200,
        height: 630,
        alt: "The Influencer's Agency - Creator Intelligence Platform",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "The Influencer's Agency (TIA) — Global Creator Intelligence",
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
    icon: '/main-logo-cropped.png',
    shortcut: '/main-logo-cropped.png',
    apple: '/main-logo-cropped.png',
  },
  manifest: '/site.webmanifest',
  category: 'business',
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
