const ADMIN_ID = import.meta.env.VITE_ADMIN_ID
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD
const SESSION_KEY = 'bazarbase_admin_session'

export function loginAdmin(id, password) {
  if (id === ADMIN_ID && password === ADMIN_PASSWORD) {
    sessionStorage.setItem(SESSION_KEY, 'true')
    return true
  }
  return false
}

export function isAdminLoggedIn() {
  return sessionStorage.getItem(SESSION_KEY) === 'true'
}

export function logoutAdmin() {
  sessionStorage.removeItem(SESSION_KEY)
}