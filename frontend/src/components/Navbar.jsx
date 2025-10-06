import React from 'react';
import { Home, Settings, Scissors, BarChart3 } from 'lucide-react';

// Mock Link component for demo - replace with your actual react-router-dom Link
const Link = ({ to, children, className, ...props }) => (
  <a href={to} className={className} {...props}>{children}</a>
);

const Navbar = () => {
  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <Scissors className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LinkSnip
              </h1>
              <p className="text-xs text-gray-500 -mt-1">URL Shortener</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            <Link
              to="/"
              className="group flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
            >
              <Home className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            
            <Link
              to="/dashboard"
              className="group flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 font-medium"
            >
              <BarChart3 className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>

            {/* Optional Settings/Profile Button */}
            <div className="ml-2 pl-2 border-l border-gray-200">
              <button className="group flex items-center justify-center w-10 h-10 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200">
                <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Indicator */}
      <div className="sm:hidden px-4 pb-2">
        <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
          <span className="flex items-center space-x-1">
            <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
            <span>Shorten URLs</span>
          </span>
          <span className="flex items-center space-x-1">
            <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
            <span>Track Analytics</span>
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;