"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Search, 
  X, 
  User, 
  FileText, 
  FolderOpen, 
  Users, 
  DollarSign,
  ChevronRight,
  Clock,
  Command
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

// Types for search results
interface Contact {
  id: string;
  name: string;
  email: string;
  company?: string;
  status: string;
  priority: string;
  leadScore: number;
  createdAt: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  published: boolean;
  category: string;
  tags: string[];
  publishedAt?: string;
  createdAt: string;
}

interface Project {
  id: string;
  name: string;
  description?: string;
  status: string;
  priority: string;
  progress: number;
  budget?: number;
  websiteUrl?: string;
  contact: {
    name: string;
    email: string;
    company?: string;
  };
  createdAt: string;
}

interface User {
  id: string;
  name?: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
}

interface Revenue {
  id: string;
  amount: number;
  type: string;
  description?: string;
  status: string;
  dueDate?: string;
  paidDate?: string;
  project?: {
    name: string;
    contact: {
      name: string;
      company?: string;
    };
  };
  contact?: {
    name: string;
    company?: string;
  };
  createdAt: string;
}

interface SearchResults {
  contacts: Contact[];
  blogPosts: BlogPost[];
  projects: Project[];
  users: User[];
  revenue: Revenue[];
  query: string;
}

interface GlobalSearchProps {
  className?: string;
}

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Recent searches management
const RECENT_SEARCHES_KEY = 'admin-recent-searches';
const MAX_RECENT_SEARCHES = 5;

function getRecentSearches(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(RECENT_SEARCHES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveRecentSearch(query: string) {
  if (typeof window === 'undefined' || !query.trim()) return;
  
  try {
    const recent = getRecentSearches();
    const filtered = recent.filter(q => q.toLowerCase() !== query.toLowerCase());
    const updated = [query.trim(), ...filtered].slice(0, MAX_RECENT_SEARCHES);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  } catch {
    // Silently fail if localStorage is not available
  }
}

export function GlobalSearch({ className }: GlobalSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  const debouncedQuery = useDebounce(query, 300);

  // Load recent searches on mount
  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
        setResults(null);
        setSelectedIndex(-1);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Search functionality
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setResults(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch(`/api/admin/search?q=${encodeURIComponent(searchQuery)}&limit=5`);
      if (response.ok) {
        const data = await response.json();
        setResults(data);
      } else {
        console.error('Search failed:', response.statusText);
        setResults(null);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Trigger search when debounced query changes
  useEffect(() => {
    performSearch(debouncedQuery);
  }, [debouncedQuery, performSearch]);

  // Handle search submission
  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      saveRecentSearch(searchQuery);
      setRecentSearches(getRecentSearches());
    }
  };

  // Handle result click
  const handleResultClick = (type: string, id: string, slug?: string) => {
    handleSearch(query);
    setIsOpen(false);
    setQuery('');
    setResults(null);
    setSelectedIndex(-1);

    switch (type) {
      case 'contact':
        router.push(`/admin/contacts?id=${id}`);
        break;
      case 'blog':
        router.push(`/admin/blog?id=${id}`);
        break;
      case 'project':
        router.push(`/admin/projects/${id}`);
        break;
      case 'user':
        router.push(`/admin/users?id=${id}`);
        break;
      case 'revenue':
        router.push(`/admin/revenue?id=${id}`);
        break;
    }
  };

  // Handle recent search click
  const handleRecentSearchClick = (searchQuery: string) => {
    setQuery(searchQuery);
    performSearch(searchQuery);
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
      setRecentSearches([]);
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Get status color
  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      NEW: 'text-blue-500',
      CONTACTED: 'text-yellow-500',
      QUALIFIED: 'text-orange-500',
      CONVERTED: 'text-green-500',
      CLOSED: 'text-gray-500',
      DISCOVERY: 'text-blue-500',
      PROPOSAL: 'text-purple-500',
      DESIGN: 'text-pink-500',
      DEVELOPMENT: 'text-orange-500',
      REVIEW: 'text-yellow-500',
      LAUNCH: 'text-green-500',
      MAINTENANCE: 'text-blue-500',
      COMPLETED: 'text-green-600',
      CANCELLED: 'text-red-500',
      paid: 'text-green-500',
      pending: 'text-yellow-500',
      overdue: 'text-red-500'
    };
    return statusColors[status] || 'text-gray-500';
  };

  // Calculate total results
  const totalResults = results ? 
    results.contacts.length + 
    results.blogPosts.length + 
    results.projects.length + 
    results.users.length + 
    results.revenue.length : 0;

  return (
    <>
      {/* Search trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg",
          "bg-white/10 dark:bg-white/5 backdrop-blur-sm",
          "border border-white/20 dark:border-white/10",
          "text-gray-600 dark:text-gray-300",
          "hover:bg-white/20 dark:hover:bg-white/10",
          "transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-electric-400/50",
          className
        )}
      >
        <Search className="h-4 w-4" />
        <span className="text-sm">Search...</span>
        <div className="flex items-center gap-1 text-xs opacity-60">
          <Command className="h-3 w-3" />
          <span>K</span>
        </div>
      </button>

      {/* Search modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-[10vh]"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl mx-4"
            >
              {/* Glassmorphism container */}
              <div className="bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                {/* Search input */}
                <div className="flex items-center gap-3 p-4 border-b border-white/10">
                  <Search className="h-5 w-5 text-gray-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search contacts, projects, blog posts, users, and revenue..."
                    className="flex-1 bg-transparent border-0 outline-none text-gray-900 dark:text-white placeholder-gray-500 text-lg"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && query.trim()) {
                        handleSearch(query);
                      }
                    }}
                  />
                  {query && (
                    <button
                      onClick={() => {
                        setQuery('');
                        setResults(null);
                      }}
                      className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <X className="h-4 w-4 text-gray-400" />
                    </button>
                  )}
                </div>

                {/* Results */}
                <div ref={resultsRef} className="max-h-96 overflow-y-auto">
                  {isLoading && (
                    <div className="p-8 text-center">
                      <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-electric-400"></div>
                      <p className="mt-2 text-gray-500">Searching...</p>
                    </div>
                  )}

                  {!isLoading && query.trim() && results && totalResults === 0 && (
                    <div className="p-8 text-center text-gray-500">
                      <Search className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>No results found for "{query}"</p>
                    </div>
                  )}

                  {!isLoading && results && totalResults > 0 && (
                    <div className="p-2">
                      {/* Contacts */}
                      {results.contacts.length > 0 && (
                        <div className="mb-4">
                          <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                            <Users className="h-4 w-4" />
                            Contacts ({results.contacts.length})
                          </div>
                          {results.contacts.map((contact) => (
                            <button
                              key={contact.id}
                              onClick={() => handleResultClick('contact', contact.id)}
                              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-colors text-left"
                            >
                              <div className="flex-shrink-0 w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                <User className="h-4 w-4 text-blue-500" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <p className="font-medium text-gray-900 dark:text-white truncate">
                                    {contact.name}
                                  </p>
                                  <span className={cn(
                                    "text-xs px-2 py-1 rounded",
                                    getStatusColor(contact.status),
                                    "bg-current/10"
                                  )}>
                                    {contact.status}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-500 truncate">
                                  {contact.email} {contact.company && `• ${contact.company}`}
                                </p>
                              </div>
                              <ChevronRight className="h-4 w-4 text-gray-400" />
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Blog Posts */}
                      {results.blogPosts.length > 0 && (
                        <div className="mb-4">
                          <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                            <FileText className="h-4 w-4" />
                            Blog Posts ({results.blogPosts.length})
                          </div>
                          {results.blogPosts.map((post) => (
                            <button
                              key={post.id}
                              onClick={() => handleResultClick('blog', post.id, post.slug)}
                              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-colors text-left"
                            >
                              <div className="flex-shrink-0 w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                                <FileText className="h-4 w-4 text-green-500" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <p className="font-medium text-gray-900 dark:text-white truncate">
                                    {post.title}
                                  </p>
                                  <span className={cn(
                                    "text-xs px-2 py-1 rounded",
                                    post.published ? "text-green-600 bg-green-100" : "text-yellow-600 bg-yellow-100"
                                  )}>
                                    {post.published ? 'Published' : 'Draft'}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-500 truncate">
                                  {post.category} {post.excerpt && `• ${post.excerpt}`}
                                </p>
                              </div>
                              <ChevronRight className="h-4 w-4 text-gray-400" />
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Projects */}
                      {results.projects.length > 0 && (
                        <div className="mb-4">
                          <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                            <FolderOpen className="h-4 w-4" />
                            Projects ({results.projects.length})
                          </div>
                          {results.projects.map((project) => (
                            <button
                              key={project.id}
                              onClick={() => handleResultClick('project', project.id)}
                              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-colors text-left"
                            >
                              <div className="flex-shrink-0 w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                <FolderOpen className="h-4 w-4 text-purple-500" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <p className="font-medium text-gray-900 dark:text-white truncate">
                                    {project.name}
                                  </p>
                                  <span className={cn(
                                    "text-xs px-2 py-1 rounded",
                                    getStatusColor(project.status),
                                    "bg-current/10"
                                  )}>
                                    {project.status}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-500 truncate">
                                  {project.contact.name} {project.contact.company && `• ${project.contact.company}`}
                                </p>
                              </div>
                              <ChevronRight className="h-4 w-4 text-gray-400" />
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Users */}
                      {results.users.length > 0 && (
                        <div className="mb-4">
                          <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                            <User className="h-4 w-4" />
                            Users ({results.users.length})
                          </div>
                          {results.users.map((user) => (
                            <button
                              key={user.id}
                              onClick={() => handleResultClick('user', user.id)}
                              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-colors text-left"
                            >
                              <div className="flex-shrink-0 w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                                <User className="h-4 w-4 text-orange-500" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <p className="font-medium text-gray-900 dark:text-white truncate">
                                    {user.name || user.email}
                                  </p>
                                  <span className={cn(
                                    "text-xs px-2 py-1 rounded",
                                    user.isActive ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"
                                  )}>
                                    {user.isActive ? 'Active' : 'Inactive'}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-500 truncate">
                                  {user.email} • {user.role}
                                </p>
                              </div>
                              <ChevronRight className="h-4 w-4 text-gray-400" />
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Revenue */}
                      {results.revenue.length > 0 && (
                        <div className="mb-4">
                          <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                            <DollarSign className="h-4 w-4" />
                            Revenue ({results.revenue.length})
                          </div>
                          {results.revenue.map((revenue) => (
                            <button
                              key={revenue.id}
                              onClick={() => handleResultClick('revenue', revenue.id)}
                              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-colors text-left"
                            >
                              <div className="flex-shrink-0 w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                                <DollarSign className="h-4 w-4 text-emerald-500" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <p className="font-medium text-gray-900 dark:text-white">
                                    {formatCurrency(revenue.amount)}
                                  </p>
                                  <span className={cn(
                                    "text-xs px-2 py-1 rounded",
                                    getStatusColor(revenue.status),
                                    "bg-current/10"
                                  )}>
                                    {revenue.status}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-500 truncate">
                                  {revenue.type} • {revenue.project?.contact.name || revenue.contact?.name}
                                </p>
                              </div>
                              <ChevronRight className="h-4 w-4 text-gray-400" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Recent searches */}
                  {!query.trim() && !isLoading && recentSearches.length > 0 && (
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                          <Clock className="h-4 w-4" />
                          Recent Searches
                        </div>
                        <button
                          onClick={clearRecentSearches}
                          className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                          Clear
                        </button>
                      </div>
                      {recentSearches.map((searchQuery, index) => (
                        <button
                          key={index}
                          onClick={() => handleRecentSearchClick(searchQuery)}
                          className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-colors text-left"
                        >
                          <Search className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-700 dark:text-gray-300">{searchQuery}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Empty state */}
                  {!query.trim() && !isLoading && recentSearches.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                      <Search className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p className="text-lg font-medium mb-1">Search Everything</p>
                      <p className="text-sm">Find contacts, projects, blog posts, users, and revenue records</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}