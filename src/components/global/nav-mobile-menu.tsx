"use client";

import Link from "next/link";
import { X, User } from "lucide-react";
import Image from "next/image";

interface LinkItem {
  href: string;
  label: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  onLogout: () => void;
  navLinks: readonly LinkItem[];
  authLinks: readonly LinkItem[];
}

export function MobileMenu({
  isOpen,
  onClose,
  isAuthenticated,
  onLogout,
  navLinks,
  authLinks,
}: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 md:hidden">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2">
          <Image
            priority
            src="/Chill-Logo.png"
            alt="Chill Logo"
            width={120}
            height={120}
            className="relative w-auto"
          />
        </Link>
        <button
          onClick={onClose}
          className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="flex flex-col p-4 space-y-2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-white hover:text-blue-400 py-3 px-4 rounded-lg hover:bg-white/5 transition-all"
            onClick={onClose}
          >
            {link.label}
          </Link>
        ))}

        <div className="border-t border-white/10 my-2" />

        {!isAuthenticated ? (
          authLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white hover:text-blue-400 py-3 px-4 rounded-lg hover:bg-white/5 transition-all"
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))
        ) : (
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-3 px-4 py-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center overflow-hidden">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-medium">Akun Saya</span>
            </div>

            <Link
              href="/profile"
              className="text-white hover:text-blue-400 py-3 px-4 pl-12 rounded-lg hover:bg-white/5 transition-all text-sm"
              onClick={onClose}
            >
              Profil Saya
            </Link>
            <Link
              href="/premium"
              className="text-white hover:text-blue-400 py-3 px-4 pl-12 rounded-lg hover:bg-white/5 transition-all text-sm"
              onClick={onClose}
            >
              Ubah Premium
            </Link>
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="text-red-400 hover:text-red-300 py-3 px-4 pl-12 rounded-lg hover:bg-white/5 transition-all text-left w-full text-sm"
            >
              Keluar
            </button>
          </div>
        )}
      </nav>
    </div>
  );
}
