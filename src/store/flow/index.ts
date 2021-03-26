import { IFlow, IResourceDefinition } from '@floip/flow-runner'
import {
  ActionTree, GetterTree, Module, MutationTree,
} from 'vuex'
import { IRootState } from '..' // todo: create factory with generics so that IRootState is DI'd
import {
  getters as blockGetters,
  mutations as blockMutations,
  actions as blockActions,
} from './block'
import {
  actions as flowActions,
  getters as flowGetters,
  mutations as flowMutations,
} from './flow'
import {
  actions as resourceActions,
  getters as resourceGetters,
  mutations as resourceMutations,
} from './resource'

// type IFlowsState = Pick<IContext, 'flows' | 'first_flow_id' | 'resources' | 'nested_flow_block_interaction_id_stack'>

export interface IFlowsState {
  flows: IFlow[];
  resources: IResourceDefinition[];

  first_flow_id: string | null;
  // @note - for exciting future
  nested_flow_block_interaction_id_stack: string[];
}

export const stateFactory = (): IFlowsState => ({
  flows: [],
  resources: [],

  first_flow_id: null,
  nested_flow_block_interaction_id_stack: [], // todo: not quite right -- pulled from IContext
})

export const getters: GetterTree<IFlowsState, IRootState> = {
  ...flowGetters,
  ...blockGetters,
  ...resourceGetters,
}

export const mutations: MutationTree<IFlowsState> = {
  ...flowMutations,
  ...blockMutations,
  ...resourceMutations,
}

export const actions: ActionTree<IFlowsState, IRootState> = {
  ...flowActions,
  ...blockActions,
  ...resourceActions,
}

export const store: Module<IFlowsState, IRootState> = {
  namespaced: true,
  state: stateFactory,
  getters,
  mutations,
  actions,
}

export default store
