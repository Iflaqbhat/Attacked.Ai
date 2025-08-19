import type { Config } from 'tailwindcss'
import lineClamp from '@tailwindcss/line-clamp'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        gold: '#FD5D00',
        neutral: {
          dark: '#121212',
          light: '#E0E0E0'
        },
        secureTeal: '#00BFA6',
        threatBlue: '#2C84D8',
        alertAmber: '#FC6000',
        adversaryRed: '#E63946'
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-jetbrains)']
      },
      boxShadow: {
        'glow-white': '0 8px 32px rgba(255, 255, 255, 0.15)',
        'glow-white-hover': '0 12px 40px rgba(255, 255, 255, 0.25)',
        'glow-white-strong': '0 0 20px rgba(255, 255, 255, 0.3)',
        'button': '0 4px 16px rgba(255, 255, 255, 0.1)',
        'button-hover': '0 8px 24px rgba(255, 255, 255, 0.2)',
      }
    }
  },
  plugins: [lineClamp]
}

export default config
