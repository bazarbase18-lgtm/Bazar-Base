const items = [
  'Blood Test Booking Available',
  'Healthians Lab Partner Across India',
  'Affordable & Reliable Lab Tests',
  'Blood Sample Collection Available 24 Hours',
  'Convenient Home Sample Pickup Across India',
  'Book Your Blood Test Easily',
]

export default function Marquee() {
  const track = [...items, ...items] // duplicated for a seamless loop

  return (
    <div className="w-full overflow-hidden whitespace-nowrap bg-primary py-2">
      <div className="inline-flex animate-marquee">
        {track.map((text, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span className="mx-6 text-sm font-semibold text-white">{text}</span>
            <span className="text-white/40">|</span>
          </span>
        ))}
      </div>
    </div>
  )
}