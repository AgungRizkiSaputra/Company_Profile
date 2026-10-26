import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AdminDashboardClient } from '@/components/admin/AdminDashboardClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin RFQ Desk | PT Velmora Niaga Nusantara',
  description: 'Internal console for reviewing, quoting, and managing corporate B2B RFQ submissions.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('velmora_admin_token');

  // If no auth token, redirect to admin login
  if (!token || !token.value) {
    redirect('/admin/login');
  }

  return <AdminDashboardClient />;
}
