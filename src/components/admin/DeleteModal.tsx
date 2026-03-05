"use client";

import React from "react";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/src/components/ui/button";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  movieTitle: string;
  isLoading: boolean;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  movieTitle,
  isLoading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm bg-[#18181B] rounded-2xl border border-white/10 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex flex-col items-center p-6 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <h3 className="text-xl font-bold text-white">Delete Movie?</h3>

          <p className="text-white/70">
            Are you sure you want to delete{" "}
            <span className="text-white font-semibold">"{movieTitle}"</span>?
            This action cannot be undone.
          </p>
        </div>

        <div className="p-6 pt-0 flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 border-white/10 text-white hover:bg-white/5 bg-transparent"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 bg-red-600 hover:bg-red-700"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
