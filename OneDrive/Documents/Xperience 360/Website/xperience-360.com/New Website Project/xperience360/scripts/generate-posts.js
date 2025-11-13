// Simple script to generate posts.json for search
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDirectory = path.join(process.cwd(), 'content', 'blog');
const outputPath = path.join(process.cwd(), 'public', 'posts.json');

function applyTrademarkCompliance(text = '') {
  if (!text) return text;

  let updated = text;

  let npsApplied = false;
  updated = updated.replace(/\bNPS\b(?!®)/gi, (match) => {
    if (npsApplied) {
      return match;
    }
    npsApplied = true;
    return `${match}®`;
  });

  let netPromoterScoreApplied = false;
  updated = updated.replace(/Net Promoter Score(?!\s*(?:℠|SM))/gi, (match) => {
    if (netPromoterScoreApplied) {
      return match;
    }
    netPromoterScoreApplied = true;
    return `${match}℠`;
  });

  let netPromoterSystemApplied = false;
  updated = updated.replace(/Net Promoter System(?!\s*(?:℠|SM))/gi, (match) => {
    if (netPromoterSystemApplied) {
      return match;
    }
    netPromoterSystemApplied = true;
    return `${match}℠`;
  });

  let netPromoterApplied = false;
  updated = updated.replace(/Net Promoter(?!\s*(?:Score|System|Prism|[A-Za-z]))(?!®)/gi, (match) => {
    if (netPromoterApplied) {
      return match;
    }
    netPromoterApplied = true;
    return `${match}®`;
  });

  return updated;
}

if (!fs.existsSync(postsDirectory)) {
  console.log('Blog directory does not exist yet. Creating empty posts.json');
  fs.writeFileSync(outputPath, JSON.stringify([], null, 2));
  process.exit(0);
}

const fileNames = fs.readdirSync(postsDirectory);
const posts = fileNames
  .filter((fileName) => fileName.endsWith('.md'))
  .map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    
    // Use slug from frontmatter if available, otherwise use filename
    const slug = data.slug || fileName.replace(/\.md$/, '');

    return {
      slug,
      title: applyTrademarkCompliance(data.title || ''),
      excerpt: applyTrademarkCompliance(data.excerpt || ''),
      categories: data.categories || [],
      tags: (data.tags || []).map((tag) => applyTrademarkCompliance(tag)),
    };
  });

fs.writeFileSync(outputPath, JSON.stringify(posts, null, 2));
console.log(`✅ Generated posts.json with ${posts.length} posts`);





