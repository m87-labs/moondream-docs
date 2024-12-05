import nextra from 'nextra'
import type { NextConfig } from 'next'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx'
})

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true
  },
}

export default withNextra(nextConfig)
