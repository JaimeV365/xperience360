'use client'

import { useState, FormEvent, useEffect } from 'react'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

// Country list with flags, sorted alphabetically
const countries = [
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'US', name: 'United States of America', flag: '🇺🇸' },
]

export default function ContactForm() {
  const [formData, setFormData] = useState({
    query: '',
    email: '',
    name: '',
    company: '',
    country: '',
    countryOther: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isDetectingCountry, setIsDetectingCountry] = useState(true)

  // Detect country from IP on component mount
  useEffect(() => {
    const detectCountry = async () => {
      try {
        // Using ipapi.co free tier (no API key needed for country detection)
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()
        
        if (data.country_code) {
          const countryCode = data.country_code.toUpperCase()
          // Check if the detected country is in our list
          const foundCountry = countries.find(c => c.code === countryCode)
          if (foundCountry) {
            setFormData(prev => {
              // Only set if not already set
              if (!prev.country) {
                return { ...prev, country: foundCountry.code }
              }
              return prev
            })
          }
        }
      } catch (error) {
        // Silently fail - user can still select country manually
        console.error('Country detection failed:', error)
      } finally {
        setIsDetectingCountry(false)
      }
    }

    detectCountry()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.query.trim()) {
      newErrors.query = 'Your query, question or comment is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Option 1: Formspree (Recommended for static sites)
      // Replace YOUR_FORM_ID with your Formspree form ID
      // Sign up at https://formspree.io and get your form endpoint
      
      const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || 'https://formspree.io/f/YOUR_FORM_ID'
      
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: formData.query,
          email: formData.email,
          name: formData.name,
          company: formData.company,
          country: formData.country === 'Other' 
            ? formData.countryOther 
            : countries.find(c => c.code === formData.country)?.name || formData.country,
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          query: '',
          email: '',
          name: '',
          company: '',
          country: '',
          countryOther: '',
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Query/Comment - Required */}
      <div>
        <label htmlFor="query" className="block text-sm font-semibold mb-2">
          Your Query, Question or Comment <span className="text-red-500" aria-label="required">*</span>
        </label>
        <textarea
          id="query"
          name="query"
          value={formData.query}
          onChange={handleChange}
          rows={5}
          required
          aria-required="true"
          aria-describedby={errors.query ? 'query-error' : undefined}
          className={`w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-dark text-dark dark:text-white focus:outline-2 focus:outline-offset-2 focus:outline-primary ${
            errors.query ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
        />
        {errors.query && (
          <p id="query-error" className="mt-2 text-sm text-red-500" role="alert">
            {errors.query}
          </p>
        )}
      </div>

      {/* Email - Required */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold mb-2">
          Email <span className="text-red-500" aria-label="required">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          aria-required="true"
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={`w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-dark text-dark dark:text-white focus:outline-2 focus:outline-offset-2 focus:outline-primary ${
            errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
        />
        {errors.email && (
          <p id="email-error" className="mt-2 text-sm text-red-500" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      {/* Name - Optional */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark text-dark dark:text-white focus:outline-2 focus:outline-offset-2 focus:outline-primary"
        />
      </div>

      {/* Company - Optional */}
      <div>
        <label htmlFor="company" className="block text-sm font-semibold mb-2">
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark text-dark dark:text-white focus:outline-2 focus:outline-offset-2 focus:outline-primary"
        />
      </div>

      {/* Country - Optional */}
      <div>
        <label htmlFor="country" className="block text-sm font-semibold mb-2">
          Country
        </label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          disabled={isDetectingCountry}
          className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark text-dark dark:text-white focus:outline-2 focus:outline-offset-2 focus:outline-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="">
            {isDetectingCountry ? 'Detecting your location...' : 'Select a country'}
          </option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.flag} {country.name}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>
        {formData.country === 'Other' && (
          <div className="mt-4">
            <label htmlFor="countryOther" className="block text-sm font-semibold mb-2">
              Please specify your country
            </label>
            <input
              type="text"
              id="countryOther"
              name="countryOther"
              value={formData.countryOther}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark text-dark dark:text-white focus:outline-2 focus:outline-offset-2 focus:outline-primary"
            />
          </div>
        )}
      </div>

      {/* Cloudflare Turnstile - Will be added when Cloudflare is configured */}
      <div id="cf-turnstile-container">
        {/* Cloudflare Turnstile widget will be rendered here */}
        {/* You'll need to add the script and configure it */}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Submit contact form"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>

      {/* Success Message */}
      {submitStatus === 'success' && (
        <div
          className="p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg flex items-start gap-3"
          role="alert"
          aria-live="polite"
        >
          <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" aria-hidden="true" />
          <div>
            <p className="font-semibold text-green-800 dark:text-green-300">
              Message sent successfully!
            </p>
            <p className="text-sm text-green-700 dark:text-green-400 mt-1">
              We'll get back to you within 24-48 hours.
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div
          className="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-lg flex items-start gap-3"
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" aria-hidden="true" />
          <div>
            <p className="font-semibold text-red-800 dark:text-red-300">
              Something went wrong
            </p>
            <p className="text-sm text-red-700 dark:text-red-400 mt-1">
              Please try again or refresh the page.
            </p>
          </div>
        </div>
      )}
    </form>
  )
}

