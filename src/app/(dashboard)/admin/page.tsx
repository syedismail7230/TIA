import React from 'react';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth/session';
import { AdminDashboardView } from '@/components/admin/AdminDashboardView';

export const metadata = {
  title: 'Governance & Command Center | The Influencer\'s Agency',
  description: 'Administrative command center for platform governance, verification, escrow, disputes, and compliance.',
};

export default async function AdminCenterPage() {
  const user = await getCurrentUser();
  if (!user || (!user.role.startsWith('TIA_') && user.role !== 'TIA_SUPER_ADMIN')) {
    redirect('/login');
  }

  return (
    <AdminDashboardView
      initialUser={{
        id: user.id,
        email: user.email,
        name: user.name || 'TIA Administrator',
        role: user.role,
      }}
    />
  );
}
