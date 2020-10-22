const path = require('path')

module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  publicPath: '/',
  chainWebpack: config => {
    config.optimization.delete('splitChunks')
  },
  productionSourceMap: false,
  css: {
      extract: false,
  },
  configureWebpack: {
    optimization: {
        splitChunks: false
    },
    resolve: {
      modules: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'public'),
        // path.resolve(__dirname, 'node_modules'),
      ],
    },
  },
}
