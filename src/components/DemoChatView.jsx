import React from 'react'

// Simple chat view for demo
const DemoChatView = ({ sessions }) => {
  const [selectedSession, setSelectedSession] = React.useState(sessions[0])

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getCategoryIcon = (category) => {
    return category === 'technical' ? '⚙️' : '👥'
  }

  const getCategoryColor = (category) => {
    return category === 'technical' 
      ? 'bg-blue-100 text-blue-800' 
      : 'bg-purple-100 text-purple-800'
  }

  return (
    <div className="flex h-[600px] bg-gray-50 rounded-lg overflow-hidden">
      {/* Sessions Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Previous Sessions</h2>
          <p className="text-sm text-gray-500">Select a conversation to review</p>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-2">
            {sessions.map((session) => (
              <button
                key={session.sessionId}
                onClick={() => setSelectedSession(session)}
                className={`w-full text-left p-3 rounded-lg mb-2 transition-colors duration-200 ${
                  selectedSession?.sessionId === session.sessionId
                    ? 'bg-primary-50 border border-primary-200'
                    : 'hover:bg-gray-50 border border-transparent'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-lg">{getCategoryIcon(session.category)}</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(session.category)}`}>
                        {session.category}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {session.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(session.startedAt)}
                    </p>
                    <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500">
                      <span>{session.issuesCount} issue{session.issuesCount !== 1 ? 's' : ''}</span>
                      <span>•</span>
                      <span className="capitalize">{session.status}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Content */}
      <div className="flex-1 flex flex-col">
        {selectedSession && (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                    <span>{getCategoryIcon(selectedSession.category)}</span>
                    <span>{selectedSession.title}</span>
                  </h3>
                  <p className="text-sm text-gray-500">
                    Started {formatDate(selectedSession.startedAt)} • {selectedSession.conversation.messageCount} messages
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedSession.category)}`}>
                    {selectedSession.category === 'technical' ? '⚙️ Technical' : '👥 Organizational'}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    ✓ {selectedSession.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {selectedSession.conversation.messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-3xl rounded-lg px-4 py-3 ${
                      message.role === 'user' 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-white text-gray-900 border border-gray-200'
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </div>
                    <div className={`text-xs mt-2 ${
                      message.role === 'user' ? 'text-primary-100' : 'text-gray-500'
                    }`}>
                      {formatTimestamp(message.timestamp)}
                      {message.hasAnalysis && (
                        <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          📊 Analysis Generated
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Demo Info Footer */}
            <div className="bg-blue-50 border-t border-blue-200 p-3">
              <div className="text-center">
                <p className="text-sm text-blue-700">
                  <span className="font-medium">Demo Mode:</span> This shows how Prismscope analyzes organizational challenges
                  {selectedSession.category === 'technical' && (
                    <span> and identifies technical automation opportunities</span>
                  )}
                  {selectedSession.category === 'organizational' && (
                    <span> and uncovers communication and process issues</span>
                  )}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default DemoChatView