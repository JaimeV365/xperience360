import fs from 'fs'
import path from 'path'
import { getAllPosts } from './posts'

// This script generates a JSON file of all posts for client-side search
export function generatePostsJSON() {
  const posts = getAllPosts()
  const outputPath = path.join(process.cwd(), 'public', 'posts.json')
  
  // Only include searchable fields
  const searchablePosts = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    categories: post.categories,
    tags: post.tags,
  }))

  fs.writeFileSync(outputPath, JSON.stringify(searchablePosts, null, 2))
  console.log(`Generated posts.json with ${posts.length} posts`)
}

// Run if called directly
if (require.main === module) {
  generatePostsJSON()
}






