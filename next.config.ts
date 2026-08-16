import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.50.175"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "awrvziwgywarzemkfori.supabase.co",
      },
    ],
  },
};

export default nextConfig;
