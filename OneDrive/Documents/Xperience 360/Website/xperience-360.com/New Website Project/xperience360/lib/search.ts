import { getAllPosts } from './posts'
import type { Post } from './posts'

export function searchPosts(query: string): Post[] {
  if (!query.trim()) {
    return []
  }

  const allPosts = getAllPosts()
  const searchTerm = query.toLowerCase().trim()

  return allPosts.filter((post) => {
    const searchableText = `
      ${post.title}
      ${post.excerpt}
      ${post.content}
      ${post.categories.join(' ')}
      ${post.tags.join(' ')}
    `.toLowerCase()

    return searchableText.includes(searchTerm)
  })
}






