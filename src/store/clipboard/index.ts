import {
  ActionTree, GetterTree, Module, MutationTree,
} from 'vuex'
import { IRootState } from '@/store'

export interface IClipboardState {
  simulatorActive: boolean;
}

export const stateFactory = (): IClipboardState => ({
  simulatorActive: false,
})

export const getters: GetterTree<IClipboardState, IRootState> = {
  isSimulatorActive: (state) => state.simulatorActive,
}

export const mutations: MutationTree<IClipboardState> = {
  setSimulatorActive(state, value) {
    state.simulatorActive = value
  },
}

export const actions: ActionTree<IClipboardState, IRootState> = {
  setSimulatorActive({ commit }, value) {
    commit('setSimulatorActive', value)
  },
}

export const store: Module<IClipboardState, IRootState> = {
  namespaced: true,
  state: stateFactory,
  getters,
  mutations,
  actions,
}

export default store
