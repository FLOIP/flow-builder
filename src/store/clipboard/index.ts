import {
  ActionTree, GetterTree, Module, MutationTree,
} from 'vuex'
import { IRootState } from '@/store'

export interface BlocksData {
  isFocused: boolean;
  prompt: object;
}

export interface IClipboardState {
  simulatorActive: boolean;
  blocksData: BlocksData[];
}

export const stateFactory = (): IClipboardState => ({
  simulatorActive: false,
  blocksData: [],
})

export const getters: GetterTree<IClipboardState, IRootState> = {
  isSimulatorActive: (state) => state.simulatorActive,
  blocksData: (state) => state.blocksData,
  isBlockFocused: (state) => (index) => state.blocksData[index].isFocused,
}

export const mutations: MutationTree<IClipboardState> = {
  setSimulatorActive(state, value) {
    state.simulatorActive = value
  },
  setBlocksData(state, data) {
    state.blocksData = data
  },
  setIsFocused(state, { index, value }) {
    state.blocksData[index].isFocused = value
  },
}

export const actions: ActionTree<IClipboardState, IRootState> = {
  setSimulatorActive({ commit }, value) {
    commit('setSimulatorActive', value)
  },
  setBlocksData({ commit }, data) {
    commit('setBlocksData', data)
  },
  setIsFocused({ commit, state }, data) {
    // if (state.blocksData.length > 0) {
    commit('setIsFocused', data)
    // }
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
