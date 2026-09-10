import { createClient } from "@supabase/supabase-js";
// Browser-only data access: Supabase validates JWTs and RLS enforces ownership.
// No server routes or server-rendered private content rely on browser session data.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
export const supabase = url && key ? createClient(url, key) : null;
