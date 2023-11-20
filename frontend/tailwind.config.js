/*eslint-env node*/
/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Montserrat', 'sans-serif']
    },
    extend: {
      gridTemplateColumns: {
        'auto-fill': 'repeat(auto-fill, 300px)'
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      borderWidth: ['hover'],
      display: ['hover', 'focus']
    }
  },
  plugins: [require('daisyui')],
  corePlugins: {
    preflight: true
  },
  daisyui: {
    themes: ['cupcake', 'dark'],
    darkTheme: 'dark'
  }
};