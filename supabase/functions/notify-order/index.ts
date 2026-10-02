async function sendTelegramMessage(text: string) {
  const token = Deno.env.get('TELEGRAM_BOT_TOKEN')!
  const chatId = Deno.env.get('TELEGRAM_CHAT_ID')!

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
    }),
  })

  return response.json()
}

Deno.serve(async (req: Request) => {
  const cronSecret = Deno.env.get('CRON_SECRET')
  const providedSecret = req.headers.get('x-cron-secret')

  if (!cronSecret || providedSecret !== cronSecret) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const payload = await req.json()
  const record = payload.record

  if (!record) {
    return new Response(JSON.stringify({ error: 'No record in payload' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const lines = [
    '🕯 <b>Новая записка</b>',
    `Вид: ${record.type}`,
    `Имена: ${record.names}`,
  ]
  if (record.preferred_date) lines.push(`Желаемая дата: ${record.preferred_date}`)
  if (record.contact) lines.push(`Контакт: ${record.contact}`)

  const result = await sendTelegramMessage(lines.join('\n'))

  return new Response(JSON.stringify({ sent: true, result }), {
    headers: { 'Content-Type': 'application/json' },
  })
})