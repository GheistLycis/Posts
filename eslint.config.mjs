import { FlatCompat } from '@eslint/eslintrc';
import pluginPrettier from 'eslint-plugin-prettier';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  {
    ignores: [
      '.next',
      'node_modules',
      'public',
      'coverage',
      '.github',
      '.husky',
    ],
  },
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'react/display-name': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_$',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_$',
          destructuredArrayIgnorePattern: '^_$',
          varsIgnorePattern: '^_$',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
];

export default eslintConfig;
