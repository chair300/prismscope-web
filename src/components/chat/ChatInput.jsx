import React from 'react'

const ChatInput = ({ value, onChange, onSend, isLoading, disabled, isMobile }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSend()
  }

  return (
    <div className="flex-shrink-0 border-t border-gray-200 p-4">
      <form onSubmit={handleSubmit} className="flex space-x-3">
        <div className="flex-1">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={disabled ? "This conversation is read-only" : "Type your message here..."}
            disabled={disabled || isLoading}
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
              disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white'
            }`}
            rows={isMobile ? 2 : 1}
            style={{ minHeight: '40px', maxHeight: '120px' }}
          />
        </div>
        
        <button
          type="submit"
          disabled={disabled || isLoading || !value.trim()}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            disabled || isLoading || !value.trim()
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Sending</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span>Send</span>
            </div>
          )}
        </button>
      </form>
      
      {!disabled && (
        <div className="mt-2 text-xs text-gray-500">
          Press Enter to send, Shift+Enter for new line
        </div>
      )}
    </div>
  )
}

export default ChatInput