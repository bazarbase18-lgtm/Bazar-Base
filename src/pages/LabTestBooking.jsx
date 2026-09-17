import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'
import ImageUploader from '../components/ImageUploader'
import { whatsappLink, labBookingWhatsappMessage } from '../lib/whatsapp'

const emptyForm = { name: '', age: '', doctorName: '', address: '', mobile: '', email: '' }

const inputClass =
  'w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors'
const labelClass = 'block text-sm font-medium text-slate-700 mb-1.5'

export default function LabTestBooking() {
  const [form, setForm] = useState(emptyForm)
  const [prescriptionUrl, setPrescriptionUrl] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const entry = { ...form, prescriptionUrl, createdAt: serverTimestamp() }
      await addDoc(collection(db, 'labBookings'), entry)
      window.open(whatsappLink(labBookingWhatsappMessage({ ...form, prescriptionUrl })), '_blank')
      setForm(emptyForm)
      setPrescriptionUrl('')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-container mx-auto px-4 py-6">
      <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary text-white px-6 py-8 md:px-10 md:py-12 mb-8">
        <h1 className="text-2xl md:text-3xl font-display font-semibold">Lab Test Booking</h1>
        <p className="mt-2 text-white/85 text-sm md:text-base">
          Powered by our Healthians lab partner. Home sample pickup, available across India.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-xl bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="lab-name" className={labelClass}>Full name</label>
            <input
              id="lab-name"
              required
              placeholder="e.g. Priya Sharma"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="lab-age" className={labelClass}>Age</label>
            <input
              id="lab-age"
              required
              type="number"
              placeholder="e.g. 32"
              value={form.age}
              onChange={(e) => update('age', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="lab-doctor" className={labelClass}>Doctor's name <span className="text-slate-400 font-normal">(if any)</span></label>
          <input
            id="lab-doctor"
            placeholder="e.g. Dr. Sharma"
            value={form.doctorName}
            onChange={(e) => update('doctorName', e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="lab-address" className={labelClass}>Address for home sample pickup</label>
          <textarea
            id="lab-address"
            required
            placeholder="House no., street, city, pincode"
            value={form.address}
            onChange={(e) => update('address', e.target.value)}
            className={inputClass}
            rows={3}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="lab-mobile" className={labelClass}>Mobile number</label>
            <input
              id="lab-mobile"
              required
              type="tel"
              placeholder="10-digit mobile number"
              value={form.mobile}
              onChange={(e) => update('mobile', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="lab-email" className={labelClass}>Email <span className="text-slate-400 font-normal">(optional)</span></label>
            <input
              id="lab-email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Doctor's prescription <span className="text-slate-400 font-normal">(optional)</span></label>
          <div className="border border-dashed border-slate-300 rounded-lg p-3 bg-slate-50">
            <ImageUploader folder="BazarBase/LabPrescriptions" onUploaded={(url) => setPrescriptionUrl(url)} />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-primary text-white font-medium py-3 rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {submitting ? 'Submitting…' : 'Submit & continue on WhatsApp'}
        </button>
      </form>
    </div>
  )
}