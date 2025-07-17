/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';
const isExport = process.env.NEXT_PHASE === 'phase-export' || process.env.EXPORT_STATIC === 'true';

const nextConfig = {
  output: 'export',
  ...(isProd || isExport ? {
    basePath: '/slides-gitlab',
    assetPrefix: '/slides-gitlab/',
  } : {}),
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
