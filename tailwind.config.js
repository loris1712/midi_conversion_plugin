/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        accent: '#F5B40A',
        appBar: 'rgba(235, 235, 245, 0.705)',
      },
    },
  },
  plugins: [],
};
