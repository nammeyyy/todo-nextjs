/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ["Comfortaa", "system-ui"],
        },
        colors: {
          blue: {
            500: '#4a6fa5',
            600: '#166088',
            700: '#4a6fa5',
          }
        }
      },
    },
    plugins: [],
  };