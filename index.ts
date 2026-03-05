import seedMovies from "./src/lib/seeders/movieSeeder";
import seedGenre from "@/src/lib/seeders/genreSeeder";

(async () => {
  await seedGenre();
  await seedMovies();
  process.exit(0);
})();
