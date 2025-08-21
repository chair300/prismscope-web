const mongoose = require('mongoose')

const consultantReviewSchema = new mongoose.Schema({
  // Review Participants
  consultantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consultant',
    required: true
  },
  reviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true // Can reference User (client) or Admin
  },
  reviewerType: {
    type: String,
    enum: ['client', 'admin', 'peer_consultant'],
    required: true
  },
  
  // Project Context
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
    required: true
  },
  
  // Review Details
  reviewType: {
    type: String,
    enum: ['project_completion', 'mid_project', 'annual_review', 'dispute_resolution'],
    default: 'project_completion'
  },
  
  // Ratings (1-5 scale)
  ratings: {
    overall: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    communication: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    technicalSkills: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    quality: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    timeline: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    professionalism: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    problemSolving: {
      type: Number,
      min: 1,
      max: 5
    },
    innovation: {
      type: Number,
      min: 1,
      max: 5
    },
    collaboration: {
      type: Number,
      min: 1,
      max: 5
    }
  },
  
  // Detailed Feedback
  feedback: {
    strengths: {
      type: String,
      required: true,
      maxlength: 1000
    },
    areasForImprovement: {
      type: String,
      maxlength: 1000
    },
    specificExamples: {
      type: String,
      maxlength: 2000
    },
    recommendations: {
      type: String,
      maxlength: 1000
    }
  },
  
  // Project-Specific Questions
  projectSpecific: {
    deliveredOnTime: {
      type: Boolean,
      required: true
    },
    metProjectRequirements: {
      type: Boolean,
      required: true
    },
    exceededExpectations: {
      type: Boolean,
      default: false
    },
    wouldHireAgain: {
      type: Boolean,
      required: function() {
        return this.reviewerType === 'client'
      }
    },
    wouldRecommendToOthers: {
      type: Boolean,
      required: true
    },
    budgetAdherence: {
      type: String,
      enum: ['under_budget', 'on_budget', 'over_budget', 'significantly_over'],
      required: true
    }
  },
  
  // Skills Assessment
  skillsAssessment: [{
    skillName: {
      type: String,
      required: true
    },
    proficiencyLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'expert'],
      required: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    comments: String
  }],
  
  // Industry-Specific Criteria
  industrySpecific: {
    industryKnowledge: {
      type: Number,
      min: 1,
      max: 5
    },
    regulatoryCompliance: {
      type: Number,
      min: 1,
      max: 5
    },
    bestPracticesAdherence: {
      type: Number,
      min: 1,
      max: 5
    },
    domainExpertise: {
      type: Number,
      min: 1,
      max: 5
    }
  },
  
  // Review Status and Verification
  status: {
    type: String,
    enum: ['draft', 'submitted', 'verified', 'published', 'disputed'],
    default: 'draft'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  verifiedAt: Date,
  
  // Publication Settings
  isPublic: {
    type: Boolean,
    default: true
  },
  showReviewerName: {
    type: Boolean,
    default: false
  },
  allowConsultantResponse: {
    type: Boolean,
    default: true
  },
  
  // Consultant Response
  consultantResponse: {
    response: {
      type: String,
      maxlength: 1000
    },
    responseDate: Date,
    acknowledgesIssues: Boolean,
    improvementPlan: String
  },
  
  // Review Impact
  impactOnConsultant: {
    ratingChange: Number, // Change in overall rating
    statusChange: String, // Any status changes triggered
    bonusAwarded: { type: Number, default: 0 },
    penaltyApplied: { type: Number, default: 0 },
    trainingRecommended: [String],
    privilegesAdjusted: String
  },
  
  // Administrative
  reviewNotes: [{
    note: String,
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin'
    },
    addedAt: { type: Date, default: Date.now },
    noteType: {
      type: String,
      enum: ['internal', 'quality_check', 'dispute', 'follow_up'],
      default: 'internal'
    }
  }],
  
  // Quality Assurance
  qualityCheck: {
    reviewedByAdmin: { type: Boolean, default: false },
    adminReviewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin'
    },
    adminReviewDate: Date,
    qualityScore: { type: Number, min: 0, max: 100 },
    flaggedIssues: [String],
    requiresFollowUp: { type: Boolean, default: false }
  },
  
  // Dispute Handling
  dispute: {
    isDisputed: { type: Boolean, default: false },
    disputedBy: String, // 'consultant' or 'client'
    disputeDate: Date,
    disputeReason: String,
    disputeResolution: String,
    resolvedDate: Date,
    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin'
    }
  },
  
  // Review Metadata
  reviewContext: {
    projectDuration: Number, // in days
    projectBudget: Number,
    projectComplexity: {
      type: String,
      enum: ['low', 'medium', 'high', 'expert'],
      default: 'medium'
    },
    teamSize: { type: Number, default: 1 },
    clientType: {
      type: String,
      enum: ['startup', 'small_business', 'enterprise', 'government', 'non_profit']
    }
  },
  
  // Analytics and Tracking
  reviewMetrics: {
    timeToComplete: Number, // minutes to complete review
    reviewLength: Number, // character count of feedback
    detailLevel: {
      type: String,
      enum: ['basic', 'detailed', 'comprehensive'],
      default: 'basic'
    },
    helpfulnessVotes: { type: Number, default: 0 },
    flagCount: { type: Number, default: 0 }
  },
  
  // Audit Trail
  submittedAt: {
    type: Date,
    default: Date.now
  },
  lastModified: {
    type: Date,
    default: Date.now
  },
  ipAddress: String,
  userAgent: String,
  createdBy: String,
  updatedBy: String
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Indexes
consultantReviewSchema.index({ consultantId: 1 })
consultantReviewSchema.index({ projectId: 1 })
consultantReviewSchema.index({ assignmentId: 1 })
consultantReviewSchema.index({ reviewerId: 1, reviewerType: 1 })
consultantReviewSchema.index({ status: 1 })
consultantReviewSchema.index({ isPublic: 1, isVerified: 1 })
consultantReviewSchema.index({ submittedAt: -1 })
consultantReviewSchema.index({ 'ratings.overall': -1 })

// Compound indexes
consultantReviewSchema.index({ consultantId: 1, status: 1, isPublic: 1 })
consultantReviewSchema.index({ consultantId: 1, 'ratings.overall': -1, submittedAt: -1 })

// Virtual for average rating
consultantReviewSchema.virtual('averageRating').get(function() {
  const ratings = this.ratings
  const ratingValues = Object.values(ratings).filter(r => typeof r === 'number' && r > 0)
  if (ratingValues.length === 0) return 0
  
  return ratingValues.reduce((sum, rating) => sum + rating, 0) / ratingValues.length
})

// Virtual for review summary
consultantReviewSchema.virtual('reviewSummary').get(function() {
  const totalChars = (this.feedback.strengths || '').length + 
                     (this.feedback.areasForImprovement || '').length +
                     (this.feedback.specificExamples || '').length
  
  if (totalChars > 1000) return 'comprehensive'
  if (totalChars > 500) return 'detailed'
  return 'basic'
})

// Virtual for days since review
consultantReviewSchema.virtual('daysSinceReview').get(function() {
  return Math.floor((Date.now() - this.submittedAt) / (1000 * 60 * 60 * 24))
})

// Pre-save middleware
consultantReviewSchema.pre('save', function(next) {
  this.lastModified = Date.now()
  
  // Calculate review metrics
  const feedbackLength = (this.feedback.strengths || '').length + 
                         (this.feedback.areasForImprovement || '').length +
                         (this.feedback.specificExamples || '').length +
                         (this.feedback.recommendations || '').length
  
  this.reviewMetrics.reviewLength = feedbackLength
  this.reviewMetrics.detailLevel = feedbackLength > 1000 ? 'comprehensive' : 
                                   feedbackLength > 500 ? 'detailed' : 'basic'
  
  next()
})

// Method to calculate overall impact score
consultantReviewSchema.methods.calculateImpactScore = function() {
  let score = 0
  const weights = {
    overall: 0.3,
    quality: 0.2,
    communication: 0.15,
    timeline: 0.15,
    technicalSkills: 0.2
  }
  
  Object.keys(weights).forEach(key => {
    if (this.ratings[key]) {
      score += this.ratings[key] * weights[key]
    }
  })
  
  return Math.round(score * 20) // Convert to 0-100 scale
}

// Method to flag for admin review
consultantReviewSchema.methods.flagForReview = function(reason, flaggedBy) {
  this.qualityCheck.requiresFollowUp = true
  this.qualityCheck.flaggedIssues.push(reason)
  this.reviewNotes.push({
    note: `Review flagged: ${reason}`,
    addedBy: flaggedBy,
    noteType: 'quality_check'
  })
  
  return this.save()
}

// Method to dispute review
consultantReviewSchema.methods.disputeReview = function(reason, disputedBy) {
  this.dispute.isDisputed = true
  this.dispute.disputedBy = disputedBy
  this.dispute.disputeDate = new Date()
  this.dispute.disputeReason = reason
  this.status = 'disputed'
  
  return this.save()
}

// Method to resolve dispute
consultantReviewSchema.methods.resolveDispute = function(resolution, resolvedBy) {
  this.dispute.disputeResolution = resolution
  this.dispute.resolvedDate = new Date()
  this.dispute.resolvedBy = resolvedBy
  this.status = 'verified'
  
  return this.save()
}

// Method to verify review
consultantReviewSchema.methods.verifyReview = function(verifiedBy, qualityScore) {
  this.isVerified = true
  this.verifiedBy = verifiedBy
  this.verifiedAt = new Date()
  this.status = 'verified'
  
  if (qualityScore !== undefined) {
    this.qualityCheck.qualityScore = qualityScore
    this.qualityCheck.reviewedByAdmin = true
    this.qualityCheck.adminReviewerId = verifiedBy
    this.qualityCheck.adminReviewDate = new Date()
  }
  
  return this.save()
}

// Method to add consultant response
consultantReviewSchema.methods.addConsultantResponse = function(response, acknowledgment, improvementPlan) {
  if (!this.allowConsultantResponse) {
    throw new Error('Consultant responses not allowed for this review')
  }
  
  this.consultantResponse = {
    response,
    responseDate: new Date(),
    acknowledgesIssues: acknowledgment,
    improvementPlan
  }
  
  return this.save()
}

// Static method to find reviews by consultant
consultantReviewSchema.statics.findByConsultant = function(consultantId, publicOnly = false) {
  const query = { consultantId }
  if (publicOnly) {
    query.isPublic = true
    query.isVerified = true
    query.status = 'verified'
  }
  
  return this.find(query)
    .populate('projectId', 'title category industry')
    .populate('reviewerId', 'firstName lastName company')
    .sort({ submittedAt: -1 })
}

// Static method to get consultant review summary
consultantReviewSchema.statics.getConsultantSummary = function(consultantId) {
  return this.aggregate([
    {
      $match: {
        consultantId: mongoose.Types.ObjectId(consultantId),
        status: { $in: ['verified', 'published'] },
        isVerified: true
      }
    },
    {
      $group: {
        _id: null,
        totalReviews: { $sum: 1 },
        averageOverall: { $avg: '$ratings.overall' },
        averageCommunication: { $avg: '$ratings.communication' },
        averageQuality: { $avg: '$ratings.quality' },
        averageTimeline: { $avg: '$ratings.timeline' },
        averageTechnicalSkills: { $avg: '$ratings.technicalSkills' },
        averageProfessionalism: { $avg: '$ratings.professionalism' },
        wouldHireAgainCount: {
          $sum: { $cond: ['$projectSpecific.wouldHireAgain', 1, 0] }
        },
        wouldRecommendCount: {
          $sum: { $cond: ['$projectSpecific.wouldRecommendToOthers', 1, 0] }
        },
        onTimeDeliveryCount: {
          $sum: { $cond: ['$projectSpecific.deliveredOnTime', 1, 0] }
        },
        exceededExpectationsCount: {
          $sum: { $cond: ['$projectSpecific.exceededExpectations', 1, 0] }
        },
        recentReviews: {
          $push: {
            $cond: [
              { $gte: ['$submittedAt', { $dateSubtract: { startDate: '$$NOW', unit: 'day', amount: 90 } }] },
              {
                rating: '$ratings.overall',
                feedback: '$feedback.strengths',
                submittedAt: '$submittedAt',
                projectTitle: '$projectId.title'
              },
              '$$REMOVE'
            ]
          }
        }
      }
    }
  ])
}

// Static method to get review analytics
consultantReviewSchema.statics.getReviewAnalytics = function(startDate, endDate) {
  const matchStage = {}
  if (startDate && endDate) {
    matchStage.submittedAt = { $gte: startDate, $lte: endDate }
  }
  
  return this.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: null,
        totalReviews: { $sum: 1 },
        verifiedReviews: {
          $sum: { $cond: ['$isVerified', 1, 0] }
        },
        disputedReviews: {
          $sum: { $cond: [{ $eq: ['$status', 'disputed'] }, 1, 0] }
        },
        averageOverallRating: { $avg: '$ratings.overall' },
        averageReviewLength: { $avg: '$reviewMetrics.reviewLength' },
        publicReviews: {
          $sum: { $cond: ['$isPublic', 1, 0] }
        },
        reviewsByType: {
          $push: '$reviewerType'
        },
        ratingDistribution: {
          $push: '$ratings.overall'
        }
      }
    }
  ])
}

module.exports = mongoose.model('ConsultantReview', consultantReviewSchema)