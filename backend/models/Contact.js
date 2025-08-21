const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  company: {
    type: String,
    trim: true,
    maxLength: 200
  },
  phone: {
    type: String,
    trim: true,
    maxLength: 20
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxLength: 2000
  },
  interest: {
    type: String,
    enum: ['general', 'demo', 'pricing', 'enterprise', 'partnership', 'support'],
    default: 'general'
  },
  source: {
    type: String,
    default: 'website_contact_form'
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'qualified', 'closed'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  assignedTo: {
    type: String,
    trim: true
  },
  notes: [{
    content: String,
    author: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  followUpDate: Date,
  contactedAt: Date,
  resolvedAt: Date
}, {
  timestamps: true
})

// Indexes for efficient querying
contactSchema.index({ email: 1 })
contactSchema.index({ status: 1 })
contactSchema.index({ interest: 1 })
contactSchema.index({ createdAt: -1 })
contactSchema.index({ followUpDate: 1 })

// Virtual for full name display
contactSchema.virtual('displayName').get(function() {
  return this.name + (this.company ? ` (${this.company})` : '')
})

// Static method to get contact statistics
contactSchema.statics.getContactStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: null,
        totalContacts: { $sum: 1 },
        newContacts: {
          $sum: { $cond: [{ $eq: ['$status', 'new'] }, 1, 0] }
        },
        contactedContacts: {
          $sum: { $cond: [{ $eq: ['$status', 'contacted'] }, 1, 0] }
        },
        qualifiedContacts: {
          $sum: { $cond: [{ $eq: ['$status', 'qualified'] }, 1, 0] }
        },
        closedContacts: {
          $sum: { $cond: [{ $eq: ['$status', 'closed'] }, 1, 0] }
        },
        recentContacts: {
          $sum: {
            $cond: [
              { $gte: ['$createdAt', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)] },
              1,
              0
            ]
          }
        }
      }
    }
  ])

  const interestBreakdown = await this.aggregate([
    {
      $group: {
        _id: '$interest',
        count: { $sum: 1 }
      }
    },
    {
      $sort: { count: -1 }
    }
  ])

  return {
    overview: stats[0] || {
      totalContacts: 0,
      newContacts: 0,
      contactedContacts: 0,
      qualifiedContacts: 0,
      closedContacts: 0,
      recentContacts: 0
    },
    interestBreakdown: interestBreakdown.map(item => ({
      interest: item._id,
      count: item.count
    }))
  }
}

// Instance method to add a note
contactSchema.methods.addNote = function(content, author) {
  this.notes.push({
    content,
    author,
    createdAt: new Date()
  })
  return this.save()
}

// Instance method to update status
contactSchema.methods.updateStatus = function(newStatus, author) {
  const oldStatus = this.status
  this.status = newStatus
  
  // Set timestamps based on status changes
  if (newStatus === 'contacted' && oldStatus === 'new') {
    this.contactedAt = new Date()
  } else if (newStatus === 'closed') {
    this.resolvedAt = new Date()
  }
  
  // Add automatic note about status change
  this.addNote(`Status changed from ${oldStatus} to ${newStatus}`, author)
  
  return this.save()
}

module.exports = mongoose.model('Contact', contactSchema)