/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  telemetry: false,

  experimental: {
    turbo: false,
  },
  
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
  
  async rewrites() {
    // ✅ Utiliser l'URL complète du backend sur Render
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