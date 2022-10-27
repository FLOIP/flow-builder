import {ActionTree, GetterTree, Module, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {IBlock} from '@floip/flow-runner'

export interface IResourceViewerState {
  /**
   * Filtered blocks.
   * Will be used for resource-viewer component, so the consumer repo can set a custom filters and override this state if needed
   */
  filteredBlocks: IBlock[],
}

export const resourceViewerStateFactory = (): IResourceViewerState => ({
  filteredBlocks: [],
})

export const resourceViewerGetters: GetterTree<IResourceViewerState, IRootState> = {
  filteredBlocks: (state) => state.filteredBlocks,
}

export const resourceViewerMutations: MutationTree<IResourceViewerState> = {
  setFilteredBlocks(state, {blocks}: {blocks: IBlock[] | undefined}) {
    if (blocks === undefined) {
      state.filteredBlocks = []
    } else {
      state.filteredBlocks = blocks
    }
  },
}

export const resourceViewerActions: ActionTree<IResourceViewerState, IRootState> = {
  setFilteredBlocks({commit}, {blocks}: {blocks: IBlock[] | undefined}) {
    commit('commit', {blocks})
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
