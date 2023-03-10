// /** @type {import('tailwindcss').Config} \*/
// module.exports = {
//   content: ['./src/**/*.{js,ts,jsx,tsx}'],
//   theme: {
//     colors: {
//       black: '#000',
//       white: '#FFF',
//       gray: {
//         400: '#9C9C9C',
//       },
//     },
//     extend: {
//       fontFamily: {
//         display: ['Inter', 'sans-serif'],
//       },
//     },
//   },
//   plugins: [],
// };

//const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // sans: ['var(--font-sans)', ...fontFamily.sans],
        display: ['ui-rounded', 'sans-serif'],
      },

      colors: {
        black: '#000',
        white: '#FFF',
        error: '#B72928',
        primary: '#325FFF',
        gray: {
          400: '#9C9C9C',
          600: '#3A3A3A',
          700: '#1A1A1A',
          800: '#101010',
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
