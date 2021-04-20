module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    parser: '@typescript-eslint/parser'
  },
  parser: 'vue-eslint-parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'plugin:vue/vue3-recommended'
  ],

  rules: {
    'no-redeclare': 0,
    'no-unused-vars': 0,
    'semi': ['error', 'never'],
    '@typescript-eslint/no-redeclare': [2],
    '@typescript-eslint/no-unused-vars': [2, {args: 'none'}]
  },

  globals: {
    Vue: true,
    Router: true,
  }
}
