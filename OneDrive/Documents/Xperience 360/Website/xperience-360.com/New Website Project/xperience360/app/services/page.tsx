import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Users, TrendingUp, MessageSquare, BarChart3, Target, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'CX & EX Consulting Services | Customer Experience Solutions',
  description: 'Comprehensive Customer Experience and Employee Experience consulting services. We deliver persona classification, customer journey design, key drivers analysis, Apostles Model, text analysis, AI-driven insights, close the loop, CES measurement, and web intercepts. Transform your CX with proven methodologies.',
  keywords: [
    'CX services',
    'EX services',
    'customer experience consulting',
    'employee experience consulting',
    'NPS® surveys',
    'CX strategy',
    'customer journey mapping',
    'customer journey design',
    'CX training',
    'persona classification',
    'customer personas',
    'key drivers analysis',
    'satisfaction drivers',
    'Apostles Model analysis',
    'customer segmentation',
    'text analysis',
    'sentiment analysis',
    'AI-driven insights',
    'machine learning CX',
    'close the loop',
    'customer feedback follow-up',
    'CES measurement',
    'Customer Effort Score',
    'web intercepts',
    'unsolicited feedback',
    'solicited feedback',
    'feedback listening',
    'CX methodologies',
    'CX analysis',
    'customer experience transformation',
    'CX programme',
    'voice of customer',
    'customer insights',
  ],
  openGraph: {
    title: 'CX & EX Consulting Services | Customer Experience Solutions',
    description: 'Comprehensive CX and EX consulting services including persona classification, customer journey design, key drivers analysis, Apostles Model, text analysis, AI insights, and more.',
    type: 'website',
    url: 'https://xperience-360.com/services',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CX & EX Consulting Services | Customer Experience Solutions',
    description: 'Transform your customer experience with proven CX methodologies: persona classification, journey design, key drivers analysis, and AI-driven insights.',
  },
  alternates: {
    canonical: 'https://xperience-360.com/services',
  },
}

export default function ServicesPage() {
  const services = [
    {
      id: 'customer-experience',
      icon: Users,
      title: 'Customer Experience (CX) Consulting',
      description: 'Transform your customer journey with data-driven insights and proven strategies. We help you understand your customers, identify pain points, and create experiences that drive loyalty and growth.',
      features: [
        'Customer journey mapping',
        'CX strategy development',
        'Voice of Customer programmes',
        'Customer segmentation',
        'CX maturity assessment',
      ],
    },
    {
      id: 'employee-experience',
      icon: TrendingUp,
      title: 'Employee Experience (EX) Strategy',
      description: 'Empower your team for success with employee-focused strategies and engagement programmes. Happy employees create happy customers.',
      features: [
        'EX strategy development',
        'Employee engagement programmes',
        'Culture transformation',
        'EX measurement and analytics',
        'Leadership development',
      ],
    },
    {
      id: 'nps-surveys',
      icon: MessageSquare,
      title: 'NPS® & Survey Design',
      description: 'Create effective measurement programmes that deliver actionable insights. Avoid survey fatigue and get data that drives decisions.',
      features: [
        'NPS® programme design',
        'Survey methodology',
        'Question design and optimisation',
        'Response analysis',
        'Action planning frameworks',
      ],
    },
    {
      id: 'cx-technology',
      icon: BarChart3,
      title: 'CX Technology Implementation',
      description: 'Leverage the right technology to support your CX initiatives. We help you select, implement, and optimise CX platforms.',
      features: [
        'Technology assessment',
        'Platform selection',
        'Implementation support',
        'Integration strategies',
        'Training and adoption',
      ],
    },
    {
      id: 'cx-strategy',
      icon: Target,
      title: 'CX Strategy & Roadmap',
      description: 'Develop comprehensive CX strategies aligned with your business objectives. Create clear roadmaps for transformation.',
      features: [
        'Strategic planning',
        'Roadmap development',
        'Stakeholder alignment',
        'Change management',
        'Programme governance',
      ],
    },
    {
      id: 'cx-training',
      icon: Zap,
      title: 'CX Training & Workshops',
      description: 'Build internal capabilities with tailored training programmes and workshops for your team.',
      features: [
        'Executive workshops',
        'Team training',
        'Best practice sharing',
        'Certification programmes',
        'Ongoing support',
      ],
    },
  ]

  const baseUrl = 'https://xperience-360.com'
  
  // JSON-LD structured data for SEO
  const servicesJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Customer Experience and Employee Experience Consulting',
    provider: {
      '@type': 'Organization',
      name: 'Xperience 360',
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
    },
    areaServed: {
      '@type': 'Place',
      name: 'United Kingdom, Europe, North America',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'CX & EX Consulting Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Customer Experience (CX) Consulting',
            description: 'Transform your customer journey with data-driven insights and proven strategies.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Employee Experience (EX) Strategy',
            description: 'Empower your team for success with employee-focused strategies and engagement programmes.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'NPS® & Survey Design',
            description: 'Create effective measurement programmes that deliver actionable insights.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'CX Methodologies & Analysis',
            description: 'Persona classification, customer journey design, key drivers analysis, Apostles Model, text analysis, AI-driven insights, close the loop, CES measurement, and web intercepts.',
          },
        },
      ],
    },
  }

  return (
    <div className="pt-32 pb-20 min-h-screen">
      {/* JSON-LD structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <div className="container-custom">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="heading-1 mb-6">Our Services</h1>
          <p className="body-text text-xl">
            Comprehensive Customer Experience and Employee Experience consulting services. 
            From strategy to implementation, we help businesses unlock their potential through 
            customer-centric approaches.
          </p>
        </div>

        <div className="mb-16">
          <div className="relative h-96 w-full rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80"
              alt="Professional business team collaborating"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.id}
                id={service.id}
                className="bg-white dark:bg-dark p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-primary" aria-hidden="true" />
                </div>
                <h2 className="heading-3 mb-4">{service.title}</h2>
                <p className="body-text mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start body-text">
                      <span className="text-primary mr-2 font-bold">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Standard CX Methodologies & Analysis */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">CX Methodologies & Analysis</h2>
            <p className="body-text text-xl max-w-3xl mx-auto">
              We work with companies to deliver standard CX methodologies and analysis that provide 
              deep insights into customer behaviour, satisfaction drivers, and experience optimisation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-dark p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md">
              <h3 className="heading-3 mb-3 text-lg">Persona Classification</h3>
              <p className="body-text text-sm">
                Develop detailed customer personas based on behaviour, needs, and preferences 
                to create more targeted and effective CX strategies.
              </p>
            </div>
            
            <div className="bg-white dark:bg-dark p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md">
              <h3 className="heading-3 mb-3 text-lg">Customer Journey Design</h3>
              <p className="body-text text-sm">
                Map and design end-to-end customer journeys, identifying touchpoints, 
                pain points, and opportunities for improvement across all channels.
              </p>
            </div>
            
            <div className="bg-white dark:bg-dark p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md">
              <h3 className="heading-3 mb-3 text-lg">Key Drivers Analysis</h3>
              <p className="body-text text-sm">
                Identify the critical factors that most impact customer satisfaction and loyalty, 
                helping you prioritise improvements with the highest ROI.
              </p>
            </div>
            
            <div className="bg-white dark:bg-dark p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md">
              <h3 className="heading-3 mb-3 text-lg">Apostles Model Analysis</h3>
              <p className="body-text text-sm">
                Segment customers based on satisfaction and loyalty to identify apostles, 
                hostages, mercenaries, and terrorists, enabling targeted retention strategies.
              </p>
            </div>
            
            <div className="bg-white dark:bg-dark p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md">
              <h3 className="heading-3 mb-3 text-lg">Text Analysis</h3>
              <p className="body-text text-sm">
                Extract meaningful insights from open-ended feedback, reviews, and comments 
                using advanced text analytics to understand customer sentiment and themes.
              </p>
            </div>
            
            <div className="bg-white dark:bg-dark p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md">
              <h3 className="heading-3 mb-3 text-lg">AI-Driven Insights</h3>
              <p className="body-text text-sm">
                Leverage artificial intelligence and machine learning to uncover patterns, 
                predict customer behaviour, and generate actionable insights from your data.
              </p>
            </div>
            
            <div className="bg-white dark:bg-dark p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md">
              <h3 className="heading-3 mb-3 text-lg">Close the Loop</h3>
              <p className="body-text text-sm">
                Implement systematic processes to follow up with customers after feedback, 
                ensuring they know their voice has been heard and actions are being taken.
              </p>
            </div>
            
            <div className="bg-white dark:bg-dark p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md">
              <h3 className="heading-3 mb-3 text-lg">Unsolicited & Solicited Feedback Listening</h3>
              <p className="body-text text-sm">
                Capture and analyse both proactive customer feedback (surveys) and reactive 
                feedback (complaints, reviews) to get a complete picture of customer sentiment.
              </p>
            </div>
            
            <div className="bg-white dark:bg-dark p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md">
              <h3 className="heading-3 mb-3 text-lg">CES & Web Intercepts</h3>
              <p className="body-text text-sm">
                Measure Customer Effort Score (CES) and deploy web intercepts to capture 
                real-time feedback at key moments in the customer journey.
              </p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="body-text text-lg">
              These methodologies can be integrated into any of our consulting services or 
              delivered as standalone analysis. <Link href="/contact" className="link-primary font-semibold">Get in touch</Link> to discuss 
              which approaches would best suit your needs.
            </p>
          </div>
        </section>

        <section className="bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Enhance Your Customer Experience?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Discover how our tailored CX and EX Programmes can boost revenue and build 
            lasting customer relationships.
          </p>
          <Link
            href="/contact"
            className="btn-secondary bg-white text-primary hover:bg-gray-100 inline-flex items-center"
            aria-label="Contact us for a consultation"
          >
            Get in Touch
          </Link>
        </section>

        {/* NPS Trademark Disclaimer */}
        <div className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            <em>Net Promoter®, NPS®, NPS Prism®, and the NPS-related emoticons are registered trademarks of Bain & Company, Inc., NICE Systems, Inc., and Fred Reichheld. Net Promoter Score℠ and Net Promoter System℠ are service marks of Bain & Company, Inc., NICE Systems, Inc., and Fred Reichheld.</em>
          </p>
        </div>
      </div>
    </div>
  )
}

