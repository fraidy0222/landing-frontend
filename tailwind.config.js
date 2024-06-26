import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
    "./src/pages/**/*.{js,ts,jsx,tsx,vue}",
  ],
  prefix: "tw-",
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-bullets": theme("colors.gray800"),
            li: {
              p: {
                margin: 0,
              },
            },
          },
        },
      }),
    },
    colors: {
      heroBg: "#D7F5DC",
      primary: "#20B15A",
      hoverPrimary: "#219F53",
      hoverPrimaryClaro: "rgba(181,215,189,0.68)",
      primaryClaro: "#D7F5DC",
      black: "#130F26",
      white: "#FFF",
      blue: "#3b82f6",
      gray: "#4b5563",
      gray50: "#f9fafb",
      gray100: "#f3f4f6",
      gray200: "#e5e7eb",
      gray300: "#d1d5db",
      gray400: "#9ca3af",
      gray500: "#6b7280",
      gray600: "#4b5563",
      gray800: "#374151",
      gray700: "#374151",
      gray900: "#111827",
      slate200: "#e2e8f0",
    },
  },

  plugins: [typography],
};
