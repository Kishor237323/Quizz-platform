import React from 'react';
import NewLayout from '../components/NewLayout';

export default function NewSidebarDemo() {
  return (
    <NewLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">
              New Responsive Sidebar System
            </h1>
            <p className="text-xl text-gray-300">
              A modern, glassmorphism sidebar with smooth animations and mobile responsiveness
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Hamburger Menu */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl mb-4">🍔</div>
              <h3 className="text-xl font-bold text-white mb-2">Hamburger Menu</h3>
              <p className="text-gray-300">
                Animated three-line hamburger icon in the top-left corner that transforms to X when opened.
              </p>
            </div>

            {/* Glassmorphism Design */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl mb-4">✨</div>
              <h3 className="text-xl font-bold text-white mb-2">Glassmorphism</h3>
              <p className="text-gray-300">
                Beautiful blurred transparent background with subtle borders and shadows.
              </p>
            </div>

            {/* Smooth Transitions */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl mb-4">🎭</div>
              <h3 className="text-xl font-bold text-white mb-2">Smooth Animations</h3>
              <p className="text-gray-300">
                300ms transitions for all interactions with ease-in-out timing.
              </p>
            </div>

            {/* Mobile Responsive */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-white mb-2">Mobile Responsive</h3>
              <p className="text-gray-300">
                Optimized for all screen sizes with touch-friendly interactions.
              </p>
            </div>

            {/* Backdrop Blur */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl mb-4">🌫️</div>
              <h3 className="text-xl font-bold text-white mb-2">Backdrop Blur</h3>
              <p className="text-gray-300">
                Background dims with blur effect when sidebar is open.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl mb-4">🧭</div>
              <h3 className="text-xl font-bold text-white mb-2">Navigation</h3>
              <p className="text-gray-300">
                Dashboard, Profile, Settings, Analytics with beautiful icons and hover effects.
              </p>
            </div>
          </div>

          {/* How to Use */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">How to Use</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-pink-400 mb-4">Desktop</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Click the hamburger menu in top-left corner</li>
                  <li>• Sidebar slides in from the left</li>
                  <li>• Click outside or the X button to close</li>
                  <li>• Navigation links with hover effects</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-pink-400 mb-4">Mobile</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Same hamburger menu functionality</li>
                  <li>• Touch-friendly interactions</li>
                  <li>• Backdrop blur for better UX</li>
                  <li>• Responsive design adapts to screen size</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Technical Implementation</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-black/20 rounded-xl p-4">
                <h4 className="text-lg font-bold text-pink-400 mb-2">Components</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• NewSidebar.jsx</li>
                  <li>• HamburgerToggle.jsx</li>
                  <li>• NewLayout.jsx</li>
                  <li>• NewHome.jsx</li>
                </ul>
              </div>
              <div className="bg-black/20 rounded-xl p-4">
                <h4 className="text-lg font-bold text-pink-400 mb-2">Features</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• useState for toggle logic</li>
                  <li>• useEffect for responsive behavior</li>
                  <li>• Tailwind CSS for styling</li>
                  <li>• Smooth CSS transitions</li>
                </ul>
              </div>
              <div className="bg-black/20 rounded-xl p-4">
                <h4 className="text-lg font-bold text-pink-400 mb-2">Styling</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Glassmorphism effects</li>
                  <li>• Backdrop blur</li>
                  <li>• Gradient backgrounds</li>
                  <li>• Hover animations</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Comparison */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mt-8">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Old vs New System</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-red-400 mb-4">Old System</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• Static sidebar always visible</li>
                  <li>• Takes up permanent screen space</li>
                  <li>• No mobile optimization</li>
                  <li>• Basic styling</li>
                  <li>• No backdrop effects</li>
                </ul>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-400 mb-4">New System</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• Overlay sidebar on demand</li>
                  <li>• Full screen content when closed</li>
                  <li>• Mobile-first responsive design</li>
                  <li>• Modern glassmorphism styling</li>
                  <li>• Backdrop blur and animations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NewLayout>
  );
} 