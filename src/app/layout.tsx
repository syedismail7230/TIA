import type { Metadata } from 'next';
import '@/styles/globals.css';
import { getCurrentUser } from '@/lib/auth/session';
import { AppShell } from '@/components/layout/AppShell';

export const metadata: Metadata = {
  title: "The Influencer's Agency (TIA) — Global Creator Intelligence & Marketplace",
  description:
    'A global creator intelligence and campaign marketplace eliminating information asymmetry between brands and creators.',
  icons: {
    icon: '/main-logo-cropped.png',
    apple: '/main-logo-cropped.png',
  },
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
      </head>
      <body suppressHydrationWarning style={{ minHeight: '100vh', margin: 0, padding: 0 }}>
        <AppShell user={user}>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
