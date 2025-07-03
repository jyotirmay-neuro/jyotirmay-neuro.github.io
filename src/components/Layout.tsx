import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Breadcrumb from './Breadcrumb';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-80'
        }`}
      >
        <Header />
        <main className="p-4 lg:p-8">
          <Breadcrumb />
          <div className="mt-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;