module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': 0,
    'import/no-dynamic-require': 0,
    'global-require': 0,
    'max-len': 'off',
    'arrow-body-style': 'off',
    'vuejs-accessibility/click-events-have-key-events': 'off',
    'object-curly-newline': [
      'error',
      {
        "ImportDeclaration": 'never',
      }
    ],
    "no-restricted-syntax": ["error", "ForInStatement", "LabeledStatement", "WithStatement"]
  },
};
