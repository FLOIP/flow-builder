module.exports = {
  extends: '../.eslintrc.js',
  parserOptions: {
    project: '../tsconfig.json',
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    // necessary to allow devDependencies required for storybook
    'import/no-extraneous-dependencies': ['error', {devDependencies: true}],
  },
}
