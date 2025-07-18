/** @type {import('next').NextConfig} */


const nextConfig = {
  webpack: (config) => {
    // Add support for importing .md files as raw text
    config.module.rules.push({
      test: /\.md$/,
      type: 'asset/source',
    })
    return config
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
