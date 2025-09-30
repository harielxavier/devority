import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Just return children directly - let individual pages handle their own layout
  return <>{children}</>;
}