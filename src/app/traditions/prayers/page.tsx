import Link from 'next/link'

const days = [
  {
    title: '3-й день',
    explanation:
      'Панихиду или молитву в 3-й день совершают в память о Воскресении Христовом на третий день, с верой в то, что и душа усопшего пройдёт свой путь к Богу. Обычно этот день совпадает с днём погребения.',
    prayer:
      'Помяни, Господи, душу новопреставленного раба Твоего (имя), и прости ему вся согрешения, вольная и невольная, и даруй ему Царствие Небесное.',
  },
  {
    title: '9-й день',
    explanation:
      'На 9-й день Церковь molится об усопшем вместе с девятью чинами ангельскими, прося их предстательства перед Богом за душу умершего.',
    prayer:
      'Помяни, Господи, душу новопреставленного раба Твоего (имя), и прости ему вся согрешения, вольная и невольная, и даруй ему Царствие Небесное.',
  },
  {
    title: '40-й день',
    explanation:
      '40-й день — один из самых важных в традиции поминовения, связанный с окончанием земного пути души и её предстоянием перед Богом. В этот день особенно уместно заказать панихиду в храме.',
    prayer:
      'Помяни, Господи, душу раба Твоего (имя), и прости ему вся согрешения, вольная и невольная, и даруй ему Царствие Небесное.',
  },
  {
    title: 'Годовщина',
    explanation:
      'Ежегодное поминовение в день смерти — возможность вспомнить человека, помолиться о нём и мысленно побыть рядом, даже спустя годы.',
    prayer:
      'Помяни, Господи, душу раба Твоего (имя), и прости ему вся согрешения, вольная и невольная, и даруй ему Царствие Небесное. Вечная память.',
  },
]

export default function PrayersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2C1810] to-[#1a0f0a] text-white px-4 py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-[#D4AF37] mb-8 text-center">
          Молитвы по дням
        </h1>

        <div className="space-y-6">
          {days.map((d) => (
            <div
              key={d.title}
              className="bg-white/10 border border-white/20 rounded-xl p-5"
            >
              <h2 className="text-lg font-semibold text-[#D4AF37] mb-2">
                {d.title}
              </h2>
              <p className="text-sm leading-relaxed text-white/70 mb-3">
                {d.explanation}
              </p>
              <p className="text-sm leading-relaxed text-white/90 italic border-l-2 border-[#D4AF37]/50 pl-3">
                {d.prayer}
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