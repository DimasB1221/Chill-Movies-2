import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMovie } from "@/src/services/movies/moviesServices";

export const useUpdateMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });
};
