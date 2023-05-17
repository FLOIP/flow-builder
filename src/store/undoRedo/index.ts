import {ActionTree, GetterTree, Module, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {IFlowsState} from '@/store/flow'
import {IBuilderState} from '@/store/builder'

export interface IUndoRedoState {
  snapshots: Snapshot[],
  position: number,
}

export interface Snapshot {
  flow: IFlowsState,
  builder: IBuilderState,
}

export const stateFactory = (): IUndoRedoState => ({
  snapshots: [],
  position: -1,
})

export const getters: GetterTree<IUndoRedoState, IRootState> = {
  canUndo(state): boolean {
    const hasMoreThanInitialSnapshot = state.snapshots.length > 1
    const isNotFirstPosition = state.position > 0
    return hasMoreThanInitialSnapshot && isNotFirstPosition
  },
  canRedo(state): boolean {
    const hasMoreThanInitialSnapshot = state.snapshots.length > 1
    const isNotLastPosition = state.position < state.snapshots.length - 1
    return hasMoreThanInitialSnapshot && isNotLastPosition
  },
}

export const mutations: MutationTree<IUndoRedoState> = {
  clearRedos(state) {
    // clear everything after current position
    state.snapshots.splice(state.position + 1)
  },
  addSnapshot(state, stateSnapshot: Snapshot) {
    state.snapshots.push(stateSnapshot)
    state.position += 1
  },
  undo(state) {
    if (state.position > 0) {
      state.position -= 1
    } else {
      console.warn('Cannot undo, we have already reached the beginning of the history')
    }
  },
  redo(state) {
    if (state.position < state.snapshots.length - 1) {
      state.position += 1
    } else {
      console.warn('Cannot redo, we have already reached the end of the history')
    }
  },
  resetSnapshots(state, snapshot) {
    state.snapshots = [snapshot]
    state.position = 0
  },
}

export const actions: ActionTree<IUndoRedoState, IRootState> = {
  /**
   * Save a copy of state after user's command
   */
  async takeSnapshot({commit, dispatch}) {
    commit('clearRedos')
    const snapshot = await dispatch('cloneState')
    commit('addSnapshot', snapshot)
  },

  /**
   * Undo user's command
   */
  async undoAndUpdateState({commit, getters, dispatch}): Promise<void> {
    // eslint-disable-next-line
    if (!getters.canUndo) {
      console.warn('Cannot undo, the action history is empty or we have already reached the beginning of it')
      return
    }
    commit('undo')
    const currentSnapshot: Snapshot = await dispatch('cloneCurrentSnapshot')
    commit('flow/flow_resetFlowState', currentSnapshot.flow, {root: true})
    commit('builder/resetBuilderState', currentSnapshot.builder, {root: true})
  },

  /**
   * Redo user's command
   */
  async redoAndUpdateState({commit, getters, dispatch}): Promise<void> {
    // eslint-disable-next-line
    if (!getters.canRedo) {
      console.warn('Cannot redo, the action history is empty or we have already reached the end of it')
      return
    }
    commit('redo')
    const currentSnapshot: Snapshot = await dispatch('cloneCurrentSnapshot')
    commit('flow/flow_resetFlowState', currentSnapshot.flow, {root: true})
    commit('builder/resetBuilderState', currentSnapshot.builder, {root: true})
  },

  /**
   * Get a deep clone of current state.
   * If we don't clone the state before saving it as a snapshot and then the user mutates the state,
   * it will also mutate our saved snapshot which we don't want.
   * Private / utility action, don't use outside the store.
   */
  cloneState({rootState}) {
    return JSON.parse(JSON.stringify({
      flow: rootState.flow,
      builder: rootState.builder,
    }))
  },

  /**
   * Get a deep clone of current snapshot.
   * If we don't clone the snapshot before applying it to the state and then the user mutates the state,
   * it will also mutate the original snapshot which we don't want.
   * Private / utility action, don't use outside the store.
   */
  cloneCurrentSnapshot({state}): Snapshot {
    return JSON.parse(JSON.stringify(state.snapshots[state.position]))
  },

  /**
   * Clear undos and redos, keep current state
   */
  async clearAllHistory({commit, dispatch}) {
    const snapshot = await dispatch('cloneState')
    commit('resetSnapshots', snapshot)
  },
}

export const store: Module<IUndoRedoState, IRootState> = {
  namespaced: true,
  state: stateFactory,
  mutations,
  getters,
  actions,
}

export default store
