import { Link } from 'react-router-dom'
import { thumb } from '../lib/cloudinary'
import { buildProductUrl } from '../lib/slug'

export default function ProductCard({ product }) {
  const discount =
    product.mrp && product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : null

  return (
    <Link
      to={buildProductUrl(product)}
      className="group block bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-square bg-slate-50 p-3">
        <img
          src={thumb(product.images?.[0], 400, 400)}
          alt={product.name}
          className="w-full h-full object-contain"
          loading="lazy"
        />
        {discount && (
          <span className="absolute top-2 left-2 bg-accentOrange text-white text-xs font-semibold px-2 py-1 rounded">
            {discount}% OFF
          </span>
        )}
        <span className="absolute bottom-2 right-2 bg-white border-2 border-accentGreen text-accentGreen text-xs font-bold px-3 py-1.5 rounded-lg group-hover:bg-accentGreen group-hover:text-white transition-colors">
          VIEW
        </span>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-slate-800 line-clamp-2">{product.name}</h3>
        {product.tags?.length > 0 && (
          <div className="flex gap-1 mt-1.5 flex-wrap">
            {product.tags.slice(0, 2).map((t) => (
              <span key={t} className="text-[10px] border border-slate-300 text-slate-600 px-1.5 py-0.5 rounded">
                {t}
              </span>
            ))}
          </div>
        )}
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-primary font-semibold">₹{product.price}</span>
          {product.mrp && product.mrp > product.price && (
            <span className="text-xs text-slate-400 line-through">₹{product.mrp}</span>
          )}
        </div>
      </div>
    </Link>
  )
}