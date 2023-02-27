/** @type {import('tailwindcss').Config} \*/
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      black: '#000',
      white: '#FFF',
      gray: {
        400: '#9C9C9C',
      },
    },
    extend: {
      fontFamily: {
        display: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
