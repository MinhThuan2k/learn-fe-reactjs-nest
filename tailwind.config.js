/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ff49db'
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
        BlinkMacSystemFont: ['BlinkMacSystemFont']
      }
    }
  },
  plugins: []
}
