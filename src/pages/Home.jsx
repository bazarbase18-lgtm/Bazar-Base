import { useEffect, useState } from 'react'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import { db } from '../lib/firebase'
import ProductCard from '../components/ProductCard'
import { thumb } from '../lib/cloudinary'
import { whatsappLink } from '../lib/whatsapp'

const TESTIMONIALS = [
  {
    name: 'Priya S.',
    city: 'Lucknow',
    text: 'Ordered immunity boosters for my parents — genuine brands, and the WhatsApp process was faster than any app checkout I have used.',
  },
  {
    name: 'Rohit M.',
    city: 'Kanpur',
    text: 'No sign-up hassle. Sent a message, confirmed the order, and it reached my door in two days. Will order again for sure.',
  },
  {
    name: 'Anjali K.',
    city: 'Prayagraj',
    text: 'Finally a place that stocks baby care and skin care together without fake or expired stock. Very reliable.',
  },
]

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Browse and pick',
    desc: 'Explore categories or new arrivals and shortlist what you need — no account required.',
  },
  {
    step: '02',
    title: 'Message us on WhatsApp',
    desc: 'Tap "Order on WhatsApp" on any product and send us the details — quantity, address, anything else.',
  },
  {
    step: '03',
    title: 'Confirm and receive',
    desc: 'We confirm price and delivery time on chat, you pay on confirmation, and your order ships out.',
  },
]

function SkeletonBlock({ className }) {
  return <div className={`animate-pulse bg-slate-200 rounded-xl ${className}`} />
}

export default function Home() {
  const [categories, setCategories] = useState([])
  const [featured, setFeatured] = useState([])
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [loadingFeatured, setLoadingFeatured] = useState(true)

  useEffect(() => {
    async function loadCategories() {
      try {
        const catSnap = await getDocs(query(collection(db, 'categories'), orderBy('order')))
        setCategories(catSnap.docs.map((d) => ({ id: d.id, ...d.data() })))
      } catch (err) {
        console.error('Failed to load categories:', err)
      } finally {
        setLoadingCategories(false)
      }
    }

    async function loadFeatured() {
      try {
        const prodSnap = await getDocs(
          query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(8))
        )
        setFeatured(prodSnap.docs.map((d) => ({ id: d.id, ...d.data() })))
      } catch (err) {
        console.error('Failed to load featured products:', err)
      } finally {
        setLoadingFeatured(false)
      }
    }

    loadCategories()
    loadFeatured()
  }, [])

  return (
    <div>
      {/* Hero */}
            {/* Hero */}
      <section className="bg-primary text-white overflow-hidden">
        <div className="max-w-container mx-auto px-4 py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-display font-semibold leading-tight">
              Everyday health, beauty &amp; home essentials — for the whole family
            </h1>
            <p className="mt-5 text-white/85 text-lg leading-relaxed">
              From skin and hair care to immunity boosters, daily wellness products,
              baby care, and home essentials — BazarBase.com brings genuine,
              verified-seller products from trusted brands, all in one place.
              No sign-up, no complicated checkout — just message us on WhatsApp
              and we take it from there.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="inline-block bg-accentOrange text-white px-6 py-3 rounded-lg font-medium hover:opacity-90"
              >
                Browse the shop
              </Link>
              <a
                href={whatsappLink('Hi, I would like to know more about BazarBase.com products')}
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-white/10 border border-white/40 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20"
              >
                Chat on WhatsApp
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/20 pt-6 max-w-md">
              <div>
                <p className="text-2xl font-display font-semibold">100%</p>
                <p className="text-sm text-white/70 mt-1">Genuine products</p>
              </div>
              <div>
                <p className="text-2xl font-display font-semibold">24/7</p>
                <p className="text-sm text-white/70 mt-1">WhatsApp support</p>
              </div>
              <div>
                <p className="text-2xl font-display font-semibold">Pan-India</p>
                <p className="text-sm text-white/70 mt-1">Delivery reach</p>
              </div>
            </div>
          </div>

          {/* Right: live category collage — uses real catalog data, no stock banner needed */}
          <div className="relative hidden md:block h-[420px]">
            {categories.slice(0, 4).map((c, i) => {
              const positions = [
                'top-0 left-8 w-48 h-56 rotate-[-4deg] z-30',
                'top-16 right-0 w-44 h-52 rotate-[3deg] z-20',
                'bottom-0 left-0 w-40 h-48 rotate-[2deg] z-20',
                'bottom-8 right-12 w-36 h-44 rotate-[-3deg] z-10',
              ]
              return (
                <Link
                  key={c.id}
                  to={`/shop/${c.slug}`}
                  className={`absolute ${positions[i]} rounded-2xl overflow-hidden shadow-xl border-4 border-white/90 hover:rotate-0 hover:z-40 transition-transform`}
                >
                  <img src={thumb(c.imageUrl, 300, 350)} alt={c.name} className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs font-medium px-3 py-2">
                    {c.name}
                  </span>
                </Link>
              )
            })}

            <div className="absolute top-4 right-4 z-40 bg-white text-slate-800 rounded-xl shadow-lg px-4 py-2.5 flex items-center gap-2">
              <span className="text-accentGreen text-lg">✓</span>
              <span className="text-xs font-medium leading-tight">100% Genuine<br/>Products</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="max-w-container mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          <div className="p-4">
            <div className="text-accentGreen text-2xl mb-2">✓</div>
            <h3 className="font-display font-semibold text-slate-800">100% Genuine Products</h3>
            <p className="text-sm text-slate-500 mt-1">
              Sourced only from authorized distributors and verified sellers.
            </p>
          </div>
          <div className="p-4">
            <div className="text-accentGreen text-2xl mb-2">✓</div>
            <h3 className="font-display font-semibold text-slate-800">Order on WhatsApp</h3>
            <p className="text-sm text-slate-500 mt-1">
              No account, no cart — pick a product and message us directly.
            </p>
          </div>
          <div className="p-4">
            <div className="text-accentGreen text-2xl mb-2">✓</div>
            <h3 className="font-display font-semibold text-slate-800">Family-First Range</h3>
            <p className="text-sm text-slate-500 mt-1">
              Products for men, women, kids, and elders — health and wellness for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Shop by category */}
      <section className="max-w-container mx-auto px-4 py-10">
        <h2 className="text-xl font-display font-semibold mb-4">Shop by category</h2>
        {loadingCategories ? (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonBlock key={i} className="flex-shrink-0 w-32 h-32" />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <p className="text-sm text-slate-500">Categories are being updated — check back shortly.</p>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {categories.map((c) => (
              <Link key={c.id} to={`/shop/${c.slug}`} className="flex-shrink-0 w-32 text-center group">
                <div className="w-32 h-32 rounded-xl bg-slate-50 border border-slate-200 overflow-hidden group-hover:border-accentOrange transition-colors">
                  <img
                    src={thumb(c.imageUrl, 200, 200)}
                    alt={c.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="mt-2 text-sm font-medium text-slate-700">{c.name}</p>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* How it works */}
      <section className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-container mx-auto px-4 py-14">
          <h2 className="text-xl font-display font-semibold mb-8">How ordering works</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((s) => (
              <div key={s.step}>
                <span className="text-sm font-display text-accentOrange font-semibold">{s.step}</span>
                <h3 className="mt-2 font-display font-semibold text-slate-800">{s.title}</h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New arrivals */}
      <section className="max-w-container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-display font-semibold">New arrivals</h2>
          <Link to="/shop" className="text-sm text-accentOrange font-medium hover:underline">
            View all
          </Link>
        </div>
        {loadingFeatured ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonBlock key={i} className="h-56" />
            ))}
          </div>
        ) : featured.length === 0 ? (
          <p className="text-sm text-slate-500">New products are on the way — check back shortly.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* Testimonials */}
      <section className="max-w-container mx-auto px-4 py-14">
        <h2 className="text-xl font-display font-semibold mb-8">What families are saying</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="p-6 rounded-xl border border-slate-200 bg-white">
              <p className="text-sm text-slate-600 leading-relaxed">"{t.text}"</p>
              <p className="mt-4 text-sm font-medium text-slate-800">
                {t.name} <span className="text-slate-400 font-normal">· {t.city}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-primary text-white">
        <div className="max-w-container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-semibold">
            Ready to order? We're one message away.
          </h2>
          <p className="mt-3 text-white/80 max-w-xl mx-auto">
            Tell us what you need — we'll confirm availability, price, and delivery time right on WhatsApp.
          </p>
          <a
            href={whatsappLink('Hi, I would like to place an order on BazarBase.com')}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block bg-accentOrange text-white px-8 py-3 rounded-lg font-medium hover:opacity-90"
          >
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}