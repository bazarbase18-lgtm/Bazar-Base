import { doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'

function loadRazorpayScript() {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve(true)
      return
    }
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => reject(new Error('Razorpay SDK failed to load'))
    document.body.appendChild(script)
  })
}

async function createOrder({ product, customer }) {
  const res = await fetch('/api/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      productId: product.id,
      productName: product.name,
      amount: product.price,
      customer,
    }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || 'Failed to create order')
  }
  return res.json() // { razorpayOrderId, firestoreOrderId, amount, keyId }
}

async function verifyPayment(payload) {
  const res = await fetch('/api/verify-payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || 'Payment verification failed')
  }
  return res.json() // { status: 'Paid' }
}

export async function startCheckout({ product, customer, onSuccess, onFailure }) {
  try {
    await loadRazorpayScript()

    const { razorpayOrderId, firestoreOrderId, amount, keyId } = await createOrder({
      product,
      customer,
    })

    const options = {
      key: keyId,
      amount,
      currency: 'INR',
      name: 'BazarBase',
      description: product.name,
      order_id: razorpayOrderId,
      prefill: {
        name: customer.name,
        email: customer.email,
        contact: customer.phone,
      },
      theme: { color: '#0f766e' },
      handler: async function (response) {
        try {
          await verifyPayment({
            firestoreOrderId,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          })
          onSuccess?.(firestoreOrderId)
        } catch (err) {
          console.error('Verification failed:', err)
          onFailure?.(err.message)
        }
      },
      modal: {
        ondismiss: function () {
          // customer closed the modal without paying — order stays 'Pending' in Firestore
          onFailure?.('Payment cancelled')
        },
      },
    }

    const rzp = new window.Razorpay(options)
    rzp.on('payment.failed', function (response) {
      onFailure?.(response.error?.description || 'Payment failed')
    })
    rzp.open()
  } catch (err) {
    console.error('Checkout error:', err)
    onFailure?.(err.message)
  }
}

// Helper if you ever need to manually mark an order (not used in normal flow)
export async function updateOrderStatus(orderId, status) {
  await updateDoc(doc(db, 'orders', orderId), {
    status,
    updatedAt: serverTimestamp(),
  })
}