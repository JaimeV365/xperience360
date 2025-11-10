import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { visit } from 'unist-util-visit'
import { toString } from 'mdast-util-to-string'

const postsDirectory = path.join(process.cwd(), 'content', 'blog')

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  author: string
  categories: string[]
  tags: string[]
  image?: string
  readingTime?: number
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName)
      // Try to read with UTF-8, fallback to latin1 if needed
      let fileContents: string
      try {
        fileContents = fs.readFileSync(fullPath, 'utf8')
      } catch {
        // Fallback to latin1 encoding
        fileContents = fs.readFileSync(fullPath, 'latin1')
      }
      
      // Fix encoding issues - common Windows-1252 to UTF-8 conversion errors
      fileContents = fileContents
        .replace(/â€™/g, "'")
        .replace(/â€œ/g, '"')
        .replace(/â€/g, '"')
        .replace(/â€"/g, '—')
        .replace(/â€"/g, '–')
        .replace(/â€‹/g, '')
        .replace(/Ã¡/g, 'á')
        .replace(/Ã©/g, 'é')
        .replace(/Ã­/g, 'í')
        .replace(/Ã³/g, 'ó')
        .replace(/Ãº/g, 'ú')
        .replace(/Ã±/g, 'ñ')
        .replace(/Ã¡/g, 'Á')
        .replace(/Ã‰/g, 'É')
        .replace(/Ã/g, 'Í')
        .replace(/Ã"/g, 'Ó')
        .replace(/Ãš/g, 'Ú')
        .replace(/Ã'/g, 'Ñ')
        .replace(/Â£/g, '£')
        .replace(/Â°/g, '°')
        .replace(/Â©/g, '©')
        .replace(/Â®/g, '®')
        // Fix multiplication sign (×) - appears as Í— or Ã—
        .replace(/Í—/g, '×')
        .replace(/Ã—/g, '×')
        .replace(/\u00CD\u2014/g, '×')
        .replace(/\u00C3\u2014/g, '×')
        // Fix double asterisks before colon (should be single colon)
        .replace(/\*\*:/g, ':')
        // Fix corrupted emojis - comprehensive patterns
        // Fix cross mark (❌) - appears as âŒ
        .replace(/âŒ/g, '❌')
        // Fix thumbs down (👎) - appears as ðŸ'Ž or 'Ž
        .replace(/ðŸ'Ž/g, '👎')
        .replace(/'Ž/g, '👎')
        // Fix check mark (✅) - appears as âœ…
        .replace(/âœ…/g, '✅')
        // Clean up remaining corrupted emoji fragments
        .replace(/Ÿ'/g, '')
        .replace(/ŸŽ/g, '')
        .replace(/ðŸ/g, '')
        // Additional emoji patterns using Unicode escapes
        .replace(/\u00E2\u009D\u008C/g, '❌')
        .replace(/\u00F0\u009F\u0091\u008E/g, '👎')
        .replace(/\u00E2\u009C\u0085/g, '✅')
      const { data, content } = matter(fileContents)
      
      // Use slug from frontmatter if available, otherwise use filename
      const slug = data.slug || fileName.replace(/\.md$/, '')
      
      // Also fix encoding in content
      const fixedContent = content
        .replace(/â€™/g, "'")
        .replace(/â€œ/g, '"')
        .replace(/â€/g, '"')
        .replace(/â€"/g, '—')
        .replace(/â€"/g, '–')
        .replace(/â€‹/g, '')
        .replace(/Â£/g, '£')
        // Fix multiplication sign (×) - appears as Í— or Ã—
        .replace(/Í—/g, '×')
        .replace(/Ã—/g, '×')
        .replace(/\u00CD\u2014/g, '×')
        .replace(/\u00C3\u2014/g, '×')
        // Fix double asterisks before colon (should be single colon)
        .replace(/\*\*:/g, ':')
        // Fix corrupted emojis - comprehensive patterns
        // Fix cross mark (❌) - appears as âŒ
        .replace(/âŒ/g, '❌')
        // Fix thumbs down (👎) - appears as ðŸ'Ž
        .replace(/ðŸ'Ž/g, '👎')
        // Fix check mark (✅) - appears as âœ…
        .replace(/âœ…/g, '✅')
        // Clean up remaining corrupted emoji fragments
        .replace(/Ÿ'/g, '')
        .replace(/ŸŽ/g, '')
        .replace(/ðŸ/g, '')
        // Additional emoji patterns using Unicode escapes
        .replace(/\u00E2\u009D\u008C/g, '❌')
        .replace(/\u00F0\u009F\u0091\u008E/g, '👎')
        .replace(/\u00E2\u009C\u0085/g, '✅')

      // Add NPS* to title if NPS is mentioned
      let title = data.title || ''
      if (title && /\bNPS\b(?![\*®])/i.test(title)) {
        title = title.replace(/\bNPS\b(?![\*®])/gi, 'NPS*')
      }
      
      return {
        slug,
        title: title,
        date: data.date || '',
        excerpt: data.excerpt || '',
        content: fixedContent,
        author: data.author === 'xperience-360.com' ? 'Jaime Valle' : (data.author || 'Jaime Valle'),
        categories: data.categories || [],
        tags: data.tags || [],
        image: data.image || '',
        readingTime: calculateReadingTime(content),
      }
    })

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    if (!fs.existsSync(fullPath)) {
      return null
    }

    // Try to read with UTF-8, fallback to latin1 if needed
    let fileContents: string
    try {
      fileContents = fs.readFileSync(fullPath, 'utf8')
    } catch {
      // Fallback to latin1 encoding
      fileContents = fs.readFileSync(fullPath, 'latin1')
    }
    
    // Fix encoding issues - common Windows-1252 to UTF-8 conversion errors
    fileContents = fileContents
      .replace(/â€™/g, "'")
      .replace(/â€œ/g, '"')
      .replace(/â€/g, '"')
      .replace(/â€"/g, '—')
      .replace(/â€"/g, '–')
      .replace(/â€‹/g, '')
      .replace(/Ã¡/g, 'á')
      .replace(/Ã©/g, 'é')
      .replace(/Ã­/g, 'í')
      .replace(/Ã³/g, 'ó')
      .replace(/Ãº/g, 'ú')
      .replace(/Ã±/g, 'ñ')
      .replace(/Ã¡/g, 'Á')
      .replace(/Ã‰/g, 'É')
      .replace(/Ã/g, 'Í')
      .replace(/Ã"/g, 'Ó')
      .replace(/Ãš/g, 'Ú')
      .replace(/Ã'/g, 'Ñ')
      .replace(/Â£/g, '£')
      .replace(/Â°/g, '°')
      .replace(/Â©/g, '©')
      .replace(/Â®/g, '®')
      // Fix corrupted emojis - comprehensive patterns
      // Fix cross mark (❌) - appears as âŒ
      .replace(/âŒ/g, '❌')
      // Fix thumbs down (👎) - appears as ðŸ'Ž
      .replace(/ðŸ'Ž/g, '👎')
      // Fix check mark (✅) - appears as âœ…
      .replace(/âœ…/g, '✅')
      // Clean up remaining corrupted emoji fragments
      .replace(/Ÿ'/g, '')
      .replace(/ŸŽ/g, '')
      .replace(/ðŸ/g, '')
      // Additional emoji patterns using Unicode escapes
      .replace(/\u00E2\u009D\u008C/g, '❌')
      .replace(/\u00F0\u009F\u0091\u008E/g, '👎')
      .replace(/\u00E2\u009C\u0085/g, '✅')
    const { data, content } = matter(fileContents)
    
    // Also fix encoding in content
    const fixedContent = content
      .replace(/â€™/g, "'")
      .replace(/â€œ/g, '"')
      .replace(/â€/g, '"')
      .replace(/â€"/g, '—')
      .replace(/â€"/g, '–')
      .replace(/â€‹/g, '')
      .replace(/Â£/g, '£')
      // Fix corrupted emojis - comprehensive patterns
      // Fix cross mark (❌) - appears as âŒ
      .replace(/âŒ/g, '❌')
      // Fix thumbs down (👎) - appears as ðŸ'Ž
      .replace(/ðŸ'Ž/g, '👎')
      // Fix check mark (✅) - appears as âœ…
      .replace(/âœ…/g, '✅')
      // Clean up remaining corrupted emoji fragments
      .replace(/Ÿ'/g, '')
      .replace(/ŸŽ/g, '')
      .replace(/ðŸ/g, '')
      // Additional emoji patterns using Unicode escapes
      .replace(/\u00E2\u009D\u008C/g, '❌')
      .replace(/\u00F0\u009F\u0091\u008E/g, '👎')
      .replace(/\u00E2\u009C\u0085/g, '✅')

    // Add NPS* to title if NPS is mentioned
    let title = data.title || ''
    if (title && /\bNPS\b(?![\*®])/i.test(title)) {
      title = title.replace(/\bNPS\b(?![\*®])/gi, 'NPS*')
    }
    
    return {
      slug,
      title: title,
      date: data.date || '',
      excerpt: data.excerpt || '',
      content: fixedContent,
      author: data.author === 'xperience-360.com' ? 'Jaime Valle' : (data.author || 'Jaime Valle'),
      categories: data.categories || [],
      tags: data.tags || [],
      image: data.image || '',
      readingTime: calculateReadingTime(content),
    }
  } catch (error) {
    return null
  }
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): Post[] {
  const currentPost = getPostBySlug(currentSlug)
  if (!currentPost) return []

  const allPosts = getAllPosts().filter((post) => post.slug !== currentSlug)

  // Find posts with matching categories or tags
  const relatedPosts = allPosts
    .map((post) => {
      let score = 0
      // Category matches
      post.categories.forEach((cat) => {
        if (currentPost.categories.includes(cat)) score += 2
      })
      // Tag matches
      post.tags.forEach((tag) => {
        if (currentPost.tags.includes(tag)) score += 1
      })
      return { post, score }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post)

  // If not enough related posts, fill with recent posts
  if (relatedPosts.length < limit) {
    const recentPosts = allPosts
      .filter((post) => !relatedPosts.find((rp) => rp.slug === post.slug))
      .slice(0, limit - relatedPosts.length)
    relatedPosts.push(...recentPosts)
  }

  return relatedPosts
}

// Plugin to add IDs to headings
function remarkHeadingIds() {
  return (tree: any) => {
    visit(tree, 'heading', (node: any) => {
      const id = toString(node)
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim()
      node.data = node.data || {}
      node.data.hProperties = node.data.hProperties || {}
      node.data.hProperties.id = id
    })
  }
}

export async function getPostContent(content: string): Promise<string> {
  // Remove raw HTML/CSS code blocks that appear as text
  // Very aggressive CSS removal
  let cleanedContent = content
    // Remove <style> tags
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, '')
    // Remove CSS rules - handle multi-line and single-line (including indented)
    .replace(/[.#][\w-]+\s*\{[^}]*\}/g, '') // Single-line CSS rules like .class { prop: value; }
    .replace(/[.#][\w-]+\s*\{\s*\}/g, '') // Empty CSS rules like .class { }
    .replace(/[\w-]+\s*\{[^}]*\}/g, '') // Element selectors like table { }
    .replace(/[\w-]+\s*\{\s*\}/g, '') // Empty element selectors
    // Remove multi-line CSS blocks (including indented ones)
    .replace(/[.#][\w-]+\s*\{[\s\S]*?\}/g, '') // Multi-line .class { ... }
    .replace(/[\w-]+\s*\{[\s\S]*?\}/g, '') // Multi-line selector { ... }
    // Remove indented CSS blocks (4+ spaces)
    .replace(/\n\s{4,}[.#][\w-]+\s*\{[\s\S]*?\n\s{4,}\}/g, '') // Indented .class { ... }
    .replace(/\n\s{4,}[\w-]+\s*\{[\s\S]*?\n\s{4,}\}/g, '') // Indented selector { ... }
    // Remove CSS properties on their own lines
    .replace(/^\s*[\w-]+:\s*[^;]+;\s*$/gm, '') // Lines like "margin-bottom: 8px;"
    .replace(/^\s*[\w-]+:\s*[^;]+;\s*$/gm, '') // Again for safety
    // Remove author name that appears after the author image
    .replace(/!\[Jaime Valle[^\]]*\]\([^)]*TERESA-MONROE[^)]*\)\s*Jaime Valle/gi, '')
    .replace(/Jaime Valle\s*$/, '') // Remove standalone "Jaime Valle" at end of content
    .split('\n')
    .filter((line, index, lines) => {
      const trimmed = line.trim()
      
      // Remove lines that are CSS selectors (even if empty) - including indented ones
      const isIndented = line.match(/^\s{4,}/) // 4+ spaces of indentation
      if (trimmed.match(/^[.#][\w-]+\s*\{?\s*\}?$/) || // .class { } or .class {
          trimmed.match(/^[\w-]+\s*\{?\s*\}?$/) || // selector { } or selector {
          trimmed.match(/^[.#][\w-]+\s*\{/) || // .class { (opening)
          trimmed.match(/^[\w-]+\s*\{/) || // selector { (opening)
          trimmed.match(/^\s*\{?\s*\}\s*$/) || // Just { } or }
          (isIndented && trimmed.match(/^[.#]?[\w-]+\s*\{/)) || // Indented CSS selector
          (trimmed.includes('{') && trimmed.includes('}') && (trimmed.includes(':') || trimmed.length < 10)) || // CSS rule or empty block
          (trimmed.match(/^\s*[\w-]+:\s*[\w\s#(),%-]+;?\s*$/) && !trimmed.includes('http') && !trimmed.includes('://'))) { // CSS property
        // Check if surrounding lines are also CSS
        const contextStart = Math.max(0, index - 2)
        const contextEnd = Math.min(lines.length, index + 3)
        const context = lines.slice(contextStart, contextEnd)
        const cssCount = context.filter(l => {
          const t = l.trim()
          return t && (
            t.match(/^[.#][\w-]+\s*\{/) ||
            t.match(/^[\w-]+\s*\{/) ||
            t.match(/^\s*\{?\s*\}\s*$/) ||
            (t.includes('{') && t.includes('}') && (t.includes(':') || t.length < 10)) ||
            t.match(/^\s*[\w-]+:\s*[\w\s#(),%-]+;?\s*$/)
          )
        }).length
        // If 1+ CSS-like lines, filter them out (more aggressive)
        if (cssCount >= 1) {
          return false
        }
      }
      
      // Remove lines that are just "Jaime Valle" (author name at end)
      if (trimmed === 'Jaime Valle' && index === lines.length - 1) {
        return false
      }
      
      return true
    })
    .join('\n')
    // Final cleanup - remove any remaining CSS patterns (run multiple times until no changes)
    let lastContent = ''
    let iterations = 0
    while (cleanedContent !== lastContent && iterations < 10) {
      lastContent = cleanedContent
      iterations++
      cleanedContent = cleanedContent
        // Remove CSS selectors and their blocks (including multi-line)
        .replace(/[.#][\w-]+\s*\{[\s\S]{0,500}?\}/g, '') // .class { ... } up to 500 chars
        .replace(/[\w-]+\s*\{[\s\S]{0,500}?\}/g, '') // selector { ... } up to 500 chars
        .replace(/[.#][\w-]+\s*\{[^}]*\}/g, '') // Single-line .class { }
        .replace(/[\w-]+\s*\{[^}]*\}/g, '') // Single-line selector { }
        // Remove CSS properties
        .replace(/^\s*[\w-]+:\s*[^;]+;\s*$/gm, '') // CSS properties like "margin-bottom: 8px;"
        // Remove lines that are just CSS selectors
        .replace(/^\s*[.#][\w-]+\s*\{?\s*\}?\s*$/gm, '') // Lines like ".note-box { }"
        .replace(/^\s*[\w-]+\s*\{?\s*\}?\s*$/gm, '') // Lines like "table { }"
        // Remove standalone braces
        .replace(/^\s*\{?\s*\}\s*$/gm, '') // Lines that are just "{ }" or "}"
        .replace(/\n\s*\{?\s*\}\s*\n/g, '\n') // Standalone { } blocks between lines
    }
    cleanedContent = cleanedContent.replace(/\n\s*\n\s*\n+/g, '\n\n') // Clean up excessive blank lines
  
  // Fix corrupted emojis first
  cleanedContent = cleanedContent
    .replace(/âŒ/g, '❌')
    .replace(/'Ž/g, '👎')
    .replace(/ðŸ'Ž/g, '👎')
  
  // Convert consecutive emoji-prefixed lines into markdown lists for nice formatting
  // This will create proper HTML lists that look clean
  cleanedContent = cleanedContent.replace(
    /((?:^[❌✅🚫⚠️💡📌⭐🔴🟢🟡🔵⚫⚪🟠🟣🔶🔷🔸🔹▪️▫️•]\s*[^\n]+\n?)+)/gm,
    (match) => {
      const lines = match.trim().split('\n').filter(line => line.trim())
      if (lines.length > 0) {
        // Convert each emoji line to a markdown list item
        const listItems = lines.map(line => {
          const trimmed = line.trim()
          // Keep the emoji and text as-is, markdown will process formatting
          return `- ${trimmed}`
        }).join('\n')
        return `\n${listItems}\n`
      }
      return match
    }
  )
  
  // Handle case where text appears before emojis on the same line
  // Example: "text.❌ *text*❌ *text*" - split into separate lines
  cleanedContent = cleanedContent.split('\n').map(line => {
    const emojiMatches = line.match(/[❌✅🚫⚠️💡📌⭐🔴🟢🟡🔵⚫⚪🟠🟣🔶🔷🔸🔹▪️▫️•]/g)
    if (emojiMatches && emojiMatches.length > 1) {
      // Split by emoji
      const parts = []
      let textBefore = line.split(/[❌✅🚫⚠️💡📌⭐🔴🟢🟡🔵⚫⚪🟠🟣🔶🔷🔸🔹▪️▫️•]/)[0]
      const emojiRegex = /([❌✅🚫⚠️💡📌⭐🔴🟢🟡🔵⚫⚪🟠🟣🔶🔷🔸🔹▪️▫️•][^❌✅🚫⚠️💡📌⭐🔴🟢🟡🔵⚫⚪🟠🟣🔶🔷🔸🔹▪️▫️•]*)/g
      const emojiBlocks = line.match(emojiRegex) || []
      
      if (textBefore.trim()) {
        // Keep text before as separate paragraph, then add emoji blocks as list
        return textBefore.trim() + '\n' + emojiBlocks.map(b => `- ${b.trim()}`).join('\n')
      } else {
        return emojiBlocks.map(b => `- ${b.trim()}`).join('\n')
      }
    }
    return line
  }).join('\n')
  
  // Convert "Note on Methodology" sections to markdown blockquotes for styling
  // First, remove standalone "Methodology Note" lines that appear before "Note on Methodology"
  cleanedContent = cleanedContent.replace(/\n\s*Methodology Note\s*\n\s*\n/g, '\n')
  
  // Pattern: "Note on Methodology" followed by content (may be indented)
  // Handle various formats: "Note on Methodology", "Methodology Note", "Churn Methodology", etc.
  // Match pattern: title line, then ALL content lines until TWO consecutive blank lines (or end of content)
  // This captures everything including bullet points that come after blank lines
  cleanedContent = cleanedContent.replace(
    /(?:^|\n)\s*(?:Note on Methodology|Methodology Note|Churn Methodology|Methodology - [^\n]+)\s*\n\s*((?:[^\n]+(?:\n(?!\n\s*\n\s*\n)[^\n]+)*?)(?=\n\s*\n\s*\n|\n\s*[A-Z][^\n]*[A-Z]|\n\s*!\[|$))/gs,
    (match, content) => {
      // Clean up the content - remove excessive indentation but keep structure
      // Split by lines and process each
      const contentLines = content.split('\n')
      const cleaned = contentLines
        .map((line: string) => line.trim())
        .filter((line: string) => line && !line.match(/^[-•]\s*$/)) // Remove empty bullet points
        .join('\n')
      
      if (!cleaned.trim()) return match // If no content, return original
      
      // Ensure proper structure: intro paragraph, then bullet points
      // Split content into intro text and bullet points
      const cleanedLines = cleaned.split('\n')
      const introLines: string[] = []
      const bulletLines: string[] = []
      let foundBullets = false
      
      for (const line of cleanedLines) {
        const trimmed = line.trim()
        if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
          foundBullets = true
          bulletLines.push(trimmed)
        } else if (!foundBullets && trimmed) {
          introLines.push(trimmed)
        } else if (foundBullets && trimmed) {
          bulletLines.push(trimmed)
        }
      }
      
      // Build formatted content: intro paragraph(s) followed by bullet list
      let formatted = ''
      if (introLines.length > 0) {
        formatted = introLines.join('\n')
      }
      if (bulletLines.length > 0) {
        if (formatted) {
          formatted += '\n\n' + bulletLines.map(line => line.replace(/^[-•]\s*/, '- ')).join('\n')
        } else {
          formatted = bulletLines.map(line => line.replace(/^[-•]\s*/, '- ')).join('\n')
        }
      }
      
      // Convert to a blockquote-style note with proper spacing
      return `\n\n> **Note on Methodology**\n>\n> ${formatted.replace(/\n/g, '\n> ')}\n\n`
    }
  )
  
  // Process markdown to HTML
  // Note: remark-html preserves raw HTML by default, so our table HTML will be kept
  let processedContent = await remark()
    .use(remarkHeadingIds)
    .use(html, { sanitize: false }) // Allow HTML (like our table)
    .process(cleanedContent)
  
  let htmlContent = processedContent.toString()
  
  // Convert blockquotes that start with "Note on Methodology" to styled note boxes
  // Handle multiple paragraphs in blockquote
  htmlContent = htmlContent.replace(
    /<blockquote>\s*<p><strong>Note on Methodology<\/strong><\/p>\s*([\s\S]*?)<\/blockquote>/g,
    (match, content) => {
      // Clean up the content - preserve list structure and paragraphs
      let cleaned = content
        .replace(/<\/p>\s*<p>/g, '<br>')
        .replace(/^<p>|<\/p>$/g, '')
        .trim()
      
      // Convert markdown-style bullet points to proper HTML list items
      // Pattern: <br>- or <br>• followed by text
      cleaned = cleaned.replace(/<br>\s*[-•]\s*([^<]+)/g, '<li>$1</li>')
      
      // If we have list items, wrap them in a <ul>
      if (cleaned.includes('<li>')) {
        // Split content into intro paragraph and list
        const parts = cleaned.split(/<li>/)
        const intro = parts[0].replace(/<br>\s*$/, '').trim()
        const listItems = parts.slice(1).map(item => {
          const text = item.replace(/<\/li>.*$/, '').trim()
          return `<li>${text}</li>`
        }).join('')
        
        if (intro) {
          cleaned = `<p>${intro}</p><ul class="list-disc list-inside space-y-2 mt-3">${listItems}</ul>`
        } else {
          cleaned = `<ul class="list-disc list-inside space-y-2">${listItems}</ul>`
        }
      } else {
        // No list items, just format as paragraph(s)
        cleaned = cleaned.replace(/<br>/g, '</p><p>')
        if (!cleaned.startsWith('<p>')) {
          cleaned = '<p>' + cleaned
        }
        if (!cleaned.endsWith('</p>')) {
          cleaned = cleaned + '</p>'
        }
      }
      
      return `<div class="methodology-note my-8 p-6 border-l-4 border-primary bg-primary/5 dark:bg-primary/10 rounded-r-lg">
        <h4 class="text-lg font-bold text-primary mb-3 uppercase tracking-wide">Note on Methodology</h4>
        <div class="text-gray-700 dark:text-gray-300 space-y-2 prose prose-sm max-w-none">${cleaned}</div>
      </div>`
    }
  )
  
  // Add space before images
  htmlContent = htmlContent.replace(
    /<\/p>\s*<p><img/g,
    '</p><div class="h-8"></div><p><img'
  )
  
  // Wrap images with captions - if image is followed by italic text, make it a figure caption
  htmlContent = htmlContent.replace(
    /<p><img([^>]*?)><\/p>\s*<p><em>([^<]+)<\/em><\/p>/g,
    '<figure class="my-8"><img$1><figcaption class="text-sm text-gray-600 dark:text-gray-400 italic text-left mt-2 mb-6">$2</figcaption></figure>'
  )
  
  // Add explicit spacing after "To my surprise" sentence
  htmlContent = htmlContent.replace(
    /To my surprise, I wasn't allowed to submit it like that\.<\/p>/g,
    'To my surprise, I wasn\'t allowed to submit it like that.</p><div class="h-6"></div>'
  )
  
  // Add spacing classes to paragraphs - let CSS handle it
  // All paragraphs get consistent spacing
  htmlContent = htmlContent.replace(/<p>/g, '<p class="mb-6">')
  
  // Consecutive emoji paragraphs get closer spacing
  htmlContent = htmlContent.replace(
    /<p class="mb-6">([❌✅💡📌⭐🔴🟢🟡🔵⚫⚪🟠🟣🔶🔷🔸🔹▪️▫️•][^<]*?)<\/p>\s*<p class="mb-6">([❌✅💡📌⭐🔴🟢🟡🔵⚫⚪🟠🟣🔶🔷🔸🔹▪️▫️•][^<]*?)<\/p>/g,
    '<p class="mb-2">$1</p><p class="mb-2">$2</p>'
  )
  
  // Handle 3+ consecutive emoji paragraphs
  htmlContent = htmlContent.replace(
    /<p class="mb-2">([❌✅💡📌⭐🔴🟢🟡🔵⚫⚪🟠🟣🔶🔷🔸🔹▪️▫️•][^<]*?)<\/p><p class="mb-2">([❌✅💡📌⭐🔴🟢🟡🔵⚫⚪🟠🟣🔶🔷🔸🔹▪️▫️•][^<]*?)<\/p>\s*<p class="mb-6">([❌✅💡📌⭐🔴🟢🟡🔵⚫⚪🟠🟣🔶🔷🔸🔹▪️▫️•][^<]*?)<\/p>/g,
    '<p class="mb-2">$1</p><p class="mb-2">$2</p><p class="mb-2">$3</p>'
  )
  
  // Add extra spacing before emoji paragraphs that follow regular text
  htmlContent = htmlContent.replace(
    /<\/p>\s*<p class="mb-2">([❌✅💡📌⭐🔴🟢🟡🔵⚫⚪🟠🟣🔶🔷🔸🔹▪️▫️•][^<]*?)<\/p>/g,
    '</p><p class="mt-6 mb-2">$1</p>'
  )
  
  // Add extra spacing before standalone emoji paragraphs
  htmlContent = htmlContent.replace(
    /<\/p>\s*<p class="mb-6">([❌✅💡📌⭐🔴🟢🟡🔵⚫⚪🟠🟣🔶🔷🔸🔹▪️▫️•][^<]*?)<\/p>/g,
    '</p><p class="mt-6 mb-6">$1</p>'
  )
  
  // Add extra spacing after emoji paragraphs before regular text
  htmlContent = htmlContent.replace(
    /<\/p>\s*<p class="mb-6">([^❌✅💡📌⭐🔴🟢🟡🔵⚫⚪🟠🟣🔶🔷🔸🔹▪️▫️•<][^<]*?)<\/p>/g,
    '</p><p class="mt-6 mb-6">$1</p>'
  )
  
  // Add NPS trademark references - replace NPS with NPS* (but not if already has * or ®)
  // Be careful not to replace inside HTML tags
  let addedNpsAsterisk = false

  htmlContent = htmlContent.replace(/\bNPS\b(?![\*®-])/gi, (match, offset, string) => {
    // Check if we're inside an HTML tag
    const before = string.substring(Math.max(0, offset - 50), offset)
    const after = string.substring(offset, Math.min(string.length, offset + 50))
    // If there's a < before and > after, we're in a tag - don't replace
    if (before.includes('<') && !before.includes('>')) {
      return match
    }
    if (!addedNpsAsterisk) {
      addedNpsAsterisk = true
      return 'NPS*'
    }
    return match
  })
  
  // Check if NPS is mentioned in the content (after processing)
  const hasNPS = /NPS/i.test(htmlContent)
  
  // Add trademark disclaimer at the end if NPS is mentioned
  // But check if disclaimer already exists to avoid duplicates
  if (hasNPS && !htmlContent.includes('Net Promoter®')) {
    const disclaimer = '<p class="text-sm text-gray-600 dark:text-gray-400 mt-8 pt-6 border-t border-gray-300 dark:border-gray-700"><em>*Net Promoter®, Net Promoter System®, Net Promoter Score® and NPS® are registered trademarks of Bain & Company, Inc., Fred Reichheld and Satmetrix Systems, Inc.</em></p>'
    htmlContent = htmlContent + disclaimer
  }
  
  return htmlContent
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

