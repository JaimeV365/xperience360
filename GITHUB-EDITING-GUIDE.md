# GitHub Web Editing - Quick Start Guide

**The fastest way to publish content without any software installation.**

This method works **right now** - no setup, no configuration, no tools needed.

---

## Creating a New Blog Post

### Step 1: Navigate to Your Content Folder

1. Go to your repository on GitHub.com
2. Navigate to: `OneDrive/Documents/Xperience 360/Website/xperience-360.com/New Website Project/xperience360/content/blog/`

Or use this path structure in your repo:
```
Your Repo → content → blog
```

### Step 2: Create New File

1. Click the **"Add file"** button (top right)
2. Select **"Create new file"**

### Step 3: Name Your File

In the filename box, type: `my-new-post.md`

**Naming tips:**
- Use lowercase
- Use hyphens instead of spaces
- Must end with `.md`
- Examples: `customer-experience-tips.md`, `nps-best-practices.md`

### Step 4: Add Content

Copy this template and paste into the editor:

```markdown
---
title: "Your Post Title Here"
date: 2026-02-16 10:00:00
slug: your-post-slug
excerpt: "A brief description of your post for SEO and preview cards"
author: "Jaime Valle"
categories: ["Blog"]
tags: ["customer-experience", "cx"]
---

Write your introduction here. This is the first paragraph that readers will see.

## Main Heading

Your content goes here. You can write naturally - markdown is easy!

### Subheading

More content here.

## Key Points

Here are some important things to remember:

- First point
- Second point
- Third point

## Adding Emphasis

You can make text **bold** or *italic*.

## Including Links

Check out [this resource](https://example.com) for more information.

## Conclusion

Wrap up your post with final thoughts.
```

### Step 5: Customize the Frontmatter

Update the section between the `---` marks:

| Field | Description | Example |
|-------|-------------|---------|
| `title` | Post title (shown on page) | `"5 Ways to Improve CX"` |
| `date` | Publish date and time | `2026-02-16 14:30:00` |
| `slug` | URL path (lowercase, hyphens) | `improve-customer-experience` |
| `excerpt` | Short description (150-160 chars) | `"Learn proven strategies..."` |
| `author` | Your name | `"Jaime Valle"` |
| `categories` | Main categories | `["Blog", "CX Tips"]` |
| `tags` | Related keywords | `["nps", "surveys", "cx"]` |

### Step 6: Write Your Content

Below the second `---`, write your blog post using markdown:

**Common Formatting:**

```markdown
# H1 Heading (avoid - only one per page)
## H2 Main Section
### H3 Subsection

**bold text**
*italic text*

[Link text](https://example.com)

![Image alt text](/images/blog/photo.jpg)

- Bullet point
- Another bullet point

1. Numbered list
2. Second item
```

### Step 7: Commit (Save)

1. Scroll to bottom
2. In "Commit message" box, type something descriptive:
   - ✅ `Add new blog post about customer loyalty`
   - ✅ `Publish CX trends for 2026`
   - ❌ `Update file` (too vague)

3. Make sure **"Commit directly to the main branch"** is selected
4. Click **"Commit new file"** (green button)

### Step 8: Wait for Deployment

1. Go to **"Actions"** tab in your repo
2. You'll see a new workflow running (yellow dot)
3. Wait 2-5 minutes for it to complete (green checkmark)
4. Your post is now live! 🎉

---

## Editing an Existing Post

### Step 1: Find the Post

1. Navigate to `content/blog/`
2. Click on the `.md` file you want to edit

### Step 2: Click Edit

Click the **pencil icon** (✏️) in the top right of the file view

### Step 3: Make Changes

Edit the content directly in the web editor

**Pro tip:** Click "Preview" tab to see how it looks

### Step 4: Commit Changes

1. Scroll to bottom
2. Add commit message: `Update post about customer retention`
3. Click **"Commit changes"**

### Step 5: Deploy

Same as before - check Actions tab, wait 2-5 minutes, done!

---

## Adding Images

### Option 1: Use Existing Images

If you already have images in `/public/images/blog/`:

```markdown
![Description of image](/images/blog/your-image.jpg)
```

### Option 2: Upload New Images

1. Navigate to `public/images/blog/` in your repo
2. Click **"Add file"** → **"Upload files"**
3. Drag and drop your images
4. Commit with message: `Add images for new blog post`
5. Reference in your markdown:
   ```markdown
   ![My Image](/images/blog/new-image.jpg)
   ```

### Option 3: Use External URLs

```markdown
![Description](https://images.unsplash.com/photo-xyz?w=800)
```

**Pro tip:** Use high-quality, optimized images (under 200KB when possible)

---

## Markdown Quick Reference

### Text Formatting

```markdown
**Bold text**
*Italic text*
***Bold and italic***
~~Strikethrough~~
```

### Headings

```markdown
## Main Heading (H2)
### Subheading (H3)
#### Smaller Heading (H4)
```

### Lists

```markdown
Bulleted:
- Item one
- Item two
  - Nested item

Numbered:
1. First item
2. Second item
3. Third item
```

### Links

```markdown
[Link text](https://example.com)
[Link with title](https://example.com "Hover text")
```

### Images

```markdown
![Alt text](/path/to/image.jpg)
![Alt text](https://example.com/image.jpg)
```

### Quotes

```markdown
> This is a blockquote
> It can span multiple lines
```

### Code

Inline code: `use backticks`

Code block:
````markdown
```javascript
const example = "code block";
```
````

### Horizontal Rule

```markdown
---
```

### Tables

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

---

## Working from Your Phone

The GitHub web interface works great on mobile!

### iOS Safari / Android Chrome:

1. Visit github.com on your phone
2. Navigate to your repository
3. Tap the three dots (⋯) menu
4. Select "Desktop site" for better editing experience
5. Follow the same steps as desktop

### GitHub Mobile App:

1. Download "GitHub" app
2. Navigate to your file
3. Tap the edit icon
4. Make changes
5. Commit

**Note:** Desktop site view is recommended for longer posts

---

## Common Tasks

### Change Post Publication Date

1. Edit the post's `.md` file
2. Change the `date:` field:
   ```yaml
   date: 2026-03-01 09:00:00
   ```
3. Commit changes

### Unpublish a Post

**Option A:** Move to drafts (if you have a drafts folder)

**Option B:** Change date to future:
```yaml
date: 2099-12-31 00:00:00
```

**Option C:** Delete the file (careful! this is permanent)

### Fix a Typo

1. Find the file
2. Click edit (pencil icon)
3. Fix the typo
4. Commit: `Fix typo in customer experience post`

### Add Tags to Old Posts

1. Edit the post
2. Update the tags field:
   ```yaml
   tags: ["cx", "nps", "customer-retention", "surveys"]
   ```
3. Commit

---

## Tips for Success

### ✅ Do:

- **Preview before committing** - Use the Preview tab
- **Write clear commit messages** - Future you will thank you
- **Test links** - Make sure external links work
- **Use descriptive slugs** - Good: `customer-loyalty-tips`, Bad: `post1`
- **Proofread** - Check spelling and grammar
- **Add alt text to images** - Good for SEO and accessibility

### ❌ Don't:

- **Don't edit multiple files at once** - Do one post at a time
- **Don't use special characters in filenames** - Stick to letters, numbers, hyphens
- **Don't forget the frontmatter** - Posts need the YAML metadata
- **Don't use huge images** - Optimize first (compress to under 200KB)
- **Don't commit without a message** - Always explain what you changed

---

## Troubleshooting

### "Post not showing up on website"

1. Check Actions tab - did the build succeed?
2. Wait 5 minutes - sometimes it takes time
3. Check the `date:` field - is it in the future?
4. Clear your browser cache and refresh

### "Build failed in Actions"

1. Click on the failed workflow
2. Read the error message
3. Common issues:
   - Missing closing `---` in frontmatter
   - Invalid YAML syntax
   - Typo in metadata fields

### "Images not displaying"

1. Check the file path - is it correct?
2. Verify image exists in `/public/images/blog/`
3. Check for typos in filename
4. Use forward slashes: `/images/` not `\images\`

### "Markdown not rendering correctly"

1. Check for unclosed formatting (e.g., bold or italic)
2. Ensure headings have space after `##`
3. Make sure lists have blank line before them
4. Verify code blocks use three backticks

---

## Example: Complete Blog Post

Here's a real example you can copy and modify:

```markdown
---
title: "5 Essential Customer Experience Metrics Every Business Should Track"
date: 2026-02-16 09:00:00
slug: essential-cx-metrics-to-track
excerpt: "Discover the five most important customer experience metrics that will help you understand and improve customer satisfaction."
author: "Jaime Valle"
categories: ["Blog", "CX Metrics"]
tags: ["customer-experience", "metrics", "nps", "csat", "ces"]
---

Customer experience isn't just a buzzword—it's a critical business driver. But how do you know if your CX efforts are actually working?

The answer lies in tracking the right metrics. Here are the five essential CX metrics every business should monitor.

## 1. Net Promoter Score (NPS)

NPS measures customer loyalty by asking one simple question: "How likely are you to recommend us to a friend?"

**Why it matters:**
- Predicts business growth
- Easy to track over time
- Industry standard for benchmarking

## 2. Customer Satisfaction Score (CSAT)

CSAT measures how satisfied customers are with a specific interaction or product.

**When to use it:**
- After customer support interactions
- Post-purchase surveys
- Feature feedback

## 3. Customer Effort Score (CES)

CES measures how easy it is for customers to complete a task or resolve an issue.

**Key insight:** Reducing customer effort builds loyalty more effectively than exceeding expectations.

## 4. Customer Retention Rate

This metric shows what percentage of customers continue doing business with you over time.

**Formula:**
```
Retention Rate = ((CE - CN) / CS) × 100
```

Where:
- CE = Customers at end of period
- CN = New customers acquired
- CS = Customers at start of period

## 5. Customer Lifetime Value (CLV)

CLV predicts the total revenue a customer will generate during their relationship with your business.

**Why it's crucial:**
- Guides marketing spend decisions
- Identifies most valuable customer segments
- Justifies retention investments

## Conclusion

Tracking these five metrics gives you a comprehensive view of your customer experience performance. Start with one or two, then expand as you build your CX measurement practice.

Remember: metrics are only valuable if they drive action. Use these insights to continuously improve your customer experience.

---

**Want to learn more?** Check out our [CX Measurement Guide](/blog/cx-measurement-guide) for detailed implementation strategies.
```

---

## Next Steps

1. ✅ **Try it now:** Create a test post to see how it works
2. ✅ **Edit something:** Make a small change to an existing post
3. ✅ **Bookmark this guide:** You'll want to reference it
4. ✅ **Explore markdown:** Try different formatting options

---

## Resources

- **Markdown Guide:** https://www.markdownguide.org/basic-syntax/
- **GitHub Docs:** https://docs.github.com/en/repositories/working-with-files
- **Markdown Cheatsheet:** https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
- **YAML Validator:** https://www.yamllint.com/

---

## Summary

**You can publish content right now using just your web browser!**

No Cursor needed. No software installation. Just:
1. Go to GitHub.com
2. Navigate to `content/blog/`
3. Click "Add file" → "Create new file"
4. Write your post
5. Commit
6. Wait 2-5 minutes
7. Done! 🚀

It's that simple. You're not locked into any tool - you have complete freedom! 🎉
