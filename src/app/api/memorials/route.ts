import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

function isValidDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const d = new Date(value + 'T00:00:00Z')
  if (Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== value) return false
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
  return value >= '1900-01-01' && value <= tomorrow
}

function cleanText(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  if (!trimmed || trimmed.length > maxLength) return null
  return trimmed
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Неверный запрос' }, { status: 400 })
  }

  const name = cleanText(body.name, 200)
  if (!name) {
    return NextResponse.json({ error: 'Укажите имя' }, { status: 400 })
  }
  if (!isValidDate(body.death_date)) {
    return NextResponse.json({ error: 'Укажите дату' }, { status: 400 })
  }

  const contact = cleanText(body.contact, 200)
  const pushSubscriberId = cleanText(body.push_subscriber_id, 200)
  const token = randomUUID()

  const { data, error } = await supabaseAdmin
    .from('memorials')
    .insert({
      name,
      death_date: body.death_date,
      contact,
      push_subscriber_id: pushSubscriberId,
      owner_token: token,
    })
    .select('id')
    .single()

  if (error || !data) {
    console.error('Ошибка сохранения даты:', error)
    return NextResponse.json({ error: 'Не удалось сохранить' }, { status: 500 })
  }

  return NextResponse.json({ id: data.id, token })
}