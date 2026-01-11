/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pink: {
          500: "#ff006e",
          600: "#ff1980",
        },
        purple: {
          900: "#3d0066",
        },
        dark: {
          50: "#f5f5f5",
          900: "#0a0a0a",
          950: "#050505",
        },
      },
      backgroundImage: {
        "gradient-purple-pink":
          "linear-gradient(135deg, #3d0066 0%, #ff006e 100%)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
};
