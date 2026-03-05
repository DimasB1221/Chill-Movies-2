# Dokumentasi: Flow Genre pada Movie

## Gambaran Umum

Fitur genre memungkinkan setiap movie terhubung dengan satu atau lebih genre melalui **junction table** `movie_genres`. Data genre awal di-seed dari TMDB API ke tabel `genres` di Supabase.

## Struktur Tabel (Supabase)

```
┌──────────────┐       ┌──────────────────┐       ┌──────────────┐
│   movies     │       │  movie_genres     │       │   genres     │
├──────────────┤       ├──────────────────┤       ├──────────────┤
│ id (PK)      │──┐    │ movie_id (FK)    │    ┌──│ id (PK)      │
│ tmdb_id      │  └───>│ genre_id (FK)    │<───┘  │ tmdb_id      │
│ title        │       └──────────────────┘       │ name         │
│ poster       │                                  └──────────────┘
│ rating       │
└──────────────┘
```

- **movies**: data film
- **genres**: daftar genre (Action, Comedy, Drama, dll)
- **movie_genres**: tabel penghubung (many-to-many)

## Arsitektur Layer

```
UI (MovieModal) → Hook (useGetGenres) → Service (genreServices) → API Route (/api/genres) → Supabase
```

| Layer         | File                                   | Tanggung Jawab                                |
| ------------- | -------------------------------------- | --------------------------------------------- |
| **Type**      | `src/lib/types/genre.ts`               | Definisi interface `Genre`                    |
| **API Route** | `src/app/api/genres/route.ts`          | Endpoint GET untuk ambil semua genre dari DB  |
| **Service**   | `src/services/genres/genreServices.ts` | Pemanggil API `/api/genres` via axios         |
| **Hook**      | `src/hooks/genres/useGetGenres.ts`     | TanStack Query hook untuk fetch & cache genre |
| **UI**        | `src/components/admin/MovieModal.tsx`  | Multi-select dropdown genre                   |

## Flow Detail

### 1. Menampilkan Genre di Form (GET)

```
MovieModal mount
    │
    ▼
useGetGenres() dipanggil
    │
    ▼
genreServices.getGenres() → GET /api/genres
    │
    ▼
Supabase query: SELECT id, name FROM genres ORDER BY name ASC
    │
    ▼
Return [{ id: "uuid-1", name: "Action" }, { id: "uuid-2", name: "Adventure" }, ...]
    │
    ▼
Dropdown multi-select menampilkan daftar genre
    │
    ▼
User memilih genre → disimpan sebagai genre_ids[] di state
```

### 2. Membuat Movie Baru (POST)

```
User klik "Save Movie"
    │
    ▼
Frontend kirim: { title, poster, rating, genre_ids: ["uuid-1", "uuid-3"] }
    │
    ▼
POST /api/movies
    │
    ├── Step 1: INSERT INTO movies (title, poster, rating, tmdb_id)
    │           → dapat movie.id
    │
    └── Step 2: INSERT INTO movie_genres
                → { movie_id: movie.id, genre_id: "uuid-1" }
                → { movie_id: movie.id, genre_id: "uuid-3" }
    │
    ▼
Movie berhasil dibuat dengan genre terhubung ✅
```

### 3. Edit Movie (PATCH)

```
User edit movie & ubah genre
    │
    ▼
Frontend kirim: { id, title, poster, rating, genre_ids: ["uuid-2", "uuid-5"] }
    │
    ▼
PATCH /api/movies
    │
    ├── Step 1: UPDATE movies SET title, poster, rating WHERE id = ...
    │
    ├── Step 2: DELETE FROM movie_genres WHERE movie_id = id
    │           (hapus relasi genre lama)
    │
    └── Step 3: INSERT INTO movie_genres
                → { movie_id: id, genre_id: "uuid-2" }
                → { movie_id: id, genre_id: "uuid-5" }
    │
    ▼
Genre movie berhasil di-update ✅
```

### 4. Menampilkan Genre di Tabel (GET Movies)

```
GET /api/movies
    │
    ▼
Supabase query:
    SELECT id, title, poster, rating,
           movie_genres(genre_id, genres(name))
    FROM movies
    │
    ▼
Format response:
    {
      id: "...",
      title: "Inception",
      genres: ["Action", "Sci-Fi"],       ← untuk ditampilkan di tabel
      genre_ids: ["uuid-1", "uuid-7"]     ← untuk pre-select saat edit
    }
```

## SOLID Principles yang Diterapkan

| Prinsip                   | Penerapan                                                                                   |
| ------------------------- | ------------------------------------------------------------------------------------------- |
| **Single Responsibility** | Setiap file punya satu tanggung jawab: type definisi, API handler, service, hook, atau UI   |
| **Open/Closed**           | Menambah fitur genre select tanpa mengubah seeder TMDB yang sudah ada                       |
| **Liskov Substitution**   | Interface `Genre` bisa digunakan di mana saja tanpa side-effect                             |
| **Interface Segregation** | Type `Genre` terpisah dari type `Movie`                                                     |
| **Dependency Inversion**  | UI → Hook → Service → API (setiap layer depend pada abstraksi, bukan implementasi langsung) |

## Catatan Penting

- **Genre di-seed dari TMDB** saat pertama kali setup (via `genreSeeder.ts`)
- **File `src/services/genreServices.ts`** (tanpa folder) adalah service lama untuk fetch genre dari TMDB API — masih dipakai oleh seeder dan **tidak diubah**
- **File `src/services/genres/genreServices.ts`** (dalam folder `genres/`) adalah service baru untuk fetch genre dari local DB
- **Cache**: genre di-cache oleh TanStack Query selama 5 menit (`staleTime: 300000`) karena data genre jarang berubah
