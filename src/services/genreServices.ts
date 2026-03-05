import { tmdbAxios } from "@/src/lib/tmdbAxios/tmdb";

const fetchTmdbGenres = async () => {
  const res = await tmdbAxios.get("/genre/movie/list");
  return res.data.genres;
};

export default fetchTmdbGenres;
