import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          50: '#f5f7ff',
          100: '#ebf0fe',
          200: '#dde5fe',
          300: '#c4d1fd',
          400: '#9eb3fc',
          500: '#7b93f9',
          600: '#5a6ef4',
          700: '#4d5ce5',
          800: '#3e4abc',
          900: '#363f99',
        },
      },
    },
  },
  plugins: [],
};

export default config;
