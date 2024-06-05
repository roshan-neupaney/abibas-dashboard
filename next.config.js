/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["localhost", "apidev.nepalhomes.com"],
    remotePatterns: [
      {
        hostname: "apidev.nepalhomes.com",
      },
    ],
  },
};

module.exports = nextConfig;
