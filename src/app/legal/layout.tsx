import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal Governance & Regulatory Agreements Directory',
  description:
    'Complete legal repository of The Influencer’s Agency: Terms of Service, Privacy Policies, Milestone Escrow Ledger, Content IP Grants, and ASCI Advertising Compliance.',
  alternates: {
    canonical: 'https://www.theinfluencers.agency/legal',
  },
  openGraph: {
    title: 'Legal Governance & Agreements | The Influencer’s Agency',
    description:
      'Master contracts, compliance standards, and regulatory frameworks governing TIA platform transactions.',
    url: 'https://www.theinfluencers.agency/legal',
  },
};

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
