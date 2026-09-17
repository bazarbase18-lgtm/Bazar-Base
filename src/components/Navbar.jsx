import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Marquee from './Marquee'

const links = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/lab-test-booking', label: 'Lab Test Booking' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <Marquee />

      <div className="max-w-container mx-auto px-4 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="BazarBase.com" className="h-16 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-primary' : 'text-slate-600 hover:text-primary'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="md:hidden text-slate-700"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-slate-200 px-4 py-3 flex flex-col gap-3">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-slate-700"
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}