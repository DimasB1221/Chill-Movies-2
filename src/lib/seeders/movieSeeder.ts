import { createSupabaseServerClient } from "@/src/lib/supabase/supabaseServer";
import { tmdbService } from "@/src/services/tmdbServices";
import seedMovieGenres from "@/src/lib/seeders/movieGenreSeeder";

const seedMovies = async () => {
  console.log("🎬 Seeding movies...");
  const supabase = await createSupabaseServerClient();

  const movies = await tmdbService.getPopularMovies(1);

  for (const movie of movies) {
    // 1️⃣ upsert movie
    const { data, error } = await supabase
      .from("movies")
      .upsert(
        {
          tmdb_id: movie.id,
          title: movie.title,
          overview: movie.overview,
          poster: movie.poster_path,
          backdrop: movie.backdrop_path,
          rating: movie.vote_average,
          release_date: movie.release_date,
        },
        { onConflict: "tmdb_id" },
      )
      .select("id")
      .single();

    if (error || !data) {
      console.error("❌ Failed insert movie", movie.title);
      continue;
    }

    // 2️⃣ HUBUNGKAN MOVIE ↔ GENRE
    await seedMovieGenres(data.id, movie.genre_ids);
  }

  console.log("✅ Movies + genres linked");
};

export default seedMovies;
