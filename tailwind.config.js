/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        elyte: {
          DEFAULT: '#9a1b1f', // O vermelho escuro exato da logo ElyteSpark
          hover: '#7a1518',
          light: '#fcecec',
          bg: '#fcf8f8' // O fundo levemente rosado/cinza da seção de carreiras
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}