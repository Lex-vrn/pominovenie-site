'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import OneSignal from 'react-onesignal'
import { calculateMemorialDates, formatDate } from '@/lib/dates'

export default function AddDate() {
  const [name, setName] = useState('')
  const [deathDate, setDeathDate] = useState('')
  const [contact, setContact] = useState('')
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')

  const handleSave = async () => {
    if (!name || !deathDate) {
      setStatus('error')
      return
    }

    setStatus('saving')

    const pushSubscriberId = OneSignal.User.PushSubscription.id || null

    const { error } = await supabase.from('memorials').insert({
      name: name,
      death_date: deathDate,
      contact: contact,
      push_subscriber_id: pushSubscriberId,
    })

    if (error) {
      console.error('Ошибка сохранения:', error)
      setStatus('error')
    } else {
      setStatus('success')
      setName('')
      setDeathDate('')
      setContact('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2C1810] to-[#1a0f0a] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-[#D4AF37] mb-8 text-center">
          Добавить памятную дату
        </h1>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">
              Имя усопшего
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите имя"
              className="w-full py-3 px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">
              Дата смерти
            </label>
            <input
              type="date"
              value={deathDate}
              onChange={(e) => setDeathDate(e.target.value)}
              className="w-full py-3 px-4 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">
              Контакт (необязательно)
            </label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Email или телефон"
              className="w-full py-3 px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={status === 'saving'}
            className="block w-full py-4 px-6 rounded-xl bg-[#8C2F2F] text-white font-medium text-lg text-center hover:bg-[#A63939] transition-colors shadow-lg disabled:opacity-50"
          >
            {status === 'saving' ? 'Сохранение...' : 'Сохранить'}
          </button>

          {status === 'success' && (
            <p className="text-green-400 text-center">Дата сохранена!</p>
          )}
          {status === 'error' && (
            <p className="text-red-400 text-center">
              Ошибка — проверьте, что имя и дата заполнены
            </p>
          )}
        </div>
      </div>
    </div>
  )
}