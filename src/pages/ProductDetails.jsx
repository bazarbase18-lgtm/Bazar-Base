import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { doc, getDoc, collection, query, where, limit, getDocs } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { thumb } from '../lib/cloudinary'
import ProductCard from '../components/ProductCard'
import BuyNowModal from '../components/BuyNowModal'

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [activeImage, setActiveImage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [related, setRelated] = useState([])
  const [loadingRelated, setLoadingRelated] = useState(true)
  const [showBuyModal, setShowBuyModal] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    async function load() {
      setLoading(true)
      setActiveImage(0)
      try {
        const snap = await getDoc(doc(db, 'products', id))
        if (snap.exists()) setProduct({ id: snap.id, ...snap.data() })
        else setProduct(null)
      } catch (err) {
        console.error('Failed to load product:', err)
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  useEffect(() => {
    if (!product?.categoryId) {
      setRelated([])
      setLoadingRelated(false)
      return
    }
    async function loadRelated() {
      setLoadingRelated(true)
      try {
        const relSnap = await getDocs(
          query(
            collection(db, 'products'),
            where('categoryId', '==', product.categoryId),
            limit(9)
          )
        )
        setRelated(
          relSnap.docs
            .map((d) => ({ id: d.id, ...d.data() }))
            .filter((p) => p.id !== product.id)
            .slice(0, 8)
        )
      } catch (err) {
        console.error('Failed to load related products:', err)
      } finally {
        setLoadingRelated(false)
      }
    }
    loadRelated()
  }, [product?.categoryId, product?.id])

  function scrollRelated(direction) {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <div className="max-w-container mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">
        <div className="aspect-square bg-slate-100 rounded-xl animate-pulse" />
        <div className="space-y-4">
          <div className="h-7 w-2/3 bg-slate-100 rounded animate-pulse" />
          <div className="h-5 w-1/3 bg-slate-100 rounded animate-pulse" />
          <div className="h-24 w-full bg-slate-100 rounded animate-pulse" />
        </div>
      </div>
    )
  }

  if (!product)
    return (
      <div className="max-w-container mx-auto px-4 py-16 text-center">
        <p className="text-slate-600">Product not found.</p>
        <Link to="/shop" className="mt-3 inline-block text-primary font-medium underline">
          Back to shop
        </Link>
      </div>
    )

  const discountPercent =
    product.mrp && product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : null

  return (
    <div className="max-w-container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-500 mb-6 flex items-center gap-2 flex-wrap">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-primary">Shop</Link>
        {product.categorySlug && (
          <>
            <span>/</span>
            <Link to={`/shop/${product.categorySlug}`} className="hover:text-primary">
              {product.categoryName || 'Category'}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-slate-700 truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Gallery */}
        <div>
          <div className="relative aspect-square bg-slate-50 rounded-2xl overflow-hidden border border-slate-200">
            {discountPercent && (
              <span className="absolute top-3 left-3 bg-accentOrange text-white text-xs font-semibold px-2.5 py-1 rounded-full z-10">
                {discountPercent}% OFF
              </span>
            )}
            <img
              src={thumb(product.images?.[activeImage], 700, 700)}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images?.length > 1 && (
            <div className="no-scrollbar flex gap-3 mt-4 overflow-x-auto pb-1 -mx-4 px-4 md:mx-0 md:px-0">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`flex-shrink-0 w-14 h-14 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-colors ${i === activeImage ? 'border-primary' : 'border-slate-200 hover:border-slate-300'
                    }`}
                >
                  <img src={thumb(img, 120, 120)} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-semibold text-slate-800 leading-snug">
            {product.name}
          </h1>

          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-3xl text-primary font-display font-semibold">₹{product.price}</span>
            {product.mrp && product.mrp > product.price && (
              <span className="text-slate-400 line-through text-lg">₹{product.mrp}</span>
            )}
            {discountPercent && (
              <span className="text-accentGreen text-sm font-medium">Save {discountPercent}%</span>
            )}
          </div>

          {product.tags?.length > 0 && (
            <div className="flex gap-2 mt-4 flex-wrap">
              {product.tags.map((t) => (
                <span key={t} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                  {t}
                </span>
              ))}
            </div>
          )}

          <p className="mt-5 text-slate-600 leading-relaxed whitespace-pre-line">{product.description}</p>

          <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
            <span className="text-accentGreen">✓</span>
            Genuine product, sourced from verified sellers
          </div>

          <button
            onClick={() => setShowBuyModal(true)}
            className="mt-6 block md:inline-block text-center bg-primary text-white font-medium px-8 py-3.5 rounded-lg hover:opacity-90 w-full md:w-auto"
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* Related products */}
      {(loadingRelated || related.length > 0) && (
        <section className="mt-16">
          <h2 className="text-xl font-display font-semibold mb-4">You may also like</h2>

          {loadingRelated ? (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex-shrink-0 w-48 h-64 bg-slate-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollRelated(-1)}
                aria-label="Scroll left"
                className="hidden md:flex flex-shrink-0 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-slate-300"
              >
                ‹
              </button>

              <div
                ref={scrollRef}
                className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth pb-2 flex-1 -mx-4 px-4 md:mx-0 md:px-0"
              >
                {related.map((p) => (
                  <div key={p.id} className="flex-shrink-0 w-44 md:w-52">
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>

              <button
                onClick={() => scrollRelated(1)}
                aria-label="Scroll right"
                className="hidden md:flex flex-shrink-0 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-slate-300"
              >
                ›
              </button>
            </div>
          )}

          <style>{`
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>
        </section>
      )}

      {showBuyModal && (
        <BuyNowModal product={product} onClose={() => setShowBuyModal(false)} />
      )}
    </div>
  )
}