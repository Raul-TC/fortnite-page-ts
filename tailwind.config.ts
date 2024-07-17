import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-header': '#18181C',
        'bg-body': '#101014',
        'yellowFortnite': '#F7FF19'
      }

    },
  },
  plugins: [],
};
export default config;
