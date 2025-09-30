'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
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
  Target,
  Calendar
} from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href: string
  icon?: React.ReactNode
}

// Route to icon mapping
const routeIcons: Record<string, React.ReactNode> = {
  'admin': <LayoutDashboard className="h-4 w-4" />,
  'contacts': <Users className="h-4 w-4" />,
  'blog': <FileText className="h-4 w-4" />,
  'content-calendar': <Calendar className="h-4 w-4" />,
  'projects': <FolderOpen className="h-4 w-4" />,
  'analytics': <TrendingUp className="h-4 w-4" />,
  'website-metrics': <BarChart3 className="h-4 w-4" />,
  'competitors': <Target className="h-4 w-4" />,
  'revenue': <DollarSign className="h-4 w-4" />,
  'users': <Activity className="h-4 w-4" />,
  'settings': <Settings className="h-4 w-4" />
}

// Route to label mapping
const routeLabels: Record<string, string> = {
  'admin': 'Dashboard',
  'contacts': 'Contacts',
  'blog': 'Blog Management',
  'content-calendar': 'Content Calendar',
  'projects': 'Projects',
  'analytics': 'Analytics',
  'website-metrics': 'Website Metrics',
  'competitors': 'Competitors',
  'revenue': 'Revenue',
  'users': 'Users',
  'settings': 'Settings'
}

export function Breadcrumbs() {
  const pathname = usePathname()
  
  // Don't show breadcrumbs on login page
  if (pathname === '/admin/login') {
    return null
  }

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = pathname.split('/').filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = []

    // Add home breadcrumb
    breadcrumbs.push({
      label: 'Dashboard',
      href: '/admin',
      icon: <Home className="h-4 w-4" />
    })

    // Skip if we're already on the dashboard
    if (pathname === '/admin') {
      return breadcrumbs
    }

    let currentPath = ''
    
    for (let i = 0; i < pathSegments.length; i++) {
      const segment = pathSegments[i]
      currentPath += `/${segment}`
      
      // Skip the 'admin' segment as it's already handled by home
      if (segment === 'admin') {
        continue
      }

      const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
      const icon = routeIcons[segment]

      // For dynamic routes like /admin/projects/[id], handle the ID
      if (i === pathSegments.length - 1 && !routeLabels[segment] && segment.length > 10) {
        // This looks like an ID, use a generic label
        breadcrumbs.push({
          label: 'Details',
          href: currentPath,
          icon: <FileText className="h-4 w-4" />
        })
      } else {
        breadcrumbs.push({
          label,
          href: currentPath,
          icon
        })
      }
    }

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <nav className="flex items-center space-x-2 mb-6">
      <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg">
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={breadcrumb.href}>
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-neutral-400 dark:text-neutral-500" />
            )}
            
            {index === breadcrumbs.length - 1 ? (
              // Current page - not clickable
              <div className="flex items-center space-x-1.5 text-neutral-900 dark:text-white font-medium">
                {breadcrumb.icon && (
                  <span className="text-electric-400">{breadcrumb.icon}</span>
                )}
                <span className="text-sm">{breadcrumb.label}</span>
              </div>
            ) : (
              // Clickable breadcrumb
              <Link
                href={breadcrumb.href}
                className="flex items-center space-x-1.5 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200 group"
              >
                {breadcrumb.icon && (
                  <span className="text-neutral-500 dark:text-neutral-400 group-hover:text-electric-400 transition-colors duration-200">
                    {breadcrumb.icon}
                  </span>
                )}
                <span className="text-sm group-hover:text-neutral-900 dark:group-hover:text-white">
                  {breadcrumb.label}
                </span>
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  )
}