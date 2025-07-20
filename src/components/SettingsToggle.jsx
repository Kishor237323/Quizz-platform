import React, { useState, useEffect } from 'react';

const SettingsToggle = ({ isDark, onToggle, label }) => {
  return (
    <div className="flex items-center justify-between py-4">
      <span className="text-gray-700 dark:text-gray-300 font-medium">{label}</span>
      
      <button
        onClick={onToggle}
        className={`relative w-16 h-8 rounded-full transition-all duration-300 ease-in-out ${
          isDark 
            ? 'bg-gray-800 border-2 border-gray-600' 
            : 'bg-blue-500 border-2 border-blue-400'
        }`}
        aria-label={`Toggle ${label}`}
      >
        {/* Toggle Handle */}
        <div 
          className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ease-in-out ${
            isDark ? 'translate-x-8' : 'translate-x-0'
          }`}
        >
          {/* Sun Icon (Light Mode) */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isDark ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
          }`}>
            <span className="text-yellow-500 text-xs">☀️</span>
          </div>
          
          {/* Moon Icon (Dark Mode) */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isDark ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}>
            <span className="text-blue-600 text-xs">🌙</span>
          </div>
        </div>
        
        {/* Background Icons */}
        <div className="absolute inset-0 flex items-center justify-between px-1">
          {/* Sun in background (left side) */}
          <div className={`transition-all duration-300 ${
            isDark ? 'opacity-0' : 'opacity-100'
          }`}>
            <span className="text-yellow-400 text-xs">☀️</span>
          </div>
          
          {/* Stars and Moon in background (right side) */}
          <div className={`flex items-center space-x-1 transition-all duration-300 ${
            isDark ? 'opacity-100' : 'opacity-0'
          }`}>
           
       
          </div>
        </div>
      </button>
    </div>
  );
};

export default SettingsToggle; 