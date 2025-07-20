import React from 'react';
import ResponsiveLayout from './ResponsiveLayout';

const ResponsiveApp = () => {
  return (
    <ResponsiveLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to Responsive App</h1>
          <p className="text-white/70">This is a simple example of how to integrate the responsive sidebar.</p>
        </div>

        {/* Content */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-white mb-4">Getting Started</h2>
          <div className="space-y-4 text-white/80">
            <p>
              This responsive sidebar automatically adapts to different screen sizes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Mobile/Tablet:</strong> Hamburger menu appears, sidebar slides in/out</li>
              <li><strong>Desktop:</strong> Sidebar is always visible, no hamburger menu</li>
              <li><strong>Glassmorphism:</strong> Beautiful semi-transparent design with blur effects</li>
              <li><strong>Smooth Animations:</strong> 300ms transitions for all interactions</li>
            </ul>
          </div>
        </div>

        {/* Code Example */}
        <div className="mt-8 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-white mb-4">Usage Example</h2>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-green-400 text-sm">
{`import React from 'react';
import ResponsiveLayout from './components/ResponsiveLayout';

const App = () => {
  return (
    <ResponsiveLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-white">
          Your Content Here
        </h1>
        {/* Your page content */}
      </div>
    </ResponsiveLayout>
  );
};

export default App;`}
            </pre>
          </div>
        </div>
      </div>
    </ResponsiveLayout>
  );
};

export default ResponsiveApp; 