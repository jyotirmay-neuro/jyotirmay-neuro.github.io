import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { blogPosts } from '../data/blogData';
import { journeyPosts } from '../data/journeyData';

const Home: React.FC = () => {
  const latestBlogs = blogPosts.slice(0, 5);
  const recentNews = journeyPosts.slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 lg:p-12">
        <div className="max-w-3xl">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Welcome to My Research Journey
          </h1>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            I'm a computational scientist passionate about advancing knowledge through interdisciplinary research. 
            My work spans machine learning, computational biology, and quantum computing, with a focus on developing 
            innovative solutions to complex scientific challenges. I believe in the power of collaboration and 
            open science to drive meaningful progress.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Learn More About Me
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Latest Research & Insights</h2>
          <Link
            to="/blog"
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center transition-colors"
          >
            View All Posts
            <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid gap-6 lg:gap-8">
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
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Read More
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Recent News */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Recent Updates</h2>
          <Link
            to="/journey"
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center transition-colors"
          >
            View Full Journey
            <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
        
        <div className="space-y-6">
          {recentNews.map((news) => (
            <div key={news.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-3"></div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm text-gray-500">
                      {new Date(news.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{news.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{news.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;