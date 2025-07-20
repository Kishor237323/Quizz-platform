import React from 'react';
import DarkModeToggle from '../components/DarkModeToggle';

const DarkModeDemo = () => {
  const stats = [
    { icon: '👥', label: 'Total Users', value: '2,847', change: '+12%' },
    { icon: '📚', label: 'Active Quizzes', value: '156', change: '+8%' },
    { icon: '🏆', label: 'Completed', value: '1,234', change: '+15%' },
    { icon: '📈', label: 'Success Rate', value: '94.2%', change: '+2.1%' }
  ];

  const recentActivities = [
    { user: 'John Doe', action: 'completed', quiz: 'JavaScript Fundamentals', time: '2 minutes ago' },
    { user: 'Jane Smith', action: 'started', quiz: 'React Basics', time: '5 minutes ago' },
    { user: 'Mike Johnson', action: 'completed', quiz: 'Python for Beginners', time: '12 minutes ago' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Dark Mode Toggle */}
      <DarkModeToggle />

      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                Dark Mode Demo
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400 transition-colors duration-300">
                Toggle the theme using the button in the top-right corner
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                Click the 🌞/🌙 button to toggle
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8 transition-colors duration-300">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            Welcome to Dark Mode
          </h2>
          <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
            This page demonstrates a fully functional dark mode implementation using React and Tailwind CSS. 
            The theme preference is stored in localStorage and persists across page reloads.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500 dark:bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">{stat.icon}</span>
                </div>
                <span className="text-green-500 dark:text-green-400 text-sm font-medium transition-colors duration-300">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-300">
                {stat.value}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
              Recent Activities
            </h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {activity.user.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 dark:text-white font-medium transition-colors duration-300">
                      <span className="text-gray-600 dark:text-gray-400">{activity.user}</span>
                      {' '}{activity.action}{' '}
                      <span className="text-blue-600 dark:text-blue-400">{activity.quiz}</span>
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors duration-300">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '📚', label: 'Create Quiz', color: 'bg-blue-500 dark:bg-blue-600' },
                { icon: '👥', label: 'Invite Users', color: 'bg-green-500 dark:bg-green-600' },
                { icon: '📈', label: 'View Analytics', color: 'bg-purple-500 dark:bg-purple-600' },
                { icon: '🏆', label: 'Leaderboard', color: 'bg-yellow-500 dark:bg-yellow-600' }
              ].map((action, index) => (
                <button
                  key={index}
                  className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300 text-center group"
                >
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-200`}>
                    <span className="text-white text-xl">{action.icon}</span>
                  </div>
                  <p className="text-gray-900 dark:text-white font-medium transition-colors duration-300">
                    {action.label}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dark Mode Features */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-700 transition-colors duration-300">
          <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-4 transition-colors duration-300">
            Dark Mode Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800 dark:text-blue-200 transition-colors duration-300">
            <div className="flex items-center space-x-2">
              <span className="text-blue-600 dark:text-blue-400">✅</span>
              <span>Persistent theme storage</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-blue-600 dark:text-blue-400">✅</span>
              <span>Smooth transitions</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-blue-600 dark:text-blue-400">✅</span>
              <span>System preference detection</span>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            Implementation Details
          </h3>
          <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 overflow-x-auto">
            <pre className="text-green-400 text-sm">
{`// Tailwind Config
module.exports = {
  darkMode: 'class',
  // ... other config
}

// Component Usage
<div className="bg-white dark:bg-gray-800 
                text-gray-900 dark:text-white
                border-gray-200 dark:border-gray-700">
  Content here
</div>`}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DarkModeDemo; 