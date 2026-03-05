// Movie data types following Interface Segregation Principle
export interface Movie {
  id: string;
  tmdb_id?: number;
  title: string;
  overview?: string;
  poster?: string;
  backdrop?: string;
  rating?: number;
  release_date?: string;
  genres?: string[];
  genre_ids?: string[];
}

export interface MovieSection {
  id: string;
  title: string;
  movies: Movie[];
}

export interface HeroMovie extends Movie {
  description: string;
  backgroundUrl: string;
}
