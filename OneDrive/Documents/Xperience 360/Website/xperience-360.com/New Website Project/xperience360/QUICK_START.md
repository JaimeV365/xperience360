# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Copy Blog Posts (One Sample Included)
Copy your blog posts from:
`Shared with Cursor - Do NOT PUSH/xperience360-migration-package/xperience360-content/blog/`

To:
`content/blog/`

### 3. Generate Search Index
```bash
node -e "require('./lib/generate-posts-json').generatePostsJSON()"
```

### 4. Test Locally
```bash
npm run dev
```

Visit http://localhost:3000

### 5. Set Up Contact Form (Optional)
1. Sign up at https://formspree.io (free)
2. Create a form
3. Get your form endpoint
4. Create `.env.local`:
   ```
   NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
   ```

### 6. Build for Production
```bash
npm run build
```

### 7. Deploy to GitHub
See `DEPLOYMENT.md` for full instructions.

## ✅ That's It!

Your website is ready. All features are implemented:
- ✅ Accessible (WCAG 2.1 AA)
- ✅ SEO optimized
- ✅ Top Tasks focused
- ✅ Responsive design
- ✅ Dark mode
- ✅ Search functionality
- ✅ Blog system
- ✅ Contact form

## Need Help?

- See `PROJECT_SUMMARY.md` for full feature list
- See `DEPLOYMENT.md` for deployment instructions
- Check code comments for implementation details






