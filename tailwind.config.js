/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        main: '#1810C2',
      },
      padding: {
        all: 12,
      },
      borderRadius: {
        all: 8,
      },
      fontFamily: {
        kavoon: ['Kavoon-Regular'],
      },
    },
  },
  plugins: [],
};
