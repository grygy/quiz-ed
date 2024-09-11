import orbitComponentsPreset from "@kiwicom/orbit-tailwind-preset";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@kiwicom/orbit-components/**/*.js", // adjust as necessary in monorepos
  ],
  theme: {
    extend: {
      fontFamily: {
        base: "var(--font-base)",
      },
    },
  },
  plugins: [],
  presets: [orbitComponentsPreset()],
};
export default config;
