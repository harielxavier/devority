"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  TrendingUp, 
  BarChart3, 
  Activity,
  Settings,
  DollarSign,
  FolderOpen,
  LogOut,
  Building2
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function AdminSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  
  // Don't show sidebar on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }
  
  const links = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: (
        <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Contacts",
      href: "/admin/contacts",
      icon: (
        <Users className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Blog Management",
      href: "/admin/blog",
      icon: (
        <FileText className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Projects",
      href: "/admin/projects",
      icon: (
        <FolderOpen className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Analytics",
      href: "/admin/analytics",
      icon: (
        <TrendingUp className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Website Metrics",
      href: "/admin/website-metrics",
      icon: (
        <BarChart3 className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Revenue",
      href: "/admin/revenue",
      icon: (
        <DollarSign className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Users",
      href: "/admin/users",
      icon: (
        <Activity className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "/admin/settings",
      icon: (
        <Settings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-neutral-900 w-full overflow-hidden">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <div key={idx} className={cn(
                  pathname === link.href && "bg-neutral-200 dark:bg-neutral-700 rounded-lg"
                )}>
                  <SidebarLink link={link} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <SidebarLink
              link={{
                label: "Admin User",
                href: "#",
                icon: (
                  <Image
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                    className="h-7 w-7 flex-shrink-0 rounded-full object-cover"
                    width={50}
                    height={50}
                    alt="Admin Avatar"
                  />
                ),
              }}
            />
            <SidebarLink
              link={{
                label: "Logout",
                href: "/admin/logout",
                icon: (
                  <LogOut className="text-red-500 h-5 w-5 flex-shrink-0" />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      
      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto bg-white dark:bg-neutral-900">
          <div className="p-4 md:p-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="/admin"
      className="font-normal flex space-x-2 items-center text-sm text-black dark:text-white py-1 relative z-20"
    >
      <Building2 className="h-5 w-6 text-electric-400 flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-semibold text-black dark:text-white whitespace-pre"
      >
        Devority Admin
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="/admin"
      className="font-normal flex space-x-2 items-center text-sm text-black dark:text-white py-1 relative z-20"
    >
      <Building2 className="h-5 w-6 text-electric-400 flex-shrink-0" />
    </Link>
  );
};