'use client'

import { useEffect } from 'react'
import OneSignal from 'react-onesignal'

// Флаг вне компонента — чтобы OneSignal.init() не вызывался повторно
// при перерисовках/переходах между страницами (иначе SDK ругается
// на повторную инициализацию).
let initialized = false

export default function OneSignalInit() {
  useEffect(() => {
    if (initialized) return
    initialized = true

    OneSignal.init({
      appId: 'ebbeaa31-1450-4282-a99f-a20bd8c4ff70', // тот же ID, что в supabase/functions/.../index.ts
    })
  }, [])

  // Компонент ничего не рисует — только запускает инициализацию
  return null
}