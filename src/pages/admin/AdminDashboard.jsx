import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logoutAdmin } from '../../lib/auth'
import AdminCategories from './AdminCategories'
import AdminProducts from './AdminProducts'
import AdminOrders from './AdminOrders'

export default function AdminDashboard() {
  const [tab, setTab] = useState('products')
  const navigate = useNavigate()

  function handleLogout() {
    logoutAdmin()
    navigate('/admin/login')
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-semibold">Admin Dashboard</h1>
        <button onClick={handleLogout} className="text-sm text-slate-500 underline">Log out</button>
      </div>

      <div className="flex gap-2 mb-6 border-b border-slate-200">
        {['products', 'categories', 'orders'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px capitalize ${
              tab === t ? 'border-primary text-primary' : 'border-transparent text-slate-500'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'products' && <AdminProducts />}
      {tab === 'categories' && <AdminCategories />}
      {tab === 'orders' && <AdminOrders />}
    </div>
  )
}