'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft,
  Edit,
  Calendar,
  DollarSign,
  User,
  Building,
  Globe,
  Plus,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  FileText,
  Target
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProjectForm } from './project-form'

interface Project {
  id: string
  name: string
  description?: string | null
  status: string
  priority: string
  startDate?: string | Date | null
  endDate?: string | Date | null
  budget?: number | null
  actualCost?: number | null
  progress: number
  websiteUrl?: string | null
  contactId: string
  contact: {
    id: string
    name: string
    email: string
    phone?: string | null
    company?: string | null
    industry?: string | null
  }
  manager?: {
    id: string
    name: string | null
    email: string
  } | null
  tasks: Array<{
    id: string
    title: string
    description?: string | null
    status: string
    priority: string
    dueDate?: string | Date | null
    completedAt?: string | Date | null
    estimatedHours?: number | null
    actualHours?: number | null
    assignee?: {
      id: string
      name: string | null
      email: string
    } | null
  }>
  revenues: Array<{
    id: string
    amount: number
    type: string
    description?: string | null
    status: string
    dueDate?: string | Date | null
    paidDate?: string | Date | null
    invoiceUrl?: string | null
  }>
  metrics: Array<{
    id: string
    url: string
    uptime?: number | null
    responseTime?: number | null
    pageSpeed?: number | null
    seoScore?: number | null
    trafficCount?: number | null
    conversionRate?: number | null
    recordedAt: string | Date
  }>
  reports: Array<{
    id: string
    title: string
    type: string
    generatedAt: string | Date
    sentAt?: string | Date | null
  }>
  createdAt: string | Date
  updatedAt: string | Date
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

interface ProjectDetailsProps {
  project: Project
  users: User[]
  contacts: Contact[]
}

export function ProjectDetails({ project, users, contacts }: ProjectDetailsProps) {
  const router = useRouter()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

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

  const taskStatusColors = {
    TODO: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    IN_PROGRESS: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    REVIEW: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    COMPLETED: 'bg-green-500/20 text-green-300 border-green-500/30',
    BLOCKED: 'bg-red-500/20 text-red-300 border-red-500/30'
  }

  const formatDate = (dateString: string | Date | null | undefined) => {
    if (!dateString) return "N/A"
    const date = typeof dateString === "string" ? new Date(dateString) : dateString
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

  const handleSuccess = () => {
    router.refresh()
  }

  const getTaskStats = () => {
    const total = project.tasks.length
    const completed = project.tasks.filter(task => task.status === 'COMPLETED').length
    const inProgress = project.tasks.filter(task => task.status === 'IN_PROGRESS').length
    const blocked = project.tasks.filter(task => task.status === 'BLOCKED').length
    
    return { total, completed, inProgress, blocked }
  }

  const getRevenueStats = () => {
    const total = project.revenues.reduce((sum, revenue) => sum + revenue.amount, 0)
    const paid = project.revenues
      .filter(revenue => revenue.status === 'paid')
      .reduce((sum, revenue) => sum + revenue.amount, 0)
    const pending = project.revenues
      .filter(revenue => revenue.status === 'pending')
      .reduce((sum, revenue) => sum + revenue.amount, 0)
    
    return { total, paid, pending }
  }

  const taskStats = getTaskStats()
  const revenueStats = getRevenueStats()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/projects">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">{project.name}</h1>
            <p className="text-white/60 mt-1">{project.description || 'No description provided'}</p>
          </div>
        </div>
        <Button
          onClick={() => setIsEditModalOpen(true)}
          className="bg-electric-500 hover:bg-electric-600 text-white"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Project
        </Button>
      </div>

      {/* Project Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Status Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Status</p>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border mt-2 ${statusColors[project.status as keyof typeof statusColors]}`}>
                {project.status}
              </span>
            </div>
            <Target className="h-8 w-8 text-white/40" />
          </div>
        </div>

        {/* Progress Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Progress</p>
              <p className="text-2xl font-bold text-white mt-1">{project.progress}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-white/40" />
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 mt-3">
            <div 
              className="bg-gradient-to-r from-electric-500 to-sunset-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/* Budget Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Budget</p>
              <p className="text-2xl font-bold text-white mt-1">
                {project.budget ? formatCurrency(project.budget) : 'Not set'}
              </p>
              {project.actualCost && (
                <p className="text-white/50 text-xs mt-1">
                  Spent: {formatCurrency(project.actualCost)}
                </p>
              )}
            </div>
            <DollarSign className="h-8 w-8 text-white/40" />
          </div>
        </div>

        {/* Tasks Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Tasks</p>
              <p className="text-2xl font-bold text-white mt-1">
                {taskStats.completed}/{taskStats.total}
              </p>
              {taskStats.blocked > 0 && (
                <p className="text-red-400 text-xs mt-1">{taskStats.blocked} blocked</p>
              )}
            </div>
            <CheckCircle className="h-8 w-8 text-white/40" />
          </div>
        </div>
      </div>

      {/* Client & Project Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Client Information */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Building className="h-5 w-5" />
            Client Information
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-white/60 text-sm">Contact Name</p>
              <p className="text-white font-medium">{project.contact.name}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm">Email</p>
              <p className="text-white">{project.contact.email}</p>
            </div>
            {project.contact.phone && (
              <div>
                <p className="text-white/60 text-sm">Phone</p>
                <p className="text-white">{project.contact.phone}</p>
              </div>
            )}
            {project.contact.company && (
              <div>
                <p className="text-white/60 text-sm">Company</p>
                <p className="text-white">{project.contact.company}</p>
              </div>
            )}
            {project.contact.industry && (
              <div>
                <p className="text-white/60 text-sm">Industry</p>
                <p className="text-white">{project.contact.industry}</p>
              </div>
            )}
          </div>
        </div>

        {/* Project Details */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Project Details
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-white/60 text-sm">Priority</p>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${priorityColors[project.priority as keyof typeof priorityColors]}`}>
                {project.priority}
              </span>
            </div>
            <div>
              <p className="text-white/60 text-sm">Project Manager</p>
              <p className="text-white">
                {project.manager ? project.manager.name || project.manager.email : 'Unassigned'}
              </p>
            </div>
            <div>
              <p className="text-white/60 text-sm">Start Date</p>
              <p className="text-white">{formatDate(project.startDate)}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm">End Date</p>
              <p className="text-white">{formatDate(project.endDate)}</p>
            </div>
            {project.websiteUrl && (
              <div>
                <p className="text-white/60 text-sm">Website URL</p>
                <a 
                  href={project.websiteUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-electric-400 hover:text-electric-300 underline flex items-center gap-1"
                >
                  <Globe className="h-4 w-4" />
                  {project.websiteUrl}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Tasks ({project.tasks.length})
          </h2>
          <Button className="bg-electric-500 hover:bg-electric-600 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
        
        {project.tasks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-white/80">Task</th>
                  <th className="text-left p-4 text-sm font-medium text-white/80">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-white/80">Priority</th>
                  <th className="text-left p-4 text-sm font-medium text-white/80">Assignee</th>
                  <th className="text-left p-4 text-sm font-medium text-white/80">Due Date</th>
                  <th className="text-left p-4 text-sm font-medium text-white/80">Hours</th>
                </tr>
              </thead>
              <tbody>
                {project.tasks.map((task) => (
                  <tr key={task.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div>
                        <div className="font-medium text-white">{task.title}</div>
                        {task.description && (
                          <div className="text-sm text-white/60 truncate max-w-xs">
                            {task.description}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${taskStatusColors[task.status as keyof typeof taskStatusColors]}`}>
                        {task.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="text-white/80">
                        {task.assignee ? task.assignee.name || task.assignee.email : 'Unassigned'}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-white/80">{formatDate(task.dueDate)}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-white/80">
                        {task.estimatedHours || '-'} / {task.actualHours || '-'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-white/60">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-white/40" />
            <p>No tasks created yet</p>
            <p className="text-sm">Add your first task to get started</p>
          </div>
        )}
      </div>

      {/* Revenue Section */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Revenue ({project.revenues.length})
          </h2>
          <div className="flex items-center gap-4 text-sm">
            <div className="text-green-400">
              Paid: {formatCurrency(revenueStats.paid)}
            </div>
            <div className="text-yellow-400">
              Pending: {formatCurrency(revenueStats.pending)}
            </div>
            <div className="text-white">
              Total: {formatCurrency(revenueStats.total)}
            </div>
          </div>
        </div>
        
        {project.revenues.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-white/80">Description</th>
                  <th className="text-left p-4 text-sm font-medium text-white/80">Type</th>
                  <th className="text-left p-4 text-sm font-medium text-white/80">Amount</th>
                  <th className="text-left p-4 text-sm font-medium text-white/80">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-white/80">Due Date</th>
                  <th className="text-left p-4 text-sm font-medium text-white/80">Paid Date</th>
                </tr>
              </thead>
              <tbody>
                {project.revenues.map((revenue) => (
                  <tr key={revenue.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="text-white">{revenue.description || 'No description'}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-white/80 capitalize">{revenue.type.replace('_', ' ')}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-white font-medium">{formatCurrency(revenue.amount)}</div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
                        revenue.status === 'paid' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                        revenue.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                        'bg-red-500/20 text-red-300 border-red-500/30'
                      }`}>
                        {revenue.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="text-white/80">{formatDate(revenue.dueDate)}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-white/80">{formatDate(revenue.paidDate)}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-white/60">
            <DollarSign className="h-12 w-12 mx-auto mb-4 text-white/40" />
            <p>No revenue records yet</p>
            <p className="text-sm">Revenue tracking will appear here</p>
          </div>
        )}
      </div>

      {/* Edit Project Modal */}
      <ProjectForm
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={handleSuccess}
        contacts={contacts}
        users={users}
        project={project}
      />
    </div>
  )
}