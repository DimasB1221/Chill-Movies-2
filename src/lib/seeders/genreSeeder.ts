import fetchTmdbGenres from "@/src/services/genreServices";
import { createSupabaseServerClient } from "@/src/lib/supabase/supabaseServer";

const seedGenres = async () => {
  const supabase = await createSupabaseServerClient();
  const genres = await fetchTmdbGenres();

  const payload = genres.map((g: any) => ({
    tmdb_id: g.id,
    name: g.name,
  }));

  const { error } = await supabase
    .from("genres")
    .upsert(payload, { onConflict: "tmdb_id" });

  if (error) throw error;

  console.log("✅ Genres seeded:", payload.length);
};

export default seedGenres;
