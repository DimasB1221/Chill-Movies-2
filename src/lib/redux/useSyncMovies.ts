import { useEffect } from "react";
import { useGetMovies } from "@/src/hooks/movies/useGetMovies";
import { useAppDispatch, useAppSelector } from "@/src/lib/redux/hooks";
import { setMovies } from "@/src/lib/redux/features/movies/moviesSlice";

// ini yang diminta dari tugas ambil data store ke redux

export function useSyncMovies(page: number = 1, limit: number = 10) {
  const { data: moviesResponse, isLoading, error } = useGetMovies(page, limit);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (moviesResponse) {
      dispatch(setMovies(moviesResponse));
    }
  }, [moviesResponse, dispatch]);

  // Optionally return Redux state for convenience
  const moviesRedux = useAppSelector((state) => state.movies.movies);

  return {
    movies: moviesRedux,
    isLoading,
    error,
  };
}
