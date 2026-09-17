import { useEffect, useState } from 'react'
import { collection, query, orderBy, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../lib/firebase'

const STATUS_FLOW = {
  Pending: [],
  Paid: ['Shipped'],
  Shipped: ['Delivered'],
  Delivered: [],
}

const STATUS_COLORS = {
  Pending: 'bg-slate-100 text-slate-600',
  Paid: 'bg-blue-50 text-blue-600',
  Shipped: 'bg-amber-50 text-amber-600',
  Delivered: 'bg-green-50 text-green-600',
}

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const [updatingId, setUpdatingId] = useState(null)

  async function load() {
    setLoading(true)
    try {
      const snap = await getDocs(query(collection(db, 'orders'), orderBy('createdAt', 'desc')))
      setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    } catch (err) {
      console.error('Failed to load orders:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function handleStatusChange(orderId, newStatus) {
    setUpdatingId(orderId)
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        status: newStatus,
        updatedAt: serverTimestamp(),
      })
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      )
    } catch (err) {
      console.error('Failed to update status:', err)
      alert('Could not update status. Try again.')
    } finally {
      setUpdatingId(null)
    }
  }

  const filtered = filter === 'All' ? orders : orders.filter((o) => o.status === filter)

  if (loading) {
    return <p className="text-slate-500 text-sm">Loading orders…</p>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-display font-semibold">Orders ({orders.length})</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm"
        >
          {['All', 'Pending', 'Paid', 'Shipped', 'Delivered'].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-slate-500 text-sm">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200">
                <th className="py-2 pr-4">Product</th>
                <th className="py-2 pr-4">Customer</th>
                <th className="py-2 pr-4">Amount</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.id} className="border-b border-slate-100">
                  <td className="py-3 pr-4">{order.productName}</td>
                  <td className="py-3 pr-4">
                    <div>{order.customerName}</div>
                    <div className="text-xs text-slate-400">{order.customerPhone}</div>
                  </td>
                  <td className="py-3 pr-4">₹{order.amount}</td>
                  <td className="py-3 pr-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_COLORS[order.status] || ''}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-slate-500">
                    {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString() : '—'}
                  </td>
                  <td className="py-3 pr-4">
                    {STATUS_FLOW[order.status]?.length > 0 ? (
                      <select
                        disabled={updatingId === order.id}
                        value=""
                        onChange={(e) => e.target.value && handleStatusChange(order.id, e.target.value)}
                        className="border border-slate-200 rounded-lg px-2 py-1 text-xs"
                      >
                        <option value="">Move to…</option>
                        {STATUS_FLOW[order.status].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-slate-300 text-xs">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}