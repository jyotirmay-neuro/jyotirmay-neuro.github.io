import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const getBreadcrumbName = (path: string) => {
    const names: { [key: string]: string } = {
      'about': 'About',
      'blog': 'Blog',
      'journey': 'Journey',
      'cv': 'CV',
      'category': 'Category'
    };
    return names[path] || path.charAt(0).toUpperCase() + path.slice(1);
  };

  if (location.pathname === '/') {
    return (
      <nav className="flex items-center space-x-2 text-sm text-gray-600">
        <Home className="w-4 h-4" />
        <span className="text-gray-900 font-medium">Home</span>
      </nav>
    );
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600">
      <Link 
        to="/" 
        className="flex items-center hover:text-blue-600 transition-colors"
      >
        <Home className="w-4 h-4" />
      </Link>
      
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        
        return (
          <React.Fragment key={name}>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            {isLast ? (
              <span className="text-gray-900 font-medium">
                {getBreadcrumbName(name)}
              </span>
            ) : (
              <Link 
                to={routeTo}
                className="hover:text-blue-600 transition-colors"
              >
                {getBreadcrumbName(name)}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;