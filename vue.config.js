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
  devServer: {
    before(app) {
      // Mock a route to mimic this upload result format:
      // {"audio_file_id":147,"duration_seconds":"4.803250","description":"xyz.wav","created_at":{"date":"2020-11-24 01:41:58","timezone_type":3,"timezone":"UTC"},"audio_uuid":"5fbc64e0c74e90.82972899"}"
      app.all('/audiofiles/upload', (req, res) => {
        const now = new Date().toISOString().split('T')
        const result = {
          audio_file_id: Math.floor(Math.random() * (1000 + 1)),
          duration_seconds: Math.random() * 10,
          description: req.query.flowFilename,
          created_at: {
            date: `${now[0]} ${now[1].split('.')[0]}`,
            timezone_type:3,
            timezone: "UTC"
          },
          audio_uuid: `${Math.random().toString(36).substr(2, 16)}.${Math.random().toString(36).substr(2, 10)}`
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      });
    },
  }
};

