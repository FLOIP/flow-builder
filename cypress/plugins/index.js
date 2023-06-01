// allow cypress to identify null coercing operator ?? and optional chaining operator ?.
const webpack = require('@cypress/webpack-preprocessor')
const vueLoader = require('vue-loader');
const babelOptions = require('../../babel.config.js')

module.exports = (on) => {
  const options = {
    webpackOptions: {
      resolve: {
        extensions: ['.js', '.vue'],
      },
      module: {
        rules: [
          {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: vueLoader.vueLoaderConfig(),
          },
          {
            test: /\.js$/,
            loader: 'babel-loader',
            options: babelOptions,
          },
        ],
      },
    },
  }

  on('file:preprocessor', webpack(options))
}
