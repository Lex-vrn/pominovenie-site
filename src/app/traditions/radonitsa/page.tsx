import Link from 'next/link'

const items = [
  {
    title: 'Радоница',
    text: 'Радоница отмечается на 9-й день после Пасхи (обычно вторник второй недели). В этот день Церковь призывает разделить пасхальную радость с усопшими — отсюда и название. Принято посещать кладбище, служить панихиду и поминать близких без скорби, с верой в воскресение.',
  },
  {
    title: 'Родительские субботы',
    text: 'В течение года выделено несколько особых суббот для общецерковного поминовения усопших: Мясопустная (перед Масленицей), субботы Великого поста (2-я, 3-я, 4-я недели), Троицкая (перед Пятидесятницей) и Димитриевская (начало ноября). В эти дни в храмах служат особую панихиду обо всех усопших православных христианах.',
  },
]

export default function RadonitsaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2C1810] to-[#1a0f0a] text-white px-4 py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-[#D4AF37] mb-8 text-center">
          Радоница и субботы
        </h1>

        <div className="space-y-6">
          {items.map((i) => (
            <div
              key={i.title}
              className="bg-white/10 border border-white/20 rounded-xl p-5"
            >
              <h2 className="text-lg font-semibold text-[#D4AF37] mb-2">
                {i.title}
              </h2>
              <p className="text-sm leading-relaxed text-white/85">
                {i.text}
              </p>
            </div>
          ))}
        </div>

        <Link
          href="/traditions"
          className="block w-full mt-8 py-3 px-6 rounded-xl border border-white/20 text-white/70 font-medium text-center hover:bg-white/5 transition-colors"
        >
          Назад к Традициям
        </Link>
      </div>
    </div>
  )
}