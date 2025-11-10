import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Accessibility Statement | Xperience 360',
  description: 'Xperience 360 is committed to ensuring digital accessibility for people with disabilities.',
}

export default function AccessibilityPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container-custom max-w-4xl">
        <h1 className="heading-1 mb-8">Accessibility Statement</h1>

        <section className="mb-12">
          <p className="body-text mb-6">
            Xperience 360 is committed to ensuring digital accessibility for people with 
            disabilities. We continually improve the user experience for everyone and apply 
            the relevant accessibility standards.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="heading-2 mb-4">Conformance Status</h2>
          <p className="body-text mb-6">
            The Web Content Accessibility Guidelines (WCAG) define requirements for designers 
            and developers to improve accessibility for people with disabilities. We aim to 
            conform to WCAG 2.1 Level AA.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="heading-2 mb-4">Measures to Support Accessibility</h2>
          <p className="body-text mb-4">
            Xperience 360 takes the following measures to ensure accessibility:
          </p>
          <ul className="space-y-2 body-text list-disc list-inside">
            <li>Include accessibility as part of our mission statement</li>
            <li>Integrate accessibility into our procurement practices</li>
            <li>Provide ongoing accessibility training for our staff</li>
            <li>Include people with disabilities in our design personas</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="heading-2 mb-4">Feedback</h2>
          <p className="body-text mb-4">
            We welcome your feedback on the accessibility of this site. Please contact us if 
            you encounter accessibility barriers:
          </p>
            <ul className="space-y-2 body-text">
              <li>
                <Link href="/contact" className="link-primary">Contact us through our contact form</Link>
              </li>
            </ul>
          <p className="body-text mt-4">
            We aim to respond to accessibility feedback within 2 business days.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="heading-2 mb-4">Technical Specifications</h2>
          <p className="body-text mb-4">
            This website is designed to be compatible with:
          </p>
          <ul className="space-y-2 body-text list-disc list-inside">
            <li>Screen readers (NVDA, JAWS, VoiceOver, TalkBack)</li>
            <li>Keyboard-only navigation</li>
            <li>Voice control software</li>
            <li>Screen magnification software</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="heading-2 mb-4">Assessment Approach</h2>
          <p className="body-text mb-4">
            Xperience 360 assessed the accessibility of this website through:
          </p>
          <ul className="space-y-2 body-text list-disc list-inside">
            <li>Self-evaluation</li>
            <li>Automated testing tools (axe, WAVE, Lighthouse)</li>
            <li>Manual keyboard and screen reader testing</li>
          </ul>
        </section>

        <section>
          <p className="body-text text-sm text-gray-600 dark:text-gray-400">
            This statement was created on November 7, 2025 and last updated on November 7, 2025.
          </p>
        </section>
      </div>
    </div>
  )
}

