import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy & Digital Personal Data Protection (DPDP)',
  description:
    'Our commitment to creator privacy, data collection transparency, cookie consent standards, and compliance with the Digital Personal Data Protection Act 2023.',
  alternates: {
    canonical: 'https://www.theinfluencers.agency/privacy',
  },
  openGraph: {
    title: 'Privacy & Data Protection Policy | The Influencer’s Agency',
    description:
      'Transparent data processing principles, social analytics retrieval safeguards, and user privacy rights on TIA.',
    url: 'https://www.theinfluencers.agency/privacy',
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
