import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service (Master Services Agreement)',
  description:
    'Comprehensive platform rules, independent contractor covenants, milestone payment escrow enforcement, and limitation of liability for The Influencer’s Agency.',
  alternates: {
    canonical: 'https://www.theinfluencers.agency/terms',
  },
  openGraph: {
    title: 'Terms of Service | The Influencer’s Agency',
    description:
      'Official Master Services Agreement governing brand partnerships, creator engagements, and marketplace conduct.',
    url: 'https://www.theinfluencers.agency/terms',
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
