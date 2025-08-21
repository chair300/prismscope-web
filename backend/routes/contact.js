const express = require('express')
const { body, validationResult } = require('express-validator')
const Contact = require('../models/Contact')
const logger = require('../utils/logger')

const router = express.Router()

// Validation middleware for contact form
const validateContactForm = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Name is required and must be less than 100 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  
  body('company')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Company name must be less than 200 characters'),
  
  body('phone')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('Phone must be less than 20 characters'),
  
  body('message')
    .trim()
    .isLength({ min: 1, max: 2000 })
    .withMessage('Message is required and must be less than 2000 characters'),
  
  body('interest')
    .optional()
    .isIn(['general', 'demo', 'pricing', 'enterprise', 'partnership', 'support'])
    .withMessage('Invalid interest type'),
  
  body('source')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Source must be less than 100 characters')
]

/**
 * POST /api/contact
 * Submit contact form
 */
router.post('/', validateContactForm, async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      })
    }

    const {
      name,
      email,
      company,
      phone,
      message,
      interest = 'general',
      source = 'website_contact_form',
      timestamp
    } = req.body

    // Create contact record
    const contactData = {
      name,
      email,
      company,
      phone,
      message,
      interest,
      source,
      status: 'new',
      priority: 'medium'
    }

    // Set priority based on interest type
    if (interest === 'enterprise') {
      contactData.priority = 'high'
    } else if (interest === 'support') {
      contactData.priority = 'urgent'
    }

    const contact = new Contact(contactData)
    await contact.save()

    logger.info(`Contact form submitted: ${contact._id} from ${email}`)

    // TODO: Send email notification to team
    // TODO: Send auto-response email to user

    res.status(201).json({
      success: true,
      message: 'Thank you for contacting us! We\'ll respond within 24 hours.',
      data: {
        contactId: contact._id,
        status: contact.status
      }
    })
  } catch (error) {
    logger.error('Error processing contact form:', error)
    
    if (error.code === 11000) {
      return res.status(409).json({
        error: 'Duplicate submission',
        message: 'We\'ve already received your message. We\'ll respond soon!'
      })
    }
    
    res.status(500).json({
      error: 'Contact form submission failed',
      message: process.env.NODE_ENV === 'production' 
        ? 'An error occurred while processing your message. Please try again or email us directly.' 
        : error.message
    })
  }
})

/**
 * GET /api/contact
 * Get all contact submissions (admin only)
 */
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const status = req.query.status
    const interest = req.query.interest
    const priority = req.query.priority
    const sortBy = req.query.sortBy || 'createdAt'
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1

    // Build query
    const query = {}
    if (status) query.status = status
    if (interest) query.interest = interest
    if (priority) query.priority = priority

    // Execute query
    const contacts = await Contact.find(query)
      .sort({ [sortBy]: sortOrder })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()

    const total = await Contact.countDocuments(query)

    res.json({
      success: true,
      data: {
        contacts,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    })
  } catch (error) {
    logger.error('Error fetching contacts:', error)
    res.status(500).json({
      error: 'Failed to fetch contacts'
    })
  }
})

/**
 * GET /api/contact/:id
 * Get contact by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
    
    if (!contact) {
      return res.status(404).json({
        error: 'Contact not found'
      })
    }

    res.json({
      success: true,
      data: contact
    })
  } catch (error) {
    logger.error('Error fetching contact:', error)
    res.status(500).json({
      error: 'Failed to fetch contact'
    })
  }
})

/**
 * PUT /api/contact/:id/status
 * Update contact status
 */
router.put('/:id/status', async (req, res) => {
  try {
    const { status, author = 'system' } = req.body
    
    if (!['new', 'contacted', 'qualified', 'closed'].includes(status)) {
      return res.status(400).json({
        error: 'Invalid status'
      })
    }

    const contact = await Contact.findById(req.params.id)
    if (!contact) {
      return res.status(404).json({
        error: 'Contact not found'
      })
    }

    await contact.updateStatus(status, author)

    logger.info(`Contact status updated: ${contact._id} -> ${status}`)

    res.json({
      success: true,
      message: 'Status updated successfully',
      data: {
        contactId: contact._id,
        status: contact.status,
        updatedAt: contact.updatedAt
      }
    })
  } catch (error) {
    logger.error('Error updating contact status:', error)
    res.status(500).json({
      error: 'Failed to update status'
    })
  }
})

/**
 * POST /api/contact/:id/notes
 * Add note to contact
 */
router.post('/:id/notes', async (req, res) => {
  try {
    const { content, author = 'system' } = req.body
    
    if (!content || content.trim().length === 0) {
      return res.status(400).json({
        error: 'Note content is required'
      })
    }

    const contact = await Contact.findById(req.params.id)
    if (!contact) {
      return res.status(404).json({
        error: 'Contact not found'
      })
    }

    await contact.addNote(content.trim(), author)

    logger.info(`Note added to contact: ${contact._id}`)

    res.json({
      success: true,
      message: 'Note added successfully',
      data: {
        contactId: contact._id,
        notesCount: contact.notes.length
      }
    })
  } catch (error) {
    logger.error('Error adding note to contact:', error)
    res.status(500).json({
      error: 'Failed to add note'
    })
  }
})

/**
 * GET /api/contact/stats
 * Get contact statistics
 */
router.get('/stats', async (req, res) => {
  try {
    const stats = await Contact.getContactStats()
    
    res.json({
      success: true,
      data: stats
    })
  } catch (error) {
    logger.error('Error fetching contact stats:', error)
    res.status(500).json({
      error: 'Failed to fetch statistics'
    })
  }
})

module.exports = router