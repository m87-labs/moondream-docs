import nextra from 'nextra'
import type { NextConfig } from 'next'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx'
})

const nextConfig: NextConfig = {
  reactStrictMode: true,
}

export default withNextra(nextConfig)
