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
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'association-backend-ftnr.onrender.com',
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },
  
  // ✅ Proxy pour l'API
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://association-backend-ftnr.onrender.com';
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/api/:path*`,
      },
      {
        source: '/uploads/:path*',
        destination: `${apiUrl}/uploads/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;