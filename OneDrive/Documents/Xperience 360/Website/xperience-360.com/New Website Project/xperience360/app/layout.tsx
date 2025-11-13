import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import ConditionalLayout from '@/components/ConditionalLayout'

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: {
    default: 'Xperience 360 | Customer Experience & Employee Experience Consulting',
    template: '%s | Xperience 360',
  },
  description: 'Expert CX and EX consulting services. Transform your customer and employee experience with proven strategies and decades of expertise.',
  keywords: ['customer experience', 'CX consulting', 'employee experience', 'EX consulting', 'NPS®', 'customer satisfaction'],
  authors: [{ name: 'Jaime Valle' }],
  creator: 'Xperience 360',
  publisher: 'Xperience 360',
  metadataBase: new URL('https://xperience-360.com'),
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://xperience-360.com',
    siteName: 'Xperience 360',
    title: 'Xperience 360 | Customer Experience & Employee Experience Consulting',
    description: 'Expert CX and EX consulting services. Transform your customer and employee experience with proven strategies.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Xperience 360 | Customer Experience & Employee Experience Consulting',
    description: 'Expert CX and EX consulting services. Transform your customer and employee experience.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add Google Search Console verification when available
  },
  icons: {
    icon: [
      { url: '/favicon.png', media: '(prefers-color-scheme: light)' },
      { url: '/favicon-dark.png', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (!theme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${poppins.variable} font-sans`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  )
}

