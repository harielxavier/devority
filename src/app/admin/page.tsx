"use client";

import React, { useState } from 'react';
import { DataTable, StatusBadge } from '@/components/ui/data-table';
import { 
  Users, 
  Briefcase, 
  DollarSign, 
  Activity,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';

// Sample data types
interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  status: string;
  revenue: number;
  joinDate: string;
}

interface Project {
  id: string;
  name: string;
  client: string;
  status: string;
  progress: number;
  deadline: string;
  value: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  client: string;
  amount: number;
  status: string;
  dueDate: string;
}

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  label: string;
  author: string;
  published: string;
  status: string;
  views: number;
}

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const [activeTab, setActiveTab] = useState<'clients' | 'projects' | 'invoices' | 'blog'>('clients');

  // Sample data
  const clients: Client[] = [
    { id: '1', name: 'John Smith', email: 'john@smithlaw.com', company: 'Smith Law Firm', status: 'Active', revenue: 45000, joinDate: '2024-01-15' },
    { id: '2', name: 'Sarah Johnson', email: 'sarah@brightdental.com', company: 'Bright Dental', status: 'Active', revenue: 38000, joinDate: '2024-02-20' },
    { id: '3', name: 'Mike Chen', email: 'mike@chenplumbing.com', company: 'Chen Plumbing', status: 'Pending', revenue: 0, joinDate: '2024-03-10' },
    { id: '4', name: 'Lisa Rodriguez', email: 'lisa@tastyeats.com', company: 'Tasty Eats Restaurant', status: 'Active', revenue: 52000, joinDate: '2023-11-05' },
    { id: '5', name: 'David Park', email: 'david@parkelectric.com', company: 'Park Electric', status: 'Inactive', revenue: 28000, joinDate: '2023-09-12' },
  ];

  const projects: Project[] = [
    { id: '1', name: 'Law Firm Website Redesign', client: 'Smith Law Firm', status: 'In Progress', progress: 65, deadline: '2024-04-15', value: 15000 },
    { id: '2', name: 'Dental Booking System', client: 'Bright Dental', status: 'In Progress', progress: 40, deadline: '2024-05-01', value: 22000 },
    { id: '3', name: 'Restaurant Online Ordering', client: 'Tasty Eats', status: 'Completed', progress: 100, deadline: '2024-02-28', value: 18000 },
    { id: '4', name: 'AI Chatbot Integration', client: 'Smith Law Firm', status: 'Pending', progress: 0, deadline: '2024-06-01', value: 8000 },
    { id: '5', name: 'SEO Optimization Package', client: 'Chen Plumbing', status: 'In Progress', progress: 25, deadline: '2024-04-30', value: 5000 },
  ];

  const invoices: Invoice[] = [
    { id: '1', invoiceNumber: 'INV-2024-001', client: 'Smith Law Firm', amount: 5000, status: 'Paid', dueDate: '2024-03-15' },
    { id: '2', invoiceNumber: 'INV-2024-002', client: 'Bright Dental', amount: 7500, status: 'Pending', dueDate: '2024-04-01' },
    { id: '3', invoiceNumber: 'INV-2024-003', client: 'Tasty Eats', amount: 18000, status: 'Paid', dueDate: '2024-02-28' },
    { id: '4', invoiceNumber: 'INV-2024-004', client: 'Park Electric', amount: 3500, status: 'Overdue', dueDate: '2024-03-01' },
    { id: '5', invoiceNumber: 'INV-2024-005', client: 'Smith Law Firm', amount: 2500, status: 'Pending', dueDate: '2024-04-15' },
  ];

  const blogPosts: BlogPost[] = [
    { id: '1', title: 'AI-Powered Web Development: The Future is Here', summary: 'Discover how artificial intelligence is revolutionizing web development...', label: 'AI & Technology', author: 'Devority Team', published: '2024-01-15', status: 'Published', views: 1250 },
    { id: '2', title: 'Local SEO Strategies That Actually Work', summary: 'Master local search optimization with proven strategies...', label: 'SEO & Marketing', author: 'Sarah Martinez', published: '2024-01-08', status: 'Published', views: 890 },
    { id: '3', title: 'Building High-Converting Landing Pages', summary: 'Learn the psychology and design principles behind landing pages...', label: 'Conversion Optimization', author: 'Mike Chen', published: '2024-01-02', status: 'Published', views: 1100 },
    { id: '4', title: 'The Complete Guide to Website Performance', summary: 'Learn how to optimize your website for speed and performance...', label: 'Performance', author: 'David Kim', published: '2023-12-15', status: 'Draft', views: 0 },
    { id: '5', title: 'Mobile-First Design: Why It Matters in 2024', summary: 'Understand why mobile-first design is crucial for modern websites...', label: 'Web Design', author: 'Emma Rodriguez', published: '2023-12-28', status: 'Published', views: 750 },
  ];

  // Stats cards data
  const stats = [
    { label: 'Total Revenue', value: '$163,000', icon: DollarSign, change: '+12%' },
    { label: 'Active Clients', value: '24', icon: Users, change: '+3' },
    { label: 'Projects', value: '12', icon: Briefcase, change: '5 active' },
    { label: 'Blog Posts', value: '15', icon: FileText, change: '3 this month' },
  ];

  const supabase = createSupabaseServerClient()
  const { data } = await supabase.auth.getUser()
  if (!data.user) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      <div className="relative container mx-auto px-4 py-8">
        {/* Admin Header */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="text-white/60">
              Manage your clients, projects, and business analytics
            </p>
          </div>
          {/* Sign out */}
          <div className="flex-shrink-0">
            {/* @ts-expect-error Client component in server page */}
            {require('@/components/auth/sign-out-button').SignOutButton()}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className="h-8 w-8 text-electric-400" />
                <span className="text-xs text-green-400 font-medium">{stat.change}</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-white/60">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-white/5 backdrop-blur-xl rounded-lg p-1 w-fit">
          <button
            onClick={() => setActiveTab('clients')}
            className={`px-6 py-2 rounded-md font-medium text-sm transition-all duration-200 ${
              activeTab === 'clients'
                ? 'bg-electric-500 text-white shadow-lg'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            Clients
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-2 rounded-md font-medium text-sm transition-all duration-200 ${
              activeTab === 'projects'
                ? 'bg-electric-500 text-white shadow-lg'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('invoices')}
            className={`px-6 py-2 rounded-md font-medium text-sm transition-all duration-200 ${
              activeTab === 'invoices'
                ? 'bg-electric-500 text-white shadow-lg'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            Invoices
          </button>
          <button
            onClick={() => setActiveTab('blog')}
            className={`px-6 py-2 rounded-md font-medium text-sm transition-all duration-200 ${
              activeTab === 'blog'
                ? 'bg-electric-500 text-white shadow-lg'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            Blog
          </button>
        </div>

        {/* Tables */}
        <div className="space-y-6">
          {activeTab === 'clients' && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Client Management</h2>
              <DataTable
                data={clients}
                columns={[
                  { key: 'name', header: 'Name', sortable: true },
                  { key: 'email', header: 'Email', sortable: true },
                  { key: 'company', header: 'Company', sortable: true },
                  {
                    key: 'status',
                    header: 'Status',
                    render: (value) => <StatusBadge status={value} />,
                    sortable: true,
                  },
                  {
                    key: 'revenue',
                    header: 'Revenue',
                    render: (value) => (
                      <span className="font-medium text-green-400">
                        ${value.toLocaleString()}
                      </span>
                    ),
                    sortable: true,
                  },
                  {
                    key: 'joinDate',
                    header: 'Join Date',
                    render: (value) => new Date(value).toLocaleDateString(),
                    sortable: true,
                  },
                ]}
                onRowClick={(client) => console.log('Selected client:', client)}
              />
            </div>
          )}

          {activeTab === 'projects' && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Project Tracking</h2>
              <DataTable
                data={projects}
                columns={[
                  { key: 'name', header: 'Project', sortable: true },
                  { key: 'client', header: 'Client', sortable: true },
                  {
                    key: 'status',
                    header: 'Status',
                    render: (value) => <StatusBadge status={value} />,
                    sortable: true,
                  },
                  {
                    key: 'progress',
                    header: 'Progress',
                    render: (value) => (
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-electric-400 to-electric-600 transition-all duration-500"
                            style={{ width: `${value}%` }}
                          />
                        </div>
                        <span className="text-xs text-white/60">{value}%</span>
                      </div>
                    ),
                    sortable: true,
                  },
                  {
                    key: 'deadline',
                    header: 'Deadline',
                    render: (value) => {
                      const date = new Date(value);
                      const isOverdue = date < new Date() && value !== '100';
                      return (
                        <span className={isOverdue ? 'text-red-400' : 'text-white/70'}>
                          {date.toLocaleDateString()}
                        </span>
                      );
                    },
                    sortable: true,
                  },
                  {
                    key: 'value',
                    header: 'Value',
                    render: (value) => (
                      <span className="font-medium text-green-400">
                        ${value.toLocaleString()}
                      </span>
                    ),
                    sortable: true,
                  },
                ]}
                onRowClick={(project) => console.log('Selected project:', project)}
              />
            </div>
          )}

          {activeTab === 'invoices' && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Invoice Management</h2>
              <DataTable
                data={invoices}
                columns={[
                  { key: 'invoiceNumber', header: 'Invoice #', sortable: true },
                  { key: 'client', header: 'Client', sortable: true },
                  {
                    key: 'amount',
                    header: 'Amount',
                    render: (value) => (
                      <span className="font-medium text-green-400">
                        ${value.toLocaleString()}
                      </span>
                    ),
                    sortable: true,
                  },
                  {
                    key: 'status',
                    header: 'Status',
                    render: (value) => <StatusBadge status={value} />,
                    sortable: true,
                  },
                  {
                    key: 'dueDate',
                    header: 'Due Date',
                    render: (value, item) => {
                      const date = new Date(value);
                      const isOverdue = date < new Date() && item.status !== 'Paid';
                      return (
                        <span className={isOverdue ? 'text-red-400 font-medium' : 'text-white/70'}>
                          {date.toLocaleDateString()}
                        </span>
                      );
                    },
                    sortable: true,
                  },
                ]}
                onRowClick={(invoice) => console.log('Selected invoice:', invoice)}
              />
            </div>
          )}

          {activeTab === 'blog' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Blog Management</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-electric-500 text-white rounded-lg font-medium hover:bg-electric-600 transition-colors">
                  <Plus className="w-4 h-4" />
                  New Post
                </button>
              </div>
              <DataTable
                data={blogPosts}
                columns={[
                  { 
                    key: 'title', 
                    header: 'Title', 
                    sortable: true,
                    render: (value) => (
                      <div className="max-w-xs">
                        <div className="font-medium text-white truncate">{value}</div>
                      </div>
                    )
                  },
                  { 
                    key: 'label', 
                    header: 'Category', 
                    sortable: true,
                    render: (value) => (
                      <span className="px-2 py-1 bg-electric-500/20 text-electric-300 rounded text-xs font-medium">
                        {value}
                      </span>
                    )
                  },
                  { key: 'author', header: 'Author', sortable: true },
                  {
                    key: 'status',
                    header: 'Status',
                    render: (value) => <StatusBadge status={value} />,
                    sortable: true,
                  },
                  {
                    key: 'published',
                    header: 'Published',
                    render: (value) => new Date(value).toLocaleDateString(),
                    sortable: true,
                  },
                  {
                    key: 'views',
                    header: 'Views',
                    render: (value) => (
                      <span className="font-medium text-blue-400">
                        {value.toLocaleString()}
                      </span>
                    ),
                    sortable: true,
                  },
                  {
                    key: 'actions',
                    header: 'Actions',
                    render: (_, post) => (
                      <div className="flex items-center gap-2">
                        <button className="p-1 text-white/60 hover:text-electric-400 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-white/60 hover:text-red-400 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ),
                  },
                ]}
                onRowClick={(post) => console.log('Selected post:', post)}
              />
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-wrap gap-4">
          {activeTab === 'clients' && (
            <button className="px-6 py-3 bg-electric-500 text-white rounded-lg font-medium hover:bg-electric-600 transition-colors shadow-lg hover:shadow-electric-500/25">
              + Add New Client
            </button>
          )}
          {activeTab === 'projects' && (
            <button className="px-6 py-3 bg-electric-500 text-white rounded-lg font-medium hover:bg-electric-600 transition-colors shadow-lg hover:shadow-electric-500/25">
              + Create Project
            </button>
          )}
          {activeTab === 'invoices' && (
            <button className="px-6 py-3 bg-electric-500 text-white rounded-lg font-medium hover:bg-electric-600 transition-colors shadow-lg hover:shadow-electric-500/25">
              + Generate Invoice
            </button>
          )}
          {activeTab === 'blog' && (
            <button className="px-6 py-3 bg-electric-500 text-white rounded-lg font-medium hover:bg-electric-600 transition-colors shadow-lg hover:shadow-electric-500/25">
              + Create Blog Post
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
