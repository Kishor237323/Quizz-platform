import React from 'react';
import Layout from '../components/Layout';

const SidebarDemoSimple = () => {
  const stats = [
    {
      icon: '👥',
      label: 'Total Users',
      value: '2,847',
      change: '+12%',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: '📚',
      label: 'Active Quizzes',
      value: '156',
      change: '+8%',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: '🏆',
      label: 'Completed',
      value: '1,234',
      change: '+15%',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: '📈',
      label: 'Success Rate',
      value: '94.2%',
      change: '+2.1%',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const recentActivities = [
    {
      user: 'John Doe',
      action: 'completed',
      quiz: 'JavaScript Fundamentals',
      time: '2 minutes ago',
      score: '95%'
    },
    {
      user: 'Jane Smith',
      action: 'started',
      quiz: 'React Basics',
      time: '5 minutes ago',
      score: null
    },
    {
      user: 'Mike Johnson',
      action: 'completed',
      quiz: 'Python for Beginners',
      time: '12 minutes ago',
      score: '88%'
    },
    {
      user: 'Sarah Wilson',
      action: 'achieved',
      quiz: 'Perfect Score',
      time: '1 hour ago',
      score: '100%'
    }
  ];

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Home</h1>
          <p className="text-white/70">Welcome back! Here's what's happening with your quizzes.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg group-hover:scale-110 transition-transform`}>
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
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Recent Activities</h2>
              <span className="text-white/70 text-2xl">📅</span>
            </div>
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
                  {activity.score && (
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400 text-lg">⭐</span>
                      <span className="text-white font-medium">{activity.score}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Quick Actions</h2>
              <span className="text-white/70 text-2xl">🎯</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 hover:from-blue-500/30 hover:to-blue-600/30 transition-all duration-300 group">
                <span className="text-blue-400 text-3xl mb-2 block group-hover:scale-110 transition-transform">📚</span>
                <p className="text-white font-medium">Create Quiz</p>
              </button>
              <button className="p-4 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 hover:from-green-500/30 hover:to-green-600/30 transition-all duration-300 group">
                <span className="text-green-400 text-3xl mb-2 block group-hover:scale-110 transition-transform">👥</span>
                <p className="text-white font-medium">Invite Users</p>
              </button>
              <button className="p-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 hover:from-purple-500/30 hover:to-purple-600/30 transition-all duration-300 group">
                <span className="text-purple-400 text-3xl mb-2 block group-hover:scale-110 transition-transform">📈</span>
                <p className="text-white font-medium">View Analytics</p>
              </button>
              <button className="p-4 rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 hover:from-yellow-500/30 hover:to-yellow-600/30 transition-all duration-300 group">
                <span className="text-yellow-400 text-3xl mb-2 block group-hover:scale-110 transition-transform">🏆</span>
                <p className="text-white font-medium">Leaderboard</p>
              </button>
            </div>
          </div>
        </div>

        {/* Features Showcase */}
        <div className="mt-8 bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Sidebar Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🎨</span>
              </div>
              <h3 className="text-white font-bold mb-2">Glassmorphism Design</h3>
              <p className="text-white/70 text-sm">Beautiful semi-transparent design with blur effects and subtle shadows</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">📱</span>
              </div>
              <h3 className="text-white font-bold mb-2">Mobile Responsive</h3>
              <p className="text-white/70 text-sm">Fully responsive design that works perfectly on all device sizes</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">⚡</span>
              </div>
              <h3 className="text-white font-bold mb-2">Smooth Animations</h3>
              <p className="text-white/70 text-sm">Fluid transitions and hover effects for an enhanced user experience</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SidebarDemoSimple; 