import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dispute Arbitration & Milestone Refund Policy',
  description:
    'Comprehensive arbitration frameworks, objective deliverable inspection protocols, and financial resolution standards for brand-creator campaign contracts.',
  alternates: {
    canonical: 'https://www.theinfluencers.agency/dispute-policy',
  },
  openGraph: {
    title: 'Dispute Arbitration Policy | The Influencer’s Agency',
    description:
      'Structured 72-hour review windows, evidence-based mediation, and impartial escrow fund disposition.',
    url: 'https://www.theinfluencers.agency/dispute-policy',
  },
};

export default function DisputePolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
