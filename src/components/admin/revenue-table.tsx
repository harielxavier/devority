'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { 
  Plus, 
  Edit, 
  Trash2,
  Filter,
  ExternalLink,
  Calendar,
  Building
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Revenue {
  id: string
  amount: number
  type: string
  description?: string | null
  status: string
  dueDate?: string | Date | null
  paidDate?: string | Date | null
  invoiceUrl?: string | null
  project?: {
    id: string
    name: string
    contact: {
      name: string
      company?: string | null
    }
  } | null
  contact?: {
    id: string
    name: string
    company?: string | null
  } | null
  createdAt: string | Date
}

interface Project {
  id: string
  name: string
  contact: {
    name: string
    company?: string | null
  }
}

interface Contact {
  id: string
  name: string
  email: string
  company?: string | null
}

interface RevenueTableProps {
  revenues: Revenue[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
  currentStatus: string
  currentType: string
  projects: Project[]
  contacts: Contact[]
}

export function RevenueTable({ 
  revenues, 
  pagination, 
  currentStatus, 
  currentType,
  projects,
  contacts
}: RevenueTableProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const statusColors = {
    pending: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    paid: 'bg-green-500/20 text-green-300 border-green-500/30',
    overdue: 'bg-red-500/20 text-red-300 border-red-500/30',
    cancelled: 'bg-gray-500/20 text-gray-300 border-gray-500/30'
  }

  const typeColors = {
    setup_fee: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    monthly_fee: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    one_time: 'bg-green-500/20 text-green-300 border-green-500/30',
    maintenance: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    hosting: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
  }

  const handleStatusFilter = (status: string) => {
    const params = new URLSearchParams(searchParams)
    if (status === 'all') {
      params.delete('status')
    } else {
      params.set('status', status)
    }
    params.set('page', '1')
    router.push(`/admin/revenue?${params.toString()}`)
  }

  const handleTypeFilter = (type: string) => {
    const params = new URLSearchParams(searchParams)
    if (type === 'all') {
      params.delete('type')
    } else {
      params.set('type', type)
    }
    params.set('page', '1')
    router.push(`/admin/revenue?${params.toString()}`)
  }

  const handleDelete = async (revenueId: string) => {
    if (!confirm('Are you sure you want to delete this revenue record?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/revenue/${revenueId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        router.refresh()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to delete revenue record')
      }
    } catch (error) {
      alert('Failed to delete revenue record')
    }
  }

  const formatDate = (dateString: string | Date | null | undefined) => {
    if (!dateString) return 'N/A';
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString('en-US', {
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

  const isOverdue = (revenue: Revenue) => {
    return revenue.status === 'pending' && revenue.dueDate && new Date(revenue.dueDate) < new Date()
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-white/60" />
              <select
                value={currentStatus}
                onChange={(e) => handleStatusFilter(e.target.value)}
                className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-electric-500/50"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <select
              value={currentType}
              onChange={(e) => handleTypeFilter(e.target.value)}
              className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-electric-500/50"
            >
              <option value="all">All Types</option>
              <option value="setup_fee">Setup Fee</option>
              <option value="monthly_fee">Monthly Fee</option>
              <option value="one_time">One Time</option>
              <option value="maintenance">Maintenance</option>
              <option value="hosting">Hosting</option>
            </select>
          </div>

          {/* Create Button */}
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-electric-500 hover:bg-electric-600 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Revenue
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-white/80">Amount</th>
              <th className="text-left p-4 text-sm font-medium text-white/80">Type</th>
              <th className="text-left p-4 text-sm font-medium text-white/80">Client/Project</th>
              <th className="text-left p-4 text-sm font-medium text-white/80">Status</th>
              <th className="text-left p-4 text-sm font-medium text-white/80">Due Date</th>
              <th className="text-left p-4 text-sm font-medium text-white/80">Actions</th>
            </tr>
          </thead>
          <tbody>
            {revenues.map((revenue) => (
              <tr 
                key={revenue.id} 
                className={`border-t border-white/5 hover:bg-white/5 transition-colors ${
                  isOverdue(revenue) ? 'bg-red-500/5' : ''
                }`}
              >
                <td className="p-4">
                  <div>
                    <div className="font-bold text-white text-lg">{formatCurrency(revenue.amount)}</div>
                    {revenue.description && (
                      <div className="text-sm text-white/60 truncate max-w-xs">
                        {revenue.description}
                      </div>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${typeColors[revenue.type as keyof typeof typeColors] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'}`}>
                    {revenue.type.replace('_', ' ').toUpperCase()}
                  </span>
                </td>
                <td className="p-4">
                  <div>
                    {revenue.project ? (
                      <>
                        <div className="font-medium text-white">{revenue.project.name}</div>
                        <div className="text-sm text-white/60">{revenue.project.contact.name}</div>
                        {revenue.project.contact.company && (
                          <div className="text-xs text-white/50 flex items-center gap-1 mt-1">
                            <Building className="h-3 w-3" />
                            {revenue.project.contact.company}
                          </div>
                        )}
                      </>
                    ) : revenue.contact ? (
                      <>
                        <div className="font-medium text-white">{revenue.contact.name}</div>
                        {revenue.contact.company && (
                          <div className="text-sm text-white/60 flex items-center gap-1">
                            <Building className="h-3 w-3" />
                            {revenue.contact.company}
                          </div>
                        )}
                      </>
                    ) : (
                      <span className="text-white/50">No client assigned</span>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[revenue.status as keyof typeof statusColors]}`}>
                    {revenue.status.toUpperCase()}
                    {isOverdue(revenue) && ' (OVERDUE)'}
                  </span>
                </td>
                <td className="p-4">
                  <div>
                    {revenue.dueDate && (
                      <div className={`text-sm ${isOverdue(revenue) ? 'text-red-300' : 'text-white/80'}`}>
                        <Calendar className="h-3 w-3 inline mr-1" />
                        {formatDate(revenue.dueDate)}
                      </div>
                    )}
                    {revenue.paidDate && (
                      <div className="text-xs text-green-300 mt-1">
                        Paid: {formatDate(revenue.paidDate)}
                      </div>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {revenue.invoiceUrl && (
                      <a href={revenue.invoiceUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </a>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(revenue.id)}
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
            Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} revenue records
          </div>
          <div className="flex items-center gap-2">
            {pagination.hasPrev && (
              <Link href={`/admin/revenue?${new URLSearchParams({ ...Object.fromEntries(searchParams), page: (pagination.page - 1).toString() }).toString()}`}>
                <Button variant="ghost" size="sm">Previous</Button>
              </Link>
            )}
            <span className="px-3 py-1 bg-white/10 rounded text-sm text-white">
              {pagination.page} of {pagination.totalPages}
            </span>
            {pagination.hasNext && (
              <Link href={`/admin/revenue?${new URLSearchParams({ ...Object.fromEntries(searchParams), page: (pagination.page + 1).toString() }).toString()}`}>
                <Button variant="ghost" size="sm">Next</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
