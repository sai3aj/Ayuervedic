/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Earthy, natural colors for Ayurvedic theme
        'herb-green': '#5F8575',
        'soft-green': '#A4BE7B',
        'leaf-green': '#285238',
        'earth-brown': '#8B5A2B',
        'sand': '#E1C78F',
        'terracotta': '#D2691E',
        'clay': '#B87333',
        'turmeric': '#E3A857',
        'lotus-pink': '#F8C8DC',
        'healing-blue': '#5F9EA0',
      },
      fontFamily: {
        'body': ['Poppins', 'sans-serif'],
        'heading': ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
} 