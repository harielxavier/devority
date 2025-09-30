'use client'

import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface FileUploadProps {
  onUpload: (file: { name: string; path: string; url: string; size: number; type: string }) => void
  onRemove?: () => void
  currentFile?: { name: string; url: string } | null
  folder?: string
  className?: string
  accept?: string
  maxSize?: number // in MB
  disabled?: boolean
}

export function FileUpload({
  onUpload,
  onRemove,
  currentFile,
  folder = 'uploads',
  className,
  accept = 'image/*',
  maxSize = 5,
  disabled = false
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (file: File) => {
    if (disabled) return

    setError(null)
    setIsUploading(true)

    try {
      // Validate file size
      if (file.size > maxSize * 1024 * 1024) {
        throw new Error(`File size must be less than ${maxSize}MB`)
      }

      // Validate file type
      if (accept === 'image/*' && !file.type.startsWith('image/')) {
        throw new Error('Only image files are allowed')
      }

      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed')
      }

      onUpload(result.file)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)

    if (disabled || isUploading) return

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled && !isUploading) {
      setDragActive(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleRemove = async () => {
    if (!currentFile || !onRemove) return

    try {
      // If the file has a path, try to delete it from storage
      if ('path' in currentFile) {
        await fetch(`/api/admin/upload?path=${encodeURIComponent((currentFile as any).path)}`, {
          method: 'DELETE'
        })
      }
      onRemove()
    } catch (err) {
      console.error('Failed to delete file:', err)
      // Still call onRemove to update the UI
      onRemove()
    }
  }

  if (currentFile) {
    return (
      <div className={cn("relative group", className)}>
        <div className="relative bg-white/5 border border-white/20 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              {currentFile.url ? (
                <img
                  src={currentFile.url}
                  alt={currentFile.name}
                  className="w-12 h-12 object-cover rounded"
                />
              ) : (
                <div className="w-12 h-12 bg-white/10 rounded flex items-center justify-center">
                  <ImageIcon className="h-6 w-6 text-white/60" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{currentFile.name}</p>
              <p className="text-xs text-white/60">Uploaded successfully</p>
            </div>
            {onRemove && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemove}
                className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 hover:bg-red-500/20"
                disabled={disabled}
              >
                <X className="h-4 w-4 text-red-400" />
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
          dragActive 
            ? "border-electric-500 bg-electric-500/10" 
            : "border-white/20 hover:border-white/40",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileInputChange}
          className="hidden"
          disabled={disabled || isUploading}
        />

        <div className="flex flex-col items-center gap-4">
          {isUploading ? (
            <Loader2 className="h-8 w-8 text-electric-400 animate-spin" />
          ) : (
            <Upload className="h-8 w-8 text-white/60" />
          )}

          <div>
            <p className="text-white font-medium mb-1">
              {isUploading ? 'Uploading...' : 'Drop files here or click to upload'}
            </p>
            <p className="text-sm text-white/60">
              {accept === 'image/*' ? 'Images only' : 'Files'} up to {maxSize}MB
            </p>
          </div>

          {!isUploading && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Choose File
            </Button>
          )}
        </div>
      </div>

      {error && (
        <p className="text-red-400 text-sm mt-2">{error}</p>
      )}
    </div>
  )
}
