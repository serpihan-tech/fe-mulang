/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        pri: {
          main:"#0841E2",
          border: "#ADC0F5",
          hover: "#0636BC",
          pressed: "#03164B",
          surface: "#CED9F9",
        },
        sec: {
          main:"#FFCF43",
          border: "#FFEFC0",
          hover: "#D4AC38",
          pressed: "#806721",
          surface: "#FFF5D9",
        },
        err: {
          main:"#DC1010",
          border: "#F3AFAF",
          hover: "#B70D0D",
          pressed: "#6E0808",
          surface: "#F8CFCF",
        },
        warn: {
          main:"#BF8C16",
          border: "#E9D9B1",
          hover: "#9F7513",
          pressed: "#5F460B",
          surface: "#F2E8D1",
        },
        success: {
          main:"#0E9035",
          border: "#AEDABB",
          hover: "#0B782C",
          pressed: "#07481A",
          surface: "#CEE8D6",
        },
        netral: {
          0:"#FFFFFF",
          10: "#CCCCCC",
          20: "#AAAAAA",
          30: "#7F7F7F",
          40: "#555555",
          50: "#2A2A2A",
          100: "#000000"
        },
        dark_net: {
          pri: "#181818", 
          sec: "#222222", 
          ter: "#2C2C2C", 
          quar: "#3D3D3D", 
          quin: "#4F4F4F", 
          text: "#E0E0E0", 
          text_sec: "#B0B0B0", 
        },
      },
    },
  },
  plugins: [],
};
