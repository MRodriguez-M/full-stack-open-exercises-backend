/*import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([*/
  //{ files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  //{ files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.node } },
//]);

import globals from 'globals'
import js from '@eslint/js'

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node },
      ecmaVersion: 'latest',
    },
  },
  {
    ignores: ['dist/**'],
  },
]