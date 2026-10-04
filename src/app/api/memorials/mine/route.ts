import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

interface Item {
  id: number
  token: string
}

function parseItems(value: unknown): Item[] {
  if (!Array.isArray(value)) return []
  const items: Item[] = []
  for (const entry of value.slice(0, 50)) {
    if (
      entry &&
      typeof entry === 'object' &&
      typeof (entry as Item).id === 'number' &&
      Number.isInteger((entry as Item).id) &&
      typeof (entry as Item).token === 'string' &&
      (entry as Item).token.length > 0 &&
      (entry as Item).token.length <= 100
    ) {
      items.push({ id: (entry as Item).id, token: (entry as Item).token })
    }
  }
  return items
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Неверный запрос' }, { status: 400 })
  }

  const items = parseItems(body.items)
  if (items.length === 0) {
    return NextResponse.json({ memorials: [] })
  }

  const { data, error } = await supabaseAdmin
    .from('memorials')
    .select('id, name, death_date, owner_token')
    .in('id', items.map((i) => i.id))
    .order('created_at', { ascending: false })

  if (error || !data) {
    console.error('Ошибка чтения дат:', error)
    return NextResponse.json({ error: 'Не удалось загрузить' }, { status: 500 })
  }

  const memorials = data
    .filter((row) => items.some((i) => i.id === row.id && i.token === row.owner_token))
    .map((row) => ({ id: row.id, name: row.name, death_date: row.death_date }))

  return NextResponse.json({ memorials })
}