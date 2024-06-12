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
        honeydew: '#E1EFE6',
        ghostWhite: '#F4F4F8',
        tomato: '#FE4A49',
        mintGreen: '#CDF7F6',
        babypowder: '#FDFFFC',
        yateBlue: '#083D77',
        sandyBrown: '#EE964B',
        beige: '#EBEBD3',
        isabelline: '#F9F6F0',
        resedaGreen: '#6A8D73',
        whiteSmoke: '#F5F5F5',
        celestialBlue: '#3E92CC'
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
