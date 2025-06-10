import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2, Linkedin, Twitter } from 'lucide-react';
import { blogPosts } from '../data/blogData';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);
  
  if (!post) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Post Not Found</h1>
        <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
        <Link
          to="/blog"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Blog
        </Link>
      </div>
    );
  }

  const currentIndex = blogPosts.findIndex(p => p.slug === slug);
  const previousPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  const shareUrl = window.location.href;
  const shareText = `Check out this article: ${post.title}`;

  const handleShare = (platform: string) => {
    let url = '';
    switch (platform) {
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'bluesky':
        url = `https://bsky.app/intent/compose?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
        break;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back to Blog */}
      <Link
        to="/blog"
        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-8 transition-colors"
      >
        <ArrowLeft className="mr-2 w-4 h-4" />
        Back to Blog
      </Link>

      {/* Article */}
      <article className="bg-white rounded-xl shadow-lg p-8 lg:p-12">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {post.readTime}
            </span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
              {post.category.replace('-', ' ').toUpperCase()}
            </span>
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* Content */}
        <div 
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Share Buttons */}
        <div className="border-t border-gray-200 pt-8 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Share2 className="w-5 h-5 mr-2" />
            Share this article
          </h3>
          <div className="flex space-x-4">
            <button
              onClick={() => handleShare('linkedin')}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn
            </button>
            <button
              onClick={() => handleShare('twitter')}
              className="flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Twitter className="w-4 h-4 mr-2" />
              Twitter/X
            </button>
            <button
              onClick={() => handleShare('bluesky')}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Bluesky
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="border-t border-gray-200 pt-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Previous Post */}
            <div>
              {previousPost && (
                <Link
                  to={`/blog/${previousPost.slug}`}
                  className="block p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                >
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Previous Post
                  </div>
                  <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {previousPost.title}
                  </h4>
                </Link>
              )}
            </div>

            {/* Next Post */}
            <div>
              {nextPost && (
                <Link
                  to={`/blog/${nextPost.slug}`}
                  className="block p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group text-right"
                >
                  <div className="flex items-center justify-end text-sm text-gray-500 mb-2">
                    Next Post
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                  <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {nextPost.title}
                  </h4>
                </Link>
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;