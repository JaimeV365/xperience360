'use client'

import { useState, FormEvent, useEffect } from 'react'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

type FormDataState = {
  query: string
  email: string
  name: string
  company: string
  country: string
  countryOther: string
}

const createInitialFormState = (): FormDataState => ({
  query: '',
  email: '',
  name: '',
  company: '',
  country: '',
  countryOther: '',
})


const getFlagEmoji = (code: string) => {
  if (!code || code.length !== 2) {
    return ''
  }

  return Array.from(code.toUpperCase())
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join('')
}

// Quick countries list, sorted alphabetically
const quickCountries = [
  { code: 'BE', name: 'Belgium' },
  { code: 'CA', name: 'Canada' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'IT', name: 'Italy' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'PT', name: 'Portugal' },
  { code: 'ES', name: 'Spain' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'US', name: 'United States' },
]

// Full world countries list, sorted alphabetically
const allCountries = [
  { code: 'AF', name: 'Afghanistan' },
  { code: 'AL', name: 'Albania' },
  { code: 'DZ', name: 'Algeria' },
  { code: 'AS', name: 'American Samoa' },
  { code: 'AD', name: 'Andorra' },
  { code: 'AO', name: 'Angola' },
  { code: 'AI', name: 'Anguilla' },
  { code: 'AQ', name: 'Antarctica' },
  { code: 'AG', name: 'Antigua and Barbuda' },
  { code: 'AR', name: 'Argentina' },
  { code: 'AM', name: 'Armenia' },
  { code: 'AW', name: 'Aruba' },
  { code: 'AU', name: 'Australia' },
  { code: 'AT', name: 'Austria' },
  { code: 'AZ', name: 'Azerbaijan' },
  { code: 'BS', name: 'Bahamas' },
  { code: 'BH', name: 'Bahrain' },
  { code: 'BD', name: 'Bangladesh' },
  { code: 'BB', name: 'Barbados' },
  { code: 'BY', name: 'Belarus' },
  { code: 'BE', name: 'Belgium' },
  { code: 'BZ', name: 'Belize' },
  { code: 'BJ', name: 'Benin' },
  { code: 'BM', name: 'Bermuda' },
  { code: 'BT', name: 'Bhutan' },
  { code: 'BO', name: 'Bolivia' },
  { code: 'BA', name: 'Bosnia and Herzegovina' },
  { code: 'BW', name: 'Botswana' },
  { code: 'BR', name: 'Brazil' },
  { code: 'IO', name: 'British Indian Ocean Territory' },
  { code: 'VG', name: 'British Virgin Islands' },
  { code: 'BN', name: 'Brunei' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'BF', name: 'Burkina Faso' },
  { code: 'BI', name: 'Burundi' },
  { code: 'KH', name: 'Cambodia' },
  { code: 'CM', name: 'Cameroon' },
  { code: 'CA', name: 'Canada' },
  { code: 'CV', name: 'Cape Verde' },
  { code: 'KY', name: 'Cayman Islands' },
  { code: 'CF', name: 'Central African Republic' },
  { code: 'TD', name: 'Chad' },
  { code: 'CL', name: 'Chile' },
  { code: 'CN', name: 'China' },
  { code: 'CX', name: 'Christmas Island' },
  { code: 'CC', name: 'Cocos Islands' },
  { code: 'CO', name: 'Colombia' },
  { code: 'KM', name: 'Comoros' },
  { code: 'CK', name: 'Cook Islands' },
  { code: 'CR', name: 'Costa Rica' },
  { code: 'HR', name: 'Croatia' },
  { code: 'CU', name: 'Cuba' },
  { code: 'CW', name: 'Curaçao' },
  { code: 'CY', name: 'Cyprus' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'CD', name: 'Democratic Republic of the Congo' },
  { code: 'DK', name: 'Denmark' },
  { code: 'DJ', name: 'Djibouti' },
  { code: 'DM', name: 'Dominica' },
  { code: 'DO', name: 'Dominican Republic' },
  { code: 'TL', name: 'East Timor' },
  { code: 'EC', name: 'Ecuador' },
  { code: 'EG', name: 'Egypt' },
  { code: 'SV', name: 'El Salvador' },
  { code: 'GQ', name: 'Equatorial Guinea' },
  { code: 'ER', name: 'Eritrea' },
  { code: 'EE', name: 'Estonia' },
  { code: 'ET', name: 'Ethiopia' },
  { code: 'FK', name: 'Falkland Islands' },
  { code: 'FO', name: 'Faroe Islands' },
  { code: 'FJ', name: 'Fiji' },
  { code: 'FI', name: 'Finland' },
  { code: 'FR', name: 'France' },
  { code: 'GF', name: 'French Guiana' },
  { code: 'PF', name: 'French Polynesia' },
  { code: 'TF', name: 'French Southern Territories' },
  { code: 'GA', name: 'Gabon' },
  { code: 'GM', name: 'Gambia' },
  { code: 'GE', name: 'Georgia' },
  { code: 'DE', name: 'Germany' },
  { code: 'GH', name: 'Ghana' },
  { code: 'GI', name: 'Gibraltar' },
  { code: 'GR', name: 'Greece' },
  { code: 'GL', name: 'Greenland' },
  { code: 'GD', name: 'Grenada' },
  { code: 'GP', name: 'Guadeloupe' },
  { code: 'GU', name: 'Guam' },
  { code: 'GT', name: 'Guatemala' },
  { code: 'GG', name: 'Guernsey' },
  { code: 'GN', name: 'Guinea' },
  { code: 'GW', name: 'Guinea-Bissau' },
  { code: 'GY', name: 'Guyana' },
  { code: 'HT', name: 'Haiti' },
  { code: 'HN', name: 'Honduras' },
  { code: 'HK', name: 'Hong Kong' },
  { code: 'HU', name: 'Hungary' },
  { code: 'IS', name: 'Iceland' },
  { code: 'IN', name: 'India' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'IR', name: 'Iran' },
  { code: 'IQ', name: 'Iraq' },
  { code: 'IE', name: 'Ireland' },
  { code: 'IM', name: 'Isle of Man' },
  { code: 'IL', name: 'Israel' },
  { code: 'IT', name: 'Italy' },
  { code: 'CI', name: 'Ivory Coast' },
  { code: 'JM', name: 'Jamaica' },
  { code: 'JP', name: 'Japan' },
  { code: 'JE', name: 'Jersey' },
  { code: 'JO', name: 'Jordan' },
  { code: 'KZ', name: 'Kazakhstan' },
  { code: 'KE', name: 'Kenya' },
  { code: 'KI', name: 'Kiribati' },
  { code: 'XK', name: 'Kosovo' },
  { code: 'KW', name: 'Kuwait' },
  { code: 'KG', name: 'Kyrgyzstan' },
  { code: 'LA', name: 'Laos' },
  { code: 'LV', name: 'Latvia' },
  { code: 'LB', name: 'Lebanon' },
  { code: 'LS', name: 'Lesotho' },
  { code: 'LR', name: 'Liberia' },
  { code: 'LY', name: 'Libya' },
  { code: 'LI', name: 'Liechtenstein' },
  { code: 'LT', name: 'Lithuania' },
  { code: 'LU', name: 'Luxembourg' },
  { code: 'MO', name: 'Macau' },
  { code: 'MK', name: 'Macedonia' },
  { code: 'MG', name: 'Madagascar' },
  { code: 'MW', name: 'Malawi' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'MV', name: 'Maldives' },
  { code: 'ML', name: 'Mali' },
  { code: 'MT', name: 'Malta' },
  { code: 'MH', name: 'Marshall Islands' },
  { code: 'MQ', name: 'Martinique' },
  { code: 'MR', name: 'Mauritania' },
  { code: 'MU', name: 'Mauritius' },
  { code: 'YT', name: 'Mayotte' },
  { code: 'MX', name: 'Mexico' },
  { code: 'FM', name: 'Micronesia' },
  { code: 'MD', name: 'Moldova' },
  { code: 'MC', name: 'Monaco' },
  { code: 'MN', name: 'Mongolia' },
  { code: 'ME', name: 'Montenegro' },
  { code: 'MS', name: 'Montserrat' },
  { code: 'MA', name: 'Morocco' },
  { code: 'MZ', name: 'Mozambique' },
  { code: 'MM', name: 'Myanmar' },
  { code: 'NA', name: 'Namibia' },
  { code: 'NR', name: 'Nauru' },
  { code: 'NP', name: 'Nepal' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'NC', name: 'New Caledonia' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'NI', name: 'Nicaragua' },
  { code: 'NE', name: 'Niger' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'NU', name: 'Niue' },
  { code: 'NF', name: 'Norfolk Island' },
  { code: 'KP', name: 'North Korea' },
  { code: 'MP', name: 'Northern Mariana Islands' },
  { code: 'NO', name: 'Norway' },
  { code: 'OM', name: 'Oman' },
  { code: 'PK', name: 'Pakistan' },
  { code: 'PW', name: 'Palau' },
  { code: 'PS', name: 'Palestine' },
  { code: 'PA', name: 'Panama' },
  { code: 'PG', name: 'Papua New Guinea' },
  { code: 'PY', name: 'Paraguay' },
  { code: 'PE', name: 'Peru' },
  { code: 'PH', name: 'Philippines' },
  { code: 'PN', name: 'Pitcairn' },
  { code: 'PL', name: 'Poland' },
  { code: 'PT', name: 'Portugal' },
  { code: 'PR', name: 'Puerto Rico' },
  { code: 'QA', name: 'Qatar' },
  { code: 'CG', name: 'Republic of the Congo' },
  { code: 'RE', name: 'Réunion' },
  { code: 'RO', name: 'Romania' },
  { code: 'RU', name: 'Russia' },
  { code: 'RW', name: 'Rwanda' },
  { code: 'BL', name: 'Saint Barthélemy' },
  { code: 'SH', name: 'Saint Helena' },
  { code: 'KN', name: 'Saint Kitts and Nevis' },
  { code: 'LC', name: 'Saint Lucia' },
  { code: 'MF', name: 'Saint Martin' },
  { code: 'PM', name: 'Saint Pierre and Miquelon' },
  { code: 'VC', name: 'Saint Vincent and the Grenadines' },
  { code: 'WS', name: 'Samoa' },
  { code: 'SM', name: 'San Marino' },
  { code: 'ST', name: 'São Tomé and Príncipe' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'SN', name: 'Senegal' },
  { code: 'RS', name: 'Serbia' },
  { code: 'SC', name: 'Seychelles' },
  { code: 'SL', name: 'Sierra Leone' },
  { code: 'SG', name: 'Singapore' },
  { code: 'SX', name: 'Sint Maarten' },
  { code: 'SK', name: 'Slovakia' },
  { code: 'SI', name: 'Slovenia' },
  { code: 'SB', name: 'Solomon Islands' },
  { code: 'SO', name: 'Somalia' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'GS', name: 'South Georgia and the South Sandwich Islands' },
  { code: 'KR', name: 'South Korea' },
  { code: 'SS', name: 'South Sudan' },
  { code: 'ES', name: 'Spain' },
  { code: 'LK', name: 'Sri Lanka' },
  { code: 'SD', name: 'Sudan' },
  { code: 'SR', name: 'Suriname' },
  { code: 'SJ', name: 'Svalbard and Jan Mayen' },
  { code: 'SZ', name: 'Swaziland' },
  { code: 'SE', name: 'Sweden' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'SY', name: 'Syria' },
  { code: 'TW', name: 'Taiwan' },
  { code: 'TJ', name: 'Tajikistan' },
  { code: 'TZ', name: 'Tanzania' },
  { code: 'TH', name: 'Thailand' },
  { code: 'TG', name: 'Togo' },
  { code: 'TK', name: 'Tokelau' },
  { code: 'TO', name: 'Tonga' },
  { code: 'TT', name: 'Trinidad and Tobago' },
  { code: 'TN', name: 'Tunisia' },
  { code: 'TR', name: 'Turkey' },
  { code: 'TM', name: 'Turkmenistan' },
  { code: 'TC', name: 'Turks and Caicos Islands' },
  { code: 'TV', name: 'Tuvalu' },
  { code: 'VI', name: 'U.S. Virgin Islands' },
  { code: 'UG', name: 'Uganda' },
  { code: 'UA', name: 'Ukraine' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'US', name: 'United States of America' },
  { code: 'UY', name: 'Uruguay' },
  { code: 'UZ', name: 'Uzbekistan' },
  { code: 'VU', name: 'Vanuatu' },
  { code: 'VA', name: 'Vatican City' },
  { code: 'VE', name: 'Venezuela' },
  { code: 'VN', name: 'Vietnam' },
  { code: 'WF', name: 'Wallis and Futuna' },
  { code: 'EH', name: 'Western Sahara' },
  { code: 'YE', name: 'Yemen' },
  { code: 'ZM', name: 'Zambia' },
  { code: 'ZW', name: 'Zimbabwe' },
]

const findCountryByCode = (code: string) =>
  quickCountries.find((country) => country.code === code) ||
  allCountries.find((country) => country.code === code)

const resolveCountryName = (countryCode: string, otherCountryCode: string) => {
  if (!countryCode) {
    return ''
  }

  if (countryCode === 'Other') {
    return findCountryByCode(otherCountryCode)?.name || otherCountryCode
  }

  return findCountryByCode(countryCode)?.name || countryCode
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormDataState>(() => createInitialFormState())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isDetectingCountry, setIsDetectingCountry] = useState(true)
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null)

  // Detect country from IP on component mount
  useEffect(() => {
    const detectCountry = async () => {
      try {
        // Using ipapi.co free tier (no API key needed for country detection)
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()
        
        if (data.country_code) {
          const countryCode = data.country_code.toUpperCase()
          // Check if the detected country is in our quick list
          const foundCountry = quickCountries.find(c => c.code === countryCode)
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
    setSubmitErrorMessage(null)

    try {
      const formspreeEndpoint =
      process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || 'https://formspree.io/f/xrbrglob'

    if (formspreeEndpoint.endsWith('YOUR_FORM_ID')) {
        throw new Error(
          'Formspree endpoint is not configured. Please update NEXT_PUBLIC_FORMSPREE_ENDPOINT.'
        )
      }

      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          query: formData.query.trim(),
          email: formData.email.trim(),
          name: formData.name.trim(),
          company: formData.company.trim(),
          country: resolveCountryName(formData.country, formData.countryOther),
        }),
      })

      if (!response.ok) {
        try {
          const data = await response.json()
          if (data?.errors && Array.isArray(data.errors) && data.errors[0]?.message) {
            throw new Error(data.errors[0].message)
          }
          if (data?.message) {
            throw new Error(data.message)
          }
        } catch (jsonError) {
          console.error('Form submission error (non-JSON response):', jsonError)
        }

        throw new Error('We could not send your message. Please try again later.')
      }

      setSubmitStatus('success')
      setSubmitErrorMessage(null)
      setFormData(createInitialFormState())
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitErrorMessage(
        error instanceof Error ? error.message : 'We could not send your message. Please try again later.'
      )
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => {
      const updated = { ...prev, [name]: value }

      if (name === 'country' && value !== 'Other') {
        updated.countryOther = ''
      }

      return updated
    })
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }

    if (submitStatus === 'error') {
      setSubmitStatus('idle')
      setSubmitErrorMessage(null)
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
          {quickCountries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.code === 'GB' ? `${getFlagEmoji(country.code)} ` : ''}
              {country.name}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>
        {formData.country === 'Other' && (
          <div className="mt-4">
            <label htmlFor="countryOther" className="block text-sm font-semibold mb-2">
              Please select your country
            </label>
            <select
              id="countryOther"
              name="countryOther"
              value={formData.countryOther}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark text-dark dark:text-white focus:outline-2 focus:outline-offset-2 focus:outline-primary"
            >
              <option value="">Select a country</option>
              {allCountries.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        )}
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
              We&apos;ll get back to you within 24-48 hours.
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
              {submitErrorMessage || 'Please try again or refresh the page.'}
            </p>
          </div>
        </div>
      )}
    </form>
  )
}

