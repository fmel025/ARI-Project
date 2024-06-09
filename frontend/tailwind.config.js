/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        darkPurple: '#160C28',
        naplesYellow: '#EFCB68',
        honeydew: '#E1EFE6'
      }
    },
  },
  plugins: [],
};
