# Markdown Blog System Guide

## 🎉 New Markdown-Based Content System

Your website now supports **markdown files** for easy content management! No more editing TypeScript files - just write markdown and push to GitHub.

## 📁 New Folder Structure

```
content/
├── blog/           # Your blog posts (markdown files)
└── journey/        # Your journey updates (markdown files)

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
- `date`: Publication date (optional - uses git commit date if missing)

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
type: "image-text"
image: "/images/journey/conference-photo.jpg"
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
- `image`: Image path if type is "image-text" (optional)
- `date`: Date (optional - uses git commit date)

## 🖼️ Image Management

### Automatic Image Resizing
All images are **automatically resized** and optimized! No need to manually resize.

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

## 📅 Automatic Dates

**Publication dates are automatically set** based on your git commit timestamp! 

- First commit = publication date
- No need to manually set dates
- Dates are in YYYY-MM-DD format

## 🔧 Build Process

The system automatically:
1. **Reads** all markdown files from `content/` folders
2. **Converts** markdown to HTML
3. **Calculates** reading time
4. **Extracts** git commit dates
5. **Generates** category data
6. **Creates** the data files your website uses

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

```code block```
```

### SEO Best Practices
- Use descriptive titles
- Add relevant tags
- Write compelling excerpts
- Use proper heading hierarchy (H1 → H2 → H3)
- Add alt text to images

## 🎯 Quick Start Checklist

1. ✅ **Replace example content**:
   - Delete `content/blog/welcome-to-my-blog.md`
   - Delete `content/journey/website-launch.md`

2. ✅ **Add your profile picture**:
   - Save as `public/images/profile.jpg`

3. ✅ **Write your first blog post**:
   - Create `content/blog/your-first-post.md`

4. ✅ **Add a journey update**:
   - Create `content/journey/your-first-update.md`

5. ✅ **Deploy**:
   ```bash
   git add .
   git commit -m "Add my content"
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