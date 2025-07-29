import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    // Fix for next-auth v5 beta module resolution issues
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    // Ensure proper module resolution for next-auth
    config.resolve.extensionAlias = {
      ...config.resolve.extensionAlias,
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
    };
    
    return config;
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
  transpilePackages: ['next-auth'],
  devIndicators: {
    appIsrStatus: true,
    buildActivity: true,
    buildActivityPosition: "bottom-right",
  },
};

export default nextConfig;
