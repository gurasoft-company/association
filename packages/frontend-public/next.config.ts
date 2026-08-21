/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ output standalone pour Docker
  output: 'standalone',
  
  // ✅ Désactiver le télémetry
  telemetry: false,

  // ✅ DÉSACTIVER TURBOPACK
  experimental: {
    turbo: false,
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'association-backend-ftnr.onrender.com',
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },
  
  
};

module.exports = nextConfig;