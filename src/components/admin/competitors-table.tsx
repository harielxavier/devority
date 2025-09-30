'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  BarChart3,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CompetitorForm } from './competitor-form'
import { Pagination } from './pagination'

interface Competitor {
  id: string
  name: string
  website: string
  industry: string
  location?: string | null
  description?: string | null
  estimatedTraffic?: number | null
  domainAuthority?: number | null
  backlinks?: number | null
  keywords: string[]
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

interface SortConfig {
  sortBy: string
  sortOrder: 'asc' | 'desc'
}

interface CompetitorsTableProps {
  competitors: Competitor[]
  pagination: Pagination
  currentIndustry: string
  currentSearch: string
  currentSort: SortConfig
  industries: string[]
}

export function CompetitorsTable({ 
  competitors, 
  pagination, 
  currentIndustry, 
  currentSearch, 
  currentSort,
  industries 
}: CompetitorsTableProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedCompetitor, setSelectedCompetitor] = useState<Competitor | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [searchValue, setSearchValue] = useState(currentSearch)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    if (searchValue.trim()) {
      params.set('search', searchValue.trim())
    } else {
      params.delete('search')
    }
    params.set('page', '1')
    router.push(`/admin/competitors?${params.toString()}`)
  }

  const handleIndustryFilter = (industry: string) => {
    const params = new URLSearchParams(searchParams)
    if (industry === 'all') {
      params.delete('industry')
    } else {
      params.set('industry', industry)
    }
    params.set('page', '1')
    router.push(`/admin/competitors?${params.toString()}`)
  }

  const handleSort = (sortBy: string) => {
    const params = new URLSearchParams(searchParams)
    const currentSortOrder = currentSort.sortBy === sortBy ? currentSort.sortOrder : 'desc'
    const newSortOrder = currentSortOrder === 'desc' ? 'asc' : 'desc'
    
    params.set('sortBy', sortBy)
    params.set('sortOrder', newSortOrder)
    params.set('page', '1')
    router.push(`/admin/competitors?${params.toString()}`)
  }

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    router.push(`/admin/competitors?${params.toString()}`)
  }

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('limit', itemsPerPage.toString())
    params.set('page', '1')
    router.push(`/admin/competitors?${params.toString()}`)
  }

  const openCompetitorForm = (competitor?: Competitor) => {
    setSelectedCompetitor(competitor || null)
    setIsFormOpen(true)
  }

  const openViewModal = (competitor: Competitor) => {
    setSelectedCompetitor(competitor)
    setIsViewModalOpen(true)
  }

  const handleDelete = async (competitorId: string) => {
    if (!confirm('Are you sure you want to delete this competitor?')) return
    
    setDeletingId(competitorId)
    try {
      const response = await fetch(`/api/admin/competitors/${competitorId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete competitor')
      }

      router.refresh()
    } catch (error) {
      console.error('Error deleting competitor:', error)
      alert('Failed to delete competitor')
    } finally {
      setDeletingId(null)
    }
  }

  const formatNumber = (num: number | null | undefined) => {
    if (!num) return '-'
    return num.toLocaleString()
  }

  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getMetricColor = (value: number | null, type: 'traffic' | 'da' | 'backlinks') => {
    if (!value) return 'text-white/40'
    
    switch (type) {
      case 'traffic':
        if (value >= 100000) return 'text-green-400'
        if (value >= 50000) return 'text-yellow-400'
        return 'text-red-400'
      case 'da':
        if (value >= 70) return 'text-green-400'
        if (value >= 50) return 'text-yellow-400'
        return 'text-red-400'
      case 'backlinks':
        if (value >= 10000) return 'text-green-400'
        if (value >= 1000) return 'text-yellow-400'
        return 'text-red-400'
      default:
        return 'text-white'
    }
  }

  const SortButton = ({ column, children }: { column: string; children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(column)}
      className="flex items-center gap-1 hover:text-white transition-colors"
    >
      {children}
      {currentSort.sortBy === column ? (
        currentSort.sortOrder === 'desc' ? 
          <TrendingDown className="h-3 w-3" /> : 
          <TrendingUp className="h-3 w-3" />
      ) : (
        <ArrowUpDown className="h-3 w-3 opacity-50" />
      )}
    </button>
  )

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
      {/* Filters and Search */}
      <div className="p-6 border-b border-white/10">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                type="text"
                placeholder="Search competitors..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
              />
            </div>
          </form>

          <div className="flex items-center gap-4">
            {/* Industry Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-white/60" />
              <select
                value={currentIndustry}
                onChange={(e) => handleIndustryFilter(e.target.value)}
                className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-electric-500/50"
              >
                <option value="all">All Industries</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            {/* Add Competitor Button */}
            <Button
              onClick={() => openCompetitorForm()}
              className="bg-electric-500 hover:bg-electric-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Competitor
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-white/80">
                <SortButton column="name">Company</SortButton>
              </th>
              <th className="text-left p-4 text-sm font-medium text-white/80">
                <SortButton column="industry">Industry</SortButton>
              </th>
              <th className="text-left p-4 text-sm font-medium text-white/80">
                <SortButton column="estimatedTraffic">Traffic</SortButton>
              </th>
              <th className="text-left p-4 text-sm font-medium text-white/80">
                <SortButton column="domainAuthority">DA</SortButton>
              </th>
              <th className="text-left p-4 text-sm font-medium text-white/80">
                <SortButton column="backlinks">Backlinks</SortButton>
              </th>
              <th className="text-left p-4 text-sm font-medium text-white/80">Keywords</th>
              <th className="text-left p-4 text-sm font-medium text-white/80">Actions</th>
            </tr>
          </thead>
          <tbody>
            {competitors.map((competitor) => (
              <tr key={competitor.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4">
                  <div>
                    <div className="font-medium text-white flex items-center gap-2">
                      {competitor.name}
                      <a
                        href={competitor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-white"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    <div className="text-sm text-white/60">{competitor.website}</div>
                    {competitor.location && (
                      <div className="text-sm text-white/40">{competitor.location}</div>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {competitor.industry}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`font-medium ${getMetricColor(competitor.estimatedTraffic ?? null, 'traffic')}`}>
                    {formatNumber(competitor.estimatedTraffic)}
                  </span>
                  {competitor.estimatedTraffic && (
                    <div className="text-xs text-white/40">monthly visits</div>
                  )}
                </td>
                <td className="p-4">
                  <span className={`font-medium ${getMetricColor(competitor.domainAuthority ?? null, 'da')}`}>
                    {competitor.domainAuthority ? `${competitor.domainAuthority}/100` : '-'}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`font-medium ${getMetricColor(competitor.backlinks ?? null, 'backlinks')}`}>
                    {formatNumber(competitor.backlinks)}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {competitor.keywords.slice(0, 3).map((keyword, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-white/10 text-white/80"
                      >
                        {keyword}
                      </span>
                    ))}
                    {competitor.keywords.length > 3 && (
                      <span className="text-xs text-white/60">
                        +{competitor.keywords.length - 3} more
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openViewModal(competitor)}
                      className="h-8 w-8 p-0 hover:bg-white/10"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openCompetitorForm(competitor)}
                      className="h-8 w-8 p-0 hover:bg-white/10"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(competitor.id)}
                      disabled={deletingId === competitor.id}
                      className="h-8 w-8 p-0 hover:bg-red-500/20 text-red-400"
                    >
                      {deletingId === competitor.id ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-red-400 border-t-transparent" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
        itemLabel="competitor"
        itemLabelPlural="competitors"
      />

      {/* Competitor Form Modal */}
      <CompetitorForm
        competitor={selectedCompetitor || undefined}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setSelectedCompetitor(null)
        }}
        onSave={() => {
          setIsFormOpen(false)
          setSelectedCompetitor(null)
        }}
      />

      {/* View Competitor Modal */}
      {selectedCompetitor && isViewModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <BarChart3 className="h-6 w-6 text-electric-400" />
                {selectedCompetitor.name} - Competitor Analysis
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsViewModalOpen(false)}
                className="h-8 w-8 p-0 hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-white/60">Company Name</label>
                    <div className="text-white font-medium">{selectedCompetitor.name}</div>
                  </div>
                  <div>
                    <label className="text-sm text-white/60">Website</label>
                    <div className="text-white">
                      <a 
                        href={selectedCompetitor.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-electric-400 hover:text-electric-300 flex items-center gap-1"
                      >
                        {selectedCompetitor.website}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-white/60">Industry</label>
                    <div className="text-white">{selectedCompetitor.industry}</div>
                  </div>
                  {selectedCompetitor.location && (
                    <div>
                      <label className="text-sm text-white/60">Location</label>
                      <div className="text-white">{selectedCompetitor.location}</div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-white/60">Estimated Monthly Traffic</label>
                    <div className={`text-2xl font-bold ${getMetricColor(selectedCompetitor.estimatedTraffic ?? null, 'traffic')}`}>
                      {formatNumber(selectedCompetitor.estimatedTraffic)}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-white/60">Domain Authority</label>
                    <div className={`text-2xl font-bold ${getMetricColor(selectedCompetitor.domainAuthority ?? null, 'da')}`}>
                      {selectedCompetitor.domainAuthority ? `${selectedCompetitor.domainAuthority}/100` : 'N/A'}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-white/60">Backlinks</label>
                    <div className={`text-2xl font-bold ${getMetricColor(selectedCompetitor.backlinks ?? null, 'backlinks')}`}>
                      {formatNumber(selectedCompetitor.backlinks)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              {selectedCompetitor.description && (
                <div>
                  <label className="text-sm text-white/60">Description</label>
                  <div className="text-white bg-white/5 p-4 rounded-lg mt-2">
                    {selectedCompetitor.description}
                  </div>
                </div>
              )}

              {/* Keywords */}
              {selectedCompetitor.keywords.length > 0 && (
                <div>
                  <label className="text-sm text-white/60">Target Keywords ({selectedCompetitor.keywords.length})</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedCompetitor.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white/10 text-white"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Timestamps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div>
                  <label className="text-sm text-white/60">Added</label>
                  <div className="text-white/80">{formatDate(selectedCompetitor.createdAt)}</div>
                </div>
                <div>
                  <label className="text-sm text-white/60">Last Updated</label>
                  <div className="text-white/80">{formatDate(selectedCompetitor.updatedAt)}</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-white/10">
              <Button
                onClick={() => {
                  setIsViewModalOpen(false)
                  openCompetitorForm(selectedCompetitor)
                }}
                className="bg-electric-500 hover:bg-electric-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit Competitor
              </Button>
              <Button 
                onClick={() => setIsViewModalOpen(false)}
                variant="ghost"
                className="text-white/80 hover:text-white hover:bg-white/10"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}