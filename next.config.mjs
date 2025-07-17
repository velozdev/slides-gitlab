/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/slides-gitlab',
  assetPrefix: '/slides-gitlab/',
  webpack: (config) => {
    // Add support for importing .md files as raw text
    config.module.rules.push({
      test: /\.md$/,
      type: 'asset/source',
    })
    return config
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
