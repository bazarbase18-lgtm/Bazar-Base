import { Link } from 'react-router-dom'

const policies = [
  {
    title: '7-day return window',
    body: "Eligible products can be returned or exchanged within 7 days of delivery. Requests after 7 days can't be accepted.",
  },
  {
    title: 'Product must be unopened and unused',
    body: 'Original packaging, seal, tags, and bill must be intact for a return to be accepted.',
  },
  {
    title: "Food, Ayurveda & opened cosmetics aren't returnable",
    body: 'For hygiene and safety reasons, food items, Ayurvedic consumables, and cosmetics with a broken seal or that have been used cannot be returned.',
  },
  {
    title: "Damaged or wrong item? We'll make it right",
    body: "If a food or cosmetic item arrives damaged, broken, or incorrect, contact us within 24–48 hours of delivery with an unboxing photo or video, and we'll replace it or issue a full refund.",
  },
  {
    title: 'Refund timeline',
    body: 'Once your return is received and quality-checked, approved refunds are processed to your original payment method within 5–7 working days.',
  },
  {
    title: 'Cancellations',
    body: "Orders can be cancelled any time before they ship. Once shipped, cancellation isn't possible.",
  },
]

export default function ReturnsRefunds() {
  return (
    <div className="max-w-container mx-auto px-4 py-6">
      <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary text-white px-6 py-8 md:px-10 md:py-12 mb-8">
        <h1 className="text-2xl md:text-3xl font-display font-semibold">Returns &amp; Refunds</h1>
        <p className="mt-2 text-white/85 text-sm md:text-base">
          Our policy for BazarBase.com (operated by Rashmi Cosmetic and Srishti Ayurved India).
        </p>
      </div>

      <p className="text-slate-600 leading-relaxed mb-8">
        We're committed to giving our customers a smooth experience. Please read the points below
        carefully before requesting a return or refund on any order.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {policies.map((p) => (
          <div key={p.title} className="p-5 rounded-xl border border-slate-200">
            <h3 className="font-medium text-slate-800 text-sm">{p.title}</h3>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 p-6 rounded-xl bg-slate-50 border border-slate-200">
        <h2 className="font-display font-semibold text-slate-800 mb-3">Need help with a return?</h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-3">
          Reach out to us with your order details and, if applicable, an unboxing photo or video:
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wide">Email</h3>
            <p className="text-sm text-slate-700 mt-1">bazarbase18@gmail.com</p>
          </div>
          <div>
            <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wide">WhatsApp</h3>
            <p className="text-sm text-slate-700 mt-1">+91 82991 38080</p>
          </div>
        </div>
      </div>

      <p className="text-sm text-slate-500 mt-8">
        Looking for our full{' '}
        <Link to="/terms" className="text-primary underline">
          Terms &amp; Conditions
        </Link>{' '}
        or{' '}
        <Link to="/privacy-policy" className="text-primary underline">
          Privacy Policy
        </Link>
        ?
      </p>
    </div>
  )
}