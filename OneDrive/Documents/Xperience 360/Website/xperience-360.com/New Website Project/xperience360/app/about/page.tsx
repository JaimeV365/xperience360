import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Globe, Languages, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us | Global CX & EX Consulting Network',
  description: 'We are part of a global network of CX-EX Consultants with presence in the United Kingdom, mainland Europe and North America. Our international consultants speak your language and your customers\' language.',
  keywords: ['CX consultants', 'EX consultants', 'customer experience consulting', 'employee experience consulting', 'global network', 'multilingual consultants'],
  openGraph: {
    title: 'About Xperience 360 | Global CX & EX Consulting Network',
    description: 'We are part of a global network of CX-EX Consultants with presence in the United Kingdom, mainland Europe and North America.',
    type: 'website',
    url: 'https://xperience-360.com/about',
  },
  twitter: {
    card: 'summary',
    title: 'About Xperience 360 | Global CX & EX Consulting Network',
    description: 'Global network of CX-EX Consultants with multilingual expertise.',
  },
}

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container-custom max-w-4xl">
        <h1 className="heading-1 mb-8">About Xperience 360</h1>

        <section className="mb-16">
          <div className="relative h-64 w-full rounded-lg overflow-hidden mb-8">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
              alt="World map showing global presence"
              fill
              className="object-cover"
            />
          </div>
          <h2 className="heading-2 mb-4">Global Network</h2>
          <p className="body-text mb-6">
            We are part of a global network of CX-EX Consultants with presence in the 
            United Kingdom, mainland Europe and North America.
          </p>
          <Link
            href="/contact"
            className="btn-primary inline-flex"
            aria-label="Contact us to learn more"
          >
            Contact Us
          </Link>
        </section>

        <section className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <Languages className="w-12 h-12 text-primary" aria-hidden="true" />
            <h2 className="heading-2">Multilingual Expertise</h2>
          </div>
          <p className="body-text mb-6">
            Our international consultants speak your language and your customers&apos; language. 
            We understand cultural nuances and local market dynamics, ensuring that your 
            customer experience strategies resonate with your target audience.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
            {['English', 'Spanish', 'French', 'Italian', 'German', 'Portuguese'].map((language) => (
              <div key={language} className="text-center p-4 bg-primary/10 dark:bg-primary/20 rounded-lg">
                <p className="text-2xl font-bold text-primary mb-2">{language}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <Users className="w-12 h-12 text-primary" aria-hidden="true" />
            <h2 className="heading-2">Expert Team</h2>
          </div>
          <p className="body-text mb-6">
            Advisors and consultants with a track record of CX leadership positions and 
            familiarised with the executive level. We bring decades of combined experience 
            in transforming customer and employee experiences across industries.
          </p>
          <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-8">
            <h3 className="heading-3 mb-4">Our Approach</h3>
            <ul className="space-y-3 body-text">
              <li className="flex items-start">
                <span className="text-primary mr-3 font-bold">•</span>
                <span>Data-driven insights and proven methodologies</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3 font-bold">•</span>
                <span>Executive-level strategic thinking</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3 font-bold">•</span>
                <span>Practical, actionable recommendations</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3 font-bold">•</span>
                <span>Cultural and linguistic understanding</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="text-center">
          <h2 className="heading-2 mb-6">Ready to Transform Your Experience?</h2>
          <p className="body-text mb-8 max-w-2xl mx-auto">
            Get in touch to learn how our global network of experts can help you 
            create exceptional customer and employee experiences.
          </p>
          <Link
            href="/contact"
            className="btn-primary inline-flex"
            aria-label="Contact us for a consultation"
          >
            Get in Touch
          </Link>
        </section>

        {/* Company Registration Info */}
        <div className="mt-16 pt-8 border-t border-gray-300 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Xperience 360 Ltd. Registered in England and Wales with company number: 14706265.
          </p>
        </div>
      </div>
    </div>
  )
}






