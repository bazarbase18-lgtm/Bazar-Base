import Razorpay from 'razorpay'
import { getFirestoreAdmin } from './_firebaseAdmin.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { productId, productName, amount, customer } = req.body

    if (!productId || !productName || !amount || !customer?.name || !customer?.phone || !customer?.email || !customer?.address) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    const amountInPaise = Math.round(Number(amount) * 100)

    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      notes: { productId, productName },
    })

    const db = getFirestoreAdmin()
    const orderRef = await db.collection('orders').add({
      productId,
      productName,
      amount: amountInPaise,
      customerName: customer.name,
      customerPhone: customer.phone,
      customerEmail: customer.email,
      shippingAddress: customer.address,
      razorpayOrderId: razorpayOrder.id,
      razorpayPaymentId: null,
      status: 'Pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return res.status(200).json({
      razorpayOrderId: razorpayOrder.id,
      firestoreOrderId: orderRef.id,
      amount: amountInPaise,
      keyId: process.env.RAZORPAY_KEY_ID,
    })
  } catch (err) {
    console.error('create-order error:', err)
    return res.status(500).json({ message: 'Failed to create order' })
  }
}