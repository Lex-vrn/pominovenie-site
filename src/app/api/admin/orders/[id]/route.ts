import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await req.json()

  const updates: Record<string, boolean> = {}
  if (typeof body.paid === 'boolean') updates.paid = body.paid
  if (typeof body.viewed === 'boolean') updates.viewed = body.viewed

  const { error } = await supabaseAdmin
    .from('orders')
    .update(updates)
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}