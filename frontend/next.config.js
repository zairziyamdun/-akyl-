/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "atego36.ru",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "mmsmart.ru",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;

