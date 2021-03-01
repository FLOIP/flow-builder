import lodash from 'lodash'
import axios from 'axios'
import Vue from 'vue'
import {
  SupportedContentType,
  SupportedMode,
} from '@floip/flow-runner'
import { routeFrom } from '@/lib/mixins/Routes'

export default {
  state: lodash.chain(global)
      .get('__AUDIO__', {})
      .defaultsDeep({
        library: [],
        recording: {
          isCalling: {}, // keyed by `{jsKey}:{langId}`
          isRecorderSelectorVisible: false,
          recorders: null,
        },
      })
      .value(),

  getters: {
    availableAudio: (state) => state.library || [],
  },

  mutations: {
    pushAudioIntoLibrary({ library, recording }, audio) {
      library.push(audio)
    },

    setRecordingStatusFor({recording: {isCalling}}, {key, value: status}) {
      Vue.set(isCalling, key, status)
    },

    setAudioRecordingConfigVisibilityForSelectedBlock({recording}, {langId, isVisible}) {
      recording.isRecorderSelectorVisible = isVisible
    },

    setAudioRecordingConfigVisibilityFor({recording}, {key, isVisible}) {
      recording.isRecorderSelectorVisible = isVisible
    },
  },

  actions: {
    startAudioRecordingFor({commit, dispatch, state, rootState}, {
      key,
      description,
      name: recorder_name,
      phone: recorder_phonenumber,
      isNew: is_new_recorder
    }) {

      commit('setAudioRecordingConfigVisibilityFor', {key, isVisible: false})
      // TODO: enable showAppMessageFor once available
      // dispatch('showAppMessageFor', {message: 'Atempting to call...'})

      return axios.post(routeFrom('trees.calltorecordStart', null, rootState.trees.ui.routes),
        {recorder_phonenumber, recorder_name, is_new_recorder, description},
        {headers: { 'Content-Type': 'multipart/form-data' }}
          ).then(({data: {uuid, queue_id: queueId, status, status_description, description}}) => {

            // TODO: enable showAppMessageFor once available
            // if (status_description === 'error') {
            //   const message = status === 'no_credit_error' ? description : 'Error dialing number'
              // dispatch('showAppMessageFor', {message, isComplete: true})
              // return
            // }

            // status_description is 'sending_to_dn'
            // TODO: enable showAppMessageFor once available
            // dispatch('showAppMessageFor', {message: 'Sending out call...'})
            commit('setRecordingStatusFor', {key, uuid, queueId, value: 'initiating_call'})
            setTimeout(() => dispatch('fetchAudioRecordingStatusFor', {key, uuid, queueId, isFirstCall: true}), 3000)
          })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          console.log('Error Log', error.response.data.status_description.message);
        } else if (error.request) {
          // The request was made but no response was received
          console.log('Error Log', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error Log', error.message);
        }
      })
    },

    /**
     * fetch Audio Recording Status
     *
     * @param commit
     * @param dispatch
     * @param state
     * @param rootState
     * @param key
     * @param uuid
     * @param queueId
     * @param isFirstCall, used on devServer to simulate intermediate statuses, eg: `in_progress`, then `recorded`
     * @returns {Promise<AxiosResponse<any>>}
     */
    fetchAudioRecordingStatusFor({commit, dispatch, state, rootState}, {key, uuid, queueId, isFirstCall}) {
      return axios.post(routeFrom('trees.calltorecordStatus', null, rootState.trees.ui.routes),
        {uuid, queue_id: queueId, is_first_call: isFirstCall},
        {headers: { 'Content-Type': 'application/json' }}
        ).then(({data}) => dispatch('checkAudioRecordingStatusFor', {...data, key, uuid, queueId}))
        .catch((error) => {
          if (error.response) {
            // Request made and server responded
            console.log('Error Log', error.response.data.status_description.message);
          } else if (error.request) {
            // The request was made but no response was received
            console.log('Error Log', error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error Log', error.message);
          }
        })
    },

    async checkAudioRecordingStatusFor({commit, dispatch, state}, data) {
      const {key, uuid, audio_file_id, queueId, status, description, created_at, duration_seconds} = data

      commit('setRecordingStatusFor', {key, uuid, queueId, value: status})


      if (status === 'new') {
        const langId = extractLangIdFromRecordingKey(key)
        const extension = description.split('.')[description.split('.').length - 1]
        const uploadedAudio = {
          id: audio_file_id,
          filename: uuid,
          description,
          language_id: langId,
          duration_seconds,
          original_extension: extension,
          created_at
        }

        const resource = await dispatch('flow/resource_createWith', {
          props: {
            uuid,
            values: {
              languageId: langId,
              contentType: SupportedContentType.AUDIO,
              modes: [SupportedMode.IVR],
              value: description,
            },
          },
        })

        commit('flow/resource_add', { resource })
        commit('pushAudioIntoLibrary', uploadedAudio)
        
        // commit('updateReviewedStateFor', {jsKey, langId, value: false}) // TODO: what should be the equivalence of this in flow-builder
        // dispatch('attemptSaveTree')


        // todo: refactor @jory's audio file stuff so that we can reuse everywhere
      }

      const isComplete = status === 'error' || status === 'new'
      // TODO: enable showAppMessageFor once available
      // const fetchStatusMessageMap = {
      //   error: 'Error dialing number', // + hide
      //   new: 'Call recorded successfully', // + hide
      //   in_progress: 'Dialing...', // sending_to_dn
      //   queued: 'Dialing...',
      //   recording: 'Recording...',
      //   listen_to_recording: 'Listening to recording...',
      //   sending_audio_to_cn: 'Retrieving audio...',
      //   processing: 'Processing audio file...',
      //   discard_and_record: 'Audio discarded, Recording again...'
      // }
      //
      if (isComplete) {
        // dispatch('showAppMessageFor', {message: fetchStatusMessageMap[status], isComplete: true})
        return
      }
      // dispatch('showAppMessageFor', {message: fetchStatusMessageMap[status]})

      const fetchStatusDelayMap = {
        in_progress: 3000,
        queued: 2000,
        recording: 100,
        listen_to_recording: 1000,
        sending_audio_to_cn: 500,
        processing: 300,
        discard_and_record: 3000,
      }

      setTimeout(_ => dispatch('fetchAudioRecordingStatusFor', {key, uuid, queueId, isFirstCall: false}), fetchStatusDelayMap[status])
    },
  }
}

const extractLangIdFromRecordingKey = key => key.split(':')[1]
