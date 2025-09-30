'use client'

import { AdminSidebar } from './admin-sidebar'

export function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  return <AdminSidebar>{children}</AdminSidebar>
}