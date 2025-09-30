'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, Filter, Eye, Edit, Trash2, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Pagination } from './pagination'
// import { ContactModal } from './contact-modal'

interface Contact {
  id: string
  name: string
  email: string
  phone?: string | null
  company?: string | null
  message: string
  source?: string | null
  status: string
  industry?: string | null
  budget?: number | null
  timeline?: string | null
  leadScore?: number | null
  priority?: string | null
  assignedTo?: string | null
  assignedUser?: {
    id: string
    name: string | null
    email: string
  } | null
  projects?: Array<{
    id: string
    name: string
    status: string
  }>
  createdAt: string | Date
  updatedAt: string | Date
}

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

interface User {
  id: string
  name: string | null
  email: string
}

interface ContactsTableProps {
  contacts: Contact[]
  pagination: Pagination
  currentStatus: string
  currentSearch: string
  users: User[]
}

export function ContactsTable({ contacts, pagination, currentStatus, currentSearch, users }: ContactsTableProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchValue, setSearchValue] = useState(currentSearch)
  const [assigningContacts, setAssigningContacts] = useState<Set<string>>(new Set())
  const [assignmentFeedback, setAssignmentFeedback] = useState<{ [key: string]: 'success' | 'error' }>({}) 

  const statusColors = {
    NEW: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    CONTACTED: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    QUALIFIED: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    CONVERTED: 'bg-green-500/20 text-green-300 border-green-500/30',
    CLOSED: 'bg-gray-500/20 text-gray-300 border-gray-500/30'
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
    router.push(`/admin/contacts?${params.toString()}`)
  }

  const handleStatusFilter = (status: string) => {
    const params = new URLSearchParams(searchParams)
    if (status === 'all') {
      params.delete('status')
    } else {
      params.set('status', status)
    }
    params.set('page', '1')
    router.push(`/admin/contacts?${params.toString()}`)
  }

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    router.push(`/admin/contacts?${params.toString()}`)
  }

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('limit', itemsPerPage.toString())
    params.set('page', '1')
    router.push(`/admin/contacts?${params.toString()}`)
  }

  const openContactModal = (contact: Contact) => {
    setSelectedContact(contact)
    setIsModalOpen(true)
  }

  const handleAssignContact = async (contactId: string, assignedUserId: string | null) => {
    setAssigningContacts(prev => new Set(prev).add(contactId))
    setAssignmentFeedback(prev => {
      const newState = { ...prev }
      delete newState[contactId]
      return newState
    })

    try {
      const response = await fetch(`/api/admin/contacts/${contactId}/assign`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ assignedUserId }),
      })

      if (!response.ok) {
        throw new Error('Failed to assign contact')
      }

      // Show success feedback
      setAssignmentFeedback(prev => ({ ...prev, [contactId]: 'success' }))
      
      // Clear feedback after 2 seconds
      setTimeout(() => {
        setAssignmentFeedback(prev => {
          const newState = { ...prev }
          delete newState[contactId]
          return newState
        })
      }, 2000)

      // Refresh the page to show updated data
      router.refresh()
    } catch (error) {
      console.error('Error assigning contact:', error)
      setAssignmentFeedback(prev => ({ ...prev, [contactId]: 'error' }))
      
      // Clear error feedback after 3 seconds
      setTimeout(() => {
        setAssignmentFeedback(prev => {
          const newState = { ...prev }
          delete newState[contactId]
          return newState
        })
      }, 3000)
    } finally {
      setAssigningContacts(prev => {
        const newSet = new Set(prev)
        newSet.delete(contactId)
        return newSet
      })
    }
  }

  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
      {/* Filters and Search */}
      <div className="p-4 md:p-6 border-b border-white/10">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 w-full sm:max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
              />
            </div>
          </form>

          {/* Status Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="h-4 w-4 text-white/60" />
            <select
              value={currentStatus}
              onChange={(e) => handleStatusFilter(e.target.value)}
              className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-electric-500/50 w-full sm:w-auto"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="converted">Converted</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-white/80">Contact</th>
              <th className="text-left p-4 text-sm font-medium text-white/80">Company & Industry</th>
              <th className="text-left p-4 text-sm font-medium text-white/80">Lead Score</th>
              <th className="text-left p-4 text-sm font-medium text-white/80">Status</th>
              <th className="text-left p-4 text-sm font-medium text-white/80">Assigned To</th>
              <th className="text-left p-4 text-sm font-medium text-white/80">Budget</th>
              <th className="text-left p-4 text-sm font-medium text-white/80">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4">
                  <div>
                    <div className="font-medium text-white">{contact.name}</div>
                    <div className="text-sm text-white/60">{contact.email}</div>
                    {contact.phone && (
                      <div className="text-sm text-white/60">{contact.phone}</div>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <div className="text-white">{contact.company || '-'}</div>
                    {contact.industry && (
                      <div className="text-sm text-white/60">{contact.industry}</div>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {contact.leadScore ? (
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        contact.leadScore >= 80 ? 'bg-green-500/20 text-green-300' :
                        contact.leadScore >= 60 ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-red-500/20 text-red-300'
                      }`}>
                        {contact.leadScore}/100
                      </div>
                    ) : (
                      <span className="text-white/40">Not scored</span>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[contact.status as keyof typeof statusColors]}`}>
                    {contact.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="relative">
                    <select
                      value={contact.assignedTo || ''}
                      onChange={(e) => handleAssignContact(contact.id, e.target.value || null)}
                      disabled={assigningContacts.has(contact.id)}
                      className={`w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-electric-500/50 ${
                        assigningContacts.has(contact.id) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                      }`}
                    >
                      <option value="" className="bg-slate-800 text-white">Unassigned</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id} className="bg-slate-800 text-white">
                          {user.name || user.email}
                        </option>
                      ))}
                    </select>
                    
                    {/* Visual feedback */}
                    {assignmentFeedback[contact.id] && (
                      <div className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${
                        assignmentFeedback[contact.id] === 'success' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {assignmentFeedback[contact.id] === 'success' ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                      </div>
                    )}
                    
                    {/* Loading indicator */}
                    {assigningContacts.has(contact.id) && (
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-electric-500 border-t-transparent"></div>
                      </div>
                    )}
                    
                    {/* Current assignment info */}
                    {contact.assignedUser && (
                      <div className="mt-1">
                        <div className="text-white/60 text-xs">{contact.assignedUser.email}</div>
                      </div>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-white/80">
                    {contact.budget ? `$${contact.budget.toLocaleString()}` : '-'}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openContactModal(contact)}
                      className="h-8 w-8 p-0 hover:bg-white/10"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4 p-4">
        {contacts.map((contact) => (
          <div key={contact.id} className="bg-white/5 rounded-lg border border-white/10 p-4">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="font-medium text-white text-lg">{contact.name}</div>
                <div className="text-sm text-white/60">{contact.email}</div>
                {contact.phone && (
                  <div className="text-sm text-white/60">{contact.phone}</div>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => openContactModal(contact)}
                className="h-8 w-8 p-0 hover:bg-white/10 ml-2"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>

            {/* Status and Lead Score */}
            <div className="flex items-center gap-3 mb-3">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[contact.status as keyof typeof statusColors]}`}>
                {contact.status}
              </span>
              {contact.leadScore ? (
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  contact.leadScore >= 80 ? 'bg-green-500/20 text-green-300' :
                  contact.leadScore >= 60 ? 'bg-yellow-500/20 text-yellow-300' :
                  'bg-red-500/20 text-red-300'
                }`}>
                  Score: {contact.leadScore}/100
                </div>
              ) : (
                <span className="text-white/40 text-xs">Not scored</span>
              )}
            </div>

            {/* Company and Budget */}
            <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
              <div>
                <div className="text-white/60 text-xs">Company</div>
                <div className="text-white">{contact.company || '-'}</div>
                {contact.industry && (
                  <div className="text-white/60 text-xs">{contact.industry}</div>
                )}
              </div>
              <div>
                <div className="text-white/60 text-xs">Budget</div>
                <div className="text-white">
                  {contact.budget ? `$${contact.budget.toLocaleString()}` : '-'}
                </div>
              </div>
            </div>

            {/* Assignment */}
            <div className="relative">
              <div className="text-white/60 text-xs mb-1">Assigned To</div>
              <select
                value={contact.assignedTo || ''}
                onChange={(e) => handleAssignContact(contact.id, e.target.value || null)}
                disabled={assigningContacts.has(contact.id)}
                className={`w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-electric-500/50 ${
                  assigningContacts.has(contact.id) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                <option value="" className="bg-slate-800 text-white">Unassigned</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id} className="bg-slate-800 text-white">
                    {user.name || user.email}
                  </option>
                ))}
              </select>
              
              {/* Visual feedback */}
              {assignmentFeedback[contact.id] && (
                <div className={`absolute right-2 top-7 transform -translate-y-1/2 ${
                  assignmentFeedback[contact.id] === 'success' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {assignmentFeedback[contact.id] === 'success' ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <X className="h-4 w-4" />
                  )}
                </div>
              )}
              
              {/* Loading indicator */}
              {assigningContacts.has(contact.id) && (
                <div className="absolute right-2 top-7 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-electric-500 border-t-transparent"></div>
                </div>
              )}
              
              {/* Current assignment info */}
              {contact.assignedUser && (
                <div className="mt-1">
                  <div className="text-white/60 text-xs">{contact.assignedUser.email}</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        totalItems={pagination.total}
        itemsPerPage={pagination.limit}
        startItem={((pagination.page - 1) * pagination.limit) + 1}
        endItem={Math.min(pagination.page * pagination.limit, pagination.total)}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        itemLabel="contact"
        itemLabelPlural="contacts"
      />

      {/* Contact Modal - TODO: Implement ContactModal component */}
      {selectedContact && isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-4">Contact Details</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-white/60">Name</label>
                <div className="text-white">{selectedContact.name}</div>
              </div>
              <div>
                <label className="text-sm text-white/60">Email</label>
                <div className="text-white">{selectedContact.email}</div>
              </div>
              {selectedContact.phone && (
                <div>
                  <label className="text-sm text-white/60">Phone</label>
                  <div className="text-white">{selectedContact.phone}</div>
                </div>
              )}
              {selectedContact.company && (
                <div>
                  <label className="text-sm text-white/60">Company</label>
                  <div className="text-white">{selectedContact.company}</div>
                </div>
              )}
              <div>
                <label className="text-sm text-white/60">Message</label>
                <div className="text-white bg-white/5 p-3 rounded-lg">{selectedContact.message}</div>
              </div>
              <div>
                <label className="text-sm text-white/60">Status</label>
                <div className="text-white">{selectedContact.status}</div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button onClick={() => setIsModalOpen(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}