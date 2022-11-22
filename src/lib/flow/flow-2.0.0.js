/**
 * @license MIT
 */
(function (window, document, undefined) {
  /**
   * Flow.js is a library providing multiple simultaneous, stable and
   * resumable uploads via the HTML5 File API.
   * @name
   * @param [opts]
   * @param {number} [opts.chunkSize]
   * @param {bool} [opts.forceChunkSize]
   * @param {number} [opts.simultaneousUploads]
   * @param {bool} [opts.singleFile]
   * @param {string} [opts.fileParameterName]
   * @param {number} [opts.progressCallbacksInterval]
   * @param {number} [opts.speedSmoothingFactor]
   * @param {Object|Function} [opts.query]
   * @param {Object} [opts.headers]
   * @param {bool} [opts.withCredentials]
   * @param {Function} [opts.preprocess]
   * @param {string} [opts.method]
   * @param {bool} [opts.prioritizeFirstAndLastChunk]
   * @param {string} [opts.target]
   * @param {number} [opts.maxChunkRetries]
   * @param {number} [opts.chunkRetryInterval]
   * @param {Array.<number>} [opts.permanentErrors]
   * @param {Function} [opts.generateUniqueIdentifier]
   * @constructor
   */
  function Flow(opts) {
    /**
     * Library version
     * @type {string}
     */
    this.version = '2.0.0-beta2'

    /**
     * Supported by browser?
     * @type {boolean}
     */
    this.support = (
      typeof File !== 'undefined'
      && typeof Blob !== 'undefined'
      && typeof FileList !== 'undefined'
      && (
        !!Blob.prototype.slice || !!Blob.prototype.webkitSlice || !!Blob.prototype.mozSlice
        || false
      ) // slicing files support
    )

    if (!this.support) {
      return
    }

    /**
     * List of FlowFile objects
     * @type {Array.<FlowFile>}
     */
    this.files = []

    /**
     * Default options for flow.js
     * @type {Object}
     */
    this.defaults = {
      chunkSize: 1024 * 1024,
      forceChunkSize: false,
      simultaneousUploads: 3,
      singleFile: false,
      fileParameterName: 'file',
      progressCallbacksInterval: 500,
      speedSmoothingFactor: 0.1,
      query: {},
      headers: {},
      withCredentials: false,
      preprocess: null,
      method: 'multipart',
      prioritizeFirstAndLastChunk: false,
      target: '/',
      testChunks: true,
      generateUniqueIdentifier: null,
      maxChunkRetries: 0,
      chunkRetryInterval: null,
      permanentErrors: [404, 415, 500, 501],
    }

    /**
     * Current options
     * @type {Object}
     */
    this.opts = {}

    /**
     * List of events:
     *  even indexes stand for event names
     *  odd indexes stands for event callbacks
     * @type {Array}
     */
    this.events = []

    const $ = this

    /**
     * On drop event
     * @function
     * @param {MouseEvent} event
     */
    this.onDrop = function (event) {
      event.stopPropagation()
      event.preventDefault()
      const dataTransfer = event.dataTransfer
      if (dataTransfer.items && dataTransfer.items[0].webkitGetAsEntry) {
        $.webkitReadDataTransfer(event)
      } else {
        $.addFiles(dataTransfer.files, event)
      }
    }

    /**
     * Prevent default
     * @function
     * @param {MouseEvent} event
     */
    this.preventEvent = function (event) {
      event.preventDefault()
    }

    /**
     * Current options
     * @type {Object}
     */
    this.opts = Flow.extend({}, this.defaults, opts || {})
  }

  Flow.prototype = {
    /**
     * Set a callback for an event, possible events:
     * fileSuccess(file), fileProgress(file), fileAdded(file, event),
     * fileRetry(file), fileError(file, message), complete(),
     * progress(), error(message, file), pause()
     * @function
     * @param {string} event
     * @param {Function} callback
     */
    on(event, callback) {
      this.events.push(event.toLowerCase(), callback)
    },

    /**
     * Fire an event
     * @function
     * @param {string} event event name
     * @param {...} args arguments of a callback
     * @return {bool} value is false if at least one of the event handlers which handled this event
     * returned false. Otherwise it returns true.
     */
    fire(event, args) {
      // `arguments` is an object, not array, in FF, so:
      args = Array.prototype.slice.call(arguments)
      // Find event listeners, and support pseudo-event `catchAll`
      event = event.toLowerCase()
      let preventDefault = false
      for (let i = 0; i <= this.events.length; i += 2) {
        if (this.events[i] === event) {
          preventDefault = this.events[i + 1].apply(this, args.slice(1)) === false || preventDefault
        }
        if (this.events[i] === 'catchall') {
          preventDefault = this.events[i + 1].apply(null, args) === false || preventDefault
        }
      }
      return !preventDefault
    },

    /**
     * Read webkit dataTransfer object
     * @param event
     */
    webkitReadDataTransfer(event) {
      const $ = this
      let queue = event.dataTransfer.items.length
      const files = []
      each(event.dataTransfer.items, (item) => {
        const entry = item.webkitGetAsEntry()
        if (!entry) {
          return
        }
        if (entry.isFile) {
          // due to a bug in Chrome's File System API impl - #149735
          fileReadSuccess(item.getAsFile(), entry.fullPath)
        } else {
          entry.createReader()
            .readEntries(readSuccess, readError)
        }
      })

      function readSuccess(entries) {
        queue += entries.length
        each(entries, (entry) => {
          if (entry.isFile) {
            const fullPath = entry.fullPath
            entry.file((file) => {
              fileReadSuccess(file, fullPath)
            }, readError)
          } else if (entry.isDirectory) {
            entry.createReader()
              .readEntries(readSuccess, readError)
          }
        })
        decrement()
      }

      function fileReadSuccess(file, fullPath) {
        // relative path should not start with "/"
        file.relativePath = fullPath.substring(1)
        files.push(file)
        decrement()
      }

      function readError(fileError) {
        throw fileError
      }

      function decrement() {
        if (--queue == 0) {
          $.addFiles(files, event)
        }
      }
    },

    /**
     * Generate unique identifier for a file
     * @function
     * @param {FlowFile} file
     * @returns {string}
     */
    generateUniqueIdentifier(file) {
      const custom = this.opts.generateUniqueIdentifier
      if (typeof custom === 'function') {
        return custom(file)
      }
      // Some confusion in different versions of Firefox
      const relativePath = file.relativePath || file.webkitRelativePath || file.fileName || file.name
      return `${file.size}-${relativePath.replace(/[^0-9a-zA-Z_-]/img, '')}`
    },

    /**
     * Upload next chunk from the queue
     * @function
     * @returns {boolean}
     * @private
     */
    uploadNextChunk(preventEvents) {
      // In some cases (such as videos) it's really handy to upload the first
      // and last chunk of a file quickly; this let's the server check the file's
      // metadata and determine if there's even a point in continuing.
      let found = false
      if (this.opts.prioritizeFirstAndLastChunk) {
        each(this.files, (file) => {
          if (!file.paused && file.chunks.length
            && file.chunks[0].status() === 'pending'
            && file.chunks[0].preprocessState === 0) {
            file.chunks[0].send()
            found = true
            return false
          }
          if (!file.paused && file.chunks.length > 1
            && file.chunks[file.chunks.length - 1].status() === 'pending'
            && file.chunks[0].preprocessState === 0) {
            file.chunks[file.chunks.length - 1].send()
            found = true
            return false
          }
        })
        if (found) {
          return found
        }
      }

      // Now, simply look for the next, best thing to upload
      each(this.files, (file) => {
        if (!file.paused) {
          each(file.chunks, (chunk) => {
            if (chunk.status() === 'pending' && chunk.preprocessState === 0) {
              chunk.send()
              found = true
              return false
            }
          })
        }
        if (found) {
          return false
        }
      })
      if (found) {
        return true
      }

      // The are no more outstanding chunks to upload, check is everything is done
      let outstanding = false
      each(this.files, (file) => {
        if (!file.isComplete()) {
          outstanding = true
          return false
        }
      })
      if (!outstanding && !preventEvents) {
        // All chunks have been uploaded, complete
        this.fire('complete')
      }
      return false
    },

    /**
     * Assign a browse action to one or more DOM nodes.
     * @function
     * @param {Element|Array.<Element>} domNodes
     * @param {boolean} isDirectory Pass in true to allow directories to
     * @param {boolean} singleFile prevent multi file upload
     * be selected (Chrome only).
     */
    assignBrowse(domNodes, isDirectory, singleFile) {
      if (typeof domNodes.length === 'undefined') {
        domNodes = [domNodes]
      }

      // We will create an <input> and overlay it on the domNode
      // (crappy, but since HTML5 doesn't have a cross-browser.browse() method
      // we haven't a choice. FF4+ allows click() for this though:
      // https://developer.mozilla.org/en/using_files_from_web_applications)
      each(domNodes, function (domNode) {
        let input
        if (domNode.tagName === 'INPUT' && domNode.type === 'file') {
          input = domNode
        } else {
          input = document.createElement('input')
          input.setAttribute('type', 'file')
          // input fill entire dom node
          extend(domNode.style, {
            // eslint-disable-next-line line-comment-position
            display: 'block', // EDITED BY SEAN, from inline-block to block, since we're using this in a Bootstrap button dropdown
            position: 'relative',
            overflow: 'hidden',
            verticalAlign: 'top',
          })
          // in Opera only 'browse' button
          // is clickable and it is located at
          // the right side of the input
          extend(input.style, {
            position: 'absolute',
            top: 0,
            right: 0,
            fontFamily: 'Arial',
            // 4 persons reported this, the max values that worked for them were 243, 236, 236, 118
            fontSize: '118px',
            margin: 0,
            padding: 0,
            opacity: 0,
            cursor: 'pointer',
          })
          domNode.appendChild(input)
        }
        if (!this.opts.singleFile && !singleFile) {
          input.setAttribute('multiple', 'multiple')
        }
        if (isDirectory) {
          input.setAttribute('webkitdirectory', 'webkitdirectory')
        }
        // When new files are added, simply append them to the overall list
        const $ = this
        input.addEventListener('change', (e) => {
          $.addFiles(e.target.files, e)
          e.target.value = ''
        }, false)
      }, this)
    },

    /**
     * Assign one or more DOM nodes as a drop target.
     * @function
     * @param {Element|Array.<Element>} domNodes
     */
    assignDrop(domNodes) {
      if (typeof domNodes.length === 'undefined') {
        domNodes = [domNodes]
      }
      each(domNodes, function (domNode) {
        domNode.addEventListener('dragover', this.preventEvent, false)
        domNode.addEventListener('dragenter', this.preventEvent, false)
        domNode.addEventListener('drop', this.onDrop, false)
      }, this)
    },

    /**
     * Un-assign drop event from DOM nodes
     * @function
     * @param domNodes
     */
    unAssignDrop(domNodes) {
      if (typeof domNodes.length === 'undefined') {
        domNodes = [domNodes]
      }
      each(domNodes, function (domNode) {
        domNode.removeEventListener('dragover', this.preventEvent)
        domNode.removeEventListener('dragenter', this.preventEvent)
        domNode.removeEventListener('drop', this.onDrop)
      }, this)
    },

    /**
     * Returns a boolean indicating whether or not the instance is currently
     * uploading anything.
     * @function
     * @returns {boolean}
     */
    isUploading() {
      let uploading = false
      each(this.files, (file) => {
        if (file.isUploading()) {
          uploading = true
          return false
        }
      })
      return uploading
    },

    /**
     * Start or resume uploading.
     * @function
     */
    upload() {
      // Make sure we don't start too many uploads at once
      if (this.isUploading()) {
        return
      }
      // Kick off the queue
      this.fire('uploadStart')
      let started = false
      for (let num = 1; num <= this.opts.simultaneousUploads; num++) {
        started = this.uploadNextChunk(true) || started
      }
      if (!started) {
        this.fire('complete')
      }
    },

    /**
     * Resume uploading.
     * @function
     */
    resume() {
      each(this.files, (file) => {
        file.resume()
      })
    },

    /**
     * Pause uploading.
     * @function
     */
    pause() {
      each(this.files, (file) => {
        file.pause()
      })
    },

    /**
     * Cancel upload of all FlowFile objects and remove them from the list.
     * @function
     */
    cancel() {
      for (let i = this.files.length - 1; i >= 0; i--) {
        this.files[i].cancel()
      }
    },

    /**
     * Returns a number between 0 and 1 indicating the current upload progress
     * of all files.
     * @function
     * @returns {number}
     */
    progress() {
      let totalDone = 0
      let totalSize = 0
      // Resume all chunks currently being uploaded
      each(this.files, (file) => {
        totalDone += file.progress() * file.size
        totalSize += file.size
      })
      return totalSize > 0 ? totalDone / totalSize : 0
    },

    /**
     * Add a HTML5 File object to the list of files.
     * @function
     * @param {File} file
     * @param {Event} [event] event is optional
     */
    addFile(file, event) {
      this.addFiles([file], event)
    },

    /**
     * Add a HTML5 File object to the list of files.
     * @function
     * @param {FileList|Array} fileList
     * @param {Event} [event] event is optional
     */
    addFiles(fileList, event) {
      const files = []
      each(fileList, function (file) {
        // Directories have size `0` and name `.`
        // Ignore already added files
        if (!(file.size % 4096 === 0 && (file.name === '.' || file.fileName === '.'))
          && !this.getFromUniqueIdentifier(this.generateUniqueIdentifier(file))) {
          const f = new FlowFile(this, file)
          if (this.fire('fileAdded', f, event)) {
            files.push(f)
          }
        }
      }, this)
      if (this.fire('filesAdded', files, event)) {
        each(files, function (file) {
          if (this.opts.singleFile && this.files.length > 0) {
            this.removeFile(this.files[0])
          }
          this.files.push(file)
        }, this)
      }
      this.fire('filesSubmitted', files, event)
    },

    /**
     * Cancel upload of a specific FlowFile object from the list.
     * @function
     * @param {FlowFile} file
     */
    removeFile(file) {
      for (let i = this.files.length - 1; i >= 0; i--) {
        if (this.files[i] === file) {
          this.files.splice(i, 1)
          file.abort()
        }
      }
    },

    /**
     * Look up a FlowFile object by its unique identifier.
     * @function
     * @param {string} uniqueIdentifier
     * @returns {boolean|FlowFile} false if file was not found
     */
    getFromUniqueIdentifier(uniqueIdentifier) {
      let ret = false
      each(this.files, (file) => {
        if (file.uniqueIdentifier === uniqueIdentifier) {
          ret = file
        }
      })
      return ret
    },

    /**
     * Returns the total size of all files in bytes.
     * @function
     * @returns {number}
     */
    getSize() {
      let totalSize = 0
      each(this.files, (file) => {
        totalSize += file.size
      })
      return totalSize
    },
  }

  /**
   * FlowFile class
   * @name FlowFile
   * @param {Flow} flowObj
   * @param {File} file
   * @constructor
   */
  function FlowFile(flowObj, file) {
    /**
     * Reference to parent Flow instance
     * @type {Flow}
     */
    this.flowObj = flowObj

    /**
     * Reference to file
     * @type {File}
     */
    this.file = file

    /**
     * File name. Some confusion in different versions of Firefox
     * @type {string}
     */
    this.name = file.fileName || file.name

    /**
     * File size
     * @type {number}
     */
    this.size = file.size

    /**
     * Relative file path
     * @type {string}
     */
    this.relativePath = file.relativePath || file.webkitRelativePath || this.name

    /**
     * File unique identifier
     * @type {string}
     */
    this.uniqueIdentifier = flowObj.generateUniqueIdentifier(file)

    /**
     * List of chunks
     * @type {Array.<FlowChunk>}
     */
    this.chunks = []

    /**
     * Indicated if file is paused
     * @type {boolean}
     */
    this.paused = false

    /**
     * Indicated if file has encountered an error
     * @type {boolean}
     */
    this.error = false

    /**
     * Average upload speed
     * @type {number}
     */
    this.averageSpeed = 0

    /**
     * Current upload speed
     * @type {number}
     */
    this.currentSpeed = 0

    /**
     * Date then progress was called last time
     * @type {number}
     * @private
     */
    this._lastProgressCallback = Date.now()

    /**
     * Previously uploaded file size
     * @type {number}
     * @private
     */
    this._prevUploadedSize = 0

    /**
     * Holds previous progress
     * @type {number}
     * @private
     */
    this._prevProgress = 0

    this.bootstrap()
  }

  FlowFile.prototype = {
    /**
     * Update speed parameters
     * @link http://stackoverflow.com/questions/2779600/how-to-estimate-download-time-remaining-accurately
     * @function
     */
    measureSpeed() {
      const smoothingFactor = this.flowObj.opts.speedSmoothingFactor
      const timeSpan = Date.now() - this._lastProgressCallback
      const uploaded = this.sizeUploaded()
      // Prevent negative upload speed after file upload resume
      this.currentSpeed = Math.max((uploaded - this._prevUploadedSize) / timeSpan * 1000, 0)
      this.averageSpeed = smoothingFactor * this.currentSpeed + (1 - smoothingFactor) * this.averageSpeed
      this._prevUploadedSize = uploaded
    },

    /**
     * For internal usage only.
     * Callback when something happens within the chunk.
     * @function
     * @param {string} event can be 'progress', 'success', 'error' or 'retry'
     * @param {string} message
     */
    chunkEvent(event, message) {
      switch (event) {
        case 'progress':
          if (Date.now() - this._lastProgressCallback
            < this.flowObj.opts.progressCallbacksInterval) {
            break
          }
          this.measureSpeed()
          this.flowObj.fire('fileProgress', this)
          this.flowObj.fire('progress')
          this._lastProgressCallback = Date.now()
          break
        case 'error':
          this.error = true
          this.abort(true)
          this.flowObj.fire('fileError', this, message)
          this.flowObj.fire('error', message, this)
          break
        case 'success':
          if (this.error) {
            return
          }
          this.flowObj.fire('fileProgress', this)
          this.flowObj.fire('progress')
          if (this.isComplete()) {
            this.flowObj.fire('fileSuccess', this, message)
          }
          break
        case 'retry':
          this.flowObj.fire('fileRetry', this)
          break
      }
    },

    /**
     * Pause file upload
     * @function
     */
    pause() {
      this.paused = true
      this.abort()
    },

    /**
     * Resume file upload
     * @function
     */
    resume() {
      this.paused = false
      this.flowObj.upload()
    },

    /**
     * Abort current upload
     * @function
     */
    abort(reset) {
      this.currentSpeed = 0
      this.averageSpeed = 0
      const chunks = this.chunks
      if (reset) {
        this.chunks = []
      }
      each(chunks, function (c) {
        if (c.status() === 'uploading') {
          c.abort()
          this.flowObj.uploadNextChunk()
        }
      }, this)
    },

    /**
     * Cancel current upload and remove from a list
     * @function
     */
    cancel() {
      this.flowObj.removeFile(this)
    },

    /**
     * Retry aborted file upload
     * @function
     */
    retry() {
      this.bootstrap()
      this.flowObj.upload()
    },

    /**
     * Clear current chunks and slice file again
     * @function
     */
    bootstrap() {
      this.abort(true)
      this.error = false
      // Rebuild stack of chunks from file
      this._prevProgress = 0
      const round = this.flowObj.opts.forceChunkSize ? Math.ceil : Math.floor
      const chunks = Math.max(
        round(this.file.size / this.flowObj.opts.chunkSize), 1,
      )
      for (let offset = 0; offset < chunks; offset++) {
        this.chunks.push(
          new FlowChunk(this.flowObj, this, offset),
        )
      }
    },

    /**
     * Get current upload progress status
     * @function
     * @returns {number} from 0 to 1
     */
    progress() {
      if (this.error) {
        return 1
      }
      if (this.chunks.length === 1) {
        this._prevProgress = Math.max(this._prevProgress, this.chunks[0].progress())
        return this._prevProgress
      }
      // Sum up progress across everything
      let bytesLoaded = 0
      each(this.chunks, (c) => {
        // get chunk progress relative to entire file
        bytesLoaded += c.progress() * (c.endByte - c.startByte)
      })
      const percent = bytesLoaded / this.size
      // We don't want to lose percentages when an upload is paused
      this._prevProgress = Math.max(this._prevProgress, percent > 0.999 ? 1 : percent)
      return this._prevProgress
    },

    /**
     * Indicates if file is being uploaded at the moment
     * @function
     * @returns {boolean}
     */
    isUploading() {
      let uploading = false
      each(this.chunks, (chunk) => {
        if (chunk.status() === 'uploading') {
          uploading = true
          return false
        }
      })
      return uploading
    },

    /**
     * Indicates if file is has finished uploading and received a response
     * @function
     * @returns {boolean}
     */
    isComplete() {
      let outstanding = false
      each(this.chunks, (chunk) => {
        const status = chunk.status()
        if (status === 'pending' || status === 'uploading' || chunk.preprocessState === 1) {
          outstanding = true
          return false
        }
      })
      return !outstanding
    },

    /**
     * Count total size uploaded
     * @function
     * @returns {number}
     */
    sizeUploaded() {
      let size = 0
      each(this.chunks, (chunk) => {
        // can't sum only chunk.loaded values, because it is bigger than chunk size
        if (chunk.status() === 'success') {
          size += chunk.endByte - chunk.startByte
        } else {
          size += chunk.loaded
        }
      })
      return size
    },

    /**
     * Time remaining in seconds
     * @function
     * @returns {number}
     */
    timeRemaining() {
      if (!this.averageSpeed) {
        return 0
      }
      return Math.floor(Math.max(this.size - this.sizeUploaded(), 0) / this.averageSpeed)
    },

    /**
     * Get file type
     * @function
     * @returns {string}
     */
    getType() {
      return this.file.type && this.file.type.split('/')[1]
    },

    /**
     * Get file extension
     * @function
     * @returns {string}
     */
    getExtension() {
      return this.name.substr((~-this.name.lastIndexOf('.') >>> 0) + 2)
        .toLowerCase()
    },
  }

  /**
   * Class for storing a single chunk
   * @name FlowChunk
   * @param {Flow} flowObj
   * @param {FlowFile} fileObj
   * @param {number} offset
   * @constructor
   */
  function FlowChunk(flowObj, fileObj, offset) {
    /**
     * Reference to parent flow object
     * @type {Flow}
     */
    this.flowObj = flowObj

    /**
     * Reference to parent FlowFile object
     * @type {FlowFile}
     */
    this.fileObj = fileObj

    /**
     * File size
     * @type {number}
     */
    this.fileObjSize = fileObj.size

    /**
     * File offset
     * @type {number}
     */
    this.offset = offset

    /**
     * Indicates if chunk existence was checked on the server
     * @type {boolean}
     */
    this.tested = false

    /**
     * Number of retries performed
     * @type {number}
     */
    this.retries = 0

    /**
     * Pending retry
     * @type {boolean}
     */
    this.pendingRetry = false

    /**
     * Preprocess state
     * @type {number} 0 = unprocessed, 1 = processing, 2 = finished
     */
    this.preprocessState = 0

    /**
     * Bytes transferred from total request size
     * @type {number}
     */
    this.loaded = 0

    /**
     * Total request size
     * @type {number}
     */
    this.total = 0

    /**
     * Size of a chunk
     * @type {number}
     */
    const chunkSize = this.flowObj.opts.chunkSize

    /**
     * Chunk start byte in a file
     * @type {number}
     */
    this.startByte = this.offset * chunkSize

    /**
     * Chunk end byte in a file
     * @type {number}
     */
    this.endByte = Math.min(this.fileObjSize, (this.offset + 1) * chunkSize)

    /**
     * XMLHttpRequest
     * @type {XMLHttpRequest}
     */
    this.xhr = null

    if (this.fileObjSize - this.endByte < chunkSize
      && !this.flowObj.opts.forceChunkSize) {
      // The last chunk will be bigger than the chunk size,
      // but less than 2*chunkSize
      this.endByte = this.fileObjSize
    }

    const $ = this

    /**
     * Catch progress event
     * @param {ProgressEvent} event
     */
    this.progressHandler = function (event) {
      if (event.lengthComputable) {
        $.loaded = event.loaded
        $.total = event.total
      }
      $.fileObj.chunkEvent('progress')
    }

    /**
     * Catch test event
     * @param {Event} event
     */
    this.testHandler = function (event) {
      const status = $.status()
      if (status === 'success') {
        $.tested = true
        $.fileObj.chunkEvent(status, $.message())
        $.flowObj.uploadNextChunk()
      } else if (!$.fileObj.paused) { // Error might be caused by file pause method
        $.tested = true
        $.send()
      }
    }

    /**
     * Upload has stopped
     * @param {Event} event
     */
    this.doneHandler = function (event) {
      const status = $.status()
      if (status === 'success' || status === 'error') {
        $.fileObj.chunkEvent(status, $.message())
        $.flowObj.uploadNextChunk()
      } else {
        $.fileObj.chunkEvent('retry', $.message())
        $.pendingRetry = true
        $.abort()
        $.retries++
        const retryInterval = $.flowObj.opts.chunkRetryInterval
        if (retryInterval !== null) {
          setTimeout(() => {
            $.send()
          }, retryInterval)
        } else {
          $.send()
        }
      }
    }
  }

  FlowChunk.prototype = {
    /**
     * Get params for a request
     * @function
     */
    getParams() {
      return {
        flowChunkNumber: this.offset + 1,
        flowChunkSize: this.flowObj.opts.chunkSize,
        flowCurrentChunkSize: this.endByte - this.startByte,
        flowTotalSize: this.fileObjSize,
        flowIdentifier: this.fileObj.uniqueIdentifier,
        flowFilename: this.fileObj.name,
        flowRelativePath: this.fileObj.relativePath,
        flowTotalChunks: this.fileObj.chunks.length,
      }
    },

    /**
     * Get target option with query params
     * @function
     * @param params
     * @returns {string}
     */
    getTarget(params) {
      let target = this.flowObj.opts.target
      if (target.indexOf('?') < 0) {
        target += '?'
      } else {
        target += '&'
      }
      return target + params.join('&')
    },

    /**
     * Makes a GET request without any data to see if the chunk has already
     * been uploaded in a previous session
     * @function
     */
    test() {
      // Set up request and listen for event
      this.xhr = new XMLHttpRequest()
      this.xhr.addEventListener('load', this.testHandler, false)
      this.xhr.addEventListener('error', this.testHandler, false)
      const data = this.prepareXhrRequest('GET')
      this.xhr.send(data)
    },

    /**
     * Finish preprocess state
     * @function
     */
    preprocessFinished() {
      this.preprocessState = 2
      this.send()
    },

    /**
     * Uploads the actual data in a POST call
     * @function
     */
    send() {
      const preprocess = this.flowObj.opts.preprocess
      if (typeof preprocess === 'function') {
        switch (this.preprocessState) {
          case 0:
            preprocess(this)
            this.preprocessState = 1
            return
          case 1:
            return
          case 2:
            break
        }
      }
      if (this.flowObj.opts.testChunks && !this.tested) {
        this.test()
        return
      }

      this.loaded = 0
      this.total = 0
      this.pendingRetry = false

      const func = (this.fileObj.file.slice ? 'slice'
        : (this.fileObj.file.mozSlice ? 'mozSlice'
          : (this.fileObj.file.webkitSlice ? 'webkitSlice'
            : 'slice')))
      const bytes = this.fileObj.file[func](this.startByte, this.endByte)

      // Set up request and listen for event
      this.xhr = new XMLHttpRequest()
      this.xhr.upload.addEventListener('progress', this.progressHandler, false)
      this.xhr.addEventListener('load', this.doneHandler, false)
      this.xhr.addEventListener('error', this.doneHandler, false)

      const data = this.prepareXhrRequest('POST', this.flowObj.opts.method, bytes)

      this.xhr.send(data)
    },

    /**
     * Abort current xhr request
     * @function
     */
    abort() {
      // Abort and reset
      const xhr = this.xhr
      this.xhr = null
      if (xhr) {
        xhr.abort()
      }
    },

    /**
     * Retrieve current chunk upload status
     * @function
     * @returns {string} 'pending', 'uploading', 'success', 'error'
     */
    status() {
      if (this.pendingRetry) {
        // if pending retry then that's effectively the same as actively uploading,
        // there might just be a slight delay before the retry starts
        return 'uploading'
      } else if (!this.xhr) {
        return 'pending'
      } else if (this.xhr.readyState < 4) {
        // Status is really 'OPENED', 'HEADERS_RECEIVED'
        // or 'LOADING' - meaning that stuff is happening
        return 'uploading'
      } else if (this.xhr.status == 200) {
          // HTTP 200, perfect
          return 'success'
        } else if (this.flowObj.opts.permanentErrors.indexOf(this.xhr.status) > -1
          || this.retries >= this.flowObj.opts.maxChunkRetries) {
          // HTTP 415/500/501, permanent error
          return 'error'
        } else {
          // this should never happen, but we'll reset and queue a retry
          // a likely case for this would be 503 service unavailable
          this.abort()
          return 'pending'
        }
    },

    /**
     * Get response from xhr request
     * @function
     * @returns {String}
     */
    message() {
      return this.xhr ? this.xhr.responseText : ''
    },

    /**
     * Get upload progress
     * @function
     * @returns {number}
     */
    progress() {
      if (this.pendingRetry) {
        return 0
      }
      const s = this.status()
      if (s === 'success' || s === 'error') {
        return 1
      } else if (s === 'pending') {
        return 0
      } else {
        return this.total > 0 ? this.loaded / this.total : 0
      }
    },

    /**
     * Prepare Xhr request. Set query, headers and data
     * @param {string} method GET or POST
     * @param {string} [paramsMethod] octet or form
     * @param {Blob} [blob] to send
     * @returns {FormData|Blob|Null} data to send
     */
    prepareXhrRequest(method, paramsMethod, blob) {
      // Add data from the query options
      let query = this.flowObj.opts.query
      if (typeof query === 'function') {
        query = query(this.fileObj, this)
      }
      query = extend(this.getParams(), query)

      let target = this.flowObj.opts.target
      let data = null
      if (method === 'GET' || paramsMethod === 'octet') {
        // Add data from the query options
        const params = []
        each(query, (v, k) => {
          params.push([encodeURIComponent(k), encodeURIComponent(v)].join('='))
        })
        target = this.getTarget(params)
        data = blob || null
      } else {
        // Add data from the query options
        data = new FormData()
        each(query, (v, k) => {
          data.append(k, v)
        })
        data.append(this.flowObj.opts.fileParameterName, blob)
      }

      this.xhr.open(method, target)
      this.xhr.withCredentials = this.flowObj.opts.withCredentials

      // Add data from header options
      each(this.flowObj.opts.headers, function (v, k) {
        this.xhr.setRequestHeader(k, v)
      }, this)

      return data
    },
  }

  /**
   * Extends the destination object `dst` by copying all of the properties from
   * the `src` object(s) to `dst`. You can specify multiple `src` objects.
   * @function
   * @param {Object} dst Destination object.
   * @param {...Object} src Source object(s).
   * @returns {Object} Reference to `dst`.
   */
  function extend(dst, src) {
    each(arguments, (obj) => {
      if (obj !== dst) {
        each(obj, (value, key) => {
          dst[key] = value
        })
      }
    })
    return dst
  }

  Flow.extend = extend

  /**
   * Iterate each element of an object
   * @function
   * @param {Array|Object} obj object or an array to iterate
   * @param {Function} callback first argument is a value and second is a key.
   * @param {Object=} context Object to become context (`this`) for the iterator function.
   */
  function each(obj, callback, context) {
    if (!obj) {
      return
    }
    let key
    // Is Array?
    if (typeof (obj.length) !== 'undefined') {
      for (key = 0; key < obj.length; key++) {
        if (callback.call(context, obj[key], key) === false) {
          return
        }
      }
    } else {
      for (key in obj) {
        if (obj.hasOwnProperty(key) && callback.call(context, obj[key], key) === false) {
          return
        }
      }
    }
  }

  Flow.each = each

  /**
   * FlowFile constructor
   * @type {FlowFile}
   */
  Flow.FlowFile = FlowFile

  /**
   * FlowFile constructor
   * @type {FlowChunk}
   */
  Flow.FlowChunk = FlowChunk

  window.Flow = Flow
}(window, document))

// Node.js-style export for Node and Component
if (typeof module !== 'undefined') {
  module.exports = window.Flow
}
