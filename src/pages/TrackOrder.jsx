import { useState } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../lib/firebase'

const STATUS_COLORS = {
  Pending: 'bg-slate-100 text-slate-600',
  Paid: 'bg-blue-50 text-blue-600',
  Shipped: 'bg-amber-50 text-amber-600',
  Delivered: 'bg-green-50 text-green-600',
}

const STATUS_STEPS = ['Paid', 'Shipped', 'Delivered']

function isEmail(value) {
  return /^\S+@\S+\.\S+$/.test(value)
}

function isPhone(value) {
  return /^\d{10}$/.test(value)
}

export default function TrackOrder() {
  const [input, setInput] = useState('')
  const [orders, setOrders] = useState(null) // null = not searched yet
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSearch(e) {
    e.preventDefault()
    setError('')

    const value = input.trim()
    let field = null

    if (isPhone(value)) {
      field = 'customerPhone'
    } else if (isEmail(value)) {
      field = 'customerEmail'
    } else {
      setError('Enter a valid 10-digit phone number or a valid email')
      return
    }

    setLoading(true)
    setOrders(null)
    try {
      const snap = await getDocs(
        query(
          collection(db, 'orders'),
          where(field, '==', field === 'customerEmail' ? value.toLowerCase() : value)
        )
      )
      const results = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .sort((a, b) => {
          const aTime = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : 0
          const bTime = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : 0
          return bTime - aTime // newest first
        })
      setOrders(results)
    } catch (err) {
      console.error('Track order failed:', err)
      setError('Something went wrong. Please try again.')
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-display font-semibold text-slate-800 mb-2">Track Your Order</h1>
      <p className="text-slate-500 text-sm mb-6">
        Enter the phone number or email you used at checkout to see your order status.
      </p>

      <form onSubmit={handleSearch} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Phone number or email"
          className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
        />
        {error && <p className="text-red-500 text-xs">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white font-medium py-3 rounded-lg disabled:opacity-60"
        >
          {loading ? 'Searching…' : 'Track Order'}
        </button>
      </form>

      {orders !== null && (
        <div className="mt-8">
          {orders.length === 0 ? (
            <p className="text-slate-500 text-sm text-center">
              No orders found for this phone number or email.
            </p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white border border-slate-200 rounded-2xl p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-800">{order.productName}</p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {order.createdAt?.toDate
                          ? order.createdAt.toDate().toLocaleDateString()
                          : ''}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[order.status] || ''}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {order.status !== 'Pending' && (
                    <div className="flex items-center gap-2 mt-4">
                      {STATUS_STEPS.map((step, i) => {
                        const currentIndex = STATUS_STEPS.indexOf(order.status)
                        const done = i <= currentIndex
                        return (
                          <div key={step} className="flex items-center flex-1">
                            <div
                              className={`h-2 flex-1 rounded-full ${
                                done ? 'bg-primary' : 'bg-slate-100'
                              }`}
                            />
                            {i < STATUS_STEPS.length - 1 && <div className="w-1" />}
                          </div>
                        )
                      })}
                    </div>
                  )}
                  {order.status !== 'Pending' && (
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      {STATUS_STEPS.map((step) => (
                        <span key={step}>{step}</span>
                      ))}
                    </div>
                  )}

                  {order.status === 'Pending' && (
                    <p className="text-xs text-amber-600 mt-3">
                      Payment not confirmed yet. If you completed payment, please wait a few
                      minutes or contact support.
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}