const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const getBlogSlugs = () => {
  try {
    const postsDirectory = path.join(__dirname, 'content', 'blog')
    const files = fs.readdirSync(postsDirectory)

    return files
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf-8')
        const { data } = matter(fileContents)
        return data?.slug || fileName.replace(/\.md$/, '')
      })
      .filter(Boolean)
  } catch (error) {
    console.warn('Unable to generate legacy blog redirects:', error)
    return []
  }
}

const legacyBlogSlugs = getBlogSlugs()

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  async redirects() {
    return legacyBlogSlugs.map((slug) => ({
      source: `/${slug}`,
      destination: `/blog/${slug}`,
      permanent: true,
    }))
  },
}

module.exports = nextConfig






