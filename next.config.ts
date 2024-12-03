import nextra from 'nextra'
import { NextConfig } from 'next'

/**
 * GitHub Actions Configuration for Static Export to GitHub Pages
 * 
 * Create .github/workflows/deploy.yml with:
 * ```yaml
 * name: Deploy to GitHub Pages
 * 
 * on:
 *   push:
 *     branches:
 *       - main
 *   workflow_dispatch:
 * 
 * permissions:
 *   contents: read
 *   pages: write
 *   id-token: write
 * 
 * concurrency:
 *   group: "pages"
 *   cancel-in-progress: false
 * 
 * jobs:
 *   build:
 *     runs-on: ubuntu-latest
 *     steps:
 *       - uses: actions/checkout@v4
 *       - name: Setup Node
 *         uses: actions/setup-node@v4
 *         with:
 *           node-version: 18
 *           cache: npm
 *       - name: Setup Pages
 *         uses: actions/configure-pages@v4
 *       - name: Install dependencies
 *         run: npm ci
 *       - name: Build with Nextra
 *         run: npm run build
 *       - name: Upload artifact
 *         uses: actions/upload-pages-artifact@v3
 *         with:
 *           path: ./out
 * 
 *   deploy:
 *     environment:
 *       name: github-pages
 *       url: ${{ steps.deployment.outputs.page_url }}
 *     runs-on: ubuntu-latest
 *     needs: build
 *     steps:
 *       - name: Deploy to GitHub Pages
 *         id: deployment
 *         uses: actions/deploy-pages@v4
 * ```
 */

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx'
})

/**
 * Next.js Configuration for Static Export
 * 
 * output: 'export' - Enables static HTML export
 * images.unoptimized: true - Required for static export
 * basePath: '/moondream-docs' - Required for GitHub Pages project site
 */
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  basePath: '/moondream-docs'
}

export default withNextra(nextConfig)
