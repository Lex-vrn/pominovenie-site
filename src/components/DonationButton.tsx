'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function DonationButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="block w-full py-4 px-6 rounded-xl border-2 border-[#D4AF37] text-[#D4AF37] font-medium text-lg text-center hover:bg-[#D4AF37]/10 transition-colors"
      >
        🙏 Поддержать приход
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center px-4 z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-[#2C1810] border border-[#D4AF37]/40 rounded-2xl p-6 max-w-xs w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-[#D4AF37] mb-3">
              Пожертвование приходу
            </h2>
            <p className="text-sm text-white/70 mb-4">
              Сумма — по желанию. Отсканируйте QR-код камерой телефона или банковским приложением.
            </p>
            <div className="bg-white rounded-xl p-3 mb-4">
              <Image
                src="/donation-qr.png"
                alt="QR-код для пожертвования приходу"
                width={280}
                height={280}
                className="w-full h-auto"
              />
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/60 text-sm underline"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </>
  )
}