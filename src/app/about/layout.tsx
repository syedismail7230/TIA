import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About The Influencer's Agency (TIA) — Mission, Leadership & Creator Economy Vision",
  description:
    'Learn about The Influencer’s Agency (TIA), our mission to eliminate middleman markups, 100% milestone escrow security, BotShield™ creator intelligence, and leadership.',
  alternates: {
    canonical: 'https://www.theinfluencers.agency/about',
  },
  openGraph: {
    title: "About The Influencer's Agency (TIA)",
    description:
      'The premier global creator intelligence platform replacing traditional 30% agency margins with an open 5% fee and guaranteed milestone escrow protection.',
    url: 'https://www.theinfluencers.agency/about',
    images: [
      {
        url: 'https://www.theinfluencers.agency/main-logo-cropped.png',
        width: 1200,
        height: 630,
        alt: "The Influencer's Agency Mission & Leadership",
      },
    ],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
