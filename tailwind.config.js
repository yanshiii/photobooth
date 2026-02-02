/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./store/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Lovira', 'Georgia', 'serif'],
        accent: ['Raclie', 'DM Sans', 'sans-serif'],
        body: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        ruby: {
          50: '#fdf2f3',
          100: '#fce4e6',
          200: '#f9ccd0',
          300: '#f4a4ab',
          400: '#ec6d79',
          500: '#ad2831',
          600: '#9a2129',
          700: '#800e13',
          800: '#640d14',
          900: '#38040e',
          950: '#250902',
        },
        booth: {
          dark: '#0d0706',
          darker: '#080303',
          paper: '#ffffff',
        },
      },
      boxShadow: {
        'ruby': '0 4px 24px -4px rgba(173, 40, 49, 0.5)',
        'ruby-lg': '0 6px 32px -4px rgba(173, 40, 49, 0.6)',
        'paper': '0 32px 96px -16px rgba(37, 9, 2, 0.4), 0 16px 48px -12px rgba(100, 13, 20, 0.3)',
      },
      animation: {
        'fadeIn': 'fadeIn 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};