/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                buddyGray: '#111111',
                postBarGray: '#B0B0B0',
                cleanGray: '#F5F5F5',
            },
            fontFamily: {
                montserrat: ['Montserrat', 'sans-serif'],
            },
        },
    },
    plugins: [
        require('tailwind-scrollbar-hide')
    ],
};
