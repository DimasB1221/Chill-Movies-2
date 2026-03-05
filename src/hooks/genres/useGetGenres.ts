import { useQuery } from "@tanstack/react-query";
import { getGenres } from "@/src/services/genres/genreServices";

// Dependency Inversion: component depend on hook (abstraction), bukan langsung ke service
export const useGetGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
    staleTime: 5 * 60 * 1000, // 5 menit — genre jarang berubah
  });
};
