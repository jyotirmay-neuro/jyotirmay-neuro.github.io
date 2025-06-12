import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, User } from 'lucide-react';
import MobileSidebar from './MobileSidebar';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/blog', label: 'Blog' },
    { path: '/journey', label: 'Journey' },
    { path: '/cv', label: 'CV' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
        <div className="px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Desktop Name */}
            <Link to="/" className="hidden lg:block">
              <h1 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                Dr. Academic Name
              </h1>
            </Link>

            {/* Mobile Name */}
            <Link to="/" className="lg:hidden flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">Dr. Academic</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden lg:block">
              <ul className="flex space-x-8">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
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

            {/* Mobile placeholder */}
            <div className="w-6 lg:hidden"></div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <MobileSidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        navItems={navItems}
      />
    </>
  );
};

export default Header;