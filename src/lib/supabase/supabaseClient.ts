"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

// ini dibuat untuk memberi tahu supabase bahwa jika tidak ada tabel nya
// kosongkan saja daripada diberi nilai ull atau any karna ini untuk membedakan koneksi dan var
type SupabaseSchema = Record<string, never>;

// ini digunakan untuk memberi tahu ts agar client di isi oleh supabase client dan boleh juga bernilai null
let client: SupabaseClient<SupabaseSchema> | null = null;

export function getSupabaseBroswerClient(): SupabaseClient<SupabaseSchema> {
  if (client) {
    return client;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL atau Anon Key belum disetting di .env");
  }

  // client diisi oleh supabase client
  client = createBrowserClient<SupabaseSchema>(supabaseUrl, supabaseAnonKey);
  return client;
}
