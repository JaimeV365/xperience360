import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock } from 'lucide-react'
import { format } from 'date-fns'
import type { Post } from '@/lib/posts'

interface BlogCardProps {
  post: Post
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = post.date
    ? format(new Date(post.date), 'MMMM d, yyyy')
    : ''

  return (
    <article className="bg-white dark:bg-dark rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {post.image && (
        <Link
          href={`/blog/${post.slug}`}
          className="block relative h-48 w-full"
          aria-label={`Read ${post.title}`}
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      )}
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
          {formattedDate && (
            <time dateTime={post.date} className="flex items-center gap-1">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              {formattedDate}
            </time>
          )}
          {post.readingTime && (
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" aria-hidden="true" />
              {post.readingTime} min read
            </span>
          )}
        </div>
        <h3 className="heading-3 mb-3">
          <Link
            href={`/blog/${post.slug}`}
            className="hover:text-primary transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-primary focus:rounded"
          >
            {post.title}
          </Link>
        </h3>
        {post.excerpt && (
          <p className="body-text mb-4 line-clamp-3">{post.excerpt}</p>
        )}
        <Link
          href={`/blog/${post.slug}`}
          className="link-primary font-semibold inline-flex items-center"
          aria-label={`Read more about ${post.title}`}
        >
          Read more →
        </Link>
      </div>
    </article>
  )
}






