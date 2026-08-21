/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',  // ✅ CRUCIAL !
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'association-backend-ftnr.onrender.com',
      },
    ],
  },
};

module.exports = nextConfig;