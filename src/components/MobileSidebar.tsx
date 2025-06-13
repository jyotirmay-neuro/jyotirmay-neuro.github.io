import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  X, 
  User, 
  GraduationCap, 
  Mail, 
  Github, 
  Linkedin, 
  Twitter,
  BookOpen,
  Award,
  Globe
} from 'lucide-react';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: { path: string; label: string }[];
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose, navItems }) => {
  const location = useLocation();

  const socialLinks = [
    {
      name: 'Google Scholar',
      icon: <GraduationCap className="w-4 h-4" />,
      handle: 'scholar.google.com/citations?user=ZFU7KoYAAAAJ',
      url: 'https://scholar.google.com/citations?user=ZFU7KoYAAAAJ'
    },
    {
      name: 'ORCID',
      icon: <Award className="w-4 h-4" />,
      handle: '0000-0002-6460-9670',
      url: 'https://orcid.org/0000-0002-6460-9670'
    },
    {
      name: 'ResearchGate',
      icon: <BookOpen className="w-4 h-4" />,
      handle: 'researchgate.net/profile/Jyotirmay_Srivastava',
      url: 'https://www.researchgate.net/profile/Jyotirmay_Srivastava'
    },
    {
      name: 'GitHub',
      icon: <Github className="w-4 h-4" />,
      handle: '@jyotirmay-neuro',
      url: 'https://github.com/jyotirmay-neuro'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-4 h-4" />,
      handle: 'linkedin.com/in/jyotirmay-srivastava-in',
      url: 'https://linkedin.com/in/jyotirmay-srivastava-in'
    },
    {
      name: 'Twitter/X',
      icon: <Twitter className="w-4 h-4" />,
      handle: '@js_neuro',
      url: 'https://twitter.com/js_neuro'
    },
    {
      name: 'Bluesky',
      icon: <Globe className="w-4 h-4" />,
      handle: '@js-neuro.bsky.social',
      url: 'https://bsky.app/profile/js-neuro.bsky.social'
    },
    {
      name: 'Email',
      icon: <Mail className="w-4 h-4" />,
      handle: 'jyotirmaysrivastava.in@gmail.com',
      url: 'mailto:jyotirmaysrivastava.in@gmail.com'
    }
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl z-50 lg:hidden overflow-y-auto">
        <div className="p-4">
          {/* Close button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={onClose}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Profile */}
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <User className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-1">Jyotirmay Srivastava</h1>
            <p className="text-sm text-gray-700 mb-2">Neuroscience Researcher</p>
          </div>

          {/* Navigation */}
          <nav className="mb-6">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Links */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Connect</h3>
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
              >
                <div className="flex-shrink-0 text-gray-600 group-hover:text-blue-600 transition-colors">
                  {link.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
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
    </>
  );
};

export default MobileSidebar;