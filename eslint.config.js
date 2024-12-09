import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  eslintConfigPrettier,
  
  {
    extends: ["prettier"],

    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },
];
