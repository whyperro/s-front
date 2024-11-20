/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: '192.168.0.159',
      },
    ],
  },
};

export default nextConfig;
