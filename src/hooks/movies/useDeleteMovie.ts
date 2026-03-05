import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMovie } from "@/src/services/movies/moviesServices";

export const useDeleteMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });
};
