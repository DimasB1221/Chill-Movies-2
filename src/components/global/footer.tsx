"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";

// Layout constants for "Genre" section
const genres = [
  ["Aksi", "Anak-anak", "Anime", "Britania"],
  ["Drama", "Fantasi Ilmiah & Fantasi", "Kejahatan", "KDrama"],
  ["Komedi", "Petualangan", "Perang", "Romantis"],
  ["Sains & Alam", "Thriller"],
];

const helpLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Kontak Kami", href: "/contact" },
  { label: "Privasi", href: "/privacy" },
  { label: "Syarat & Ketentuan", href: "/terms" },
];

// Single Responsibility: Mobile Section Component
function MobileSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10 py-4 last:border-0 lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left font-medium"
      >
        <span>{title}</span>
        {isOpen ? (
          <ChevronDown className="w-5 h-5" />
        ) : (
          <ChevronRight className="w-5 h-5" />
        )}
      </button>
      {isOpen && (
        <div className="mt-4 flex flex-col gap-2 pl-2">{children}</div>
      )}
    </div>
  );
}

export default function Footer() {
  // Flattening genres for mobile
  const allGenres = genres.flat();

  return (
    <footer className="mx-auto  bg-[#181a1c] text-white py-10 border-t border-white/10 ">
      <div className="  w-full px-4 lg:max-w-5xl xl:max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8 lg:gap-0">
        {/* Left Side: Logo & Copyright */}
        <div className="">
          <Link href="/">
            <Image
              src="/Chill-Logo.png"
              alt="Chill Logo"
              width={150}
              height={150}
              className="w-auto h-auto relative right-10"
            />
          </Link>
          <p className="text-gray-400 text-sm">
            @2023 Chill All Rights Reserved.
          </p>
        </div>

        {/* Desktop Layout: Right Side (Hidden on Mobile) */}
        <div className="hidden md:flex flex-col md:flex-row gap-12 ">
          {/* Genre Section */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg">Genre</h3>
            <div className="grid grid-cols-2 md:grid-cols-2 g:grid-cols-3 gap-y-2 lg:gap-x-12 ">
              {genres.map((column, colIndex) => (
                <div key={colIndex} className="flex flex-col gap-2">
                  {column.map((genre) => (
                    <Link
                      key={genre}
                      href={`/genre/${genre.toLowerCase().replace(/ /g, "-")}`}
                      className="text-gray-400 hover:text-white transition-colors text-sm whitespace-nowrap"
                    >
                      {genre}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Bantuan Section */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg">Bantuan</h3>
            <div className="flex flex-col gap-2">
              {helpLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors text-sm whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout: Accordions (Visible only on Mobile) */}
        <div className="flex flex-col md:hidden mt-4">
          <MobileSection title="Genre">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {allGenres.map((genre) => (
                <Link
                  key={genre}
                  href={`/genre/${genre.toLowerCase().replace(/ /g, "-")}`}
                  className="text-gray-400 hover:text-white transition-colors text-sm w-[45%]"
                >
                  {genre}
                </Link>
              ))}
            </div>
          </MobileSection>
          <MobileSection title="Bantuan">
            {helpLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors text-sm block"
              >
                {link.label}
              </Link>
            ))}
          </MobileSection>
        </div>
      </div>
    </footer>
  );
}
