export default {
  namespaced: true,
  state: {
    snapshots: [],
    position: -1,
  },
  mutations: {
    /**
     * Not every vuex mutations or actions will be considered, we will leave to the devs to consider which particular ones should be added
     * Usage: just call this in a Vue component to consider user actions,
     * eg:
     *  ```
     *  // to avoid `TypeError: Converting circular structure to JSON`, we need to send JSON.parse(JSON.stringify()) value of the desired snapshot
     *  const snapshot = JSON.parse(JSON.stringify(this.$store.state))
     *  this.takeShapshot(snapshot)
     *  ```
     * @param state
     * @param stateToSnapshot, a result of JSON.parse(JSON.stringify())
     */
    takeSnapshot(state, stateToSnapshot) {
      state.snapshots.splice(state.position + 1, state.snapshots.length - state.position - 1, stateToSnapshot)
      state.position = state.snapshots.length - 1
    },
    undo(state) {
      if (state.position > 0) {
        state.position--
      }
    },
    redo(state) {
      if (state.position < state.snapshots.length - 1) {
        state.position++
      }
    },
    resetSnapshot(state, snapshot) {
      state.snapshots = [snapshot]
      state.position = 0
    },
  },
  getters: {
    currentSnapshot(state) {
      return state.snapshots[state.position]
    },
  },
  actions: {
    undoAndUpdateState({commit, getters}) {
      commit('undo')

      // Consider needed modules here
      commit('flow/flow_resetFlowState', getters.currentSnapshot.flow, {root: true})
    },
    redoAndUpdateState({commit, getters}) {
      commit('redo')

      // Consider needed modules here
      commit('flow/flow_resetFlowState', getters.currentSnapshot.flow, {root: true})
    },
  },
}
