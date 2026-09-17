import { useState } from 'react'
import { startCheckout } from '../lib/razorpay'

export default function BuyNowModal({ product, onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('form') // form | processing | success | error
  const [errorMessage, setErrorMessage] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!/^\d{10}$/.test(form.phone.trim())) e.phone = 'Enter a valid 10-digit phone number'
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = 'Enter a valid email'
    if (!form.address.trim()) e.address = 'Shipping address is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    setStatus('processing')
    startCheckout({
      product,
      customer: form,
      onSuccess: () => setStatus('success'),
      onFailure: (msg) => {
        setErrorMessage(msg)
        setStatus('error')
      },
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xl"
          aria-label="Close"
        >
          ×
        </button>

        {status === 'success' ? (
          <div className="text-center py-6">
            <div className="text-accentGreen text-4xl mb-3">✓</div>
            <h3 className="text-lg font-display font-semibold text-slate-800">
              Payment successful!
            </h3>
            <p className="text-slate-600 mt-2 text-sm">
              Your order for <strong>{product.name}</strong> is confirmed. You'll receive a
              payment receipt on your email shortly.
            </p>
            <button
              onClick={onClose}
              className="mt-5 bg-primary text-white px-6 py-2.5 rounded-lg font-medium"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-display font-semibold text-slate-800 mb-1">Buy Now</h3>
            <p className="text-sm text-slate-500 mb-4">
              {product.name} — <span className="text-primary font-medium">₹{product.price}</span>
            </p>

            {status === 'error' && (
              <div className="bg-red-50 text-red-600 text-sm rounded-lg px-3 py-2 mb-4">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Shipping address"
                  rows={3}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary resize-none"
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>

              <button
                type="submit"
                disabled={status === 'processing'}
                className="w-full bg-primary text-white font-medium py-3 rounded-lg mt-2 disabled:opacity-60"
              >
                {status === 'processing' ? 'Processing…' : `Pay ₹${product.price}`}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}