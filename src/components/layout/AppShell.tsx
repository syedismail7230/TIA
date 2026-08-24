'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface AppShellProps {
  user: any;
  children: React.ReactNode;
}

export function AppShell({ user, children }: AppShellProps) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register';

  if (isAuthPage) {
    return <main style={{ minHeight: '100vh', width: '100%' }}>{children}</main>;
  }

  return (
    <>
      <Navbar user={user} />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </>
  );
}
