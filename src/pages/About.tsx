import React from 'react';
import { GraduationCap, Award } from 'lucide-react';
import { pages } from '../data/pageData';

const About: React.FC = () => {
  const aboutPageData = pages.find(p => p.id === 'about');

  const achievements = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: 'Educational Background',
      description: 'MS (Research) in Biological Sciences, IISER Thiruvananthapura, India; focus on Neuroscience'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Research Fellowship',
      description: 'Cleared DBT BET 2023 under Category-I and received DBT - Junior Research Fellowship'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Award',
      description: 'Received Parkinson\'s Foundation Visiting Scholar Award 2024 for research on Parkinson’s disease'
    }
  ];

  if (!aboutPageData) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 text-center">
          <h1 className="text-2xl font-bold text-gray-700">Page content not found.</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{aboutPageData.title}</h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Main Content from Markdown */}
        <div
          className="prose prose-lg max-w-none space-y-8"
          dangerouslySetInnerHTML={{ __html: aboutPageData.content }}
        />

        {/* Achievements Grid */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Key Highlights</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  {achievement.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{achievement.title}</h3>
                  <p className="text-gray-600 text-sm">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Interested in collaboration or have questions about my research?
          </p>
          <a
            href="mailto:jyotirmaysrivastava.in@gmail.com"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;