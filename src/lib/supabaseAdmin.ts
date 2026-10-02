import { createClient } from '@supabase/supabase-js'

// Этот клиент использует service_role key — видит ВСЕ строки, игнорируя RLS.
// Используется только на сервере (в API routes), никогда не импортируется
// в клиентский компонент — иначе ключ попадёт в браузер.
export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)