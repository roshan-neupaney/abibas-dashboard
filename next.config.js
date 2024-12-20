/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["localhost", "apidev.nepalhomes.com"],
    remotePatterns: [
      {
        hostname: "apidev.nepalhomes.com",
      },
      {
        hostname: "localhost",
      },
      {
        hostname: "abibas-backend-1.vercel.app",
      },
      {
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

module.exports = nextConfig;
