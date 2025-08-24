import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Play, MessageCircle, BarChart3, Users } from 'lucide-react'
import ChatInterface from './ChatInterface'
import ResultsDashboard from './ResultsDashboard'
import PriorDiscoveries from './PriorDiscoveries'

const DemoPage = () => {
  const [currentView, setCurrentView] = useState('intro')
  const [assessment, setAssessment] = useState(null)
  const [demoIssue, setDemoIssue] = useState(null)

  // Mock prior sessions data for demo
  const mockSessions = [
    {
      sessionId: 'demo_session_1',
      created: '2024-01-15T10:30:00Z',
      lastUpdated: '2024-01-15T11:15:00Z',
      status: 'completed',
      focusIssue: {
        issueId: 'demo-issue-email-completed',
        title: 'Email Processing Automation',
        description: 'Manual email processing causing operational bottlenecks',
        type: 'technical',
        severity: 'high'
      },
      conversation: {
        messages: [
          { role: 'assistant', content: "Hi! I'm here to help you uncover what's preventing you from doing your best work. What's frustrating you today?", timestamp: '2024-01-15T10:30:00Z' },
          { role: 'user', content: 'Our team spends way too much time processing emails manually. It\'s really slowing us down.', timestamp: '2024-01-15T10:31:00Z' },
          { role: 'assistant', content: 'I can see email processing is a pain point for you. Can you walk me through your current process? How many emails do you typically handle per day?', timestamp: '2024-01-15T10:31:30Z' },
          { role: 'user', content: 'We probably handle 200-300 emails daily. Each one needs to be categorized, assigned to the right person, and tracked.', timestamp: '2024-01-15T10:32:00Z' },
          { role: 'assistant', content: 'That volume definitely sounds like it could benefit from automation. This looks like a perfect candidate for AI automation. Let me generate a detailed analysis of your situation.', timestamp: '2024-01-15T10:33:00Z' }
        ]
      }
    },
    {
      sessionId: 'demo_session_2',
      created: '2024-01-12T14:20:00Z',
      lastUpdated: '2024-01-12T14:45:00Z',
      status: 'completed',
      focusIssue: {
        issueId: 'demo-issue-communication',
        title: 'Team Communication Optimization',
        description: 'Communication inefficiencies affecting team productivity',
        type: 'organizational',
        severity: 'medium'
      },
      conversation: {
        messages: [
          { role: 'assistant', content: "Hi! I'm here to help you uncover what's preventing you from doing your best work. What's frustrating you today?", timestamp: '2024-01-12T14:20:00Z' },
          { role: 'user', content: 'Our team communication is really disorganized. Information gets lost and meetings feel unproductive.', timestamp: '2024-01-12T14:21:00Z' },
          { role: 'assistant', content: 'Team communication challenges can really impact productivity. What specific communication issues are you experiencing?', timestamp: '2024-01-12T14:21:30Z' }
        ]
      }
    }
  ]

  const handleCompleteAssessment = (assessmentData) => {
    setAssessment(assessmentData)
    setCurrentView('results')
  }

  const handleIssueIdentified = (issue) => {
    setDemoIssue(issue)
  }

  const handleStartDemo = () => {
    setCurrentView('chat')
  }

  const handleViewResults = () => {
    // Generate mock assessment for demo
    const mockAssessment = {
      scores: {
        technical: 85,
        process: 25,
        clientQuality: 80,
        recommendation: {
          type: 'IDEAL_CLIENT',
          title: 'Ideal Technical Solution',
          description: 'This problem is an excellent fit for AI/automation solutions with clear technical requirements and high ROI potential.',
          priority: 'high',
          color: 'green'
        }
      },
      problemDescription: 'Email processing automation opportunity identified',
      businessName: 'Demo Organization',
      email: 'demo@example.com'
    }
    setAssessment(mockAssessment)
    setCurrentView('results')
  }

  const handleViewHistory = () => {
    setCurrentView('history')
  }

  if (currentView === 'chat') {
    return (
      <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
        <div className="container-custom">
          <Link to="/demo" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Demo Overview
          </Link>
          <ChatInterface 
            onComplete={handleCompleteAssessment}
            onIssueIdentified={handleIssueIdentified}
          />
        </div>
      </div>
    )
  }

  if (currentView === 'results' && assessment) {
    return (
      <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
        <div className="container-custom">
          <Link to="/demo" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Demo Overview
          </Link>
          <ResultsDashboard assessment={assessment} />
        </div>
      </div>
    )
  }

  if (currentView === 'history') {
    return (
      <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
        <div className="container-custom">
          <Link to="/demo" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Demo Overview
          </Link>
          <PriorDiscoveries 
            sessions={mockSessions}
            onContinueSession={(session) => {
              console.log('Continuing session:', session)
              setCurrentView('chat')
            }}
            onViewAssessment={(session) => {
              const mockAssessment = {
                scores: {
                  technical: 85,
                  process: 25,
                  clientQuality: 80,
                  recommendation: {
                    type: 'IDEAL_CLIENT',
                    title: 'Ideal Technical Solution',
                    description: 'This problem is an excellent fit for AI/automation solutions.',
                    priority: 'high',
                    color: 'green'
                  }
                },
                problemDescription: session.focusIssue?.description || 'Demo assessment',
                businessName: 'Demo Organization',
                email: 'demo@example.com'
              }
              setAssessment(mockAssessment)
              setCurrentView('results')
            }}
          />
        </div>
      </div>
    )
  }

  // Demo introduction view
  return (
    <div className="pt-32 pb-20 bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Interactive Demo
            </span>
            <br />
            Experience Prismscope in Action
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Try our AI-powered organizational assessment system with realistic sample conversations and see how we identify inefficiencies and calculate ROI.
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            <Play className="w-4 h-4 mr-2" />
            No registration required • Fully interactive demo
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center mb-6">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">AI-Powered Chat</h3>
            <p className="text-gray-600 mb-6">
              Experience our conversational AI that asks the right questions to uncover organizational inefficiencies and bottlenecks.
            </p>
            <button 
              onClick={handleStartDemo}
              className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-primary-700 hover:to-accent-700 transition-colors duration-200"
            >
              Start Interactive Chat
            </button>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-6">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Assessment Results</h3>
            <p className="text-gray-600 mb-6">
              See how we analyze conversations and generate comprehensive assessments with technical fit scoring and ROI calculations.
            </p>
            <button 
              onClick={handleViewResults}
              className="w-full border-2 border-primary-600 text-primary-600 py-3 px-6 rounded-lg font-semibold hover:bg-primary-50 transition-colors duration-200"
            >
              View Sample Results
            </button>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Session History</h3>
            <p className="text-gray-600 mb-6">
              Explore how we track multiple conversations and issues over time, building a comprehensive organizational intelligence profile.
            </p>
            <button 
              onClick={handleViewHistory}
              className="w-full border-2 border-primary-600 text-primary-600 py-3 px-6 rounded-lg font-semibold hover:bg-primary-50 transition-colors duration-200"
            >
              Browse Sample Sessions
            </button>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready for Your Real Assessment?
            </h3>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
              This demo shows you exactly how our process works. When you're ready, start your actual organizational assessment to identify real opportunities in your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="btn-primary text-lg flex items-center justify-center"
                onClick={() => window.location.href = 'https://my.prismscope.ai'}
              >
                Start Your Real Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
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
    </div>
  )
}

export default DemoPage