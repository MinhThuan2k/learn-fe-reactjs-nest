/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ff49db'
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
        BlinkMacSystemFont: ['BlinkMacSystemFont-Thin']
      }
    }
  },
  plugins: []
}
