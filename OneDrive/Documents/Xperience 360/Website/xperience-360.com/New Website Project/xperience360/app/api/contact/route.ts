// Contact form handler: verifies Cloudflare Turnstile tokens and sends email via Resend.
// Requires deployment on a platform that supports Next.js API routes (no static export).

import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'nodejs'

const TURNSTILE_VERIFY_ENDPOINT = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
const TURNSTILE_TEST_SECRET_KEY = '1x0000000000000000000000000000000AA'

const sanitizeString = (value: unknown) =>
  typeof value === 'string' ? value.replace(/\r/g, '').trim() : ''

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const formatRecipients = (recipients: string) =>
  recipients
    .split(',')
    .map((recipient) => recipient.trim())
    .filter(Boolean)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      query,
      email,
      name,
      company,
      countryCode,
      countryOtherCode,
      countryName,
      turnstileToken,
    } = body ?? {}

    const fieldErrors: Record<string, string> = {}

    const trimmedQuery = sanitizeString(query)
    const trimmedEmail = sanitizeString(email)
    const trimmedName = sanitizeString(name)
    const trimmedCompany = sanitizeString(company)

    if (!trimmedQuery) {
      fieldErrors.query = 'Your query, question or comment is required'
    }

    if (!trimmedEmail) {
      fieldErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      fieldErrors.email = 'Please enter a valid email address'
    }

    if (!turnstileToken) {
      fieldErrors.turnstile = 'Please verify you are human'
    }

    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json(
        { message: 'Please review the highlighted fields.', errors: fieldErrors },
        { status: 400 }
      )
    }

    const turnstileSecretKey =
      process.env.TURNSTILE_SECRET_KEY || TURNSTILE_TEST_SECRET_KEY

    if (!process.env.TURNSTILE_SECRET_KEY) {
      console.warn(
        'TURNSTILE_SECRET_KEY is not configured. Using Cloudflare Turnstile test secret key for verification.'
      )
    }

    const turnstileVerification = await fetch(TURNSTILE_VERIFY_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: turnstileSecretKey,
        response: turnstileToken,
      }),
    })

    if (!turnstileVerification.ok) {
      console.error('Failed to verify Turnstile token:', await turnstileVerification.text())
      return NextResponse.json(
        {
          message: 'Human verification failed. Please try again.',
          errors: { turnstile: 'Verification failed. Please try again.' },
        },
        { status: 400 }
      )
    }

    const turnstileResult = await turnstileVerification.json()

    if (!turnstileResult.success) {
      return NextResponse.json(
        {
          message: 'Human verification failed. Please try again.',
          errors: { turnstile: 'Verification failed. Please try again.' },
        },
        { status: 400 }
      )
    }

    const resendApiKey = process.env.RESEND_API_KEY
    const resendFrom = process.env.RESEND_FROM_EMAIL
    const resendRecipients = process.env.CONTACT_RECIPIENT_EMAIL

    if (!resendApiKey || !resendFrom || !resendRecipients) {
      console.error('Resend environment variables are not fully configured.')
      return NextResponse.json(
        { message: 'Email service is not configured.' },
        { status: 500 }
      )
    }

    const resend = new Resend(resendApiKey)

    const resolvedCountry =
      sanitizeString(countryName) ||
      sanitizeString(
        countryCode === 'Other'
          ? countryOtherCode || 'Other'
          : countryCode
      ) ||
      'Not provided'

    const safeName = escapeHtml(trimmedName || 'Not provided')
    const safeEmail = escapeHtml(trimmedEmail)
    const safeCompany = escapeHtml(trimmedCompany || 'Not provided')
    const safeCountry = escapeHtml(resolvedCountry)
    const safeQuery = escapeHtml(trimmedQuery)

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="margin-bottom: 16px;">New contact form submission</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Company:</strong> ${safeCompany}</p>
        <p><strong>Country:</strong> ${safeCountry}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${safeQuery}</p>
      </div>
    `

    const text = [
      'New contact form submission',
      `Name: ${trimmedName || 'Not provided'}`,
      `Email: ${trimmedEmail}`,
      `Company: ${trimmedCompany || 'Not provided'}`,
      `Country: ${resolvedCountry}`,
      '',
      'Message:',
      trimmedQuery,
    ].join('\n')

    await resend.emails.send({
      from: resendFrom,
      to: formatRecipients(resendRecipients),
      reply_to: trimmedEmail,
      subject: 'New contact form submission',
      html,
      text,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form submission failed:', error)
    return NextResponse.json(
      { message: 'Unexpected error while sending your message. Please try again later.' },
      { status: 500 }
    )
  }
}
