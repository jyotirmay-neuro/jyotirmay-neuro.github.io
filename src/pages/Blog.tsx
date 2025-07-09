import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { blogPosts, blogCategories } from '../data/blogData';

const Blog: React.FC = () => {
  const latestBlogs = blogPosts.slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Personal Blog</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Sharing my thought, insights from my readings and research in neurosciences (and, more broadly, biological sciences), and recommendations of books/shows/movies.
        </p>
        <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Latest Posts */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Posts</h2>
        <div className="grid gap-8">
          {latestBlogs.map((post) => (
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
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {post.category.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                    <Link to={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p
                    className="text-gray-600 mb-4 leading-relaxed prose"
                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                  />
                  
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
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Explore by Category</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogCategories.map((category) => (
            <Link
              key={category.id}
              to={`/blog/category/${category.id}`}
              className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    {category.postCount} posts
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="flex items-center text-blue-600 font-medium">
                  View Posts
                  <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Blog;