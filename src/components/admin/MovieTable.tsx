"use client";

import React, { useState } from "react";
import Image from "next/image";

import { Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Skeleton } from "@/src/components/ui/skeleton";
import { Movie } from "@/src/lib/types/movie";
import movieLoader from "@/src/lib/utils/movieLoader";

interface MovieTableProps {
  movies: Movie[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onEdit: (movie: Movie) => void;
  onDelete: (movie: Movie) => void;
  isLoading: boolean;
}

const MovieTable: React.FC<MovieTableProps> = ({
  movies,
  currentPage,
  totalPages,
  onPageChange,
  onEdit,
  onDelete,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="w-full bg-[#18181B] rounded-lg overflow-hidden border border-white/10">
        {/* Table Header */}
        <div className="grid grid-cols-[1fr_2fr_1.5fr_1fr_1fr] gap-4 p-4 text-xs font-bold text-white/50 uppercase tracking-wider bg-[#27272A] border-b border-white/10">
          <div>Cover</div>
          <div>Judul</div>
          <div>Genre</div>
          <div>Rating</div>
          <div className="text-right">Aksi</div>
        </div>

        {/* Skeleton Rows */}
        <div className="divide-y divide-white/5">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_2fr_1.5fr_1fr_1fr] gap-4 p-4 items-center"
            >
              {/* Cover Skeleton */}
              <Skeleton className="w-16 h-24 rounded-md" />

              {/* Title Skeleton */}
              <Skeleton className="h-6 w-3/4 rounded-md" />

              {/* Genre Skeleton */}
              <Skeleton className="h-4 w-1/2 rounded-md" />

              {/* Rating Skeleton */}
              <Skeleton className="h-4 w-10 rounded-md" />

              {/* Actions Skeleton */}
              <div className="flex items-center justify-end gap-2">
                <Skeleton className="w-8 h-8 rounded-md" />
                <Skeleton className="w-8 h-8 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#18181B] rounded-lg overflow-hidden border border-white/10">
      {/* Table Header */}
      <div className="grid grid-cols-[1fr_2fr_1.5fr_1fr_1fr] gap-4 p-4 text-xs font-bold text-white/50 uppercase tracking-wider bg-[#27272A] border-b border-white/10">
        <div>Cover</div>
        <div>Judul</div>
        <div>Genre</div>
        <div>Rating</div>
        <div className="text-right">Aksi</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-white/5">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="grid grid-cols-[1fr_2fr_1.5fr_1fr_1fr] gap-4 p-4 items-center hover:bg-white/5 transition-colors"
          >
            {/* Cover */}
            <div className="relative w-16 h-24 rounded-md overflow-hidden bg-white/10 flex-shrink-0">
              <Image
                loader={movieLoader}
                src={movie.poster || "/placeholder-movie.jpg"}
                alt={movie.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Title */}
            <div className="text-white font-medium text-sm md:text-base pr-4">
              {movie.title}
            </div>

            {/* Genre */}
            <div className="text-white/70 text-sm">
              {movie.genres && movie.genres.length > 0
                ? movie.genres.join(",")
                : "N/A"}
            </div>

            {/* Rating */}
            <div className="text-[#FBBF24] font-bold text-sm">
              {movie.rating?.toFixed(1) || "N/A"}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2">
              <Button
                size="icon-sm"
                variant="ghost"
                className="bg-[#3F3F46] hover:bg-[#52525B] text-[#3B82F6]"
                onClick={() => onEdit(movie)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                size="icon-sm"
                variant="ghost"
                className="bg-[#3F3F46] hover:bg-[#52525B] text-[#EF4444]"
                onClick={() => onDelete(movie)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}

        {movies.length === 0 && (
          <div className="p-8 text-center text-white/50">No movies found.</div>
        )}
      </div>

      {/* Pagination (Simple for now) */}
      <div className="flex items-center justify-end gap-2 p-4 border-t border-white/10">
        <Button
          variant="secondary"
          size="icon-sm"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="bg-[#27272A] text-white hover:bg-[#3F3F46] disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <span className="text-white text-sm">
          Page {currentPage} of {totalPages || 1}
        </span>
        <Button
          variant="secondary"
          size="icon-sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= (totalPages || 1)}
          className="bg-[#27272A] text-white hover:bg-[#3F3F46] disabled:opacity-50"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default MovieTable;
