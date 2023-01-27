import {ActionTree, GetterTree, Module, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {IContainer} from '@floip/flow-runner'
import {SimpleStack} from '@/store/undo/SimpleStack'
import {Stack} from '@/store/undo/Stack'

type Snapshot = IContainer

export interface IUndoState {
  undoStack: Stack<Snapshot>,
  redoStack: Stack<Snapshot>,
}

export const stateFactory = (): IUndoState => ({
  undoStack: new SimpleStack<Snapshot>(),
  redoStack: new SimpleStack<Snapshot>(),
})

export const getters: GetterTree<IUndoState, IRootState> = {
  canUndo: state => !state.undoStack.isEmpty(),
  canRedo: state => !state.redoStack.isEmpty(),

  currentState: (_, __, ___, rootGetters) => rootGetters['flow/activeFlowContainer'],
}

export const mutations: MutationTree<IUndoState> = {}

export const actions: ActionTree<IUndoState, IRootState> = {
  applyState({dispatch}, snapshot: Snapshot) {
    dispatch('flow/flow_setFlowContainer', snapshot, {root: true})
  },

  undo({state, getters, dispatch}): void {
    if (!getters.canUndo) {
      return
    }
    const namedSnapshot = state.undoStack.pop()!
    state.redoStack.push(namedSnapshot)
    dispatch('applyState', namedSnapshot.snapshot)
  },

  redo({state, getters, dispatch}): void {
    if (!getters.canRedo) {
      return
    }
    const namedSnapshot = state.redoStack.pop()!
    state.undoStack.push(namedSnapshot)
    dispatch('applyState', namedSnapshot.snapshot)
  },

  do({state, getters, dispatch}, name: string) {
    state.undoStack.push({snapshot: getters.currentState, name})
    state.redoStack.clear()
  },
}

export const store: Module<IUndoState, IRootState> = {
  namespaced: true,
  state: stateFactory,
  getters,
  mutations,
  actions,
}
