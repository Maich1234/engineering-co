import next from "eslint-config-next";

/** eslint-config-next 16 exports a ready-made flat config array. */
const config = [
  ...next,
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },
];

export default config;
