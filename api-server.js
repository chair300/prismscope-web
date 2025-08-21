import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import admin from 'firebase-admin'
import { readFileSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 8080

// Initialize Firebase Admin
let db

async function initializeFirestore() {
  try {
    const serviceAccount = JSON.parse(readFileSync(path.join(__dirname, 'serviceAccountKey.json'), 'utf8'))
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: serviceAccount.project_id // Use ai-problem-statement project
    })
    
    // Connect to the prismscope-network database within ai-problem-statement project
    db = admin.firestore()
    db.settings({ databaseId: 'prismscope-network' })
    
    // Alternative: try to access specific database
    // db = admin.firestore('(default)')
    
    // Try to create the database or collection if it doesn't exist
    try {
      await db.collection('_test').limit(1).get()
    } catch (testError) {
      console.log('Creating initial collection...')
      // Try to create a test document to initialize the database
      await db.collection('_test').add({ created: admin.firestore.FieldValue.serverTimestamp() })
    }
    console.log('✅ Firestore initialized and connected successfully')
    return true
  } catch (error) {
    console.error('❌ Failed to initialize Firestore:', error.message)
    console.error('Full error:', error)
    return false
  }
}

// Middleware
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.static('dist'))

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    database: 'firestore-connected'
  })
})

// Consultant application endpoint
app.post('/api/consultants/apply', async (req, res) => {
  try {
    const applicationData = {
      ...req.body,
      submittedAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'pending',
      id: `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }
    
    // Save to Firestore
    const docRef = await db.collection('consultant_applications').add(applicationData)
    
    console.log('✅ New application saved to Firestore:', {
      firestoreId: docRef.id,
      applicationId: applicationData.id,
      type: applicationData.partnershipType,
      name: `${applicationData.firstName} ${applicationData.lastName}`,
      email: applicationData.email,
      company: applicationData.company || 'Not provided'
    })
    
    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: applicationData.id,
      firestoreId: docRef.id
    })
  } catch (error) {
    console.error('❌ Error saving application to Firestore:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to submit application. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
})

// Get applications (admin endpoint)
app.get('/api/consultants', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50
    const offset = parseInt(req.query.offset) || 0
    
    const snapshot = await db.collection('consultant_applications')
      .orderBy('submittedAt', 'desc')
      .limit(limit)
      .offset(offset)
      .get()
    
    const applications = []
    snapshot.forEach(doc => {
      const data = doc.data()
      applications.push({
        firestoreId: doc.id,
        id: data.id,
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        partnershipType: data.partnershipType,
        company: data.company,
        submittedAt: data.submittedAt?.toDate?.()?.toISOString() || data.submittedAt,
        status: data.status
      })
    })
    
    // Get total count
    const countSnapshot = await db.collection('consultant_applications').count().get()
    const total = countSnapshot.data().count
    
    res.json({
      total,
      limit,
      offset,
      applications
    })
  } catch (error) {
    console.error('❌ Error fetching applications from Firestore:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
})

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const contactData = {
      ...req.body,
      submittedAt: admin.firestore.FieldValue.serverTimestamp(),
      type: 'client',
      status: 'new',
      id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }
    
    // Save to Firestore
    const docRef = await db.collection('contact_submissions').add(contactData)
    
    console.log('✅ Contact form saved to Firestore:', {
      firestoreId: docRef.id,
      contactId: contactData.id,
      name: contactData.name,
      email: contactData.email,
      company: contactData.company || 'Not provided'
    })
    
    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      contactId: contactData.id,
      firestoreId: docRef.id
    })
  } catch (error) {
    console.error('❌ Error saving contact form to Firestore:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
})

// Get contact submissions (admin endpoint)
app.get('/api/contacts', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50
    const offset = parseInt(req.query.offset) || 0
    
    const snapshot = await db.collection('contact_submissions')
      .orderBy('submittedAt', 'desc')
      .limit(limit)
      .offset(offset)
      .get()
    
    const contacts = []
    snapshot.forEach(doc => {
      const data = doc.data()
      contacts.push({
        firestoreId: doc.id,
        id: data.id,
        name: data.name,
        email: data.email,
        company: data.company,
        message: data.message,
        submittedAt: data.submittedAt?.toDate?.()?.toISOString() || data.submittedAt,
        status: data.status,
        type: data.type
      })
    })
    
    // Get total count
    const countSnapshot = await db.collection('contact_submissions').count().get()
    const total = countSnapshot.data().count
    
    res.json({
      total,
      limit,
      offset,
      contacts
    })
  } catch (error) {
    console.error('❌ Error fetching contacts from Firestore:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
})

// Get single application
app.get('/api/consultants/:id', async (req, res) => {
  try {
    const { id } = req.params
    
    // Try to find by firestoreId first, then by applicationId
    let doc
    
    if (id.length > 20) {
      // Looks like a Firestore document ID
      doc = await db.collection('consultant_applications').doc(id).get()
    } else {
      // Search by application ID
      const snapshot = await db.collection('consultant_applications')
        .where('id', '==', id)
        .limit(1)
        .get()
      
      if (!snapshot.empty) {
        doc = snapshot.docs[0]
      }
    }
    
    if (!doc || !doc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      })
    }
    
    const data = doc.data()
    res.json({
      success: true,
      application: {
        firestoreId: doc.id,
        ...data,
        submittedAt: data.submittedAt?.toDate?.()?.toISOString() || data.submittedAt
      }
    })
  } catch (error) {
    console.error('❌ Error fetching application from Firestore:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch application',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
})

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('🚨 Server error:', error)
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  })
})

// Start server after initializing Firestore
async function startServer() {
  const firestoreReady = await initializeFirestore()
  
  if (!firestoreReady) {
    console.error('❌ Cannot start server without Firestore connection')
    process.exit(1)
  }
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
    console.log(`📊 Health check: http://localhost:${PORT}/health`)
    console.log(`📝 API endpoint: http://localhost:${PORT}/api/consultants/apply`)
    console.log(`📋 Admin endpoint: http://localhost:${PORT}/api/consultants`)
    console.log(`🔥 Database: Firestore (ai-problem-statement)`)
  })
}

startServer().catch(error => {
  console.error('❌ Failed to start server:', error)
  process.exit(1)
})