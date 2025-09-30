'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PaginationProps {
  // Current pagination state
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  
  // Data range info
  startItem: number
  endItem: number
  
  // Handlers
  onPageChange: (page: number) => void
  onItemsPerPageChange: (itemsPerPage: number) => void
  
  // Customization
  itemsPerPageOptions?: number[]
  showItemsPerPageSelector?: boolean
  showResultsText?: boolean
  showPageNumbers?: boolean
  maxPageNumbers?: number
  
  // Labels
  itemLabel?: string
  itemLabelPlural?: string
  
  // Responsive behavior
  compactOnMobile?: boolean
  
  // Loading state
  isLoading?: boolean
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  startItem,
  endItem,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [10, 25, 50, 100],
  showItemsPerPageSelector = true,
  showResultsText = true,
  showPageNumbers = true,
  maxPageNumbers = 7,
  itemLabel = 'item',
  itemLabelPlural = 'items',
  compactOnMobile = true,
  isLoading = false
}: PaginationProps) {
  const [isMobile, setIsMobile] = useState(false)

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only handle if no input is focused
      if (document.activeElement?.tagName === 'INPUT' || 
          document.activeElement?.tagName === 'SELECT' ||
          document.activeElement?.tagName === 'TEXTAREA') {
        return
      }

      switch (e.key) {
        case 'ArrowLeft':
          if (currentPage > 1) {
            e.preventDefault()
            onPageChange(currentPage - 1)
          }
          break
        case 'ArrowRight':
          if (currentPage < totalPages) {
            e.preventDefault()
            onPageChange(currentPage + 1)
          }
          break
        case 'Home':
          if (currentPage !== 1) {
            e.preventDefault()
            onPageChange(1)
          }
          break
        case 'End':
          if (currentPage !== totalPages) {
            e.preventDefault()
            onPageChange(totalPages)
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentPage, totalPages, onPageChange])

  // Generate page numbers array with ellipsis
  const generatePageNumbers = useCallback(() => {
    if (totalPages <= maxPageNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const pages: (number | 'ellipsis')[] = []
    const leftSiblingIndex = Math.max(currentPage - 1, 1)
    const rightSiblingIndex = Math.min(currentPage + 1, totalPages)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3
      for (let i = 1; i <= leftItemCount; i++) {
        pages.push(i)
      }
      pages.push('ellipsis')
      pages.push(totalPages)
    } else if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3
      pages.push(1)
      pages.push('ellipsis')
      for (let i = totalPages - rightItemCount + 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else if (shouldShowLeftDots && shouldShowRightDots) {
      pages.push(1)
      pages.push('ellipsis')
      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        pages.push(i)
      }
      pages.push('ellipsis')
      pages.push(totalPages)
    } else {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    }

    return pages
  }, [currentPage, totalPages, maxPageNumbers])

  const pageNumbers = generatePageNumbers()
  const itemText = totalItems === 1 ? itemLabel : itemLabelPlural

  if (totalPages <= 1 && !showItemsPerPageSelector) {
    return null
  }

  return (
    <div className="glass-card border-t border-white/10">
      <div className="px-4 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        
        {/* Results text */}
        {showResultsText && (
          <div className="text-sm text-white/60 order-2 lg:order-1">
            {totalItems > 0 ? (
              <>
                Showing <span className="text-white font-medium">{startItem.toLocaleString()}</span> to{' '}
                <span className="text-white font-medium">{endItem.toLocaleString()}</span> of{' '}
                <span className="text-white font-medium">{totalItems.toLocaleString()}</span> {itemText}
              </>
            ) : (
              `No ${itemText} found`
            )}
          </div>
        )}

        {/* Pagination controls */}
        <div className="flex items-center justify-between lg:justify-end gap-4 order-1 lg:order-2">
          
          {/* Items per page selector */}
          {showItemsPerPageSelector && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/60 hidden sm:inline">Show</span>
              <select
                value={itemsPerPage}
                onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                disabled={isLoading}
                className="bg-white/5 border border-white/20 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-electric-500/50 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
              >
                {itemsPerPageOptions.map((option) => (
                  <option key={option} value={option} className="bg-slate-800 text-white">
                    {option}
                  </option>
                ))}
              </select>
              <span className="text-sm text-white/60 hidden sm:inline">per page</span>
            </div>
          )}

          {/* Navigation */}
          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              
              {/* First page */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1 || isLoading}
                className="h-9 w-9 p-0 text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                title="First page (Home)"
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>

              {/* Previous page */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1 || isLoading}
                className="h-9 w-9 p-0 text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Previous page (←)"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {/* Page numbers */}
              {showPageNumbers && !isMobile && (
                <div className="flex items-center gap-1">
                  {pageNumbers.map((page, index) => (
                    page === 'ellipsis' ? (
                      <div
                        key={`ellipsis-${index}`}
                        className="h-9 w-9 flex items-center justify-center text-white/40"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </div>
                    ) : (
                      <Button
                        key={page}
                        variant="ghost"
                        size="sm"
                        onClick={() => onPageChange(page)}
                        disabled={isLoading}
                        className={`h-9 w-9 p-0 text-sm font-medium transition-all duration-200 ${
                          currentPage === page
                            ? 'bg-electric-500/20 text-electric-300 border border-electric-500/30 hover:bg-electric-500/30'
                            : 'text-white/60 hover:text-white hover:bg-white/10'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {page}
                      </Button>
                    )
                  ))}
                </div>
              )}

              {/* Mobile page info */}
              {isMobile && compactOnMobile && (
                <div className="px-3 py-1.5 bg-white/5 border border-white/20 rounded-lg text-sm text-white backdrop-blur-sm">
                  {currentPage} of {totalPages}
                </div>
              )}

              {/* Next page */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages || isLoading}
                className="h-9 w-9 p-0 text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Next page (→)"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              {/* Last page */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages || isLoading}
                className="h-9 w-9 p-0 text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Last page (End)"
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Hook for managing pagination state
export function usePagination(
  totalItems: number,
  initialItemsPerPage: number = 25,
  initialPage: number = 1
) {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage)

  // Calculate derived values
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage))
  const startItem = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  // Reset to page 1 when items per page changes
  const handleItemsPerPageChange = useCallback((newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1)
  }, [])

  // Ensure current page is valid when total items change
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  return {
    currentPage,
    totalPages,
    itemsPerPage,
    startItem,
    endItem,
    setCurrentPage,
    setItemsPerPage: handleItemsPerPageChange,
    pagination: {
      currentPage,
      totalPages,
      totalItems,
      itemsPerPage,
      startItem,
      endItem,
      hasNext: currentPage < totalPages,
      hasPrev: currentPage > 1,
    }
  }
}