import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing & Fee Calculator — 5% Transparent Fee vs 30% Agency Markup',
  description:
    'Calculate your campaign ROI with TIA’s transparent 5.00% platform fee. See how brands save up to 73% compared to traditional influencer talent agencies with upfront milestone escrow protection.',
  alternates: {
    canonical: 'https://www.theinfluencers.agency/pricing',
  },
  openGraph: {
    title: 'Pricing & Fee Simulator | The Influencer’s Agency',
    description:
      'Compare TIA’s 5% transparent facilitation fee against traditional agency markups. Milestone escrow protection, automated contracts, and zero hidden costs.',
    url: 'https://www.theinfluencers.agency/pricing',
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
