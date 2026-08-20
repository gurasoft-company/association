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
  
  // ✅ Proxy vers le backend sur Render
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://association-backend-ftnr.onrender.com/api/:path*',
      },
      {
        source: '/uploads/:path*',
        destination: 'https://association-backend-ftnr.onrender.com/uploads/:path*',
      },
    ];
  },
};

module.exports = nextConfig;