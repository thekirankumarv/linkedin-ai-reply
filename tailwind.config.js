/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**.{html,js,ts,jsx,tsx}",
    "assets/**",
    "entrypoints/**",
    "components/**",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
