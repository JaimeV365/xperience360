# Decap CMS Setup Guide

This guide will help you set up Decap CMS so you can manage your blog posts through a user-friendly web interface at `https://xperience-360.com/admin`.

## What is Decap CMS?

Decap CMS (formerly Netlify CMS) is a free, open-source content management system that:
- Provides a WordPress-like editing experience
- Saves content directly to your GitHub repository
- Works with your existing automated deployment
- Requires no database or server maintenance

---

## Current Status

✅ **Already installed** - Decap CMS is integrated into your website  
⚠️ **Needs configuration** - Currently set for local development only  

---

## Setup Options

You have **three options** for authentication. Choose the one that works best for you:

### Option 1: Netlify (Easiest - Recommended) ⭐

Even if you're not hosting on Netlify, you can use their free OAuth service.

**Steps:**

1. **Create a Netlify account** (free): https://app.netlify.com/signup

2. **Connect your GitHub repository:**
   - Go to Netlify Dashboard
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your repository
   - **Important:** You don't need to deploy on Netlify, just connect the repo

3. **Enable Identity & Git Gateway:**
   - Go to Site Settings → Identity
   - Click "Enable Identity"
   - Under "Git Gateway", click "Enable Git Gateway"

4. **Update your CMS config** (`public/admin/config.yml`):
   ```yaml
   backend:
     name: git-gateway
     branch: main
   
   # Remove or comment out:
   # local_backend: true
   ```

5. **Add Identity Widget to your site:**
   - Edit `public/admin/index.html`
   - Add this before `</head>`:
   ```html
   <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
   ```

6. **Deploy your changes**

7. **Invite yourself:**
   - Go to Netlify Dashboard → Identity → Invite users
   - Add your email address
   - Click the invite link in your email
   - Set a password

**Cost:** FREE (forever)

---

### Option 2: GitHub (OAuth App)

Use GitHub's OAuth directly (more technical).

**Steps:**

1. **Create GitHub OAuth App:**
   - Go to GitHub Settings → Developer settings → OAuth Apps
   - Click "New OAuth App"
   - Fill in:
     - Application name: `Xperience 360 CMS`
     - Homepage URL: `https://xperience-360.com`
     - Authorization callback URL: `https://xperience-360.com/api/callback`
   - Copy Client ID and generate Client Secret

2. **Deploy OAuth Gateway:**
   - You'll need to set up a serverless function or small server
   - Options:
     - Vercel/Netlify Functions
     - Cloudflare Workers
     - Simple Express.js server

3. **Update CMS config:**
   ```yaml
   backend:
     name: github
     repo: YOUR_USERNAME/YOUR_REPO
     branch: main
     base_url: YOUR_OAUTH_GATEWAY_URL
   ```

**Cost:** FREE (but requires technical setup)

---

### Option 3: Self-Hosted External OAuth Client

Use one of these pre-built OAuth solutions:

- **Vercel:** https://github.com/vencax/netlify-cms-github-oauth-provider
- **Cloudflare Workers:** https://github.com/GregBrimble/netlify-cms-oauth-provider-cloudflare-workers

**Cost:** FREE (on free tiers)

---

## Recommended: Netlify Git Gateway

For most users, **Option 1 (Netlify)** is the best choice because:

✅ No coding required  
✅ 5-minute setup  
✅ Free forever  
✅ Reliable and maintained  
✅ No servers to manage  

---

## After Setup: Using Decap CMS

Once configured, here's how to use it:

### Creating a New Post:

1. Visit `https://xperience-360.com/admin`
2. Log in with your credentials
3. Click "New Blog Posts"
4. Fill in the fields:
   - **Title:** Your post title
   - **Publish Date:** When to publish
   - **Slug:** URL-friendly version (e.g., `my-new-post`)
   - **Excerpt:** Brief description for SEO
   - **Featured Image:** Upload or link to an image
   - **Author:** Your name (defaults to Jaime Valle)
   - **Categories & Tags:** Organize your content
   - **Body:** Write your content (markdown supported)
5. Click "Publish" → Your post goes live!

### Editing Existing Posts:

1. Visit `https://xperience-360.com/admin`
2. Click on the post you want to edit
3. Make your changes
4. Click "Publish" to save

### Rich Text Features:

- **Bold/Italic:** Use toolbar buttons
- **Headings:** Select heading level from dropdown
- **Links:** Highlight text → click link icon
- **Images:** Drag and drop or click image icon
- **Lists:** Bullet or numbered lists
- **Code blocks:** For technical content
- **Preview:** See how it will look before publishing

---

## Testing Locally (Optional)

If you want to test CMS changes before going live:

1. **Install Decap Server:**
   ```bash
   npm install -g decap-server
   ```

2. **Run local backend:**
   ```bash
   npx decap-server
   ```

3. **Start your dev server:**
   ```bash
   npm run dev
   ```

4. **Access CMS:** `http://localhost:3001/admin`

---

## Troubleshooting

### "Unable to load entries"
- Check that your GitHub repo name is correct in `config.yml`
- Verify OAuth is set up correctly
- Check browser console for errors

### "Not authorized"
- Make sure you've been invited as a user (Netlify Identity)
- Verify your OAuth client ID and secret
- Check that Git Gateway is enabled

### Changes not appearing on site
- Wait 2-5 minutes for GitHub Actions to build
- Check GitHub Actions tab for build errors
- Verify the commit was made to the correct branch

### Images not uploading
- Check `media_folder` path in `config.yml`
- Verify GitHub repository permissions
- Try using image URLs instead of uploads

---

## Step-by-Step: Quick Start with Netlify

Here's the **fastest path** to get Decap CMS working:

1. ⏱️ **2 min** - Sign up for Netlify: https://app.netlify.com/signup
2. ⏱️ **1 min** - Import your GitHub repository (no deploy needed)
3. ⏱️ **1 min** - Enable Identity and Git Gateway in Netlify settings
4. ⏱️ **2 min** - Update your `config.yml` (see Option 1 above)
5. ⏱️ **1 min** - Add identity widget to `public/admin/index.html`
6. ⏱️ **2 min** - Commit and push changes
7. ⏱️ **1 min** - Invite yourself via Netlify Identity
8. ✅ **Done!** - Visit `/admin` and start creating content

**Total time: ~10 minutes**

---

## Alternative: Skip Decap CMS Entirely

If this seems too complex, remember you can:
- ✅ Edit markdown files directly on GitHub.com (zero setup)
- ✅ Use VS Code (free) to edit files locally
- ✅ Use any text editor + git commands

Decap CMS is **optional** but provides the best user experience for non-technical content editing.

---

## Resources

- **Decap CMS Documentation:** https://decapcms.org/docs/
- **Netlify Identity Guide:** https://docs.netlify.com/visitor-access/identity/
- **GitHub OAuth Guide:** https://docs.github.com/en/developers/apps/building-oauth-apps
- **Markdown Cheatsheet:** https://www.markdownguide.org/cheat-sheet/

---

## Summary

**Best path forward:**

1. ✅ **Now:** Use GitHub web interface to edit posts (works immediately)
2. ✅ **Next week:** Set up Decap CMS with Netlify (10 min setup)
3. ✅ **Long term:** Enjoy easy content management without Cursor

You're not dependent on any specific tool - your content is portable and future-proof! 🎉
