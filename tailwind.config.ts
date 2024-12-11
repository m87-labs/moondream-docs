import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx,md}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx,md}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx,md}",
  ],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        'handwriting': ['Architects Daughter', 'cursive'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
