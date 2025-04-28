/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: '172.190.0.166',
      },
    ],
  },
};

export default nextConfig;
