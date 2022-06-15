
module.exports = {
  content: [
    "./app/src/main/assets/dist/index.html",
    "./views/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#20c466",
          200: "#20c466",
          300: "#20c466",
          400: "#20c466",
          500: "#20c466",
          600: "#20c466",
        }
      }
    },
    fontSize: {
      sm: ['16px', '20px'],
      base: ['18px', '24px'],
      lg: ['22px', '28px'],
      xl: ['26px', '32px'],
    }
  },
  plugins: [],
}