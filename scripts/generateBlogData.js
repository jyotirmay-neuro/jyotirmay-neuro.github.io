import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import readingTime from 'reading-time';
import { execSync } from 'child_process';

const BLOG_DIR = 'content/blog';
const JOURNEY_DIR = 'content/journey';
const OUTPUT_DIR = 'src/data';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Get git commit date for a file
function getGitCommitDate(filePath) {
  try {
    const gitDate = execSync(`git log -1 --format=%ci "${filePath}"`, { encoding: 'utf8' }).trim();
    return gitDate ? new Date(gitDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
  } catch (error) {
    // If git command fails (e.g., file not committed yet), use current date
    return new Date().toISOString().split('T')[0];
  }
}

// Generate slug from filename
function generateSlug(filename) {
  return filename.replace(/\.md$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

// Process blog posts
function processBlogPosts() {
  const blogPosts = [];
  const categories = new Map();

  if (!fs.existsSync(BLOG_DIR)) {
    console.log('Blog directory not found, creating with example...');
    fs.mkdirSync(BLOG_DIR, { recursive: true });
    
    // Create example blog post
    const examplePost = `---
title: "Welcome to My Research Blog"
category: "general"
tags: ["welcome", "research", "introduction"]
excerpt: "Welcome to my research blog where I share insights, discoveries, and thoughts on computational science and interdisciplinary research."
---

# Welcome to My Research Blog

This is my first blog post! I'm excited to share my research journey with you.

## What You'll Find Here

- Research insights and discoveries
- Computational science tutorials
- Thoughts on interdisciplinary collaboration
- Updates from my academic journey

## Getting Started

To add new blog posts, simply create markdown files in the \`content/blog/\` directory. Each post should have frontmatter with title, category, tags, and excerpt.

Happy reading!
`;
    
    fs.writeFileSync(path.join(BLOG_DIR, 'welcome-to-my-blog.md'), examplePost);
  }

  const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.md'));

  files.forEach((file, index) => {
    const filePath = path.join(BLOG_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content } = matter(fileContent);
    
    const slug = generateSlug(file);
    const gitDate = getGitCommitDate(filePath);
    const stats = readingTime(content);
    
    // Convert markdown to HTML
    const htmlContent = marked(content);
    
    const post = {
      id: (index + 1).toString(),
      slug,
      title: frontmatter.title || 'Untitled Post',
      excerpt: frontmatter.excerpt || content.substring(0, 200) + '...',
      content: htmlContent,
      category: frontmatter.category || 'general',
      tags: frontmatter.tags || [],
      date: frontmatter.date || gitDate,
      readTime: stats.text
    };
    
    blogPosts.push(post);
    
    // Track categories
    const categoryId = post.category;
    if (!categories.has(categoryId)) {
      categories.set(categoryId, {
        id: categoryId,
        name: categoryId.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' '),
        description: `Posts about ${categoryId.replace('-', ' ')}`,
        image: `https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=600`,
        postCount: 0
      });
    }
    categories.get(categoryId).postCount++;
  });

  // Sort posts by date (newest first)
  blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return {
    posts: blogPosts,
    categories: Array.from(categories.values())
  };
}

// Process journey posts
function processJourneyPosts() {
  const journeyPosts = [];

  if (!fs.existsSync(JOURNEY_DIR)) {
    console.log('Journey directory not found, creating with example...');
    fs.mkdirSync(JOURNEY_DIR, { recursive: true });
    
    // Create example journey post
    const exampleJourney = `---
title: "Started My Research Website"
type: "text"
---

Excited to launch my new research website! This platform will help me share my work, connect with fellow researchers, and document my academic journey.

Looking forward to sharing insights from my research in computational science and machine learning.
`;
    
    fs.writeFileSync(path.join(JOURNEY_DIR, 'website-launch.md'), exampleJourney);
  }

  const files = fs.readdirSync(JOURNEY_DIR).filter(file => file.endsWith('.md'));

  files.forEach((file, index) => {
    const filePath = path.join(JOURNEY_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content } = matter(fileContent);
    
    const gitDate = getGitCommitDate(filePath);
    
    const post = {
      id: (index + 1).toString(),
      date: frontmatter.date || gitDate,
      type: frontmatter.type || 'text',
      title: frontmatter.title || 'Update',
      content: content.trim(),
      image: frontmatter.image || undefined
    };
    
    journeyPosts.push(post);
  });

  // Sort posts by date (newest first)
  journeyPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return journeyPosts;
}

// Generate the data files
console.log('Generating blog data from markdown files...');

const { posts: blogPosts, categories: blogCategories } = processBlogPosts();
const journeyPosts = processJourneyPosts();

// Write blogData.ts
const blogDataContent = `// This file is auto-generated from markdown files in content/blog/
// Do not edit this file directly - edit the markdown files instead

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  date: string;
  readTime: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  postCount: number;
}

export const blogPosts: BlogPost[] = ${JSON.stringify(blogPosts, null, 2)};

export const blogCategories: BlogCategory[] = ${JSON.stringify(blogCategories, null, 2)};
`;

fs.writeFileSync(path.join(OUTPUT_DIR, 'blogData.ts'), blogDataContent);

// Write journeyData.ts
const journeyDataContent = `// This file is auto-generated from markdown files in content/journey/
// Do not edit this file directly - edit the markdown files instead

export interface JourneyPost {
  id: string;
  date: string;
  type: 'text' | 'image-text';
  title: string;
  content: string;
  image?: string;
}

export const journeyPosts: JourneyPost[] = ${JSON.stringify(journeyPosts, null, 2)};
`;

fs.writeFileSync(path.join(OUTPUT_DIR, 'journeyData.ts'), journeyDataContent);

console.log(`✅ Generated ${blogPosts.length} blog posts and ${journeyPosts.length} journey posts`);
console.log(`✅ Found ${blogCategories.length} blog categories`);