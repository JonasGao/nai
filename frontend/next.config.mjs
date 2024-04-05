/** @type {import('next').NextConfig} */
import pwa from "@ducanh2912/next-pwa";

const withPWA = pwa({
  dest: "public",
  disable: false,
  register: true,
  reloadOnOnline: true,
});

const nextConfig = {
  compress: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8080/api/:path*", // Proxy to Backend
      },
    ];
  },
};

export default withPWA(nextConfig);
