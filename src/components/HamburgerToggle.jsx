import React from 'react';

const HamburgerToggle = ({ isOpen, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="p-3 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300 hover:scale-105"
      aria-label="Toggle sidebar"
    >
      <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
        <span 
          className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
            isOpen ? 'rotate-45 translate-y-1.5' : ''
          }`}
        />
        <span 
          className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span 
          className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
            isOpen ? '-rotate-45 -translate-y-1.5' : ''
          }`}
        />
      </div>
    </button>
  );
};

export default HamburgerToggle; 