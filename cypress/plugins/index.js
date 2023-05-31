// allow cypress to identify null coercing operator ?? and optional chaining operator ?.
const webpack = require('@cypress/webpack-preprocessor')
const babelOptions = require('../../babel.config.js')

module.exports = (on) => {
  const options = {
    webpackOptions: {
      resolve: {
        extensions: ['.js'],
      },
      module: {
        rules: [
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
