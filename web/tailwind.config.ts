import type { Config } from 'tailwindcss'
const { nextui } = require('@nextui-org/react')

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'body-gradient': 'linear-gradient(to right, #1F3757 0%, #131537 100%)',
        'button-gradient': 'linear-gradient(to left, #1F3757 0%, #131537 100%)',
        triangle: 'url(/triangle.svg)',
        'mobile-triangle': 'url(/mobile-triangle.svg)',
      },
      colors: {
        score: '#2A45C2',
        'score-number': '#565468',
        'rules-title': '#3B4262',
      },
      boxShadow: {
        'custom-colored': '0 4px 10px rgba(255, 255, 255, 0.05)', // Yeşil renkli gölge
      },
      screens: {
        lg: '960px',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
}
export default config
