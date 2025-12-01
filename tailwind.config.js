/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        main: '#1954E5',
        backgroundColor: '#FFFFFF',
        secondaryBackground: '#FEFEFE',
        textColor: '#585858',
        borderColor: '#D4D4D4',
        rejectColor: '#C21D10',
        confirmColor: '#C2A510', //#2bc210
        dark: {
          backgroundColor: '#0F181F',
          textColor: '#D9D9D9',
          secondaryBackground: '#172335',
          borderColor: '#5D5D5D',
        },
      },
      fontFamily: {
        kavoon: ['Kavoon-Regular'],
      },
    },
  },
  plugins: [],
};
