/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["www.google.com", "res.cloudinary.com", "www.junglescout.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "www.junglescout.com",
      },
    ],
  },
};

module.exports = nextConfig;
