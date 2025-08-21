import { Cluster } from 'couchbase'
import dotenv from 'dotenv'

dotenv.config()

let cluster = null
let bucket = null
let collection = null

export async function connectToCouchbase() {
  if (cluster) {
    return { cluster, bucket, collection }
  }

  try {
    console.log('Connecting to Couchbase...')
    
    cluster = await Cluster.connect(
      process.env.COUCHBASE_URL || 'couchbase://localhost:11210',
      {
        username: process.env.COUCHBASE_USERNAME || 'Administrator',
        password: process.env.COUCHBASE_PASSWORD || 'password',
      }
    )

    bucket = cluster.bucket(process.env.COUCHBASE_BUCKET || 'consultant_network')
    collection = bucket.defaultCollection()

    console.log('Connected to Couchbase successfully')
    
    // Create primary index if it doesn't exist
    try {
      const query = `CREATE PRIMARY INDEX ON \`${process.env.COUCHBASE_BUCKET || 'consultant_network'}\` IF NOT EXISTS`
      await cluster.query(query)
    } catch (err) {
      console.log('Primary index may already exist:', err.message)
    }

    return { cluster, bucket, collection }
  } catch (error) {
    console.error('Couchbase connection error:', error)
    throw error
  }
}

export async function closeCouchbaseConnection() {
  if (cluster) {
    await cluster.close()
    cluster = null
    bucket = null
    collection = null
    console.log('Couchbase connection closed')
  }
}

export function getCollection() {
  if (!collection) {
    throw new Error('Couchbase not connected. Call connectToCouchbase() first.')
  }
  return collection
}

export function getBucket() {
  if (!bucket) {
    throw new Error('Couchbase not connected. Call connectToCouchbase() first.')
  }
  return bucket
}

export function getCluster() {
  if (!cluster) {
    throw new Error('Couchbase not connected. Call connectToCouchbase() first.')
  }
  return cluster
}