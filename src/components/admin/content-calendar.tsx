'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ContentForm } from './content-form'
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  Circle,
  PlayCircle
} from 'lucide-react'
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns'

interface ContentCalendarItem {
  id: string
  title: string
  description?: string
  contentType: string
  status: string
  scheduledDate?: string
  publishedDate?: string
  assigneeId?: string
  blogPostId?: string
  createdAt: string
  updatedAt: string
}

const CONTENT_TYPE_COLORS = {
  'blog_post': 'bg-blue-500/20 border-blue-500/40 text-blue-300',
  'social_media': 'bg-pink-500/20 border-pink-500/40 text-pink-300',
  'email': 'bg-green-500/20 border-green-500/40 text-green-300',
  'newsletter': 'bg-purple-500/20 border-purple-500/40 text-purple-300',
  'video': 'bg-red-500/20 border-red-500/40 text-red-300',
  'infographic': 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300',
  'case_study': 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300',
  'whitepaper': 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
}

const STATUS_ICONS = {
  'planned': Circle,
  'in_progress': PlayCircle,
  'completed': CheckCircle,
  'published': CheckCircle
}

export function ContentCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<'month' | 'week'>('month')
  const [contentItems, setContentItems] = useState<ContentCalendarItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<ContentCalendarItem | null>(null)
  const [draggedItem, setDraggedItem] = useState<ContentCalendarItem | null>(null)

  useEffect(() => {
    fetchContentItems()
  }, [currentDate])

  const fetchContentItems = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/content-calendar')
      if (response.ok) {
        const data = await response.json()
        setContentItems(data)
      }
    } catch (error) {
      console.error('Failed to fetch content items:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this content item?')) return
    
    try {
      const response = await fetch(`/api/admin/content-calendar/${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        await fetchContentItems()
      }
    } catch (error) {
      console.error('Failed to delete content item:', error)
    }
  }

  const handleDragStart = (e: React.DragEvent, item: ContentCalendarItem) => {
    setDraggedItem(item)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = async (e: React.DragEvent, date: Date) => {
    e.preventDefault()
    
    if (!draggedItem) return

    try {
      const response = await fetch(`/api/admin/content-calendar/${draggedItem.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scheduledDate: format(date, 'yyyy-MM-dd')
        })
      })
      
      if (response.ok) {
        await fetchContentItems()
        setDraggedItem(null)
      }
    } catch (error) {
      console.error('Failed to update content item:', error)
    }
  }

  const getItemsForDate = (date: Date) => {
    return contentItems.filter(item => {
      if (!item.scheduledDate) return false
      return isSameDay(new Date(item.scheduledDate), date)
    })
  }

  const renderCalendarGrid = () => {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(currentDate)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

    const days = []
    let day = startDate

    while (day <= endDate) {
      days.push(day)
      day = addDays(day, 1)
    }

    return (
      <div className="grid grid-cols-7 gap-1">
        {/* Header */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayName) => (
          <div key={dayName} className="p-3 text-center text-sm font-medium text-white/70 border-b border-white/10">
            {dayName}
          </div>
        ))}
        
        {/* Calendar Days */}
        {days.map((day, index) => {
          const dayItems = getItemsForDate(day)
          const isCurrentMonth = isSameMonth(day, currentDate)
          const isToday = isSameDay(day, new Date())
          
          return (
            <div
              key={index}
              className={`min-h-32 p-2 border border-white/10 transition-colors ${
                isCurrentMonth ? 'bg-white/5' : 'bg-white/2'
              } ${isToday ? 'ring-2 ring-electric-400/50' : ''} hover:bg-white/10`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, day)}
            >
              <div className={`text-sm font-medium mb-2 ${
                isCurrentMonth ? 'text-white' : 'text-white/40'
              } ${isToday ? 'text-electric-400' : ''}`}>
                {format(day, 'd')}
              </div>
              
              <div className="space-y-1">
                {dayItems.map((item) => {
                  const StatusIcon = STATUS_ICONS[item.status as keyof typeof STATUS_ICONS] || Circle
                  const colorClass = CONTENT_TYPE_COLORS[item.contentType as keyof typeof CONTENT_TYPE_COLORS] || 'bg-gray-500/20 border-gray-500/40 text-gray-300'
                  
                  return (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, item)}
                      className={`p-2 rounded-lg border cursor-move hover:scale-105 transition-all ${colorClass}`}
                      title={item.description || item.title}
                    >
                      <div className="flex items-center gap-1 mb-1">
                        <StatusIcon className="h-3 w-3" />
                        <span className="text-xs font-medium truncate">{item.title}</span>
                      </div>
                      <div className="text-xs opacity-80 capitalize">
                        {item.contentType.replace('_', ' ')}
                      </div>
                      
                      {/* Action buttons */}
                      <div className="flex gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setEditingItem(item)}
                          className="p-1 hover:bg-white/10 rounded"
                        >
                          <Edit className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-1 hover:bg-red-500/20 rounded text-red-400"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const renderWeekView = () => {
    const weekStart = startOfWeek(currentDate)
    const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

    return (
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const dayItems = getItemsForDate(day)
          const isToday = isSameDay(day, new Date())
          
          return (
            <div
              key={index}
              className={`min-h-96 p-3 border border-white/20 bg-white/5 transition-colors ${
                isToday ? 'ring-2 ring-electric-400/50' : ''
              } hover:bg-white/10`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, day)}
            >
              <div className={`text-lg font-semibold mb-3 ${
                isToday ? 'text-electric-400' : 'text-white'
              }`}>
                {format(day, 'EEE d')}
              </div>
              
              <div className="space-y-2">
                {dayItems.map((item) => {
                  const StatusIcon = STATUS_ICONS[item.status as keyof typeof STATUS_ICONS] || Circle
                  const colorClass = CONTENT_TYPE_COLORS[item.contentType as keyof typeof CONTENT_TYPE_COLORS] || 'bg-gray-500/20 border-gray-500/40 text-gray-300'
                  
                  return (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, item)}
                      className={`p-3 rounded-lg border cursor-move hover:scale-105 transition-all group ${colorClass}`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <StatusIcon className="h-4 w-4" />
                        <span className="font-medium">{item.title}</span>
                      </div>
                      
                      {item.description && (
                        <p className="text-sm opacity-80 mb-2 line-clamp-2">{item.description}</p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs opacity-80 capitalize">
                          {item.contentType.replace('_', ' ')}
                        </span>
                        
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => setEditingItem(item)}
                            className="p-1 hover:bg-white/10 rounded"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="p-1 hover:bg-red-500/20 rounded text-red-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="glass-card p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-electric-400 mx-auto"></div>
        <p className="text-white/70 mt-4">Loading calendar...</p>
      </div>
    )
  }

  return (
    <>
      <div className="glass-card p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentDate(subMonths(currentDate, 1))}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>
            
            <h2 className="text-2xl font-bold text-white">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            
            <button
              onClick={() => setCurrentDate(addMonths(currentDate, 1))}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex bg-white/10 rounded-lg p-1">
              <button
                onClick={() => setView('month')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  view === 'month' ? 'bg-electric-400 text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setView('week')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  view === 'week' ? 'bg-electric-400 text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                Week
              </button>
            </div>
            
            <Button
              onClick={() => setShowForm(true)}
              className="bg-electric-400 hover:bg-electric-500 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Content
            </Button>
          </div>
        </div>

        {/* Content Type Legend */}
        <div className="flex flex-wrap gap-3 mb-6 p-4 bg-white/5 rounded-lg">
          {Object.entries(CONTENT_TYPE_COLORS).map(([type, colorClass]) => (
            <div key={type} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded border ${colorClass}`}></div>
              <span className="text-sm text-white/70 capitalize">
                {type.replace('_', ' ')}
              </span>
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        {view === 'month' ? renderCalendarGrid() : renderWeekView()}
      </div>

      {/* Content Form Modal */}
      {(showForm || editingItem) && (
        <ContentForm
          item={editingItem}
          onClose={() => {
            setShowForm(false)
            setEditingItem(null)
          }}
          onSave={() => {
            fetchContentItems()
            setShowForm(false)
            setEditingItem(null)
          }}
        />
      )}
    </>
  )
}