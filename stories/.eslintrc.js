var eslintConfig = require('../../.eslintrc.js');
//Note that this config is for the current folder only

module.exports = Object.assign({}, eslintConfig, {
  "rules": Object.assign({}, eslintConfig.rules, {
    //necessary to allow devDependencies required for storybook
    'import/no-extraneous-dependencies': ['error', {'devDependencies': true}]
  })
})
