import Link from 'next/link'
import DonationButton from '@/components/DonationButton'

const types = [
  {
    slug: 'proskomidia',
    title: 'Проскомидия',
    description: 'Поминовение за литургией — имя прочитывается священником во время службы',
  },
  {
    slug: 'panihida',
    title: 'Панихида',
    description: 'Отдельное заупокойное богослужение, которое можно заказать на любой день',
  },
  {
    slug: 'sorokoust',
    title: 'Сорокоуст',
    description: 'Поминовение за литургией каждый день в течение 40 дней подряд',
  },
  {
    slug: 'year',
    title: 'Поминовение на год',
    description: 'Регулярное поминовение в течение года, с напоминанием о продлении',
  },
]

export default function OrderPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2C1810] to-[#1a0f0a] text-white px-4 py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-[#D4AF37] mb-2 text-center">
          Подать записку
        </h1>
        <p className="text-sm text-gray-400 mb-8 text-center">
          Это бесплатно. Пожертвование можно указать по желанию — на следующем шаге.
        </p>

        <div className="space-y-4 mb-8">
          {types.map((t) => (
            <Link
              key={t.slug}
              href={`/order/${t.slug}`}
              className="block bg-white/10 border border-white/20 rounded-xl p-5 hover:bg-white/15 transition-colors"
            >
              <h2 className="text-lg font-semibold text-[#D4AF37] mb-1">
                {t.title}
              </h2>
              <p className="text-sm text-white/80">{t.description}</p>
            </Link>
          ))}
        </div>

        <div className="mb-4">
          <DonationButton />
        </div>

        <Link
          href="/"
          className="block w-full py-3 px-6 rounded-xl border border-white/20 text-white/70 font-medium text-center hover:bg-white/5 transition-colors"
        >
          На главную
        </Link>
      </div>
    </div>
  )
}