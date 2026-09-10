import next from "eslint-config-next/core-web-vitals";
export default [
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
