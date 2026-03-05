"use client";

import Nav from "@/src/components/global/nav";
import Footer from "@/src/components/global/footer";
import {
  HeroSection,
  HeroSlide,
  HeroSkeleton,
} from "@/src/components/homepage/hero-section";
import {
  MovieSection,
  MovieCard,
} from "@/src/components/homepage/movie-section";
import { useGetMovies } from "@/src/hooks/movies/useGetMovies";

export default function Home() {
  const { data: movies, isLoading, error } = useGetMovies(1, 10);

  // Filter movies for hero section (top 5)
  const heroMovies = movies?.slice(0, 5) || [];

  return (
    <>
      <header>
        <Nav />
      </header>

      <main className="min-h-screen  bg-primary overflow-x-hidden">
        <HeroSection>
          {isLoading && <HeroSkeleton />}
          {error && (
            <div className="h-[70vh] md:h-[85vh] w-full flex items-center justify-center text-red-500">
              Gagal memuat film.
            </div>
          )}
          {heroMovies.map((movie) => (
            <HeroSlide key={movie.id} movie={movie} />
          ))}
        </HeroSection>

        <div className="space-y-8 md:space-y-12 pb-8 mt-10">
          <MovieSection title="Film Terbaru">
            {isLoading && (
              <div className="flex gap-4 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-[150px] sm:w-[180px] md:w-[200px] flex-shrink-0"
                  >
                    <div className="aspect-[2/3] bg-gray-800 rounded-lg animate-pulse" />
                  </div>
                ))}
              </div>
            )}
            {movies?.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </MovieSection>

          <MovieSection title="Rekomendasi Untukmu">
            {/* Using same data for demo, normally would be different fetch */}
            {movies
              ?.slice()
              .reverse()
              .map((movie) => (
                <MovieCard key={`rec-${movie.id}`} movie={movie} />
              ))}
          </MovieSection>
        </div>
      </main>

      <footer className="bg-primary">
        <Footer />
      </footer>
    </>
  );
}
