/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    bg:{"50":"#faf5f7","100":"#ebd7de","200":"#dbb9c6","300":"#cb9bac","400":"#ba7e93","500":"#a96179","600":"#904f64","700":"#733f50","800":"#57303c","900":"#3a2028","950":"#1e1115"},
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        primary: "#c08c9d",
        primary_pl: "#c08c9da0",
        secondary: "#1e4676",
        secondary_pl: "#1e4676a0",
        thirth: "#081423",
        thirth_pl: "#081423a0",
        fourth: "#418c9d",
        fourth_pl: "#418c9da0",
      },
    },
    screens: {
      'xxs': '220px',
      'xs': '320px',
      'sm': '455px',
      'md': '768px',
      'xmd': '925px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
}