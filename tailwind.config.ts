import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'navy-blue': '#0B1E3D',
        'golden-yellow': '#FFC300',
        'light-gray': '#F7F8FA',
      },
      fontFamily: {
        sans: ['var(--font-work-sans)'],
      },
    },
  },
  plugins: [],
}
export default config