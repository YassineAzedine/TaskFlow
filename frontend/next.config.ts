// next.config.js
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ignore les erreurs ESLint
  },
  typescript: {
    ignoreBuildErrors: true, // ⚡ Ignore les erreurs TypeScript au build
  },
};

export default nextConfig;
