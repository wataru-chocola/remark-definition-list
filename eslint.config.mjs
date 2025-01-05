// @ts-check
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

import * as pluginImport from 'eslint-plugin-import';

/** @type {Array<import("typescript-eslint").ConfigWithExtends>} */
export const globalIgnore = [
  {
    ignores: ['**/*.d.ts', '**/*.test.ts'],
  },
];

/** @type {Array<import("typescript-eslint").ConfigWithExtends>} */
export const jsLintConfigs = [
  js.configs.recommended,
  {
    files: ['**/*.js'],

    languageOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
    },
  },
  {
    files: ['**/*.mts', '**/*.ts', '**/*.tsx'],
    extends: [...tseslint.configs.recommendedTypeChecked, pluginImport.flatConfigs?.recommended],

    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import/resolver': {
        // You will also need to install and configure the TypeScript resolver
        // See also https://github.com/import-js/eslint-import-resolver-typescript#configuration
        typescript: true,
        node: true,
      },
    },
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/prefer-for-of': 'off',

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/no-redundant-type-constituents': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/dot-notation': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',

      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: false,
        },
      ],
      'import/no-duplicates': 'off',
    },
  },
];

export default tseslint.config(...globalIgnore, ...jsLintConfigs);
