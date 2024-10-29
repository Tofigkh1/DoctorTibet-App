// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./Shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./Components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        clientButtonGreen: "#1BC768",
        grayText2: "#4F4F4F",
        whiteLight1: "#F3F4F6",
        mainRedLight: "rgba(214, 54, 38, 0.3)",
        whiteLight3: "#BDBDBD",
        mainRed: "#D63626",
        white: "#FFFFFF",
        lightRed: "#EB5757",
        green: "#066839",
        black: "#181617",
        customgray: "#D2D2D4",
        custompurple: "#C035A2",
        categorycolor: "#5A5B70",
        fontcolorhow: "#828282",
        cardColor: "#F3F4F6",
        textColorGreen: "#6FCF97",
        overlayColorGreen: "#A0D6B4",
        comitColorText: "#043CAA",
        FooterColor: "#043CAA",
        medicineFont: "#fcfafa",
        adminInfoBox: "#121212",
        goldText: "#e5b95e"
    },
  },
  },
  plugins: [],
  safelist: [
    'bg-clientButtonGreen',
    'hover:bg-clientButtonGreen',
    'text-white',
    'hover:text-white',
  ],
}
