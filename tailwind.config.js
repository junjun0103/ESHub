/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent-gold': '#D4AF37',
        'gray': {
          900: '#121212',
          800: '#1E1E1E',
          700: '#2D2D2D',
          // ... other shades
        },
      },
      fontFamily: {
        serif: ['Baskerville', 'Georgia', 'serif'],
        sans: ['Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}