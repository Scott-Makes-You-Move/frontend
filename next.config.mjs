/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['fakeimg.pl', 'placehold.co'],
  },
};

export default nextConfig;
