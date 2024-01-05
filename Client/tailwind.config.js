/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1200px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1650px'
      // => @media (min-width: 1650px) { ... }
    },
    fontFamily: {
      sans: ['Open Sans', 'Arial', 'sans-serif']
    },
    extend: {
      colors: {
        white: '#fff',
        black: '#000'
      }
    }
  },
  plugins: []
}
