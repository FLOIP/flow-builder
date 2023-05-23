import {IRootState} from '@/store'
import {IFlowsState} from '@/store/flow'
import structuredClone from '@ungap/structured-clone'
import {difference} from 'lodash'
import {ActionTree, GetterTree, Module, MutationTree} from 'vuex'
import {getChangedKeys} from './getChangedKeys'

export interface IUndoRedoState {
  snapshots: IFlowsState[],
  position: number,

  previouslyChangedKeys: string[],
}

export const stateFactory = (): IUndoRedoState => ({
  snapshots: [],
  position: -1,

  previouslyChangedKeys: [],
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
  currentSnapshot(state): IFlowsState {
    return state.snapshots[state.position]
  },
}

export const mutations: MutationTree<IUndoRedoState> = {
  addSnapshot(state, stateSnapshot: IFlowsState) {
    // Clear forward history before adding a new snapshot
    state.snapshots.splice(state.position + 1)

    // Append the new snapshot
    state.snapshots.push(stateSnapshot)
    state.position += 1
  },
  patchSnapshot(state, stateSnapshot: IFlowsState) {
    state.snapshots[state.position] = stateSnapshot
  },
  updatePreviouslyChangedKeys(state, changedKeys: string[]) {
    state.previouslyChangedKeys = changedKeys
  },
  resetSnapshots(state, snapshot) {
    state.snapshots = [snapshot]
    state.previouslyChangedKeys = []
    state.position = 0
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
}

export const actions: ActionTree<IUndoRedoState, IRootState> = {
  async handleStateChange({commit, state, getters, rootState}) {
    // Take a snapshot of the current state to avoid mutating it
    const flowState = structuredClone(rootState.flow)

    // We group changes by comparing sets of changed keys, and either
    // add a new snapshot or patch the current ones
    const changedKeys = getChangedKeys(getters.currentSnapshot, flowState)
    const hasDifferentKeys = difference(changedKeys, state.previouslyChangedKeys).length > 0

    if (hasDifferentKeys) {
      commit('addSnapshot', flowState)
      commit('updatePreviouslyChangedKeys', changedKeys)
    } else {
      commit('patchSnapshot', flowState)
    }
  },

  /**
   * Undo user's command
   */
  async undoAndUpdateState({commit, getters}): Promise<void> {
    // eslint-disable-next-line
    if (!getters.canUndo) {
      console.warn('Cannot undo, the action history is empty or we have already reached the beginning of it')
      return
    }

    commit('undo')
    commit('flow/flow_resetFlowState', getters.currentSnapshot, {root: true})
  },

  /**
   * Redo user's command
   */
  async redoAndUpdateState({commit, getters}): Promise<void> {
    // eslint-disable-next-line
    if (!getters.canRedo) {
      console.warn('Cannot redo, the action history is empty or we have already reached the end of it')
      return
    }

    commit('redo')
    commit('flow/flow_resetFlowState', getters.currentSnapshot, {root: true})
  },

  /**
   * Reset the history of changes to the current state
   */
  async resetHistory({commit, rootState}) {
    setImmediate(() => {
      commit('resetSnapshots', structuredClone(rootState.flow))
    })
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
