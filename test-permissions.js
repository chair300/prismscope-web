import admin from 'firebase-admin'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function testPermissions() {
  try {
    console.log('🔍 Testing Firestore permissions...')
    
    // Initialize Firebase Admin
    const serviceAccount = JSON.parse(readFileSync(path.join(__dirname, 'serviceAccountKey.json'), 'utf8'))
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: serviceAccount.project_id // Use ai-problem-statement project
    })
    
    // Connect to the prismscope-network database within ai-problem-statement project
    const db = admin.firestore()
    db.settings({ databaseId: 'prismscope-network' })
    
    console.log('✅ Firebase Admin initialized')
    console.log(`📋 Project ID: ${serviceAccount.project_id}`)
    console.log(`🔑 Service Account: ${serviceAccount.client_email}`)
    
    // Test 1: List collections (requires read permissions)
    console.log('\n📖 Testing read permissions...')
    try {
      const collections = await db.listCollections()
      console.log(`✅ Can list collections. Found ${collections.length} collections:`)
      collections.forEach(col => console.log(`   - ${col.id}`))
    } catch (error) {
      console.log(`❌ Cannot list collections: ${error.message}`)
    }
    
    // Test 2: Try to read from a collection
    console.log('\n📄 Testing document read...')
    try {
      const snapshot = await db.collection('test').limit(1).get()
      console.log(`✅ Can read from collections. Documents found: ${snapshot.size}`)
    } catch (error) {
      console.log(`❌ Cannot read documents: ${error.message}`)
    }
    
    // Test 3: Try to write a document
    console.log('\n✍️  Testing write permissions...')
    try {
      const docRef = await db.collection('permission_test').add({
        test: true,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        message: 'Permission test document'
      })
      console.log(`✅ Can write documents. Document ID: ${docRef.id}`)
      
      // Clean up test document
      await docRef.delete()
      console.log('🧹 Test document cleaned up')
    } catch (error) {
      console.log(`❌ Cannot write documents: ${error.message}`)
      console.log(`   Error code: ${error.code}`)
      console.log(`   Full error:`, error)
    }
    
    console.log('\n🎉 Permission test completed!')
    
  } catch (error) {
    console.error('❌ Permission test failed:', error.message)
    console.error('Full error:', error)
  }
  
  process.exit(0)
}

testPermissions()