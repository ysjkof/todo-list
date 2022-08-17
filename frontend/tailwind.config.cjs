/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        fadeout: {
          '0%, 25%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      },
      animation: { fadeout: 'fadeout 3s linear 1' },
    },
  },
  plugins: [],
};
