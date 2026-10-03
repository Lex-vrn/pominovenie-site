import Link from 'next/link'

export const metadata = {
  title: 'Некрещёные и самоубийцы — Поминовение',
}

export default function UnbaptizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2C1810] to-[#1a0f0a] text-white px-4 py-12">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-[#D4AF37] mb-6 text-center">
          Некрещёные и Самоубийцы
        </h1>

        <div className="space-y-6 text-white/80 leading-relaxed">
          <p>
            Если вы потеряли близкого, который не был крещён, или ушёл из жизни
            по своей воле, нам очень жаль. Мы знаем, как тяжело это нести.
          </p>

          <p>
            <span className="font-semibold text-[#D4AF37]">
              Что говорят церковные правила.
            </span>{' '}
            В храме за литургией и на панихиде поминают только крещёных. О
            некрещёных записки не принимают. О тех, кто лишил себя жизни,
            церковные службы обычно не совершаются: исключения возможны только с
            благословения правящего архиерея, например при тяжёлой болезни.
          </p>

          <p>
            <span className="font-semibold text-[#D4AF37]">Что можно делать.</span>{' '}
            Молиться о таком человеке можно дома, своими словами, и это не
            запрещено. Можно подавать милостыню в его память, помогать
            нуждающимся, поминать добрым словом, заботиться о тех, кто остался
            рядом. Для таких случаев в церковной традиции есть особая келейная
            молитва, которую читают дома, а не в храме.
          </p>

          <p>
            <span className="font-semibold text-[#D4AF37]">
              Поговорите со священником.
            </span>{' '}
            Каждая судьба и каждая ситуация разные. Если у вас есть возможность,
            поговорите со священником: он может подсказать, как вам молиться
            именно в вашем случае.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          <Link
            href="/traditions"
            className="block w-full py-3 px-6 rounded-xl border border-white/20 text-white/70 font-medium text-center hover:bg-white/5 transition-colors"
          >
            Назад к традициям
          </Link>
          <Link
            href="/"
            className="block w-full py-3 px-6 rounded-xl border border-white/20 text-white/70 font-medium text-center hover:bg-white/5 transition-colors"
          >
            На главную
          </Link>
        </div>
      </div>
    </div>
  )
}