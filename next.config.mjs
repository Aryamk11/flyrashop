/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows all external images (Supabase included)
      },
    ],
  },
};

export default nextConfig;