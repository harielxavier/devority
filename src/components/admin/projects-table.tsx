'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  Filter,
  Calendar,
  DollarSign,
  User,
  Building
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Project {
  id: string
  name: string
  description?: string | null
  status: string
  priority: string
  startDate?: string | Date | null
  endDate?: string | Date | null
  budget?: number | null
  progress: number
  contact: {
    id: string
    name: string
    email: string
    company?: string | null
    industry?: string | null
  }
  manager?: {
    id: string
    name: string | null
    email: string
  } | null
  tasks: Array<{ id: string; status: string }>
  _count: { tasks: number }
  createdAt: string | Date
}

interface Contact {
  id: string
  name: string
  email: string
  company?: string | null
  industry?: string | null
}

interface User {
  id: string
  name: string | null
  email: string
}

interface ProjectsTableProps {
  projects: Project[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
  currentStatus: string
  currentSearch: string
  contacts: Contact[]
  users: User[]
}

export function ProjectsTable({ 
  projects, 
  pagination, 
  currentStatus, 
  currentSearch,
  contacts,
  users
}: ProjectsTableProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchValue, setSearchValue] = useState(currentSearch)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const statusColors = {
    DISCOVERY: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    PROPOSAL: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    DESIGN: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    DEVELOPMENT: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    REVIEW: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    LAUNCH: 'bg-green-500/20 text-green-300 border-green-500/30',
    MAINTENANCE: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    COMPLETED: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    CANCELLED: 'bg-red-500/20 text-red-300 border-red-500/30'
  }

  const priorityColors = {
    LOW: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    MEDIUM: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    HIGH: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    URGENT: 'bg-red-500/20 text-red-300 border-red-500/30'
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    if (searchValue) {
      params.set('search', searchValue)
    } else {
      params.delete('search')
    }
    params.set('page', '1')
    router.push(`/admin/projects?${params.toString()}`)
  }

  const handleStatusFilter = (status: string) => {
    const params = new URLSearchParams(searchParams)
    if (status === 'all') {
      params.delete('status')
    } else {
      params.set('status', status)
    }
    params.set('page', '1')
    router.push(`/admin/projects?${params.toString()}`)
  }

  const handleDelete = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/projects/${projectId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        router.refresh()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to delete project')
      }
    } catch (error) {
      alert('Failed to delete project')
    }
  }

  const formatDate = (dateString: string | Date | null | undefined) => {
    if (!dateString) return "N/A";
    const date = typeof dateString === "string" ? new Date(dateString) : dateString; return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const getTaskProgress = (tasks: Array<{ status: string }>) => {
    if (tasks.length === 0) return 0
    const completed = tasks.filter(task => task.status === 'COMPLETED').length
    return Math.round((completed / tasks.length) * 100)
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
              />
            </div>
          </form>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-white/60" />
            <select
              value={currentStatus}
              onChange={(e) => handleStatusFilter(e.target.value)}
              className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-electric-500/50"
            >
              <option value="all">All Status</option>
              <option value="discovery">Discovery</option>
              <option value="proposal">Proposal</option>
              <option value="design">Design</option>
              <option value="development">Development</option>
              <option value="review">Review</option>
              <option value="launch">Launch</option>
              <option value="maintenance">Maintenance</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Create Button */}
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-electric-500 hover:bg-electric-600 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-white/80">Project</th>
              <th className="text-left p-4 text-sm font-medium text-white/80">Client</th>
              <th className="text-left p-4 text-sm font-medium text-white/80">Status</th>
              <th className="text-left p-4 text-sm font-medium text-white/80">Progress</th>
              <th className="text-left p-4 text-sm font-medium text-white/80">Budget</th>
              <th className="text-left p-4 text-sm font-medium text-white/80">Manager</th>
              <th className="text-left p-4 text-sm font-medium text-white/80">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4">
                  <div>
                    <div className="font-medium text-white">{project.name}</div>
                    <div className="text-sm text-white/60 truncate max-w-xs">
                      {project.description || 'No description'}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${priorityColors[project.priority as keyof typeof priorityColors]}`}>
                        {project.priority}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <div className="font-medium text-white">{project.contact.name}</div>
                    <div className="text-sm text-white/60">{project.contact.email}</div>
                    {project.contact.company && (
                      <div className="text-xs text-white/50 flex items-center gap-1 mt-1">
                        <Building className="h-3 w-3" />
                        {project.contact.company}
                      </div>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[project.status as keyof typeof statusColors]}`}>
                    {project.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="w-full">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-white/80">{project.progress}%</span>
                      <span className="text-white/60">{project._count.tasks} tasks</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-electric-500 to-sunset-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-white/80">
                    {project.budget ? formatCurrency(project.budget) : 'Not set'}
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    {project.manager ? (
                      <>
                        <div className="font-medium text-white">{project.manager.name}</div>
                        <div className="text-sm text-white/60">{project.manager.email}</div>
                      </>
                    ) : (
                      <span className="text-white/50">Unassigned</span>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/projects/${project.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(project.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="p-4 border-t border-white/10 flex items-center justify-between">
          <div className="text-sm text-white/60">
            Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} projects
          </div>
          <div className="flex items-center gap-2">
            {pagination.hasPrev && (
              <Link href={`/admin/projects?${new URLSearchParams({ ...Object.fromEntries(searchParams), page: (pagination.page - 1).toString() }).toString()}`}>
                <Button variant="ghost" size="sm">Previous</Button>
              </Link>
            )}
            <span className="px-3 py-1 bg-white/10 rounded text-sm text-white">
              {pagination.page} of {pagination.totalPages}
            </span>
            {pagination.hasNext && (
              <Link href={`/admin/projects?${new URLSearchParams({ ...Object.fromEntries(searchParams), page: (pagination.page + 1).toString() }).toString()}`}>
                <Button variant="ghost" size="sm">Next</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
