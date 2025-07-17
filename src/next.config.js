/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Windows build fix
  experimental: {
    esmExternals: false
  }
}

module.exports = nextConfig