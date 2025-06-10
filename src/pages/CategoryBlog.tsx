import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { blogPosts, blogCategories } from '../data/blogData';

const CategoryBlog: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const categoryInfo = blogCategories.find(c => c.id === category);
  const categoryPosts = blogPosts.filter(post => post.category === category);
  
  // Pagination logic
  const totalPages = Math.ceil(categoryPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = categoryPosts.slice(startIndex, startIndex + postsPerPage);

  if (!categoryInfo) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Category Not Found</h1>
        <p className="text-gray-600 mb-8">The category you're looking for doesn't exist.</p>
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

  return (
    <div className="max-w-6xl mx-auto">
      {/* Back to Blog */}
      <Link
        to="/blog"
        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-8 transition-colors"
      >
        <ArrowLeft className="mr-2 w-4 h-4" />
        Back to Blog
      </Link>

      {/* Category Header */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
        <div className="aspect-w-16 aspect-h-6 relative">
          <img
            src={categoryInfo.image}
            alt={categoryInfo.name}
            className="w-full h-64 lg:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">{categoryInfo.name}</h1>
              <p className="text-xl max-w-2xl mx-auto px-4">{categoryInfo.description}</p>
              <div className="mt-4">
                <span className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm">
                  {categoryInfo.postCount} posts
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="grid gap-8 mb-12">
        {currentPosts.map((post) => (
          <article key={post.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6">
              <div className="flex-1">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
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
                </div>
                
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                  <Link to={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap items-center justify-between">
                  <div className="flex flex-wrap gap-2 mb-4 lg:mb-0">
                    {post.tags.map((tag) => (
                      <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Read More
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
            }`}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </button>
          
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
            }`}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryBlog;