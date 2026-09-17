import { useEffect, useState } from 'react'
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import ImageUploader from '../../components/ImageUploader'
import { thumb, buildCategoryFolder } from '../../lib/cloudinary'

const empty = { name: '', slug: '', imageUrl: '', order: 0 }

export default function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState(null)

  async function load() {
    const snap = await getDocs(query(collection(db, 'categories'), orderBy('order')))
    setCategories(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  }

  useEffect(() => { load() }, [])

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const payload = { ...form, order: Number(form.order) }
    if (editingId) {
      await updateDoc(doc(db, 'categories', editingId), payload)
    } else {
      await addDoc(collection(db, 'categories'), payload)
    }
    setForm(empty)
    setEditingId(null)
    load()
  }

  function startEdit(c) {
    setForm({ name: c.name, slug: c.slug, imageUrl: c.imageUrl, order: c.order })
    setEditingId(c.id)
  }

  async function handleDelete(id) {
    if (!confirm('Delete this category?')) return
    await deleteDoc(doc(db, 'categories', id))
    load()
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <form onSubmit={handleSubmit} className="space-y-3 bg-slate-50 p-4 rounded-xl">
        <h2 className="font-display font-semibold">{editingId ? 'Edit category' : 'Add category'}</h2>
        <input required placeholder="Name" value={form.name} onChange={(e) => update('name', e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" />
        <input required placeholder="Slug (e.g. cosmetics)" value={form.slug} onChange={(e) => update('slug', e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" />
        <input type="number" placeholder="Display order" value={form.order} onChange={(e) => update('order', e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" />
        <ImageUploader folder={buildCategoryFolder(form.name)} onUploaded={(url) => update('imageUrl', url)} />
        {form.imageUrl && <img src={thumb(form.imageUrl, 100, 100)} alt="" className="w-20 h-20 rounded-lg object-cover" />}
        <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium">
          {editingId ? 'Save changes' : 'Add category'}
        </button>
        {editingId && (
          <button type="button" onClick={() => { setForm(empty); setEditingId(null) }} className="ml-2 text-sm text-slate-500">Cancel</button>
        )}
      </form>

      <div className="space-y-2">
        {categories.map((c) => (
          <div key={c.id} className="flex items-center gap-3 border border-slate-200 rounded-lg p-2">
            <img src={thumb(c.imageUrl, 60, 60)} alt="" className="w-12 h-12 rounded object-cover" />
            <div className="flex-1">
              <p className="text-sm font-medium">{c.name}</p>
              <p className="text-xs text-slate-500">/{c.slug}</p>
            </div>
            <button onClick={() => startEdit(c)} className="text-xs text-primary">Edit</button>
            <button onClick={() => handleDelete(c.id)} className="text-xs text-red-600">Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}