const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
  // Payment Identification
  paymentIntentId: {
    type: String,
    required: true,
    unique: true
  },
  stripePaymentId: String,
  
  // Consultant Information
  consultantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consultant',
    required: true
  },
  consultantEmail: {
    type: String,
    required: true
  },
  
  // Payment Details
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    required: true,
    default: 'usd',
    uppercase: true
  },
  
  // Payment Status
  status: {
    type: String,
    enum: [
      'pending',
      'requires_payment_method',
      'requires_confirmation',
      'requires_action',
      'processing',
      'requires_capture',
      'canceled',
      'succeeded',
      'failed'
    ],
    required: true,
    default: 'pending'
  },
  
  // Payment Method Details
  paymentMethod: {
    id: String,
    type: String, // card, bank_transfer, etc.
    card: {
      brand: String, // visa, mastercard, etc.
      last4: String,
      expMonth: Number,
      expYear: Number,
      funding: String // credit, debit, prepaid
    },
    billingDetails: {
      name: String,
      email: String,
      phone: String,
      address: {
        line1: String,
        line2: String,
        city: String,
        state: String,
        postalCode: String,
        country: String
      }
    }
  },
  
  // Transaction Details
  description: {
    type: String,
    default: 'Prismscope Consultant Network Vetting Fee'
  },
  receiptEmail: String,
  receiptUrl: String,
  
  // Fee Breakdown
  fees: {
    stripeFee: Number,
    applicationFee: Number,
    netAmount: Number
  },
  
  // Refund Information
  refunds: [{
    refundId: String,
    amount: Number,
    reason: String,
    status: String,
    createdAt: Date,
    receiptNumber: String
  }],
  totalRefunded: {
    type: Number,
    default: 0
  },
  
  // Webhook Events
  events: [{
    eventId: String,
    eventType: String,
    processed: { type: Boolean, default: false },
    processedAt: Date,
    data: mongoose.Schema.Types.Mixed,
    createdAt: { type: Date, default: Date.now }
  }],
  
  // Metadata
  metadata: {
    consultantName: String,
    applicationId: String,
    source: { type: String, default: 'consultant_registration' },
    ipAddress: String,
    userAgent: String
  },
  
  // Audit Trail
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  succeededAt: Date,
  failedAt: Date,
  canceledAt: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Indexes
paymentSchema.index({ paymentIntentId: 1 }, { unique: true })
paymentSchema.index({ consultantId: 1 })
paymentSchema.index({ status: 1 })
paymentSchema.index({ createdAt: -1 })
paymentSchema.index({ consultantEmail: 1 })
paymentSchema.index({ 'events.eventId': 1 }, { sparse: true })

// Virtual for payment status display
paymentSchema.virtual('statusDisplay').get(function() {
  const statusMap = {
    'pending': 'Pending',
    'requires_payment_method': 'Requires Payment Method',
    'requires_confirmation': 'Requires Confirmation',
    'requires_action': 'Requires Action',
    'processing': 'Processing',
    'requires_capture': 'Requires Capture',
    'canceled': 'Canceled',
    'succeeded': 'Completed',
    'failed': 'Failed'
  }
  return statusMap[this.status] || this.status
})

// Virtual for formatted amount
paymentSchema.virtual('formattedAmount').get(function() {
  return `$${(this.amount / 100).toFixed(2)}`
})

// Virtual for refund status
paymentSchema.virtual('refundStatus').get(function() {
  if (this.totalRefunded === 0) return 'none'
  if (this.totalRefunded === this.amount) return 'full'
  return 'partial'
})

// Pre-save middleware
paymentSchema.pre('save', function(next) {
  this.updatedAt = Date.now()
  
  // Set specific timestamps based on status
  if (this.isModified('status')) {
    switch (this.status) {
      case 'succeeded':
        this.succeededAt = Date.now()
        break
      case 'failed':
        this.failedAt = Date.now()
        break
      case 'canceled':
        this.canceledAt = Date.now()
        break
    }
  }
  
  next()
})

// Method to add webhook event
paymentSchema.methods.addEvent = function(eventId, eventType, data) {
  // Check if event already exists
  const existingEvent = this.events.find(e => e.eventId === eventId)
  if (existingEvent) {
    return existingEvent
  }
  
  const newEvent = {
    eventId,
    eventType,
    data,
    processed: false,
    createdAt: new Date()
  }
  
  this.events.push(newEvent)
  return newEvent
}

// Method to mark event as processed
paymentSchema.methods.markEventProcessed = function(eventId) {
  const event = this.events.find(e => e.eventId === eventId)
  if (event) {
    event.processed = true
    event.processedAt = new Date()
  }
  return event
}

// Method to add refund
paymentSchema.methods.addRefund = function(refundData) {
  this.refunds.push(refundData)
  this.totalRefunded += refundData.amount
  return this.save()
}

// Method to check if payment is complete
paymentSchema.methods.isComplete = function() {
  return this.status === 'succeeded'
}

// Method to check if payment failed
paymentSchema.methods.isFailed = function() {
  return this.status === 'failed' || this.status === 'canceled'
}

// Static method to get payment statistics
paymentSchema.statics.getPaymentStats = function(startDate, endDate) {
  const matchStage = {}
  
  if (startDate || endDate) {
    matchStage.createdAt = {}
    if (startDate) matchStage.createdAt.$gte = new Date(startDate)
    if (endDate) matchStage.createdAt.$lte = new Date(endDate)
  }
  
  return this.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        totalAmount: { $sum: '$amount' }
      }
    },
    {
      $project: {
        _id: 0,
        status: '$_id',
        count: 1,
        totalAmount: 1,
        formattedAmount: {
          $concat: ['$', { $toString: { $divide: ['$totalAmount', 100] } }]
        }
      }
    }
  ])
}

// Static method to find payments by consultant
paymentSchema.statics.findByConsultant = function(consultantId) {
  return this.find({ consultantId }).sort({ createdAt: -1 })
}

module.exports = mongoose.model('Payment', paymentSchema)