// API Service for Prismscope Main Website
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  // Generic API request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    }

    try {
      const response = await fetch(url, config)
      
      // Handle non-JSON responses
      if (!response.headers.get('content-type')?.includes('application/json')) {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response
      }

      const data = await response.json()

      if (!response.ok) {
        throw new ApiError(data.error || 'Request failed', response.status, data)
      }

      return data
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError(error.message || 'Network error', 0, error)
    }
  }

  // Contact form submission
  async submitContact(formData) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(formData)
    })
  }

  // OAuth methods
  async initiateOAuth(provider, redirectUri = window.location.origin) {
    return this.request(`/auth/${provider}`, {
      method: 'POST',
      body: JSON.stringify({ redirectUri })
    })
  }

  async handleOAuthCallback(provider, code, state) {
    return this.request(`/auth/${provider}/callback`, {
      method: 'POST',
      body: JSON.stringify({ code, state })
    })
  }

  // File upload methods
  async uploadFile(file, type = 'general') {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', type)

    return this.request('/upload', {
      method: 'POST',
      headers: {}, // Don't set Content-Type for FormData
      body: formData
    })
  }

  // Utility methods
  async healthCheck() {
    try {
      const response = await fetch(`${this.baseURL.replace('/api', '')}/health`)
      return await response.json()
    } catch (error) {
      throw new ApiError('Health check failed', 0, error)
    }
  }
}

// Custom API Error class
class ApiError extends Error {
  constructor(message, status = 0, details = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.details = details
  }

  isValidationError() {
    return this.status === 400 && this.details?.details
  }

  isAuthError() {
    return this.status === 401
  }

  isNotFoundError() {
    return this.status === 404
  }

  isServerError() {
    return this.status >= 500
  }
}

// Export singleton instance
const apiService = new ApiService()

export { ApiError }
export default apiService