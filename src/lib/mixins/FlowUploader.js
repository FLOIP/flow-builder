import Flow from '@flowjs/flow.js'
import {extend, flow, find, assign} from 'lodash'

const dispatch = (el, name, data) => {
  el.dispatchEvent(extend(new Event(name, {
    bubbles: true,
    cancelable: true,
  }), {data}))
}

export default {
  directives: {
    'flow-uploader': {
      /**
       * This binding provides a bridge between Flow and vuejs such that we can continue using our resumable backend
       */
      bind(el, binding) {
        const {
          accept,
          target,
          token: upload_token,
        } = binding.value
        const uploader = new Flow({
          target,
          singleFile: true,
          // kbytes, chunked?  ¯\_(ツ)_/¯
          chunkSize: 1024 * 512,
          query: {upload_token},
        })

        if (!uploader.support) {
          // Your browser doesn't support HTML5 uploads; please try Firefox or Chrome.
          return
        }

        extend(el.style, {overflow: 'hidden'})
        uploader.assignBrowse(el)

        flow(
          find({
            tagName: 'INPUT',
            type: 'file',
          }),
          assign({accept}).value(),
        )(el.children)

        // todo: migrate to proxied catch-all handler (voto5 legacy todo)
        // uploader.on('catchAll', (name, file/*or files*/, e) => console.debug(name))

        // todo: when do we call upload on a multiselect-upload and file-added triggered multiple times? (voto5 legacy todo)
        // uploader.on('fileAdded', (file, e) => dispatch(el, 'filesSubmitted', {file, uploader})) // uploader.upload()

        // uploader.upload()
        uploader.on('filesSubmitted', (files) => dispatch(el, 'filesSubmitted', {
          files,
          uploader,
        }))
        uploader.on('fileProgress', (file) => dispatch(el, 'fileProgress', {
          file,
          uploader,
        }))
        // uploader.cancel()
        uploader.on('fileSuccess', (file, json) => dispatch(el, 'fileSuccess', {
          file,
          uploader,
          json,
        }))
        // uploader.cancel()
        uploader.on('error', (message, file) => dispatch(el, 'fileSuccess', {
          file,
          uploader,
          message,
        }))
      },
    },
  },
}
