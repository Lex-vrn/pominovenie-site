'use client'

import { useEffect, useState } from 'react'

interface Order {
  id: number
  type: string
  names: string
  contact: string | null
  preferred_date: string | null
  source: string
  paid: boolean
  viewed: boolean
  created_at: string
}

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    const res = await fetch('/api/admin/orders')
    if (res.ok) {
      const data = await res.json()
      setOrders(data.orders)
    }
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const togglePaid = async (order: Order) => {
    await fetch(`/api/admin/orders/${order.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paid: !order.paid }),
    })
    load()
  }

  const markViewed = async (order: Order) => {
    if (order.viewed) return
    await fetch(`/api/admin/orders/${order.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ viewed: true }),
    })
    load()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#2C1810] to-[#1a0f0a] text-white flex items-center justify-center">
        Загрузка...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2C1810] to-[#1a0f0a] text-white px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-[#D4AF37] mb-8 text-center">
          Записки — админ-панель
        </h1>

        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              onClick={() => markViewed(order)}
              className={`p-4 rounded-xl border cursor-pointer transition-colors ${
                order.viewed
                  ? 'bg-white/5 border-white/10'
                  : 'bg-[#D4AF37]/10 border-[#D4AF37]/50'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p
                    className={`font-semibold ${
                      order.paid ? 'text-green-400' : 'text-blue-400'
                    }`}
                  >
                    {order.names}
                    {!order.viewed && (
                      <span className="text-[#D4AF37] text-xs ml-2">● новое</span>
                    )}
                  </p>
                  <p className="text-sm text-white/60">{order.type}</p>
                  {order.preferred_date && (
                    <p className="text-sm text-white/60">
                      Дата: {order.preferred_date}
                    </p>
                  )}
                  {order.contact && (
                    <p className="text-sm text-white/60">Контакт: {order.contact}</p>
                  )}
                  <p className="text-xs text-white/40 mt-1">
                    Подано: {new Date(order.created_at).toLocaleString('ru-RU')}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    togglePaid(order)
                  }}
                  className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium ${
                    order.paid
                      ? 'bg-green-600/80 text-white'
                      : 'bg-blue-600/80 text-white'
                  }`}
                >
                  {order.paid ? '✓ Оплачено' : 'Не оплачено'}
                </button>
              </div>
            </div>
          ))}

          {orders.length === 0 && (
            <p className="text-center text-white/60">Записок пока нет</p>
          )}
        </div>
      </div>
    </div>
  )
}