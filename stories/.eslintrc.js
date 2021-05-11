module.exports = {
  extends: '../.eslintrc.js',
  rules: {
    // necessary to allow devDependencies required for storybook
    'import/no-extraneous-dependencies': ['error', {devDependencies: true}],
  },
}
