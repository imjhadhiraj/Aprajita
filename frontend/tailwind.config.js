/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-thin::-webkit-scrollbar': {
          width: '8px',
        },
        '.scrollbar-thin::-webkit-scrollbar-track': {
          'border-radius': '10px',
          background: '#f1f1f1',
        },
        '.scrollbar-thin::-webkit-scrollbar-thumb': {
          background: 'linear-gradient(180deg, #1e3a8a, #3b82f6)',
          'border-radius': '10px',
        },
        '.scrollbar-thin::-webkit-scrollbar-thumb:hover': {
          background: '#555',
        },
        '.scrollbar-thin-main::-webkit-scrollbar': {
          width: '8px',
        },
        '.scrollbar-thin-main::-webkit-scrollbar-track': {
          'border-radius': '10px',
          background: '#e0e0e0',
        },
        '.scrollbar-thin-main::-webkit-scrollbar-thumb': {
          background: 'linear-gradient(180deg, #ff7f50, #ff4500)',
          'border-radius': '10px',
        },
        '.scrollbar-thin-main::-webkit-scrollbar-thumb:hover': {
          background: '#ff6347',
        },
      });
    },
  ],
}