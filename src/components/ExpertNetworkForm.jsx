import { useState } from 'react'
import { Send, Loader2, CheckCircle, AlertCircle, Linkedin, Github } from 'lucide-react'

const ExpertNetworkForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    linkedInUsername: '',
    githubUsername: '',
    expertise: [],
    industries: [],
    yearsExperience: '',
    company: '',
    location: '',
    bio: '',
    certifications: '',
    phone: '',
    website: '',
    projectsCompleted: '',
    message: '',
    partnershipType: 'expert'
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [errors, setErrors] = useState({})
  const [hasSubmitted, setHasSubmitted] = useState(false)

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

  const experienceOptions = [
    { value: '1-3', label: '1-3 years' },
    { value: '3-5', label: '3-5 years' },
    { value: '5-10', label: '5-10 years' },
    { value: '10+', label: '10+ years' }
  ]

  const validateForm = () => {
    const newErrors = {}
    
    // Only validate format if provided, don't require fields
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleExpertiseChange = (value, field = 'expertise') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

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

      const response = await fetch('/api/consultants/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          linkedIn: formData.linkedInUsername ? `https://linkedin.com/in/${formData.linkedInUsername}` : '',
          github: formData.githubUsername ? `https://github.com/${formData.githubUsername}` : '',
          timestamp: new Date().toISOString(),
          ipAddress: ipAddress,
          userAgent: navigator.userAgent,
          referrer: document.referrer || 'direct',
          source: 'expert_network_form'
        })
      })

      if (!response.ok) {
        throw new Error('Failed to submit application')
      }

      setSubmitStatus('success')
      setHasSubmitted(true)
      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        linkedInUsername: '',
        githubUsername: '',
        expertise: [],
        industries: [],
        yearsExperience: '',
        company: '',
        location: '',
        bio: '',
        certifications: '',
        phone: '',
        website: '',
        projectsCompleted: '',
        message: '',
        partnershipType: 'expert'
      })
    } catch (error) {
      console.error('Error submitting application:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      {hasSubmitted ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Thank You for Your Application!</h3>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            We've received your application and will review it shortly. 
            You should expect an invite to apply within 2-3 business days.
          </p>
          <div className="bg-primary-50 rounded-lg p-6 max-w-lg mx-auto">
            <h4 className="font-semibold text-gray-900 mb-2">What happens next?</h4>
            <div className="space-y-2 text-sm text-gray-700 text-left">
              <p>• Our team will review your application</p>
              <p>• If approved, you'll receive an onboarding email</p>
              <p>• You'll get access to our consultant dashboard</p>
              <p>• Start receiving matched opportunities immediately</p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-green-800 font-semibold">Application Submitted Successfully!</p>
                <p className="text-green-700 mt-1">
                  Thank you for your interest in joining our expert network. 
                  You should expect an invite to apply within 2-3 business days.
                </p>
              </div>
            </div>
          )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
          <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
          <span className="text-red-800">There was an error submitting your application. Please try again.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="John"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Doe"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                errors.location ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="San Francisco, CA"
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">{errors.location}</p>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
              Current Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              placeholder="Acme Consulting"
            />
          </div>
        </div>

        {/* Social Profiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="linkedInUsername" className="block text-sm font-medium text-gray-700 mb-2">
              <Linkedin className="w-4 h-4 inline mr-1" />
              LinkedIn Profile
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md">
                linkedin.com/in/
              </span>
              <input
                type="text"
                id="linkedInUsername"
                name="linkedInUsername"
                value={formData.linkedInUsername}
                onChange={handleChange}
                className={`flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.linkedInUsername ? 'border-red-500' : ''
                }`}
                placeholder="johndoe"
              />
            </div>
            {errors.linkedInUsername && (
              <p className="mt-1 text-sm text-red-600">{errors.linkedInUsername}</p>
            )}
          </div>

          <div>
            <label htmlFor="githubUsername" className="block text-sm font-medium text-gray-700 mb-2">
              <Github className="w-4 h-4 inline mr-1" />
              GitHub Profile
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md">
                github.com/
              </span>
              <input
                type="text"
                id="githubUsername"
                name="githubUsername"
                value={formData.githubUsername}
                onChange={handleChange}
                className={`flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.githubUsername ? 'border-red-500' : ''
                }`}
                placeholder="johndoe"
              />
            </div>
            {errors.githubUsername && (
              <p className="mt-1 text-sm text-red-600">{errors.githubUsername}</p>
            )}
          </div>
        </div>

        {/* Experience */}
        <div>
          <label htmlFor="yearsExperience" className="block text-sm font-medium text-gray-700 mb-2">
            Years of Experience
          </label>
          <select
            id="yearsExperience"
            name="yearsExperience"
            value={formData.yearsExperience}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
              errors.yearsExperience ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select years of experience</option>
            {experienceOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.yearsExperience && (
            <p className="mt-1 text-sm text-red-600">{errors.yearsExperience}</p>
          )}
        </div>

        {/* Areas of Expertise */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Areas of Expertise (Select all that apply)
          </label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {expertiseOptions.map(option => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  value={option}
                  checked={formData.expertise.includes(option)}
                  onChange={() => handleExpertiseChange(option)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
          
          {errors.expertise && (
            <p className="mt-2 text-sm text-red-600">{errors.expertise}</p>
          )}
        </div>

        {/* Industry Experience */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Industry Experience (Select all that apply)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {industryOptions.map(option => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  value={option}
                  checked={formData.industries.includes(option)}
                  onChange={() => handleExpertiseChange(option, 'industries')}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
          {errors.industries && (
            <p className="mt-2 text-sm text-red-600">{errors.industries}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Why do you want to join our expert network?
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Tell us about your experience with automation, AI implementation, or organizational transformation projects..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-primary-700 hover:to-accent-700 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Submitting Application...
            </>
          ) : (
            <>
              Submit Application
              <Send className="w-5 h-5 ml-2" />
            </>
          )}
        </button>
      </form>
    </div>
      )}
    </div>
  )
}

export default ExpertNetworkForm