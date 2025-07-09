import React from 'react';
import { Calendar } from 'lucide-react';
import { journeyPosts } from '../data/journeyData';

const Journey: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">My Journey</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A timeline of milestones, achievements, and experiences that shape my research and academic journey
        </p>
        <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-300 hidden lg:block"></div>
        
        <div className="space-y-12">
          {journeyPosts.map((post) => (
            <div key={post.id} className="relative">
              {/* Timeline dot */}
              <div className="absolute left-6 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg hidden lg:block"></div>
              
              <div className="lg:ml-16">
                <article className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 lg:p-8">
                  {/* Date */}
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  
                  {/* Title */}
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                    {post.title}
                  </h2>
                  
                  {/* Image (if exists) */}
                  {post.imagePath && (
                    <div className="mb-6">
                      <a href={post.imagePath} target="_blank" rel="noopener noreferrer">
                        <img
                          src={post.imagePath}
                          alt={post.imageAlt || post.title} // Fallback to title if imageAlt is not available
                          className="w-full h-64 lg:h-80 object-cover rounded-lg shadow-md"
                        />
                      </a>
                    </div>
                  )}
                  
                  {/* Content */}
                  <div
                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </article>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default Journey;