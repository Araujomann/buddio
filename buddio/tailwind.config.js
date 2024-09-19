/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "buddyGray": "#111111",
      },
      fontFamily: {
        "montserrat": ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
}