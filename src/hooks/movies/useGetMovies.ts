import { useQuery } from "@tanstack/react-query";
import { getMovies } from "@/src/services/movies/moviesServices";

export const useGetMovies = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["movies", page, limit],
    queryFn: () => getMovies(page, limit),
  });
};
