import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ED1C24',
        'true-black': '#000000',
        'dark-gray': '#333333',
        'pure-white': '#FFFFFF',
        surface: '#DCDCDC',
        'surface-light': '#F5F5F5',
        'border-black': '#000000',
        'border-subtle': '#D0D0D0',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', '"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        pill: '9999px',
        card: '6px',
      },
    },
  },
  plugins: [],
};

export default config;
