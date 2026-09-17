import { useEffect, useState } from 'react'
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import ImageUploader from '../../components/ImageUploader'
import { thumb, buildProductFolder } from '../../lib/cloudinary'

const empty = { name: '', categoryId: '', price: '', mrp: '', description: '', tags: '', images: [], inStock: true }

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState(null)

  async function load() {
    const catSnap = await getDocs(query(collection(db, 'categories'), orderBy('order')))
    setCategories(catSnap.docs.map((d) => ({ id: d.id, ...d.data() })))

    const prodSnap = await getDocs(query(collection(db, 'products'), orderBy('createdAt', 'desc')))
    setProducts(prodSnap.docs.map((d) => ({ id: d.id, ...d.data() })))
  }

  useEffect(() => { load() }, [])

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  const selectedCategoryName = categories.find((c) => c.id === form.categoryId)?.name || ''

  async function handleSubmit(e) {
    e.preventDefault()
    const payload = {
      ...form,
      price: Number(form.price),
      mrp: form.mrp ? Number(form.mrp) : null,
      tags: form.tags ? form.tags.split(',').map((t) => t.trim()) : [],
    }
    if (editingId) {
      await updateDoc(doc(db, 'products', editingId), payload)
    } else {
      await addDoc(collection(db, 'products'), { ...payload, createdAt: serverTimestamp() })
    }
    setForm(empty)
    setEditingId(null)
    load()
  }

  function startEdit(p) {
    setForm({
      name: p.name,
      categoryId: p.categoryId,
      price: p.price,
      mrp: p.mrp || '',
      description: p.description || '',
      tags: (p.tags || []).join(', '),
      images: p.images || [],
      inStock: p.inStock !== false,
    })
    setEditingId(p.id)
  }

  async function handleDelete(id) {
    if (!confirm('Delete this product?')) return
    await deleteDoc(doc(db, 'products', id))
    load()
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <form onSubmit={handleSubmit} className="space-y-3 bg-slate-50 p-4 rounded-xl">
        <h2 className="font-display font-semibold">{editingId ? 'Edit product' : 'Add product'}</h2>
        <input required placeholder="Product name" value={form.name} onChange={(e) => update('name', e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" />
        <select required value={form.categoryId} onChange={(e) => update('categoryId', e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm">
          <option value="">Select category</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <div className="flex gap-2">
          <input required type="number" placeholder="Price" value={form.price} onChange={(e) => update('price', e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" />
          <input type="number" placeholder="MRP (optional)" value={form.mrp} onChange={(e) => update('mrp', e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" />
        </div>
        <textarea placeholder="Description" value={form.description} onChange={(e) => update('description', e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" rows={3} />
        <input placeholder="Tags, comma separated (e.g. Chocolate, 2-6 Yr)" value={form.tags} onChange={(e) => update('tags', e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" />
        <ImageUploader multiple folder={buildProductFolder(selectedCategoryName, form.name)} onUploaded={(urls) => update('images', urls)} />
        {form.images?.length > 0 && (
          <div className="flex gap-2">
            {form.images.map((img, i) => <img key={i} src={thumb(img, 60, 60)} alt="" className="w-14 h-14 rounded object-cover" />)}
          </div>
        )}
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.inStock} onChange={(e) => update('inStock', e.target.checked)} />
          In stock
        </label>
        <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium">
          {editingId ? 'Save changes' : 'Add product'}
        </button>
        {editingId && (
          <button type="button" onClick={() => { setForm(empty); setEditingId(null) }} className="ml-2 text-sm text-slate-500">Cancel</button>
        )}
      </form>

      <div className="space-y-2 max-h-[70vh] overflow-y-auto">
        {products.map((p) => (
          <div key={p.id} className="flex items-center gap-3 border border-slate-200 rounded-lg p-2">
            <img src={thumb(p.images?.[0], 60, 60)} alt="" className="w-12 h-12 rounded object-cover" />
            <div className="flex-1">
              <p className="text-sm font-medium">{p.name}</p>
              <p className="text-xs text-slate-500">₹{p.price}</p>
            </div>
            <button onClick={() => startEdit(p)} className="text-xs text-primary">Edit</button>
            <button onClick={() => handleDelete(p.id)} className="text-xs text-red-600">Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}