// Genre data type following Interface Segregation Principle
export interface Genre {
  id: string;
  tmdb_id?: number;
  name: string;
}
