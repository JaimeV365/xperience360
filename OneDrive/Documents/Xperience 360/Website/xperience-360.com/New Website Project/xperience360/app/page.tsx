import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Users, TrendingUp, MessageSquare } from 'lucide-react'
import { getAllPosts } from '@/lib/posts'
import BlogCard from '@/components/BlogCard'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Transform Your Customer Experience Into Competitive Advantage',
  description: 'Expert CX & EX consulting services. Discover how our tailored programmes can boost revenue and build lasting customer relationships.',
  keywords: ['customer experience', 'CX consulting', 'employee experience', 'EX consulting', 'NPS®', 'customer satisfaction', 'CX strategy', 'customer insights'],
  openGraph: {
    title: 'Xperience 360 | Transform Your Customer Experience Into Competitive Advantage',
    description: 'Expert CX & EX consulting services. Discover how our tailored programmes can boost revenue and build lasting customer relationships.',
    type: 'website',
    url: 'https://xperience-360.com',
    siteName: 'Xperience 360',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Xperience 360 | Transform Your Customer Experience',
    description: 'Expert CX & EX consulting services. Discover how our tailored programmes can boost revenue.',
  },
}

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 3)

  return (
    <>
      {/* Hero Section - Top Task: Learn about services */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary/10 via-white to-primary/5 dark:from-primary/20 dark:via-dark dark:to-primary/10">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="heading-1 mb-6">
                Transform Your Customer Experience Into Competitive Advantage
              </h1>
              <p className="body-text text-xl mb-8">
                Expert CX & EX consulting services. 
                We help businesses unlock their potential through customer-centric strategies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="btn-primary inline-flex items-center justify-center"
                  aria-label="Get your free CX assessment"
                >
                  Get Your Free CX Assessment
                  <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                </Link>
                <Link
                  href="/services"
                  className="btn-secondary inline-flex items-center justify-center"
                  aria-label="Learn more about our services"
                >
                  Our Services
                </Link>
              </div>
            </div>
            <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                alt="Professional business team collaborating on customer experience strategy"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview - Top Task: Learn about services */}
      <section className="py-20 bg-white dark:bg-dark-light">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Our Services</h2>
            <p className="body-text max-w-2xl mx-auto">
              Comprehensive CX and EX solutions tailored to your business needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-dark p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-primary" aria-hidden="true" />
              </div>
              <h3 className="heading-3 mb-4">Customer Experience</h3>
              <p className="body-text mb-6">
                Transform your customer journey with data-driven insights and proven strategies.
              </p>
              <Link
                href="/services#customer-experience"
                className="link-primary font-semibold"
                aria-label="Learn more about Customer Experience services"
              >
                Learn more →
              </Link>
            </div>

            <div className="bg-white dark:bg-dark p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-primary" aria-hidden="true" />
              </div>
              <h3 className="heading-3 mb-4">Employee Experience</h3>
              <p className="body-text mb-6">
                Empower your team for success with employee-focused strategies and engagement programmes.
              </p>
              <Link
                href="/services#employee-experience"
                className="link-primary font-semibold"
                aria-label="Learn more about Employee Experience services"
              >
                Learn more →
              </Link>
            </div>

            <div className="bg-white dark:bg-dark p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                <MessageSquare className="w-8 h-8 text-primary" aria-hidden="true" />
              </div>
            <h3 className="heading-3 mb-4">NPS® & Survey Design</h3>
              <p className="body-text mb-6">
                Create effective measurement programmes that deliver actionable insights.
              </p>
              <Link
                href="/services#nps-surveys"
                className="link-primary font-semibold"
                aria-label="Learn more about NPS® and Survey Design services"
              >
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Recent Blog Posts - Top Task: Read thought leadership */}
      <section className="py-20 bg-white dark:bg-dark-light">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="heading-2 mb-4">Latest Insights</h2>
              <p className="body-text">
                Thought leadership on customer experience, employee experience, and business strategy
              </p>
            </div>
            <Link
              href="/blog"
              className="btn-secondary hidden md:inline-flex"
              aria-label="View all blog posts"
            >
              View All Posts
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {recentPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
          <div className="text-center md:hidden">
            <Link
              href="/blog"
              className="btn-secondary inline-flex"
              aria-label="View all blog posts"
            >
              View All Posts
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA - Top Task: Contact for consulting */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Transform Your Customer Experience?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Get in touch for a free consultation and discover how we can help your business thrive.
          </p>
          <Link
            href="/contact"
            className="btn-secondary bg-white text-primary hover:bg-gray-100 inline-flex items-center"
            aria-label="Contact us for a free consultation"
          >
            Get in Touch
            <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* NPS Trademark Disclaimer */}
      <div className="py-8 bg-white dark:bg-dark">
        <div className="container-custom">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            <em>Net Promoter®, NPS®, NPS Prism®, and the NPS-related emoticons are registered trademarks of Bain & Company, Inc., NICE Systems, Inc., and Fred Reichheld. Net Promoter Score℠ and Net Promoter System℠ are service marks of Bain & Company, Inc., NICE Systems, Inc., and Fred Reichheld.</em>
          </p>
        </div>
      </div>
    </>
  )
}

