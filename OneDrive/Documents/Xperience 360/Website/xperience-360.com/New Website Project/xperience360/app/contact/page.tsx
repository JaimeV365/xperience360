import { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us | Get in Touch with Xperience 360',
  description: 'Contact Xperience 360 for expert CX and EX consulting services. Get in touch for a free consultation and discover how we can help your business thrive.',
  keywords: ['contact CX consultant', 'CX consultation', 'customer experience consultant', 'get in touch', 'free consultation'],
  openGraph: {
    title: 'Contact Us | Get in Touch with Xperience 360',
    description: 'Contact Xperience 360 for expert CX and EX consulting services. Get in touch for a free consultation.',
    type: 'website',
    url: 'https://xperience-360.com/contact',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Us | Get in Touch with Xperience 360',
    description: 'Contact Xperience 360 for expert CX and EX consulting services.',
  },
}

export default function ContactPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="heading-1 mb-6">Get in Touch</h1>
          <p className="body-text text-xl max-w-2xl mx-auto">
            Ready to transform your customer experience? Contact us for a free consultation 
            and discover how we can help your business thrive.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <ContactForm />
          
          <div className="mt-12 p-6 bg-primary/5 dark:bg-primary/10 rounded-lg text-center">
            <h3 className="font-semibold text-lg mb-2">Response Time</h3>
            <p className="body-text">
              We aim to respond to all inquiries within 2 working days.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

