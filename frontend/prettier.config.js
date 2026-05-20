/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  arrowParens: "always",
  bracketSpacing: true,
  endOfLine: "lf",
  plugins: ["prettier-plugin-tailwindcss"],
  printWidth: 80,
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  tailwindFunctions: ["cn", "clsx"],
  trailingComma: "all",
  useTabs: false,
};

export default config;
