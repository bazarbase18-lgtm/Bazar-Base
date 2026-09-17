export default function CategoryChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors whitespace-nowrap ${
        active
          ? 'bg-primary text-white border-primary'
          : 'bg-white text-slate-600 border-slate-300 hover:border-primary hover:text-primary'
      }`}
    >
      {label}
    </button>
  )
}