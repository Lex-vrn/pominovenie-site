import Link from 'next/link'

const blocks = [
  {
    title: 'Что это за проект',
    text: '«Поминовение» — частная миссионерская инициатива. Она помогает не забывать о памятных датах усопших близких (3-й, 9-й, 40-й день и годовщина), присылает напоминания с молитвой и рассказывает о православных традициях поминовения простыми словами.',
  },
  {
    title: 'Сервис бесплатный',
    text: 'Напоминания, молитвы и раздел «Традиции» доступны каждому бесплатно и без регистрации. Подать записку и поддержать проект можно по желанию — это никогда не обязательно.',
  },
  {
    title: 'Статус проекта',
    text: 'Проект не является официальным ресурсом Русской Православной Церкви. Тексты носят информационный характер; по вопросам богослужения и обрядов лучше обратиться к священнику ближайшего храма.',
  },
  {
    title: 'Какие данные мы храним',
    text: 'Имя усопшего, дату смерти, необязательный контакт и технический идентификатор вашего браузера для отправки уведомлений. Данные хранятся в сервисах Supabase и OneSignal, которые обеспечивают работу напоминаний, и используются только для этой цели.',
  },
]

// TODO: когда будет готово, добавить сюда отдельные блоки:
// 1) «Кто делает проект» и контакты для связи;
// 2) «Благословение» — имя и сан священника, приход;
// 3) «Куда идут пожертвования».

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2C1810] to-[#1a0f0a] text-white px-4 py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-[#D4AF37] mb-8 text-center">
          О проекте
        </h1>

        <div className="space-y-6">
          {blocks.map((b) => (
            <div
              key={b.title}
              className="bg-white/10 border border-white/20 rounded-xl p-5"
            >
              <h2 className="text-lg font-semibold text-[#D4AF37] mb-2">
                {b.title}
              </h2>
              <p className="text-sm leading-relaxed text-white/85">{b.text}</p>
            </div>
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