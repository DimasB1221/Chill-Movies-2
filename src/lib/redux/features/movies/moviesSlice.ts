import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "@/src/lib/types/movie";
import { useGetMovies } from "@/src/hooks/movies/useGetMovies";
interface MoviesState {
  movies: Movie[];
}

const initialState: MoviesState = {
  movies: [],
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
    },
  },
});

export const { setMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
