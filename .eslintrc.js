/** @type {import('eslint').Linter.Config} */
const eslintConfig = {
  root: true,

  env: {
    browser: true,
    node: true
  },

  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'react-app', 'prettier'],
  plugins: ['prettier'],
  parser: '@typescript-eslint/parser',
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-var-requires': 'off'
  }

  // globals: {
  //   $TZ_CONFIG: true,
  //   fiboSDK: true,
  //   PALifeOpen: true,
  //   PALibWX: true,
  //   wx: true
  // }
};

module.exports = eslintConfig;
