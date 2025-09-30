"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Building2,
  User as UserIcon,
  Target,
  Calendar,
  Search,
  Download,
  Menu,
  X,
  ChevronRight,
  Cpu,
  FileReport,
  Mail
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { CompactThemeToggle } from './theme-toggle';
import { GlobalSearch } from './global-search';

export function AdminSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const dragControls = useDragControls();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);
  
  // Auto-close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);
  
  // Handle escape key to close mobile sidebar
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileOpen]);
  
  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);
  
  // Touch handlers for swipe gestures
  const minSwipeDistance = 50;
  
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && mobileOpen) {
      setMobileOpen(false);
    }
    if (isRightSwipe && !mobileOpen && touchStart < 20) {
      // Only open on swipe from left edge
      setMobileOpen(true);
    }
  };
  
  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setMobileOpen(false);
    }
  };
  
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
      label: "Content Calendar",
      href: "/admin/content-calendar",
      icon: (
        <Calendar className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Email Templates",
      href: "/admin/email-templates",
      icon: (
        <Mail className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
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
      label: "AI Analytics",
      href: "/admin/ai-analytics",
      icon: (
        <Cpu className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
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
      label: "SEO Rankings",
      href: "/admin/seo-rankings",
      icon: (
        <Search className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Competitors",
      href: "/admin/competitors",
      icon: (
        <Target className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
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
      label: "Client Reports",
      href: "/admin/reports",
      icon: (
        <FileReport className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Data Export",
      href: "/admin/export",
      icon: (
        <Download className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
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
    <div 
      className="flex h-screen bg-gray-100 dark:bg-neutral-900 w-full overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-neutral-800">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-electric-400/50"
          >
            <Menu className="h-5 w-5" />
          </button>
          
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-6 text-electric-400 flex-shrink-0" />
            <span className="font-semibold text-black dark:text-white">Admin</span>
          </div>
          
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
        
        {/* Mobile Search Bar */}
        <div className="px-4 pb-4">
          <GlobalSearch className="w-full" />
        </div>
      </div>
      
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden"
            onClick={handleBackdropClick}
          >
            {/* Mobile Sidebar Drawer */}
            <motion.div
              ref={sidebarRef}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              drag="x"
              dragControls={dragControls}
              dragConstraints={{ left: -400, right: 0 }}
              dragElastic={0.1}
              onDragEnd={(_, info) => {
                if (info.offset.x < -100) {
                  setMobileOpen(false);
                }
              }}
              className="fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl border-r border-white/20 dark:border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Sidebar Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-6 text-electric-400 flex-shrink-0" />
                  <span className="font-semibold text-black dark:text-white">Devority Admin</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              
              {/* Mobile Sidebar Content */}
              <div className="flex flex-col h-full">
                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  {links.map((link, idx) => (
                    <Link
                      key={idx}
                      href={link.href}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group",
                        pathname === link.href 
                          ? "bg-electric-400/20 text-electric-400 border border-electric-400/30" 
                          : "text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-white/5"
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.icon}
                      <span className="font-medium">{link.label}</span>
                      <ChevronRight className="h-4 w-4 ml-auto opacity-50 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
                
                {/* Mobile Sidebar Footer */}
                <div className="p-4 border-t border-white/10 space-y-3">
                  {/* Theme Toggle */}
                  <div className="flex items-center justify-center">
                    <CompactThemeToggle />
                  </div>
                  
                  {/* User Profile */}
                  <Link
                    href="/admin/settings"
                    className="flex items-center gap-3 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-200"
                    onClick={() => setMobileOpen(false)}
                  >
                    {user?.user_metadata?.avatar_url ? (
                      <Image
                        src={user.user_metadata.avatar_url}
                        className="h-8 w-8 flex-shrink-0 rounded-full object-cover"
                        width={32}
                        height={32}
                        alt="Admin Avatar"
                      />
                    ) : (
                      <div className="h-8 w-8 flex-shrink-0 rounded-full bg-electric-400/20 flex items-center justify-center">
                        <UserIcon className="h-4 w-4 text-electric-400" />
                      </div>
                    )}
                    <span className="font-medium truncate">{user?.email || "Admin User"}</span>
                  </Link>
                  
                  {/* Logout */}
                  <Link
                    href="/admin/logout"
                    className="flex items-center gap-3 p-3 rounded-lg text-red-500 hover:bg-red-500/10 transition-all duration-200"
                    onClick={() => setMobileOpen(false)}
                  >
                    <LogOut className="h-5 w-5 flex-shrink-0" />
                    <span className="font-medium">Logout</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Desktop Sidebar */}
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
            {/* Theme Toggle */}
            <div className="flex items-center justify-center px-2 py-1">
              <CompactThemeToggle />
            </div>
            
            <SidebarLink
              link={{
                label: user?.email || "Admin User",
                href: "/admin/settings",
                icon: user?.user_metadata?.avatar_url ? (
                  <Image
                    src={user.user_metadata.avatar_url}
                    className="h-7 w-7 flex-shrink-0 rounded-full object-cover"
                    width={50}
                    height={50}
                    alt="Admin Avatar"
                  />
                ) : (
                  <div className="h-7 w-7 flex-shrink-0 rounded-full bg-electric-400/20 flex items-center justify-center">
                    <UserIcon className="h-4 w-4 text-electric-400" />
                  </div>
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
        {/* Desktop Header with Search */}
        <div className="hidden md:block bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-neutral-800">
          <div className="flex items-center justify-between p-4">
            <div className="flex-1 max-w-md">
              <GlobalSearch />
            </div>
            <div className="flex items-center gap-4">
              {/* Add any additional header items here */}
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto bg-white dark:bg-neutral-900">
          <div className="p-4 md:p-10 pt-20 md:pt-4">
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