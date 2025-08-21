import { getCollection } from '../database/couchbase-connection.js'
import { v4 as uuidv4 } from 'uuid'

class Consultant {
  constructor(data) {
    this.id = data.id || uuidv4()
    this.name = data.name
    this.email = data.email
    this.specialties = data.specialties || []
    this.experience = data.experience
    this.hourlyRate = data.hourlyRate
    this.availability = data.availability
    this.portfolio = data.portfolio
    this.certifications = data.certifications || []
    this.reviews = data.reviews || []
    this.status = data.status || 'pending'
    this.createdAt = data.createdAt || new Date().toISOString()
    this.updatedAt = data.updatedAt || new Date().toISOString()
    this.type = 'consultant'
  }

  static async create(data) {
    const consultant = new Consultant(data)
    const collection = getCollection()
    await collection.insert(consultant.id, consultant)
    return consultant
  }

  static async findById(id) {
    const collection = getCollection()
    try {
      const result = await collection.get(id)
      return new Consultant(result.content)
    } catch (error) {
      if (error.name === 'DocumentNotFoundError') {
        return null
      }
      throw error
    }
  }

  static async findAll() {
    const collection = getCollection()
    const query = `SELECT * FROM \`consultant_network\` WHERE type = 'consultant'`
    const result = await collection.cluster.query(query)
    return result.rows.map(row => new Consultant(row.consultant_network))
  }

  static async update(id, data) {
    const collection = getCollection()
    data.updatedAt = new Date().toISOString()
    await collection.upsert(id, { ...data, type: 'consultant' })
    return await Consultant.findById(id)
  }

  static async delete(id) {
    const collection = getCollection()
    await collection.remove(id)
    return true
  }
}

export default Consultant