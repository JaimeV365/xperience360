import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Xperience 360',
  description: 'Privacy policy for Xperience 360 website.',
}

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container-custom max-w-4xl">
        <h1 className="heading-1 mb-8">Privacy Policy</h1>

        <section className="mb-12">
          <p className="body-text mb-6">
            Last updated: November 7, 2025
          </p>
          <p className="body-text mb-6">
            Xperience 360 (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, and safeguard your information 
            when you visit our website.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="heading-2 mb-4">Information We Collect</h2>
          <p className="body-text mb-4">
            We may collect information that you provide directly to us, including:
          </p>
          <ul className="space-y-2 body-text list-disc list-inside">
            <li>Name and contact information (email address, company name)</li>
            <li>Information you provide when contacting us through our contact form</li>
            <li>Any other information you choose to provide</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="heading-2 mb-4">How We Use Your Information</h2>
          <p className="body-text mb-4">
            We use the information we collect to:
          </p>
          <ul className="space-y-2 body-text list-disc list-inside">
            <li>Respond to your inquiries and provide customer service</li>
            <li>Send you information about our services (with your consent)</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="heading-2 mb-4">Data Security</h2>
          <p className="body-text mb-6">
            We implement appropriate technical and organizational measures to protect your 
            personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="heading-2 mb-4">Your Rights</h2>
          <p className="body-text mb-4">
            You have the right to:
          </p>
          <ul className="space-y-2 body-text list-disc list-inside">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Object to processing of your information</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="heading-2 mb-4">Contact Us</h2>
          <p className="body-text mb-4">
            If you have questions about this Privacy Policy, please contact us:
          </p>
          <p className="body-text">
            <Link href="/contact" className="link-primary">Use our contact form</Link>
          </p>
        </section>
      </div>
    </div>
  )
}

