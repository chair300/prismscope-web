import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { CheckCircle, Clock, Mail, FileText, ArrowRight, Home } from 'lucide-react'
import apiService from '../services/api'

const ThankYouPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [applicationData, setApplicationData] = useState(null)
  const [loading, setLoading] = useState(true)

  const consultantId = searchParams.get('consultantId')
  const paymentIntentId = searchParams.get('payment_intent')

  useEffect(() => {
    if (consultantId || paymentIntentId) {
      fetchApplicationData()
    } else {
      setLoading(false)
    }
  }, [consultantId, paymentIntentId])

  const fetchApplicationData = async () => {
    try {
      let data
      if (consultantId) {
        const response = await apiService.getConsultantApplication(consultantId)
        if (response.success) {
          data = response.data
        }
      } else if (paymentIntentId) {
        const response = await apiService.getPaymentStatus(paymentIntentId)
        if (response.success) {
          data = response.data
        }
      }

      if (data) {
        setApplicationData(data)
      }
    } catch (error) {
      console.error('Error fetching application data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your application details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Success Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Thank You for Applying!
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Your application to join the Prismscope Consultant Network has been successfully submitted and your vetting fee has been processed.
              </p>
            </div>

            {/* Application Details */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What Happens Next?</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <Clock className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Application Review</h3>
                    <p className="text-gray-600">
                      Our team will carefully review your application, credentials, and experience. This process typically takes 2-3 business days.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center mr-4">
                    <Mail className="w-5 h-5 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Verification</h3>
                    <p className="text-gray-600">
                      We'll send you an email confirmation with next steps. Please check your inbox and spam folder.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <FileText className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Background Verification</h3>
                    <p className="text-gray-600">
                      We may reach out for additional information or references to verify your professional background and expertise.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Summary */}
            {applicationData && (
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Application Summary</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Personal Information</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      {applicationData.consultant ? (
                        <>
                          <p><strong>Name:</strong> {applicationData.consultant.fullName}</p>
                          <p><strong>Email:</strong> {applicationData.consultant.email}</p>
                          <p><strong>Location:</strong> {applicationData.consultant.location}</p>
                        </>
                      ) : applicationData.consultantId && (
                        <>
                          <p><strong>Name:</strong> {applicationData.consultantId.firstName} {applicationData.consultantId.lastName}</p>
                          <p><strong>Email:</strong> {applicationData.consultantId.email}</p>
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Payment Information</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong>Vetting Fee:</strong> $99.00</p>
                      <p><strong>Payment Status:</strong> 
                        <span className="ml-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                          Completed
                        </span>
                      </p>
                      <p><strong>Application ID:</strong> {consultantId || applicationData.consultantId}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Important Information */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Important Information</h2>
              <div className="space-y-3 text-sm text-gray-700">
                <p>
                  <strong>Matching Fees:</strong> Once approved, matching fees range from 15-40% based on project complexity and your performance history.
                </p>
                <p>
                  <strong>Account Setup:</strong> After approval, you'll receive instructions to set up your consultant account and password.
                </p>
                <p>
                  <strong>Project Matching:</strong> We'll match you with relevant projects based on your expertise and industry experience.
                </p>
                <p>
                  <strong>Support:</strong> Our team is available to help throughout the onboarding process.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions or Concerns?</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about your application or the review process, please don't hesitate to contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="mailto:support@provoco.ai" 
                  className="btn-primary flex items-center justify-center"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Support
                </a>
                <a 
                  href="tel:+1-555-0123" 
                  className="btn-secondary flex items-center justify-center"
                >
                  Call Us: (555) 012-3456
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/')}
                  className="btn-secondary flex items-center justify-center"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </button>
                <button
                  onClick={() => window.open('https://consultant.prismscope.ai', '_blank', 'noopener,noreferrer')}
                  className="btn-primary flex items-center justify-center"
                >
                  Learn More About Our Network
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
              
              {consultantId && (
                <p className="text-sm text-gray-500 mt-4">
                  Application Reference: {consultantId}
                  <br />
                  Please save this reference number for your records.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThankYouPage