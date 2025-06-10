# Website Content Management Guide

## 🎉 New Markdown-Based Content System

Your website now uses **markdown files** for easy management of all primary textual content! This includes blog posts, journey updates, and static pages like "About Me" and "Curriculum Vitae". No more editing TypeScript files for these sections - just write markdown and push to GitHub.

## 📁 Folder Structure

All content is managed within the `content/` directory:
```
content/
├── blog/           # Your blog posts (markdown files)
├── journey/        # Your journey updates (markdown files)
└── pages/          # Static pages like About, CV (markdown files)

public/
└── images/         # All your images
    ├── profile.jpg # Your profile picture (auto-resized)
    ├── blog/       # Blog images (auto-resized)
    └── journey/    # Journey images (auto-resized)
```

## ✍️ Writing Blog Posts

### 1. Create a New Blog Post
Create a new `.md` file in `content/blog/` folder:

**Example: `content/blog/my-research-breakthrough.md`**

```markdown
---
title: "Revolutionary Machine Learning Breakthrough"
category: "machine-learning"
tags: ["AI", "research", "breakthrough", "ML"]
excerpt: "Discover how our latest research is changing the landscape of machine learning applications in scientific discovery."
date: "2023-10-26" # Optional: YYYY-MM-DD format. If omitted, uses git commit date.
---

# Revolutionary Machine Learning Breakthrough

Today I'm excited to share our latest research findings that could revolutionize how we approach machine learning in scientific applications.

## The Problem We Solved

Traditional machine learning approaches have struggled with...

## Our Solution

We developed a novel algorithm that...

### Key Features

- **Improved Accuracy**: 40% better performance
- **Faster Processing**: 3x speed improvement  
- **Lower Resource Usage**: 50% less memory required

## Results

![Research Results](https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800)

Our experiments showed remarkable improvements across all metrics...

## What's Next

This breakthrough opens up new possibilities for...
```

### 2. Frontmatter Fields

Each blog post **must** have frontmatter (the section between `---`):

- `title`: Post title (required)
- `category`: Category ID like "machine-learning", "data-science" (required)
- `tags`: Array of tags for SEO (optional)
- `excerpt`: Brief summary for listings (optional - auto-generated if missing)
- `date`: Publication date in YYYY-MM-DD format (optional - uses git commit date if missing)

### 3. Categories

Categories are **auto-generated** from your posts. Use these category IDs:
- `machine-learning`
- `data-science`
- `computational-biology`
- `quantum-computing`
- `ai-ethics`
- `research-methods`
- `general`

## 📰 Writing Journey Updates

### Create Journey Posts
Create `.md` files in `content/journey/` folder:

**Example: `content/journey/conference-keynote.md`**

```markdown
---
title: "Delivered Keynote at AI Conference"
type: "image-text" # Can be "text" or "image-text"
image: "/images/journey/conference-photo.jpg" # Required if type is "image-text"
date: "2023-09-15" # Optional: YYYY-MM-DD format. If omitted, uses git commit date.
---

Had the honor of delivering the opening keynote at the International AI Conference in Boston. 

The talk focused on the future of human-AI collaboration and received incredible feedback from the 500+ attendees.

Key highlights from my presentation:
- The importance of ethical AI development
- How interdisciplinary collaboration drives innovation
- Future challenges in AI research

Looking forward to the collaborations that will emerge from this event!
```

### Journey Frontmatter
- `title`: Update title (required)
- `type`: Either "text" or "image-text" (optional, defaults to "text")
- `image`: Image path if type is "image-text" (optional, required if type is "image-text")
- `date`: Date in YYYY-MM-DD format (optional - uses git commit date if missing)

## 📄 Managing Static Pages (About, CV, etc.)

Static pages like "About Me" and "Curriculum Vitae" are also managed via Markdown files in the `content/pages/` directory.

### Example for `content/pages/about.md`:
```markdown
---
title: "About Me"
---

## My Research Philosophy
My work is driven by a curiosity to understand complex systems and to develop innovative solutions that can make a tangible impact on the world. I am committed to rigorous methodologies, open collaborations, and the dissemination of research findings to the broader scientific community.

## Current Research Focus
My current research centers on the following key areas:

*   **Machine Learning and Artificial Intelligence:** Exploring novel algorithms and models.
*   **Quantum Computing:** Investigating quantum mechanics for computation.
*   **Bioinformatics:** Applying computational techniques to biological data.
```

### Example for `content/pages/cv.md`:
```markdown
---
title: "Curriculum Vitae"
description: "My complete academic and professional background"
---

My CV should have opened in a new tab. If it didn't, you can download it directly using the button below.
```

The main content area of these pages will be rendered from the Markdown you provide. Some complex interactive elements or specific structural sections (like the "Key Highlights" grid on the About page, or the PDF download button and CV highlights on the CV page) might still be part of the underlying React component, but the primary textual content is now driven by these Markdown files.

## 🖼️ Image Management

### Automatic Image Resizing
All images in `public/images/` are **automatically resized** and optimized during the build process! No need to manually resize.

### Profile Picture
- Save as: `public/images/profile.jpg`
- Any size works - it will be auto-resized to 400x400px
- Supports: JPG, PNG, WebP

### Blog Images
- Save in: `public/images/blog/`
- Reference in markdown: `![Alt text](/images/blog/your-image.jpg)`
- Any size works - auto-resized for web

### Journey Images  
- Save in: `public/images/journey/`
- Reference in frontmatter: `image: "/images/journey/your-image.jpg"`

## 🚀 Publishing Your Content

### Method 1: Simple Git Workflow
```bash
# 1. Add your new markdown files
git add content/blog/your-new-post.md
git add public/images/blog/your-image.jpg

# 2. Commit (this sets the publication date!)
git commit -m "Add new blog post about AI research"

# 3. Push to GitHub
git push origin main

# 4. Deploy
npm run deploy
```

### Method 2: All at Once
```bash
git add .
git commit -m "Update blog content"
git push origin main
npm run deploy
```
_The `npm run deploy` command builds your site and pushes it to the `gh-pages` branch._

## 📅 Automatic Dates

Publication dates for blog posts and journey updates can be **automatically set** based on your git commit timestamp if the `date` field is omitted from the frontmatter.
- The date of the first commit that includes the file will be used as its publication date.
- If you want to specify a date, use YYYY-MM-DD format in the `date` frontmatter field.

## 🔧 Build Process

The website uses a script (`scripts/generateContentData.js`) that automatically:
1. **Reads** all markdown files from `content/blog/`, `content/journey/`, and `content/pages/`.
2. **Converts** markdown content to HTML.
3. **Extracts** frontmatter (titles, dates, categories, tags, excerpts, descriptions).
4. **Calculates** reading time for blog posts.
5. **Uses** git commit dates if dates are not specified in frontmatter.
6. **Generates** category data for blog posts.
7. **Creates** TypeScript data files (`src/data/*.ts`) that your website uses to display content.

This process runs automatically when you build the site (e.g., during `npm run build` or `npm run deploy`).

## 📝 Content Tips

### Markdown Syntax
```markdown
# Main Heading (H1)
## Section Heading (H2)  
### Subsection (H3)

**Bold text**
*Italic text*

- Bullet point
- Another point

1. Numbered list
2. Second item

[Link text](https://example.com)

![Image alt text](/images/blog/image.jpg)

> Blockquote text

`inline code`

\`\`\`javascript
// code block
function greet() {
  console.log("Hello!");
}
\`\`\`
```

### SEO Best Practices
- Use descriptive titles
- Add relevant tags
- Write compelling excerpts
- Use proper heading hierarchy (H1 → H2 → H3)
- Add alt text to images

## 🎯 Quick Start Checklist

1. ✅ **Review and update static pages**:
   - `content/pages/about.md` (update with your information)
   - `content/pages/cv.md` (the content here is minimal, but ensure title/description are as you like)

2. ✅ **Replace example content**:
   - Delete `content/blog/welcome-to-my-blog.md` (or edit it to be your first post)
   - Delete `content/journey/website-launch.md` (or edit it)

3. ✅ **Add your profile picture**:
   - Save as `public/images/profile.jpg`

4. ✅ **Write your first actual blog post** (if you edited the example, you're set for now):
   - Create `content/blog/your-first-post.md`

5. ✅ **Add an initial journey update**:
   - Create `content/journey/your-first-update.md`

6. ✅ **Deploy**:
   ```bash
   git add .
   git commit -m "Initial content setup"
   git push origin main
   npm run deploy
   ```

## 🆘 Troubleshooting

### Build Errors
If you get build errors, check:
- All markdown files have proper frontmatter
- Image paths are correct
- No special characters in filenames

### Images Not Showing
- Check file paths start with `/images/`
- Ensure images are in `public/images/` folder
- Verify image file extensions (jpg, png, webp)

### Categories Not Appearing
- Use lowercase, hyphenated category IDs
- Categories are auto-generated from your posts
- At least one post must exist in each category

---

**That's it!** Your markdown-based blog system is ready. Just write markdown files and push to GitHub - everything else is automatic! 🎉