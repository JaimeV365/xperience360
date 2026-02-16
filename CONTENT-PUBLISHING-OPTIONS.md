# Content Publishing Options for Xperience 360

This guide outlines all the ways you can publish new blog posts and edit existing content **without using Cursor**.

## Overview

Your website is designed to be flexible! Since your blog posts are simple markdown files and you have automated deployment via GitHub Actions, you have **multiple options** for managing content.

---

## Option 1: Decap CMS (Recommended - No Coding Required) ⭐

**What it is:** A web-based content management system already integrated into your website.

**Best for:** Writing and editing posts with a user-friendly interface, similar to WordPress.

### How to Use:

1. **Visit your CMS:** Go to `https://xperience-360.com/admin`
2. **Authenticate with GitHub:** You'll be prompted to log in with your GitHub account
3. **Create/Edit Posts:** Use the visual editor to write or modify blog posts
4. **Publish:** Click "Publish" and your changes will automatically:
   - Commit to GitHub
   - Trigger deployment
   - Go live on your website

### Setup Required (One-Time):

Currently, your Decap CMS is configured for local development only. To use it in production:

1. Update `public/admin/config.yml`:
   ```yaml
   # Comment out or remove this line:
   # local_backend: true
   
   # Update the repo field:
   backend:
     name: github
     repo: YOUR_GITHUB_USERNAME/YOUR_REPO_NAME  # Update this!
     branch: main
   ```

2. Enable GitHub OAuth (for authentication):
   - **Option A:** Use a third-party OAuth provider like [Netlify Identity](https://docs.netlify.com/visitor-access/identity/) (free tier available)
   - **Option B:** Self-host the OAuth gateway
   - **Option C:** Use GitHub directly (requires API setup)

**Pros:**
- ✅ No code editor needed
- ✅ Visual markdown editor
- ✅ Image upload interface
- ✅ Preview before publishing
- ✅ Works on any device (desktop, tablet, mobile)

**Cons:**
- ⚠️ Requires one-time OAuth setup

---

## Option 2: GitHub Web Interface (Easiest - No Setup) ⭐

**What it is:** Edit markdown files directly on GitHub.com using your web browser.

**Best for:** Quick edits, no software installation needed.

### How to Use:

1. **Go to GitHub:** Navigate to your repository on github.com
2. **Find your post:** Browse to `content/blog/your-post.md`
3. **Click Edit (pencil icon):** Edit the markdown content directly
4. **Commit changes:** Scroll down, add a commit message, click "Commit changes"
5. **Automatic deployment:** GitHub Actions will build and deploy automatically

### Creating New Posts:

1. Navigate to `content/blog/` folder
2. Click "Add file" → "Create new file"
3. Name it: `my-new-post.md`
4. Add frontmatter and content:
   ```markdown
   ---
   title: "My New Blog Post"
   date: 2026-02-16 10:00:00
   slug: my-new-post
   excerpt: "A brief description"
   author: "Jaime Valle"
   categories: ["Blog"]
   tags: ["cx", "customer-experience"]
   ---
   
   Your content here...
   ```
5. Commit the new file

**Pros:**
- ✅ Zero setup required
- ✅ Works immediately
- ✅ No software to install
- ✅ Full version control history
- ✅ Works on any device with internet

**Cons:**
- ⚠️ Basic markdown editor (no rich preview)
- ⚠️ Image upload requires separate step

---

## Option 3: VS Code (Free Alternative to Cursor)

**What it is:** A free, open-source code editor from Microsoft.

**Best for:** Those comfortable with git and wanting a desktop editing experience.

### How to Use:

1. **Download:** Get [VS Code](https://code.visualstudio.com/) (100% free)
2. **Clone your repository:** Use the built-in Git features
3. **Edit posts:** Navigate to `content/blog/` and edit markdown files
4. **Commit & Push:** Use the Source Control panel to commit and push changes
5. **Automatic deployment:** GitHub Actions handles the rest

### Recommended Extensions:
- **Markdown All in One** - Enhanced markdown editing
- **Markdown Preview Enhanced** - Live preview
- **GitLens** - Better git integration
- **Prettier** - Code formatting

**Pros:**
- ✅ Free forever
- ✅ Similar to Cursor (both built on same foundation)
- ✅ Rich extensions ecosystem
- ✅ Integrated git support
- ✅ Markdown preview

**Cons:**
- ⚠️ Requires installation
- ⚠️ Steeper learning curve than web interfaces

---

## Option 4: Any Text Editor + Git

**What it is:** Use any text editor you like (Notepad, TextEdit, Sublime, etc.) combined with Git commands.

**Best for:** Those comfortable with command line and wanting maximum flexibility.

### How to Use:

1. **Clone repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
   cd YOUR_REPO
   ```

2. **Edit posts:** Use any text editor to modify `.md` files in `content/blog/`

3. **Commit and push:**
   ```bash
   git add .
   git commit -m "Add new blog post about customer experience"
   git push origin main
   ```

4. **Automatic deployment:** GitHub Actions builds and deploys

**Pros:**
- ✅ Use your preferred text editor
- ✅ Full control over git operations
- ✅ Works offline

**Cons:**
- ⚠️ Requires git knowledge
- ⚠️ Command line usage

---

## Option 5: Mobile Apps

**What it is:** Edit your blog posts from your phone or tablet.

### Options:

**For iOS:**
- **Working Copy** - Full-featured Git client with markdown support
- **GitHub Mobile** - Official GitHub app (basic editing)

**For Android:**
- **GitHub Mobile** - Official GitHub app (basic editing)
- **MGit** - Git client with file editing

**For Both:**
- **GitHub Web Interface** via mobile browser (works well on modern phones)

**Pros:**
- ✅ Edit anywhere
- ✅ No computer needed

**Cons:**
- ⚠️ Smaller screen
- ⚠️ Limited formatting options

---

## Option 6: Online Markdown Editors with Git Integration

**What it is:** Cloud-based editors that connect to GitHub.

### Options:
- **StackBlitz** - Web-based VS Code (https://stackblitz.com)
- **GitHub Codespaces** - Full VS Code in browser (free tier available)
- **Gitpod** - Cloud development environment

**Pros:**
- ✅ No local installation
- ✅ Full IDE features
- ✅ Works on any device

**Cons:**
- ⚠️ Requires internet connection
- ⚠️ May have usage limits on free tiers

---

## Recommended Workflow (No Cursor Needed)

### For Regular Content Updates:
1. **Primary:** Use **Decap CMS** (`/admin`) - Best user experience
2. **Backup:** Use **GitHub Web Interface** - Quick edits on the go
3. **Emergency:** Use **GitHub Mobile App** - Edit from anywhere

### For Technical Changes:
1. **Use VS Code** (free) or any code editor
2. **Git workflow** for version control

---

## What Happens When You Publish?

Regardless of which method you use, the workflow is:

1. **You make changes** (via CMS, GitHub, or text editor)
2. **Changes are committed** to your Git repository
3. **GitHub Actions triggers automatically** (`.github/workflows/deploy.yml`)
4. **Site builds** (Next.js generates static pages)
5. **Deploys to GitHub Pages** (your live site updates)

⏱️ **Total time: 2-5 minutes** from commit to live

---

## Quick Reference: Blog Post Structure

All blog posts are markdown files in `content/blog/` with this structure:

```markdown
---
title: "Your Post Title"
date: 2026-02-16 10:00:00
slug: your-post-slug
excerpt: "Brief description for SEO and listings"
image: "/images/blog/your-image.jpg"  # Optional
author: "Jaime Valle"
categories: ["Blog"]
tags: ["tag1", "tag2"]  # Optional
---

Your markdown content here...

## Headings work like this

- Bullet points
- Are supported

**Bold text** and *italic text* work as expected.

[Links](https://example.com) are easy.

![Images](/images/example.jpg) too!
```

---

## Next Steps

1. **Choose your preferred method** from the options above
2. **Set up Decap CMS for production** (if you want the easiest option)
3. **Try editing a post** using GitHub web interface (no setup needed!)
4. **Consider VS Code** as a free alternative if you liked Cursor

---

## Need Help?

- **Decap CMS Documentation:** https://decapcms.org/docs/
- **GitHub Markdown Guide:** https://guides.github.com/features/mastering-markdown/
- **VS Code Documentation:** https://code.visualstudio.com/docs

---

## Summary

**You have MANY options!** Cursor is just one of many tools you can use. Your content is stored as simple markdown files in Git, which means:

✅ You're not locked into any specific tool  
✅ You can switch between different editors anytime  
✅ Your content is future-proof and portable  
✅ Automated deployment works regardless of how you edit  

**Recommended path:** Start with the GitHub web interface for immediate capability, then set up Decap CMS for the best long-term experience.
