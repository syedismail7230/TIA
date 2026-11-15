import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Milestone Protection & Escrow Settlement Policy',
  description:
    'Definitive commercial rules governing upfront milestone budget lock, the deterministic 5.00% platform fee ledger, 72-hour review windows, and release protocols on TIA.',
  alternates: {
    canonical: 'https://www.theinfluencers.agency/escrow-policy',
  },
  openGraph: {
    title: 'Milestone Protection & Escrow Policy | The Influencer’s Agency',
    description:
      'Guaranteed milestone budget lock and irrevocable payout release protocols protecting brands and creators from payment asymmetry.',
    url: 'https://www.theinfluencers.agency/escrow-policy',
  },
};

export default function EscrowPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
