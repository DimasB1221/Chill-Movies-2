"use client";
import React from "react";
import Image from "next/image";
import { Play, Plus, Volume2, Info } from "lucide-react";
import { Button } from "@/src/components/ui/button";

import movieLoader from "@/src/lib/utils/movieLoader";
import { Skeleton } from "@/src/components/ui/skeleton";

export const HeroSkeleton = () => {
  return (
    <div className="relative h-[70vh] md:h-[85vh] w-full shrink-0 snap-center overflow-hidden bg-zinc-900">
      {/* Background Skeleton */}
      <div className="absolute inset-0">
        <Skeleton className="h-full w-full bg-zinc-800" />
      </div>

      {/* Content Skeleton */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl space-y-4 md:space-y-6">
            {/* Title Skeleton */}
            <Skeleton className="h-12 sm:h-16 md:h-20 w-3/4 rounded-lg bg-zinc-700" />

            {/* Meta info Skeleton */}
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-16 rounded-md bg-zinc-700" />
              <Skeleton className="h-6 w-12 rounded-md bg-zinc-700" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded-md bg-zinc-700" />
                <Skeleton className="h-6 w-16 rounded-md bg-zinc-700" />
              </div>
            </div>

            {/* Description Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-zinc-700" />
              <Skeleton className="h-4 w-5/6 bg-zinc-700" />
              <Skeleton className="h-4 w-4/6 bg-zinc-700" />
            </div>

            {/* Action buttons Skeleton */}
            <div className="flex flex-wrap gap-3 md:gap-4 pt-2">
              <Skeleton className="h-10 w-32 rounded-full bg-zinc-700" />
              <Skeleton className="h-10 w-40 rounded-full bg-zinc-700" />
              <Skeleton className="h-10 w-32 rounded-full bg-zinc-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
};

// Helper component for individual slides
export const HeroSlide = ({ movie }: { movie: any }) => {
  const imageSrc = movie.poster || "/placeholder-hero.jpg";

  return (
    <div className="relative h-[70vh] md:h-[85vh] w-full shrink-0 snap-center overflow-hidden bg-primary [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          loader={movieLoader}
          src={imageSrc}
          alt={movie.title}
          fill
          priority
          className="object-cover object-center "
          sizes="100vw"
        />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl space-y-4 md:space-y-6">
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl">
              {movie.title}
            </h1>

            {/* Meta info */}
            <div className="flex items-center gap-4 text-sm md:text-base">
              {movie.rating && (
                <div className="flex items-center gap-1 text-yellow-400 font-semibold">
                  <span>⭐</span>
                  <span>{movie.rating}</span>
                </div>
              )}
              {movie.year && (
                <span className="text-gray-300">{movie.year}</span>
              )}
              {movie.genres && (
                <div className="flex gap-2">
                  {movie.genres.slice(0, 3).map((g: string) => (
                    <span
                      key={g}
                      className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded text-white text-xs"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-200 text-sm md:text-base lg:text-lg max-w-xl line-clamp-3 md:line-clamp-4 drop-shadow-lg">
              {movie.description || "No description available for this movie."}
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 md:gap-4 pt-2">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90 font-semibold gap-2"
              >
                <Play className="w-5 h-5 fill-black" />
                Mulai
              </Button>

              <Button size="lg" variant="primary" className="gap-2">
                <Info className="w-5 h-5" />
                Selengkapnya
              </Button>

              <Button size="lg" variant="primary" className="gap-2">
                <Plus className="w-5 h-5" />
                Wishlist
              </Button>

              <button className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white/30 hover:border-white/60 flex items-center justify-center text-white transition-colors">
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
};

// Hero section component - Presentational Container
export function HeroSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Scroll Snap Container */}
      <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
        {children}
      </div>
    </section>
  );
}
