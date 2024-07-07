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
    ],
  },
};

module.exports = nextConfig;
