import {ActionTree, GetterTree, Module, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {IBlock} from '@floip/flow-runner'
import {map} from 'lodash'

export interface IResourceViewerState {
  /**
   * Block uuids to hide,
   * Will be used for resource-viewer component, so the consumer repo can set a custom filters and override this state if needed
   *
   * By default, it's empty, meaning there is no filter at all
   */
  blockUuidsToHide: IBlock['uuid'][],
}

export const resourceViewerStateFactory = (): IResourceViewerState => ({
  blockUuidsToHide: [],
})

export const resourceViewerGetters: GetterTree<IResourceViewerState, IRootState> = {
  filteredBlocks(state, _getters, _rootState, rootGetters) {
    const {blocks}: {blocks: IBlock[]} = rootGetters['flow/activeFlow'] ? rootGetters['flow/activeFlow'] : {blocks: [] as IBlock[]}
    // Display the block if it is NOT in blockUuidsToHide
    return blocks.filter(block => state.blockUuidsToHide.includes(block.uuid) === false)
  },
}

export const resourceViewerMutations: MutationTree<IResourceViewerState> = {
  setBlockUuidsToHide(state, {uuids}: {uuids: IBlock['uuid'][] | undefined}) {
    if (uuids === undefined) {
      state.blockUuidsToHide = [] as IBlock['uuid'][]
    } else {
      state.blockUuidsToHide = uuids
    }
  },
}

export const resourceViewerActions: ActionTree<IResourceViewerState, IRootState> = {
  setBlockUuidsToHide({commit}, {uuids}: {uuids: IBlock['uuid'][] | undefined}) {
    commit('setBlockUuidsToHide', {uuids})
  },
  hideBlocks({commit}, {blocks}: {blocks: IBlock['uuid']}) {
    const uuids: IBlock['uuid'][] = map(blocks, 'uuid')
    commit('setBlockUuidsToHide', {uuids})
  },
}

export const resourceViewerStore: Module<IResourceViewerState, IRootState> = {
  namespaced: true,
  state: resourceViewerStateFactory,
  getters: resourceViewerGetters,
  mutations: resourceViewerMutations,
  actions: resourceViewerActions,
}

export default resourceViewerStore
