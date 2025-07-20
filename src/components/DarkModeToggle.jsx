import React, { useState, useEffect } from 'react';

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  // Initialize theme from localStorage and apply to document
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Use saved theme, fallback to system preference, then light mode
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    setIsDark(theme === 'dark');
    applyTheme(theme);
  }, []);

  // Apply theme to document and save to localStorage
  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  };

  // Toggle between light and dark modes
  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    applyTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-600 hover:scale-110 group"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Sun Icon (Light Mode) */}
      <span 
        className={`text-yellow-500 text-xl transition-all duration-300 ${
          isDark ? 'opacity-0 scale-0 rotate-90' : 'opacity-100 scale-100 rotate-0'
        }`}
      >
        🌞
      </span>
      
      {/* Moon Icon (Dark Mode) */}
      <span 
        className={`text-blue-400 text-xl transition-all duration-300 absolute inset-0 flex items-center justify-center ${
          isDark ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 -rotate-90'
        }`}
      >
        🌙
      </span>
    </button>
  );
};

export default DarkModeToggle; 