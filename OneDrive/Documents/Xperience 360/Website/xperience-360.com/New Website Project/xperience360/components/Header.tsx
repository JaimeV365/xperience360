'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    checkTheme()
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
    return () => observer.disconnect()
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white dark:bg-dark shadow-md'
          : 'bg-white/95 dark:bg-dark/95 backdrop-blur-sm'
      }`}
    >
      <nav
        className="container-custom"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="focus:outline-2 focus:outline-offset-2 focus:outline-primary focus:rounded"
            aria-label="Xperience 360 Home"
            onClick={closeMenu}
          >
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              <Image
                src={isDark ? "/logo-dark.png" : "/logo.png"}
                alt="Xperience 360"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex items-center space-x-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-dark dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-primary focus:rounded px-2 py-1"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 text-dark dark:text-white focus:outline-2 focus:outline-offset-2 focus:outline-primary rounded min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="py-4 space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block px-4 py-3 text-dark dark:text-gray-300 hover:bg-primary hover:text-white dark:hover:bg-primary rounded-md transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-primary font-medium"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="px-4 py-3">
              <ThemeToggle />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
