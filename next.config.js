/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns:[
      {
        protocol: 'https',
        hostname: "www.themealdb.com",
        port: "",
        pathname: "/images/media/meals/**"
      },
      {
        protocol: 'https',
        hostname: "www.themealdb.com",
        port: "",
        pathname: "/images/category/**"
      }
    ]
  }
}

module.exports = nextConfig
