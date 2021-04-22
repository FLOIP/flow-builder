import {
  ActionTree, GetterTree, Module, MutationTree,
} from 'vuex'
import { IRootState } from '@/store'

export interface BlocksData {
  isFocused: boolean;
  prompt: object;
}

export interface IClipboardState {
  isSimulatorActive: boolean;
  blocksData: BlocksData[];
}

export const stateFactory = (): IClipboardState => ({
  isSimulatorActive: false,
  blocksData: [],
})

export const getters: GetterTree<IClipboardState, IRootState> = {
  isSimulatorActive: (state) => state.isSimulatorActive,
  blocksData: (state) => state.blocksData,
  getBlockPrompt: (state) => (index) => state.blocksData[index].prompt,
  isBlockFocused: (state) => (index) => state.blocksData[index].isFocused,
}

export const mutations: MutationTree<IClipboardState> = {
  setSimulatorActive(state, value) {
    state.isSimulatorActive = value
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
  setIsFocused({ commit }, data) {
    commit('setIsFocused', data)
  },
  setLastBlockUnEditable({ commit, state }) {
    const lastIndex = state.blocksData.length - 1
    commit('setIsFocused', { index: lastIndex, value: false })
  },
  setLastBlockEditable({ commit, state }) {
    const lastIndex = state.blocksData.length - 1
    commit('setIsFocused', { index: lastIndex, value: true })
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
