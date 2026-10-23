import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import chaiFriendly from 'eslint-plugin-chai-friendly';
import noOnlyTests from 'eslint-plugin-no-only-tests';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const consoleLogRule = process.env.NODE_ENV === 'production' ? ['error', { allow: ['warn', 'error'] }] : ['warn'];

// Port of @enspirit/eslint-config-node (eslintrc-only) to flat config
export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'src/@types/**'],
  },
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.mocha,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      '@stylistic': stylistic,
      'chai-friendly': chaiFriendly,
      'no-only-tests': noOnlyTests,
    },
    rules: {
      'prefer-template': 'warn',
      'curly': 'error',
      'prefer-arrow-callback': 'warn',
      'no-useless-escape': 'warn',
      'eqeqeq': 'error',
      'no-unused-expressions': 'off',
      'chai-friendly/no-unused-expressions': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-console': consoleLogRule,
      'no-debugger': 'error',
      'no-const-assign': 'error',
      // TypeScript already checks undefined identifiers, and knows about types
      'no-undef': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          'argsIgnorePattern': '^_',
          'varsIgnorePattern': '^_',
          'caughtErrorsIgnorePattern': '^_',
        },
      ],
      'no-only-tests/no-only-tests': process.env.NODE_ENV === 'test' ? 'error' : 'warn',

      '@stylistic/template-curly-spacing': ['error', 'never'],
      '@stylistic/no-multi-spaces': ['warn', {
        exceptions: {
          'Property': true,
          'VariableDeclarator': true,
          'ImportDeclaration': true,
        },
      }],
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/indent': ['error', 2, { SwitchCase: 1 }],
      '@stylistic/linebreak-style': ['error', 'unix'],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/array-bracket-spacing': ['error', 'never'],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/space-before-function-paren': ['error', {
        'anonymous': 'never',
        'named': 'never',
        'asyncArrow': 'always',
      }],
      '@stylistic/space-before-blocks': ['error', 'always'],
      '@stylistic/keyword-spacing': ['error', { 'before': true, 'after': true }],
      '@stylistic/space-infix-ops': ['error', { 'int32Hint': false }],
      '@stylistic/space-in-parens': ['error', 'never'],
      '@stylistic/arrow-spacing': ['error', { 'before': true, 'after': true }],
      '@stylistic/no-multiple-empty-lines': ['error', { 'max': 1 }],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
    },
  },
];
