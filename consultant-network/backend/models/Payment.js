import { getCollection } from '../database/couchbase-connection.js'

class Payment {
  constructor(data) {
    this.id = data.id
    this.amount = data.amount
    this.status = data.status
    this.type = 'payment'
  }
}

export default Payment