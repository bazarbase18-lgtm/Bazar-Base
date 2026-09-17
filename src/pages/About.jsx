export default function About() {
  return (
    <div className="max-w-container mx-auto px-4 py-6">
      <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary text-white px-6 py-8 md:px-10 md:py-12 mb-8">
        <h1 className="text-2xl md:text-3xl font-display font-semibold">About BazarBase.com</h1>
        <p className="mt-2 text-white/85 text-sm md:text-base">
          Genuine, everyday essentials — for the whole family.
        </p>
      </div>

      {/* Intro — two columns on larger screens */}
      <div className="grid lg:grid-cols-2 gap-x-12 gap-y-4">
        <p className="text-slate-600 leading-relaxed text-lg">
          BazarBase.com (operated by Rashmi Cosmetic and Srishti Ayurved India) was
          started with one simple goal — to make genuine, everyday health, beauty,
          and household products easily accessible to every family, without the
          confusion of scattered marketplaces or the risk of counterfeit goods.
        </p>

        <p className="text-slate-600 leading-relaxed">
          From skincare and haircare to immunity boosters, multivitamins, baby
          care, and daily wellness essentials — we bring together products that
          matter to real Indian households, sourced only from authorized
          distributors and verified sellers. Every product listed here is backed
          by our commitment to 100% authenticity.
        </p>

        <p className="text-slate-600 leading-relaxed lg:col-span-2">
          All cosmetic products available on BazarBase.com are sourced only from
          authorized distributors and verified sellers. We guarantee 100%
          authentic and genuine branded products for every customer, every
          order, every time.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 mt-10">
        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
          <h3 className="font-display font-semibold text-primary mb-1">Our Mission</h3>
          <p className="text-sm text-slate-600">
            Health and wealth for a happy family — affordable, natural, and
            trustworthy products for everyone.
          </p>
        </div>
        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
          <h3 className="font-display font-semibold text-primary mb-1">Authenticity First</h3>
          <p className="text-sm text-slate-600">
            Every product is sourced from authorized distributors — no
            duplicates, no compromises.
          </p>
        </div>
        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
          <h3 className="font-display font-semibold text-primary mb-1">Simple Ordering</h3>
          <p className="text-sm text-slate-600">
            No accounts, no complicated checkout — browse, pick, and order
            directly on WhatsApp.
          </p>
        </div>
      </div>

      {/* Returns & Refunds summary — grid, no longer a single cramped column */}
      <div className="mt-12">
        <h2 className="text-xl font-display font-semibold text-slate-800 mb-4">
          Returns &amp; Refunds, in short
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl border border-slate-200">
            <h3 className="font-medium text-slate-800 text-sm">7-day return window</h3>
            <p className="text-sm text-slate-600 mt-1">
              Eligible products can be returned or exchanged within 7 days of
              delivery. Requests after 7 days can't be accepted.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-slate-200">
            <h3 className="font-medium text-slate-800 text-sm">Product must be unopened and unused</h3>
            <p className="text-sm text-slate-600 mt-1">
              Original packaging, seal, tags, and bill must be intact for a
              return to be accepted.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-slate-200">
            <h3 className="font-medium text-slate-800 text-sm">Food, Ayurveda &amp; opened cosmetics aren't returnable</h3>
            <p className="text-sm text-slate-600 mt-1">
              For hygiene and safety reasons, food items, Ayurvedic consumables,
              and cosmetics with a broken seal or that have been used cannot be
              returned.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-slate-200">
            <h3 className="font-medium text-slate-800 text-sm">Damaged or wrong item? We'll make it right</h3>
            <p className="text-sm text-slate-600 mt-1">
              If a food or cosmetic item arrives damaged, broken, or incorrect,
              contact us within 24–48 hours of delivery with an unboxing
              photo or video, and we'll replace it or issue a full refund.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-slate-200">
            <h3 className="font-medium text-slate-800 text-sm">Refund timeline</h3>
            <p className="text-sm text-slate-600 mt-1">
              Once your return is received and quality-checked, approved
              refunds are processed to your original payment method within
              5–7 working days.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-slate-200">
            <h3 className="font-medium text-slate-800 text-sm">Cancellations</h3>
            <p className="text-sm text-slate-600 mt-1">
              Orders can be cancelled any time before they ship. Once shipped,
              cancellation isn't possible.
            </p>
          </div>
        </div>
      </div>

      {/* Business details */}
      <div className="mt-12 mb-4">
        <h2 className="text-xl font-display font-semibold text-slate-800 mb-4">
          Business &amp; contact details
        </h2>
        <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 grid sm:grid-cols-3 gap-6">
          <div>
            <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wide">Marketed by</h3>
            <p className="text-sm text-slate-700 mt-1">Rashmi Cosmetic and Srishti Ayurved India</p>
          </div>
          <div>
            <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wide">FSSAI registration</h3>
            <p className="text-sm text-slate-700 mt-1">22726101003244</p>
          </div>
          <div>
            <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wide">Registered address</h3>
            <p className="text-sm text-slate-700 mt-1">
              House No. 107/4, Kashiram Awas Yojna, Sadrauna, Lucknow, Uttar Pradesh – 226008
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}