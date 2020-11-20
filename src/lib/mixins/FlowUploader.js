import Flow from '@flowjs/flow.js'; // todo: can we use this ? or need to upgrade php lib (voto5 legacy todo)
import lodash from 'lodash';

export default {
  directives: {
    ['flow-uploader']: {
      /**
       * This binding provides a bridge between Flow and vuejs such that we can continue using our resumable backend
       */
      bind(el, binding) {
        const {
            accept,
            target,
            token: upload_token
          } = binding.value,
          uploader = new Flow({
            target,
            singleFile: true,
            chunkSize: 1024 * 512, // kbytes, chunked?  ¯\_(ツ)_/¯
            query: { upload_token }
          });

        if (!uploader.support) {
          // Your browser doesn't support HTML5 uploads; please try Firefox or Chrome.
          return;
        }

        lodash.extend(el.style, { overflow: 'hidden' });
        uploader.assignBrowse(el);

        lodash.chain(el.children)
        .find({
          tagName: 'INPUT',
          type: 'file'
        })
        .assign({ accept })
        .value();

        // todo: migrate to proxied catch-all handler (voto5 legacy todo)
        // uploader.on('catchAll', (name, file/*or files*/, e) => console.debug(name))

        // todo: when do we call upload on a multiselect-upload and file-added triggered multiple times? (voto5 legacy todo)
        // uploader.on('fileAdded', (file, e) => dispatch(el, 'filesSubmitted', {file, uploader})) // uploader.upload()
        uploader.on('filesSubmitted', (files, e) => dispatch(el, 'filesSubmitted', {
          files,
          uploader
        })); // uploader.upload()
        uploader.on('fileProgress', (file, e) => dispatch(el, 'fileProgress', {
          file,
          uploader
        }));
        uploader.on('fileSuccess', (file, json) => dispatch(el, 'fileSuccess', {
          file,
          uploader,
          json
        })); // uploader.cancel()
        uploader.on('error', (message, file) => dispatch(el, 'fileSuccess', {
          file,
          uploader,
          message
        })); // uploader.cancel()
      },

      unbind(el, binding) {
      }
    }
  }
};

const dispatch = (el, name, data) => {
  el.dispatchEvent(lodash.extend(new Event(name, {
    bubbles: true,
    cancelable: true,
  }), { data }));
};
