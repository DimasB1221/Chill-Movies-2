import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMovie } from "@/src/services/movies/moviesServices";

export const useCreateMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });
};
