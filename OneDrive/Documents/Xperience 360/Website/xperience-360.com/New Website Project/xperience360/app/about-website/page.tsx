import { Metadata } from 'next'
import { Cookie, MapPin, LockKeyhole, Accessibility } from 'lucide-react'
import { X, Check } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About This Website | Privacy-First, Accessible Design',
  description: 'Learn about our website design principles: no cookies, no trackers, secure, and accessible. We respect your privacy and follow best practices.',
  keywords: ['privacy', 'no cookies', 'no tracking', 'accessible website', 'WCAG', 'secure website', 'privacy-first'],
  openGraph: {
    title: 'About This Website | Privacy-First, Accessible Design',
    description: 'Learn about our website design principles: no cookies, no trackers, secure, and accessible.',
    type: 'website',
    url: 'https://xperience-360.com/about-website',
  },
  twitter: {
    card: 'summary',
    title: 'About This Website | Privacy-First Design',
    description: 'No cookies, no trackers, secure, and accessible.',
  },
}

export default function AboutWebsitePage() {
  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container-custom max-w-4xl">
        <h1 className="heading-1 mb-6">About This Website</h1>
        <p className="body-text text-xl mb-12">
          We believe in building websites that respect your privacy, protect your data, and are accessible to everyone. 
          Here&apos;s how we&apos;ve designed this site with these principles in mind.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* No Cookies */}
          <div className="bg-white dark:bg-dark p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="relative mb-6">
              <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center relative">
                <Cookie className="w-8 h-8 text-primary" aria-hidden="true" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center border-2 border-white dark:border-dark">
                  <X className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                </div>
              </div>
            </div>
            <h2 className="heading-3 mb-4">No Cookies</h2>
            <p className="body-text">
              We don&apos;t use tracking cookies or store personal data. Your browsing remains private and anonymous. 
              No cookie consent banners, no data collection, just a clean browsing experience.
            </p>
          </div>

          {/* No Tracking */}
          <div className="bg-white dark:bg-dark p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="relative mb-6">
              <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center relative">
                <MapPin className="w-8 h-8 text-primary" aria-hidden="true" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center border-2 border-white dark:border-dark">
                  <X className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                </div>
              </div>
            </div>
            <h2 className="heading-3 mb-4">No Tracking</h2>
            <p className="body-text">
              We don&apos;t track your behavior, collect analytics, or share your data with third parties. 
              Your visit is completely private—we don&apos;t know what pages you view or how long you stay.
            </p>
          </div>

          {/* Secure */}
          <div className="bg-white dark:bg-dark p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="relative mb-6">
              <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center relative">
                <LockKeyhole className="w-8 h-8 text-primary" aria-hidden="true" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center border-2 border-white dark:border-dark">
                  <Check className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                </div>
              </div>
            </div>
            <h2 className="heading-3 mb-4">Secure</h2>
            <p className="body-text">
              Our site uses HTTPS encryption to protect your connection and ensure secure browsing. 
              All data transmission is encrypted, keeping your information safe.
            </p>
          </div>

          {/* Accessible */}
          <div className="bg-white dark:bg-dark p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="relative mb-6">
              <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center relative">
                <Accessibility className="w-8 h-8 text-primary" aria-hidden="true" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center border-2 border-white dark:border-dark">
                  <Check className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                </div>
              </div>
            </div>
            <h2 className="heading-3 mb-4">Accessible</h2>
            <p className="body-text">
              Our site meets WCAG 2.1 AA standards, designed for users working with screen readers, 
              voice navigation, and assistive technologies. Everyone should be able to access our content.
            </p>
          </div>
        </div>

        <section className="bg-primary/5 dark:bg-primary/10 rounded-lg p-8 mb-12">
          <h2 className="heading-2 mb-6">Why These Principles Matter</h2>
          <p className="body-text mb-4">
            In an age where privacy is increasingly under threat, we believe in leading by example. 
            Your data is yours, and we have no right to collect, track, or monetise it without your explicit consent.
          </p>
          <p className="body-text mb-4">
            Accessibility isn&apos;t optional—it&apos;s a fundamental right. By designing with accessibility in mind from the start, 
            we ensure that our content is available to everyone, regardless of their abilities or the technology they use.
          </p>
          <p className="body-text">
            Security and privacy go hand in hand. By using HTTPS and avoiding tracking technologies, 
            we protect both your data and your privacy, creating a safer web for everyone.
          </p>
        </section>

      </div>
    </div>
  )
}

