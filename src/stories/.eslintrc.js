var eslintConfig = require('../.eslintrc.js');

module.exports = Object.assign({}, eslintConfig, {
  "rules": Object.assign({}, eslintConfig.rules, {
    //necessary to allow devDependencies required for storybook
    //in future this could be restricted to only the stories folder
    'import/no-extraneous-dependencies': ['error', {'devDependencies': true}]
  })
})
