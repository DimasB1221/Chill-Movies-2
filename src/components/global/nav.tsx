"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useAuthSession } from "@/src/hooks/auth/useAuthSession";
import { ProfileDropdown } from "@/src/components/global/nav-profile-dropdown";
import { MobileMenu } from "@/src/components/global/nav-mobile-menu";
import Image from "next/image";

// Navigation links configuration - Open/Closed Principle
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/series", label: "Series" },
  { href: "/movies", label: "Movies" },
  { href: "/admin/dashboard", label: "Admin" },
] as const;

const authLinks = [
  { href: "/register", label: "Register" },
  { href: "/login", label: "Login" },
] as const;

// Main Nav component - Dependency Inversion (depends on abstractions)
export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, isLoading, logout } = useAuthSession();

  return (
    <>
      <nav className="fixed  top-0 left-0 right-0 z-40 bg-gradient-to-b bg-[#181A1C] to-transparent backdrop-blur-sm ">
        <div className="w-auto px-2 ">
          <div className="relative flex items-center justify-between h-16 ">
            {/* Logo */}
            <Link href="/" className="">
              <Image
                priority
                src="/Chill-Logo.png"
                alt="Chill Logo"
                width={120}
                height={120}
                className="relative w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center  gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white hover:text-blue-400 transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Auth/Profile */}
            <div className="hidden md:flex items-center gap-4">
              {!isLoading && (
                <>
                  {isAuthenticated ? (
                    <ProfileDropdown onLogout={logout} />
                  ) : (
                    <>
                      {authLinks.map((link) => (
                        <Link key={link.href} href={link.href}>
                          <Button
                            variant={
                              link.label === "Login" ? "primary" : "outline"
                            }
                            size="sm"
                          >
                            {link.label}
                          </Button>
                        </Link>
                      ))}
                    </>
                  )}
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isAuthenticated={isAuthenticated}
        onLogout={logout}
        navLinks={navLinks}
        authLinks={authLinks}
      />
    </>
  );
}
