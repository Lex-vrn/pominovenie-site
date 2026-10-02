'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    setError('')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/admin')
    } else {
      setError('Неверный пароль')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2C1810] to-[#1a0f0a] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-[#D4AF37] mb-8 text-center">
          Вход для администратора
        </h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          placeholder="Пароль"
          className="w-full py-3 px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] mb-4"
        />
        <button
          onClick={handleLogin}
          className="block w-full py-3 px-6 rounded-xl bg-[#8C2F2F] text-white font-medium text-center hover:bg-[#A63939] transition-colors"
        >
          Войти
        </button>
        {error && <p className="text-red-400 text-center mt-4">{error}</p>}
      </div>
    </div>
  )
}