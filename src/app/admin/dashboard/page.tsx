"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import MovieTable from "@/src/components/admin/MovieTable";
import MovieModal from "@/src/components/admin/MovieModal";
import DeleteModal from "@/src/components/admin/DeleteModal";
import { useGetMovies } from "@/src/hooks/movies/useGetMovies";
import { useCreateMovie } from "@/src/hooks/movies/useCreateMovie";
import { useUpdateMovie } from "@/src/hooks/movies/useUpdateMovie";
import { useDeleteMovie } from "@/src/hooks/movies/useDeleteMovie";
import { Movie } from "@/src/lib/types/movie";
import Nav from "@/src/components/global/nav";

export default function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMovieModalOpen, setIsMovieModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // Hooks
  const { data: movies = [], isLoading: isLoadingMovies } = useGetMovies(
    currentPage,
    10,
  );
  const createMovieMutation = useCreateMovie();
  const updateMovieMutation = useUpdateMovie();
  const deleteMovieMutation = useDeleteMovie();

  const handleOpenCreateModal = () => {
    setSelectedMovie(null);
    setIsMovieModalOpen(true);
  };

  const handleOpenEditModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsMovieModalOpen(true);
  };

  const handleOpenDeleteModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsMovieModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedMovie(null);
  };

  const handleSubmitMovie = async (data: any) => {
    try {
      if (selectedMovie) {
        await updateMovieMutation.mutateAsync({
          id: selectedMovie.id,
          ...data,
        });
      } else {
        await createMovieMutation.mutateAsync(data);
      }
      handleCloseModals();
    } catch (error) {
      console.error("Error saving movie:", error);
      // TODO: Handle error (show toast)
    }
  };

  const handleDeleteMovie = async () => {
    if (!selectedMovie) return;
    try {
      await deleteMovieMutation.mutateAsync(selectedMovie.id);
      handleCloseModals();
    } catch (error) {
      console.error("Error deleting movie:", error);
      // TODO: Handle error (show toast)
    }
  };

  // Mock total pages for now as API might not return it directly in the array
  // If API returns { data: [], meta: { totalPages: 5 } } then we use that.
  // Based on current service it returns Movie[], so we might need to adjust service or assume infinite scroll/simple pagination
  const totalPages = 10; // Placeholder

  return (
    <div className="min-h-screen bg-[#18181B] p-8 ">
      <Nav />
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex justify-end mt-12 items-center ">
          <Button
            onClick={handleOpenCreateModal}
            className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6"
          >
            <Plus className="w-4 h-4 mr-2" />
            Tambah Film
          </Button>
        </div>

        {/* Content */}
        <MovieTable
          movies={movies}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteModal}
          isLoading={isLoadingMovies}
        />

        {/* Modals */}
        <MovieModal
          isOpen={isMovieModalOpen}
          onClose={handleCloseModals}
          movie={selectedMovie}
          onSubmit={handleSubmitMovie}
          isLoading={
            createMovieMutation.isPending || updateMovieMutation.isPending
          }
        />

        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseModals}
          onConfirm={handleDeleteMovie}
          movieTitle={selectedMovie?.title || ""}
          isLoading={deleteMovieMutation.isPending}
        />
      </div>
    </div>
  );
}
