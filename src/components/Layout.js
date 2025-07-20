import React, { useState, useEffect } from 'react';
import Sidebar from './SidebarSimple';

const Layout = ({ children, sidebarOpen, setSidebarOpen }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onCollapseChange={setSidebarCollapsed}
      />
      
      {/* Main Content */}
      <div className={`transition-all duration-500 ease-in-out ${
        isMobile ? 'ml-0' : sidebarCollapsed ? 'ml-20' : 'ml-80'
      }`}>
        <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout; 