import OneSignal from 'react-onesignal'

let initialized = false

export async function initOneSignal() {
  if (initialized) return
  initialized = true

  await OneSignal.init({
    appId: 'ebbeaa31-1450-4282-a99f-a20bd8c4ff70',
    allowLocalhostAsSecureOrigin: true,
  })
}