import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const DemoHeader = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Chat', href: '/', current: location.pathname === '/' },
    { name: 'Prior Discoveries', href: '/discoveries', current: location.pathname === '/discoveries' },
    { name: 'Insights Report', href: '/insights', current: location.pathname === '/insights' },
    { name: 'Admin Dashboard', href: '/admin', current: location.pathname === '/admin' },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="h-8 w-8 bg-prism-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">
                Prism AI Consultant
              </span>
              <span className="ml-2 px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
                DEMO
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 ${
                  item.current
                    ? 'text-prism-blue border-b-2 border-prism-blue'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Demo User */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-medium text-sm">DU</span>
              </div>
              <div className="text-sm">
                <div className="font-medium text-gray-900">Demo User</div>
                <div className="text-gray-500">demo@example.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-prism-blue to-prism-dark-blue">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-2 text-center">
            <p className="text-white text-sm">
              <span className="font-medium">Interactive Demo</span> 
              {' • '}
              This demo shows real organizational assessment data from actual Prism sessions
              {' • '}
              <span className="font-medium">Explore all features without limits</span>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DemoHeader;