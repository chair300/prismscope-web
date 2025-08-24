import React, { useState, useRef, useEffect, useMemo } from 'react'
import ChatHeader from './chat/ChatHeader'
import ChatMessages from './chat/ChatMessages'
import ChatInput from './chat/ChatInput'

// Mock AI responses for demo
const getMockResponse = (message, conversationHistory) => {
  const lowerMessage = message.toLowerCase()
  
  // Predefined conversation flow
  if (lowerMessage.includes('email') || lowerMessage.includes('processing') || lowerMessage.includes('automation')) {
    if (conversationHistory.length <= 4) {
      return "I can see email processing is a pain point for you. Can you walk me through your current process? How many emails do you typically handle per day?"
    } else if (conversationHistory.length <= 6) {
      return "That volume definitely sounds like it could benefit from automation. What's the biggest bottleneck in your current workflow - is it categorizing emails, extracting information, or responding to them?"
    } else {
      return "Based on what you've shared, this looks like a perfect candidate for AI automation. You could potentially save 15-20 hours per week with an automated email processing system. Let me generate a detailed analysis of your situation."
    }
  }
  
  if (lowerMessage.includes('team') || lowerMessage.includes('communication') || lowerMessage.includes('collaboration')) {
    if (conversationHistory.length <= 4) {
      return "Team communication challenges can really impact productivity. What specific communication issues are you experiencing? Is it about meeting effectiveness, information sharing, or something else?"
    } else if (conversationHistory.length <= 6) {
      return "Those are common challenges many organizations face. How is this affecting your team's ability to deliver projects on time? Are there specific tools or processes you've tried already?"
    } else {
      return "This sounds like it requires both process improvements and potentially some collaboration tools. The good news is that structured communication protocols can make a huge difference. Let me analyze what we've discussed."
    }
  }
  
  if (lowerMessage.includes('data') || lowerMessage.includes('report') || lowerMessage.includes('analysis')) {
    if (conversationHistory.length <= 4) {
      return "Data management issues can be really frustrating! Tell me more about your current reporting process. How much time does your team spend on manual data work each week?"
    } else if (conversationHistory.length <= 6) {
      return "That's a significant time investment in manual work. What type of data are you working with, and what does the final output need to look like? Are there specific tools you're currently using?"
    } else {
      return "This is exactly the kind of repetitive work that automation excels at. You could likely reduce that time commitment by 80-90% with the right solution. Let me put together an assessment for you."
    }
  }
  
  if (lowerMessage.includes('customer') || lowerMessage.includes('support') || lowerMessage.includes('service')) {
    if (conversationHistory.length <= 4) {
      return "Customer service efficiency is so important! What's the main challenge - response times, ticket volume, or something else? How are you currently handling customer inquiries?"
    } else if (conversationHistory.length <= 6) {
      return "Those response time pressures can really add up. What percentage of your customer inquiries are similar or repetitive? Are there common questions that come up frequently?"
    } else {
      return "Customer service is a great area for AI assistance, especially for handling routine inquiries and improving response times. This could significantly improve both efficiency and customer satisfaction. Let me analyze your situation."
    }
  }
  
  // Default progressive responses
  const responseCount = conversationHistory.filter(m => m.role === 'assistant').length
  
  if (responseCount <= 1) {
    return "Tell me more about that. What's the biggest impact this is having on your daily work or your team's productivity?"
  } else if (responseCount <= 2) {
    return "I can see how frustrating that must be. Can you walk me through exactly what happens when you encounter this issue? What steps do you have to take?"
  } else if (responseCount <= 3) {
    return "That definitely sounds like something we can help improve. How much time would you estimate this takes away from other important work each week?"
  } else if (responseCount <= 4) {
    return "Based on what you've shared, this sounds like it could be a good fit for optimization. Have you tried any solutions for this already, or would this be the first time addressing it systematically?"
  } else {
    return "Thank you for sharing those details. I have enough information to provide you with a comprehensive assessment. Let me analyze what we've discussed and give you some specific recommendations for moving forward."
  }
}

// Mock issue detection logic
const detectIssue = (conversationHistory) => {
  const messages = conversationHistory.filter(m => m.role === 'user').map(m => m.content.toLowerCase())
  
  if (messages.some(m => m.includes('email') || m.includes('processing') || m.includes('automation'))) {
    return {
      issueId: 'demo-issue-email',
      title: 'Email Processing Automation',
      description: 'Manual email processing causing operational bottlenecks and time consumption',
      type: 'technical',
      severity: 'high',
      businessImpact: 'High - significant time spent on manual processing',
      currentState: 'Manual email processing with multiple steps',
      targetState: 'Automated email processing and routing system',
      estimatedSavings: '15-20 hours per week in manual labor'
    }
  }
  
  if (messages.some(m => m.includes('team') || m.includes('communication') || m.includes('collaboration'))) {
    return {
      issueId: 'demo-issue-communication',
      title: 'Team Communication Optimization',
      description: 'Communication inefficiencies affecting team productivity and project delivery',
      type: 'organizational',
      severity: 'medium',
      businessImpact: 'Medium - impacting project timelines and team coordination',
      currentState: 'Ad-hoc communication leading to inefficiencies',
      targetState: 'Structured communication protocols and collaboration tools',
      estimatedSavings: '20-25% improvement in project delivery times'
    }
  }
  
  if (messages.some(m => m.includes('data') || m.includes('report') || m.includes('analysis'))) {
    return {
      issueId: 'demo-issue-data',
      title: 'Data Processing Automation',
      description: 'Manual data processing and reporting consuming significant resources',
      type: 'technical',
      severity: 'high',
      businessImpact: 'High - significant time investment in manual work',
      currentState: 'Manual data processing and report generation',
      targetState: 'Automated data pipeline and reporting system',
      estimatedSavings: '80-90% reduction in manual data processing time'
    }
  }
  
  // Default issue for demo
  return {
    issueId: 'demo-issue-general',
    title: 'Workflow Optimization Opportunity',
    description: 'Process improvement opportunity identified during conversation',
    type: 'technical',
    severity: 'medium',
    businessImpact: 'Medium - opportunity for efficiency improvement',
    currentState: 'Current manual process',
    targetState: 'Optimized automated workflow',
    estimatedSavings: 'Estimated 30-40% time savings'
  }
}

// Mock assessment generation
const generateAssessment = (conversationHistory, detectedIssue) => {
  const messages = conversationHistory.filter(m => m.role === 'user').map(m => m.content.toLowerCase())
  const hasEmailKeywords = messages.some(m => m.includes('email') || m.includes('processing') || m.includes('automation'))
  const hasTeamKeywords = messages.some(m => m.includes('team') || m.includes('communication'))
  const hasDataKeywords = messages.some(m => m.includes('data') || m.includes('report') || m.includes('analysis'))
  
  let technicalScore = 50
  let processScore = 50
  let clientQualityScore = 75
  
  if (hasEmailKeywords || hasDataKeywords) {
    technicalScore = 85
    processScore = 25
  } else if (hasTeamKeywords) {
    technicalScore = 30
    processScore = 80
  }
  
  const getRecommendation = (technical, process) => {
    if (technical >= 70 && process <= 40) {
      return {
        type: 'IDEAL_CLIENT',
        title: 'Ideal Technical Solution',
        description: 'This problem is an excellent fit for AI/automation solutions with clear technical requirements and high ROI potential.',
        priority: 'high',
        color: 'green'
      }
    } else if (technical >= 50 && process <= 60) {
      return {
        type: 'GOOD_FIT',
        title: 'Good Technical Fit',
        description: 'Strong potential for technical solutions with some process considerations to address.',
        priority: 'medium',
        color: 'blue'
      }
    } else if (process >= 60) {
      return {
        type: 'PROCESS_ISSUE',
        title: 'Process-Focused Solution',
        description: 'Primary challenges appear to be organizational/process-related. Recommend addressing these before technical implementation.',
        priority: 'medium',
        color: 'yellow'
      }
    } else {
      return {
        type: 'EVALUATE',
        title: 'Requires Further Evaluation',
        description: 'Need additional information to determine the best approach for this situation.',
        priority: 'low',
        color: 'gray'
      }
    }
  }
  
  return {
    scores: {
      technical: technicalScore,
      process: processScore,
      clientQuality: clientQualityScore,
      recommendation: getRecommendation(technicalScore, processScore)
    },
    problemDescription: detectedIssue?.description || 'Workflow optimization opportunity identified during conversation',
    businessName: 'Demo Organization',
    email: 'demo@example.com'
  }
}

const ChatInterface = ({ 
  onComplete, 
  continuingSession = null,
  onSaveSession,
  onIssueDiscovered,
  onIssueIdentified,
  onSessionCreated
}) => {
  const effectiveSession = useMemo(() => continuingSession, [continuingSession])
  const inputRef = useRef(null)
  
  // Initialize session ID for demo
  const newSessionIdRef = useRef(null)
  if (!newSessionIdRef.current && !effectiveSession?.sessionId) {
    newSessionIdRef.current = `demo_session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
  
  const sessionId = effectiveSession?.sessionId || newSessionIdRef.current
  
  const [messages, setMessages] = useState(() => {
    if (effectiveSession?.conversation?.messages && effectiveSession.conversation.messages.length > 0) {
      return effectiveSession.conversation.messages
    }
    return [{
      role: 'assistant',
      content: "Hi! I'm here to help you uncover what's preventing you from doing your best work. What's frustrating you today?",
      timestamp: new Date().toISOString()
    }]
  })
  
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [issueDetected, setIssueDetected] = useState(() => {
    return !!(continuingSession?.focusIssue)
  })
  const [detectedIssue, setDetectedIssue] = useState(() => {
    return continuingSession?.focusIssue || null
  })
  
  // Handle session changes
  useEffect(() => {
    if (effectiveSession?.conversation?.messages && effectiveSession.conversation.messages.length > 0) {
      setMessages(effectiveSession.conversation.messages)
    }
    
    if (effectiveSession?.focusIssue) {
      setIssueDetected(true)
      setDetectedIssue(effectiveSession.focusIssue)
    } else {
      setIssueDetected(false)
      setDetectedIssue(null)
    }
  }, [effectiveSession?.sessionId])
  
  const addBotMessage = (content) => {
    const message = {
      role: 'assistant',
      content,
      timestamp: new Date().toISOString()
    }
    setMessages(prev => [...prev, message])
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return
    
    const userMessage = {
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date().toISOString()
    }
    
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInputValue('')
    setIsLoading(true)

    // Simulate AI processing delay
    setTimeout(() => {
      const response = getMockResponse(userMessage.content, updatedMessages)
      addBotMessage(response)
      
      // Check if we should detect an issue
      const shouldDetectIssue = updatedMessages.filter(m => m.role === 'assistant').length >= 4
      
      if (shouldDetectIssue && !issueDetected) {
        const issue = detectIssue(updatedMessages)
        setIssueDetected(true)
        setDetectedIssue(issue)
        onIssueIdentified?.(issue)
      }
      
      // Check if we should complete the assessment
      const shouldComplete = updatedMessages.filter(m => m.role === 'assistant').length >= 5
      
      if (shouldComplete && response.includes('comprehensive assessment')) {
        setTimeout(() => {
          const issue = detectIssue(updatedMessages)
          const assessment = generateAssessment(updatedMessages, issue)
          onComplete?.(assessment)
        }, 1000)
      }
      
      setIsLoading(false)
    }, 1500) // 1.5 second delay to simulate processing
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex justify-center items-start h-full p-4 bg-gray-50">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col h-[calc(100vh-8rem)]">
        {/* Chat Header */}
        <ChatHeader
          issueDetected={issueDetected}
          detectedIssue={detectedIssue}
          effectiveSession={effectiveSession}
          onSaveSession={onSaveSession}
        />

        {/* Chat Messages */}
        <ChatMessages 
          messages={messages}
          isLoading={isLoading}
          isMobile={window.innerWidth < 768}
        />

        {/* Chat Input */}
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSendMessage}
          isLoading={isLoading}
          disabled={false}
          isMobile={window.innerWidth < 768}
        />
      </div>
    </div>
  )
}

export default ChatInterface