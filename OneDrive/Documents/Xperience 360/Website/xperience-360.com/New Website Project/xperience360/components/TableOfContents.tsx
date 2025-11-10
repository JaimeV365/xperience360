'use client'

import { useEffect, useState } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([])

  useEffect(() => {
    // Extract headings from HTML content
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, 'text/html')
    const headingElements = doc.querySelectorAll('h2, h3, h4')
    
    const extractedHeadings: Heading[] = Array.from(headingElements).map((el, index) => {
      const id = el.id || `heading-${index}`
      if (!el.id) {
        el.id = id
      }
      return {
        id,
        text: el.textContent || '',
        level: parseInt(el.tagName.charAt(1)),
      }
    })

    setHeadings(extractedHeadings)
  }, [content])

  if (headings.length === 0) {
    return null
  }

  return (
    <nav
      className="mb-8 p-6 bg-primary/5 dark:bg-primary/10 rounded-lg border-l-4 border-primary"
      aria-label="Table of contents"
    >
      <h2 className="text-lg font-bold mb-4 text-dark dark:text-white">Table of Contents</h2>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`${
              heading.level === 2
                ? 'font-semibold'
                : heading.level === 3
                ? 'ml-4 text-sm'
                : 'ml-8 text-sm'
            }`}
          >
            <a
              href={`#${heading.id}`}
              className="text-primary hover:text-primary-dark dark:hover:text-primary-light transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-primary focus:rounded"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}






