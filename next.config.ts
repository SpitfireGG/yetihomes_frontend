import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  poweredByHeader: false,
  images: {
    dangerouslyAllowLocalIP: true, // only matters for local dev; inert in production
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "4000",
        pathname: "/uploads/**",
      },

      {
        protocol: "https",
        hostname: "api.yetihomesestate.com.np",
        pathname: "/uploads/**",
      },

      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "avatar.vercel.sh", pathname: "/**" },
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/**" },
      { protocol: "https", hostname: "upload.wikimedia.org", pathname: "/**" },
    ],
  },
};

export default nextConfig;
