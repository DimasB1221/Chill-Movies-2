import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/src/lib/supabase/supabaseServer";

// Single Responsibility: file ini hanya handle genres endpoint
export async function GET() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("genres")
    .select("id, name")
    .order("name", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, {
    headers: {
      "Cache-Control":
        "public, max-age=300, s-maxage=600, stale-while-revalidate=900",
    },
  });
}
