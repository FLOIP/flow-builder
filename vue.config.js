const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  css: {
    extract: true,
  },
  configureWebpack: {
    resolve: {
      modules: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'public'),
        // path.resolve(__dirname, 'node_modules'),
      ],
    },
    module: {
      rules: [
        {
          test: require('path').resolve(__dirname, 'node_modules/leader-line/'),
          use: [{
            loader: 'skeleton-loader',
            options: {procedure: content => `${content}export default LeaderLine`}
          }]
        }
      ]
    }
  },
  devServer: {
    before(app) {

      //webpack dev server doesn't accept posts by default but we want stub routes for testing
      //https://stackoverflow.com/questions/47442543/how-do-i-get-webpack-dev-server-to-accept-post-requests
      const bodyParser = require('body-parser')
      app.use(cookieParser())

      // use bodyParser for axios request
      app.use(bodyParser.urlencoded({ extended: true }))
      app.use(bodyParser.json())

      // Mock a route to mimic this upload result format:
      // {
      //   'audio_file_id': 147,
      //   'duration_seconds': '4.803250',
      //   'description': 'xyz.wav',
      //   'created_at': {
      //     'date': '2020-11-24 01:41:58',
      //     'timezone_type': 3,
      //     'timezone': 'UTC'
      //   },
      //   'audio_uuid': '5fbc64e0c74e90.82972899',
      //   'uri': 'some_uri_value',
      // }
      app.all('/audiofiles/upload', (req, res) => {
        // Simulate failed upload if we upload a file with `failure-test` text
        if (req.query.flowFilename.includes('failure-test')) {
          res.writeHead(500, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({message: 'failed upload'}))
        } else {
          const now = new Date()
            .toISOString()
            .split('T')

          const audio_uuid = `${Math.random()
            .toString(36)
            .substr(2, 16)}.${Math.random()
            .toString(36)
            .substr(2, 10)}`
          const original_extension = req.query.flowFilename.split('.').pop()
          const result = {
            audio_file_id: Math.floor(Math.random() * (1000 + 1)),
            duration_seconds: Math.random() * 10,
            description: `a description for ${req.query.flowFilename}`,
            created_at: {
              date: `${now[0]} ${now[1].split('.')[0]}`,
              timezone_type: 3,
              timezone: 'UTC',
            },
            audio_uuid,
            uri: `https://your-domain/path/to/${audio_uuid}.${original_extension}`,
          }
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify(result))
        }
      })
      // Returns a flow container. The first flow is the active flow.
      // (Other flows are there because they are nested in this first flow
      // ...and referenced by UUID I think)
      app.get('/backend/flows/:id', (req, res) => {
        try {
          const flow = fs.readFileSync(`src/store/builder/${req.params.id}-flow.json`)
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(flow)
        } catch (err) {
          res.writeHead(404, { 'Content-Type': 'application/json' })
          res.end("Flow not found")
        }
      })
      //In the success case, just echo the flow back
      app.post('/backend/flows', bodyParser.json(), (req, res) => {
        const flow = req.body
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(flow))
      })
      //In the success case, just echo the flow back
      app.put('/backend/flows', bodyParser.json(), (req, res) => {
        const flow = req.body
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(flow))
      })

      //In the success case, just echo the language back
      app.post('/backend/languages', bodyParser.json(), (req, res) => {
        const language = req.body
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(language))
      })

      // Mock call to record start, with this format
      // {uuid: ..., queue_id: ..., status: "in_progress", status_description: ..., description: ...}
      app.all('/calltorecord/start', (req, res) => {
        const result = {
          uuid: `${Math.random().toString(36).substr(2, 16)}.${Math.random().toString(36).substr(2, 10)}`,
          queue_id: Math.floor(Math.random() * (1000 + 1)),
          status: 'in_progress',
          status_description: '',
          description: 'Test call-to-record audio',
          recorder_id: `${req.body.recorder_name.replace(/[\W_]+/g, '')}-${req.body.recorder_phonenumber}`,
        }
        res.cookie(result.uuid, 'in_progress')
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(result))
      })

      // Mock call to record status, with this format
      // { audio_file_id: "148", status: "new", description: "my descr", status_description: "", uuid: "5ffcdb4d0d8742.58454366", duration_seconds: "4.54", created_at: "2021-01-11 23:12:50", key: "block_1586301986853_15:45", queueId: "5ffcdb4d0d8742.58454366" }
      app.all('/calltorecord/status', (req, res) => {
        const now = new Date().toISOString().split('T')
        const result = {
          audio_file_id: Math.floor(Math.random() * (1000 + 1)),
          duration_seconds: Math.random() * 10,
          status: req.cookies[req.body.uuid],
          description: 'Test call-to-record audio',
          uuid: req.body.uuid,
          key: req.body.key,
          queueId: req.body.queueId,
          created_at: `${now[0]} ${now[1].split('.')[0]}`,
        }
        if (req.cookies[req.body.uuid] !== 'new') {
          // `new` status tells the UI we had successful `recorded` audio
          res.cookie(result.uuid, 'new')
        }
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(result))
      })
    },
  },
}
