import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Фоновая картинка — свеча */}
      <Image
        src="/svecha.jpg"
        alt="Поминовение — свеча"
        fill
        priority
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
          zIndex: 0,
        }}
      />

      {/* Затемнение поверх картинки, чтобы текст было видно */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'linear-gradient(to bottom, rgba(26,15,10,0.75), rgba(26,15,10,0.92))',
          zIndex: 1,
        }}
      />

      {/* Контент поверх затемнения */}
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-2xl text-white">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#D4AF37]">
            Поминовение
          </h1>
          <p className="text-lg text-gray-300">
            Православные традиции памяти усопших
          </p>
          <p className="text-sm text-gray-400 mt-3">
            Сервис бесплатный. Подать записку и поддержать проект можно по желанию.
          </p>
        </header>

        <div className="space-y-4 mb-6">
          <Link
            href="/add"
            className="block w-full py-4 px-6 rounded-xl bg-[#8C2F2F] text-white font-medium text-lg text-center hover:bg-[#A63939] transition-colors shadow-lg"
          >
            📅 Напоминания
          </Link>
          <Link
            href="/traditions"
            className="block w-full py-4 px-6 rounded-xl bg-[#4A5D23] text-white font-medium text-lg text-center hover:bg-[#5A6D33] transition-colors shadow-lg"
          >
            📖 Традиции
          </Link>
          <Link
            href="/order"
            className="block w-full py-4 px-6 rounded-xl bg-[#D4AF37] text-[#2C1810] font-medium text-lg text-center hover:bg-[#F4CF57] transition-colors shadow-lg"
          >
            🕯 Подать записку
          </Link>
        </div>

        <div className="flex items-center justify-center gap-6 text-sm">
          <Link href="/dates" className="text-white/60 hover:text-white/90 underline">
            Мои даты
          </Link>
          <Link href="/about" className="text-[#D4AF37] hover:text-[#F4CF57] underline">
            О проекте
          </Link>
        </div>
      </div>
    </main>
  )
}