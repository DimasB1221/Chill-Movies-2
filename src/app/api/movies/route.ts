import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/src/lib/supabase/supabaseServer";

export async function GET(req: Request) {
  const supabase = await createSupabaseServerClient();
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error } = await supabase
    .from("movies")
    .select(
      `
      id,
      title,
      poster,
      rating,
      movie_genres(
        genre_id,
        genres(name)
      )
    `,
    )
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const formatted = data.map((movie: any) => ({
    id: movie.id,
    title: movie.title,
    poster: movie.poster,
    rating: movie.rating,
    genres: movie.movie_genres.map((g: any) => g.genres.name),
    genre_ids: movie.movie_genres.map((g: any) => g.genre_id),
  }));

  // Tidak menggunakan HTTP cache agar TanStack Query selalu mendapat data fresh saat invalidateQueries
  // Caching sudah dikelola oleh TanStack Query di client (staleTime: 60000)
  return NextResponse.json(formatted, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();
  const body = await req.json();

  const { title, poster, rating, tmdb_id, genre_ids } = body;

  // Generate random tmdb_id karna isi tmdb_id di supabase tidak boleh null
  const generatedTmdbId =
    tmdb_id || Math.floor(Math.random() * 1000000) + 1000000;

  const { data, error } = await supabase
    .from("movies")
    .insert([{ title, poster, rating, tmdb_id: generatedTmdbId }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Insert ke movie_genres junction table agar genre terhubung dengan movie
  if (genre_ids && genre_ids.length > 0) {
    const movieGenresPayload = genre_ids.map((genre_id: string) => ({
      movie_id: data.id,
      genre_id,
    }));

    const { error: genreError } = await supabase
      .from("movie_genres")
      .insert(movieGenresPayload);

    if (genreError) {
      console.error("Failed to link genres:", genreError.message);
    }
  }

  return NextResponse.json(data);
}

export async function PATCH(req: Request) {
  const supabase = await createSupabaseServerClient();
  const body = await req.json();
  const { id, title, poster, rating, genre_ids } = body;

  const { data, error } = await supabase
    .from("movies")
    .update({ title, poster, rating })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Sync movie_genres: hapus yang lama, insert yang baru
  if (genre_ids !== undefined) {
    // 1. Delete existing movie_genres untuk movie ini
    await supabase.from("movie_genres").delete().eq("movie_id", id);

    // 2. Insert genre baru yang dipilih
    if (genre_ids.length > 0) {
      const movieGenresPayload = genre_ids.map((genre_id: string) => ({
        movie_id: id,
        genre_id,
      }));

      const { error: genreError } = await supabase
        .from("movie_genres")
        .insert(movieGenresPayload);

      if (genreError) {
        console.error("Failed to sync genres:", genreError.message);
      }
    }
  }

  return NextResponse.json(data);
}

export async function DELETE(req: Request) {
  const supabase = await createSupabaseServerClient();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  const { error } = await supabase.from("movies").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Deleted" });
}
