const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const consultantSchema = new mongoose.Schema({
  // Personal Information
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true,
    maxlength: 20
  },
  location: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },

  // Professional Information
  company: {
    type: String,
    trim: true,
    maxlength: 200
  },
  website: {
    type: String,
    trim: true,
    maxlength: 500
  },
  linkedIn: {
    type: String,
    trim: true,
    maxlength: 500
  },
  github: {
    type: String,
    trim: true,
    maxlength: 500
  },

  // Experience and Expertise
  yearsExperience: {
    type: String,
    required: true,
    enum: ['1-3', '3-5', '5-10', '10+']
  },
  expertise: [{
    type: String,
    enum: [
      'Machine Learning/AI',
      'GenAI/LLMs',
      'RPA (Robotic Process Automation)',
      'Workflow Automation',
      'Data Science/Analytics',
      'Computer Vision',
      'NLP (Natural Language Processing)',
      'Cloud AI Platforms',
      'AI Strategy Consulting',
      'Change Management'
    ]
  }],
  industries: [{
    type: String,
    enum: [
      'Healthcare',
      'Finance/Banking',
      'Retail/E-commerce',
      'Manufacturing',
      'Technology',
      'Government/Public Sector',
      'Education',
      'Energy/Utilities',
      'Transportation/Logistics',
      'Other'
    ]
  }],
  projectsCompleted: {
    type: String,
    trim: true,
    maxlength: 100
  },
  certifications: {
    type: String,
    trim: true,
    maxlength: 1000
  },
  message: {
    type: String,
    trim: true,
    maxlength: 2000
  },

  // OAuth Information
  oauthProvider: {
    type: String,
    enum: ['linkedin', 'google', 'microsoft', 'github'],
    sparse: true
  },
  oauthId: {
    type: String,
    sparse: true
  },
  profilePicture: {
    type: String,
    maxlength: 1000
  },

  // File Uploads
  resume: {
    filename: String,
    originalName: String,
    size: Number,
    mimetype: String,
    uploadDate: { type: Date, default: Date.now },
    s3Key: String,
    s3Url: String
  },

  // Application Status
  status: {
    type: String,
    enum: ['pending_payment', 'payment_completed', 'under_review', 'approved', 'rejected', 'suspended'],
    default: 'pending_payment'
  },
  applicationDate: {
    type: Date,
    default: Date.now
  },
  reviewDate: Date,
  approvalDate: Date,
  rejectionDate: Date,
  rejectionReason: String,

  // Payment Information
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentIntentId: String,
  paymentAmount: {
    type: Number,
    default: 9900 // $99.00 in cents
  },
  paymentDate: Date,
  refundId: String,
  refundDate: Date,
  refundReason: String,

  // Stripe Connect Integration
  stripeConnectAccountId: {
    type: String,
    sparse: true
  },
  stripeConnectStatus: {
    type: String,
    enum: ['not_started', 'pending', 'restricted', 'enabled', 'rejected'],
    default: 'not_started'
  },
  stripeOnboardingUrl: String,
  stripePayoutsEnabled: {
    type: Boolean,
    default: false
  },
  stripeChargesEnabled: {
    type: Boolean,
    default: false
  },
  stripeRequirements: {
    currentlyDue: [String],
    pastDue: [String],
    eventuallyDue: [String],
    pendingVerification: [String],
    disabledReason: String
  },
  bankAccountDetails: {
    country: String,
    currency: String,
    accountHolderName: String,
    accountHolderType: {
      type: String,
      enum: ['individual', 'company']
    },
    routingNumber: String,
    last4: String,
    verified: {
      type: Boolean,
      default: false
    }
  },

  // Platform Engagement
  platformFeeRate: {
    type: Number,
    min: 15,
    max: 40,
    default: 25 // Default to 25% if not specified
  },
  projectsAssigned: [{
    projectId: mongoose.Schema.Types.ObjectId,
    assignedDate: Date,
    status: {
      type: String,
      enum: ['assigned', 'in_progress', 'completed', 'cancelled']
    }
  }],
  earnings: {
    total: { type: Number, default: 0 },
    pending: { type: Number, default: 0 },
    paid: { type: Number, default: 0 },
    escrow: { type: Number, default: 0 }
  },

  // Ratings and Reviews
  rating: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0 },
    breakdown: {
      communication: { type: Number, default: 0 },
      quality: { type: Number, default: 0 },
      timeline: { type: Number, default: 0 },
      expertise: { type: Number, default: 0 }
    }
  },
  completedProjects: { type: Number, default: 0 },
  successRate: { type: Number, default: 0, min: 0, max: 100 },

  // Matching Algorithm Data
  availabilityStatus: {
    type: String,
    enum: ['available', 'busy', 'unavailable'],
    default: 'available'
  },
  hourlyRate: {
    type: Number,
    min: 50,
    max: 500
  },
  weeklyAvailability: { type: Number, min: 1, max: 40 }, // hours per week
  preferredProjectSize: {
    type: String,
    enum: ['small', 'medium', 'large', 'enterprise']
  },
  workingTimezone: String,
  languagesSpoken: [String],

  // Account Management
  isActive: {
    type: Boolean,
    default: false
  },
  lastLogin: Date,
  passwordHash: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  emailVerificationToken: String,
  emailVerified: {
    type: Boolean,
    default: false
  },
  emailVerifiedAt: Date,

  // Admin Notes
  adminNotes: [{
    note: String,
    addedBy: String,
    addedAt: { type: Date, default: Date.now }
  }],

  // Audit Trail
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  createdBy: String,
  updatedBy: String
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Indexes
consultantSchema.index({ email: 1 }, { unique: true })
consultantSchema.index({ status: 1 })
consultantSchema.index({ paymentStatus: 1 })
consultantSchema.index({ applicationDate: -1 })
consultantSchema.index({ 'expertise': 1 })
consultantSchema.index({ 'industries': 1 })
consultantSchema.index({ oauthProvider: 1, oauthId: 1 }, { sparse: true })
consultantSchema.index({ stripeConnectAccountId: 1 }, { sparse: true })
consultantSchema.index({ stripeConnectStatus: 1 })
consultantSchema.index({ availabilityStatus: 1 })
consultantSchema.index({ 'rating.average': -1 })
consultantSchema.index({ hourlyRate: 1 })
consultantSchema.index({ completedProjects: -1 })
consultantSchema.index({ successRate: -1 })

// Virtual for full name
consultantSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`
})

// Virtual for application age in days
consultantSchema.virtual('applicationAge').get(function() {
  return Math.floor((Date.now() - this.applicationDate) / (1000 * 60 * 60 * 24))
})

// Pre-save middleware to hash passwords
consultantSchema.pre('save', async function(next) {
  // Only hash password if it's new or modified
  if (!this.isModified('passwordHash')) return next()
  
  if (this.passwordHash) {
    this.passwordHash = await bcrypt.hash(this.passwordHash, 12)
  }
  
  this.updatedAt = Date.now()
  next()
})

// Method to compare password
consultantSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.passwordHash) return false
  return await bcrypt.compare(candidatePassword, this.passwordHash)
}

// Method to check if application is complete
consultantSchema.methods.isApplicationComplete = function() {
  const requiredFields = [
    'firstName', 'lastName', 'email', 'location',
    'yearsExperience', 'expertise', 'industries'
  ]
  
  return requiredFields.every(field => {
    const value = this[field]
    return value && (Array.isArray(value) ? value.length > 0 : true)
  })
}

// Method to calculate next platform fee rate
consultantSchema.methods.calculatePlatformFee = function() {
  const completedProjects = this.projectsAssigned.filter(p => p.status === 'completed').length
  const totalEarnings = this.earnings.total
  
  // Platform fee decreases with experience and performance
  let feeRate = 40 // Start at 40%
  
  if (completedProjects >= 10 && totalEarnings >= 50000) {
    feeRate = 15 // Minimum fee for top performers
  } else if (completedProjects >= 5 && totalEarnings >= 20000) {
    feeRate = 25
  } else if (completedProjects >= 2) {
    feeRate = 35
  }
  
  return feeRate
}

// Static method to find consultants by expertise
consultantSchema.statics.findByExpertise = function(expertiseArea) {
  return this.find({
    expertise: expertiseArea,
    status: 'approved',
    isActive: true
  })
}

// Static method to get application statistics
consultantSchema.statics.getApplicationStats = function() {
  return this.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ])
}

// Method to check if consultant can receive payouts
consultantSchema.methods.canReceivePayouts = function() {
  return this.stripeConnectStatus === 'enabled' && 
         this.stripePayoutsEnabled && 
         this.bankAccountDetails.verified
}

// Method to update ratings after project completion
consultantSchema.methods.updateRating = function(newRating) {
  const { communication, quality, timeline, expertise } = newRating
  
  if (this.rating.count === 0) {
    this.rating.breakdown = { communication, quality, timeline, expertise }
    this.rating.average = (communication + quality + timeline + expertise) / 4
    this.rating.count = 1
  } else {
    const currentCount = this.rating.count
    const newCount = currentCount + 1
    
    // Update each breakdown category
    this.rating.breakdown.communication = 
      ((this.rating.breakdown.communication * currentCount) + communication) / newCount
    this.rating.breakdown.quality = 
      ((this.rating.breakdown.quality * currentCount) + quality) / newCount
    this.rating.breakdown.timeline = 
      ((this.rating.breakdown.timeline * currentCount) + timeline) / newCount
    this.rating.breakdown.expertise = 
      ((this.rating.breakdown.expertise * currentCount) + expertise) / newCount
    
    // Update overall average
    this.rating.average = (
      this.rating.breakdown.communication + 
      this.rating.breakdown.quality + 
      this.rating.breakdown.timeline + 
      this.rating.breakdown.expertise
    ) / 4
    
    this.rating.count = newCount
  }
}

// Method to calculate consultant match score for a project
consultantSchema.methods.calculateMatchScore = function(projectRequirements) {
  let score = 0
  const weights = {
    expertise: 0.4,
    industry: 0.2,
    availability: 0.15,
    rating: 0.1,
    rate: 0.1,
    experience: 0.05
  }

  // Expertise match
  const expertiseMatches = projectRequirements.requiredExpertise.filter(req => 
    this.expertise.includes(req)
  ).length
  score += (expertiseMatches / projectRequirements.requiredExpertise.length) * weights.expertise * 100

  // Industry match
  if (this.industries.includes(projectRequirements.industry)) {
    score += weights.industry * 100
  }

  // Availability match
  if (this.availabilityStatus === 'available' && 
      this.weeklyAvailability >= projectRequirements.hoursPerWeek) {
    score += weights.availability * 100
  }

  // Rating bonus
  score += (this.rating.average / 5) * weights.rating * 100

  // Rate compatibility (prefer consultants within budget range)
  if (projectRequirements.maxHourlyRate && 
      this.hourlyRate && 
      this.hourlyRate <= projectRequirements.maxHourlyRate) {
    score += weights.rate * 100
  }

  // Experience level match
  const experienceMap = { '1-3': 1, '3-5': 2, '5-10': 3, '10+': 4 }
  const consultantExp = experienceMap[this.yearsExperience] || 0
  const requiredExp = experienceMap[projectRequirements.minExperience] || 0
  
  if (consultantExp >= requiredExp) {
    score += weights.experience * 100
  }

  return Math.min(100, Math.max(0, score))
}

// Static method for consultant matching
consultantSchema.statics.findMatchingConsultants = function(projectRequirements, limit = 10) {
  const pipeline = [
    {
      $match: {
        status: 'approved',
        isActive: true,
        availabilityStatus: 'available',
        stripeConnectStatus: 'enabled'
      }
    },
    {
      $addFields: {
        matchScore: {
          $function: {
            body: function(consultant, requirements) {
              // This would be implemented in the application layer
              // as MongoDB doesn't support complex JavaScript functions
              return 50; // Placeholder
            },
            args: ['$$ROOT', projectRequirements],
            lang: 'js'
          }
        }
      }
    },
    { $sort: { matchScore: -1, 'rating.average': -1, completedProjects: -1 } },
    { $limit: limit }
  ]
  
  return this.aggregate(pipeline)
}

// Static method to get consultant analytics
consultantSchema.statics.getConsultantAnalytics = function() {
  return this.aggregate([
    {
      $group: {
        _id: null,
        totalConsultants: { $sum: 1 },
        approvedConsultants: {
          $sum: { $cond: [{ $eq: ['$status', 'approved'] }, 1, 0] }
        },
        activeConsultants: {
          $sum: { $cond: ['$isActive', 1, 0] }
        },
        stripeEnabledConsultants: {
          $sum: { $cond: [{ $eq: ['$stripeConnectStatus', 'enabled'] }, 1, 0] }
        },
        averageRating: { $avg: '$rating.average' },
        totalEarnings: { $sum: '$earnings.total' },
        totalProjectsCompleted: { $sum: '$completedProjects' }
      }
    }
  ])
}

module.exports = mongoose.model('Consultant', consultantSchema)