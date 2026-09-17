import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../lib/firebase'
import ProductCard from '../components/ProductCard'
import CategoryChip from '../components/CategoryChip'
import { thumb } from '../lib/cloudinary'

export default function Shop() {
  const { categorySlug } = useParams()
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [activeCategory, setActiveCategory] = useState(categorySlug || 'all')
  const [activeTag, setActiveTag] = useState('all')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const catSnap = await getDocs(query(collection(db, 'categories'), orderBy('order')))
        setCategories(catSnap.docs.map((d) => ({ id: d.id, ...d.data() })))

        const prodSnap = await getDocs(query(collection(db, 'products'), orderBy('createdAt', 'desc')))
        setProducts(prodSnap.docs.map((d) => ({ id: d.id, ...d.data() })))
      } catch (err) {
        console.error('Failed to load shop data:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  useEffect(() => {
    setActiveCategory(categorySlug || 'all')
    setActiveTag('all')
  }, [categorySlug])

  const activeCategoryDoc = categories.find((c) => c.slug === activeCategory)

  const productsInCategory = products.filter(
    (p) => activeCategory === 'all' || p.categoryId === activeCategoryDoc?.id
  )

  const availableTags = [...new Set(productsInCategory.flatMap((p) => p.tags || []))]

  const filtered = productsInCategory.filter((p) => {
    const matchesTag = activeTag === 'all' || p.tags?.includes(activeTag)
    const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase())
    return matchesTag && matchesSearch
  })

  return (
    <div className="max-w-container mx-auto px-4 py-8">
      <div className="grid grid-cols-[88px_1fr] md:grid-cols-[160px_1fr] gap-5 md:gap-10">
        {/* Category sidebar */}
        <aside className="flex flex-col items-center gap-6 pt-1">
          <button onClick={() => setActiveCategory('all')} className="flex flex-col items-center gap-2 w-full">
            <div
              className={`w-16 h-16 md:w-[88px] md:h-[88px] rounded-2xl border-2 flex items-center justify-center text-2xl transition-colors ${
                activeCategory === 'all' ? 'border-primary bg-primary/5' : 'border-slate-200'
              }`}
            >
              🛍️
            </div>
            <span
              className={`text-xs font-medium text-center leading-tight ${
                activeCategory === 'all' ? 'text-primary' : 'text-slate-600'
              }`}
            >
              All
            </span>
          </button>

          {categories.map((c) => (
            <button key={c.id} onClick={() => setActiveCategory(c.slug)} className="flex flex-col items-center gap-2 w-full">
              <div
                className={`w-16 h-16 md:w-[88px] md:h-[88px] rounded-2xl border-2 overflow-hidden transition-colors ${
                  activeCategory === c.slug ? 'border-primary' : 'border-slate-200'
                }`}
              >
                <img src={thumb(c.imageUrl, 160, 160)} alt={c.name} className="w-full h-full object-cover" />
              </div>
              <span
                className={`text-xs font-medium text-center leading-tight ${
                  activeCategory === c.slug ? 'text-primary' : 'text-slate-600'
                }`}
              >
                {c.name}
              </span>
            </button>
          ))}
        </aside>

        {/* Main content */}
        <div className="min-w-0">
          <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary text-white px-6 py-8 md:px-10 md:py-12 mb-6">
            <h1 className="text-2xl md:text-3xl font-display font-semibold">
              {activeCategoryDoc ? activeCategoryDoc.name : 'Everything your family needs'}
            </h1>
            <p className="mt-2 text-white/85 text-sm md:text-base">
              Genuine products, ordered directly on WhatsApp.
            </p>
          </div>

          <input
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-96 border border-slate-300 rounded-lg px-4 py-2.5 text-sm mb-5 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />

          {/* {availableTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              <CategoryChip label="All" active={activeTag === 'all'} onClick={() => setActiveTag('all')} />
              {availableTags.map((t) => (
                <CategoryChip key={t} label={t} active={activeTag === t} onClick={() => setActiveTag(t)} />
              ))}
            </div>
          )} */}

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-slate-100 rounded-xl h-64" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-slate-500 text-sm">No products found.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}