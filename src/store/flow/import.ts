import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { IRootState } from '@/store'
import { IFlowsState } from '../index'

export const getters: GetterTree<IFlowsState, IRootState> = {}

export const mutations: MutationTree<IFlowsState> = {}

export const actions: ActionTree<IFlowsState, IRootState> = {
  async setAccuracyThreshold({ commit, rootGetters }, { blockId, value }: {blockId: string; value: number}) {
  },
}

export interface IImportState {
  matchingLanguages = []
  missingLanguages = []
  existingLanguagesWithoutMatch = []
  blocksMissingProperties: any = {}
  missingProperties = []
  matchingProperties = []
  existingPropertiesWithoutMatch = []
  blocksMissingGroups: any = {}
  missingGroups = []
  matchingGroups = []
  existingGroupsWithoutMatch = []
}

export const stateFactory = (): IFlowsState => ({
  isCreated: false,
  flows: [],
  resources: [],

  firstFlowId: null,
  nestedFlowBlockInteractionIdStack: [], // todo: not quite right -- pulled from IContext

  // activeBlock: null,
})

export default {
  namespaced: true,
  state: stateFactory,
  getters,
  mutations,
  actions,
}
