import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Sidebar = ({ isOpen, onToggle, onCollapseChange }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  // Use external isOpen state if provided, otherwise use internal state
  const sidebarOpen = isOpen !== undefined ? isOpen : false;

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Notify parent component when collapsed state changes
  useEffect(() => {
    if (onCollapseChange) {
      onCollapseChange(collapsed);
    }
  }, [collapsed, onCollapseChange]);

  const handleLogout = async () => {
    await logout();
  };

  const navigationItems = [
    {
      icon: '🏠',
      label: t('sidebar.dashboard') || 'Dashboard',
      href: '/',
      active: true
    },
    {
      icon: '👤',
      label: t('sidebar.profile') || 'Profile',
      href: '/profile'
    },
    {
      icon: '⚙️',
      label: t('sidebar.settings') || 'Settings',
      href: '/settings',
      active: false
    },
    {
      icon: '📊',
      label: t('sidebar.analytics') || 'Analytics',
      href: '/analytics'
    }
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand/Logo Section */}
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">Q</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <h1 className="text-white font-bold text-xl">QUIZZ</h1>
              <p className="text-pink-200 text-xs">Learning Platform</p>
            </div>
          )}
        </div>
        
        {/* Collapse/Expand Button */}
        {!isMobile && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 group"
          >
            <span className="text-white text-lg group-hover:scale-110 transition-transform">
              {collapsed ? '▶️' : '◀️'}
            </span>
          </button>
        )}
        
        {/* Mobile Close Button */}
        {isMobile && (
          <button
            onClick={onToggle}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300"
          >
            <span className="text-white text-lg">❌</span>
          </button>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigationItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className={`group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              item.active
                ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 shadow-lg'
                : 'hover:bg-white/10 hover:shadow-md'
            }`}
          >
            <div className={`p-2 rounded-lg transition-all duration-300 ${
              item.active
                ? 'bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg'
                : 'bg-white/10 group-hover:bg-white/20'
            }`}>
              <span className={`text-lg ${
                item.active ? 'text-white' : 'text-white/80 group-hover:text-white'
              }`}>
                {item.icon}
              </span>
            </div>
            {!collapsed && (
              <span className={`font-medium transition-all duration-300 ${
                item.active ? 'text-white' : 'text-white/80 group-hover:text-white'
              }`}>
                {item.label}
              </span>
            )}
          </a>
        ))}
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-white/10">
        <div className={`flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer`}>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-white/60 text-xs truncate">
                {user?.email || 'user@example.com'}
              </p>
            </div>
          )}
        </div>
        
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={`w-full mt-3 flex items-center space-x-3 px-4 py-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 transition-all duration-300 group`}
        >
          <div className="p-2 rounded-lg bg-red-500/20 group-hover:bg-red-500/30 transition-all duration-300">
            <span className="text-red-400 group-hover:text-red-300 text-lg">🔓</span>
          </div>
          {!collapsed && (
            <span className="font-medium text-red-400 group-hover:text-red-300 transition-colors">
              {t('sidebar.logout') || 'Logout'}
            </span>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-50 transition-all duration-500 ease-in-out ${
          isMobile
            ? `${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-80`
            : `${collapsed ? 'w-20' : 'w-80'} translate-x-0`
        }`}
      >
        <div className="h-full w-full bg-white/10 backdrop-blur-xl border-r border-white/20 shadow-2xl">
          <SidebarContent />
        </div>
      </div>



      {/* Main Content Margin for Desktop */}
      {!isMobile && (
        <div className={`transition-all duration-500 ease-in-out ${
          collapsed ? 'ml-20' : 'ml-80'
        }`} />
      )}
    </>
  );
};

export default Sidebar; 