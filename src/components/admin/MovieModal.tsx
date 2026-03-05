"use client";

import React, { useEffect, useState, useRef } from "react";
import { X, ChevronDown, Check } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/Input";
import { Movie } from "@/src/lib/types/movie";
import { useGetGenres } from "@/src/hooks/genres/useGetGenres";

interface MovieModalProps {
  isOpen: boolean;
  onClose: () => void;
  movie?: Movie | null;
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

const MovieModal: React.FC<MovieModalProps> = ({
  isOpen,
  onClose,
  movie,
  onSubmit,
  isLoading,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    poster: "",
    rating: "",
  });
  const [selectedGenreIds, setSelectedGenreIds] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Dependency Inversion: depend on hook abstraction
  const { data: genres = [], isLoading: isLoadingGenres } = useGetGenres();

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title || "",
        poster: movie.poster || "",
        rating: movie.rating?.toString() || "",
      });
      // Set selected genre IDs dari movie yang sedang diedit
      setSelectedGenreIds(movie.genre_ids || []);
    } else {
      setFormData({
        title: "",
        poster: "",
        rating: "",
      });
      setSelectedGenreIds([]);
    }
  }, [movie, isOpen]);

  // Close dropdown ketika klik di luar
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const handleToggleGenre = (genreId: string) => {
    setSelectedGenreIds((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId],
    );
  };

  const getSelectedGenreNames = (): string => {
    if (selectedGenreIds.length === 0) return "";
    return genres
      .filter((g) => selectedGenreIds.includes(g.id))
      .map((g) => g.name)
      .join(", ");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: formData.title,
      poster: formData.poster,
      rating: parseFloat(formData.rating),
      genre_ids: selectedGenreIds,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-[#18181B] rounded-2xl border border-white/10 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">
            {movie ? "Edit Movie" : "Add New Movie"}
          </h2>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            className="text-white/50 hover:text-white"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <Input
              label="Judul Film"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter movie title"
              required
              className="bg-[#27272A] border-white/10 focus:ring-primary/50"
            />
          </div>

          <div className="space-y-2">
            <Input
              label="Poster URL"
              value={formData.poster}
              onChange={(e) =>
                setFormData({ ...formData, poster: e.target.value })
              }
              placeholder="Enter poster image URL"
              className="bg-[#27272A] border-white/10 focus:ring-primary/50"
            />
          </div>

          {/* Genre Multi-Select Dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">Genres</label>
            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-[#27272A] border border-white/10 text-sm text-white hover:border-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <span
                  className={
                    selectedGenreIds.length > 0
                      ? "text-white truncate"
                      : "text-white/40"
                  }
                >
                  {selectedGenreIds.length > 0
                    ? getSelectedGenreNames()
                    : "Pilih genre..."}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-white/50 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full max-h-48 overflow-y-auto rounded-lg bg-[#27272A] border border-white/10 shadow-lg">
                  {isLoadingGenres ? (
                    <div className="px-3 py-2 text-sm text-white/40">
                      Loading genres...
                    </div>
                  ) : genres.length === 0 ? (
                    <div className="px-3 py-2 text-sm text-white/40">
                      Tidak ada genre tersedia
                    </div>
                  ) : (
                    genres.map((genre) => {
                      const isSelected = selectedGenreIds.includes(genre.id);
                      return (
                        <button
                          key={genre.id}
                          type="button"
                          onClick={() => handleToggleGenre(genre.id)}
                          className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-white/10 ${
                            isSelected
                              ? "text-red-400 bg-red-500/10"
                              : "text-white/80"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                              isSelected
                                ? "border-red-500 bg-red-500"
                                : "border-white/20"
                            }`}
                          >
                            {isSelected && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                          {genre.name}
                        </button>
                      );
                    })
                  )}
                </div>
              )}
            </div>

            {/* Selected genre tags */}
            {selectedGenreIds.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {genres
                  .filter((g) => selectedGenreIds.includes(g.id))
                  .map((genre) => (
                    <span
                      key={genre.id}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 text-xs"
                    >
                      {genre.name}
                      <button
                        type="button"
                        onClick={() => handleToggleGenre(genre.id)}
                        className="hover:text-red-300"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Input
              label="Rating"
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={formData.rating}
              onChange={(e) =>
                setFormData({ ...formData, rating: e.target.value })
              }
              placeholder="0.0"
              required
              className="bg-[#27272A] border-white/10 focus:ring-primary/50"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-white/10 text-white hover:bg-white/5 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700 text-white min-w-[100px]"
            >
              {isLoading ? "Saving..." : "Save Movie"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieModal;
