# Deployment Guide for Xperience 360 Website

## Prerequisites

1. GitHub account
2. Node.js 20+ installed
3. Git installed

## Initial Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Generate Posts JSON (for search)

```bash
node -e "require('./lib/generate-posts-json').generatePostsJSON()"
```

### 3. Test Locally

```bash
npm run dev
```

Visit http://localhost:3000 to preview your site.

## GitHub Pages Deployment

### Step 1: Create GitHub Repository

1. Go to GitHub and create a new repository
2. Name it `xperience360` (or your preferred name)
3. **Do NOT initialize with README** (you already have files)

### Step 2: Push Your Code

```bash
git init
git add .
git commit -m "Initial commit - Xperience 360 website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/xperience360.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### Step 3: Configure GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. The workflow will automatically deploy on every push to `main`

### Step 4: Update Decap CMS Configuration

1. Edit `public/admin/config.yml`
2. Update the `repo` field with your GitHub username and repository name:
   ```yaml
   repo: YOUR_USERNAME/xperience360
   ```

### Step 5: Set Up GitHub OAuth for Decap CMS

1. Go to GitHub → Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: Xperience 360 CMS
   - **Homepage URL**: https://YOUR_USERNAME.github.io/xperience360 (or your custom domain)
   - **Authorization callback URL**: https://YOUR_USERNAME.github.io/xperience360/api/auth
4. Copy the **Client ID** and generate a **Client Secret**
5. Add these to your repository secrets:
   - Go to repository → Settings → Secrets and variables → Actions
   - Add `OAUTH_CLIENT_ID` and `OAUTH_CLIENT_SECRET`

## Custom Domain Setup

### Option 1: Keep Domain at Hostinger

1. In Hostinger DNS settings, add:
   - **A Record**: `@` → `185.199.108.153` (GitHub Pages IP)
   - **CNAME Record**: `www` → `YOUR_USERNAME.github.io`

2. In GitHub repository → Settings → Pages:
   - Add your custom domain: `xperience-360.com`
   - Enable "Enforce HTTPS"

### Option 2: Transfer Domain (Later)

You can transfer your domain to GitHub or another registrar later if preferred.

## Contact Form Setup

The contact form uses Formspree, which is compatible with GitHub Pages and other static hosts.

### 1. Create a Formspree form

1. Go to https://formspree.io and create an account (free tier includes 50 submissions/month).
2. Create a new form and copy the submission endpoint (e.g., `https://formspree.io/f/abcd1234`).
3. Add the endpoint to your environment:
   - In development: create `.env.local` with `NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/abcd1234`
   - In production: add the same variable to your build pipeline or hosting provider.

### 2. Local Testing

```env
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id
```

Restart `npm run dev` after adding the variable, submit a test message, and confirm the email arrives.

### 3. Deployment Checklist

- Ensure `NEXT_PUBLIC_FORMSPREE_ENDPOINT` is set in your deployment environment.
- Run `npm run build` followed by `npx serve out` (optional) to test the static export locally.
- Publish the `out/` directory to GitHub Pages (or your preferred static host).

## Building and Testing

### Build for Production

```bash
npm run build
```

This will:
1. Generate `posts.json` for search
2. Build the static site to `out/` folder

### Test Production Build Locally

```bash
npm run build
npx serve out
```

## Adding Blog Posts

### Method 1: Using Decap CMS (Recommended)

1. Visit `https://your-site.com/admin`
2. Log in with GitHub
3. Create new blog post
4. Save and publish

### Method 2: Manual (Git Workflow)

1. Create a new `.md` file in `content/blog/`
2. Add frontmatter:
   ```markdown
   ---
   title: "Your Post Title"
   date: "2025-11-07 12:00:00"
   slug: "your-post-slug"
   author: "Jaime Valle"
   excerpt: "Brief description for listings"
   categories: ["Blog"]
   tags: ["tag1", "tag2"]
   ---
   ```
3. Write your content in markdown
4. Commit and push to GitHub
5. Site will auto-deploy

## Troubleshooting

### Build Fails

- Check Node.js version (needs 20+)
- Run `npm install` again
- Check for TypeScript errors: `npm run lint`

### Search Not Working

- Make sure `posts.json` is generated: `node -e "require('./lib/generate-posts-json').generatePostsJSON()"`
- Check that `public/posts.json` exists after build

### Images Not Loading

- Ensure images are in `public/images/` folder
- Use paths like `/images/your-image.jpg` (not `./images/...`)

### Decap CMS Not Working

- Verify GitHub OAuth is set up correctly
- Check that `public/admin/config.yml` has correct repo name
- Ensure OAuth callback URL matches your site URL

## Maintenance

### Update Dependencies

```bash
npm update
```

### Regenerate Posts JSON

```bash
node -e "require('./lib/generate-posts-json').generatePostsJSON()"
```

## Support

For issues or questions:
- Check GitHub Actions logs for build errors
- Review browser console for runtime errors
- Test locally first before pushing






