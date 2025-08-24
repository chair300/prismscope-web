import { useState } from 'react'

/**
 * Component that displays user's previous assessment issues as cards - demo version
 */
function PriorDiscoveries({ 
  userSessions = [],
  userIssues = [],
  onContinueSession, 
  onViewIssueChat, 
  compact = false 
}) {
  const [expandedItems, setExpandedItems] = useState(new Set())

  const handleContinueSession = (session) => {
    onContinueSession?.(session)
  }

  const handleViewIssueChat = (issue) => {
    // Find the session for this issue
    const session = userSessions.find(s => s.issues?.some(i => i.issueId === issue.issueId))
    if (session && onViewIssueChat) {
      onViewIssueChat({
        ...session,
        focusIssue: issue,
        isReadOnly: true
      })
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getIssueTypeColor = (type) => {
    return type === 'technical' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
  }

  const getIssueTypeLabel = (type) => {
    return type === 'technical' ? 'Technical' : 'Organizational'
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-green-100 text-green-800'
    }
  }

  const toggleExpanded = (issueId) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(issueId)) {
      newExpanded.delete(issueId)
    } else {
      newExpanded.add(issueId)
    }
    setExpandedItems(newExpanded)
  }

  if (userIssues.length === 0) {
    const containerClass = compact ? "" : "max-w-4xl mx-auto mb-8"
    const wrapperClass = compact ? "p-4" : "bg-white rounded-lg shadow-lg p-6"

    return (
      <div className={containerClass}>
        <div className={wrapperClass}>
          <div className={`text-center ${compact ? 'py-4' : 'py-8'}`}>
            {!compact && (
              <>
                <div className="text-6xl mb-4">👋</div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                 Welcome to Your Assessment Platform
                </h2>
              </>
            )}
            <p className={`text-gray-600 ${compact ? 'mb-4 text-sm' : 'mb-6'}`}>
              {compact ? 'No assessments yet.' : 'No previous assessments found. Let\'s start your first assessment to explore your business challenges and opportunities.'}
            </p>
            <button
              className={`${compact ? 'w-full' : 'px-8 py-3'} bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium`}
            >
              Start Assessment Chat
            </button>
          </div>
        </div>
      </div>
    )
  }

  const containerClass = compact ? "" : "max-w-4xl mx-auto mb-8"
  const wrapperClass = compact ? "p-4" : "bg-white rounded-lg shadow-lg p-6"

  return (
    <div className={containerClass}>
     <div className={wrapperClass}>
      <div className={`${compact ? 'mb-4' : 'flex justify-between items-center mb-6'}`}>
        {!compact && (
          <h2 className="text-xl font-semibold text-gray-900">
            Your Prior Assessments ({userIssues.length} issues from {userSessions.length} sessions)
          </h2>
        )}
        <button
          className={`${compact ? 'w-full' : ''} bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors`}
        >
          Start New Assessment
        </button>
      </div>

      <div className="space-y-4">
        {userIssues.map((issue, index) => (
          <div key={issue.issueId || index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            {/* Issue Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {issue.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getIssueTypeColor(issue.type)}`}>
                    {getIssueTypeLabel(issue.type)}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(issue.severity)}`}>
                    {issue.severity?.toUpperCase() || 'MEDIUM'} PRIORITY
                  </span>
                </div>
                <p className="text-gray-600 text-sm">
                  {issue.description}
                </p>
              </div>
              <div className="text-right text-sm text-gray-500">
                {formatDate(issue.createdAt)}
              </div>
            </div>

            {/* Business Impact */}
            {(issue.businessImpact || issue.currentState || issue.targetState) && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                {issue.businessImpact && (
                  <div className="mb-2">
                    <span className="font-medium text-gray-700">Business Impact:</span>
                    <span className="ml-2 text-gray-600">{issue.businessImpact}</span>
                  </div>
                )}
                {issue.currentState && (
                  <div className="mb-2">
                    <span className="font-medium text-gray-700">Current State:</span>
                    <span className="ml-2 text-gray-600">{issue.currentState}</span>
                  </div>
                )}
                {issue.targetState && (
                  <div className="mb-2">
                    <span className="font-medium text-gray-700">Target State:</span>
                    <span className="ml-2 text-gray-600">{issue.targetState}</span>
                  </div>
                )}
                {issue.estimatedSavings && (
                  <div>
                    <span className="font-medium text-gray-700">Estimated Savings:</span>
                    <span className="ml-2 text-gray-600">{issue.estimatedSavings}</span>
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleViewIssueChat(issue)}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
              >
                View Chat
              </button>
              <button
                onClick={() => toggleExpanded(issue.issueId)}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                {expandedItems.has(issue.issueId) ? 'Less Details' : 'More Details'}
              </button>
            </div>

            {/* Expanded Details */}
            {expandedItems.has(issue.issueId) && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Issue ID:</span>
                    <span className="ml-2 text-gray-600 font-mono text-xs">{issue.issueId}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Session ID:</span>
                    <span className="ml-2 text-gray-600 font-mono text-xs">{issue.sessionId}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Created:</span>
                    <span className="ml-2 text-gray-600">{formatDate(issue.createdAt)}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Updated:</span>
                    <span className="ml-2 text-gray-600">{formatDate(issue.updatedAt)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
     </div>
    </div>
  )
}

export default PriorDiscoveries