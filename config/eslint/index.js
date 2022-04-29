const generatePlugin = require('./lib/helpers')

module.exports = generatePlugin('@viamo', {
  recommended: {
    'vue-root-class-name': require('./lib/rules/vue-root-class-name')
  }
})
