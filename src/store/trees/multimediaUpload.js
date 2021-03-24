import axios from 'axios'
import lodash from 'lodash'
import Vue from 'vue'

export const Statuses = {
  UPLOADING: -1,
  UNINITIALIZED: 0,
  SUCCESS: 1,
  FAILURE: 2,
}

export const UploadStatusToStateMap = {
  [Statuses.UPLOADING]: 'uploading',
  [Statuses.UNINITIALIZED]: 'uninitialized',
  [Statuses.SUCCESS]: 'success',
  [Statuses.FAILURE]: 'failure',
}

export default {
  namespaced: true,

  state: {
    uploadProgressByKey: {},
    errorMessageByKey: {},

    uploadsById: {},
    uploadIdsByKey: {},
  },

  mutations: {
    setErrorMessage({errorMessageByKey}, {key, errorMessage}) {
      Vue.set(errorMessageByKey, key, errorMessage)
    },

    setUploadProgress({uploadProgressByKey}, {key, uploadProgress}) {
      Vue.set(uploadProgressByKey, key, uploadProgress)
    },

    setUploadStatusFor({uploadsById, uploadIdsByKey}, {
      file: fileWithRefs, key, status, progress, message, cancel,
    }) {
      const file = lodash.pick(fileWithRefs, ['averageSpeed', 'currentSpeed', 'error', 'name', 'paused', 'relativePath', 'size', 'uniqueIdentifier'])
      Vue.set(uploadsById, file.uniqueIdentifier, {
        key, status, progress, message, cancel, file,
      })
      Vue.set(uploadIdsByKey, key, file.uniqueIdentifier)
    },
  },

  actions: {
    uploadFile({commit}, {
      key,
      uploadUrl,
      formDataFields,
      onSuccess,
      onError,
    }) {
      if (!uploadUrl) {
        commit('setUploadProgress', {key, uploadProgress: null})
        onError(new Error(`url was ${uploadUrl}`))
        return
      }

      const formData = new FormData()
      lodash.forEach(formDataFields, (value, name) => {
        formData.set(name, value)
      })

      const config = {
        onUploadProgress: (progressEvent) => {
          commit('setUploadProgress', {
            key,
            uploadProgress: Math.floor((progressEvent.loaded * 100) / progressEvent.total),
          })
        },
      }

      axios.post(uploadUrl, formData, config)
        .then((response) => {
          commit('setUploadProgress', {key, uploadProgress: null})
          onSuccess(response)
        })
        .catch((error) => {
          commit('setUploadProgress', {key, uploadProgress: null})
          onError(error)
        })
    },

    // todo: this is slightly different, because it implements chunked+resumable uploads; generify
    // todo: upgrade backend to use more recent composer package that's compatible w/ npm flow.js
    // https://github.com/flowjs/flow-php-server
    uploadFiles({commit, dispatch, state}, {key, files, uploader}) { // todo: handle multi-file-per-key
      const cancel = (_) => uploader.cancel()

      files.forEach((file) => commit('setUploadStatusFor', {
        file, key, progress: 0, status: Statuses.UNINITIALIZED, message: null, cancel,
      }))

      uploader.on('fileProgress', (file, e) => {
        // TODO: enable showAppMessageFor and use it as follow
        // dispatch('showAppMessageFor', {message: `Upload in progress... ${_.parseInt(file.progress() * 100)}%`}, {root: true})
        console.debug(`Upload in progress... ${_.parseInt(file.progress() * 100)}%`)
        commit('setUploadStatusFor', {
          file,
          key,
          progress: file.progress(),
          status: Statuses.UPLOADING,
          message: null,
          cancel,
        })
      })

      uploader.on('fileSuccess', (file, json) => {
        // TODO: enable showAppMessageFor and use it as follow
        // dispatch('showAppMessageFor', {message: 'Upload successful!', isComplete: true}, {root: true})
        console.debug('Upload successful!')
        commit('setUploadStatusFor', {
          file,
          key,
          progress: 1,
          status: Statuses.SUCCESS,
          message: null,
          cancel,
        })
        // uploader.cancel() // clear for next batch
      })

      uploader.on('error', (json, file) => {
        const {status_description} = JSON.parse(json) || {}
        // TODO: enable showAppMessageFor and use it as follow
        // dispatch('showAppMessageFor', {message: status_description, isComplete: true}, {root: true})
        console.debug(`Upload has error ${status_description}`)
        commit('setUploadStatusFor', {
          file,
          key,
          status: Statuses.FAILURE,
          message: status_description,
          cancel,
        })
        // uploader.cancel() // clear for retry
      })

      uploader.upload()
      // TODO: enable showAppMessageFor and use it as follow
      // dispatch('showAppMessageFor', {message: 'Upload in progress...'}, {root: true})
      console.debug('Upload in progress...')
    },
  },
}
