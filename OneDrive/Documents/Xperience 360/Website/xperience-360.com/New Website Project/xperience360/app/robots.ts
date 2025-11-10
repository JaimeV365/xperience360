import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/test-logo-colors/'],
    },
    sitemap: 'https://xperience-360.com/sitemap.xml',
  }
}






