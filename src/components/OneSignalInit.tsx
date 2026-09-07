'use client'

import { useEffect } from 'react'
import { initOneSignal } from '@/lib/onesignal'

export default function OneSignalInit() {
  useEffect(() => {
    initOneSignal()
  }, [])

  return null
}