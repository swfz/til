/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/templates/**/*.tsx", "./src/pages/**/*.{js,jsx,ts,tsx}", "./src/components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          muted: {
            50: "#F4F8FB",
            100: "#EAF1F6",
            200: "#CADBE9",
            300: "#A9C5DC",
            400: "#699AC2",
            500: "#296FA8",
            600: "#256497",
            700: "#194365",
            800: "#12324C",
            900: "#0C2132",
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
