const path = require('path')

module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  css: {
    extract: false,
    loaderOptions: {
      sass: {
        prependData: `
            @import './node_modules/bootstrap/scss/_functions.scss';
            @import './node_modules/bootstrap/scss/_variables.scss';
            @import './node_modules/bootstrap/scss/_mixins.scss';
            @import '@/scss/bootstrap3_compatibility.scss';
            `,
      },
    },
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

      // Mock call to record start, with this format
      // {uuid: ..., queue_id: ..., status: "in_progress", status_description: ..., description: ...}
      app.all('/calltorecord/start', (req, res) => {
        const result = {
          uuid: `${Math.random().toString(36).substr(2, 16)}.${Math.random().toString(36).substr(2, 10)}`,
          queue_id: Math.floor(Math.random() * (1000 + 1)),
          status: 'in_progress',
          status_description: '',
          description: 'test call to record.mp3',
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      });

      // Mock call to record status, with this format
      // { audio_file_id: "148", status: "new", description: "my descr", status_description: "", uuid: "5ffcdb4d0d8742.58454366", duration_seconds: "4.54", created_at: "2021-01-11 23:12:50", key: "block_1586301986853_15:45", queueId: "5ffcdb4d0d8742.58454366" }
      app.all('/calltorecord/status', (req, res) => {
        const now = new Date().toISOString().split('T')
        const result = {
          audio_file_id: Math.floor(Math.random() * (1000 + 1)),
          duration_seconds: Math.random() * 10,
          status: 'new',
          description: 'test call to record.mp3',
          uuid: req.query.uuid,
          key: req.query.key,
          queueId: req.query.queueId,
          created_at: `${now[0]} ${now[1].split('.')[0]}`,
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      });
    },
  }
};

