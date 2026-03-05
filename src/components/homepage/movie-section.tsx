"use client";
import movieLoader from "@/src/lib/utils/movieLoader";
import { Movie } from "@/src/lib/types/movie";
import Image from "next/image";
import { Play } from "lucide-react";

// Movie card component - Single Responsibility
export function MovieCard({ movie }: { movie: Movie }) {
  // Fallback to imageUrl if poster is missing (though poster should be main)
  const imageSrc = movie.poster || "/placeholder-movie.jpg";

  return (
    <div className="group relative flex-shrink-0 w-[150px] sm:w-[180px] md:w-[200px] py-2">
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800 cursor-pointer transition-transform hover:scale-102 rounded-lg">
        <Image
          loader={movieLoader}
          src={imageSrc}
          alt={movie.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 150px, (max-width: 768px) 180px, 200px rounded-lg"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors">
            <Play className="w-6 h-6 text-white fill-white" />
          </button>
        </div>

        {/* Rating badge */}
        {movie.rating && (
          <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-yellow-400">
            ⭐ {movie.rating}
          </div>
        )}
      </div>

      <h3 className="mt-2 text-white text-sm font-medium line-clamp-1">
        {movie.title}
      </h3>
      {movie.release_date && (
        <p className="text-gray-400 text-xs">{movie.release_date}</p>
      )}
    </div>
  );
}

// Movie section container (Presentational)
export function MovieSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8 md:mb-12 responsive-width mx-auto px-2">
      <div className="">
        <h2 className="text-white text-xl md:text-2xl font-bold mb-4">
          {title}
        </h2>

        <div className="overflow-x-auto scrollbar-hide  -mx-4 sm:-mx-0">
          <div className="flex gap-4 pb-4 ">{children}</div>
        </div>
      </div>
    </section>
  );
}
