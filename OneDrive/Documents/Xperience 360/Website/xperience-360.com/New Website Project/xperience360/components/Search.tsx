'use client'

import { useState, useEffect, useMemo } from 'react'
import { Search as SearchIcon, X, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { Post } from '@/lib/posts'
import BlogCard from './BlogCard'

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Post[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        performSearch(searchQuery)
      } else {
        setSearchResults([])
        setShowResults(false)
      }
    }, 300) // Debounce search

    return () => clearTimeout(timer)
  }, [searchQuery])

  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      setShowResults(false)
      return
    }

    setIsSearching(true)
    setShowResults(true)

    try {
      // Load posts.json for client-side search (works with static export)
      const response = await fetch('/posts.json')
      const allPosts = await response.json()
      
      const searchTerm = query.toLowerCase().trim()
      const filtered = allPosts.filter((post: any) => {
        const searchableText = `
          ${post.title}
          ${post.excerpt}
          ${post.categories?.join(' ') || ''}
          ${post.tags?.join(' ') || ''}
        `.toLowerCase()
        return searchableText.includes(searchTerm)
      })
      
      setSearchResults(filtered)
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const clearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
    setShowResults(false)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      performSearch(searchQuery)
    }
  }

  return (
    <div className="relative mb-8">
      <form
        onSubmit={handleSubmit}
        className="relative"
        role="search"
        aria-label="Search blog posts"
      >
        <label htmlFor="search-input" className="sr-only">
          Search blog posts
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            {isSearching ? (
              <Loader2 className="w-5 h-5 text-gray-400 animate-spin" aria-hidden="true" />
            ) : (
              <SearchIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
            )}
          </div>
          <input
            id="search-input"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full pl-12 pr-12 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark text-dark dark:text-white focus:outline-2 focus:outline-offset-2 focus:outline-primary focus:border-primary"
            aria-label="Search blog posts"
            aria-autocomplete="list"
            aria-controls="search-results"
            aria-expanded={showResults && searchResults.length > 0}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-4 flex items-center focus:outline-2 focus:outline-offset-2 focus:outline-primary rounded min-h-[44px] min-w-[44px]"
              aria-label="Clear search"
            >
              <X className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
            </button>
          )}
        </div>
      </form>

      {/* Search Results */}
      {showResults && searchQuery && (
        <div
          id="search-results"
          className="absolute z-50 w-full mt-2 bg-white dark:bg-dark border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-xl max-h-96 overflow-y-auto"
          role="listbox"
          aria-label="Search results"
        >
          {isSearching ? (
            <div className="p-8 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Searching...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="p-4">
              <p className="text-sm font-semibold mb-4 text-gray-700 dark:text-gray-300">
                Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
              </p>
              <div className="space-y-4">
                {searchResults.slice(0, 5).map((post) => (
                  <div
                    key={post.slug}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors cursor-pointer"
                    onClick={() => {
                      router.push(`/blog/${post.slug}`)
                      clearSearch()
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        router.push(`/blog/${post.slug}`)
                        clearSearch()
                      }
                    }}
                    role="option"
                    tabIndex={0}
                  >
                    <h3 className="font-semibold text-lg mb-2 text-dark dark:text-white">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                No results found for &quot;{searchQuery}&quot;
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}


