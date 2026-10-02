'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import DonationButton from '@/components/DonationButton'

type Status = 'idle' | 'saving' | 'success' | 'error'

interface OrderFormProps {
  orderType: string
  recurring?: boolean
}

export default function OrderForm({ orderType, recurring = false }: OrderFormProps) {
  const [names, setNames] = useState('')
  const [preferredDate, setPreferredDate] = useState('')
  const [contact, setContact] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async () => {
    if (!names) {
      setStatus('error')
      return
    }

    setStatus('saving')

    const { error } = await supabase.from('orders').insert({
      type: orderType,
      names: names,
      contact: contact || null,
      preferred_date: preferredDate || null,
      source: 'site',
    })

    if (error) {
      console.error('Ошибка сохранения записки:', error)
      setStatus('error')
      return
    }

    setStatus('success')
    setNames('')
    setPreferredDate('')
    setContact('')
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#2C1810] to-[#1a0f0a] text-white flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-[#D4AF37] mb-4">Записка принята</h1>
          <p className="text-white/80 mb-8">
            Это бесплатно — спасибо, что доверили нам молитву о ваших близких.
          </p>
          <Link
            href="/"
            className="block w-full py-4 px-6 rounded-xl bg-[#8C2F2F] text-white font-medium text-lg text-center hover:bg-[#A63939] transition-colors shadow-lg"
          >
            На главную
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2C1810] to-[#1a0f0a] text-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-[#D4AF37] mb-2 text-center">
          {orderType}
        </h1>
        <p className="text-sm text-gray-400 mb-8 text-center">
          Это бесплатно. Пожертвование — по желанию, кнопка ниже.
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">
              Имя (или имена через запятую)
            </label>
            <input
              type="text"
              value={names}
              onChange={(e) => setNames(e.target.value)}
              placeholder="Например: Иоанна, Марии"
              className="w-full py-3 px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">
              {recurring ? 'Дата начала' : 'Желаемая дата (необязательно)'}
            </label>
            <input
              type="date"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              className="w-full py-3 px-4 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Контакт (необязательно)</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Email или телефон"
              className="w-full py-3 px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <p className="text-gray-300 mb-2">Пожертвование (по желанию)</p>
            <DonationButton />
          </div>

          <button
            onClick={handleSubmit}
            disabled={status === 'saving'}
            className="block w-full py-4 px-6 rounded-xl bg-[#8C2F2F] text-white font-medium text-lg text-center hover:bg-[#A63939] transition-colors shadow-lg disabled:opacity-50"
          >
            {status === 'saving' ? 'Отправка...' : 'Подать записку'}
          </button>

          {status === 'error' && (
            <p className="text-red-400 text-center">
              Ошибка — проверьте, что имя заполнено, и попробуйте ещё раз
            </p>
          )}

          <Link
            href="/order"
            className="block w-full py-3 px-6 rounded-xl border border-white/20 text-white/70 font-medium text-center hover:bg-white/5 transition-colors"
          >
            Назад к выбору вида
          </Link>
        </div>
      </div>
    </div>
  )
}