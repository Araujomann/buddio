/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens:{
      "xs" : "375px",
      "sm" : "640px",
      "md" : "768px",
      "lg" : "1024px",
      "xl" : "1280px",
      "2xl" : "1536px",
    },
    fontSize: {
      'xs': ['12px', '16px'],
      'sm': ['14px', '20px'],
      'base': ['16px', '24px'],
      'lg': ['18px', '28px'],
      'xl': ['20px', '28px'],
      '2xl': ['24px', '32px'],
      '3xl': ['30px', '36px'],
      '4xl': ['36px', '40px'],
      '5xl': ['48px', '48px'],
      '6xl': ['64px', '64px'],
      '7xl': ['96px', '96px'],
      '8xl': ['128px', '128px'],
      '9xl': ['192px', '192px'],
      '10xl': ['256px', '256px'],
      '11xl': ['384px', '384px'],
      '12xl': ['512px', '512px'],



    },
    extend: {
      colors: {
        buddyGray: '#111111',
        postBarGray: '#B0B0B0',
        cleanGray: '#F5F5F5',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        ptSans: ['PT Sans', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
