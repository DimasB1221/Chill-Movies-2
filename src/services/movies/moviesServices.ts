import api from "@/src/lib/api";
import { Movie } from "@/src/lib/types/movie";

type CreateMovieParams = {
  title: string;
  poster: string;
  rating: number;
  genre_ids?: string[];
};

type UpdateMovieParams = {
  id: string;
  title?: string;
  poster?: string;
  rating?: number;
  genre_ids?: string[];
};

export const getMovies = async (
  page: number = 1,
  limit: number = 10,
): Promise<Movie[]> => {
  // We override baseURL to point to our local Next.js API route instead of Supabase directly
  // This allows us to use the formatting logic defined in src/api/movies/route.ts
  const response = await api.get("/movies", {
    // ini digunakan untuk memberi tahu axios agar menggunakan api route yang ada di nextjs agar tidak langsung direct ke supabase
    // file : api/route.ts
    baseURL: "/api",
    params: {
      page,
      limit,
    },
  });
  return response.data;
};

export const createMovie = async (
  params: CreateMovieParams,
): Promise<Movie> => {
  const response = await api.post("/movies", params, {
    baseURL: "/api",
  });
  return response.data;
};

export const updateMovie = async (
  params: UpdateMovieParams,
): Promise<Movie> => {
  const response = await api.patch("/movies", params, {
    baseURL: "/api",
  });
  return response.data;
};

export const deleteMovie = async (id: string): Promise<void> => {
  await api.delete("/movies", {
    baseURL: "/api",
    params: { id },
  });
};
