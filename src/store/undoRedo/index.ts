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
  currentSnapshot(state) {
    return state.snapshots[state.position]
  },
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
  /**
   * Not every vuex mutations or actions will be considered, we will leave to the devs to consider which particular ones should be added
   * Usage: just call this in a Vue component to consider user actions,
   * eg:
   *  ```
   *  // to avoid `TypeError: Converting circular structure to JSON`,
   *  // we need to send JSON.parse(JSON.stringify()) value of the desired snapshot
   *  const snapshot = JSON.parse(JSON.stringify(this.$store.state))
   *  this.takeShapshot(snapshot)
   *  ```
   * @param state
   * @param stateToSnapshot, a result of JSON.parse(JSON.stringify())
   */
  takeSnapshot(state, stateToSnapshot: Snapshot) {
    state.snapshots.splice(state.position + 1, state.snapshots.length - state.position - 1, stateToSnapshot)
    state.position = state.snapshots.length - 1
  },
  undo(state) {
    if (state.position > 0) {
      state.position -= 1
    }
  },
  redo(state) {
    if (state.position < state.snapshots.length - 1) {
      state.position += 1
    }
  },
  resetSnapshot(state, snapshot) {
    state.snapshots = [snapshot]
    state.position = 0
  },
}

export const actions: ActionTree<IUndoRedoState, IRootState> = {
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
}

export const store: Module<IUndoRedoState, IRootState> = {
  namespaced: true,
  state: stateFactory,
  mutations,
  getters,
  actions,
}

export default store
