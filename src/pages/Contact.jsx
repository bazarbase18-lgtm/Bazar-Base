import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { whatsappLink } from '../lib/whatsapp'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const inputClass =
  'w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors'
const labelClass = 'block text-sm font-medium text-slate-700 mb-1.5'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone,
          message: form.message,
        },
        { publicKey: PUBLIC_KEY }
      )
      setStatus('sent')
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <div className="max-w-container mx-auto px-4 py-6">
      <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary text-white px-6 py-8 md:px-10 md:py-12 mb-8">
        <h1 className="text-2xl md:text-3xl font-display font-semibold">Contact Us</h1>
        <p className="mt-2 text-white/85 text-sm md:text-base">
          Questions about a product, an order, or a lab test booking? We're a message away.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
          <h2 className="font-display font-semibold text-lg mb-4 text-slate-800">Get in touch</h2>
          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <span className="text-accentGreen text-lg">💬</span>
              <div>
                <p className="font-medium text-slate-800">WhatsApp</p>
                <p className="text-slate-600">+91 82991 38080</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary text-lg">📍</span>
              <div>
                <p className="font-medium text-slate-800">Address</p>
                <p className="text-slate-600">House No- 107/4, Kashiram Awas Yojna, Sadrauna, Lucknow, Uttar Pradesh - 226008</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-accentOrange text-lg">🛡️</span>
              <div>
                <p className="font-medium text-slate-800">FSSAI Reg No</p>
                <p className="text-slate-600">22726101003244</p>
              </div>
            </div>
          </div>
          <a
            href={whatsappLink('Hi, I have a question about BazarBase.com')}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block bg-accentGreen text-white font-medium px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Message us on WhatsApp
          </a>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-display font-semibold text-lg text-slate-800">Send us a message</h2>

          <div>
            <label htmlFor="contact-name" className={labelClass}>Full name</label>
            <input
              id="contact-name"
              required
              placeholder="e.g. Priya Sharma"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="contact-email" className={labelClass}>Email address</label>
            <input
              id="contact-email"
              required
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="contact-phone" className={labelClass}>Phone number</label>
            <input
              id="contact-phone"
              type="tel"
              inputMode="tel"
              placeholder="e.g. 98765 43210"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="contact-message" className={labelClass}>Message</label>
            <textarea
              id="contact-message"
              required
              placeholder="How can we help?"
              rows={4}
              value={form.message}
              onChange={(e) => update('message', e.target.value)}
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full bg-primary text-white font-medium py-3 rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
          {status === 'sent' && <p className="text-sm text-accentGreen font-medium">✓ Message sent! We'll get back to you soon.</p>}
          {status === 'error' && <p className="text-sm text-red-600 font-medium">Something went wrong. Please try WhatsApp instead.</p>}
        </form>
      </div>
    </div>
  )
}