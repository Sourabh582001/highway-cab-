import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
  },
  async rewrites() {
    const backend = process.env.NEXT_PUBLIC_BACKEND_URL
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}`
      : 'http://localhost:5000';
    return [
      {
        source: '/api/distance',
        destination: `${backend}/api/distance`,
      },
      {
        source: '/api/cities',
        destination: `${backend}/api/cities`,
      },
    ];
  },
};

export default nextConfig;
