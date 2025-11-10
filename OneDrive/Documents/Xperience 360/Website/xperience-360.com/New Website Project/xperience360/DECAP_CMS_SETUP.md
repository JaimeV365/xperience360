# Decap CMS Setup Guide

## Quick Start - Local Editing (No GitHub OAuth Needed)

### Step 1: Install Decap CMS CLI (for local backend)

```bash
npm install -g decap-server
```

### Step 2: Start Local Backend

In a **separate terminal window**, run:

```bash
decap-server
```

This will start a local server on `http://localhost:8081` that handles authentication locally.

### Step 3: Access Admin Panel

1. Make sure your Next.js dev server is running: `npm run dev`
2. Visit: **http://localhost:3001/admin**
3. You should see the Decap CMS login screen
4. Click "Login" - it will authenticate locally (no GitHub needed)

### Step 4: Edit Content

1. Click on **"Blog Posts"** in the left sidebar
2. Select a post to edit, or click **"New Blog Post"** to create one
3. Make your changes in the editor
4. Click **"Save"** or **"Publish"** (both save to your local files)
5. The changes are saved directly to `content/blog/` folder

## Production Setup (GitHub OAuth)

When you're ready to use the admin panel on your live site:

### Step 1: Update Config

Edit `public/admin/config.yml`:
- Comment out `local_backend: true`
- Update `repo: YOUR_GITHUB_USERNAME/xperience360` with your actual GitHub username

### Step 2: Create GitHub OAuth App

1. Go to: https://github.com/settings/developers
2. Click **"New OAuth App"**
3. Fill in:
   - **Application name**: Xperience 360 CMS
   - **Homepage URL**: `https://xperience-360.com` (or your domain)
   - **Authorization callback URL**: `https://xperience-360.com/api/auth`
4. Click **"Register application"**
5. Copy the **Client ID**
6. Click **"Generate a new client secret"** and copy it

### Step 3: Add to GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Add two secrets:
   - `OAUTH_CLIENT_ID` = Your Client ID
   - `OAUTH_CLIENT_SECRET` = Your Client Secret

### Step 4: Create Auth API Route

Create `app/api/auth/route.ts`:

```typescript
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  
  // Exchange code for token with GitHub
  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.OAUTH_CLIENT_ID,
      client_secret: process.env.OAUTH_CLIENT_SECRET,
      code,
    }),
  })
  
  const tokenData = await tokenResponse.json()
  
  // Return token to Decap CMS
  return NextResponse.json({ token: tokenData.access_token })
}
```

**Note:** For static export, you'll need to use a different approach or deploy to a platform that supports API routes.

## Troubleshooting

### "Failed to load config.yml"
- Make sure the file is at `public/admin/config.yml`
- Check that the YAML syntax is correct

### "Authentication failed"
- For local: Make sure `decap-server` is running
- For production: Check that OAuth app callback URL matches your domain

### Changes not appearing
- After saving, the files are updated in `content/blog/`
- You may need to refresh the page or restart the dev server
- Run `node scripts/generate-posts.js` to regenerate the search index

## Alternative: Edit Markdown Files Directly

If you prefer, you can edit the markdown files directly:

1. Open `content/blog/` folder
2. Edit any `.md` file with your favorite editor
3. Save the file
4. Run `node scripts/generate-posts.js` to update search index
5. Refresh your browser

This is often faster than using the CMS for quick edits!




