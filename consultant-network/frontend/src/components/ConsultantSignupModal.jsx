import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, CheckCircle, ArrowRight, Users, Briefcase, DollarSign, Upload, FileText, Github, Linkedin, CreditCard, Loader2 } from 'lucide-react'
import { getOAuthUrl } from '../services/oauth'
import apiService, { ApiError } from '../services/api'

const ConsultantSignupModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    // OAuth auto-populated fields will be set here
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    company: '',
    website: '',
    linkedInUsername: '',
    githubUsername: '',
    expertise: [],
    industries: [],
    yearsExperience: '',
    projectsCompleted: '',
    certifications: '',
    message: '',
    resume: null
  })
  
  const [isDragging, setIsDragging] = useState(false)
  const [oauthProvider, setOauthProvider] = useState(null)
  const [populatedFields, setPopulatedFields] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [validationErrors, setValidationErrors] = useState({})
  const [partnershipType, setPartnershipType] = useState('expert')
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const fileInputRef = useRef(null)
  const navigate = useNavigate()

  // Check for OAuth data when modal opens
  useEffect(() => {
    if (isOpen) {
      const oauthData = sessionStorage.getItem('oauth_user_data')
      if (oauthData) {
        try {
          const { provider, data } = JSON.parse(oauthData)
          
          // Populate form with OAuth data
          const populated = Object.keys(data).filter(key => data[key])
          
          setFormData(prev => ({
            ...prev,
            ...data,
            // Preserve any existing data that OAuth doesn't provide
            location: prev.location,
            expertise: prev.expertise,
            industries: prev.industries,
            yearsExperience: prev.yearsExperience,
            projectsCompleted: prev.projectsCompleted,
            certifications: prev.certifications,
            resume: prev.resume,
            phone: prev.phone,
            message: prev.message || `Auto-populated via ${provider.charAt(0).toUpperCase() + provider.slice(1)} OAuth`
          }))
          
          setOauthProvider(provider)
          setPopulatedFields(populated)
          
          // Clear OAuth data after use
          sessionStorage.removeItem('oauth_user_data')
          
          console.log(`Form populated with ${provider} OAuth data:`, data)
        } catch (error) {
          console.error('Error parsing OAuth data:', error)
        }
      }
    }
  }, [isOpen])

  const expertiseOptions = [
    'Machine Learning/AI',
    'GenAI/LLMs',
    'RPA (Robotic Process Automation)',
    'Workflow Automation',
    'Data Science/Analytics',
    'Computer Vision',
    'NLP (Natural Language Processing)',
    'Cloud AI Platforms',
    'AI Strategy Consulting',
    'Change Management'
  ]

  const industryOptions = [
    'Healthcare',
    'Finance/Banking',
    'Retail/E-commerce',
    'Manufacturing',
    'Technology',
    'Government/Public Sector',
    'Education',
    'Energy/Utilities',
    'Transportation/Logistics',
    'Other'
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCheckboxChange = (field, value) => {
    setFormData(prev => {
      const currentSelection = prev[field]
      
      // If unchecking, always allow
      if (currentSelection.includes(value)) {
        return {
          ...prev,
          [field]: currentSelection.filter(item => item !== value)
        }
      }
      
      // Check maximum limits when adding
      const maxLimits = {
        expertise: 2,
        industries: 3
      }
      
      const maxLimit = maxLimits[field]
      if (maxLimit && currentSelection.length >= maxLimit) {
        // Don't add if at max capacity
        return prev
      }
      
      return {
        ...prev,
        [field]: [...currentSelection, value]
      }
    })
  }

  const validateForm = () => {
    const errors = {}
    
    // Only validate format, not require fields
    
    // Email validation if provided
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }
    
    // URL validation if provided
    const urlRegex = /^https?:\/\/.+\..+/
    if (formData.website && !urlRegex.test(formData.website)) {
      errors.website = 'Please enter a valid URL (must start with http:// or https://)'
    }
    
    // Check expertise maximum limit
    if (formData.expertise.length > 2) errors.expertise = 'Select maximum 2 areas of expertise'
    
    // Check industries maximum limit
    if (formData.industries.length > 3) errors.industries = 'Select maximum 3 industries'
    
    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Clear previous errors
    setSubmitError('')
    setValidationErrors({})
    
    // Validate form
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Get user's IP address
      let ipAddress = 'unknown'
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json')
        const ipData = await ipResponse.json()
        ipAddress = ipData.ip
      } catch (error) {
        console.warn('Could not get IP address:', error)
      }
      
      // Submit consultant application with timestamp and IP
      console.log('Submitting application:', formData)
      const response = await apiService.submitConsultantApplication({
        ...formData,
        linkedIn: formData.linkedInUsername ? `https://linkedin.com/in/${formData.linkedInUsername}` : '',
        github: formData.githubUsername ? `https://github.com/${formData.githubUsername}` : '',
        partnershipType,
        oauthProvider,
        applicationDate: new Date().toISOString(),
        timestamp: new Date().toISOString(),
        ipAddress: ipAddress,
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'direct'
      })
      
      if (response.success && response.data) {
        console.log('Application submitted successfully:', response.data)
        
        // Show thank you state
        setHasSubmitted(true)
        
        // Wait a moment before redirecting
        setTimeout(() => {
          navigate(`/thank-you?consultantId=${response.data.consultant._id}`)
          onClose()
        }, 3000)
      } else {
        throw new Error(response.message || 'Failed to submit application')
      }
    } catch (error) {
      console.error('Application submission error:', error)
      
      if (error instanceof ApiError) {
        if (error.isValidationError()) {
          // Handle validation errors from backend
          const backendErrors = {}
          if (error.details?.details) {
            error.details.details.forEach(detail => {
              backendErrors[detail.field] = detail.message
            })
          }
          setValidationErrors(backendErrors)
          setSubmitError('Please fix the validation errors below')
        } else {
          setSubmitError(error.message || 'Failed to submit application. Please try again.')
        }
      } else {
        setSubmitError('Network error. Please check your connection and try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOAuthLogin = (provider) => {
    try {
      console.log(`Starting OAuth login with ${provider}`)
      
      // Get OAuth URL from our service
      const oauthUrl = getOAuthUrl(provider)
      
      // Redirect to OAuth provider
      window.location.href = oauthUrl
    } catch (error) {
      console.error('OAuth login error:', error)
      alert(`OAuth login failed: ${error.message}`)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFileSelect(files[0])
    }
  }

  const handleFileSelect = (file) => {
    if (file && (file.type === 'application/pdf' || 
                 file.type === 'application/msword' || 
                 file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setFormData(prev => ({ ...prev, resume: file }))
    } else {
      alert('Please upload a PDF or Word document')
    }
  }

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0])
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-primary-600 to-accent-600 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold mb-2">Join Our AI Consultant Network</h2>
              <p className="text-white/90">Partner with Prismscope to deliver high-value AI implementations</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* OAuth Login Section */}
        <div className="p-6 border-b">
          <div className="text-center mb-4">
            <p className="text-gray-600 mb-4">Sign up quickly with your professional account - we'll automatically fill in your information</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                type="button"
                onClick={() => handleOAuthLogin('linkedin')}
                className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-[#0077B5]" />
                <span className="text-sm font-medium">LinkedIn</span>
              </button>
              <button
                type="button"
                onClick={() => handleOAuthLogin('google')}
                className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-sm font-medium">Google</span>
              </button>
              <button
                type="button"
                onClick={() => handleOAuthLogin('microsoft')}
                className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#F25022" d="M11.4 11.4H1V1h10.4v10.4z"/>
                  <path fill="#7FBA00" d="M23 11.4H12.6V1H23v10.4z"/>
                  <path fill="#00A4EF" d="M11.4 23H1V12.6h10.4V23z"/>
                  <path fill="#FFB900" d="M23 23H12.6V12.6H23V23z"/>
                </svg>
                <span className="text-sm font-medium">Microsoft</span>
              </button>
              <button
                type="button"
                onClick={() => handleOAuthLogin('github')}
                className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Github className="w-5 h-5 text-gray-900" />
                <span className="text-sm font-medium">GitHub</span>
              </button>
            </div>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or fill out the form below</span>
              </div>
            </div>
          </div>
        </div>

        {/* Partnership Type Tabs */}
        <div className="bg-gradient-to-r from-primary-50 to-accent-50 p-6 border-b">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose Your Partnership Type</h3>
            <p className="text-gray-600">Select the partnership model that best fits your organization</p>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex bg-white rounded-lg p-1 max-w-2xl mx-auto mb-6">
            <button
              type="button"
              onClick={() => setPartnershipType('expert')}
              className={`flex-1 flex items-center justify-center py-3 px-3 rounded-md text-sm font-medium transition-colors ${
                partnershipType === 'expert'
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Users className="w-4 h-4 mr-2" />
              Expert Network
            </button>
            <button
              type="button"
              onClick={() => setPartnershipType('channel')}
              className={`flex-1 flex items-center justify-center py-3 px-3 rounded-md text-sm font-medium transition-colors ${
                partnershipType === 'channel'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Briefcase className="w-4 h-4 mr-2" />
              Channel Partner
            </button>
            <button
              type="button"
              onClick={() => setPartnershipType('solution')}
              className={`flex-1 flex items-center justify-center py-3 px-3 rounded-md text-sm font-medium transition-colors ${
                partnershipType === 'solution'
                  ? 'bg-green-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Star className="w-4 h-4 mr-2" />
              Solution Provider
            </button>
          </div>

          {/* Tab Content */}
          <div className="max-w-lg mx-auto">
            {partnershipType === 'expert' ? (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-primary-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Expert Consultant Network</h4>
                  <p className="text-gray-600 mb-4">For individual consultants and specialized firms</p>
                </div>
                
                {/* Two Tracks */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-2">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <h5 className="font-semibold text-gray-900 text-sm">Builders/Engineers</h5>
                    </div>
                    <p className="text-xs text-gray-600">Technical implementation specialists, AI/ML engineers, automation developers</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-2">
                        <Users className="w-4 h-4 text-green-600" />
                      </div>
                      <h5 className="font-semibold text-gray-900 text-sm">Organizational Experts</h5>
                    </div>
                    <p className="text-xs text-gray-600">Traditional consultants, change management, process optimization specialists</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm text-gray-700 mb-4">
                  <p>• Pre-qualified leads with completed assessments</p>
                  <p>• Clear project scope and ROI calculations</p>
                  <p>• Premium project fees for AI implementations</p>
                  <p>• Ongoing support from Prismscope team</p>
                </div>
                <div className="bg-primary-50 rounded-lg p-3">
                  <p className="text-primary-800 font-semibold">One-time $99 vetting fee</p>
                  <p className="text-primary-600 text-sm">Background verification & network onboarding</p>
                </div>
              </div>
            ) : partnershipType === 'channel' ? (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Strategic Channel Partner</h4>
                  <p className="text-gray-600 mb-4">For technology vendors, system integrators, and solution providers</p>
                  <div className="space-y-2 text-sm text-gray-700 mb-4">
                    <p>• Resell Prismscope services with attractive margins and client tracking keys</p>
                    <p>• Receive qualified referrals for your solutions</p>
                    <p>• Bi-directional revenue sharing model</p>
                    <p>• Mutual growth through strategic partnership</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-blue-800 font-semibold">Revenue sharing program</p>
                    <p className="text-blue-600 text-sm">Custom partnership terms available</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Star className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Solution Provider Program</h4>
                  <p className="text-gray-600 mb-4">For technology vendors and specialized solution providers</p>
                  <div className="space-y-2 text-sm text-gray-700 mb-4">
                    <p>• Featured product recommendations to qualified clients</p>
                    <p>• Pre-assessed clients with validated use cases</p>
                    <p>• Co-marketing and joint go-to-market strategies</p>
                    <p>• Expert consultant support for implementations</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-green-800 font-semibold">Partnership program</p>
                    <p className="text-green-600 text-sm">Best fit for AI/ML platforms and automation tools</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Thank You State */}
        {hasSubmitted ? (
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Thank You for Your Application!</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We've received your application and will review it shortly. 
              You'll receive an email confirmation within the next 24-48 hours.
            </p>
            <div className="bg-primary-50 rounded-lg p-6 max-w-lg mx-auto">
              <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
              <div className="space-y-2 text-sm text-gray-700 text-left">
                <p>• Our team will review your application</p>
                <p>• If approved, you'll receive an onboarding email</p>
                <p>• You'll get access to our consultant dashboard</p>
                <p>• Start receiving matched opportunities immediately</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-6">Redirecting to confirmation page...</p>
          </div>
        ) : (
        /* Form */
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Personal Information
              {oauthProvider && (
                <span className="ml-3 text-sm font-normal text-green-600">
                  ✓ Populated from {oauthProvider.charAt(0).toUpperCase() + oauthProvider.slice(1)}
                </span>
              )}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    validationErrors.firstName ? 'border-red-300 bg-red-50' :
                    populatedFields.includes('firstName') ? 'border-green-300 bg-green-50' : 'border-gray-300'
                  }`}
                />
                {validationErrors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    validationErrors.lastName ? 'border-red-300 bg-red-50' :
                    populatedFields.includes('lastName') ? 'border-green-300 bg-green-50' : 'border-gray-300'
                  }`}
                />
                {validationErrors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.lastName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    populatedFields.includes('email') ? 'border-green-300 bg-green-50' : 'border-gray-300'
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location (City, Country)
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., New York, USA"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    populatedFields.includes('location') ? 'border-green-300 bg-green-50' : 'border-gray-300'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Information</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company/Consultancy Name
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn Profile
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md">
                    linkedin.com/in/
                  </span>
                  <input
                    type="text"
                    name="linkedInUsername"
                    value={formData.linkedInUsername}
                    onChange={handleInputChange}
                    placeholder="username"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GitHub Profile
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md">
                    github.com/
                  </span>
                  <input
                    type="text"
                    name="githubUsername"
                    value={formData.githubUsername}
                    onChange={handleInputChange}
                    placeholder="username"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Years of Experience
                </label>
                <select
                  name="yearsExperience"
                  value={formData.yearsExperience}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select...</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>
            </div>
          </div>

          {/* Expertise Areas */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Areas of Expertise <span className="text-sm font-normal text-gray-600">(Select up to 2)</span>
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {expertiseOptions.map(option => {
                const isChecked = formData.expertise.includes(option)
                const isDisabled = !isChecked && formData.expertise.length >= 2
                return (
                  <label 
                    key={option} 
                    className={`flex items-center space-x-2 ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => !isDisabled && handleCheckboxChange('expertise', option)}
                      disabled={isDisabled}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Industry Experience */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Industry Experience <span className="text-sm font-normal text-gray-600">(Select up to 3)</span>
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {industryOptions.map(option => {
                const isChecked = formData.industries.includes(option)
                const isDisabled = !isChecked && formData.industries.length >= 3
                return (
                  <label 
                    key={option} 
                    className={`flex items-center space-x-2 ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => !isDisabled && handleCheckboxChange('industries', option)}
                      disabled={isDisabled}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Resume Upload */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Resume/CV Upload</h3>
            <div
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileInputChange}
                className="hidden"
              />
              
              {formData.resume ? (
                <div className="space-y-3">
                  <FileText className="w-12 h-12 mx-auto text-primary-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{formData.resume.name}</p>
                    <p className="text-xs text-gray-500">
                      {(formData.resume.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, resume: null }))}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Remove file
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Upload className="w-12 h-12 mx-auto text-gray-400" />
                  <div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Click to upload
                    </button>
                    <span className="text-gray-500"> or drag and drop</span>
                  </div>
                  <p className="text-xs text-gray-500">PDF, DOC, or DOCX (max 10MB)</p>
                </div>
              )}
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of AI/Automation Projects Completed
                </label>
                <input
                  type="text"
                  name="projectsCompleted"
                  value={formData.projectsCompleted}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Relevant Certifications
                </label>
                <input
                  type="text"
                  name="certifications"
                  value={formData.certifications}
                  onChange={handleInputChange}
                  placeholder="e.g., AWS ML Certified, Azure AI Engineer"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Why do you want to join our network?
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
          </div>

          {/* Submit Error Display */}
          {submitError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800">
                <strong>Error:</strong> {submitError}
              </p>
            </div>
          )}

          {/* Terms and Submit */}
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>Important:</strong> By submitting this application, you agree to:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                <li>Pay a one-time $99 vetting fee upon approval</li>
                <li>Keep 100% of project revenue with secure escrow payment protection</li>
                <li>Work with secure escrow payments - 15% released upfront, remainder upon milestone completion</li>
                <li>Complete milestones for client verification and payment release</li>
                <li>Optional participation in channel partner program for additional commission opportunities</li>
                <li>Maintain professional standards and deliver quality work</li>
                <li>Respond to matched opportunities within 48 hours</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 text-lg justify-center ${
                  isSubmitting 
                    ? 'btn-disabled cursor-not-allowed' 
                    : 'btn-primary'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    Submit Application
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className={`flex-1 text-lg ${
                  isSubmitting ? 'btn-disabled cursor-not-allowed' : 'btn-secondary'
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
        )}
      </div>
    </div>
  )
}

export default ConsultantSignupModal