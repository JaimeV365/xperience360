import Link from 'next/link'
import { Home, Search, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="pt-32 pb-20 min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-dark dark:to-gray-900">
      <div className="container-custom text-center max-w-2xl px-4">
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold text-primary mb-4 leading-none">
            404
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
        </div>
        <h2 className="heading-2 mb-6 text-gray-900 dark:text-white">
          Page Not Found
        </h2>
        <p className="body-text text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-lg mx-auto">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have been moved, 
          deleted, or the URL might be incorrect.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="btn-primary inline-flex items-center justify-center group"
            aria-label="Go to homepage"
          >
            <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" aria-hidden="true" />
            Go Home
          </Link>
          <Link
            href="/blog"
            className="btn-secondary inline-flex items-center justify-center group"
            aria-label="Browse blog posts"
          >
            <Search className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" aria-hidden="true" />
            Browse Blog
          </Link>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link
            href="/"
            className="inline-flex items-center text-primary hover:text-primary-dark dark:hover:text-primary transition-colors text-sm font-medium"
            aria-label="Back to homepage"
          >
            <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}




