import { createClient } from 'jsr:@supabase/supabase-js@2'

const PRAYERS: Record<string, { title: string; text: string }> = {
  '3-й день': {
    title: 'Молитва на 3-й день',
    text: 'Помяни, Господи, душу новопреставленного раба Твоего (имя), и прости ему вся согрешения, вольная и невольная, и даруй ему Царствие Небесное.',
  },
  '9-й день': {
    title: 'Молитва на 9-й день',
    text: 'Помяни, Господи, душу новопреставленного раба Твоего (имя), и прости ему вся согрешения, вольная и невольная, и даруй ему Царствие Небесное.',
  },
  '40-й день': {
    title: 'Молитва на 40-й день',
    text: 'Помяни, Господи, душу раба Твоего (имя), и прости ему вся согрешения, вольная и невольная, и даруй ему Царствие Небесное.',
  },
  'Годовщина': {
    title: 'Молитва в годовщину',
    text: 'Помяни, Господи, душу раба Твоего (имя), и прости ему вся согрешения, вольная и невольная, и даруй ему Царствие Небесное. Вечная память.',
  },
}

const ONESIGNAL_APP_ID = 'ebbeaa31-1450-4282-a99f-a20bd8c4ff70'

async function sendPush(subscriberId: string, title: string, text: string) {
  const apiKey = Deno.env.get('ONESIGNAL_API_KEY')!

  const response = await fetch('https://api.onesignal.com/notifications', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Key ${apiKey}`,
    },
    body: JSON.stringify({
      app_id: ONESIGNAL_APP_ID,
      include_subscription_ids: [subscriberId],
      headings: { en: title, ru: title },
      contents: { en: text, ru: text },
      url: `https://pominovenie-site.vercel.app/notification?title=${encodeURIComponent(title)}&text=${encodeURIComponent(text)}`,
    }),
  })

  const result = await response.json()
  return { status: response.status, result }
}

Deno.serve(async (req: Request) => {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  const { data: memorials, error } = await supabase
    .from('memorials')
    .select('*')

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const results: any[] = []

  for (const memorial of memorials || []) {
    const deathDate = new Date(memorial.death_date + 'T00:00:00')

    const addDays = (date: Date, days: number): Date => {
      const result = new Date(date)
      result.setDate(result.getDate() + days - 1)
      return result
    }

    const addYears = (date: Date, years: number): Date => {
      const result = new Date(date)
      result.setFullYear(result.getFullYear() + years)
      return result
    }

    const checkDates = [
      { label: '3-й день', date: addDays(deathDate, 3) },
      { label: '9-й день', date: addDays(deathDate, 9) },
      { label: '40-й день', date: addDays(deathDate, 40) },
      { label: 'Годовщина', date: addYears(deathDate, 1) },
    ]

    for (const check of checkDates) {
      check.date.setHours(0, 0, 0, 0)
      if (check.date.getTime() === today.getTime()) {
        const prayer = PRAYERS[check.label]
        const personalizedText = prayer.text.replace('(имя)', memorial.name)

        if (memorial.push_subscriber_id) {
          const sendResult = await sendPush(
            memorial.push_subscriber_id,
            prayer.title,
            personalizedText
          )
          results.push({
            name: memorial.name,
            label: check.label,
            sendResult,
          })
        } else {
          results.push({
            name: memorial.name,
            label: check.label,
            sendResult: 'нет push_subscriber_id, пропущено',
          })
        }
      }
    }
  }

  return new Response(
    JSON.stringify({ found: results.length, results }),
    { headers: { 'Content-Type': 'application/json' } }
  )
})