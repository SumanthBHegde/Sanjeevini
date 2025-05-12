import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
      // Explicitly add Google user content domains
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
    // Increase the image response timeout for external images
    minimumCacheTTL: 600,
    // Disable remote image optimization for Google user content to avoid timeouts
    unoptimized: false, // Keep general optimization on, we'll handle Google images specifically in the UserAvatar component
  },
  experimental: {
    ppr: "incremental",
    after: true,
  },
  devIndicators: {
    appIsrStatus: true,
    buildActivity: true,
    buildActivityPosition: "bottom-right",
  },
};

export default nextConfig;
