import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Influencer Advertising & ASCI Regulatory Compliance Guidelines',
  description:
    'Mandatory #Ad disclosure standards, consumer protection rules, ASCI compliance frameworks, and brand indemnity guidelines for creator marketing campaigns.',
  alternates: {
    canonical: 'https://www.theinfluencers.agency/influencer-compliance',
  },
  openGraph: {
    title: 'Influencer Advertising Compliance Guidelines | The Influencer’s Agency',
    description:
      'Standardized promotional disclosures, regulatory transparency, and legal protections for digital creator advertising.',
    url: 'https://www.theinfluencers.agency/influencer-compliance',
  },
};

export default function InfluencerComplianceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
