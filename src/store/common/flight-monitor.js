import axios, { CancelToken } from 'axios'
import lodash from 'lodash'
import qs from 'qs'
import Vue from 'vue'

export const Statuses = { // todo: are these values odd?
  PENDING: -1,
  UNINITIALIZED: 0,
  SUCCESS: 1,
  FAILURE: 2,
}

export const FlightStatusToNameMap = {
  [Statuses.PENDING]: 'pending',
  [Statuses.UNINITIALIZED]: 'uninitialized',
  [Statuses.SUCCESS]: 'success',
  [Statuses.FAILURE]: 'failure',
}

export default {
  namespaced: true,

  state() {
    return { flights: {} }
  },

  mutations: {
    create({ flights }, { key, promise, cancellation }) {
      Vue.set(flights, key, {
        status: Statuses.PENDING,
        progress: 0,
        error: null,
        promise,
        cancel: cancellation,
      })
    },

    cancel({ flights }, { key }) {
      lodash.invoke(flights, `${key}.cancel`)
    },
  },

  actions: {
    async create({ commit, dispatch, state: { flights } }, { key, promise, cancellation }) {
      // todo: figure out queuing + streaming
      // todo: convert to .push() + flights.invoke('cancel')

      const previousFlight = flights[key]
      if (previousFlight && cancellation) {
        previousFlight.cancel()
      }

      commit('create', { key, promise, cancellation })
      const flight = flights[key]
      flight.id = `flight-${lodash.uniqueId()}`

      try {
        const response = await promise
        Object.assign(flight, { status: Statuses.SUCCESS, progress: 100 })

        return response // surface response to next promises
      } catch (e) { // failed request
        flight.error = e
        flight.status = Statuses.FAILURE
        return null
      }
    },

    createCancellableXhr({ commit, dispatch, state }, config) {
      const
        { key } = config
      const { token, cancel: cancellation } = CancelToken.source()
      const promise = axios.request({
        paramsSerializer: (p) => qs.stringify(p, { arrayFormat: 'bracket' }),
        cancelToken: token,
        onUploadProgress: null, // todo: migrate file upload to use this flights api
        onDownloadProgress: null,
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        ...config,
      })

      return dispatch('create', { key, promise, cancellation })
    },

    resetStatus({ commit, dispatch, state: { flights } }, { key }) {
      if (!flights[key]) {
        return
      }
      flights[key].status = Statuses.UNINITIALIZED
      commit('cancel', { key })

      // should rather be a m reset mutation to reset other values as well as cancel()
      // eg. (value, error, progress, status, cancel-token), the whole shebang!
    },

    cancelAll({ commit, dispatch, state: { flights } }) {
      for (const key of Object.keys(flights)) {
        commit('cancel', { key })
      }
    },
  },
  getters: {
    hasPendingFlight(state) {
      return Object.values(state.flights).find((f) => f.status === Statuses.PENDING)
    },
  },
}
