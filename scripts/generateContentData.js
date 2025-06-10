import fs from 'fs';
console.log("Attempting to refactor generateContentData.js"); // Test line
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import readingTime from 'reading-time';
import { execSync } from 'child_process';

const BLOG_DIR = 'content/blog';
const JOURNEY_DIR = 'content/journey';
const PAGES_DIR = 'content/pages';
const OUTPUT_DIR = 'src/data';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// --- Helper Functions ---
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

/**
 * Processes markdown files from a directory.
 * @param {string} directoryPath - Path to the content directory.
 * @param {function} itemProcessor - Callback to process each item.
 * @param {object} options - Additional options.
 * @param {string} [options.directoryNameForLogging="Directory"] - Name for logging.
 * @param {string} [options.createExampleMarkerPath] - Path to a marker file to check if example was created.
 * @param {string} [options.exampleFileContent] - Content for an example markdown file.
 * @param {string} [options.exampleFileName] - Filename for the example markdown file.
 * @returns {Array} - Array of processed items.
 */
function processMarkdownDirectory(directoryPath, itemProcessor, options = {}) {
  const {
    directoryNameForLogging = "Directory", // Default value for logging name
    createExampleMarkerPath,
    exampleFileContent,
    exampleFileName
  } = options;

  if (!fs.existsSync(directoryPath)) {
    if (createExampleMarkerPath && exampleFileContent && exampleFileName && !fs.existsSync(createExampleMarkerPath)) {
      console.log(`${directoryNameForLogging} directory not found, creating with example...`);
      fs.mkdirSync(directoryPath, { recursive: true });
      fs.writeFileSync(path.join(directoryPath, exampleFileName), exampleFileContent);
      fs.writeFileSync(createExampleMarkerPath, ''); // Create marker file
      console.log(`Created example ${directoryNameForLogging.toLowerCase()} file (${exampleFileName}) and marker file (${createExampleMarkerPath}).`);
    } else if (createExampleMarkerPath && fs.existsSync(createExampleMarkerPath)) {
      // If marker exists, it means we've created the example before, and user might have deleted the dir.
      console.log(`${directoryNameForLogging} directory not found, but .example-created marker exists. Skipping example creation.`);
      return []; // Return empty as directory doesn't exist now
    } else {
      // For directories like 'pages' where no example creation is defined
      console.log(`${directoryNameForLogging} directory not found. Skipping ${directoryNameForLogging.toLowerCase()} generation.`);
      return [];
    }
  }

  const files = fs.readdirSync(directoryPath).filter(file => file.endsWith('.md'));
  const items = [];

  files.forEach((file, index) => {
    const filePath = path.join(directoryPath, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content } = matter(fileContent);
    // Pass necessary context or arguments to itemProcessor if it needs them
    const item = itemProcessor(file, filePath, frontmatter, content, index);
    if (item) {
        items.push(item);
    }
  });

  return items;
}

// --- Item Processors ---

// Added 'categoriesMap' as an argument to be passed by processBlogPosts
function blogItemProcessor(file, filePath, frontmatter, content, index, categoriesMap) {
  const slug = generateSlug(file);
  const gitDate = getGitCommitDate(filePath);
  const stats = readingTime(content);
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

  const categoryId = post.category;
  if (!categoriesMap.has(categoryId)) {
    categoriesMap.set(categoryId, {
      id: categoryId,
      name: categoryId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      description: `Posts about ${categoryId.replace('-', ' ')}`,
      image: `https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=600`,
      postCount: 0
    });
  }
  categoriesMap.get(categoryId).postCount++;
  return post;
}

function journeyItemProcessor(file, filePath, frontmatter, content, index) {
  const gitDate = getGitCommitDate(filePath);
  return {
    id: (index + 1).toString(),
    date: frontmatter.date || gitDate,
    type: frontmatter.type || 'text',
    title: frontmatter.title || 'Update',
    content: content.trim(), // Journey content is plain text
    image: frontmatter.image || undefined
  };
}

function pageItemProcessor(file, filePath, frontmatter, content /* index is available but not used */) {
  const id = file.replace(/\.md$/, '');
  const htmlContent = marked(content);
  return {
    id,
    title: frontmatter.title || 'Untitled Page',
    description: frontmatter.description || '',
    content: htmlContent,
  };
}

// --- Main Processing Functions ---
function processBlogPosts() {
  const categories = new Map(); // Define categories map here
  const examplePostContent = `---
title: "Welcome to My Research Blog"
category: "general"
tags: ["welcome", "research", "introduction"]
excerpt: "Welcome to my research blog where I share insights, discoveries, and thoughts on computational science and interdisciplinary research."
---

# Welcome to My Research Blog
This is my first blog post! I'm excited to share my research journey with you.
`;

  // Pass categories to the item processor by wrapping blogItemProcessor
  const posts = processMarkdownDirectory(
    BLOG_DIR,
    (file, filePath, frontmatter, content, index) => blogItemProcessor(file, filePath, frontmatter, content, index, categories),
    {
      directoryNameForLogging: "Blog",
      createExampleMarkerPath: path.join(BLOG_DIR, '.example-created'),
      exampleFileContent: examplePostContent,
      exampleFileName: 'welcome-to-my-blog.md'
    }
  );

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  return { posts, categories: Array.from(categories.values()) };
}

function processJourneyPosts() {
  const exampleJourneyContent = `---
title: "Started My Research Website"
type: "text"
---
Excited to launch my new research website! This platform will help me share my work, connect with fellow researchers, and document my academic journey.
Looking forward to sharing insights from my research in computational science and machine learning.
`;

  const posts = processMarkdownDirectory(
    JOURNEY_DIR,
    journeyItemProcessor, // Directly pass the processor
    {
      directoryNameForLogging: "Journey",
      createExampleMarkerPath: path.join(JOURNEY_DIR, '.example-created'),
      exampleFileContent: exampleJourneyContent,
      exampleFileName: 'website-launch.md'
    }
  );

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  return posts;
}

function processPages() {
  const posts = processMarkdownDirectory(
    PAGES_DIR,
    pageItemProcessor, // Directly pass the processor
    { directoryNameForLogging: "Pages" } // No example creation for pages
  );
  // Pages don't typically need sorting by date, but if they did, it would be here.
  return posts;
}

// --- Generate and Write Data Files ---
console.log('Generating content data from markdown files...');

const { posts: blogPosts, categories: blogCategories } = processBlogPosts();
const journeyPosts = processJourneyPosts();
const pagesData = processPages();

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

// Write pageData.ts
const pageDataContent = `// This file is auto-generated from markdown files in content/pages/
// Do not edit this file directly - edit the markdown files instead

export interface Page {
  id: string;
  title: string;
  description?: string; // Make description optional
  content: string;
}

export const pages: Page[] = ${JSON.stringify(pagesData, null, 2)};
`;

fs.writeFileSync(path.join(OUTPUT_DIR, 'pageData.ts'), pageDataContent);

console.log(`✅ Generated ${blogPosts.length} blog posts, ${journeyPosts.length} journey posts, and ${pagesData.length} pages.`);
console.log(`✅ Found ${blogCategories.length} blog categories`);