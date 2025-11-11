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

Create a Formspree form (free tier available) and set the endpoint in `.env.local` and in your hosting provider:

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | Your Formspree submission URL (e.g. `https://formspree.io/f/abcd1234`) |

> Form submissions post directly to Formspree, which handles email delivery and spam filtering for static sites such as GitHub Pages.

## Deployment

This site is configured for GitHub Pages. The build output goes to the `out` folder.

> If you host on GitHub Pages, the contact form API route will not run. Deploy to a platform with Next.js serverless support (Vercel, Netlify, Cloudflare Pages with Functions, etc.) to send email notifications.

## Content Management

Visit `/admin` to access Decap CMS for managing blog posts.






