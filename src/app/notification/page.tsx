'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function NotificationContent() {
  const searchParams = useSearchParams()
  const title = searchParams.get('title') || 'Молитва дня'
  const text = searchParams.get('text') || 'Помяни, Господи, душу усопшего раба Твоего, и прости ему вся согрешения, вольная и невольная, и даруй ему Царствие Небесное.'

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: text,
      })
    } else {
      navigator.clipboard.writeText(text)
      alert('Текст молитвы скопирован')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2C1810] to-[#1a0f0a] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-[#D4AF37] mb-6 text-center">
          {title}
        </h1>

        <div className="bg-white/10 border border-white/20 rounded-xl p-6 mb-8">
          <p className="text-lg leading-relaxed text-center">
            {text}
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleShare}
            className="block w-full py-4 px-6 rounded-xl bg-[#8C2F2F] text-white font-medium text-lg text-center hover:bg-[#A63939] transition-colors shadow-lg"
          >
            Переслать
          </button>

          <a href="/traditions" className="block w-full py-4 px-6 rounded-xl bg-[#4A5D23] text-white font-medium text-lg text-center hover:bg-[#5A6D33] transition-colors shadow-lg">
            Традиции
          </a>

          <a href="/order" className="block w-full py-4 px-6 rounded-xl bg-[#D4AF37] text-[#2C1810] font-medium text-lg text-center hover:bg-[#F4CF57] transition-colors shadow-lg">
            Заказать поминовение
          </a>
        </div>
      </div>
    </div>
  )
}

export default function NotificationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#2C1810]" />}>
      <NotificationContent />
    </Suspense>
  )
}