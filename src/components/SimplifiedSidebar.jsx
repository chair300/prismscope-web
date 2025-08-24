import React, { useState, useEffect } from 'react'

/**
 * Simplified Sidebar component for demo
 */
const SimplifiedSidebar = ({ 
  onSelectIssue, 
  onContinueSession,
  selectedIssueId = null,
  isCollapsed = false,
  onToggle,
  refreshTrigger = 0,
  filterType = 'all',
  showNewChatButton = false,
  onStartNewChat,
  userSessions = [],
  userIssues = []
}) => {
  const [items, setItems] = useState([])

  // Combine sessions and issues for sidebar display
  useEffect(() => {
    const combinedItems = []
    
    // Add recent sessions
    userSessions.forEach(session => {
      combinedItems.push({
        type: 'session',
        id: session.sessionId,
        title: `Session ${new Date(session.conversation.startedAt).toLocaleDateString()}`,
        subtitle: `${session.conversation.totalIssues || 0} issues discovered`,
        timestamp: session.conversation.startedAt,
        data: session
      })
    })

    // Add issues
    userIssues.forEach(issue => {
      combinedItems.push({
        type: 'issue',
        id: issue.issueId,
        title: issue.title,
        subtitle: `${issue.type} • ${issue.severity} priority`,
        timestamp: issue.createdAt,
        data: issue
      })
    })

    // Sort by timestamp, most recent first
    combinedItems.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    
    setItems(combinedItems)
  }, [userSessions, userIssues, refreshTrigger])

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now - date
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffHours < 1) return 'Just now'
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  const handleItemClick = (item) => {
    if (item.type === 'session') {
      onContinueSession?.(item.data)
    } else if (item.type === 'issue') {
      // Find the session for this issue and create a focus context
      const session = userSessions.find(s => s.issues?.some(i => i.issueId === item.id))
      if (session) {
        const sessionData = {
          ...session,
          focusIssue: item.data,
          isReadOnly: true
        }
        onSelectIssue?.(sessionData)
      }
    }
  }

  return (
    <div className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transition-all duration-300 ease-in-out z-30 ${
      isCollapsed ? 'w-0 overflow-hidden' : 'w-80'
    }`}>
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Conversations</h2>
          <button
            onClick={onToggle}
            className="p-1 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        
        {/* New Chat Button */}
        {showNewChatButton && (
          <button
            onClick={onStartNewChat}
            className="w-full mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            + Start New Chat
          </button>
        )}
      </div>

      {/* Sidebar Content */}
      <div className="flex-1 overflow-y-auto">
        {items.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <div className="text-4xl mb-2">💬</div>
            <p className="text-sm">No conversations yet</p>
          </div>
        ) : (
          <div className="p-2">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`w-full text-left p-3 rounded-lg mb-2 transition-colors ${
                  selectedIssueId === item.id
                    ? 'bg-blue-100 border-blue-200 text-blue-900'
                    : 'hover:bg-gray-50 border-transparent text-gray-900'
                } border`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center mb-1">
                      <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                        item.type === 'session' ? 'bg-green-400' : 'bg-blue-400'
                      }`}></span>
                      <h3 className="text-sm font-medium truncate">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-500 truncate">
                      {item.subtitle}
                    </p>
                  </div>
                  <div className="text-xs text-gray-400 ml-2">
                    {formatTimestamp(item.timestamp)}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sidebar Footer */}
      <div className="border-t border-gray-200 p-4">
        <div className="text-xs text-gray-500 text-center">
          Demo Mode • {items.length} items
        </div>
      </div>
    </div>
  )
}

export default SimplifiedSidebar