import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
     container:{
      center: true,
      padding:{
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "3rem",
        xl: "4rem",
        "2xl": "5rem",
      },
     },
     colors:{
      primary : '#000072',
      secondary : "#FF6347"
     }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
