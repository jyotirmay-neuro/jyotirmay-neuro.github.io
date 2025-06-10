**DEPRECATED:** This guide describes an old content management system. Please refer to the new [WEBSITE_CONTENT_GUIDE.md](./WEBSITE_CONTENT_GUIDE.md) for current instructions on managing website content using Markdown.

# Website Content Management Guide

## 📁 File Structure Overview

```
src/
├── data/
│   ├── blogData.ts          # All blog posts and categories
│   └── journeyData.ts       # Journey/news updates
├── components/              # UI components (don't edit these)
├── pages/                   # Page layouts (don't edit these)
└── ...

public/
├── images/                  # Your images go here
│   ├── profile.jpg         # Your profile picture
│   ├── blog/               # Blog post images
│   └── journey/            # Journey post images
├── cv.pdf                  # Your CV file
└── ...
```

## 📝 Managing Blog Posts

### Location: `src/data/blogData.ts`

#### Adding a New Blog Post:
1. Open `src/data/blogData.ts`
2. Add a new object to the `blogPosts` array:

```typescript
{
  id: '6', // Increment the number
  slug: 'your-blog-post-url', // URL-friendly version
  title: 'Your Blog Post Title',
  excerpt: 'A brief summary that appears on the blog listing pages...',
  content: `
    <h2>Your First Heading</h2>
    <p>Your paragraph content here...</p>
    
    <h2>Another Heading</h2>
    <p>More content...</p>
    
    <img src="/images/blog/your-image.jpg" alt="Description" class="w-full rounded-lg mb-4" />
  `,
  category: 'machine-learning', // Must match a category ID
  tags: ['AI', 'Research', 'Your Tags'],
  date: '2024-01-20', // YYYY-MM-DD format
  readTime: '7 min read'
}
```

#### Editing Existing Posts:
- Find the post by its `id` or `slug`
- Modify any field (title, content, tags, etc.)

#### Removing Posts:
- Delete the entire post object from the array

### Blog Categories

#### Adding a New Category:
Add to the `blogCategories` array in the same file:

```typescript
{
  id: 'your-category-id',
  name: 'Category Display Name',
  description: 'What this category is about...',
  image: '/images/categories/category-image.jpg',
  postCount: 5 // Update manually when you add/remove posts
}
```

## 📰 Managing Journey Updates

### Location: `src/data/journeyData.ts`

#### Adding a New Update:
Add to the beginning of the `journeyPosts` array:

```typescript
{
  id: '7', // Increment the number
  date: '2024-01-20', // YYYY-MM-DD format
  type: 'text', // or 'image-text'
  title: 'Your Update Title',
  content: 'Your update content here...',
  image: '/images/journey/your-image.jpg' // Only if type is 'image-text'
}
```

## 🖼️ Managing Images

### Profile Picture:
- Save as: `public/images/profile.jpg`
- Recommended size: 400x400px
- Update the image path in `src/components/Sidebar.tsx` if needed

### Blog Post Images:
- Save in: `public/images/blog/`
- Reference in blog content as: `/images/blog/your-image.jpg`

### Journey Images:
- Save in: `public/images/journey/`
- Reference in journey posts as: `/images/journey/your-image.jpg`

### Category Images:
- Save in: `public/images/categories/`
- Reference in categories as: `/images/categories/your-image.jpg`

## 📄 CV Management

### Your CV:
- Save as: `public/cv.pdf`
- The CV page will automatically link to this file
- Replace the existing dummy file

## 👤 Personal Information

### Profile Information:
Edit in these files:
- `src/components/Sidebar.tsx` - Name, title, tagline
- `src/components/MobileSidebar.tsx` - Same info for mobile
- `src/components/Header.tsx` - Header name
- `index.html` - Page title and meta description

### Social Links:
Edit the `socialLinks` array in:
- `src/components/Sidebar.tsx`
- `src/components/MobileSidebar.tsx`

Update the URLs and handles to your actual accounts.

### About Page Content:
Edit `src/pages/About.tsx` - Replace all the dummy text with your actual information.

## 🚀 Publishing Changes

After making any content changes:

1. **Save all files**
2. **Open terminal in your project folder**
3. **Run these commands:**
   ```bash
   git add .
   git commit -m "Update website content"
   git push origin main
   npm run deploy
   ```

Your changes will be live in 2-5 minutes!

## 📊 Google Analytics

Your Google Analytics is already set up in `index.html`. Replace `GA_MEASUREMENT_ID` with your actual Google Analytics tracking ID.

## 💡 Content Tips

### Blog Content HTML:
- Use `<h2>` for main headings
- Use `<h3>` for subheadings  
- Use `<p>` for paragraphs
- Use `<ul><li>` for bullet lists
- Use `<img>` tags for images
- Add `class="w-full rounded-lg mb-4"` to images for proper styling

### Dates:
Always use YYYY-MM-DD format (e.g., 2024-01-20)

### URLs/Slugs:
Use lowercase, hyphens instead of spaces (e.g., "machine-learning-breakthrough")

## 🔧 Quick Reference

**Add blog post:** Edit `src/data/blogData.ts`
**Add journey update:** Edit `src/data/journeyData.ts`  
**Change profile info:** Edit `src/components/Sidebar.tsx`
**Update about page:** Edit `src/pages/About.tsx`
**Add images:** Save in `public/images/`
**Update CV:** Replace `public/cv.pdf`