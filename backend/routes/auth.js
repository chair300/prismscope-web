const express = require('express')
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Consultant = require('../models/Consultant')
const logger = require('../utils/logger')

const router = express.Router()

/**
 * POST /api/auth/login
 * Consultant login
 */
router.post('/login', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      })
    }

    const { email, password } = req.body

    // Find consultant
    const consultant = await Consultant.findOne({ email })
    if (!consultant || !consultant.passwordHash) {
      return res.status(401).json({
        error: 'Invalid credentials'
      })
    }

    // Check password
    const isPasswordValid = await consultant.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Invalid credentials'
      })
    }

    // Check if consultant is approved and active
    if (consultant.status !== 'approved' || !consultant.isActive) {
      return res.status(403).json({
        error: 'Account not approved or inactive'
      })
    }

    // Generate JWT
    const token = jwt.sign(
      { consultantId: consultant._id, email: consultant.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )

    // Update last login
    consultant.lastLogin = new Date()
    await consultant.save()

    logger.info(`Consultant logged in: ${consultant._id}`)

    res.json({
      success: true,
      data: {
        token,
        consultant: {
          id: consultant._id,
          firstName: consultant.firstName,
          lastName: consultant.lastName,
          email: consultant.email,
          status: consultant.status,
          isActive: consultant.isActive
        }
      }
    })
  } catch (error) {
    logger.error('Login error:', error)
    res.status(500).json({
      error: 'Login failed'
    })
  }
})

/**
 * POST /api/auth/set-password
 * Set password for approved consultant
 */
router.post('/set-password', [
  body('consultantId').isMongoId().withMessage('Valid consultant ID is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password')
    }
    return true
  })
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      })
    }

    const { consultantId, password } = req.body

    // Find consultant
    const consultant = await Consultant.findById(consultantId)
    if (!consultant) {
      return res.status(404).json({
        error: 'Consultant not found'
      })
    }

    // Check if consultant is approved
    if (consultant.status !== 'approved') {
      return res.status(403).json({
        error: 'Account must be approved before setting password'
      })
    }

    // Check if password already set
    if (consultant.passwordHash) {
      return res.status(400).json({
        error: 'Password already set. Use forgot password to reset.'
      })
    }

    // Set password
    consultant.passwordHash = password // Will be hashed by pre-save middleware
    consultant.isActive = true
    await consultant.save()

    logger.info(`Password set for consultant: ${consultant._id}`)

    res.json({
      success: true,
      message: 'Password set successfully'
    })
  } catch (error) {
    logger.error('Set password error:', error)
    res.status(500).json({
      error: 'Password setup failed'
    })
  }
})

/**
 * POST /api/auth/forgot-password
 * Request password reset
 */
router.post('/forgot-password', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      })
    }

    const { email } = req.body

    // Find consultant
    const consultant = await Consultant.findOne({ email })
    if (!consultant) {
      // Don't reveal if email exists
      return res.json({
        success: true,
        message: 'If an account with that email exists, a reset link has been sent'
      })
    }

    // Generate reset token
    const resetToken = jwt.sign(
      { consultantId: consultant._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    // Save reset token
    consultant.passwordResetToken = resetToken
    consultant.passwordResetExpires = new Date(Date.now() + 3600000) // 1 hour
    await consultant.save()

    // TODO: Send password reset email
    // await emailService.sendPasswordReset(consultant.email, resetToken)

    logger.info(`Password reset requested for: ${consultant._id}`)

    res.json({
      success: true,
      message: 'If an account with that email exists, a reset link has been sent'
    })
  } catch (error) {
    logger.error('Forgot password error:', error)
    res.status(500).json({
      error: 'Password reset request failed'
    })
  }
})

/**
 * POST /api/auth/reset-password
 * Reset password with token
 */
router.post('/reset-password', [
  body('token').notEmpty().withMessage('Reset token is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password')
    }
    return true
  })
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      })
    }

    const { token, password } = req.body

    // Verify token
    let decoded
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
      return res.status(400).json({
        error: 'Invalid or expired reset token'
      })
    }

    // Find consultant
    const consultant = await Consultant.findById(decoded.consultantId)
    if (!consultant || consultant.passwordResetToken !== token) {
      return res.status(400).json({
        error: 'Invalid or expired reset token'
      })
    }

    // Check token expiry
    if (consultant.passwordResetExpires < new Date()) {
      return res.status(400).json({
        error: 'Reset token has expired'
      })
    }

    // Reset password
    consultant.passwordHash = password // Will be hashed by pre-save middleware
    consultant.passwordResetToken = undefined
    consultant.passwordResetExpires = undefined
    await consultant.save()

    logger.info(`Password reset completed for: ${consultant._id}`)

    res.json({
      success: true,
      message: 'Password reset successfully'
    })
  } catch (error) {
    logger.error('Reset password error:', error)
    res.status(500).json({
      error: 'Password reset failed'
    })
  }
})

/**
 * GET /api/auth/verify-token
 * Verify JWT token
 */
router.get('/verify-token', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    
    if (!token) {
      return res.status(401).json({
        error: 'No token provided'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    res.json({
      success: true,
      data: decoded
    })
  } catch (error) {
    res.status(401).json({
      error: 'Invalid token'
    })
  }
})

module.exports = router