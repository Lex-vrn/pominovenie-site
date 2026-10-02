'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function AdminBell() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false

    const check = async () => {
      try {
        const res = await fetch('/api/admin/unread-count')
        if (!res.ok) {
          if (!cancelled) setCount(null)
          return
        }
        const data = await res.json()
        if (!cancelled) setCount(data.count)
      } catch {
        if (!cancelled) setCount(null)
      }
    }

    check()
    const interval = setInterval(check, 30000)
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [])

  if (count === null) return null

  return (
    <Link
      href="/admin"
      className="fixed top-3 right-3 z-40"
      title="Админ-панель"
    >
      <div className="relative">
        <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-lg">
          ✉️
        </div>
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#8C2F2F] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {count > 9 ? '9+' : count}
          </span>
        )}
      </div>
    </Link>
  )
}