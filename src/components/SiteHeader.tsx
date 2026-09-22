export default function SiteHeader() {
  return (
    <header className="w-full flex items-center justify-center gap-3 py-4 border-b border-white/10">
      <svg
        width="28"
        height="36"
        viewBox="0 0 28 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="14" cy="7" rx="5" ry="7" fill="url(#flameGradient)" />
        <rect x="12" y="14" width="4" height="20" rx="1.5" fill="url(#waxGradient)" />
        <defs>
          <linearGradient id="flameGradient" x1="14" y1="0" x2="14" y2="14" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFE8A3" />
            <stop offset="50%" stopColor="#F4CF57" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
          <linearGradient id="waxGradient" x1="14" y1="14" x2="14" y2="34" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8C2F2F" />
          </linearGradient>
        </defs>
      </svg>
      <span className="text-lg font-semibold text-[#D4AF37] tracking-wide">
        Поминовение
      </span>
    </header>
  )
}