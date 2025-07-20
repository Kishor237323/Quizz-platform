import React from 'react';
import ResponsiveLayout from '../components/ResponsiveLayout';

const ResponsiveSidebarDemo = () => {
  const stats = [
    { icon: '👥', label: 'Total Users', value: '2,847', change: '+12%', color: 'bg-blue-500' },
    { icon: '📚', label: 'Active Quizzes', value: '156', change: '+8%', color: 'bg-green-500' },
    { icon: '🏆', label: 'Completed', value: '1,234', change: '+15%', color: 'bg-yellow-500' },
    { icon: '📈', label: 'Success Rate', value: '94.2%', change: '+2.1%', color: 'bg-purple-500' }
  ];

  const recentActivities = [
    { user: 'John Doe', action: 'completed', quiz: 'JavaScript Fundamentals', time: '2 minutes ago' },
    { user: 'Jane Smith', action: 'started', quiz: 'React Basics', time: '5 minutes ago' },
    { user: 'Mike Johnson', action: 'completed', quiz: 'Python for Beginners', time: '12 minutes ago' }
  ];

  return (
    <ResponsiveLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Responsive Sidebar Demo</h1>
          <p className="text-white/70">This page demonstrates the responsive sidebar with hamburger menu functionality.</p>
        </div>

        {/* Instructions */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">How to Test</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
            <div>
              <h3 className="font-semibold text-white mb-2">📱 Mobile/Tablet</h3>
              <ul className="space-y-1 text-sm">
                <li>• Click the hamburger menu (☰) in top-left</li>
                <li>• Sidebar slides in from left</li>
                <li>• Click outside or hamburger to close</li>
                <li>• Smooth 300ms transitions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">🖥️ Desktop</h3>
              <ul className="space-y-1 text-sm">
                <li>• Sidebar is always visible</li>
                <li>• No hamburger menu shown</li>
                <li>• Content adjusts automatically</li>
                <li>• Full navigation available</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.color} shadow-lg group-hover:scale-110 transition-transform`}>
                  <span className="text-white text-2xl">{stat.icon}</span>
                </div>
                <span className="text-green-400 text-sm font-medium">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-white/70 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-6">Recent Activities</h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {activity.user.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">
                      <span className="text-white/70">{activity.user}</span>
                      {' '}{activity.action}{' '}
                      <span className="text-pink-400">{activity.quiz}</span>
                    </p>
                    <p className="text-white/50 text-sm">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '📚', label: 'Create Quiz', color: 'bg-blue-500' },
                { icon: '👥', label: 'Invite Users', color: 'bg-green-500' },
                { icon: '📈', label: 'View Analytics', color: 'bg-purple-500' },
                { icon: '🏆', label: 'Leaderboard', color: 'bg-yellow-500' }
              ].map((action, index) => (
                <button
                  key={index}
                  className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 text-center group"
                >
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-200`}>
                    <span className="text-white text-xl">{action.icon}</span>
                  </div>
                  <p className="text-white font-medium">{action.label}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Features Showcase */}
        <div className="mt-8 bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Responsive Sidebar Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">📱</span>
              </div>
              <h3 className="text-white font-bold mb-2">Mobile Responsive</h3>
              <p className="text-white/70 text-sm">Hamburger menu on mobile, permanent sidebar on desktop</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">✨</span>
              </div>
              <h3 className="text-white font-bold mb-2">Glassmorphism</h3>
              <p className="text-white/70 text-sm">Beautiful semi-transparent design with blur effects</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">⚡</span>
              </div>
              <h3 className="text-white font-bold mb-2">Smooth Animations</h3>
              <p className="text-white/70 text-sm">300ms transitions for all interactions and state changes</p>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveLayout>
  );
};

export default ResponsiveSidebarDemo; 