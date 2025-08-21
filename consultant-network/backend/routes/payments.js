import express from 'express'
import { body, validationResult } from 'express-validator'
import stripeService from '../services/stripe.js'
import Payment from '../models/Payment.js'
import Consultant from '../models/Consultant.js'
import logger from '../utils/logger.js'

const router = express.Router()

/**
 * POST /api/payments/create-intent
 * Create payment intent for consultant registration
 */
router.post('/create-intent', [
  body('consultantId').isMongoId().withMessage('Valid consultant ID is required')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      })
    }

    const { consultantId } = req.body

    // Find consultant
    const consultant = await Consultant.findById(consultantId)
    if (!consultant) {
      return res.status(404).json({
        error: 'Consultant not found'
      })
    }

    // Check if payment already exists
    const existingPayment = await Payment.findOne({ 
      consultantId, 
      status: { $in: ['succeeded', 'processing'] }
    })
    
    if (existingPayment) {
      return res.status(409).json({
        error: 'Payment already completed',
        message: 'Registration fee has already been paid for this application'
      })
    }

    // Create payment intent
    const paymentData = await stripeService.createRegistrationPaymentIntent({
      consultantId: consultant._id,
      email: consultant.email,
      firstName: consultant.firstName,
      lastName: consultant.lastName
    })

    logger.info(`Payment intent created for consultant: ${consultantId}`)

    res.json({
      success: true,
      data: {
        paymentIntent: {
          id: paymentData.paymentIntent.id,
          clientSecret: paymentData.clientSecret,
          amount: paymentData.paymentIntent.amount,
          currency: paymentData.paymentIntent.currency
        },
        consultant: {
          id: consultant._id,
          name: consultant.fullName,
          email: consultant.email
        }
      }
    })
  } catch (error) {
    logger.error('Error creating payment intent:', error)
    res.status(500).json({
      error: 'Payment intent creation failed',
      message: process.env.NODE_ENV === 'production' 
        ? 'Unable to process payment at this time' 
        : error.message
    })
  }
})

/**
 * POST /api/payments/confirm
 * Confirm payment intent
 */
router.post('/confirm', [
  body('paymentIntentId').notEmpty().withMessage('Payment intent ID is required'),
  body('paymentMethodId').notEmpty().withMessage('Payment method ID is required')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      })
    }

    const { paymentIntentId, paymentMethodId } = req.body

    // Confirm payment with Stripe
    const paymentIntent = await stripeService.confirmPaymentIntent(paymentIntentId, paymentMethodId)

    logger.info(`Payment confirmed: ${paymentIntentId}`)

    res.json({
      success: true,
      data: {
        paymentIntent: {
          id: paymentIntent.id,
          status: paymentIntent.status,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency
        }
      }
    })
  } catch (error) {
    logger.error('Error confirming payment:', error)
    res.status(500).json({
      error: 'Payment confirmation failed',
      message: error.message
    })
  }
})

/**
 * GET /api/payments/:paymentIntentId
 * Get payment status
 */
router.get('/:paymentIntentId', async (req, res) => {
  try {
    const { paymentIntentId } = req.params

    // Get payment from database
    const payment = await Payment.findOne({ paymentIntentId })
      .populate('consultantId', 'firstName lastName email')

    if (!payment) {
      return res.status(404).json({
        error: 'Payment not found'
      })
    }

    // Get latest status from Stripe
    const stripePaymentIntent = await stripeService.retrievePaymentIntent(paymentIntentId)

    // Update local payment record if needed
    if (payment.status !== stripePaymentIntent.status) {
      payment.status = stripePaymentIntent.status
      await payment.save()
    }

    res.json({
      success: true,
      data: {
        payment: {
          id: payment._id,
          paymentIntentId: payment.paymentIntentId,
          status: payment.status,
          statusDisplay: payment.statusDisplay,
          amount: payment.amount,
          formattedAmount: payment.formattedAmount,
          currency: payment.currency,
          createdAt: payment.createdAt,
          succeededAt: payment.succeededAt,
          consultant: payment.consultantId
        }
      }
    })
  } catch (error) {
    logger.error('Error fetching payment:', error)
    res.status(500).json({
      error: 'Failed to fetch payment'
    })
  }
})

/**
 * POST /api/payments/webhook
 * Stripe webhook endpoint
 */
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const signature = req.headers['stripe-signature']
    
    if (!signature) {
      return res.status(400).json({
        error: 'Missing Stripe signature'
      })
    }

    // Handle webhook with Stripe service
    const result = await stripeService.handleWebhook(req.body, signature)

    logger.info(`Webhook processed: ${result.eventType}`)

    res.json(result)
  } catch (error) {
    logger.error('Webhook processing failed:', error)
    res.status(400).json({
      error: 'Webhook verification failed'
    })
  }
})

/**
 * GET /api/payments
 * Get all payments (admin only)
 */
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const status = req.query.status
    const consultantId = req.query.consultantId
    const sortBy = req.query.sortBy || 'createdAt'
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1

    // Build query
    const query = {}
    if (status) query.status = status
    if (consultantId) query.consultantId = consultantId

    // Execute query
    const payments = await Payment.find(query)
      .populate('consultantId', 'firstName lastName email')
      .sort({ [sortBy]: sortOrder })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()

    const total = await Payment.countDocuments(query)

    res.json({
      success: true,
      data: {
        payments,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    })
  } catch (error) {
    logger.error('Error fetching payments:', error)
    res.status(500).json({
      error: 'Failed to fetch payments'
    })
  }
})

/**
 * GET /api/payments/stats
 * Get payment statistics
 */
router.get('/stats', async (req, res) => {
  try {
    const { startDate, endDate } = req.query
    
    const stats = await Payment.getPaymentStats(startDate, endDate)
    
    res.json({
      success: true,
      data: stats
    })
  } catch (error) {
    logger.error('Error fetching payment stats:', error)
    res.status(500).json({
      error: 'Failed to fetch statistics'
    })
  }
})

/**
 * POST /api/payments/:paymentIntentId/refund
 * Create refund for payment
 */
router.post('/:paymentIntentId/refund', [
  body('amount').optional().isNumeric().withMessage('Amount must be numeric'),
  body('reason').optional().isIn(['duplicate', 'fraudulent', 'requested_by_customer'])
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      })
    }

    const { paymentIntentId } = req.params
    const { amount, reason = 'requested_by_customer' } = req.body

    // Find payment
    const payment = await Payment.findOne({ paymentIntentId })
    if (!payment) {
      return res.status(404).json({
        error: 'Payment not found'
      })
    }

    if (payment.status !== 'succeeded') {
      return res.status(400).json({
        error: 'Cannot refund unsuccessful payment'
      })
    }

    // Create refund
    const refund = await stripeService.createRefund(
      paymentIntentId, 
      amount || payment.amount, 
      reason
    )

    // Update consultant status if full refund
    if (!amount || amount === payment.amount) {
      await Consultant.findByIdAndUpdate(payment.consultantId, {
        paymentStatus: 'refunded',
        status: 'pending_payment'
      })
    }

    logger.info(`Refund created: ${refund.id} for payment: ${paymentIntentId}`)

    res.json({
      success: true,
      data: {
        refund: {
          id: refund.id,
          amount: refund.amount,
          status: refund.status,
          reason: refund.reason
        }
      }
    })
  } catch (error) {
    logger.error('Error creating refund:', error)
    res.status(500).json({
      error: 'Refund creation failed',
      message: error.message
    })
  }
})

/**
 * GET /api/payments/dashboard
 * Get payment dashboard data (admin only)
 */
router.get('/dashboard', async (req, res) => {
  try {
    const { startDate, endDate } = req.query
    
    const dashboardData = await stripeService.getDashboardData(startDate, endDate)
    
    res.json({
      success: true,
      data: dashboardData
    })
  } catch (error) {
    logger.error('Error fetching dashboard data:', error)
    res.status(500).json({
      error: 'Failed to fetch dashboard data'
    })
  }
})

export default router