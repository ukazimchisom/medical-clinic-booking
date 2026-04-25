import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oimklmylbuccmgoltjee.supabase.co",
      },
    ],
  },
};

export default nextConfig;
