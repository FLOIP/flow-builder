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
      //fetch a flow (TODO - and associated resources?) by uuid
      //"Fetch the flow using a newly configured GET route that will return something in the package/container spec, so we’ll have related resources on this response as well as a list of related flows (likely use-case is nested flows). Create a stub route in flow-builder for this for testing purposes."
      app.get('/flows/:id/fetch', (req, res) => {
        //const flowContext = require('./blank-flow.json')
        //const flow = flowContext.flows[0]
        res.end(req.params.id);
      });
      //"For now, let’s persist something in the shape of {flows, firstFlowId, resources}. This should be the format of the object we send in the post"
      app.post('/flows/persist', (req, res) => {
        //echo back the flow was posted
        //TODO - What about persisting resources..?
        res.end(JSON.stringify(req.params));
      });
      app.post('/flows/persist/fail', (req, res) => {
        //route for demonstrating failure
        //TODO - status code
        res.end(null);
      });
    },
  }
};

