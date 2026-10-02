import { createClient } from 'jsr:@supabase/supabase-js@2'

async function sendTelegramMessage(text: string) {
  const token = Deno.env.get('TELEGRAM_BOT_TOKEN')!
  const chatId = Deno.env.get('TELEGRAM_CHAT_ID')!

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
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

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const in3days = new Date(today)
  in3days.setDate(in3days.getDate() + 3)
  const targetDateStr = in3days.toISOString().split('T')[0]

  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .eq('preferred_date', targetDateStr)
    .eq('reminder_sent', false)

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const results: any[] = []

  for (const order of orders || []) {
    const text = [
      '⏰ <b>Через 3 дня — памятная дата</b>',
      `Вид: ${order.type}`,
      `Имена: ${order.names}`,
      `Дата: ${order.preferred_date}`,
      order.contact ? `Контакт: ${order.contact}` : null,
    ].filter(Boolean).join('\n')

    const sendResult = await sendTelegramMessage(text)
    results.push({ id: order.id, sendResult })

    await supabase.from('orders').update({ reminder_sent: true }).eq('id', order.id)
  }

  return new Response(JSON.stringify({ found: results.length, results }), {
    headers: { 'Content-Type': 'application/json' },
  })
})