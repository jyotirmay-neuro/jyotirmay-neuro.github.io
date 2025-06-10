import React from 'react';
import { GraduationCap, Award, Users, BookOpen } from 'lucide-react';

const About: React.FC = () => {
  const achievements = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: 'Educational Background',
      description: 'Ph.D. in Computational Sciences from Stanford University, M.S. in Computer Science from MIT'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Research Excellence',
      description: '50+ peer-reviewed publications, 3 best paper awards, h-index of 35'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Collaboration',
      description: 'International research collaborations with 20+ institutions across 5 continents'
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Teaching Impact',
      description: 'Mentored 25+ graduate students, University Teaching Excellence Award recipient'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">About Me</h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Research Philosophy</h2>
            <p className="text-gray-700 leading-relaxed">
              My research is driven by the belief that computational methods can unlock new frontiers in scientific discovery. 
              I work at the intersection of computer science and natural sciences, developing innovative algorithms and 
              computational frameworks that address complex real-world challenges. My approach emphasizes interdisciplinary 
              collaboration, open science practices, and the responsible development of AI technologies.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Current Research Focus</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              My current research spans several interconnected areas:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                <span><strong>Machine Learning for Scientific Discovery:</strong> Developing novel ML algorithms for protein structure prediction, drug discovery, and materials science applications.</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                <span><strong>Quantum-Classical Hybrid Computing:</strong> Exploring the synergy between quantum and classical computation for optimization and simulation problems.</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                <span><strong>Computational Biology:</strong> Modeling complex biological systems using advanced computational techniques and high-performance computing.</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                <span><strong>AI Ethics and Fairness:</strong> Investigating bias in AI systems and developing frameworks for responsible AI deployment in scientific applications.</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional Journey</h2>
            <p className="text-gray-700 leading-relaxed">
              I currently serve as a Principal Research Scientist at the Institute for Computational Sciences, where I lead 
              a multidisciplinary team of researchers and students. My journey began with a fascination for mathematics and 
              programming, which evolved into a passion for using computational methods to solve complex scientific problems. 
              Over the years, I've had the privilege of collaborating with brilliant minds across academia and industry, 
              contributing to advancements that bridge theoretical research and practical applications.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Beyond Research</h2>
            <p className="text-gray-700 leading-relaxed">
              When I'm not immersed in research, I enjoy mentoring young scientists, contributing to open-source projects, 
              and engaging in science communication. I believe in making science accessible to broader audiences and 
              regularly participate in public lectures and educational outreach programs. I'm also passionate about 
              promoting diversity and inclusion in STEM fields and serve on several committees dedicated to supporting 
              underrepresented groups in science and technology.
            </p>
          </div>
        </div>

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
            href="mailto:your.email@university.edu"
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