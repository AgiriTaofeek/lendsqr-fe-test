import type { KnipConfig } from "knip";

const config: KnipConfig = {
  entry: [
    "src/main.tsx",
    // TanStack Router auto-generated files and route definitions
    // Knip automatically handles vite.config.ts and entry points often, but explicit is fine.
    // However, Knip warned about redundant patterns, so simplifying.
  ],
  project: ["src/**/*.{ts,tsx}"],
  ignore: [
    "**/*.d.ts",
    "src/mocks/**",
    "src/test/**",
    "**/*.test.{ts,tsx}",
    "**/*.spec.{ts,tsx}",
  ],
  ignoreDependencies: ["eslint-plugin-*", "@types/*"],
};

export default config;
