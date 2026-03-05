import api from "@/src/lib/api";
import { Genre } from "@/src/lib/types/genre";

// Single Responsibility: hanya handle genre fetching dari local DB
// File genreServices.ts yang lama (TMDB) tetap tidak diubah karena masih dipakai seeder
export const getGenres = async (): Promise<Genre[]> => {
  const response = await api.get("/genres", {
    baseURL: "/api",
  });
  return response.data;
};
