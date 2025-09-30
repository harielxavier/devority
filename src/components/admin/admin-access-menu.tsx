'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MoreHorizontal,
  Settings,
  Users,
  FileText,
  BarChart3,
  MessageSquare,
  LogOut,
  Shield,
  Briefcase,
  DollarSign,
  Activity
} from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

export function AdminAccessMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = createSupabaseBrowserClient();
        const { data } = await supabase.auth.getUser();
        setIsAuthenticated(!!data.user);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const supabase = createSupabaseBrowserClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    setIsOpen(false);
  };

  // Don't render if loading, not authenticated, or on admin pages
  if (isLoading || !isAuthenticated || pathname.startsWith('/admin')) {
    return null;
  }

  const menuItems = [
    {
      label: 'Dashboard',
      href: '/admin',
      icon: BarChart3,
      color: 'text-electric-400'
    },
    {
      label: 'Projects',
      href: '/admin/projects',
      icon: Briefcase,
      color: 'text-blue-400'
    },
    {
      label: 'Contacts & Leads',
      href: '/admin/contacts',
      icon: MessageSquare,
      color: 'text-magenta-400'
    },
    {
      label: 'Revenue & Finance',
      href: '/admin/revenue',
      icon: DollarSign,
      color: 'text-green-400'
    },
    {
      label: 'Website Performance',
      href: '/admin/website-metrics',
      icon: Activity,
      color: 'text-cyan-400'
    },
    {
      label: 'Blog & Content',
      href: '/admin/blog',
      icon: FileText,
      color: 'text-sunset-400'
    },
    {
      label: 'User Management',
      href: '/admin/users',
      icon: Users,
      color: 'text-royal-400'
    },
    {
      label: 'Analytics & Reports',
      href: '/admin/analytics',
      icon: BarChart3,
      color: 'text-electric-400'
    },
    {
      label: 'Settings',
      href: '/admin/settings',
      icon: Settings,
      color: 'text-white/70'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Menu Items */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-56 bg-midnight/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/10 bg-gradient-to-r from-electric-500/10 to-magenta-500/10">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-electric-400" />
                <span className="text-sm font-medium text-white">Admin Panel</span>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2 max-h-80 overflow-y-auto">
              {menuItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                    >
                      <IconComponent className={`w-4 h-4 ${item.color}`} />
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Sign Out */}
            <div className="border-t border-white/10 py-2">
              <button
                type="button"
                onClick={handleSignOut}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 w-full"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-gradient-to-r from-electric-500 to-magenta-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={isOpen ? { rotate: 90 } : { rotate: 0 }}
      >
        <MoreHorizontal className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-electric-500 to-magenta-500 rounded-full opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300" />
      </motion.button>

      {/* Tooltip when closed */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-midnight/90 backdrop-blur-sm border border-white/20 rounded-lg text-xs text-white/80 whitespace-nowrap pointer-events-none"
          >
            Admin Panel
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
