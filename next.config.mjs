/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: '192.168.0.126',
      },
    ],
  },
};

export default nextConfig;
