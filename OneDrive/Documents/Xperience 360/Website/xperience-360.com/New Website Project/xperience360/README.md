# Xperience 360 Website

Modern, accessible, SEO-optimized website for Xperience 360 CX consulting.

**Live Site:** https://xperience-360.com

## Features

- ✅ Fully accessible (WCAG 2.1 AA compliant)
- ✅ Top Tasks methodology
- ✅ SEO optimized
- ✅ Cross-browser and multi-device compatible
- ✅ Dark mode (system preference)
- ✅ Blog with markdown support
- ✅ Decap CMS for content management
- ✅ Search functionality
- ✅ Related posts
- ✅ Social sharing

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Markdown for blog posts
- Decap CMS

## Development

```bash
npm install
npm run dev
```

## Build for Production

```bash
npm run build
```

## Environment Variables

Configure the following variables for local development (`.env.local`) and in your hosting provider:

| Variable | Description |
| --- | --- |
| `RESEND_API_KEY` | Resend API key used to send contact form emails (required) |
| `RESEND_FROM_EMAIL` | Verified sender, e.g., `Xperience 360 <notifications@xperience-360.com>` (required) |
| `CONTACT_RECIPIENT_EMAIL` | Recipient of contact form alerts (required) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key (defaults to Cloudflare’s test key during development) |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret key (defaults to Cloudflare’s test key during development) |

> The contact form relies on Next.js API routes. Deploy to a platform that supports them (Vercel, Netlify, Cloudflare Pages with Functions, etc.); static export alone will not process submissions.
>
> When the Turnstile keys are not provided, the app automatically falls back to Cloudflare’s public test keys so you can develop locally. Always configure your real keys before going live.

## Deployment

This site is configured for GitHub Pages. The build output goes to the `out` folder.

> If you host on GitHub Pages, the contact form API route will not run. Deploy to a platform with Next.js serverless support (Vercel, Netlify, Cloudflare Pages with Functions, etc.) to send email notifications.

## Content Management

Visit `/admin` to access Decap CMS for managing blog posts.






