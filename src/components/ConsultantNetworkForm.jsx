import { useState } from 'react'
import { Send, Loader2, CheckCircle, AlertCircle, Linkedin, Github, Users, Briefcase } from 'lucide-react'

const ConsultantNetworkForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    linkedIn: '',
    github: '',
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
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [errors, setErrors] = useState({})

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
    
    if (!formData.linkedIn.trim()) {
      newErrors.linkedIn = 'LinkedIn URL is required'
    } else if (!formData.linkedIn.includes('linkedin.com')) {
      newErrors.linkedIn = 'Please enter a valid LinkedIn URL'
    }
    
    if (formData.github && !formData.github.includes('github.com')) {
      newErrors.github = 'Please enter a valid GitHub URL'
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required'
    }
    
    if (formData.expertise.length === 0) {
      newErrors.expertise = 'Please select at least one area of expertise'
    }
    
    if (formData.industries.length === 0) {
      newErrors.industries = 'Please select at least one industry'
    }
    
    if (!formData.yearsExperience) {
      newErrors.yearsExperience = 'Years of experience is required'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Please provide a brief message about why you want to join'
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
      const response = await fetch('/api/consultants/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'consultant_network_form'
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
        linkedIn: '',
        github: '',
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
        message: ''
      })
    } catch (error) {
      console.error('Error submitting application:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-4">
            <Users className="w-4 h-4 mr-2" />
            Join Our Expert Network
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Apply to Become a Prismscope Consultant
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our network of pre-vetted AI and organizational transformation experts. 
            Help organizations implement automation solutions and drive meaningful change.
          </p>
        </div>

        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
            <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-green-800 font-semibold">Application Submitted Successfully!</p>
              <p className="text-green-700 mt-1">
                Thank you for your interest in joining our consultant network. 
                You should expect an invite to apply to the network within 2-3 business days.
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
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Social Profiles */}
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

          {/* Social Profiles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="linkedIn" className="block text-sm font-medium text-gray-700 mb-2">
                <Linkedin className="w-4 h-4 inline mr-1" />
                LinkedIn Profile URL *
              </label>
              <input
                type="url"
                id="linkedIn"
                name="linkedIn"
                value={formData.linkedIn}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                  errors.linkedIn ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="https://linkedin.com/in/johndoe"
              />
              {errors.linkedIn && (
                <p className="mt-1 text-sm text-red-600">{errors.linkedIn}</p>
              )}
            </div>

            <div>
              <label htmlFor="github" className="block text-sm font-medium text-gray-700 mb-2">
                <Github className="w-4 h-4 inline mr-1" />
                GitHub Profile URL (Optional)
              </label>
              <input
                type="url"
                id="github"
                name="github"
                value={formData.github}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                  errors.github ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="https://github.com/johndoe"
              />
              {errors.github && (
                <p className="mt-1 text-sm text-red-600">{errors.github}</p>
              )}
            </div>
          </div>

          {/* Professional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                Website
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="https://your-website.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="projectsCompleted" className="block text-sm font-medium text-gray-700 mb-2">
                Projects Completed
              </label>
              <input
                type="text"
                id="projectsCompleted"
                name="projectsCompleted"
                value={formData.projectsCompleted}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="10+ AI implementation projects"
              />
            </div>

            <div>
              <label htmlFor="certifications" className="block text-sm font-medium text-gray-700 mb-2">
                Relevant Certifications
              </label>
              <input
                type="text"
                id="certifications"
                name="certifications"
                value={formData.certifications}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="e.g., AWS ML Specialist, PMP"
              />
            </div>
          </div>

          <div>
            <label htmlFor="yearsExperience" className="block text-sm font-medium text-gray-700 mb-2">
              Years of Experience *
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
              Areas of Expertise * (Select all that apply)
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
              Industry Experience * (Select all that apply)
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
              Why do you want to join our network? *
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

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800 text-center">
            <strong>Note:</strong> After submitting your application, you will receive an invitation 
            to complete the full consultant onboarding process within 2-3 business days. 
            We carefully review all applications to maintain the quality of our network.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ConsultantNetworkForm