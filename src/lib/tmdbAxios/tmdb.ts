// src/lib/axios/tmdb.ts
import axios from "axios";

export const tmdbAxios = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.TMDB_API_KEY,
    language: "en-US",
  },
});
