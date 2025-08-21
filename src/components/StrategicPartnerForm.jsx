import { useState } from 'react'
import { Send, Loader2, CheckCircle, AlertCircle, Linkedin, Globe } from 'lucide-react'

const StrategicPartnerForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    jobTitle: '',
    company: '',
    companySize: '',
    companyWebsite: '',
    linkedIn: '',
    phone: '',
    location: '',
    partnershipInterest: [],
    solutions: [],
    currentClients: '',
    annualRevenue: '',
    message: '',
    partnershipType: 'strategic'
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [errors, setErrors] = useState({})

  const partnershipInterestOptions = [
    'White-label Prismscope Services',
    'Receive Qualified Referrals',
    'Product Recommendations',
    'Co-Marketing Opportunities',
    'Implementation Support',
    'Joint Sales Efforts'
  ]

  const solutionTypes = [
    'AI/ML Platforms',
    'Automation Tools',
    'Data Analytics Solutions',
    'Business Intelligence',
    'Workflow Automation Software',
    'Process Optimization Tools',
    'Industry-specific AI Applications',
    'System Integration Services',
    'Cloud AI Platforms',
    'Other'
  ]

  const companySizeOptions = [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-1000', label: '201-1000 employees' },
    { value: '1000+', label: '1000+ employees' }
  ]

  const revenueOptions = [
    { value: 'under-1m', label: 'Under $1M' },
    { value: '1m-10m', label: '$1M - $10M' },
    { value: '10m-50m', label: '$10M - $50M' },
    { value: '50m-100m', label: '$50M - $100M' },
    { value: '100m+', label: '$100M+' }
  ]

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required'
    }
    
    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = 'Job title is required'
    }
    
    if (!formData.companyWebsite.trim()) {
      newErrors.companyWebsite = 'Company website is required'
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required'
    }
    
    if (formData.partnershipInterest.length === 0) {
      newErrors.partnershipInterest = 'Please select at least one partnership interest'
    }
    
    if (formData.solutions.length === 0) {
      newErrors.solutions = 'Please select at least one solution type'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Please provide a brief message about your partnership goals'
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

  const handleMultiSelectChange = (value, field) => {
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
      const response = await fetch('/api/consultants/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'strategic_partner_form'
        })
      })

      if (!response.ok) {
        throw new Error('Failed to submit application')
      }

      setSubmitStatus('success')
      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        jobTitle: '',
        company: '',
        companySize: '',
        companyWebsite: '',
        linkedIn: '',
        phone: '',
        location: '',
        partnershipInterest: [],
        solutions: [],
        currentClients: '',
        annualRevenue: '',
        message: '',
        partnershipType: 'strategic'
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
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
          <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-green-800 font-semibold">Partnership Application Submitted Successfully!</p>
            <p className="text-green-700 mt-1">
              Thank you for your interest in our Strategic Partner Program. 
              Our partnership team will review your application and contact you within 2-3 business days.
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
              First Name *
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
              Last Name *
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
              Email *
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
              placeholder="john@company.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-2">
              Job Title *
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                errors.jobTitle ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="VP of Business Development"
            />
            {errors.jobTitle && (
              <p className="mt-1 text-sm text-red-600">{errors.jobTitle}</p>
            )}
          </div>
        </div>

        {/* Company Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
              Company Name *
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                errors.company ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Acme Solutions Inc."
            />
            {errors.company && (
              <p className="mt-1 text-sm text-red-600">{errors.company}</p>
            )}
          </div>

          <div>
            <label htmlFor="companyWebsite" className="block text-sm font-medium text-gray-700 mb-2">
              <Globe className="w-4 h-4 inline mr-1" />
              Company Website *
            </label>
            <input
              type="url"
              id="companyWebsite"
              name="companyWebsite"
              value={formData.companyWebsite}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                errors.companyWebsite ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="https://www.company.com"
            />
            {errors.companyWebsite && (
              <p className="mt-1 text-sm text-red-600">{errors.companyWebsite}</p>
            )}
          </div>

          <div>
            <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 mb-2">
              Company Size
            </label>
            <select
              id="companySize"
              name="companySize"
              value={formData.companySize}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            >
              <option value="">Select company size</option>
              {companySizeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="annualRevenue" className="block text-sm font-medium text-gray-700 mb-2">
              Annual Revenue
            </label>
            <select
              id="annualRevenue"
              name="annualRevenue"
              value={formData.annualRevenue}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            >
              <option value="">Select revenue range</option>
              {revenueOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location *
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

        <div>
          <label htmlFor="linkedIn" className="block text-sm font-medium text-gray-700 mb-2">
            <Linkedin className="w-4 h-4 inline mr-1" />
            LinkedIn Profile URL (Optional)
          </label>
          <input
            type="url"
            id="linkedIn"
            name="linkedIn"
            value={formData.linkedIn}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>

        {/* Partnership Interests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Partnership Interests * (Select all that apply)
          </label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {partnershipInterestOptions.map(option => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  value={option}
                  checked={formData.partnershipInterest.includes(option)}
                  onChange={() => handleMultiSelectChange(option, 'partnershipInterest')}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
          
          {errors.partnershipInterest && (
            <p className="mt-2 text-sm text-red-600">{errors.partnershipInterest}</p>
          )}
        </div>

        {/* Solution Types */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Your Solutions/Services * (Select all that apply)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {solutionTypes.map(option => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  value={option}
                  checked={formData.solutions.includes(option)}
                  onChange={() => handleMultiSelectChange(option, 'solutions')}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
          {errors.solutions && (
            <p className="mt-2 text-sm text-red-600">{errors.solutions}</p>
          )}
        </div>

        {/* Additional Information */}
        <div>
          <label htmlFor="currentClients" className="block text-sm font-medium text-gray-700 mb-2">
            Typical Client Profile
          </label>
          <textarea
            id="currentClients"
            name="currentClients"
            value={formData.currentClients}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
            placeholder="Describe the types of clients you typically work with (e.g., Fortune 500, mid-market, specific industries...)"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Partnership Goals & Message *
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
            placeholder="Tell us about your partnership goals, how you envision working together, and what value you can bring to our mutual clients..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Submitting Partnership Application...
            </>
          ) : (
            <>
              Submit Partnership Application
              <Send className="w-5 h-5 ml-2" />
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default StrategicPartnerForm