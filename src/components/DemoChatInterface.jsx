import React, { useState, useRef, useEffect } from 'react';
import { demoDataService } from '../services/demo/demoDataService';

const DemoChatInterface = () => {
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const userSessions = await demoDataService.getUserSessions();
        setSessions(userSessions);
        
        // Auto-select the most recent session
        if (userSessions.length > 0) {
          const sessionWithMessages = await demoDataService.getSessionWithMessages(userSessions[0].sessionId);
          setSelectedSession(sessionWithMessages);
        }
      } catch (error) {
        console.error('Failed to load sessions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSessions();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [selectedSession]);

  const handleSessionSelect = async (sessionId) => {
    try {
      const sessionWithMessages = await demoDataService.getSessionWithMessages(sessionId);
      setSelectedSession(sessionWithMessages);
    } catch (error) {
      console.error('Failed to load session:', error);
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryIcon = (category) => {
    return category === 'technical' ? '⚙️' : '👥';
  };

  const getCategoryColor = (category) => {
    return category === 'technical' 
      ? 'bg-blue-100 text-blue-800' 
      : 'bg-purple-100 text-purple-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-prism-blue mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading conversations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sessions Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Previous Sessions</h2>
          <p className="text-sm text-gray-500">Select a conversation to review</p>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {sessions.length === 0 ? (
            <div className="p-4 text-center">
              <p className="text-gray-500">No sessions found</p>
            </div>
          ) : (
            <div className="p-2">
              {sessions.map((session) => (
                <button
                  key={session.sessionId}
                  onClick={() => handleSessionSelect(session.sessionId)}
                  className={`w-full text-left p-3 rounded-lg mb-2 transition-colors duration-200 ${
                    selectedSession?.sessionId === session.sessionId
                      ? 'bg-prism-light-blue border border-prism-blue'
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
          )}
        </div>
      </div>

      {/* Chat Content */}
      <div className="flex-1 flex flex-col">
        {!selectedSession ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Select a Session to Review
              </h3>
              <p className="text-gray-500">
                Choose a conversation from the sidebar to see the full AI consultation
              </p>
            </div>
          </div>
        ) : (
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
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedSession.conversation.messages.map((message, index) => (
                <div
                  key={message.id || index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-3xl ${
                      message.role === 'user' 
                        ? 'message-user' 
                        : 'message-assistant'
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </div>
                    <div className={`text-xs mt-2 ${
                      message.role === 'user' ? 'text-blue-700' : 'text-gray-500'
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
              <div ref={messagesEndRef} />
            </div>

            {/* Demo Info Footer */}
            <div className="bg-prism-light-blue border-t border-prism-blue p-4">
              <div className="text-center">
                <p className="text-sm text-prism-dark-blue">
                  <span className="font-medium">Demo Mode:</span> This conversation shows how Prism analyzes organizational challenges
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
  );
};

export default DemoChatInterface;