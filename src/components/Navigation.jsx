import React, { useState } from 'react'

/**
 * Simplified Navigation component for demo
 */
const Navigation = ({ onToggleSidebar, showSidebarToggle = false, user }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // Close mobile menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener('touchstart', handleClickOutside)
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('touchstart', handleClickOutside)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [mobileMenuOpen])

  // If no user, show minimal navigation
  if (!user) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="h-16 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">Prism Demo</span>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Demo Mode - No Authentication Required
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200 mobile-menu-container">
      <div className="h-16 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center">
            {/* Mobile Sidebar Toggle Button */}
            {showSidebarToggle && (
              <button
                onClick={onToggleSidebar}
                className="mr-3 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md md:hidden"
                title="Toggle sidebar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
            
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">Prism Demo</span>
            </div>

            {/* Desktop Navigation Items */}
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <button
                  className="bg-blue-100 text-blue-700 border-blue-200 px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 transition-colors border"
                  title="AI-powered conversational discovery"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.959 8.959 0 01-4.906-1.451L3 21l2.451-5.094A8.959 8.959 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
                  </svg>
                  <span>Chat</span>
                </button>
              </div>
            </div>
          </div>

          {/* User Profile and Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex flex-col text-right">
              <span className="text-sm font-medium text-gray-900">{user.name}</span>
              <span className="text-xs text-gray-500">{user.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                Demo
              </span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-3 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 touch-manipulation"
              style={{ minWidth: '44px', minHeight: '44px' }}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Open main menu"}</span>
              {mobileMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 z-50 bg-white shadow-lg mobile-menu-container">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 border-t border-gray-200">
            {/* User Info */}
            <div className="px-3 py-2 mb-2">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {user.name?.charAt(0) || user.email?.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                  <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    Demo
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Items */}
            <button
              className="bg-blue-100 text-blue-700 w-full text-left px-4 py-4 rounded-md text-base font-medium flex items-center space-x-3 transition-colors touch-manipulation"
              style={{ minHeight: '60px' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.959 8.959 0 01-4.906-1.451L3 21l2.451-5.094A8.959 8.959 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
              </svg>
              <div>
                <div>Chat</div>
                <div className="text-xs text-gray-500">AI-powered conversational discovery</div>
              </div>
            </button>
          </div>
        </div>
      )}

    </nav>
  )
}

export default Navigation