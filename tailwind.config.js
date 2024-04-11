/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        visibilityOn: {
          '0%': {opacity: '0%'},
          '100%': {opacity: '100%'},
        },
      },
      animation: {
        visibilityOn: 'visibilityOn 0.3s ease-in-out',
      }
    },
  },
  plugins: [],
}

