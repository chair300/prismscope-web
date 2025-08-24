import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, MessageCircle, ClipboardList, FileText, LayoutDashboard, ChevronRight } from 'lucide-react'

// Import demo components
import DemoChatInterface from './DemoChatInterface'
import DemoPriorDiscoveries from './DemoPriorDiscoveries'
import DemoInsightsReport from './DemoInsightsReport'
import DemoAdminDashboard from './DemoAdminDashboard'

const DemoIntegrated = () => {
  const { section } = useParams()
  const [activeView, setActiveView] = useState(section || 'chat')
  const [demoUser] = useState({
    name: 'Demo User',
    email: 'demo@example.com',
    organization: 'Example Company'
  })
  const navigate = useNavigate()

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Update activeView when URL parameter changes
  useEffect(() => {
    if (section && ['chat', 'discoveries', 'insights', 'admin'].includes(section)) {
      setActiveView(section)
    } else if (!section) {
      setActiveView('chat')
    }
  }, [section])

  // Handle navigation
  const handleSectionChange = (newSection) => {
    setActiveView(newSection)
    navigate(`/demo/${newSection}`)
  }


  // Demo sub-navigation items
  const demoNavItems = [
    { id: 'chat', label: 'Conversations', icon: MessageCircle, description: 'Review AI consultations' },
    { id: 'discoveries', label: 'Discoveries', icon: ClipboardList, description: 'Browse identified issues' },
    { id: 'insights', label: 'Insights Report', icon: FileText, description: 'Comprehensive analysis' },
    { id: 'admin', label: 'Admin Dashboard', icon: LayoutDashboard, description: 'Analytics overview' }
  ]


  const renderContent = () => {
    switch(activeView) {
      case 'chat':
        return <DemoChatInterface />
      
      case 'discoveries':
        return <DemoPriorDiscoveries />
      
      case 'insights':
        return <DemoInsightsReport />
      
      case 'admin':
        return <DemoAdminDashboard />
      
      default:
        return null
    }
  }

  return (
    <div className="pt-24 pb-20 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="container-custom">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link to="/" className="hover:text-gray-700 transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link to="/demo" className="hover:text-gray-700 transition-colors">
                Demo
              </Link>
            </li>
            {section && (
              <>
                <li>/</li>
                <li className="text-gray-900 font-medium">
                  {demoNavItems.find(item => item.id === activeView)?.label}
                </li>
              </>
            )}
          </ol>
        </nav>

        {/* Integrated Demo Header */}
        <div className="mb-8">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-4">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Live Demo Mode
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Experience Prismscope in Action
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore real AI consultations, discovered organizational issues, and comprehensive insights from actual assessments
            </p>
          </div>
        </div>

        {/* Demo Sub-Navigation */}
        <div className="bg-white shadow-lg rounded-xl mb-6 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {demoNavItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleSectionChange(item.id)}
                  className={`group relative flex-1 flex items-center justify-center px-6 py-4 text-sm font-medium transition-all ${
                    activeView === item.id
                      ? 'text-primary-700 border-b-2 border-primary-500 bg-primary-50/50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div className="flex items-center space-x-2 mb-1">
                      <item.icon className="w-5 h-5" />
                      <span className="hidden sm:inline">{item.label}</span>
                      <span className="sm:hidden">{item.label.split(' ')[0]}</span>
                    </div>
                    <span className="hidden md:block text-xs text-gray-500 mt-1">
                      {item.description}
                    </span>
                  </div>
                  {activeView === item.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500"></div>
                  )}
                </button>
              ))}
            </nav>
          </div>
          
          {/* User Info Bar */}
          <div className="bg-gray-50 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{demoUser.name}</p>
                <p className="text-xs text-gray-500">{demoUser.organization} • {demoUser.email}</p>
              </div>
            </div>
            <Link 
              to="/" 
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to main site
            </Link>
          </div>
        </div>

        {/* Contextual Info Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-blue-900">
                {activeView === 'chat' && 'AI Consultation Conversations'}
                {activeView === 'discoveries' && 'Organizational Issue Discovery'}
                {activeView === 'insights' && 'Comprehensive Analysis Report'}
                {activeView === 'admin' && 'Administrative Analytics'}
              </h3>
              <p className="mt-1 text-sm text-blue-700">
                {activeView === 'chat' && 'Review actual AI conversations that uncover organizational inefficiencies and identify automation opportunities.'}
                {activeView === 'discoveries' && 'Browse through identified issues from previous assessments, categorized by technical and organizational challenges.'}
                {activeView === 'insights' && 'Explore detailed analysis reports showing ROI calculations, recommendations, and implementation priorities.'}
                {activeView === 'admin' && 'View aggregated analytics and metrics from assessments across the organization.'}
              </p>
            </div>
          </div>
        </div>

        {/* Demo Content Container */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {renderContent()}
        </div>

        {/* Demo Footer with CTA */}
        <div className="mt-8 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready for Your Real Assessment?
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            This demo shows real organizational assessments in action. 
            Start your own assessment to identify inefficiencies in your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="btn-primary text-lg flex items-center justify-center"
              onClick={() => window.location.href = 'https://my.prismscope.ai'}
            >
              Start Your Assessment
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
            <Link 
              to="/#contact"
              className="btn-secondary text-lg"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DemoIntegrated