import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { handleOAuthCallback } from '../services/oauth'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

const OAuthCallback = () => {
  const [status, setStatus] = useState('loading') // loading, success, error
  const [message, setMessage] = useState('Processing OAuth authentication...')
  const [userData, setUserData] = useState(null)
  const navigate = useNavigate()
  const { provider } = useParams()

  useEffect(() => {
    const processCallback = async () => {
      try {
        console.log(`Processing OAuth callback for ${provider}`)
        
        // Handle the OAuth callback
        const userProfile = await handleOAuthCallback(provider)
        
        setUserData(userProfile)
        setStatus('success')
        setMessage(`Successfully authenticated with ${provider.charAt(0).toUpperCase() + provider.slice(1)}!`)
        
        // Store user data in sessionStorage for the signup form
        sessionStorage.setItem('oauth_user_data', JSON.stringify({
          provider,
          data: userProfile
        }))
        
        // Redirect to consultant network page after 2 seconds
        setTimeout(() => {
          window.location.href = 'https://consultant.prismscope.ai?oauth=success'
        }, 2000)
        
      } catch (error) {
        console.error('OAuth callback error:', error)
        setStatus('error')
        setMessage(`Authentication failed: ${error.message}`)
        
        // Redirect to consultant network page after 3 seconds
        setTimeout(() => {
          window.location.href = 'https://consultant.prismscope.ai?oauth=error'
        }, 3000)
      }
    }

    if (provider) {
      processCallback()
    } else {
      setStatus('error')
      setMessage('Invalid OAuth provider')
    }
  }, [provider, navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {status === 'loading' && (
          <>
            <Loader2 className="w-12 h-12 mx-auto text-primary-600 animate-spin mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Authenticating...</h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}
        
        {status === 'success' && (
          <>
            <CheckCircle className="w-12 h-12 mx-auto text-green-600 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Successful!</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            {userData && (
              <div className="bg-green-50 rounded-lg p-4 text-left">
                <h3 className="font-semibold text-gray-900 mb-2">Retrieved Information:</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  {userData.firstName && <li>• Name: {userData.firstName} {userData.lastName}</li>}
                  {userData.email && <li>• Email: {userData.email}</li>}
                  {userData.company && <li>• Company: {userData.company}</li>}
                  {userData.linkedIn && <li>• LinkedIn: Connected</li>}
                  {userData.github && <li>• GitHub: Connected</li>}
                  {userData.website && <li>• Website: {userData.website}</li>}
                </ul>
              </div>
            )}
            <p className="text-sm text-gray-500 mt-4">Redirecting to signup form...</p>
          </>
        )}
        
        {status === 'error' && (
          <>
            <AlertCircle className="w-12 h-12 mx-auto text-red-600 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Failed</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <button
              onClick={() => window.location.href = 'https://consultant.prismscope.ai'}
              className="btn-primary"
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default OAuthCallback