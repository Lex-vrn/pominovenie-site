'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { calculateMemorialDates, formatDate } from '@/lib/dates'

interface Memorial {
  id: number
  name: string
  death_date: string
}

export default function MyDates() {
  const [memorials, setMemorials] = useState<Memorial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMemorials = async () => {
      const { data, error } = await supabase
        .from('memorials')
        .select('id, name, death_date')
        .order('created_at', { ascending: false })

      if (!error && data) {
        setMemorials(data)
      }
      setLoading(false)
    }

    fetchMemorials()
  }, [])

  const getNearestDate = (deathDate: string) => {
    const dates = calculateMemorialDates(deathDate)
    const now = new Date()
    const upcoming = dates.find((d) => d.date >= now)
    return upcoming ? `${upcoming.label} — ${formatDate(upcoming.date)}` : 'Все даты прошли'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2C1810] to-[#1a0f0a] text-white px-4 py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-[#D4AF37] mb-8 text-center">
          Мои даты
        </h1>

        {loading && (
          <p className="text-center text-gray-300">Загрузка...</p>
        )}

        {!loading && memorials.length === 0 && (
          <p className="text-center text-gray-300 mb-8">
            Пока нет сохранённых дат
          </p>
        )}

        <div className="space-y-4 mb-8">
          {memorials.map((memorial) => (
            <div
              key={memorial.id}
              className="p-5 rounded-xl bg-white/10 border border-white/20"
            >
              <p className="text-lg font-medium text-white mb-1">
                {memorial.name}
              </p>
              <p className="text-sm text-gray-400 mb-2">
                Дата смерти: {formatDate(new Date(memorial.death_date + 'T00:00:00'))}
              </p>
              <p className="text-[#D4AF37] font-medium">
                Ближайшая дата: {getNearestDate(memorial.death_date)}
              </p>
            </div>
          ))}
        </div>

        <Link
          href="/add"
          className="block w-full py-4 px-6 rounded-xl bg-[#8C2F2F] text-white font-medium text-lg text-center hover:bg-[#A63939] transition-colors shadow-lg"
        >
          Добавить ещё
        </Link>
      </div>
    </div>
  )
}