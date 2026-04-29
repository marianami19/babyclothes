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
        'baby-pink':   '#FFB6C1',
        'powder-blue': '#B0D4E8',
        'lavender':    '#D8B4E2',
        'mint':        '#C8E6C9',
        'cream':       '#FAF8F5',
        'rose':        '#F48FB1',
        'sky':         '#90CAF9',
        'sage':        '#A5C8A0',
        'peach':       '#FFCCB3',
        'butter':      '#FFF9C4',
        'ivory':       '#F5F0E8',
        'blush':       '#FCE4EC',
      },
      fontFamily: {
        display: ['Georgia', 'Cambria', 'serif'],
      },
      boxShadow: {
        card: '0 2px 12px rgba(0,0,0,0.07)',
      },
    },
  },
  plugins: [],
}

export default config
