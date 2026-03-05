import { tmdbAxios } from "@/src/lib/tmdbAxios/tmdb";

export const tmdbService = {
  getPopularMovies: async (page = 1) => {
    const { data } = await tmdbAxios.get("/movie/popular", {
      params: { page },
    });

    console.log(data.results);
    return data.results;
  },
};
