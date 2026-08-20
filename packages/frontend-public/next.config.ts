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