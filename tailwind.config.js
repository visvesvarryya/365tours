module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      colors: {
        brand: {
          50:  "#eef6f7",
          100: "#dcebed",
          200: "#b9d8db",
          300: "#8ab9bf",
          400: "#46929d",
          500: "#23686f",
          600: "#1f5f66",
          700: "#1b524f",
          800: "#173f3f",
          900: "#132f33",
        },
      },
    },
  },
  plugins: [],
};
