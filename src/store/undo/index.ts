import {ActionTree, GetterTree, Module, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {IContainer} from '@floip/flow-runner'
import SimpleStack from '@/store/undo/SimpleStack'
import {IStack} from '@/store/undo/IStack'
import {cloneDeep} from 'lodash'

type Snapshot = IContainer

export interface IUndoState {
  undoStack: IStack<Snapshot>,
  redoStack: IStack<Snapshot>,
}

export const stateFactory = (): IUndoState => ({
  undoStack: new SimpleStack<Snapshot>(),
  redoStack: new SimpleStack<Snapshot>(),
})

export const getters: GetterTree<IUndoState, IRootState> = {
  canUndo: state => !state.undoStack.isEmpty(),
  canRedo: state => !state.redoStack.isEmpty(),

  undoTooltip: (state, getters) => (getters.canUndo
    ? `Undo ${state.undoStack.tooltip()!}`
    : ''),

  redoTooltip: (state, getters) => (getters.canRedo
    ? `Redo ${state.redoStack.tooltip()!}`
    : ''),

  currentState: (_, __, ___, rootGetters) => cloneDeep(rootGetters['flow/activeFlowContainer']),
}

export const mutations: MutationTree<IUndoState> = {}

export const actions: ActionTree<IUndoState, IRootState> = {
  applyState({commit}, snapshot: Snapshot) {
    commit('flow/flow_setFlowContainer', snapshot, {root: true})
  },

  undo({state, getters, dispatch}): void {
    if (!getters.canUndo) {
      return
    }
    const snapshot = state.undoStack.pop()!
    state.redoStack.push({value: getters.currentState, name: snapshot.name})
    dispatch('applyState', snapshot.value)
  },

  redo({state, getters, dispatch}): void {
    if (!getters.canRedo) {
      return
    }
    const snapshot = state.redoStack.pop()!
    state.undoStack.push(snapshot)
    dispatch('applyState', snapshot.value)
  },

  createSnapshot({state, getters, dispatch}, name: string) {
    state.undoStack.push({value: getters.currentState, name})
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
