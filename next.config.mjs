const thirtyDaysInSeconds = 60 * 60 * 24 * 30;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      'http://54.38.158.40:8080/billeterie-api/api/v1';

    if (!apiUrl) {
      throw new Error(
        'NEXT_PUBLIC_API_URL environment variable is not defined'
      );
    }

    console.log('Setting up API proxy to:', apiUrl);

    return [
      {
        source: '/api-external/:path*',
        destination: `${apiUrl}/:path*`
      }
    ];
  },
  async headers() {
    return [
      {
        source: '/api-external/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS, PATCH'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'Content-Type, Authorization, X-Requested-With, Accept, Origin'
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true'
          },
          {
            key: 'Access-Control-Max-Age',
            value: '86400'
          }
        ]
      }
    ];
  },
  images: {
    remotePatterns: [],
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: thirtyDaysInSeconds,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  }
};

export default nextConfig;
