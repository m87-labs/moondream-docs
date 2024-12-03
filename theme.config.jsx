export default {
  logo: <span>Moondream Documentation</span>,
  project: {
    link: 'https://github.com/vikhyat/moondream'
  },
  docsRepositoryBase: 'https://github.com/m87-labs/moondream-docs',
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Moondream'
    }
  },
  primaryHue: 270,
  footer: {
    text: '© 2024 M87 Labs'
  }
} 