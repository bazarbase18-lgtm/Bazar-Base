import { Navigate } from 'react-router-dom'
import { isAdminLoggedIn } from '../lib/auth'

export default function ProtectedRoute({ children }) {
  if (!isAdminLoggedIn()) {
    return <Navigate to="/admin/login" replace />
  }
  return children
}