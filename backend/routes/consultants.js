const express = require('express')
const { body, validationResult } = require('express-validator')
const multer = require('multer')
const Consultant = require('../models/Consultant')
const stripeService = require('../services/stripe')
const logger = require('../utils/logger')

const router = express.Router()

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type. Only PDF and Word documents are allowed.'), false)
    }
  }
})

// Validation middleware
const validateConsultantApplication = [
  body('firstName')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('First name is required and must be less than 100 characters'),
  
  body('lastName')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Last name is required and must be less than 100 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  
  body('location')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Location is required and must be less than 200 characters'),
  
  body('yearsExperience')
    .isIn(['1-3', '3-5', '5-10', '10+'])
    .withMessage('Valid experience range is required'),
  
  body('expertise')
    .isArray({ min: 1 })
    .withMessage('At least one expertise area is required'),
  
  body('industries')
    .isArray({ min: 1 })
    .withMessage('At least one industry is required'),
  
  body('phone')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('Phone must be less than 20 characters'),
  
  body('company')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Company name must be less than 200 characters'),
  
  body('website')
    .optional()
    .trim()
    .isURL()
    .withMessage('Website must be a valid URL'),
  
  body('linkedIn')
    .optional()
    .trim()
    .isURL()
    .withMessage('LinkedIn must be a valid URL'),
  
  body('github')
    .optional()
    .trim()
    .isURL()
    .withMessage('GitHub must be a valid URL'),
  
  body('message')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Message must be less than 2000 characters')
]

/**
 * POST /api/consultants/apply
 * Submit consultant application
 */
router.post('/apply', upload.single('resume'), validateConsultantApplication, async (req, res) => {
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
      firstName, lastName, email, phone, location,
      company, website, linkedIn, github,
      yearsExperience, expertise, industries,
      projectsCompleted, certifications, message,
      oauthProvider, oauthId, profilePicture
    } = req.body

    // Check if consultant already exists
    const existingConsultant = await Consultant.findOne({ email })
    if (existingConsultant) {
      return res.status(409).json({
        error: 'Application already exists',
        message: 'A consultant application with this email already exists'
      })
    }

    // Create consultant record
    const consultantData = {
      firstName,
      lastName,
      email,
      phone,
      location,
      company,
      website,
      linkedIn,
      github,
      yearsExperience,
      expertise: Array.isArray(expertise) ? expertise : [expertise],
      industries: Array.isArray(industries) ? industries : [industries],
      projectsCompleted,
      certifications,
      message,
      oauthProvider,
      oauthId,
      profilePicture,
      status: 'pending_payment',
      paymentStatus: 'pending',
      applicationDate: new Date()
    }

    // Handle resume upload
    if (req.file) {
      consultantData.resume = {
        filename: `resume_${Date.now()}_${req.file.originalname}`,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        uploadDate: new Date()
      }
      
      // TODO: Upload to S3 or cloud storage
      // For now, we'll store the base64 data (not recommended for production)
      consultantData.resume.data = req.file.buffer.toString('base64')
    }

    const consultant = new Consultant(consultantData)
    await consultant.save()

    // Create Stripe payment intent
    const paymentData = await stripeService.createRegistrationPaymentIntent({
      consultantId: consultant._id,
      email: consultant.email,
      firstName: consultant.firstName,
      lastName: consultant.lastName
    })

    logger.info(`Consultant application created: ${consultant._id}`)

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: {
        consultantId: consultant._id,
        paymentIntent: {
          id: paymentData.paymentIntent.id,
          clientSecret: paymentData.clientSecret,
          amount: paymentData.paymentIntent.amount,
          currency: paymentData.paymentIntent.currency
        }
      }
    })
  } catch (error) {
    logger.error('Error creating consultant application:', error)
    
    if (error.code === 11000) {
      return res.status(409).json({
        error: 'Duplicate application',
        message: 'An application with this email already exists'
      })
    }
    
    res.status(500).json({
      error: 'Application submission failed',
      message: process.env.NODE_ENV === 'production' 
        ? 'An error occurred while processing your application' 
        : error.message
    })
  }
})

/**
 * GET /api/consultants/:id
 * Get consultant application by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const consultant = await Consultant.findById(req.params.id)
    
    if (!consultant) {
      return res.status(404).json({
        error: 'Application not found'
      })
    }

    // Remove sensitive data
    const publicData = consultant.toObject()
    delete publicData.passwordHash
    delete publicData.passwordResetToken
    delete publicData.emailVerificationToken
    delete publicData.adminNotes

    res.json({
      success: true,
      data: publicData
    })
  } catch (error) {
    logger.error('Error fetching consultant:', error)
    res.status(500).json({
      error: 'Failed to fetch application'
    })
  }
})

/**
 * GET /api/consultants/:id/status
 * Get application status
 */
router.get('/:id/status', async (req, res) => {
  try {
    const consultant = await Consultant.findById(req.params.id)
      .select('status paymentStatus applicationDate reviewDate approvalDate')
    
    if (!consultant) {
      return res.status(404).json({
        error: 'Application not found'
      })
    }

    res.json({
      success: true,
      data: {
        consultantId: consultant._id,
        status: consultant.status,
        paymentStatus: consultant.paymentStatus,
        applicationDate: consultant.applicationDate,
        reviewDate: consultant.reviewDate,
        approvalDate: consultant.approvalDate,
        applicationAge: consultant.applicationAge
      }
    })
  } catch (error) {
    logger.error('Error fetching consultant status:', error)
    res.status(500).json({
      error: 'Failed to fetch application status'
    })
  }
})

/**
 * PUT /api/consultants/:id
 * Update consultant application (before payment)
 */
router.put('/:id', upload.single('resume'), validateConsultantApplication, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      })
    }

    const consultant = await Consultant.findById(req.params.id)
    if (!consultant) {
      return res.status(404).json({
        error: 'Application not found'
      })
    }

    // Only allow updates if payment is not completed
    if (consultant.paymentStatus === 'completed') {
      return res.status(403).json({
        error: 'Application cannot be modified after payment'
      })
    }

    // Update consultant data
    Object.assign(consultant, req.body)
    consultant.updatedAt = new Date()

    // Handle resume upload
    if (req.file) {
      consultant.resume = {
        filename: `resume_${Date.now()}_${req.file.originalname}`,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        uploadDate: new Date(),
        data: req.file.buffer.toString('base64')
      }
    }

    await consultant.save()

    logger.info(`Consultant application updated: ${consultant._id}`)

    res.json({
      success: true,
      message: 'Application updated successfully',
      data: {
        consultantId: consultant._id,
        updatedAt: consultant.updatedAt
      }
    })
  } catch (error) {
    logger.error('Error updating consultant application:', error)
    res.status(500).json({
      error: 'Application update failed'
    })
  }
})

/**
 * GET /api/consultants
 * Get all consultant applications (admin only)
 */
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const status = req.query.status
    const paymentStatus = req.query.paymentStatus
    const sortBy = req.query.sortBy || 'applicationDate'
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1

    // Build query
    const query = {}
    if (status) query.status = status
    if (paymentStatus) query.paymentStatus = paymentStatus

    // Execute query
    const consultants = await Consultant.find(query)
      .select('-passwordHash -passwordResetToken -emailVerificationToken -resume.data')
      .sort({ [sortBy]: sortOrder })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()

    const total = await Consultant.countDocuments(query)

    res.json({
      success: true,
      data: {
        consultants,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    })
  } catch (error) {
    logger.error('Error fetching consultants:', error)
    res.status(500).json({
      error: 'Failed to fetch applications'
    })
  }
})

/**
 * GET /api/consultants/stats
 * Get application statistics
 */
router.get('/stats', async (req, res) => {
  try {
    const stats = await Consultant.getApplicationStats()
    
    res.json({
      success: true,
      data: stats
    })
  } catch (error) {
    logger.error('Error fetching consultant stats:', error)
    res.status(500).json({
      error: 'Failed to fetch statistics'
    })
  }
})

module.exports = router