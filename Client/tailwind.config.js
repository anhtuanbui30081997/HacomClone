/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Open Sans', 'sans-serif']
    },
    extend: {
      colors: {
        white: '#fff',
        black: '#000',
        overlay: 'rgba(0, 0, 0, 0.5)'
      },
      screens: {
        xl: '1200px',
        '2xl': '1650px'
      }
    }
  },
  plugins: []
}
