import React, { useEffect, useRef } from 'react'

const ChatMessages = ({ messages, isLoading, isMobile }) => {
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => (
        <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${message.role === 'user' ? 'order-1' : 'order-2'}`}>
            {/* Message bubble */}
            <div
              className={`px-4 py-2 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap break-words">
                {message.content}
              </p>
            </div>
            
            {/* Timestamp */}
            <div className={`text-xs text-gray-500 mt-1 ${
              message.role === 'user' ? 'text-right' : 'text-left'
            }`}>
              {formatTimestamp(message.timestamp)}
            </div>
          </div>
          
          {/* Avatar */}
          <div className={`flex-shrink-0 ${
            message.role === 'user' ? 'order-2 ml-2' : 'order-1 mr-2'
          }`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              message.role === 'user' 
                ? 'bg-blue-600' 
                : 'bg-gray-300'
            }`}>
              <span className="text-white text-sm font-medium">
                {message.role === 'user' ? 'U' : 'AI'}
              </span>
            </div>
          </div>
        </div>
      ))}
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-start">
          <div className="flex-shrink-0 mr-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">AI</span>
            </div>
          </div>
          <div className="max-w-xs lg:max-w-md xl:max-w-lg">
            <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  )
}

export default ChatMessages