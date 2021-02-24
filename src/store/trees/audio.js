import lodash from 'lodash'
import axios from 'axios'
import Vue from 'vue'
import { routeFrom } from '@/lib/mixins/Routes'

export default {
  state: lodash.chain(global)
    .get('__AUDIO__', {})
    .defaultsDeep({
      library: {},
      recording: {
        isCalling: {}, // keyed by `{jsKey}:{langId}`
        isRecorderSelectorVisible: false,
        recorders: null,
      },
    })
    .value(),

  getters: {},

  mutations: {
    setRecordingStatusFor({ recording: { isCalling } }, { key, value: status }) {
      Vue.set(isCalling, key, status)
    },

    setAudioRecordingConfigVisibilityForSelectedBlock({ recording }, { langId, isVisible }) {
      recording.isRecorderSelectorVisible = isVisible
    },

    setAudioRecordingConfigVisibilityFor({ recording }, { key, isVisible }) {
      recording.isRecorderSelectorVisible = isVisible
    },
  },

  actions: {
    startAudioRecordingFor({
      commit, dispatch, state, rootState,
    }, {
      key,
      description,
      name: recorder_name,
      phone: recorder_phonenumber,
      isNew: is_new_recorder,
    }) {
      commit('setAudioRecordingConfigVisibilityFor', { key, isVisible: false })
      dispatch('showAppMessageFor', { message: 'Atempting to call...' })

      return axios.post(routeFrom('trees.calltorecordStart', null, rootState.trees.ui.routes), {
        recorder_phonenumber, recorder_name, is_new_recorder, description,
      })
        .then(({
          data: {
            uuid, queue_id: queueId, status, status_description, description,
          },
        }) => {
          if (status_description === 'error') {
            const message = status === 'no_credit_error' ? description : 'Error dialing number'
            dispatch('showAppMessageFor', { message, isComplete: true })
            return
          }

          // status_description is 'sending_to_dn'
          dispatch('showAppMessageFor', { message: 'Sending out call...' })
          commit('setRecordingStatusFor', {
            key, uuid, queueId, value: 'initiating_call',
          })
          setTimeout(() => dispatch('fetchAudioRecordingStatusFor', { key, uuid, queueId }), 3000)
        })
      // .catch(({response: {data: {status_description: message}}}) => )
    },

    fetchAudioRecordingStatusFor({
      commit, dispatch, state, rootState,
    }, { key, uuid, queueId }) {
      return axios.post(routeFrom('trees.calltorecordStatus', null, rootState.trees.ui.routes), { uuid, queue_id: queueId })
        .then(({ data }) => dispatch('checkAudioRecordingStatusFor', {
          ...data, key, uuid, queueId,
        }))
      // .catch(({response: {data: {status_description: message}}}) => )
    },

    checkAudioRecordingStatusFor({ commit, dispatch, state }, data) {
      const
        {
          key, uuid, queueId, status,
        } = data
      const fetchStatusMessageMap = {
        error: 'Error dialing number', // + hide
        new: 'Call recorded successfully', // + hide
        in_progress: 'Dialing...', // sending_to_dn
        queued: 'Dialing...',
        recording: 'Recording...',
        listen_to_recording: 'Listening to recording...',
        sending_audio_to_cn: 'Retrieving audio...',
        processing: 'Processing audio file...',
        discard_and_record: 'Audio discarded, Recording again...',
      }

      commit('setRecordingStatusFor', {
        key, uuid, queueId, value: status,
      })

      if (status === 'new') {
        const
          jsKey = extractJskeyFromRecordingKey(key)
        const langId = extractLangIdFromRecordingKey(key)

        commit('updateAudioFileFor', { jsKey, langId, value: createAudioFileEntityFrom(data) })
        commit('updateReviewedStateFor', { jsKey, langId, value: false })
        dispatch('attemptSaveTree')

        // todo: refactor @jory's audio file stuff so that we can reuse everywhere
      }

      const isComplete = status === 'error' || status === 'new'
      if (isComplete) {
        dispatch('showAppMessageFor', { message: fetchStatusMessageMap[status], isComplete: true })
        return
      }

      const fetchStatusDelayMap = {
        in_progress: 3000,
        queued: 2000,
        recording: 100,
        listen_to_recording: 1000,
        sending_audio_to_cn: 500,
        processing: 300,
        discard_and_record: 3000,
      }

      dispatch('showAppMessageFor', { message: fetchStatusMessageMap[status] })
      setTimeout((_) => dispatch('fetchAudioRecordingStatusFor', { key, uuid, queueId }), fetchStatusDelayMap[status])
    },
  },
}

const extractJskeyFromRecordingKey = (key) => key.split(':')[0]
const extractLangIdFromRecordingKey = (key) => key.split(':')[1]
const createAudioFileEntityFrom = ({
  audio_file_id, uuid, description, duration_seconds, created_at,
}) => ({
  id: audio_file_id,
  filename: uuid,
  description,
  duration_seconds,
  created_at,
})
