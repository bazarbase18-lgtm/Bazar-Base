import { FaWhatsapp } from 'react-icons/fa'
import { whatsappLink } from '../lib/whatsapp'

export default function StickyWhatsApp() {
  return (
    <a
      href={whatsappLink('Hi, I would like to know more about BazarBase.com products')}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-accentGreen shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
    >
      <FaWhatsapp className="w-7 h-7 text-white" />
    </a>
  )
}