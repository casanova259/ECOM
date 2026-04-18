// ─── Supabase Client ──────────────────────────────────────────────────────────
// Install: pnpm add @supabase/supabase-js
//
// Add to .env.local:
//   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
//   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
//   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key  ← admin panel only, keep secret

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Browser client — for client components (read only, respects RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server/admin client — bypasses RLS, use in Server Actions and API routes ONLY
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});
