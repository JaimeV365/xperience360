import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      role="contentinfo"
      className="bg-dark dark:bg-dark-light text-white py-12 mt-20"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-sans">Xperience 360</h3>
            <p className="text-gray-300 mb-4">
              Expert Customer Experience and Employee Experience consulting services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-sans">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services"
                  className="text-gray-300 hover:text-primary transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-primary focus:rounded"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-300 hover:text-primary transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-primary focus:rounded"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-primary transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-primary focus:rounded"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-primary transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-primary focus:rounded"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-sans">Contact</h3>
            <Link
              href="/contact"
              className="text-gray-300 hover:text-primary transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-primary focus:rounded"
            >
              Contact form
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Xperience 360 Ltd. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/accessibility"
                className="text-gray-400 hover:text-primary transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-primary focus:rounded"
              >
                Accessibility
              </Link>
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-primary transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-primary focus:rounded"
              >
                Privacy Policy
              </Link>
              <Link
                href="/about-website"
                className="text-gray-400 hover:text-primary transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-primary focus:rounded"
              >
                About Website
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

