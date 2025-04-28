/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: 'build',
  output: 'standalone',
  images: {
    domains: ['fakeimg.pl', 'placehold.co'],
  },
};

export default nextConfig;
