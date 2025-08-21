import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

// Custom API Error class
export class ApiError extends Error {
  constructor(message, status, data) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Consultant API endpoints
export const consultantAPI = {
  // Get all consultants
  getAll: (filters = {}) => api.get('/consultants', { params: filters }),
  
  // Get single consultant
  getById: (id) => api.get(`/consultants/${id}`),
  
  // Create consultant profile
  create: (data) => api.post('/consultants', data),
  
  // Update consultant profile
  update: (id, data) => api.put(`/consultants/${id}`, data),
  
  // Delete consultant profile
  delete: (id) => api.delete(`/consultants/${id}`),
  
  // Upload consultant documents
  uploadDocuments: (id, formData) => 
    api.post(`/consultants/${id}/documents`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  
  // Get consultant reviews
  getReviews: (id) => api.get(`/consultants/${id}/reviews`),
  
  // Submit review
  submitReview: (id, review) => api.post(`/consultants/${id}/reviews`, review),
}

// Payment API endpoints
export const paymentAPI = {
  // Create payment intent
  createPaymentIntent: (amount) => api.post('/payments/create-intent', { amount }),
  
  // Process payment
  processPayment: (paymentData) => api.post('/payments/process', paymentData),
  
  // Get payment history
  getHistory: () => api.get('/payments/history'),
  
  // Get payment details
  getPaymentDetails: (id) => api.get(`/payments/${id}`),
}

// Project API endpoints
export const projectAPI = {
  // Get all projects
  getAll: (filters = {}) => api.get('/projects', { params: filters }),
  
  // Get single project
  getById: (id) => api.get(`/projects/${id}`),
  
  // Create project
  create: (data) => api.post('/projects', data),
  
  // Update project
  update: (id, data) => api.put(`/projects/${id}`, data),
  
  // Delete project
  delete: (id) => api.delete(`/projects/${id}`),
  
  // Assign consultant to project
  assignConsultant: (projectId, consultantId) => 
    api.post(`/projects/${projectId}/assign`, { consultantId }),
}

export default api