import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, Share2, ArrowLeft } from 'lucide-react'
import { format } from 'date-fns'
import { getPostBySlug, getRelatedPosts, getPostContent, getAllPosts } from '@/lib/posts'
import SocialShare from '@/components/SocialShare'
import BlogCard from '@/components/BlogCard'
import TableOfContents from '@/components/TableOfContents'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts(true) // Include future posts for static generation
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const baseUrl = 'https://xperience-360.com'
  const postUrl = `${baseUrl}/blog/${post.slug}`
  
  return {
    title: post.title,
    description: post.excerpt || post.title,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      url: postUrl,
      siteName: 'Xperience 360',
      images: post.image ? [post.image] : [],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || post.title,
      images: post.image ? [post.image] : [],
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const baseUrl = 'https://xperience-360.com'
  const postUrl = `${baseUrl}/blog/${post.slug}`
  const content = await getPostContent(post.content)
  const relatedPosts = getRelatedPosts(params.slug, 3)
  const formattedDate = post.date
    ? format(new Date(post.date), 'MMMM yyyy')
    : ''

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || post.title,
    image: post.image ? `${baseUrl}${post.image}` : undefined,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
      url: 'https://www.linkedin.com/in/jaimevuk/',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Xperience 360',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    keywords: post.tags.join(', '),
    articleSection: post.categories.join(', '),
  }

  return (
    <article className="pt-32 pb-20 min-h-screen">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container-custom max-w-4xl">
        {/* Back to Blog */}
        <Link
          href="/blog"
          className="inline-flex items-center text-primary hover:text-primary-dark mb-8 focus:outline-2 focus:outline-offset-2 focus:outline-primary focus:rounded"
          aria-label="Back to blog"
        >
          <ArrowLeft className="w-5 h-5 mr-2" aria-hidden="true" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-8">
          <h1 className="heading-1 mb-6">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6">
            {formattedDate && (
              <time dateTime={post.date} className="flex items-center gap-2">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                {formattedDate}
              </time>
            )}
            {post.readingTime && (
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" aria-hidden="true" />
                {post.readingTime} min read
              </span>
            )}
            <span>By {post.author}</span>
          </div>
          {post.image && (
            <div className="relative h-96 w-full rounded-lg overflow-hidden mb-8">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </header>

        {/* Categories and Tags */}
        {(post.categories.length > 0 || post.tags.length > 0) && (
          <div className="mb-8 flex flex-wrap gap-2">
            {post.categories.map((category) => (
              <span
                key={category}
                className="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-medium"
              >
                {category}
              </span>
            ))}
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Table of Contents */}
        <TableOfContents content={content} />

        {/* Custom styles for download links */}
        <style dangerouslySetInnerHTML={{__html: `
          .prose a:not(.download-link) {
            color: #c49102;
            text-decoration: underline;
            text-decoration-color: rgba(196, 145, 2, 0.5);
            transition: color 0.2s, text-decoration-color 0.2s;
          }
          .prose a:not(.download-link):hover {
            color: #a37802;
            text-decoration-color: #a37802;
          }
          .prose a.download-link::before {
            content: '';
            display: inline-block;
            width: 20px;
            height: 20px;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'/%3E%3Cpolyline points='7 10 12 15 17 10'/%3E%3Cline x1='12' y1='15' x2='12' y2='3'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            margin-right: 0.5rem;
          }
        `}} />

        {/* Content */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none mb-12
            prose-headings:text-dark prose-headings:dark:text-white prose-headings:scroll-mt-20 prose-headings:mt-12 prose-headings:mb-6
            prose-h1:font-bold prose-h2:font-bold prose-h4:font-bold prose-h5:font-bold prose-h6:font-bold
            prose-p:text-gray-700 prose-p:dark:text-gray-300 prose-p:leading-loose prose-p:text-xl prose-p:max-w-none
            [&_h3]:text-3xl [&_h3]:sm:text-4xl [&_h3]:font-normal [&_h3]:leading-tight [&_h3]:mb-8
            prose-figcaption:text-sm prose-figcaption:text-gray-600 prose-figcaption:dark:text-gray-400 prose-figcaption:italic prose-figcaption:text-left prose-figcaption:mt-2 prose-figcaption:mb-6
            [&_p.mb-6]:mb-6 [&_p.mb-2]:mb-2 [&_p.mt-6]:mt-6
            prose-strong:text-dark prose-strong:dark:text-white prose-strong:font-semibold
            [&_li_strong]:font-bold [&_li_strong]:text-dark [&_li_strong]:dark:text-white
            prose-img:rounded-lg prose-img:shadow-lg prose-img:my-4 prose-img:max-w-full prose-img:mx-auto prose-img:block
            prose-figure:flex prose-figure:flex-col prose-figure:items-center prose-figure:my-8
            [&_img[src*='TERESA-MONROE']]:hidden
            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:dark:bg-primary/10 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:my-8
            [&_.methodology-note]:my-8 [&_.methodology-note]:p-6 [&_.methodology-note]:border-l-4 [&_.methodology-note]:border-primary [&_.methodology-note]:bg-primary/5 [&_.methodology-note]:dark:bg-primary/10 [&_.methodology-note]:rounded-r-lg
            [&_.methodology-note_h4]:text-lg [&_.methodology-note_h4]:font-bold [&_.methodology-note_h4]:text-primary [&_.methodology-note_h4]:mb-3 [&_.methodology-note_h4]:uppercase [&_.methodology-note_h4]:tracking-wide
            [&_.methodology-note_div]:text-gray-700 [&_.methodology-note_div]:dark:text-gray-300 [&_.methodology-note_div]:space-y-2
            prose-code:text-primary prose-code:bg-primary/10 prose-code:dark:bg-primary/20 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
            prose-pre:bg-dark prose-pre:text-white prose-pre:rounded-lg prose-pre:p-4 prose-pre:my-8
            prose-ul:list-disc prose-ul:pl-6 prose-ul:my-8 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-8
            prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-8 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-8
            prose-li:my-3 prose-li:leading-relaxed
            [&_ul_ul]:list-disc [&_ul_ul]:pl-6 [&_ul_ul]:ml-4
            [&_ol_li]:list-item
            prose-table:w-full prose-table:my-8
            [&_table.summary-table]:w-full [&_table.summary-table]:border-collapse [&_table.summary-table]:bg-white [&_table.summary-table]:dark:bg-dark-light [&_table.summary-table]:shadow-lg [&_table.summary-table]:rounded-lg [&_table.summary-table]:overflow-hidden [&_table.summary-table]:my-8 [&_table.summary-table]:border [&_table.summary-table]:border-gray-200 [&_table.summary-table]:dark:border-gray-700
            [&_a.download-link]:inline-flex [&_a.download-link]:items-center [&_a.download-link]:gap-2.5 [&_a.download-link]:px-5 [&_a.download-link]:py-3 [&_a.download-link]:mt-4 [&_a.download-link]:mb-6 [&_a.download-link]:bg-primary [&_a.download-link]:text-white [&_a.download-link]:rounded-lg [&_a.download-link]:font-semibold [&_a.download-link]:hover:bg-primary-dark [&_a.download-link]:transition-all [&_a.download-link]:no-underline [&_a.download-link]:shadow-md [&_a.download-link]:hover:shadow-lg [&_a.download-link]:before:content-['⬇'] [&_a.download-link]:before:text-lg [&_a.download-link]:before:leading-none [&_a.download-link]:before:font-normal"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Social Share */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mb-12">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h3 className="text-lg font-semibold">Share this article</h3>
            <SocialShare
              title={post.title}
              url={`https://xperience-360.com/blog/${post.slug}`}
            />
          </div>
        </div>

        {/* Author Bio */}
        <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-6 mb-12">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <Image
                src="/images/author-pic.png"
                alt="author"
                width={80}
                height={80}
                className="rounded-lg object-cover w-[80px] h-[80px]"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2 dark:text-white">About the Author</h3>
              <p className="body-text mb-3 text-sm dark:text-white">
                <strong>Jaime Valle</strong> is a senior Customer Experience (CX) consultant who helps organisations see their business through their customers&apos; eyes, turning customer insight into measurable growth.
              </p>
              <a
                href="https://www.linkedin.com/in/jaimevuk/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary dark:text-primary hover:text-primary-dark dark:hover:text-primary-dark font-semibold text-sm transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-primary focus:rounded"
                aria-label="Connect with Jaime Valle on LinkedIn (opens in new tab)"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-12">
            <h2 className="heading-2 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
