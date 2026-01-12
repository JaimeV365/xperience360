import { Metadata } from 'next'
import { getAllPosts } from '@/lib/posts'
import Search from '@/components/Search'
import FilteredBlogPosts from '@/components/FilteredBlogPosts'

export const metadata: Metadata = {
  title: 'Blog | Customer Experience Insights & Thought Leadership',
  description: 'Expert insights on customer experience, employee experience, NPS®, surveys, and business strategy from Xperience 360.',
}

export default function BlogPage() {
  // Get all posts including future ones - filtering will happen client-side
  const allPosts = getAllPosts(true)

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container-custom">
        <div className="mb-12">
          <h1 className="heading-1 mb-4">Blog & Insights</h1>
          <p className="body-text text-xl max-w-3xl">
            Thought leadership, research, and practical insights on customer experience, employee experience, and business strategy.
          </p>
        </div>

        <Search />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <FilteredBlogPosts allPosts={allPosts} />
        </div>
      </div>
    </div>
  )
}

