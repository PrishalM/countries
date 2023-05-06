/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        dark: "0px 0px 5px rgba(17, 21, 23, 0.25)",
        light: "0px 0px 5px rgba(133, 133, 133, 0.25)",
        darkCountryCard: "0px 0px 5px rgb(255 255 255 / 0.50)",
        lightCountryCard: "0px 0px 5px rgb(0 0 0 / 0.50)",
      },
      colors: {
        darkBG: "#202c37",
        darkElement: "#2b3945",
        darkInputText: "#fafafa",
        darkText: "#ffffff",
        lightBG: "#fafafa",
        lightElement: "#ffffff",
        lightInputText: "#858585",
        lightText: "#111517",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
