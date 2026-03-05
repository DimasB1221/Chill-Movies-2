"use client";

import { User, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

interface ProfileDropdownProps {
  onLogout: () => void;
}

export function ProfileDropdown({ onLogout }: ProfileDropdownProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors focus:outline-none">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center overflow-hidden">
            <User className="w-5 h-5" />
          </div>
          <ChevronDown className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 bg-[#18181b] border-white/10 text-white z-50"
      >
        <DropdownMenuItem className="text-white hover:bg-white/10 hover:text-white cursor-pointer focus:bg-white/10 focus:text-white">
          <User className="w-4 h-4 mr-2" />
          <span>Profil Saya</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-white hover:bg-white/10 hover:text-white cursor-pointer focus:bg-white/10 focus:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 mr-2"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span>Ubah Premium</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-400 hover:bg-red-500/10 hover:text-red-400 cursor-pointer focus:bg-red-500/10 focus:text-red-400"
          onClick={onLogout}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 mr-2"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span>Keluar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
