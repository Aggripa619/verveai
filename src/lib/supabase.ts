import { createClient, SupabaseClient } from '@supabase/supabase-js'

let _client: SupabaseClient | null = null
let _adminClient: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (!_client) {
    const url = process.env.SUPABASE_URL
    const key = process.env.SUPABASE_ANON_KEY
    if (!url || !key) throw new Error('SUPABASE_URL and SUPABASE_ANON_KEY must be set')
    _client = createClient(url, key)
  }
  return _client
}

// Server-only client using the service role key — bypasses RLS. Only use
// from trusted server contexts (cron routes, the unsubscribe route, the
// email_sends log write) that aren't just relaying a public form submission.
export function getSupabaseAdmin(): SupabaseClient {
  if (!_adminClient) {
    const url = process.env.SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set')
    _adminClient = createClient(url, key, { auth: { persistSession: false } })
  }
  return _adminClient
}
