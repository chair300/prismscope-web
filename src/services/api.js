// API Service for Prismscope Consultant Network
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
    this.token = null
  }

  // Set authentication token
  setToken(token) {
    this.token = token
    if (token) {
      localStorage.setItem('consultant_token', token)
    } else {
      localStorage.removeItem('consultant_token')
    }
  }

  // Get authentication token
  getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('consultant_token')
    }
    return this.token
  }

  // Generic API request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const token = this.getToken()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    }

    // Add authorization header if token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    try {
      const response = await fetch(url, config)
      
      // Handle non-JSON responses (like file downloads)
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

  // Consultant API methods
  async submitConsultantApplication(formData) {
    // Create FormData for file upload
    const form = new FormData()
    
    // Add all form fields
    Object.keys(formData).forEach(key => {
      if (key === 'resume' && formData[key]) {
        form.append('resume', formData[key])
      } else if (Array.isArray(formData[key])) {
        formData[key].forEach(item => form.append(key, item))
      } else if (formData[key] !== null && formData[key] !== undefined) {
        form.append(key, formData[key])
      }
    })

    return this.request('/consultants/apply', {
      method: 'POST',
      headers: {}, // Don't set Content-Type for FormData
      body: form
    })
  }

  async getConsultantApplication(id) {
    return this.request(`/consultants/${id}`)
  }

  async getConsultantStatus(id) {
    return this.request(`/consultants/${id}/status`)
  }

  async updateConsultantApplication(id, formData) {
    const form = new FormData()
    
    Object.keys(formData).forEach(key => {
      if (key === 'resume' && formData[key]) {
        form.append('resume', formData[key])
      } else if (Array.isArray(formData[key])) {
        formData[key].forEach(item => form.append(key, item))
      } else if (formData[key] !== null && formData[key] !== undefined) {
        form.append(key, formData[key])
      }
    })

    return this.request(`/consultants/${id}`, {
      method: 'PUT',
      headers: {},
      body: form
    })
  }

  async getAllConsultants(params = {}) {
    const queryParams = new URLSearchParams(params).toString()
    return this.request(`/consultants${queryParams ? `?${queryParams}` : ''}`)
  }

  async getConsultantStats() {
    return this.request('/consultants/stats')
  }

  // Payment API methods
  async createPaymentIntent(consultantId) {
    return this.request('/payments/create-intent', {
      method: 'POST',
      body: JSON.stringify({ consultantId })
    })
  }

  async confirmPayment(paymentIntentId, paymentMethodId) {
    return this.request('/payments/confirm', {
      method: 'POST',
      body: JSON.stringify({ paymentIntentId, paymentMethodId })
    })
  }

  async getPaymentStatus(paymentIntentId) {
    return this.request(`/payments/${paymentIntentId}`)
  }

  async getAllPayments(params = {}) {
    const queryParams = new URLSearchParams(params).toString()
    return this.request(`/payments${queryParams ? `?${queryParams}` : ''}`)
  }

  async createRefund(paymentIntentId, amount, reason) {
    return this.request(`/payments/${paymentIntentId}/refund`, {
      method: 'POST',
      body: JSON.stringify({ amount, reason })
    })
  }

  async getPaymentStats(startDate, endDate) {
    const params = new URLSearchParams()
    if (startDate) params.append('startDate', startDate)
    if (endDate) params.append('endDate', endDate)
    
    return this.request(`/payments/stats${params.toString() ? `?${params.toString()}` : ''}`)
  }

  async getPaymentDashboard(startDate, endDate) {
    const params = new URLSearchParams()
    if (startDate) params.append('startDate', startDate)
    if (endDate) params.append('endDate', endDate)
    
    return this.request(`/payments/dashboard${params.toString() ? `?${params.toString()}` : ''}`)
  }

  // Authentication API methods
  async login(email, password) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })

    if (response.success && response.data.token) {
      this.setToken(response.data.token)
    }

    return response
  }

  async logout() {
    this.setToken(null)
    return { success: true }
  }

  async setPassword(consultantId, password, confirmPassword) {
    return this.request('/auth/set-password', {
      method: 'POST',
      body: JSON.stringify({ consultantId, password, confirmPassword })
    })
  }

  async forgotPassword(email) {
    return this.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email })
    })
  }

  async resetPassword(token, password, confirmPassword) {
    return this.request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password, confirmPassword })
    })
  }

  async verifyToken() {
    return this.request('/auth/verify-token')
  }

  // File Upload API methods
  async uploadResume(file) {
    const formData = new FormData()
    formData.append('resume', file)

    return this.request('/upload/resume', {
      method: 'POST',
      headers: {}, // Don't set Content-Type for FormData
      body: formData
    })
  }

  async downloadResume(filename) {
    return this.request(`/upload/resume/${filename}`)
  }

  async deleteResume(filename) {
    return this.request(`/upload/resume/${filename}`, {
      method: 'DELETE'
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

  // Get Stripe publishable key
  getStripePublishableKey() {
    return import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
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

// Initialize token from localStorage on startup
if (typeof window !== 'undefined') {
  const token = localStorage.getItem('consultant_token')
  if (token) {
    apiService.setToken(token)
  }
}

export { ApiError }
export default apiService