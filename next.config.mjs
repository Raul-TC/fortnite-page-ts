/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.fortniteapi.io',
        pathname: '**'
      }
    ]
  }
}

export default nextConfig
