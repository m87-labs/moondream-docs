export default {
  // Basic branding
  logo: (
    <span style={{ fontWeight: 600 }}>
      Moondream Documentation
    </span>
  ),

  // Project links
  project: {
    link: 'https://github.com/vikhyat/moondream'
  },
  docsRepositoryBase: 'https://github.com/m87-labs/moondream-docs',

  // Head tags and SEO
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Moondream Documentation" />
      <meta property="og:description" content="Documentation for the Moondream vision-language model" />
    </>
  ),
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Moondream'
    }
  },

  // Theme customization
  color: {
    hue: 270,
    saturation: 65,
    lightness: {
      light: 45,
      dark: 65
    }
  },

  // Navigation
  navigation: {
    prev: true,
    next: true
  },

  // Sidebar configuration
  sidebar: {
    defaultMenuCollapseLevel: 2,
    autoCollapse: true
  },

  // Footer
  footer: {
    content: (
      <span>
        © {new Date().getFullYear()} M87 Labs. All rights reserved.
      </span>
    )
  },

  // Dark mode
  darkMode: false,
  
  // Table of contents
  toc: {
    float: true,
    title: "On This Page"
  }
}