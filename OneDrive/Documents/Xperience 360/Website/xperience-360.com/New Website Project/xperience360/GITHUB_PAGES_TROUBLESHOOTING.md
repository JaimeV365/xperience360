# GitHub Pages Deployment Troubleshooting Guide

## Issues Fixed

✅ **Created `.nojekyll` file** - This prevents GitHub Pages from using Jekyll, which can interfere with Next.js static exports

✅ **Improved GitHub Actions workflow** - Added:
   - npm cache for faster builds
   - `npm ci` for consistent installs
   - Build verification step
   - Better error handling

## Required GitHub Repository Settings

### 1. Enable GitHub Pages

1. Go to your repository: https://github.com/JaimeV365/xperience360
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions** (NOT "Deploy from a branch")
4. Save the settings

### 2. Verify Custom Domain (if using xperience-360.com)

1. In the same **Settings** → **Pages** section
2. Under **Custom domain**, enter: `xperience-360.com`
3. Check **Enforce HTTPS** (if available)
4. GitHub will create a CNAME file automatically

### 3. DNS Configuration

For `xperience-360.com` to work with GitHub Pages, your DNS should have:

**Option A: Apex Domain (xperience-360.com)**
```
Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

**Option B: CNAME (www.xperience-360.com)**
```
Type: CNAME
Name: www
Value: JaimeV365.github.io
```

**Option C: Both (recommended)**
- Set up both A records for apex domain AND CNAME for www subdomain

## Testing the Workflow

### 1. Check Workflow Status

1. Go to **Actions** tab in your repository
2. Click on the latest workflow run
3. Check if it completed successfully
4. If it failed, click on the failed job to see error messages

### 2. Common Build Errors

**Error: "out directory not found"**
- This means the Next.js build failed
- Check the build logs for TypeScript/compilation errors
- Ensure all dependencies are in `package.json`

**Error: "Permission denied"**
- Check that GitHub Pages permissions are enabled in repository settings
- Verify the workflow has `pages: write` permission (already set)

**Error: "404 on custom domain"**
- DNS might not be fully propagated (can take up to 48 hours)
- Verify DNS records are correct using `dig` or `nslookup`
- Check that GitHub Pages shows your custom domain as verified

### 3. Manual Workflow Trigger

If you want to test without pushing:
1. Go to **Actions** tab
2. Click **Deploy to GitHub Pages** workflow
3. Click **Run workflow** → **Run workflow**

## Verification Steps

### 1. Check Build Output Locally

```bash
npm install
node scripts/generate-posts.js
npm run build
ls -la out/
```

You should see:
- `index.html`
- `blog/` directory
- `_next/` directory
- `.nojekyll` file (copied from public/)

### 2. Test GitHub Pages URL

After deployment, test:
- `https://JaimeV365.github.io/xperience360/` (if repo name is xperience360)
- `https://xperience-360.com/` (if custom domain is configured)

### 3. Check Browser Console

Open DevTools (F12) and check:
- No 404 errors for assets
- All CSS/JS files loading correctly
- No CORS errors

## Next Steps

1. **Push the changes** to trigger a new deployment:
   ```bash
   git add .
   git commit -m "Fix GitHub Pages deployment"
   git push origin main
   ```

2. **Wait for workflow to complete** (usually 2-5 minutes)

3. **Check the Actions tab** to verify success

4. **Test your site** at https://xperience-360.com/

## Still Having Issues?

If the workflow still fails:

1. **Check the Actions logs** - Look for specific error messages
2. **Verify Node.js version** - The workflow uses Node 20, ensure your local build works with this
3. **Test build locally** - Run `npm run build` locally to catch errors before pushing
4. **Check repository visibility** - GitHub Pages works with public repos or repos with Pages enabled

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Actions for Pages](https://github.com/actions/configure-pages)

