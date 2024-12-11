import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx,md}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx,md}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx,md}",
  ],
  darkMode: 'media',
  theme: {
    // Override default colors
    colors: {
      // Core colors from palette
      white: '#FAFAF9',
      black: '#0D0D0D',
      blue: {
        light: '#9FB6EB',
        DEFAULT: '#4363CC'
      },
      gray: {
        lightest: '#FAFAF9',
        light: '#F0EDEE',
        medium: '#C0B7B0',
        dark: '#585652'
      },
      // Semantic colors
      primary: '#4363CC',
      secondary: '#9FB6EB',
      background: '#FAFAF9',
      foreground: '#0D0D0D',
      muted: '#C0B7B0',
      border: '#F0EDEE',
      // Code block colors
      code: {
        background: '#F7F7F8',
        border: '#E5E5E7'
      },
      // Ensure transparent is available
      transparent: 'transparent',
      current: 'currentColor',
    },
    extend: {
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        'handwriting': ['Architects Daughter', 'cursive'],
      },
    },
  },
  plugins: [],
} satisfies Config;
