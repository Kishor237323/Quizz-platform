import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  Home, 
  User, 
  Settings, 
  BarChart3, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

const Sidebar = ({ isOpen, onToggle }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  const navigationItems = [
    {
      icon: Home,
      label: t('sidebar.dashboard') || 'Dashboard',
      href: '/',
      active: true
    },
    {
      icon: User,
      label: t('sidebar.profile') || 'Profile',
      href: '/profile'
    },
    
    {
      icon: Settings,
      label: t('sidebar.settings') || 'Settings',
      href: '/settings'
    },
    {
      icon: BarChart3,
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
              <h1 className="text-white font-bold text-xl">IntelQuiz</h1>
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
            {collapsed ? (
              <ChevronRight className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
            )}
          </button>
        )}
        
        {/* Mobile Close Button */}
        {isMobile && (
          <button
            onClick={onToggle}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300"
          >
            <X className="w-5 h-5 text-white" />
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
              <item.icon className={`w-5 h-5 ${
                item.active ? 'text-white' : 'text-white/80 group-hover:text-white'
              }`} />
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
            <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-300" />
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
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-50 transition-all duration-500 ease-in-out ${
          isMobile
            ? `${isOpen ? 'translate-x-0' : '-translate-x-full'} w-80`
            : `${collapsed ? 'w-20' : 'w-80'} translate-x-0`
        }`}
      >
        <div className="h-full w-full bg-white/10 backdrop-blur-xl border-r border-white/20 shadow-2xl">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={onToggle}
          className="fixed top-4 left-4 z-50 p-3 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300 lg:hidden"
        >
          <Menu className="w-6 h-6 text-white" />
        </button>
      )}

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