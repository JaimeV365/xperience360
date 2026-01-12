'use client'

import { useMemo } from 'react'
import type { Post } from '@/lib/posts'
import BlogCard from './BlogCard'

interface FilteredBlogPostsProps {
  allPosts: Post[]
}

export default function FilteredBlogPosts({ allPosts }: FilteredBlogPostsProps) {
  // Filter posts client-side using the actual current date
  const filteredPosts = useMemo(() => {
    const now = new Date()
    // Set to start of today (midnight) to avoid timezone and time-of-day issues
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    
    return allPosts
      .filter((post) => {
        if (!post.date) return false // Exclude posts without dates
        try {
          const postDate = new Date(post.date)
          // Set to start of post date (midnight) for fair comparison
          const postDateStart = new Date(
            postDate.getFullYear(),
            postDate.getMonth(),
            postDate.getDate()
          )
          return postDateStart <= today
        } catch {
          return false // Exclude posts with invalid dates
        }
      })
      .sort((a, b) => {
        // Sort by date, newest first
        if (a.date < b.date) {
          return 1
        } else {
          return -1
        }
      })
  }, [allPosts])

  if (filteredPosts.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <p className="body-text text-xl">No blog posts yet. Check back soon!</p>
      </div>
    )
  }

  return (
    <>
      {filteredPosts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </>
  )
}
