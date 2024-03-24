module.exports = {
  content: [
    './src/renderer/**/*.{js,jsx,ts,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
    './node_modules/tailwind-datepicker-react/dist/**/*.js',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {},
  variants: {},
  plugins: [require('flowbite/plugin')],
};
