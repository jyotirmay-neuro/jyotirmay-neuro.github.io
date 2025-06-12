import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import readingTime from 'reading-time';
import { execSync } from 'child_process';

console.log("Attempting to refactor generateContentData.js"); // Test line

const BLOG_DIR = 'content/blog';
const JOURNEY_DIR = 'content/journey';
const PAGES_DIR = 'content/pages';
const OUTPUT_DIR = 'src/data';

// Ensure output directory exists
try {
  if (!fs.existsSync(OUTPUT_DIR)) {
    console.log(`[generateContentData] INFO: Output directory ${OUTPUT_DIR} not found, creating...`);
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`[generateContentData] INFO: Output directory ${OUTPUT_DIR} created successfully.`);
  }
} catch (error) {
  console.error(`[generateContentData] ERROR: Failed to create output directory ${OUTPUT_DIR}. Error: ${error.message}`);
  // If we can't create the output directory, it's a critical error.
  process.exit(1);
}

// --- Helper Functions ---
function getGitCommitDate(filePath) {
  try {
    const gitDate = execSync(`git log -1 --format=%ci "${filePath}"`, { encoding: 'utf8' }).trim();
    if (gitDate) {
      return new Date(gitDate).toISOString().split('T')[0];
    } else {
      console.warn(`[generateContentData] WARN: No git commit date found for ${filePath}. Using current date.`);
      return new Date().toISOString().split('T')[0];
    }
  } catch (error) {
    console.error(`[generateContentData] ERROR: Failed to get git commit date for ${filePath}. Error: ${error.message}. Using current date.`);
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

  try {
    if (!fs.existsSync(directoryPath)) {
      if (createExampleMarkerPath && exampleFileContent && exampleFileName && !fs.existsSync(createExampleMarkerPath)) {
        console.log(`[generateContentData] INFO: ${directoryNameForLogging} directory (${directoryPath}) not found. Creating with example content as a first-time setup.`);
        fs.mkdirSync(directoryPath, { recursive: true }); // This was already here, ensure it's caught by the main try...catch
        console.log(`[generateContentData] INFO: Created directory: ${directoryPath}`);
        fs.writeFileSync(path.join(directoryPath, exampleFileName), exampleFileContent); // Also ensure caught
        console.log(`[generateContentData] INFO: Created example file: ${path.join(directoryPath, exampleFileName)}`);
        fs.writeFileSync(createExampleMarkerPath, `Created on: ${new Date().toISOString()}`); // Create marker file with timestamp
        console.log(`[generateContentData] INFO: Created marker file: ${createExampleMarkerPath}. This indicates that an example was created. If you delete this marker and the directory, it will be recreated.`);
        console.log(`[generateContentData] INFO: Example ${directoryNameForLogging.toLowerCase()} content generated in ${directoryPath}. You can modify or delete these examples as needed.`);
      } else if (createExampleMarkerPath && fs.existsSync(createExampleMarkerPath)) {
        console.warn(`[generateContentData] WARN: ${directoryNameForLogging} directory (${directoryPath}) not found, but an '.example-created' marker exists. This might mean the directory was intentionally deleted. Skipping example creation. To recreate example content, remove the marker file: ${createExampleMarkerPath} and run this script again.`);
        return [];
      } else {
        console.warn(`[generateContentData] WARN: ${directoryNameForLogging} directory (${directoryPath}) not found. No example creation configured for this directory. Skipping ${directoryNameForLogging.toLowerCase()} content generation.`);
        return [];
      }
    }

    const files = fs.readdirSync(directoryPath).filter(file => file.endsWith('.md'));
    console.log(`[generateContentData] INFO: Found ${files.length} markdown files in ${directoryPath}.`);
    const items = [];

    files.forEach((file, index) => {
      const filePath = path.join(directoryPath, file);
      let fileContent;
      try {
        fileContent = fs.readFileSync(filePath, 'utf8');
      } catch (readError) {
        console.error(`[generateContentData] ERROR: Failed to read file ${filePath}. Error: ${readError.message}. Skipping this file.`);
        return; // Skip this file
      }
      const { data: frontmatter, content } = matter(fileContent);
      // Pass necessary context or arguments to itemProcessor if it needs them
      const item = itemProcessor(file, filePath, frontmatter, content, index);
    if (item) {
        items.push(item);
    }
  });

  return items;
} catch (error) {
    console.error(`[generateContentData] ERROR: Failed to process markdown directory ${directoryPath}. Error: ${error.message}`);
    return [];
  }
}

// --- Item Processors ---

// Added 'categoriesMap' as an argument to be passed by processBlogPosts
function blogItemProcessor(file, filePath, frontmatter, content, index, categoriesMap) {
  const slug = generateSlug(file);
  const gitDate = getGitCommitDate(filePath); // Already wrapped
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
    readTime: stats.text,
    // image field from frontmatter will be used for category image if present
  };

  const categoryId = post.category;
  // Handle category image - use frontmatter image if available, otherwise default
  // The image from the first post encountered for a category will be used.
  const categoryImage = frontmatter.image || `https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=600`;

  if (!categoriesMap.has(categoryId)) {
    categoriesMap.set(categoryId, {
      id: categoryId,
      name: categoryId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      description: `Posts about ${categoryId.replace('-', ' ')}`,
      image: categoryImage, // Use the determined image
      postCount: 0
    });
    console.log(`[generateContentData] INFO: Created new category '${categoryId}' with image '${categoryImage}'.`);
  } else {
    // If category exists, we use the image from the first post that defined it.
    // For simplicity, we don't update it if subsequent posts have different images for the same category.
    // A more complex logic could be implemented here if needed (e.g., use image from most recent post).
    // We could log if a different image is found for an existing category:
    const existingCategory = categoriesMap.get(categoryId);
    if (frontmatter.image && existingCategory.image !== frontmatter.image) {
      console.log(`[generateContentData] INFO: Category '${categoryId}' already exists with image '${existingCategory.image}'. A different image '${frontmatter.image}' was found in post '${post.title}' but the first one encountered is kept.`);
    }
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
  category: string; // ID of the category
  tags: string[];
  date: string;
  readTime: string;
  // The 'image' field from frontmatter, if present, is used for the category image.
  // It's not directly part of BlogPost to avoid redundancy, but influences BlogCategory.
}

export interface BlogCategory {
  id: string; // e.g., 'general', 'tech-deep-dive'
  name: string; // e.g., 'General', 'Tech Deep Dive'
  description: string;
  image: string; // URL to an image (from post frontmatter or default)
  postCount: number;
}

export const blogPosts: BlogPost[] = ${JSON.stringify(blogPosts, null, 2)};

export const blogCategories: BlogCategory[] = ${JSON.stringify(blogCategories, null, 2)};
`;
try {
  fs.writeFileSync(path.join(OUTPUT_DIR, 'blogData.ts'), blogDataContent);
  console.log(`[generateContentData] INFO: Successfully wrote blog data to ${path.join(OUTPUT_DIR, 'blogData.ts')}`);
} catch (error) {
  console.error(`[generateContentData] ERROR: Failed to write blog data to ${path.join(OUTPUT_DIR, 'blogData.ts')}. Error: ${error.message}`);
}

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
try {
  fs.writeFileSync(path.join(OUTPUT_DIR, 'journeyData.ts'), journeyDataContent);
  console.log(`[generateContentData] INFO: Successfully wrote journey data to ${path.join(OUTPUT_DIR, 'journeyData.ts')}`);
} catch (error) {
  console.error(`[generateContentData] ERROR: Failed to write journey data to ${path.join(OUTPUT_DIR, 'journeyData.ts')}. Error: ${error.message}`);
}

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
try {
  fs.writeFileSync(path.join(OUTPUT_DIR, 'pageData.ts'), pageDataContent);
  console.log(`[generateContentData] INFO: Successfully wrote page data to ${path.join(OUTPUT_DIR, 'pageData.ts')}`);
} catch (error) {
  console.error(`[generateContentData] ERROR: Failed to write page data to ${path.join(OUTPUT_DIR, 'pageData.ts')}. Error: ${error.message}`);
}

console.log(`[generateContentData] ✅ Generation Complete: ${blogPosts.length} blog posts, ${journeyPosts.length} journey posts, and ${pagesData.length} pages processed.`);
console.log(`[generateContentData] ✅ Found ${blogCategories.length} blog categories. Check ${OUTPUT_DIR} for generated TypeScript data files.`);