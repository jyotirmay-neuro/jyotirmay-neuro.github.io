import React from 'react';
import { 
  GraduationCap, 
  Mail, 
  Github, 
  Linkedin, 
  Twitter,
  BookOpen,
  Award,
  Globe
} from 'lucide-react';
import ResponsiveImage from './ResponsiveImage';

const Sidebar: React.FC = () => {
  const socialLinks = [
    {
      name: 'Google Scholar',
      icon: <GraduationCap className="w-5 h-5" />,
      handle: 'scholar.google.com/citations?user=YOUR_ID',
      url: 'https://scholar.google.com/citations?user=YOUR_ID'
    },
    {
      name: 'ORCID',
      icon: <Award className="w-5 h-5" />,
      handle: '0000-0000-0000-0000',
      url: 'https://orcid.org/0000-0000-0000-0000'
    },
    {
      name: 'ResearchGate',
      icon: <BookOpen className="w-5 h-5" />,
      handle: 'researchgate.net/profile/Your-Name',
      url: 'https://www.researchgate.net/profile/Your-Name'
    },
    {
      name: 'GitHub',
      icon: <Github className="w-5 h-5" />,
      handle: '@yourusername',
      url: 'https://github.com/yourusername'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      handle: 'linkedin.com/in/yourname',
      url: 'https://linkedin.com/in/yourname'
    },
    {
      name: 'Twitter/X',
      icon: <Twitter className="w-5 h-5" />,
      handle: '@yourusername',
      url: 'https://twitter.com/yourusername'
    },
    {
      name: 'Bluesky',
      icon: <Globe className="w-5 h-5" />,
      handle: '@yourusername.bsky.social',
      url: 'https://bsky.app/profile/yourusername.bsky.social'
    },
    {
      name: 'Email',
      icon: <Mail className="w-5 h-5" />,
      handle: 'your.email@university.edu',
      url: 'mailto:your.email@university.edu'
    }
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl border-r border-gray-200 overflow-y-auto z-40 lg:block hidden">
      <div className="p-8">
        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg">
            <ResponsiveImage
              src="/images/profile.jpg"
              alt="Profile Picture"
              className="w-full h-full object-cover"
              width={128}
              height={128}
            />
          </div>
        </div>

        {/* Name and Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Dr. Academic Name</h1>
          <p className="text-lg text-gray-700 mb-3">Research Scientist</p>
          <p className="text-sm text-gray-600 italic">
            "Advancing knowledge through computational innovation and interdisciplinary research"
          </p>
        </div>

        {/* Social Links */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Connect</h3>
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
            >
              <div className="flex-shrink-0 text-gray-600 group-hover:text-blue-600 transition-colors">
                {link.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {link.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {link.handle}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;