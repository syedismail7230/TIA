import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Content IP Copyright, Licensing & Paid Whitelisting Policy',
  description:
    'Commercial content usage grants, 90-day advertising whitelisting, dark-posting rules, music copyright clearances, and digital asset ownership standards.',
  alternates: {
    canonical: 'https://www.theinfluencers.agency/ip-licensing',
  },
  openGraph: {
    title: 'Content Licensing & IP Policy | The Influencer’s Agency',
    description:
      'Clear commercial licensing terms, advertising permissions, and creator intellectual property safeguards.',
    url: 'https://www.theinfluencers.agency/ip-licensing',
  },
};

export default function IpLicensingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
