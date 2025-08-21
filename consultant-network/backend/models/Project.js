const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  // Basic Project Information
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 5000
  },
  category: {
    type: String,
    required: true,
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
  },
  industry: {
    type: String,
    required: true,
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
  },
  
  // Requirements
  requiredExpertise: [{
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
  minExperience: {
    type: String,
    required: true,
    enum: ['1-3', '3-5', '5-10', '10+']
  },
  skillsRequired: [String],
  languagesRequired: [String],
  
  // Project Details
  projectSize: {
    type: String,
    required: true,
    enum: ['small', 'medium', 'large', 'enterprise']
  },
  estimatedHours: {
    type: Number,
    required: true,
    min: 1,
    max: 2000
  },
  hoursPerWeek: {
    type: Number,
    required: true,
    min: 1,
    max: 40
  },
  duration: {
    value: { type: Number, required: true },
    unit: { type: String, enum: ['days', 'weeks', 'months'], required: true }
  },
  startDate: {
    type: Date,
    required: true
  },
  deadline: {
    type: Date,
    required: true
  },
  timezone: String,
  
  // Budget and Payment
  budget: {
    type: {
      type: String,
      enum: ['hourly', 'fixed'],
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 100
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  maxHourlyRate: Number,
  
  // Client Information
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  clientCompany: String,
  contactEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  contactName: {
    type: String,
    required: true,
    trim: true
  },
  
  // Project Status
  status: {
    type: String,
    enum: [
      'draft',
      'posted',
      'matching',
      'proposals_received',
      'consultant_assigned',
      'in_progress',
      'completed',
      'cancelled',
      'disputed'
    ],
    default: 'draft'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  isUrgent: {
    type: Boolean,
    default: false
  },
  
  // Assignment Information
  assignedConsultant: {
    consultantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Consultant'
    },
    assignedDate: Date,
    proposalAmount: Number,
    negotiatedRate: Number,
    estimatedCompletion: Date,
    acceptanceDate: Date
  },
  
  // Project Matching
  proposals: [{
    consultantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Consultant',
      required: true
    },
    proposedAmount: {
      type: Number,
      required: true
    },
    proposedRate: Number,
    estimatedHours: Number,
    estimatedCompletion: Date,
    coverLetter: {
      type: String,
      maxlength: 2000
    },
    attachments: [{
      filename: String,
      originalName: String,
      s3Key: String,
      s3Url: String
    }],
    submittedDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['submitted', 'under_review', 'shortlisted', 'accepted', 'rejected'],
      default: 'submitted'
    },
    reviewedDate: Date,
    rejectionReason: String
  }],
  
  // Payment and Escrow
  paymentTerms: {
    type: String,
    enum: ['upfront', 'milestone', 'completion', 'weekly'],
    default: 'completion'
  },
  milestones: [{
    title: { type: String, required: true },
    description: String,
    amount: { type: Number, required: true },
    dueDate: Date,
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed', 'approved', 'disputed'],
      default: 'pending'
    },
    completedDate: Date,
    approvedDate: Date,
    paymentReleased: { type: Boolean, default: false },
    paymentDate: Date
  }],
  escrowAmount: { type: Number, default: 0 },
  totalPaid: { type: Number, default: 0 },
  
  // Communication
  messages: [{
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    senderType: {
      type: String,
      enum: ['client', 'consultant', 'admin'],
      required: true
    },
    message: {
      type: String,
      required: true,
      maxlength: 2000
    },
    attachments: [{
      filename: String,
      originalName: String,
      s3Key: String,
      s3Url: String
    }],
    timestamp: {
      type: Date,
      default: Date.now
    },
    isRead: { type: Boolean, default: false },
    readAt: Date
  }],
  
  // Project Completion
  deliverables: [{
    title: { type: String, required: true },
    description: String,
    files: [{
      filename: String,
      originalName: String,
      s3Key: String,
      s3Url: String,
      uploadDate: { type: Date, default: Date.now }
    }],
    submittedDate: Date,
    approvedDate: Date,
    status: {
      type: String,
      enum: ['pending', 'submitted', 'under_review', 'approved', 'rejected'],
      default: 'pending'
    },
    feedback: String
  }],
  
  // Reviews and Ratings
  clientReview: {
    rating: {
      overall: { type: Number, min: 1, max: 5 },
      communication: { type: Number, min: 1, max: 5 },
      quality: { type: Number, min: 1, max: 5 },
      timeline: { type: Number, min: 1, max: 5 },
      expertise: { type: Number, min: 1, max: 5 }
    },
    feedback: String,
    wouldRecommend: Boolean,
    submittedDate: Date,
    isPublic: { type: Boolean, default: true }
  },
  consultantReview: {
    rating: {
      overall: { type: Number, min: 1, max: 5 },
      communication: { type: Number, min: 1, max: 5 },
      clarity: { type: Number, min: 1, max: 5 },
      payment: { type: Number, min: 1, max: 5 },
      cooperation: { type: Number, min: 1, max: 5 }
    },
    feedback: String,
    wouldWorkAgain: Boolean,
    submittedDate: Date,
    isPublic: { type: Boolean, default: false }
  },
  
  // Administrative
  adminNotes: [{
    note: String,
    addedBy: String,
    addedAt: { type: Date, default: Date.now }
  }],
  tags: [String],
  isFeature: { type: Boolean, default: false },
  
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
  updatedBy: String,
  
  // Analytics
  views: { type: Number, default: 0 },
  proposalsCount: { type: Number, default: 0 },
  shortlistedCount: { type: Number, default: 0 }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Indexes
projectSchema.index({ clientId: 1 })
projectSchema.index({ 'assignedConsultant.consultantId': 1 })
projectSchema.index({ status: 1 })
projectSchema.index({ category: 1 })
projectSchema.index({ industry: 1 })
projectSchema.index({ 'budget.amount': 1 })
projectSchema.index({ startDate: 1 })
projectSchema.index({ deadline: 1 })
projectSchema.index({ createdAt: -1 })
projectSchema.index({ priority: 1, isUrgent: 1 })
projectSchema.index({ 'proposals.consultantId': 1 })
projectSchema.index({ requiredExpertise: 1 })

// Virtual for project duration in days
projectSchema.virtual('durationInDays').get(function() {
  const multiplier = this.duration.unit === 'days' ? 1 : 
                     this.duration.unit === 'weeks' ? 7 : 30
  return this.duration.value * multiplier
})

// Virtual for budget per hour (if fixed budget)
projectSchema.virtual('budgetPerHour').get(function() {
  if (this.budget.type === 'hourly') return this.budget.amount
  return this.estimatedHours > 0 ? this.budget.amount / this.estimatedHours : 0
})

// Virtual for project progress
projectSchema.virtual('progressPercent').get(function() {
  if (this.status === 'completed') return 100
  if (this.milestones.length === 0) return 0
  
  const completedMilestones = this.milestones.filter(m => 
    m.status === 'completed' || m.status === 'approved'
  ).length
  return Math.round((completedMilestones / this.milestones.length) * 100)
})

// Virtual for remaining budget
projectSchema.virtual('remainingBudget').get(function() {
  return Math.max(0, this.budget.amount - this.totalPaid)
})

// Pre-save middleware
projectSchema.pre('save', function(next) {
  this.updatedAt = Date.now()
  this.proposalsCount = this.proposals.length
  this.shortlistedCount = this.proposals.filter(p => p.status === 'shortlisted').length
  next()
})

// Method to add proposal
projectSchema.methods.addProposal = function(proposalData) {
  this.proposals.push({
    ...proposalData,
    submittedDate: new Date(),
    status: 'submitted'
  })
  return this.save()
}

// Method to update project status
projectSchema.methods.updateStatus = function(newStatus, updatedBy) {
  this.status = newStatus
  this.updatedBy = updatedBy
  
  // Auto-set dates based on status
  if (newStatus === 'consultant_assigned' && this.assignedConsultant.consultantId) {
    this.assignedConsultant.assignedDate = new Date()
  }
  
  return this.save()
}

// Method to assign consultant
projectSchema.methods.assignConsultant = function(consultantId, proposalData, updatedBy) {
  const proposal = this.proposals.find(p => 
    p.consultantId.toString() === consultantId.toString()
  )
  
  if (!proposal) {
    throw new Error('Proposal not found for this consultant')
  }
  
  this.assignedConsultant = {
    consultantId,
    assignedDate: new Date(),
    proposalAmount: proposal.proposedAmount,
    negotiatedRate: proposalData.negotiatedRate || proposal.proposedRate,
    estimatedCompletion: proposalData.estimatedCompletion || proposal.estimatedCompletion,
    acceptanceDate: new Date()
  }
  
  // Update proposal status
  proposal.status = 'accepted'
  proposal.reviewedDate = new Date()
  
  // Reject other proposals
  this.proposals.forEach(p => {
    if (p.consultantId.toString() !== consultantId.toString() && p.status === 'submitted') {
      p.status = 'rejected'
      p.reviewedDate = new Date()
      p.rejectionReason = 'Another consultant was selected'
    }
  })
  
  this.status = 'consultant_assigned'
  this.updatedBy = updatedBy
  
  return this.save()
}

// Method to release milestone payment
projectSchema.methods.releaseMilestonePayment = function(milestoneIndex) {
  if (milestoneIndex >= this.milestones.length) {
    throw new Error('Milestone not found')
  }
  
  const milestone = this.milestones[milestoneIndex]
  if (milestone.paymentReleased) {
    throw new Error('Payment already released for this milestone')
  }
  
  milestone.paymentReleased = true
  milestone.paymentDate = new Date()
  this.totalPaid += milestone.amount
  this.escrowAmount = Math.max(0, this.escrowAmount - milestone.amount)
  
  return this.save()
}

// Static method to find projects by consultant
projectSchema.statics.findByConsultant = function(consultantId, status = null) {
  const query = {
    $or: [
      { 'assignedConsultant.consultantId': consultantId },
      { 'proposals.consultantId': consultantId }
    ]
  }
  
  if (status) {
    query.status = status
  }
  
  return this.find(query).sort({ createdAt: -1 })
}

// Static method to find matching projects for consultant
projectSchema.statics.findMatchingProjects = function(consultant) {
  const query = {
    status: { $in: ['posted', 'matching'] },
    requiredExpertise: { $in: consultant.expertise },
    $or: [
      { industry: { $in: consultant.industries } },
      { industry: 'Other' }
    ]
  }
  
  // Filter by hourly rate if specified
  if (consultant.hourlyRate) {
    query.$or = query.$or || []
    query.$or.push(
      { 'budget.type': 'fixed' },
      { 
        'budget.type': 'hourly', 
        'budget.amount': { $gte: consultant.hourlyRate * 0.8 }
      },
      { maxHourlyRate: { $gte: consultant.hourlyRate } }
    )
  }
  
  return this.find(query)
    .populate('clientId', 'firstName lastName company email')
    .sort({ isUrgent: -1, priority: 1, createdAt: -1 })
}

// Static method to get project analytics
projectSchema.statics.getProjectAnalytics = function(startDate, endDate) {
  const matchStage = {}
  if (startDate && endDate) {
    matchStage.createdAt = { $gte: startDate, $lte: endDate }
  }
  
  return this.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: null,
        totalProjects: { $sum: 1 },
        completedProjects: {
          $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
        },
        inProgressProjects: {
          $sum: { $cond: [{ $eq: ['$status', 'in_progress'] }, 1, 0] }
        },
        totalBudget: { $sum: '$budget.amount' },
        totalPaid: { $sum: '$totalPaid' },
        averageBudget: { $avg: '$budget.amount' },
        averageProposals: { $avg: '$proposalsCount' }
      }
    }
  ])
}

module.exports = mongoose.model('Project', projectSchema)