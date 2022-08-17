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

      /**
       * Mock the flowjs-2.0.0 backend GET route to mimic the upload result format:
       * {
       *   'audio_file_id': 147,
       *   'duration_seconds': '4.803250',
       *   'description': 'xyz.wav',
       *   'created_at': {
       *     'date': '2020-11-24 01:41:58',
       *     'timezone_type': 3,
       *     'timezone': 'UTC'
       *   },
       *   'audio_uuid': '5fbc64e0c74e90.82972899',
       *   'uri': 'some_uri_value',
       * }
       * We can find a server implementation sample from:
       * - https://github.com/flowjs/flow-php-server
       * - https://packagist.org/packages/flowjs/flow-php-server
       */
      app.get('/audiofiles/upload', (req, res) => {
        // Simulate `unknown upload chunk` with 404 status for GET method
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({status: 'error', status_description: 'Unknown upload chunk'}))
      })
      /**
       * Mock the flowjs-2.0.0 backend POST route
       * Note, flowjs sends form-data as payload.
       * We can find a server implementation sample from:
       * - https://github.com/flowjs/flow-php-server
       * - https://packagist.org/packages/flowjs/flow-php-server
       */
      app.post('/audiofiles/upload', bodyParser.json(), (req, res) => {
        const now = new Date()
          .toISOString()
          .split('T')

        const audio_uuid = `${Math.random()
          .toString(36)
          .substr(2, 16)}.${Math.random()
          .toString(36)
          .substr(2, 10)}`
        // TODO (Nice to have): replace original_extension with `req.body.flowFilename.split('.').pop()` when we know how to parse form-data from POST request
        const original_extension = 'ogg'
        const result = {
          audio_file_id: Math.floor(Math.random() * (1000 + 1)),
          duration_seconds: Math.random() * 10,
          // TODO (Nice to have): replace description with `a description for ${req.body.flowFilename}` when we know how to parse form-data from POST request
          description: `{a description from backend}`,
          created_at: {
            date: `${now[0]} ${now[1].split('.')[0]}`,
            timezone_type: 3,
            timezone: 'UTC',
          },
          audio_uuid,
          uri: `https://your-domain/path/to/${audio_uuid}.${original_extension}`,
        }

        // wait a while just to see the status in UI
        setTimeout(function(){
          res.writeHead(200, {'Content-Type': 'application/json'})
          res.end(JSON.stringify(result))
        }, 2000)
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
      // To persist new flow via "new flow page"
      // In the success case, just echo the flow back
      app.post('/backend/flows', bodyParser.json(), (req, res) => {
        const container = req.body
        res.writeHead(200, { 'Content-Type': 'application/json' })
        console.debug('Simulating flow creation ...')
        res.end(JSON.stringify(container))
      })
      // To persist flow import via "import flow page"
      // In the success case, just echo the flow back: the response might have multiple data, but we fetch from createdContainer
      app.post('/backend/flows/import', bodyParser.json(), (req, res) => {
        const container = req.body
        console.debug('Simulating flow import ...')
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({message: 'anything', createdContainer: container}))
        // For dev: to simulate a failure, just uncomment the follow 02 lines, and comment the 02 previous lines for status 200
        // and re-serve the app. Then test an import.
        // res.writeHead(500, { 'Content-Type': 'application/json' })
        // res.end(JSON.stringify({error: 'simulating 500 error for flow import'}))
      })
      /**
       * To update existing flow
       * In the success case, just echo the flow back, but the backend could send back a validation result to display. It's available in:
       * vendor_metadata: {
       *   floip: {
       *     ui_metadata: {
       *       validation_results: {
       *         blocks: {block-uuid1: [{message: 'issue 1'}, {message: 'issue 2'}], ...},
       *         resources: {resource-uuid1: [{message: 'issue 1'}, {message: 'issue 2'}], ...}
       *       }
       *     }
       *   }
       * }
       */
      app.put('/backend/flows', bodyParser.json(), (req, res) => {
        const container = req.body
        res.writeHead(200, { 'Content-Type': 'application/json' })
        console.debug('Simulating flow update ...')
        if (container.flows?.length && container.flows[0].blocks?.length > 0) {
          console.debug('Simulating validation errors from backend on 1st flow\'s 1st block')
          let blockWithValidationIssue = container.flows[0].blocks[0]
          // Not all block type have resources, eg: Core.Case
          let resourceWithValidationIssue = container.flows[0]?.resources
          container.flows[0].vendor_metadata = {
            floip: {
              ui_metadata: {
                validation_results: {
                  blocks: {
                    [`${blockWithValidationIssue.uuid}`]: [
                      {
                        message: 'dummy-block-backend-validation-error-#1'
                      },
                      {
                        message: 'dummy-block-backend-validation-error-#2'
                      },
                    ]
                  },
                  resources: resourceWithValidationIssue.length ? {
                    [`${resourceWithValidationIssue[0].uuid}`]: [
                      {
                        message: 'dummy-resource-backend-validation-error-#1'
                      },
                      {
                        message: 'dummy-resource-backend-validation-error-#2'
                      },
                    ]
                  }: []
                }
              }
            }
          }
        } else {
          console.debug('No block found to simulate backend validation, on this container:', container)
        }
        res.end(JSON.stringify(container))
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
