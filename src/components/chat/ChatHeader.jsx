import React from 'react'

const ChatHeader = ({ issueDetected, detectedIssue, effectiveSession, onSaveSession }) => {
  return (
    <div className="flex-shrink-0 border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">AI Assistant</h1>
            <p className="text-sm text-gray-500">
              {issueDetected && detectedIssue 
                ? `Analyzing: ${detectedIssue.title}` 
                : 'Ready to help identify your challenges'
              }
            </p>
          </div>
        </div>
        
        {/* Status Indicators */}
        <div className="flex items-center space-x-2">
          {issueDetected && (
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                Issue Detected
              </span>
            </div>
          )}
          
          {effectiveSession?.sessionId && (
            <div className="text-xs text-gray-500 font-mono">
              Session: {effectiveSession.sessionId.slice(-8)}
            </div>
          )}
        </div>
      </div>
      
      {/* Issue Summary */}
      {issueDetected && detectedIssue && (
        <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-blue-900">
                {detectedIssue.title}
              </h3>
              <p className="text-xs text-blue-700 mt-1">
                {detectedIssue.description}
              </p>
              <div className="flex items-center mt-2 space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  detectedIssue.type === 'technical' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  {detectedIssue.type === 'technical' ? 'Technical' : 'Organizational'}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  detectedIssue.severity === 'high' 
                    ? 'bg-red-100 text-red-800' 
                    : detectedIssue.severity === 'medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {detectedIssue.severity?.toUpperCase() || 'MEDIUM'} Priority
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatHeader