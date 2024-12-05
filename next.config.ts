import nextra from 'nextra'
import type { NextConfig } from 'next'

const isProduction = process.env.NODE_ENV === 'production'
const basePath = '/moondream-docs'

/**
 * @type {import('next').NextConfig}
 */
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true // mandatory, otherwise won't export
  },
  basePath,
  assetPrefix: isProduction ? basePath : ''
}

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx'
})

export default withNextra(nextConfig)
