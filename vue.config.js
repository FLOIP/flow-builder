const path = require('path')

module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,

  configureWebpack: {
    resolve: {
      modules: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'public'),
        // path.resolve(__dirname, 'node_modules'),
      ],
    },
  },
  devServer: {
    before(app) {
      app.post('/audiofiles/upload', (req, res) => {
        res.send('hello');
      });
    },
  },
};
