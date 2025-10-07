/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Euclid Circular B', 'sans-serif']
      },
      colors: {
        gray: '#f8f8f8',
        primary: {
          DEFAULT: '#78350f',
          'font-medium': '#78350f'
        },
        secondary: {
          DEFAULT: '#f59e0c',
          light: '#f6ba2c'
        },
        // Couleurs existantes conservées
        black: '#171717',
        'gray-50': '#f8f8f8',
        yellow: '#f3b01d'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' }
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
        blink: 'blink 1s infinite'
      }
    }
  },
  plugins: []
};
