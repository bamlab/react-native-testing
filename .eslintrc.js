module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended', // the set of rules which are recommended for all projects by the ESLint Team
    'plugin:@typescript-eslint/eslint-recommended', //
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/plugin
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    '@react-native-community',
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    project: './tsconfig.json',
    ecmaFeatures: {
      modules: true,
    },
  },
  env: {
    jest: true,
  },
  rules: {
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
};
