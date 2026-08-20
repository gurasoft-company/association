/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ AJOUTER : output standalone pour Docker
  output: 'standalone',
  
  // ✅ AJOUTER : désactiver le télémetry
  telemetry: false,
  
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
      // ✅ AJOUTER pour les uploads en dev local
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
      // ✅ AJOUTER pour les uploads dans Docker
      {
        protocol: 'http',
        hostname: 'association_backend',
        port: '5000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'backend',
        port: '5000',
        pathname: '/uploads/**',
      },
    ],
  },
  
  // ✅ AJOUTER : Proxy pour l'API
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://association_backend:5000';
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