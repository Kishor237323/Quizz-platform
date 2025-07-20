import React, { useState, useEffect } from 'react';
import NewSidebar from './NewSidebar';
import HamburgerToggle from './HamburgerToggle';

const NewLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(false); // Always closed on desktop for this new design
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Hamburger Toggle - Always visible */}
      <div className="fixed top-4 left-4 z-50">
        <HamburgerToggle isOpen={sidebarOpen} onToggle={toggleSidebar} />
      </div>

      {/* New Sidebar */}
      <NewSidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      
      {/* Main Content - No margin needed since sidebar is overlay */}
      <main className="min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default NewLayout; 