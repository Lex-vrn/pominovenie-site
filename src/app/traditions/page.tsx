import Link from 'next/link'

const sections = [
  {
    slug: 'newcomer',
    title: 'Если вы делаете это впервые',
    description: 'Не знаете, с чего начать? Начните отсюда — без осуждения и сложных слов',
  },
  {
    slug: 'prayers',
    title: 'Молитвы по дням',
    description: '3-й, 9-й, 40-й день и годовщина — полные тексты и пояснения',
  },
  {
    slug: 'rites',
    title: 'Обряды и традиции',
    description: 'Как проходит панихида и поминальный стол',
  },
  {
    slug: 'radonitsa',
    title: 'Радоница и субботы',
    description: 'Что это такое и когда бывает',
  },
]

export default function TraditionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2C1810] to-[#1a0f0a] text-white px-4 py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-[#D4AF37] mb-8 text-center">
          Традиции
        </h1>

        <div className="space-y-4">
          {sections.map((s) => (
            <Link
              key={s.slug}
              href={`/traditions/${s.slug}`}
              className="block bg-white/10 border border-white/20 rounded-xl p-5 hover:bg-white/15 transition-colors"
            >
              <h2 className="text-lg font-semibold text-[#D4AF37] mb-1">
                {s.title}
              </h2>
              <p className="text-sm text-white/80">{s.description}</p>
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="block w-full mt-8 py-3 px-6 rounded-xl border border-white/20 text-white/70 font-medium text-center hover:bg-white/5 transition-colors"
        >
          На главную
        </Link>
      </div>
    </div>
  )
}