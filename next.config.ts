import nextra from 'nextra'
import type { NextConfig } from 'next'

/**
 * @type {import('next').NextConfig}
 */
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true // mandatory, otherwise won't export
  },
  basePath: '',
  assetPrefix: ''
}

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx'
})

export default withNextra(nextConfig)
