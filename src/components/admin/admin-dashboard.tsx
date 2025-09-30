'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Users, 
  FileText, 
  Activity,
  TrendingUp,
  Settings,
  LogOut,
  Eye,
  Edit,
  Plus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SignOutButton } from '@/components/auth/sign-out-button'

interface DashboardData {
  stats: Array<{
    label: string
    value: string
    icon: string
    change: string
    color: string
  }>
  recentContacts: Array<{
    id: string
    name: string
    email: string
    company: string
    status: string
    createdAt: string
  }>
  recentBlogPosts: Array<{
    id: string
    title: string
    status: string
    author: string
    createdAt: string
  }>
  contactsByStatus: Record<string, number>
}

interface AdminDashboardProps {
  data: DashboardData
}

export function AdminDashboard({ data }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'contacts' | 'blog'>('overview')

  const iconMap = {
    Users,
    FileText,
    Activity,
    TrendingUp
  }

  const statusColors = {
    NEW: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    CONTACTED: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    QUALIFIED: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    CONVERTED: 'bg-green-500/20 text-green-300 border-green-500/30',
    CLOSED: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    Published: 'bg-green-500/20 text-green-300 border-green-500/30',
    Draft: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
  }

  const formatDate = (dateString: string | Date | null | undefined) => {
    if (!dateString) return "N/A";
    const date = typeof dateString === "string" ? new Date(dateString) : dateString; return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-white/60">Manage your website and business operations</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/settings">
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </Link>
            <SignOutButton />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'overview' 
                ? 'bg-electric-500/20 text-electric-300 border border-electric-500/30' 
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            Overview
          </button>
          <Link href="/admin/contacts">
            <button className="px-4 py-2 rounded-lg font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors">
              Contacts
            </button>
          </Link>
          <Link href="/admin/blog">
            <button className="px-4 py-2 rounded-lg font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors">
              Blog
            </button>
          </Link>
          <Link href="/admin/analytics">
            <button className="px-4 py-2 rounded-lg font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors">
              Analytics
            </button>
          </Link>
          <Link href="/admin/users">
            <button className="px-4 py-2 rounded-lg font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors">
              Users
            </button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {data.stats.map((stat, index) => {
            const IconComponent = iconMap[stat.icon as keyof typeof iconMap]
            return (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  {IconComponent && <IconComponent className={`h-8 w-8 ${stat.color}`} />}
                  <span className="text-xs text-green-400 font-medium">{stat.change}</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Contacts */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Recent Contacts</h3>
              <Link href="/admin/contacts">
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {data.recentContacts.slice(0, 5).map((contact) => (
                <div key={contact.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <div className="font-medium text-white">{contact.name}</div>
                    <div className="text-sm text-white/60">{contact.email}</div>
                    <div className="text-xs text-white/40">{contact.company}</div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${statusColors[contact.status as keyof typeof statusColors]}`}>
                      {contact.status}
                    </span>
                    <div className="text-xs text-white/40 mt-1">{formatDate(contact.createdAt)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Blog Posts */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Recent Blog Posts</h3>
              <Link href="/admin/blog">
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Manage
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {data.recentBlogPosts.slice(0, 5).map((post) => (
                <div key={post.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-white truncate">{post.title}</div>
                    <div className="text-sm text-white/60">by {post.author}</div>
                  </div>
                  <div className="text-right ml-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${statusColors[post.status as keyof typeof statusColors]}`}>
                      {post.status}
                    </span>
                    <div className="text-xs text-white/40 mt-1">{formatDate(post.createdAt)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <Link href="/admin/blog/new">
              <Button className="bg-electric-500 hover:bg-electric-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                New Blog Post
              </Button>
            </Link>
            <Link href="/admin/contacts">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Users className="h-4 w-4 mr-2" />
                View Contacts
              </Button>
            </Link>
            <Link href="/admin/settings">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
