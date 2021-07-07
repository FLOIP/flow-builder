import {
  ActionTree, GetterTree, Module, MutationTree,
} from 'vuex'
import { IRootState } from '@/store'
import { router } from '@/router'
import { IPrompt } from '@floip/flow-runner'

export interface BlocksData {
  isFocused: boolean;
  prompt: IPrompt<any>;
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
  getBlockPrompt: (state) => (index: number) => state.blocksData[index].prompt,
  isBlockFocused: (state) => (index: number) => state.blocksData[index].isFocused,
  hasSimulator: (_, _2, _3, rootGetters) => rootGetters['flow/hasOfflineMode'] && rootGetters.isFeatureSimulatorEnabled && !rootGetters['builder/isEditable'],
}

export const mutations: MutationTree<IClipboardState> = {
  setSimulatorActive(state, value) {
    state.isSimulatorActive = value
  },
  setIsFocused(state, { index, value }) {
    state.blocksData[index].isFocused = value
  },
}

export const actions: ActionTree<IClipboardState, IRootState> = {
  setSimulatorActive({ commit }, value) {
    commit('setSimulatorActive', value)
    const routeName = value ? 'flow-simulator' : 'flow-details'
    router.replace({
      name: routeName,
    })
  },
  resetBlocksData({ state }) {
    state.blocksData = []
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
  addToBlocksData({ state }, data: BlocksData) {
    state.blocksData.push(data)
  },
  removeFromBlocksData({ state }, index: number) {
    state.blocksData.splice(index)
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
