const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
const logger = require('../utils/logger')
const Payment = require('../models/Payment')

class StripeService {
  constructor() {
    this.registrationFee = parseInt(process.env.REGISTRATION_FEE_AMOUNT) || 9900 // $99.00
  }

  /**
   * Create a payment intent for consultant registration
   */
  async createRegistrationPaymentIntent(consultantData) {
    try {
      const { email, firstName, lastName, consultantId } = consultantData

      const paymentIntent = await stripe.paymentIntents.create({
        amount: this.registrationFee,
        currency: 'usd',
        description: 'Prismscope Consultant Network Vetting Fee',
        receipt_email: email,
        metadata: {
          consultant_id: consultantId.toString(),
          consultant_name: `${firstName} ${lastName}`,
          consultant_email: email,
          type: 'registration_fee'
        },
        automatic_payment_methods: {
          enabled: true
        }
      })

      // Create payment record in database
      const payment = new Payment({
        paymentIntentId: paymentIntent.id,
        consultantId: consultantId,
        consultantEmail: email,
        amount: this.registrationFee,
        currency: 'usd',
        status: paymentIntent.status,
        description: 'Prismscope Consultant Network Vetting Fee',
        receiptEmail: email,
        metadata: {
          consultantName: `${firstName} ${lastName}`,
          applicationId: consultantId.toString(),
          source: 'consultant_registration'
        }
      })

      await payment.save()

      logger.info(`Payment intent created: ${paymentIntent.id} for consultant: ${consultantId}`)

      return {
        paymentIntent,
        payment,
        clientSecret: paymentIntent.client_secret
      }
    } catch (error) {
      logger.error('Error creating payment intent:', error)
      throw new Error(`Payment intent creation failed: ${error.message}`)
    }
  }

  /**
   * Confirm payment intent
   */
  async confirmPaymentIntent(paymentIntentId, paymentMethodId) {
    try {
      const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
        payment_method: paymentMethodId
      })

      // Update payment record
      await this.updatePaymentFromStripe(paymentIntent)

      logger.info(`Payment intent confirmed: ${paymentIntentId}`)
      return paymentIntent
    } catch (error) {
      logger.error('Error confirming payment intent:', error)
      throw new Error(`Payment confirmation failed: ${error.message}`)
    }
  }

  /**
   * Retrieve payment intent from Stripe
   */
  async retrievePaymentIntent(paymentIntentId) {
    try {
      return await stripe.paymentIntents.retrieve(paymentIntentId)
    } catch (error) {
      logger.error('Error retrieving payment intent:', error)
      throw new Error(`Payment retrieval failed: ${error.message}`)
    }
  }

  /**
   * Handle webhook events
   */
  async handleWebhook(payload, signature) {
    try {
      const event = stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      )

      logger.info(`Stripe webhook received: ${event.type}`)

      switch (event.type) {
        case 'payment_intent.succeeded':
          await this.handlePaymentSuccess(event.data.object)
          break
        case 'payment_intent.payment_failed':
          await this.handlePaymentFailure(event.data.object)
          break
        case 'payment_intent.canceled':
          await this.handlePaymentCancellation(event.data.object)
          break
        case 'payment_method.attached':
          await this.handlePaymentMethodAttached(event.data.object)
          break
        default:
          logger.info(`Unhandled webhook event type: ${event.type}`)
      }

      return { received: true, eventType: event.type }
    } catch (error) {
      logger.error('Webhook signature verification failed:', error)
      throw new Error('Webhook verification failed')
    }
  }

  /**
   * Handle successful payment
   */
  async handlePaymentSuccess(paymentIntent) {
    try {
      const payment = await Payment.findOne({ paymentIntentId: paymentIntent.id })
      if (!payment) {
        logger.error(`Payment record not found for intent: ${paymentIntent.id}`)
        return
      }

      // Update payment record
      payment.status = 'succeeded'
      payment.succeededAt = new Date()
      
      if (paymentIntent.charges.data.length > 0) {
        const charge = paymentIntent.charges.data[0]
        payment.receiptUrl = charge.receipt_url
        payment.fees = {
          stripeFee: charge.balance_transaction?.fee || 0,
          applicationFee: charge.application_fee_amount || 0,
          netAmount: charge.balance_transaction?.net || paymentIntent.amount
        }
      }

      await payment.save()

      // Update consultant status
      const Consultant = require('../models/Consultant')
      await Consultant.findByIdAndUpdate(payment.consultantId, {
        paymentStatus: 'completed',
        paymentDate: new Date(),
        paymentIntentId: paymentIntent.id,
        status: 'under_review'
      })

      // Send confirmation email
      await this.sendPaymentConfirmationEmail(payment)

      logger.info(`Payment succeeded for consultant: ${payment.consultantId}`)
    } catch (error) {
      logger.error('Error handling payment success:', error)
    }
  }

  /**
   * Handle payment failure
   */
  async handlePaymentFailure(paymentIntent) {
    try {
      const payment = await Payment.findOne({ paymentIntentId: paymentIntent.id })
      if (!payment) {
        logger.error(`Payment record not found for intent: ${paymentIntent.id}`)
        return
      }

      payment.status = 'failed'
      payment.failedAt = new Date()
      await payment.save()

      // Update consultant status
      const Consultant = require('../models/Consultant')
      await Consultant.findByIdAndUpdate(payment.consultantId, {
        paymentStatus: 'failed'
      })

      logger.info(`Payment failed for consultant: ${payment.consultantId}`)
    } catch (error) {
      logger.error('Error handling payment failure:', error)
    }
  }

  /**
   * Handle payment cancellation
   */
  async handlePaymentCancellation(paymentIntent) {
    try {
      const payment = await Payment.findOne({ paymentIntentId: paymentIntent.id })
      if (!payment) {
        logger.error(`Payment record not found for intent: ${paymentIntent.id}`)
        return
      }

      payment.status = 'canceled'
      payment.canceledAt = new Date()
      await payment.save()

      logger.info(`Payment canceled for consultant: ${payment.consultantId}`)
    } catch (error) {
      logger.error('Error handling payment cancellation:', error)
    }
  }

  /**
   * Handle payment method attachment
   */
  async handlePaymentMethodAttached(paymentMethod) {
    try {
      // Find payment by customer or payment intent
      const payments = await Payment.find({
        'paymentMethod.id': paymentMethod.id
      })

      for (const payment of payments) {
        payment.paymentMethod = {
          id: paymentMethod.id,
          type: paymentMethod.type,
          card: paymentMethod.card ? {
            brand: paymentMethod.card.brand,
            last4: paymentMethod.card.last4,
            expMonth: paymentMethod.card.exp_month,
            expYear: paymentMethod.card.exp_year,
            funding: paymentMethod.card.funding
          } : undefined,
          billingDetails: paymentMethod.billing_details
        }

        await payment.save()
      }

      logger.info(`Payment method attached: ${paymentMethod.id}`)
    } catch (error) {
      logger.error('Error handling payment method attachment:', error)
    }
  }

  /**
   * Update payment record from Stripe payment intent
   */
  async updatePaymentFromStripe(paymentIntent) {
    try {
      const payment = await Payment.findOne({ paymentIntentId: paymentIntent.id })
      if (!payment) {
        logger.error(`Payment record not found for intent: ${paymentIntent.id}`)
        return null
      }

      payment.status = paymentIntent.status
      payment.stripePaymentId = paymentIntent.id

      if (paymentIntent.payment_method) {
        const paymentMethod = await stripe.paymentMethods.retrieve(paymentIntent.payment_method)
        payment.paymentMethod = {
          id: paymentMethod.id,
          type: paymentMethod.type,
          card: paymentMethod.card ? {
            brand: paymentMethod.card.brand,
            last4: paymentMethod.card.last4,
            expMonth: paymentMethod.card.exp_month,
            expYear: paymentMethod.card.exp_year,
            funding: paymentMethod.card.funding
          } : undefined,
          billingDetails: paymentMethod.billing_details
        }
      }

      await payment.save()
      return payment
    } catch (error) {
      logger.error('Error updating payment from Stripe:', error)
      return null
    }
  }

  /**
   * Create refund
   */
  async createRefund(paymentIntentId, amount, reason = 'requested_by_customer') {
    try {
      const paymentIntent = await this.retrievePaymentIntent(paymentIntentId)
      
      const refund = await stripe.refunds.create({
        payment_intent: paymentIntentId,
        amount: amount,
        reason: reason,
        metadata: {
          refund_type: 'consultant_registration',
          original_payment_intent: paymentIntentId
        }
      })

      // Update payment record
      const payment = await Payment.findOne({ paymentIntentId })
      if (payment) {
        await payment.addRefund({
          refundId: refund.id,
          amount: refund.amount,
          reason: refund.reason,
          status: refund.status,
          createdAt: new Date(refund.created * 1000),
          receiptNumber: refund.receipt_number
        })
      }

      logger.info(`Refund created: ${refund.id} for payment: ${paymentIntentId}`)
      return refund
    } catch (error) {
      logger.error('Error creating refund:', error)
      throw new Error(`Refund creation failed: ${error.message}`)
    }
  }

  /**
   * Send payment confirmation email
   */
  async sendPaymentConfirmationEmail(payment) {
    try {
      const emailService = require('./email')
      const Consultant = require('../models/Consultant')
      
      const consultant = await Consultant.findById(payment.consultantId)
      if (!consultant) return

      const emailData = {
        to: consultant.email,
        subject: 'Payment Confirmed - Welcome to Prismscope Consultant Network',
        template: 'payment-confirmation',
        data: {
          consultantName: consultant.fullName,
          amount: payment.formattedAmount,
          paymentDate: payment.succeededAt.toLocaleDateString(),
          receiptUrl: payment.receiptUrl
        }
      }

      await emailService.sendEmail(emailData)
      logger.info(`Payment confirmation email sent to: ${consultant.email}`)
    } catch (error) {
      logger.error('Error sending payment confirmation email:', error)
    }
  }

  /**
   * Get payment dashboard data
   */
  async getDashboardData(startDate, endDate) {
    try {
      const [stripeBalance, paymentStats] = await Promise.all([
        stripe.balance.retrieve(),
        Payment.getPaymentStats(startDate, endDate)
      ])

      return {
        stripeBalance,
        paymentStats,
        generatedAt: new Date()
      }
    } catch (error) {
      logger.error('Error getting dashboard data:', error)
      throw new Error(`Dashboard data retrieval failed: ${error.message}`)
    }
  }

  // ====== STRIPE CONNECT METHODS ======

  /**
   * Create Stripe Connect account for consultant
   */
  async createConnectAccount(consultantData) {
    try {
      const { email, firstName, lastName, consultantId, country = 'US' } = consultantData

      const account = await stripe.accounts.create({
        type: 'express',
        email,
        business_type: 'individual',
        individual: {
          first_name: firstName,
          last_name: lastName,
          email
        },
        business_profile: {
          mcc: '7372', // Business services, not elsewhere classified
          product_description: 'AI and automation consulting services',
          support_email: email,
          url: process.env.FRONTEND_URL
        },
        settings: {
          payouts: {
            schedule: {
              interval: 'weekly'
            }
          }
        },
        country,
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true }
        },
        metadata: {
          consultant_id: consultantId.toString(),
          consultant_name: `${firstName} ${lastName}`,
          platform: 'prismscope'
        }
      })

      logger.info(`Stripe Connect account created: ${account.id} for consultant: ${consultantId}`)
      return account

    } catch (error) {
      logger.error('Error creating Stripe Connect account:', error)
      throw new Error(`Connect account creation failed: ${error.message}`)
    }
  }

  /**
   * Create onboarding link for Stripe Connect
   */
  async createOnboardingLink(connectAccountId, consultantId) {
    try {
      const accountLink = await stripe.accountLinks.create({
        account: connectAccountId,
        refresh_url: `${process.env.FRONTEND_URL}/consultant/dashboard?refresh=stripe`,
        return_url: `${process.env.FRONTEND_URL}/consultant/dashboard?setup=complete`,
        type: 'account_onboarding',
        collect: 'eventually_due'
      })

      logger.info(`Onboarding link created for consultant: ${consultantId}`)
      return accountLink

    } catch (error) {
      logger.error('Error creating onboarding link:', error)
      throw new Error(`Onboarding link creation failed: ${error.message}`)
    }
  }

  /**
   * Retrieve Stripe Connect account details
   */
  async getConnectAccount(connectAccountId) {
    try {
      const account = await stripe.accounts.retrieve(connectAccountId)
      return account
    } catch (error) {
      logger.error('Error retrieving Connect account:', error)
      throw new Error(`Connect account retrieval failed: ${error.message}`)
    }
  }

  /**
   * Create transfer to consultant's Connect account
   */
  async createTransfer(consultantConnectAccountId, amount, currency = 'usd', metadata = {}) {
    try {
      const transfer = await stripe.transfers.create({
        amount: Math.round(amount), // Ensure amount is integer
        currency,
        destination: consultantConnectAccountId,
        metadata: {
          ...metadata,
          transfer_type: 'consultant_payout'
        }
      })

      logger.info(`Transfer created: ${transfer.id} for ${amount/100} ${currency.toUpperCase()}`)
      return transfer

    } catch (error) {
      logger.error('Error creating transfer:', error)
      throw new Error(`Transfer creation failed: ${error.message}`)
    }
  }

  /**
   * Create payment intent with application fee for project
   */
  async createProjectPaymentIntent(paymentData) {
    try {
      const {
        amount,
        consultantConnectAccountId,
        applicationFeeAmount,
        currency = 'usd',
        clientEmail,
        projectId,
        description
      } = paymentData

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount),
        currency,
        application_fee_amount: Math.round(applicationFeeAmount),
        transfer_data: {
          destination: consultantConnectAccountId
        },
        description: description || 'Project payment',
        receipt_email: clientEmail,
        metadata: {
          project_id: projectId,
          type: 'project_payment',
          consultant_account: consultantConnectAccountId
        },
        automatic_payment_methods: {
          enabled: true
        }
      })

      logger.info(`Project payment intent created: ${paymentIntent.id}`)
      return paymentIntent

    } catch (error) {
      logger.error('Error creating project payment intent:', error)
      throw new Error(`Project payment intent creation failed: ${error.message}`)
    }
  }

  /**
   * Create escrow hold for project milestone
   */
  async createEscrowHold(escrowData) {
    try {
      const {
        amount,
        currency = 'usd',
        projectId,
        milestoneId,
        clientPaymentMethodId,
        description
      } = escrowData

      // Create payment intent but don't capture immediately
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount),
        currency,
        payment_method: clientPaymentMethodId,
        confirmation_method: 'manual',
        capture_method: 'manual', // Hold for later capture
        description: description || 'Escrow hold for project milestone',
        metadata: {
          project_id: projectId,
          milestone_id: milestoneId,
          type: 'escrow_hold'
        }
      })

      // Confirm the payment intent to authorize the payment
      const confirmedIntent = await stripe.paymentIntents.confirm(paymentIntent.id)

      logger.info(`Escrow hold created: ${confirmedIntent.id} for milestone: ${milestoneId}`)
      return confirmedIntent

    } catch (error) {
      logger.error('Error creating escrow hold:', error)
      throw new Error(`Escrow hold creation failed: ${error.message}`)
    }
  }

  /**
   * Release escrow payment to consultant
   */
  async releaseEscrowPayment(paymentIntentId, consultantConnectAccountId, platformFeeAmount) {
    try {
      // Capture the held payment
      const capturedIntent = await stripe.paymentIntents.capture(paymentIntentId, {
        application_fee_amount: Math.round(platformFeeAmount)
      })

      // Create transfer to consultant (amount minus platform fee)
      const transferAmount = capturedIntent.amount - Math.round(platformFeeAmount)
      const transfer = await stripe.transfers.create({
        amount: transferAmount,
        currency: capturedIntent.currency,
        destination: consultantConnectAccountId,
        source_transaction: capturedIntent.charges.data[0].id,
        metadata: {
          original_payment_intent: paymentIntentId,
          type: 'escrow_release'
        }
      })

      logger.info(`Escrow released: ${transfer.id} for payment: ${paymentIntentId}`)
      return { capturedIntent, transfer }

    } catch (error) {
      logger.error('Error releasing escrow payment:', error)
      throw new Error(`Escrow release failed: ${error.message}`)
    }
  }

  /**
   * Cancel escrow hold and refund client
   */
  async cancelEscrowHold(paymentIntentId, reason = 'requested_by_customer') {
    try {
      // Cancel the payment intent which will release the hold
      const canceledIntent = await stripe.paymentIntents.cancel(paymentIntentId, {
        cancellation_reason: reason
      })

      logger.info(`Escrow hold canceled: ${paymentIntentId}`)
      return canceledIntent

    } catch (error) {
      logger.error('Error canceling escrow hold:', error)
      throw new Error(`Escrow cancellation failed: ${error.message}`)
    }
  }

  /**
   * Get Connect account balance
   */
  async getConnectAccountBalance(connectAccountId) {
    try {
      const balance = await stripe.balance.retrieve({
        stripeAccount: connectAccountId
      })
      return balance
    } catch (error) {
      logger.error('Error getting Connect account balance:', error)
      throw new Error(`Balance retrieval failed: ${error.message}`)
    }
  }

  /**
   * List Connect account transfers
   */
  async getConnectAccountTransfers(connectAccountId, limit = 10) {
    try {
      const transfers = await stripe.transfers.list({
        destination: connectAccountId,
        limit
      })
      return transfers
    } catch (error) {
      logger.error('Error getting Connect account transfers:', error)
      throw new Error(`Transfers retrieval failed: ${error.message}`)
    }
  }

  /**
   * Update Connect account information
   */
  async updateConnectAccount(connectAccountId, updateData) {
    try {
      const account = await stripe.accounts.update(connectAccountId, updateData)
      logger.info(`Connect account updated: ${connectAccountId}`)
      return account
    } catch (error) {
      logger.error('Error updating Connect account:', error)
      throw new Error(`Account update failed: ${error.message}`)
    }
  }

  /**
   * Delete/deactivate Connect account
   */
  async deactivateConnectAccount(connectAccountId) {
    try {
      const account = await stripe.accounts.update(connectAccountId, {
        settings: {
          payouts: {
            schedule: {
              interval: 'manual'
            }
          }
        }
      })
      
      logger.info(`Connect account deactivated: ${connectAccountId}`)
      return account
    } catch (error) {
      logger.error('Error deactivating Connect account:', error)
      throw new Error(`Account deactivation failed: ${error.message}`)
    }
  }

  /**
   * Handle Connect account webhook events
   */
  async handleConnectWebhook(event) {
    try {
      const account = event.data.object
      const accountId = account.id
      
      logger.info(`Connect webhook received: ${event.type} for account: ${accountId}`)

      switch (event.type) {
        case 'account.updated':
          await this.handleConnectAccountUpdated(account)
          break
        case 'account.application.authorized':
          await this.handleConnectAccountAuthorized(account)
          break
        case 'account.application.deauthorized':
          await this.handleConnectAccountDeauthorized(account)
          break
        case 'capability.updated':
          await this.handleConnectCapabilityUpdated(event.data.object)
          break
        default:
          logger.info(`Unhandled Connect webhook event: ${event.type}`)
      }

      return { received: true, eventType: event.type }
    } catch (error) {
      logger.error('Error handling Connect webhook:', error)
      throw new Error(`Connect webhook handling failed: ${error.message}`)
    }
  }

  /**
   * Handle Connect account updated event
   */
  async handleConnectAccountUpdated(account) {
    try {
      const Consultant = require('../models/Consultant')
      const consultant = await Consultant.findOne({ stripeConnectAccountId: account.id })
      
      if (!consultant) {
        logger.error(`Consultant not found for Connect account: ${account.id}`)
        return
      }

      // Update consultant with latest account info
      consultant.stripeConnectStatus = this.mapStripeAccountStatus(account)
      consultant.stripePayoutsEnabled = account.payouts_enabled
      consultant.stripeChargesEnabled = account.charges_enabled
      
      // Update requirements
      consultant.stripeRequirements = {
        currentlyDue: account.requirements?.currently_due || [],
        pastDue: account.requirements?.past_due || [],
        eventuallyDue: account.requirements?.eventually_due || [],
        pendingVerification: account.requirements?.pending_verification || [],
        disabledReason: account.requirements?.disabled_reason
      }

      // Update bank account info if available
      if (account.external_accounts?.data?.[0]) {
        const bankAccount = account.external_accounts.data[0]
        consultant.bankAccountDetails = {
          country: bankAccount.country,
          currency: bankAccount.currency,
          accountHolderName: bankAccount.account_holder_name,
          accountHolderType: bankAccount.account_holder_type,
          routingNumber: bankAccount.routing_number,
          last4: bankAccount.last4,
          verified: bankAccount.status === 'verified'
        }
      }

      await consultant.save()
      logger.info(`Consultant updated from Connect webhook: ${consultant._id}`)

    } catch (error) {
      logger.error('Error handling Connect account update:', error)
    }
  }

  /**
   * Handle Connect account authorized event
   */
  async handleConnectAccountAuthorized(account) {
    try {
      const Consultant = require('../models/Consultant')
      const consultant = await Consultant.findOne({ stripeConnectAccountId: account.id })
      
      if (consultant) {
        consultant.stripeConnectStatus = 'enabled'
        await consultant.save()
        logger.info(`Consultant Connect account authorized: ${consultant._id}`)
      }
    } catch (error) {
      logger.error('Error handling Connect account authorization:', error)
    }
  }

  /**
   * Handle Connect account deauthorized event
   */
  async handleConnectAccountDeauthorized(account) {
    try {
      const Consultant = require('../models/Consultant')
      const consultant = await Consultant.findOne({ stripeConnectAccountId: account.id })
      
      if (consultant) {
        consultant.stripeConnectStatus = 'rejected'
        consultant.stripePayoutsEnabled = false
        consultant.stripeChargesEnabled = false
        await consultant.save()
        logger.info(`Consultant Connect account deauthorized: ${consultant._id}`)
      }
    } catch (error) {
      logger.error('Error handling Connect account deauthorization:', error)
    }
  }

  /**
   * Handle Connect capability updated event
   */
  async handleConnectCapabilityUpdated(capability) {
    try {
      const Consultant = require('../models/Consultant')
      const consultant = await Consultant.findOne({ stripeConnectAccountId: capability.account })
      
      if (consultant) {
        // Update specific capability status
        if (capability.id === 'card_payments') {
          consultant.stripeChargesEnabled = capability.status === 'active'
        } else if (capability.id === 'transfers') {
          consultant.stripePayoutsEnabled = capability.status === 'active'
        }
        
        await consultant.save()
        logger.info(`Consultant capability updated: ${consultant._id} - ${capability.id}: ${capability.status}`)
      }
    } catch (error) {
      logger.error('Error handling Connect capability update:', error)
    }
  }

  /**
   * Map Stripe account status to our internal status
   */
  mapStripeAccountStatus(account) {
    if (!account.details_submitted) return 'not_started'
    if (account.requirements?.currently_due?.length > 0) return 'pending'
    if (account.requirements?.disabled_reason) return 'restricted'
    if (account.payouts_enabled && account.charges_enabled) return 'enabled'
    return 'pending'
  }

  /**
   * Get Connect account analytics
   */
  async getConnectAnalytics(startDate, endDate) {
    try {
      const Consultant = require('../models/Consultant')
      
      const [consultantStats, transferStats] = await Promise.all([
        Consultant.aggregate([
          {
            $group: {
              _id: '$stripeConnectStatus',
              count: { $sum: 1 },
              totalEarnings: { $sum: '$earnings.total' }
            }
          }
        ]),
        this.getTransferAnalytics(startDate, endDate)
      ])

      return {
        consultantStats,
        transferStats,
        generatedAt: new Date()
      }
    } catch (error) {
      logger.error('Error getting Connect analytics:', error)
      throw new Error(`Connect analytics retrieval failed: ${error.message}`)
    }
  }

  /**
   * Get transfer analytics from Stripe
   */
  async getTransferAnalytics(startDate, endDate) {
    try {
      const queryParams = { limit: 100 }
      if (startDate) queryParams.created = { gte: Math.floor(startDate.getTime() / 1000) }
      if (endDate) queryParams.created = { ...queryParams.created, lte: Math.floor(endDate.getTime() / 1000) }

      const transfers = await stripe.transfers.list(queryParams)
      
      const analytics = {
        totalTransfers: transfers.data.length,
        totalAmount: transfers.data.reduce((sum, transfer) => sum + transfer.amount, 0),
        averageTransfer: 0,
        currency: 'usd'
      }

      analytics.averageTransfer = analytics.totalTransfers > 0 ? 
        analytics.totalAmount / analytics.totalTransfers : 0

      return analytics
    } catch (error) {
      logger.error('Error getting transfer analytics:', error)
      return { totalTransfers: 0, totalAmount: 0, averageTransfer: 0 }
    }
  }
}

module.exports = new StripeService()