import next from "eslint-config-next/core-web-vitals";
const config = [
  ...next,
  {
    ignores: [
      ".next/**",
      "next-env.d.ts",
      "test-results/**",
      "playwright-report/**",
    ],
  },
];
export default config;
