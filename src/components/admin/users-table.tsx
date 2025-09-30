'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight, Shield, User, Edit3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
// import { UserModal } from './user-modal'

interface User {
  id: string
  email: string
  name: string | null
  role: string
  createdAt: string | Date
  updatedAt: string | Date
  lastLoginAt: string | Date | null
}

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

interface UsersTableProps {
  users: User[]
  pagination: Pagination
  currentSearch: string
}

export function UsersTable({ users, pagination, currentSearch }: UsersTableProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')
  const [searchValue, setSearchValue] = useState(currentSearch)
  const [formState, setFormState] = useState<{ email: string; name: string; role: 'USER' | 'EDITOR' | 'ADMIN' }>({ email: '', name: '', role: 'USER' })
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const roleColors = {
    ADMIN: 'bg-red-500/20 text-red-300 border-red-500/30',
    EDITOR: 'bg-electric-500/20 text-electric-300 border-electric-500/30',
    USER: 'bg-gray-500/20 text-gray-300 border-gray-500/30'
  }

  const roleIcons = {
    ADMIN: Shield,
    EDITOR: Edit3,
    USER: User
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    if (searchValue.trim()) {
      params.set('search', searchValue.trim())
    } else {
      params.delete('search')
    }
    params.set('page', '1')
    router.push(`/admin/users?${params.toString()}`)
  }

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    router.push(`/admin/users?${params.toString()}`)
  }

  const openCreateModal = () => {
    setSelectedUser(null)
    setModalMode('create')
    setFormState({ email: '', name: '', role: 'USER' })
    setFormError(null)
    setIsModalOpen(true)
  }

  const openEditModal = (user: User) => {
    setSelectedUser(user)
    setModalMode('edit')
    setFormState({
      email: user.email,
      name: user.name || '',
      role: (user.role as 'USER' | 'EDITOR' | 'ADMIN'),
    })
    setFormError(null)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSubmitting(false)
    setFormError(null)
    setSelectedUser(null)
  }

  const handleModalSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormError(null)

    if (modalMode === 'create') {
      const email = formState.email.trim()
      const name = formState.name.trim()
      if (!email) {
        setFormError('Email is required')
        return
      }
      if (!name) {
        setFormError('Name is required')
        return
      }
    }

    setSubmitting(true)

    try {
      let response: Response

      if (modalMode === 'create') {
        response = await fetch('/api/admin/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formState.email.trim(),
            name: formState.name.trim(),
            role: formState.role,
          }),
        })
      } else {
        if (!selectedUser) {
          throw new Error('No user selected')
        }

        const payload: Record<string, string> = {}
        const trimmedName = formState.name.trim()
        if (trimmedName && trimmedName !== (selectedUser.name || '')) {
          payload.name = trimmedName
        }
        if (formState.role !== selectedUser.role) {
          payload.role = formState.role
        }

        if (Object.keys(payload).length === 0) {
          setFormError('Update name or role before saving')
          setSubmitting(false)
          return
        }

        response = await fetch(`/api/admin/users/${selectedUser.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      }

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data?.error || 'Failed to save user')
      }

      closeModal()
      router.refresh()
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        router.refresh()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to delete user')
      }
    } catch (error) {
      alert('Failed to delete user')
    }
  }

  const formatDate = (dateString: string | Date | null | undefined) => {
    if (!dateString) return "N/A";
    const date = typeof dateString === "string" ? new Date(dateString) : dateString; return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
      {/* Header with Search and Create Button */}
      <div className="p-6 border-b border-white/10">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
              />
            </div>
          </form>

          {/* Create Button */}
          <Button
            onClick={openCreateModal}
            className="bg-electric-500 hover:bg-electric-600 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-white/80">User</th>
              <th className="text-left p-4 text-sm font-medium text-white/80">Role</th>
              <th className="text-left p-4 text-sm font-medium text-white/80">Last Login</th>
              <th className="text-left p-4 text-sm font-medium text-white/80">Created</th>
              <th className="text-left p-4 text-sm font-medium text-white/80">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const RoleIcon = roleIcons[user.role as keyof typeof roleIcons]
              return (
                <tr key={user.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-white">{user.name || 'No name'}</div>
                      <div className="text-sm text-white/60">{user.email}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${roleColors[user.role as keyof typeof roleColors]}`}>
                      <RoleIcon className="h-3 w-3 mr-1" />
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-white/80 text-sm">
                      {user.lastLoginAt ? formatDate(user.lastLoginAt) : 'Never'}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-white/80 text-sm">{formatDate(user.createdAt)}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditModal(user)}
                        className="h-8 w-8 p-0 hover:bg-white/10"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(user.id)}
                        className="h-8 w-8 p-0 hover:bg-red-500/20 text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="p-4 border-t border-white/10 flex items-center justify-between">
          <div className="text-sm text-white/60">
            Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} users
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={!pagination.hasPrev}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-white px-2">
              {pagination.page} of {pagination.totalPages}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={!pagination.hasNext}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* User Modal - Simple Implementation */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <form onSubmit={handleModalSubmit} className="bg-slate-900 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">
              {modalMode === 'create' ? 'Add New User' : 'Edit User'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-white/60">Email</label>
                <input
                  type="email"
                  className="w-full p-2 bg-white/5 border border-white/20 rounded text-white disabled:text-white/40"
                  value={formState.email}
                  onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
                  disabled={modalMode === 'edit'}
                  placeholder="user@example.com"
                  required={modalMode === 'create'}
                />
              </div>
              <div>
                <label className="text-sm text-white/60">Name</label>
                <input
                  type="text"
                  className="w-full p-2 bg-white/5 border border-white/20 rounded text-white"
                  value={formState.name}
                  onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
                  placeholder="Full name"
                  required={modalMode === 'create'}
                />
              </div>
              <div>
                <label className="text-sm text-white/60">Role</label>
                <select
                  className="w-full p-2 bg-white/5 border border-white/20 rounded text-white"
                  value={formState.role}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, role: event.target.value as 'USER' | 'EDITOR' | 'ADMIN' }))
                  }
                >
                  <option value="USER">User</option>
                  <option value="EDITOR">Editor</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              {modalMode === 'create' && (
                <p className="text-xs text-white/50">
                  New users receive a Supabase password reset email to set their credentials.
                </p>
              )}
              {formError && (
                <p className="text-sm text-sunset-400">{formError}</p>
              )}
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button
                type="button"
                variant="ghost"
                onClick={closeModal}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-electric-500 hover:bg-electric-600"
                disabled={submitting}
              >
                {submitting ? 'Saving...' : modalMode === 'create' ? 'Create' : 'Update'}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
