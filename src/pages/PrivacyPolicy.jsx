const sections = [
  {
    title: '1. Information We Collect',
    body: 'We collect personal information you voluntarily provide when you register on the website, place an order, subscribe to our newsletter, or contact us.',
    points: [
      'Name and Contact Data: first and last name, email address, postal address, phone number, and similar contact data.',
      'Payment Data: data necessary to process your payment, such as your payment instrument number and security code. All payment data is securely handled by our third-party payment gateways — we never see or store your full card details.',
    ],
  },
  {
    title: '2. How We Use Your Information',
    points: [
      'Process and deliver your orders, including Ayurvedic dietary supplements, salts, spices, and resold cosmetics.',
      'Fulfill statutory requirements, including displaying our FSSAI Registration Certificate details where required.',
      'Send administrative information, order confirmations, and promotional updates.',
      'Protect our website and comply with legal obligations under the Drugs and Cosmetics Act and the FSS Act.',
    ],
  },
  {
    title: '3. Sharing Your Information',
    points: [
      'We only share your information with your consent, to comply with the law, to provide you with services, or to fulfill business obligations — including with delivery partners and payment processors.',
    ],
  },
  {
    title: '4. Cookies and Tracking Technologies',
    points: [
      'We may use cookies and similar tracking technologies to enhance your browsing experience on the website.',
    ],
  },
  {
    title: '5. Data Security',
    points: [
      'We implement appropriate technical and organizational security measures designed to protect the personal information we process.',
    ],
  },
  {
    title: '6. Your Privacy Rights',
    points: [
      'Depending on your location, you may have rights under applicable data protection laws — including the right to request access to, rectification of, or erasure of your personal information.',
    ],
  },
]

export default function PrivacyPolicy() {
  return (
    <div className="max-w-container mx-auto px-4 py-6">
      <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary text-white px-6 py-8 md:px-10 md:py-12 mb-4">
        <h1 className="text-2xl md:text-3xl font-display font-semibold">Privacy Policy</h1>
        <p className="mt-2 text-white/85 text-sm md:text-base">Last updated: September 7, 2026</p>
      </div>

      <p className="text-slate-600 leading-relaxed mb-10">
        Welcome to BazarBase.com, operated by{' '}
        <strong className="text-slate-800">Rashmi Cosmetic and Srishti Ayurved India</strong> ("we",
        "us", "our"). We are committed to protecting your personal information and your right to
        privacy. This policy explains what information we collect, how we use it, and what rights
        you have over it.
      </p>

      <div className="grid sm:grid-cols-2 gap-5">
        {sections.map((s) => (
          <div key={s.title} className="p-5 rounded-xl border border-slate-200">
            <h2 className="font-display font-semibold text-slate-800 mb-2">{s.title}</h2>
            {s.body && <p className="text-sm text-slate-600 leading-relaxed mb-2">{s.body}</p>}
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
        <h2 className="font-display font-semibold text-slate-800 mb-3">7. Contact Us</h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-3">
          If you have questions or comments about this policy, you may contact us at:
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wide">Entity name</h3>
            <p className="text-sm text-slate-700 mt-1">Rashmi Cosmetic and Srishti Ayurved India</p>
          </div>
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
    </div>
  )
}