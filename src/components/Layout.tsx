import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Breadcrumb from './Breadcrumb';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 lg:ml-80">
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