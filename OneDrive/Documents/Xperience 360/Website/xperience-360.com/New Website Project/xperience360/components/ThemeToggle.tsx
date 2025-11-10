'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check localStorage and system preference
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (stored) {
      setTheme(stored)
      document.documentElement.classList.toggle('dark', stored === 'dark')
    } else {
      const systemTheme = prefersDark ? 'dark' : 'light'
      setTheme(systemTheme)
      document.documentElement.classList.toggle('dark', systemTheme === 'dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  if (!mounted) {
    return (
      <button
        type="button"
        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 min-h-[44px] min-w-[44px] flex items-center justify-center"
        aria-label="Toggle theme"
        disabled
      >
        <Sun className="w-5 h-5 text-gray-400" aria-hidden="true" />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-primary min-h-[44px] min-w-[44px] flex items-center justify-center"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" aria-hidden="true" />
      ) : (
        <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" aria-hidden="true" />
      )}
    </button>
  )
}






