const mongoose = require('mongoose')

const assignmentSchema = new mongoose.Schema({
  // Basic Assignment Information
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  consultantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consultant',
    required: true
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Assignment Details
  assignmentType: {
    type: String,
    enum: ['direct_hire', 'proposal_accepted', 'platform_matched'],
    required: true
  },
  assignedDate: {
    type: Date,
    default: Date.now
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: Date,
  expectedEndDate: {
    type: Date,
    required: true
  },
  
  // Financial Terms
  contractTerms: {
    paymentType: {
      type: String,
      enum: ['hourly', 'fixed', 'milestone'],
      required: true
    },
    rate: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: String,
      default: 'USD'
    },
    estimatedHours: Number,
    totalBudget: {
      type: Number,
      required: true,
      min: 0
    },
    platformFeeRate: {
      type: Number,
      required: true,
      min: 15,
      max: 40
    },
    paymentSchedule: {
      type: String,
      enum: ['weekly', 'bi_weekly', 'monthly', 'milestone', 'completion'],
      default: 'completion'
    }
  },
  
  // Payment and Escrow Management
  escrow: {
    totalAmount: { type: Number, default: 0 },
    releasedAmount: { type: Number, default: 0 },
    pendingAmount: { type: Number, default: 0 },
    stripeEscrowAccountId: String,
    lastEscrowUpdate: Date
  },
  
  // Time Tracking
  timeTracking: {
    totalHoursLogged: { type: Number, default: 0 },
    totalHoursBilled: { type: Number, default: 0 },
    timeEntries: [{
      date: { type: Date, required: true },
      hoursWorked: { type: Number, required: true, min: 0.25, max: 24 },
      description: { type: String, required: true, maxlength: 500 },
      status: {
        type: String,
        enum: ['draft', 'submitted', 'approved', 'disputed'],
        default: 'draft'
      },
      submittedDate: Date,
      approvedDate: Date,
      billableRate: Number,
      billableAmount: Number,
      approvedBy: String,
      disputeReason: String
    }],
    weeklyLimit: { type: Number, min: 1, max: 40 },
    requiresApproval: { type: Boolean, default: true }
  },
  
  // Progress and Milestones
  milestones: [{
    title: { type: String, required: true },
    description: String,
    dueDate: { type: Date, required: true },
    completedDate: Date,
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed', 'approved', 'paid'],
      default: 'pending'
    },
    deliverables: [{
      title: String,
      description: String,
      fileUrl: String,
      submittedDate: Date
    }],
    approvedBy: String,
    approvalDate: Date,
    paymentReleaseDate: Date,
    feedback: String
  }],
  
  // Assignment Status
  status: {
    type: String,
    enum: [
      'pending_start',
      'active',
      'paused',
      'completed',
      'terminated_by_client',
      'terminated_by_consultant',
      'disputed',
      'cancelled'
    ],
    default: 'pending_start'
  },
  
  // Performance Metrics
  performance: {
    onTimeDelivery: { type: Boolean, default: true },
    qualityScore: { type: Number, min: 0, max: 100 },
    communicationScore: { type: Number, min: 0, max: 100 },
    clientSatisfaction: { type: Number, min: 1, max: 5 },
    budgetUtilization: { type: Number, min: 0, max: 200 }, // percentage
    milestoneCompletionRate: { type: Number, min: 0, max: 100 }
  },
  
  // Communication and Collaboration
  communications: [{
    type: {
      type: String,
      enum: ['message', 'call', 'meeting', 'email', 'notification'],
      required: true
    },
    initiatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    initiatorType: {
      type: String,
      enum: ['client', 'consultant', 'admin'],
      required: true
    },
    subject: String,
    content: { type: String, maxlength: 2000 },
    timestamp: { type: Date, default: Date.now },
    attachments: [{
      filename: String,
      originalName: String,
      s3Key: String,
      s3Url: String,
      fileSize: Number,
      mimeType: String
    }],
    isRead: { type: Boolean, default: false },
    readAt: Date,
    priority: {
      type: String,
      enum: ['low', 'normal', 'high', 'urgent'],
      default: 'normal'
    }
  }],
  
  // Issues and Disputes
  issues: [{
    type: {
      type: String,
      enum: ['quality', 'timeline', 'communication', 'payment', 'scope', 'other'],
      required: true
    },
    title: { type: String, required: true },
    description: { type: String, required: true, maxlength: 1000 },
    reportedBy: {
      type: String,
      enum: ['client', 'consultant'],
      required: true
    },
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium'
    },
    status: {
      type: String,
      enum: ['open', 'in_progress', 'resolved', 'escalated'],
      default: 'open'
    },
    reportedDate: { type: Date, default: Date.now },
    resolvedDate: Date,
    resolution: String,
    resolvedBy: String,
    adminNotes: String
  }],
  
  // Contract and Legal
  contractSigned: { type: Boolean, default: false },
  contractSignedDate: Date,
  contractDocuments: [{
    documentType: {
      type: String,
      enum: ['nda', 'msa', 'sow', 'amendment', 'other'],
      required: true
    },
    filename: String,
    s3Key: String,
    s3Url: String,
    signedDate: Date,
    signedBy: [{
      party: { type: String, enum: ['client', 'consultant', 'admin'] },
      signedDate: Date,
      ipAddress: String,
      signatureHash: String
    }]
  }],
  
  // Assignment Completion
  completionDetails: {
    completedDate: Date,
    finalDeliverables: [{
      title: String,
      description: String,
      files: [{
        filename: String,
        originalName: String,
        s3Key: String,
        s3Url: String,
        fileSize: Number
      }],
      submittedDate: Date,
      approvedDate: Date
    }],
    totalHoursWorked: Number,
    finalAmount: Number,
    bonusAmount: { type: Number, default: 0 },
    clientFeedback: String,
    consultantFeedback: String,
    wouldWorkTogetherAgain: { type: Boolean, default: null }
  },
  
  // Administrative
  adminNotes: [{
    note: String,
    addedBy: String,
    addedAt: { type: Date, default: Date.now },
    type: {
      type: String,
      enum: ['general', 'payment', 'performance', 'issue', 'legal'],
      default: 'general'
    }
  }],
  tags: [String],
  isHighValue: { type: Boolean, default: false },
  
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
assignmentSchema.index({ projectId: 1 })
assignmentSchema.index({ consultantId: 1 })
assignmentSchema.index({ clientId: 1 })
assignmentSchema.index({ status: 1 })
assignmentSchema.index({ assignedDate: -1 })
assignmentSchema.index({ startDate: 1 })
assignmentSchema.index({ expectedEndDate: 1 })
assignmentSchema.index({ 'contractTerms.paymentType': 1 })
assignmentSchema.index({ 'performance.clientSatisfaction': -1 })

// Compound indexes for queries
assignmentSchema.index({ consultantId: 1, status: 1 })
assignmentSchema.index({ clientId: 1, status: 1 })
assignmentSchema.index({ status: 1, assignedDate: -1 })

// Virtual for total earnings (consultant perspective)
assignmentSchema.virtual('consultantEarnings').get(function() {
  const grossAmount = this.escrow.releasedAmount + this.timeTracking.totalHoursBilled * (this.contractTerms.rate || 0)
  const platformFee = grossAmount * (this.contractTerms.platformFeeRate / 100)
  return grossAmount - platformFee
})

// Virtual for platform earnings
assignmentSchema.virtual('platformEarnings').get(function() {
  const grossAmount = this.escrow.releasedAmount + this.timeTracking.totalHoursBilled * (this.contractTerms.rate || 0)
  return grossAmount * (this.contractTerms.platformFeeRate / 100)
})

// Virtual for assignment duration in days
assignmentSchema.virtual('durationDays').get(function() {
  const endDate = this.endDate || this.expectedEndDate
  return Math.ceil((endDate - this.startDate) / (1000 * 60 * 60 * 24))
})

// Virtual for completion percentage
assignmentSchema.virtual('completionPercent').get(function() {
  if (this.status === 'completed') return 100
  if (this.milestones.length === 0) return 0
  
  const completedMilestones = this.milestones.filter(m => 
    m.status === 'completed' || m.status === 'approved' || m.status === 'paid'
  ).length
  return Math.round((completedMilestones / this.milestones.length) * 100)
})

// Virtual for budget utilization
assignmentSchema.virtual('budgetUtilizationPercent').get(function() {
  const totalSpent = this.escrow.releasedAmount + (this.timeTracking.totalHoursBilled * this.contractTerms.rate)
  return this.contractTerms.totalBudget > 0 ? (totalSpent / this.contractTerms.totalBudget) * 100 : 0
})

// Pre-save middleware
assignmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now()
  
  // Auto-calculate total hours logged
  this.timeTracking.totalHoursLogged = this.timeTracking.timeEntries
    .reduce((total, entry) => total + entry.hoursWorked, 0)
  
  // Auto-calculate total billable hours
  this.timeTracking.totalHoursBilled = this.timeTracking.timeEntries
    .filter(entry => entry.status === 'approved')
    .reduce((total, entry) => total + entry.hoursWorked, 0)
  
  // Calculate milestone completion rate
  if (this.milestones.length > 0) {
    const completedMilestones = this.milestones.filter(m => 
      m.status === 'completed' || m.status === 'approved' || m.status === 'paid'
    ).length
    this.performance.milestoneCompletionRate = (completedMilestones / this.milestones.length) * 100
  }
  
  next()
})

// Method to log time entry
assignmentSchema.methods.logTime = function(timeEntry) {
  timeEntry.billableRate = this.contractTerms.rate
  timeEntry.billableAmount = timeEntry.hoursWorked * this.contractTerms.rate
  
  this.timeTracking.timeEntries.push(timeEntry)
  return this.save()
}

// Method to approve time entries
assignmentSchema.methods.approveTimeEntries = function(entryIds, approvedBy) {
  entryIds.forEach(id => {
    const entry = this.timeTracking.timeEntries.id(id)
    if (entry && entry.status === 'submitted') {
      entry.status = 'approved'
      entry.approvedDate = new Date()
      entry.approvedBy = approvedBy
    }
  })
  
  return this.save()
}

// Method to complete milestone
assignmentSchema.methods.completeMilestone = function(milestoneIndex, deliverables) {
  if (milestoneIndex >= this.milestones.length) {
    throw new Error('Milestone not found')
  }
  
  const milestone = this.milestones[milestoneIndex]
  milestone.status = 'completed'
  milestone.completedDate = new Date()
  milestone.deliverables = deliverables || milestone.deliverables
  
  return this.save()
}

// Method to approve milestone and release payment
assignmentSchema.methods.approveMilestone = function(milestoneIndex, approvedBy, feedback) {
  if (milestoneIndex >= this.milestones.length) {
    throw new Error('Milestone not found')
  }
  
  const milestone = this.milestones[milestoneIndex]
  milestone.status = 'approved'
  milestone.approvalDate = new Date()
  milestone.approvedBy = approvedBy
  milestone.feedback = feedback
  
  return this.save()
}

// Method to release milestone payment
assignmentSchema.methods.releaseMilestonePayment = function(milestoneIndex) {
  if (milestoneIndex >= this.milestones.length) {
    throw new Error('Milestone not found')
  }
  
  const milestone = this.milestones[milestoneIndex]
  if (milestone.status !== 'approved') {
    throw new Error('Milestone must be approved before payment release')
  }
  
  milestone.status = 'paid'
  milestone.paymentReleaseDate = new Date()
  
  this.escrow.releasedAmount += milestone.amount
  this.escrow.pendingAmount = Math.max(0, this.escrow.pendingAmount - milestone.amount)
  
  return this.save()
}

// Method to create issue
assignmentSchema.methods.createIssue = function(issueData) {
  this.issues.push({
    ...issueData,
    reportedDate: new Date(),
    status: 'open'
  })
  
  return this.save()
}

// Method to resolve issue
assignmentSchema.methods.resolveIssue = function(issueId, resolution, resolvedBy) {
  const issue = this.issues.id(issueId)
  if (!issue) {
    throw new Error('Issue not found')
  }
  
  issue.status = 'resolved'
  issue.resolvedDate = new Date()
  issue.resolution = resolution
  issue.resolvedBy = resolvedBy
  
  return this.save()
}

// Method to update assignment status
assignmentSchema.methods.updateStatus = function(newStatus, updatedBy, reason) {
  this.status = newStatus
  this.updatedBy = updatedBy
  
  if (reason) {
    this.adminNotes.push({
      note: `Status changed to ${newStatus}: ${reason}`,
      addedBy: updatedBy,
      type: 'general'
    })
  }
  
  if (newStatus === 'completed') {
    this.completionDetails.completedDate = new Date()
    this.completionDetails.totalHoursWorked = this.timeTracking.totalHoursLogged
    this.endDate = new Date()
  }
  
  return this.save()
}

// Static method to find assignments by consultant
assignmentSchema.statics.findByConsultant = function(consultantId, status = null) {
  const query = { consultantId }
  if (status) query.status = status
  
  return this.find(query)
    .populate('projectId', 'title category industry')
    .populate('clientId', 'firstName lastName company email')
    .sort({ assignedDate: -1 })
}

// Static method to find assignments by client
assignmentSchema.statics.findByClient = function(clientId, status = null) {
  const query = { clientId }
  if (status) query.status = status
  
  return this.find(query)
    .populate('projectId', 'title category industry')
    .populate('consultantId', 'firstName lastName rating.average completedProjects')
    .sort({ assignedDate: -1 })
}

// Static method to get assignment analytics
assignmentSchema.statics.getAssignmentAnalytics = function(startDate, endDate) {
  const matchStage = {}
  if (startDate && endDate) {
    matchStage.assignedDate = { $gte: startDate, $lte: endDate }
  }
  
  return this.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: null,
        totalAssignments: { $sum: 1 },
        activeAssignments: {
          $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
        },
        completedAssignments: {
          $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
        },
        disputedAssignments: {
          $sum: { $cond: [{ $eq: ['$status', 'disputed'] }, 1, 0] }
        },
        totalBudget: { $sum: '$contractTerms.totalBudget' },
        totalReleased: { $sum: '$escrow.releasedAmount' },
        averageClientSatisfaction: { $avg: '$performance.clientSatisfaction' },
        averageMilestoneCompletion: { $avg: '$performance.milestoneCompletionRate' },
        totalPlatformEarnings: { 
          $sum: { 
            $multiply: [
              '$escrow.releasedAmount',
              { $divide: ['$contractTerms.platformFeeRate', 100] }
            ]
          }
        }
      }
    }
  ])
}

module.exports = mongoose.model('Assignment', assignmentSchema)