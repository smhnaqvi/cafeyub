/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "placehold.co"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

module.exports = nextConfig;
