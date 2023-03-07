export default {
  namespaced: true,
  state: {
    snapshots: [],
    position: -1,
  },
  mutations: {
    add(state, snapshot) {
      state.snapshots.splice(state.position + 1, state.snapshots.length - state.position - 1, snapshot);
      state.position = state.snapshots.length - 1;
    },
    undo(state) {
      if (state.position > 0) {
        state.position--;
        // const snapshot = state.snapshots[state.position];
        // Object.keys(snapshot).forEach((key) => {
        //   state[key] = snapshot[key];
        // });

      }
    },
    redo(state) {
      if (state.position < state.snapshots.length - 1) {
        state.position++;
        // const snapshot = state.snapshots[state.position];
        // Object.keys(snapshot).forEach((key) => {
        //   state[key] = snapshot[key];
        // });
      }
    },
    reset(state, snapshot) {
      state.snapshots = [snapshot];
      state.position = 0;
    },
  },
  getters: {
    currentSnapshot(state) {
      return state.snapshots[state.position]
    },
  },
  actions: {
    undoAndUpdateState({commit, getters}) {
      console.debug('test 1')
      commit('undo')
      console.debug('test 2')
      commit('flow/flow_resetFlowState', getters.currentSnapshot.flow)
      console.debug('test 3')
    },
    redoAndUpdateState({commit, getters}) {
      commit('redo')
      commit('flow/flow_resetFlowState', getters.currentSnapshot.flow)
    },
  },
};
