import crypto from 'crypto'
import { getFirestoreAdmin } from './_firebaseAdmin.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const {
      firestoreOrderId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body

    if (!firestoreOrderId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: 'Missing verification fields' })
    }

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex')

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: 'Invalid payment signature' })
    }

    const db = getFirestoreAdmin()
    await db.collection('orders').doc(firestoreOrderId).update({
      status: 'Paid',
      razorpayPaymentId: razorpay_payment_id,
      updatedAt: new Date(),
    })

    // Brevo email step intentionally skipped —
    // Razorpay's own automatic payment-receipt email covers the customer side.

    return res.status(200).json({ status: 'Paid' })
  } catch (err) {
    console.error('verify-payment error:', err)
    return res.status(500).json({ message: 'Verification failed' })
  }
}