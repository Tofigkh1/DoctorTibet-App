/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['firebasestorage.googleapis.com', 'images.pexels.com','tiens.com.tr', 'img.freepik.com'],
  },
};

module.exports = nextConfig;
