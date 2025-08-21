// Stripe service stub
const stripeService = {
  createPaymentIntent: async (amount) => {
    return { id: 'pi_test', client_secret: 'test_secret' }
  },
  processPayment: async (paymentData) => {
    return { success: true }
  }
}

export default stripeService