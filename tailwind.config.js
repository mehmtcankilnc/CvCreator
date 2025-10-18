/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        main: '#1810C2',
        borderColor: '#D4D4D4',
        gray: '#585858',
        rejectColor: '#C21D10',
        confirmColor: '#C2A510',
      },
      fontFamily: {
        kavoon: ['Kavoon-Regular'],
      },
    },
  },
  plugins: [],
};
