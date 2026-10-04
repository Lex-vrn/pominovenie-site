'use client'

import { useState } from 'react'
import Link from 'next/link'
import OneSignal from 'react-onesignal'

type Status = 'idle' | 'saving' | 'success' | 'success_no_push' | 'error'

interface SavedMemorial {
  id: number
  token: string
}

const STORAGE_KEY = 'my_memorials'
const PUSH_PERMISSION_TIMEOUT_MS = 30000
const PUSH_ID_TIMEOUT_MS = 8000

// Запоминаем на этом устройстве, какие записи создал именно этот человек,
// чтобы в «Мои даты» показывать только их, а не записи других людей.
// Вместе с номером хранится секретный код записи — без него сервер её не отдаст.
function saveMyMemorial(item: SavedMemorial) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const list: SavedMemorial[] = raw ? JSON.parse(raw) : []
    if (!list.some((m) => m.id === item.id)) list.push(item)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch (e) {
    console.error('Не удалось сохранить запись на устройстве:', e)
  }
}

// Ждёт результат, но не дольше заданного времени. При ошибке или зависании
// возвращает null — чтобы сбой OneSignal не блокировал сохранение даты.
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | null> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(null), ms)
    promise.then(
      (value) => {
        clearTimeout(timer)
        resolve(value)
      },
      () => {
        clearTimeout(timer)
        resolve(null)
      }
    )
  })
}

// OneSignal настроен на боевой адрес сайта и не работает на локальных адресах
function isLocalAddress(): boolean {
  return /^(localhost|127\.|192\.168\.|10\.)/.test(window.location.hostname)
}

// Ждём, пока OneSignal реально выдаст id подписки — он появляется не сразу
// после разрешения, а с задержкой в 1-3 секунды (та самая гонка состояний).
async function waitForPushSubscriptionId(timeoutMs = 8000): Promise<string | null> {
  const existing = OneSignal.User.PushSubscription.id
  if (existing) return existing

  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      OneSignal.User.PushSubscription.removeEventListener('change', handler)
      resolve(null)
    }, timeoutMs)

    function handler() {
      const id = OneSignal.User.PushSubscription.id
      if (id) {
        clearTimeout(timeout)
        OneSignal.User.PushSubscription.removeEventListener('change', handler)
        resolve(id)
      }
    }

    OneSignal.User.PushSubscription.addEventListener('change', handler)
  })
}

async function getPushSubscriberId(): Promise<string | null> {
  if (isLocalAddress()) return null

  try {
    await withTimeout(
      OneSignal.Notifications.requestPermission(),
      PUSH_PERMISSION_TIMEOUT_MS
    )
    return await waitForPushSubscriptionId(PUSH_ID_TIMEOUT_MS)
  } catch (e) {
    console.error('Ошибка OneSignal:', e)
    return null
  }
}

export default function AddDate() {
  const [name, setName] = useState('')
  const [deathDate, setDeathDate] = useState('')
  const [contact, setContact] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const handleSave = async () => {
    if (!name.trim() || !deathDate) {
      setStatus('error')
      return
    }

    setStatus('saving')

    try {
      const pushSubscriberId = await getPushSubscriberId()

      const res = await fetch('/api/memorials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          death_date: deathDate,
          contact: contact,
          push_subscriber_id: pushSubscriberId,
        }),
      })

      if (!res.ok) {
        console.error('Сервер не сохранил дату, статус:', res.status)
        setStatus('error')
        return
      }

      const data = await res.json()
      saveMyMemorial({ id: data.id, token: data.token })

      setStatus(pushSubscriberId ? 'success' : 'success_no_push')
      setName('')
      setDeathDate('')
      setContact('')
    } catch (e) {
      console.error('Ошибка сохранения:', e)
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2C1810] to-[#1a0f0a] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-[#D4AF37] mb-2 text-center">
          Добавить памятную дату
        </h1>
        <p className="text-gray-400 text-sm mb-8 text-center">
          Это бесплатно. Мы пришлём напоминания на 3, 9, 40 день и годовщину.
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">Имя усопшего</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите имя"
              className="w-full py-3 px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Дата смерти</label>
            <input
              type="date"
              value={deathDate}
              onChange={(e) => setDeathDate(e.target.value)}
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

          <button
            onClick={handleSave}
            disabled={status === 'saving'}
            className="block w-full py-4 px-6 rounded-xl bg-[#8C2F2F] text-white font-medium text-lg text-center hover:bg-[#A63939] transition-colors shadow-lg disabled:opacity-50"
          >
            {status === 'saving' ? 'Сохранение...' : 'Сохранить'}
          </button>

          {status === 'success' && (
            <p className="text-green-400 text-center">
              Дата сохранена! Уведомления подключены.
            </p>
          )}

          {status === 'success_no_push' && (
            <p className="text-yellow-400 text-center">
              Дата сохранена, но уведомления не подключились. Проверьте, что
              разрешили уведомления в браузере, и попробуйте сохранить ещё раз
              позже — данные не потеряются.
            </p>
          )}

          {status === 'error' && (
            <p className="text-red-400 text-center">
              Ошибка — проверьте, что имя и дата заполнены
            </p>
          )}

          {(status === 'success' || status === 'success_no_push') && (
            <Link
              href="/dates"
              className="block w-full py-3 px-6 rounded-xl border border-white/20 text-white/80 font-medium text-center hover:bg-white/5 transition-colors"
            >
              Посмотреть мои даты
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}