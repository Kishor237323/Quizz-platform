import React, { useState, useEffect } from 'react';
import CleanSidebar from './CleanSidebar';

const CleanApp = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarExpanded(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {isMobile && isSidebarExpanded && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarExpanded(false)}
        />
      )}

      {/* Sidebar */}
      <CleanSidebar 
        isExpanded={isSidebarExpanded} 
        onToggle={toggleSidebar} 
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 ease-in-out ${
        isMobile 
          ? 'ml-0' 
          : isSidebarExpanded 
            ? 'ml-64' 
            : 'ml-20'
      }`}>
        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="fixed top-4 left-4 z-50 p-3 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors duration-200 lg:hidden"
          >
            <span className="text-gray-600 text-lg">☰</span>
          </button>
        )}

        {/* Content */}
        <main className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your quizzes.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { icon: '👥', label: 'Total Users', value: '2,847', color: 'bg-blue-500' },
              { icon: '📚', label: 'Active Quizzes', value: '156', color: 'bg-green-500' },
              { icon: '🏆', label: 'Completed', value: '1,234', color: 'bg-yellow-500' },
              { icon: '📈', label: 'Success Rate', value: '94.2%', color: 'bg-purple-500' }
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <span className="text-white text-xl">{stat.icon}</span>
                  </div>
                  <span className="text-green-500 text-sm font-medium">+12%</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Content Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activities */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Activities</h2>
              <div className="space-y-4">
                {[
                  { user: 'John Doe', action: 'completed', quiz: 'JavaScript Fundamentals', time: '2 minutes ago' },
                  { user: 'Jane Smith', action: 'started', quiz: 'React Basics', time: '5 minutes ago' },
                  { user: 'Mike Johnson', action: 'completed', quiz: 'Python for Beginners', time: '12 minutes ago' }
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {activity.user.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 font-medium">
                        <span className="text-gray-600">{activity.user}</span>
                        {' '}{activity.action}{' '}
                        <span className="text-blue-600">{activity.quiz}</span>
                      </p>
                      <p className="text-gray-500 text-sm">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '📚', label: 'Create Quiz', color: 'bg-blue-500' },
                  { icon: '👥', label: 'Invite Users', color: 'bg-green-500' },
                  { icon: '📈', label: 'View Analytics', color: 'bg-purple-500' },
                  { icon: '🏆', label: 'Leaderboard', color: 'bg-yellow-500' }
                ].map((action, index) => (
                  <button
                    key={index}
                    className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 text-center group"
                  >
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-200`}>
                      <span className="text-white text-xl">{action.icon}</span>
                    </div>
                    <p className="text-gray-800 font-medium">{action.label}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-bold text-blue-800 mb-2">Sidebar Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-700">
              <div>
                <strong>Responsive:</strong> Adapts to mobile and desktop screens
              </div>
              <div>
                <strong>Collapsible:</strong> Click the arrow to expand/collapse
              </div>
              <div>
                <strong>Smooth Transitions:</strong> 300ms animations for all interactions
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CleanApp; 