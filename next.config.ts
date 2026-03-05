import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
      {
        protocol: "https",
        hostname: "**", // Mengizinkan semua hostname (bisa dipersempit)
        port: "",
        pathname: "**", // Mengizinkan semua path
      },
    ],
  },
};

export default nextConfig;
