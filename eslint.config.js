import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactNative from 'eslint-plugin-react-native';
import babelParser from '@babel/eslint-parser';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';

export default [
  js.configs.recommended,
  reactRecommended,
  {
    files: ['src/**/*.{js,jsx}', 'App.js'],
    plugins: {
      react,
      'react-native': reactNative,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
];
