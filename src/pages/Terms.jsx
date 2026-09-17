import { Link } from 'react-router-dom'

const sections = [
  {
    title: '1. Account & Security',
    points: [
      'All information you provide to use the website — name, phone number, address — must be accurate and correct.',
      'It is your responsibility to keep your account credentials confidential.',
    ],
  },
  {
    title: '2. Products & Pricing',
    points: [
      'Cosmetics and Ayurvedic food products on our website are subject to stock availability.',
      'Prices of all products may change without prior notice.',
      'Applicable taxes (GST) may be shown as included or separately in product prices.',
    ],
  },
  {
    title: '3. Order Acceptance & Cancellation',
    points: [
      'We reserve the right to accept or reject any order — for example, in cases of stock unavailability, incorrect pricing, or suspicious activity.',
      'Orders can be cancelled by the customer any time before shipping. Once an order has been handed over to the courier partner, cancellation cannot be accepted.',
    ],
  },
  {
    title: '4. Payments',
    points: [
      'We accept payment through all major credit/debit cards, net banking, UPI, and authorized wallets.',
      'All online transactions are processed through our secure payment gateway partners. We do not store your banking or card details on our servers.',
    ],
  },
  {
    title: '5. Intellectual Property',
    points: [
      'All content on the website — including logo, text, graphics, images, the brand name "Bazarbase", and software — is the property of Rashmi Cosmetic and Srishti Ayurved India.',
      'Commercial use of this content without our written permission is strictly prohibited.',
    ],
  },
  {
    title: '6. Limitation of Liability',
    points: [
      'We make every effort to ensure the information on our website is accurate. However, the effect of Ayurvedic products can vary from person to person based on individual health.',
      'Please check the product label and ingredients carefully to avoid any allergy or adverse reaction.',
    ],
  },
  {
    title: '7. Governing Law & Jurisdiction',
    points: [
      'Any dispute or legal matter arising from these terms will be settled under the jurisdiction of the courts of Lucknow (Uttar Pradesh, India).',
    ],
  },
]

export default function Terms() {
  return (
    <div className="max-w-container mx-auto px-4 py-6">
      <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary text-white px-6 py-8 md:px-10 md:py-12 mb-4">
        <h1 className="text-2xl md:text-3xl font-display font-semibold">Terms and Conditions</h1>
        <p className="mt-2 text-white/85 text-sm md:text-base">Last updated: September 6, 2026</p>
      </div>

      <p className="text-slate-600 leading-relaxed mb-10">
        Welcome to BazarBase.com. This website is legally owned and operated by{' '}
        <strong className="text-slate-800">Rashmi Cosmetic and Srishti Ayurved India</strong>. By
        using this website or making a purchase here, you agree to be bound by the terms below.
      </p>

      <div className="grid sm:grid-cols-2 gap-5">
        {sections.map((s) => (
          <div key={s.title} className="p-5 rounded-xl border border-slate-200">
            <h2 className="font-display font-semibold text-slate-800 mb-2">{s.title}</h2>
            <ul className="space-y-2">
              {s.points.map((p, i) => (
                <li key={i} className="text-sm text-slate-600 leading-relaxed flex gap-2">
                  <span className="text-primary">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 p-6 rounded-xl bg-slate-50 border border-slate-200">
        <h2 className="font-display font-semibold text-slate-800 mb-3">8. Contact Us</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          For any clarification regarding these terms and conditions, please reach out to us:
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mt-3">
          <div>
            <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wide">Email</h3>
            <p className="text-sm text-slate-700 mt-1">bazarbase18@gmail.com</p>
          </div>
          <div>
            <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wide">Address</h3>
            <p className="text-sm text-slate-700 mt-1">
              House No. 107/4, Kashiram Awas Yojna, Sadrauna, Lucknow, Uttar Pradesh – 226008
            </p>
          </div>
        </div>
      </div>

      <p className="text-sm text-slate-500 mt-8">
        Have questions about returns instead? See our{' '}
        <Link to="/about" className="text-primary underline">
          Returns &amp; Refunds policy
        </Link>{' '}
        on the About page.
      </p>
    </div>
  )
}