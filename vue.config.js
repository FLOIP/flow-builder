const path = require('path')

module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  css: {
    extract: false
  },
  configureWebpack: {
    resolve: {
      modules: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'public'),
        // path.resolve(__dirname, 'node_modules'),
      ],
    },
  },
}
