import { Metadata } from 'next'
import { getAllPosts } from '@/lib/posts'
import BlogCard from '@/components/BlogCard'
import Search from '@/components/Search'

export const metadata: Metadata = {
  title: 'Blog | Customer Experience Insights & Thought Leadership',
  description: 'Expert insights on customer experience, employee experience, NPS®, surveys, and business strategy from Xperience 360.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container-custom">
        <div className="mb-12">
          <h1 className="heading-1 mb-4">Blog & Insights</h1>
          <p className="body-text text-xl max-w-3xl">
            Thought leadership, research, and practical insights on customer experience, 
            employee experience, and business strategy.
          </p>
        </div>

        <Search />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {posts.length > 0 ? (
            posts.map((post) => <BlogCard key={post.slug} post={post} />)
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="body-text text-xl">No blog posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

