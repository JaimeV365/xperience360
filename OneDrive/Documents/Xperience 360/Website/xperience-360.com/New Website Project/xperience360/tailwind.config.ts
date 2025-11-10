import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#c49102',
          dark: '#a37802',
        },
        dark: {
          DEFAULT: '#111111',
          light: '#1a1a1a',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        accent: ['Futura Renner', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config






