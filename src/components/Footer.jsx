import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-secondary text-white mt-16">
      <div className="max-w-container mx-auto px-4 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8">
        <div className="col-span-2 sm:col-span-1">
          <img src="/logo.png" alt="BazarBase.com" className="h-12 w-auto mb-3" />
          <p className="text-sm text-slate-100/80">
            Marketed by Rashmi Cosmetic and Srishti Ayurved India.
            FSSAI Reg No: 22726101003244
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li>
              <Link to="/" className="text-sm text-slate-100/80 hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" className="text-sm text-slate-100/80 hover:text-white">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/lab-test-booking" className="text-sm text-slate-100/80 hover:text-white">
                Lab Test Booking
              </Link>
            </li>
            <li>
              <Link to="/track-order" className="text-sm text-slate-100/80 hover:text-white">
                Track Order
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-sm text-slate-100/80 hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-sm text-slate-100/80 hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm mb-2">Legal</h4>
          <ul className="space-y-1">
            <li>
              <Link to="/terms" className="text-sm text-slate-100/80 hover:text-white">
                Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="text-sm text-slate-100/80 hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/returns-refunds" className="text-sm text-slate-100/80 hover:text-white">
                Returns &amp; Refunds
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm mb-2">Contact</h4>
          <p className="text-sm text-slate-100/80">
            House No- 107/4, Kashiram Awas Yojna, Sadrauna,
            Lucknow, Uttar Pradesh - 226008
          </p>
          <p className="text-sm text-slate-100/80 mt-2">WhatsApp: +91 82991 38080</p>
          <p className="text-sm text-slate-100/80 mt-1">bazarbase18@gmail.com</p>
        </div>
      </div>

      <div className="text-center text-xs text-slate-100/60 py-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-1.5">
        <span>© {new Date().getFullYear()} BazarBase.com — All rights reserved.</span>
        <span className="hidden sm:inline">·</span>
        <span>
          Created by{' '}
          <a
            href="https://digitalsevakai.com/"
            target="_blank"
            rel="noreferrer"
            className="text-slate-100/80 hover:text-white underline"
          >
            SevakAI
          </a>
        </span>
      </div>
    </footer>
  )
}